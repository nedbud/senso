import type { ToolCall } from "./tools";
import type { ChatTurn } from "./types";

/**
 * The only place that knows which provider we are on.
 *
 * Two models, chosen per turn rather than per deployment:
 *
 *   text only     → Flash-Lite. Opening hours, prices, "are you open today"
 *                   — the bulk of real traffic, and none of it needs more.
 *                   30 requests/minute on the free tier.
 *
 *   with an image → Flash. A Bangladeshi consultant's handwriting on a
 *                   prescription pad is the hardest thing this assistant
 *                   will ever be asked to read, and getting the test list
 *                   wrong there wastes a patient's trip. 15/minute, which
 *                   is far more image turns than a clinic will ever see.
 *
 * Both sit inside the same 1,500 requests/day free allowance. At roughly
 * fifty conversations a day that is a third of the quota.
 *
 * IMPORTANT: the free tier's terms let Google use what you send to improve
 * its products, with human review. Prescriptions carry names, ages and
 * diagnoses. Build and test on the free key; put a billed key in
 * GEMINI_API_KEY before real patients reach it. Same endpoint, same code.
 */
const TEXT_MODEL = process.env.NAATI_TEXT_MODEL ?? "gemini-2.5-flash-lite";
const VISION_MODEL = process.env.NAATI_VISION_MODEL ?? "gemini-2.5-flash";

/**
 * The model used whenever the assistant can call a function.
 *
 * Not Flash-Lite. Flash-Lite is the right choice for "are you open today" and
 * it is half the cost, but it cannot reliably emit a function call — it comes
 * back with finishReason MALFORMED_FUNCTION_CALL, which reaches a patient as
 * "I can't answer right now". Booking is the one thing on this widget worth
 * paying for, and 15 requests a minute is still far more than a clinic sees.
 */
const TOOL_MODEL = process.env.NAATI_TOOL_MODEL ?? "gemini-2.5-flash";

// Overridable so the widget can be exercised against a local stub, and so a
// regional or proxied endpoint can be swapped in without touching code.
const ENDPOINT =
  process.env.NAATI_MODEL_ENDPOINT ??
  "https://generativelanguage.googleapis.com/v1beta/models";

export class ModelError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

export function pickModel(turns: ChatTurn[]): string {
  const hasImage = turns.some((t) => (t.attachments?.length ?? 0) > 0);
  return hasImage ? VISION_MODEL : TEXT_MODEL;
}

type FunctionCall = { name: string; args?: Record<string, any> };

type Part =
  | { text: string }
  | { inlineData: { mimeType: string; data: string } }
  | { functionCall: FunctionCall }
  | { functionResponse: { name: string; response: Record<string, unknown> } };

type Content = { role: "user" | "model"; parts: Part[] };

function toParts(turn: ChatTurn): Part[] {
  const parts: Part[] = [];
  for (const a of turn.attachments ?? []) {
    parts.push({ inlineData: { mimeType: a.mimeType, data: a.data } });
  }
  // The text goes after the image. Asked the other way round, the model
  // tends to answer the question and skim the picture; a prescription sent
  // with no words at all needs the picture to be the thing it starts from.
  if (turn.text.trim()) parts.push({ text: turn.text.trim() });
  if (parts.length === 0) parts.push({ text: "(no message)" });
  return parts;
}

function toContents(turns: ChatTurn[]): Content[] {
  return turns.map((t) => ({
    role: t.role === "assistant" ? ("model" as const) : ("user" as const),
    parts: toParts(t),
  }));
}

type Candidate = { content?: { parts?: Part[] }; finishReason?: string };

async function ask(
  model: string,
  body: Record<string, unknown>,
  signal?: AbortSignal
): Promise<Candidate> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new ModelError("GEMINI_API_KEY is not set", 500);

  const res = await fetch(`${ENDPOINT}/${model}:generateContent`, {
    method: "POST",
    signal,
    headers: { "content-type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ModelError(`${model} -> HTTP ${res.status} ${text.slice(0, 300)}`, res.status);
  }

  const json = (await res.json()) as {
    candidates?: Candidate[];
    promptFeedback?: { blockReason?: string };
  };

  if (json.promptFeedback?.blockReason) {
    throw new ModelError(`blocked: ${json.promptFeedback.blockReason}`, 422);
  }

  return json.candidates?.[0] ?? {};
}

function textOf(candidate: Candidate): string {
  return (candidate.content?.parts ?? [])
    .map((p) => ("text" in p ? p.text : ""))
    .join("")
    .trim();
}

function baseBody(system: string, contents: Content[]) {
  return {
    system_instruction: { parts: [{ text: system }] },
    contents,
    generationConfig: {
      // Low, but not zero. This assistant should sound like a person and
      // never like a different person each time.
      temperature: 0.4,
      maxOutputTokens: 900,
    },
  };
}

/** Plain completion, no tools. Used for the correction retry. */
export async function generate(
  system: string,
  turns: ChatTurn[],
  signal?: AbortSignal
): Promise<string> {
  const candidate = await ask(pickModel(turns), baseBody(system, toContents(turns)), signal);
  const text = textOf(candidate);
  if (!text) throw new ModelError("empty response", 502);
  return text;
}

/**
 * How many times the model may call a function before answering.
 *
 * A real booking conversation needs three: what tests are there, what is free
 * on Thursday, book it. Four leaves room for a retry when the first day is
 * full. Beyond that it is looping, and looping means every round is another
 * request against a free-tier quota and another second of someone waiting.
 */
const MAX_TOOL_ROUNDS = 5;

/**
 * A completion the model can interrupt to look something up.
 *
 * The loop is the whole point: the assistant asks what is free, gets a real
 * answer from the clinic's database, and only then writes a sentence. It is
 * the difference between "I think Thursday morning is usually quiet" and
 * "Thursday 11:00 is free".
 *
 * Every function result goes back verbatim, including failures. A refusal the
 * model can read — "that time was never offered", "the day is full" — produces
 * a better next sentence than an exception ever would.
 */
export async function generateWithTools(
  system: string,
  turns: ChatTurn[],
  tools: readonly unknown[],
  dispatch: (call: ToolCall) => Promise<Record<string, unknown>>,
  signal?: AbortSignal
): Promise<string> {
  const hasImage = turns.some((t) => (t.attachments?.length ?? 0) > 0);
  const model = hasImage ? VISION_MODEL : TOOL_MODEL;
  const contents = toContents(turns);

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const candidate = await ask(
      model,
      { ...baseBody(system, contents), tools: [{ functionDeclarations: tools }] },
      signal
    );

    // The model tried to call something and produced nonsense. There is
    // nothing to dispatch and nothing to read, so stop reaching for tools and
    // let it answer in words rather than failing the whole message.
    if (candidate.finishReason === "MALFORMED_FUNCTION_CALL") {
      console.warn("[naati] malformed function call, falling back to words");
      break;
    }

    const parts = candidate.content?.parts ?? [];
    const calls = parts.filter((p): p is { functionCall: FunctionCall } => "functionCall" in p);

    if (calls.length === 0) {
      const text = textOf(candidate);
      if (!text) throw new ModelError(`empty response (${candidate.finishReason ?? "no reason"})`, 502);
      return text;
    }

    // The model's turn, function calls and all, has to go back in the history
    // or the next round has no idea what it just asked for.
    contents.push({ role: "model", parts });

    const results: Part[] = [];
    for (const { functionCall } of calls) {
      const response = await dispatch({
        name: functionCall.name,
        args: functionCall.args ?? {},
      });
      results.push({ functionResponse: { name: functionCall.name, response } });
    }

    contents.push({ role: "user", parts: results });
  }

  // Out of rounds. Ask once more with no tools, so it has to answer in words.
  //
  // Deliberately from the original turns rather than the accumulated history:
  // that history ends in a functionResponse, and a request carrying one with
  // no tools declared is rejected outright — which is how a loop turned into
  // the "I can't answer right now" message instead of a stiff but useful one.
  console.warn("[naati] tool loop did not settle, answering without tools");

  const plain = `${system}

You have run out of lookups for this message. Answer now, in words, using what
you already found. Do not claim anything was booked. If you could not finish
the booking, say so plainly and give the phone number.`;

  const last = await ask(model, baseBody(plain, toContents(turns)), signal);
  const text = textOf(last);
  if (!text) throw new ModelError("the model kept calling tools without answering", 502);
  return text;
}
