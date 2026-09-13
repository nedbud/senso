import {
  availability,
  book,
  listServices,
  nextOpen,
  type Booking,
} from "@/lib/booking/admin";
import type { Lang } from "./types";

/**
 * What the assistant is allowed to actually do, as opposed to say.
 *
 * Until now it could only talk. It could read a prescription and name the
 * tests, and then the conversation hit a wall: a person had to be phoned, and
 * a good share of the people writing are writing precisely because phoning is
 * hard for them. These four functions remove that wall.
 *
 * The dangerous one is the last. A booking is a person crossing Dhaka on a
 * particular morning, so it is fenced in three ways that do not depend on the
 * model behaving:
 *
 *   1. A time can only be booked if this same conversation was shown it by
 *      check_availability. A start time the model invented is refused here,
 *      not argued with in a prompt.
 *   2. A name and a phone number must be present.
 *   3. One booking per turn. If it calls twice, the second call gets the first
 *      booking back rather than a second row in the clinic's book.
 */

/** Gemini function declarations. Shapes kept flat — nested arguments invite mistakes. */
export const BOOKING_TOOLS = [
  {
    name: "list_tests",
    description:
      "List the tests that can be booked online right now, with the id, how many minutes each takes and the fee in taka. Call this before talking about booking, so you use real ids.",
  },
  {
    name: "check_availability",
    description:
      "What times are free for one test on one day. Returns either a list of free start times with who would do the test, or a reason the day is not bookable. Never tell anyone a time is free without calling this first.",
    parameters: {
      type: "object",
      properties: {
        service_id: { type: "integer", description: "id from list_tests" },
        date: { type: "string", description: "the day, as YYYY-MM-DD" },
      },
      required: ["service_id", "date"],
    },
  },
  {
    name: "find_next_open",
    description:
      "The next few days that have room for a test. Use this when someone asks when they can come rather than naming a day.",
    parameters: {
      type: "object",
      properties: {
        service_id: { type: "integer", description: "id from list_tests" },
      },
      required: ["service_id"],
    },
  },
  {
    name: "book_appointment",
    description:
      "Put someone in the appointment book. Only call this after they have agreed to a specific date and time that check_availability offered, and after you have their name and phone number. The booking is a request — the clinic confirms it.",
    parameters: {
      type: "object",
      properties: {
        service_id: { type: "integer", description: "id from list_tests" },
        date: { type: "string", description: "the day, as YYYY-MM-DD" },
        start_time: {
          type: "string",
          description: "a start time check_availability offered, as HH:MM in 24-hour form",
        },
        name: { type: "string", description: "the patient's name, as they gave it" },
        phone: { type: "string", description: "the patient's phone number" },
        note: {
          type: "string",
          description:
            "one line on why they are coming, in their own words — what the counter needs to know",
        },
        patient_is_minor: {
          type: "boolean",
          description:
            "true when the test is for someone under 18. The booking is then refused unless guardian_name is given.",
        },
        guardian_name: {
          type: "string",
          description:
            "the parent's or guardian's name, when the patient is under 18. Required in that case.",
        },
      },
      required: ["service_id", "date", "start_time", "name", "phone"],
    },
  },
] as const;

export type ToolCall = { name: string; args: Record<string, any> };

/**
 * Is this conversation about coming in, or not?
 *
 * It matters for one reason: money. Handing the model a set of functions means
 * the bigger model, the tool declarations in every request, and two or three
 * round trips where a plain question needs one. That is the right trade when
 * someone is arranging a visit and pure waste for "আজ খোলা আছে?", which is most
 * of what a clinic's chat window is actually asked.
 *
 * The test runs over the whole conversation, both sides, and is deliberately
 * generous: a false positive costs a few paisa, a false negative means someone
 * ready to book gets told to phone instead. Once a conversation turns towards
 * booking it stays that way, because the assistant's own reply will be full of
 * these words by then.
 */
const BOOKING_CUES = [
  // Bangla
  "সিরিয়াল", "অ্যাপয়েন্ট", "বুক", "বুকিং", "আসতে", "আসব", "আসা", "যাব",
  "কবে", "কখন", "সময়", "খালি", "দিন", "তারিখ", "আগামীকাল", "কাল", "পরশু",
  "শনিবার", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার",
  "পরীক্ষা করাতে", "টেস্ট করাতে", "দেখাতে",
  // English and Banglish
  "serial", "appointment", "book", "booking", "slot", "available",
  "when can", "what time", "come in", "visit", "tomorrow", "today",
  "ashte", "ashbo", "kobe", "kokhon", "somoy", "khali", "porikkha",
];

export function wantsBooking(turns: { text: string }[]): boolean {
  const hay = turns.map((t) => t.text).join(" ").toLowerCase();
  return BOOKING_CUES.some((cue) => hay.includes(cue.toLowerCase()));
}


const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^\d{1,2}:\d{2}$/;

/** "9:05" and "09:05" are the same minute; the ledger should think so too. */
const pad = (t: string) => {
  const [h, m] = t.split(":");
  return `${h.padStart(2, "0")}:${m}`;
};

const key = (serviceId: number, date: string, start: string) =>
  `${serviceId}|${date}|${pad(start)}`;

/** Evenly spaced picks across a list, always keeping the first. */
function spread<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items;
  const step = (items.length - 1) / (count - 1);
  return Array.from({ length: count }, (_, i) => items[Math.round(i * step)]);
}

export function createBookingTools(lang: Lang, consentRef?: string) {
  /** Every start time this conversation has actually been shown. */
  const offered = new Set<string>();

  /** Set only by a booking that really landed in the clinic's database. */
  let booked: Booking | null = null;

  const say = (bn: string, en: string) => (lang === "bn" ? bn : en);

  async function dispatch(call: ToolCall): Promise<Record<string, unknown>> {
    const args = call.args ?? {};

    switch (call.name) {
      case "list_tests": {
        const r = await listServices();
        if (!r.ok) return { ok: false, error: r.reason, message: r.message };
        return { ok: true, tests: r.data };
      }

      case "check_availability": {
        const serviceId = Number(args.service_id);
        const date = String(args.date ?? "");

        if (!Number.isInteger(serviceId) || !DATE.test(date)) {
          return { ok: false, error: "bad_arguments", message: "Need a test id and a YYYY-MM-DD date." };
        }

        const r = await availability(serviceId, date);
        if (!r.ok) return { ok: false, error: r.reason, message: r.message };

        const day = r.data;

        // Remember what we showed. This is what makes book_appointment safe.
        for (const s of day.slots) offered.add(key(serviceId, day.date, s.start));

        return {
          ok: true,
          date: day.date,
          weekday: day.weekday,
          available: day.available,
          reason: day.reason,
          message: day.message,
          // A wall of forty times is not something to read out. The model only
          // needs enough to offer a choice.
          //
          // Spread rather than the first six in a row: given 10:35, 10:50 and
          // 11:05 a model will happily continue the pattern to closing time and
          // read out times the clinic never offered. Gaps in the list make the
          // list obviously a list.
          free_times: spread(day.slots, 6).map((s) => ({
            start: s.start,
            label: s.label,
            with: s.employee_name,
          })),
          total_free: day.slots.length,
          only_these:
            "These are the only times you may offer. There are gaps in the day you cannot see. Never continue the pattern, never invent a time between them, and offer at most three.",
        };
      }

      case "find_next_open": {
        const serviceId = Number(args.service_id);
        if (!Number.isInteger(serviceId)) {
          return { ok: false, error: "bad_arguments", message: "Need a test id." };
        }

        const r = await nextOpen(serviceId);
        if (!r.ok) return { ok: false, error: r.reason, message: r.message };
        return { ok: true, days: r.data.days };
      }

      case "book_appointment": {
        // Called twice in one turn: hand back the first one rather than making
        // a second appointment nobody asked for.
        if (booked) {
          return { ok: true, already: true, booking: booked };
        }

        const serviceId = Number(args.service_id);
        const date = String(args.date ?? "");
        const start = String(args.start_time ?? "");
        const name = String(args.name ?? "").trim();
        const phone = String(args.phone ?? "").trim();

        if (!Number.isInteger(serviceId) || !DATE.test(date) || !TIME.test(start)) {
          return {
            ok: false,
            error: "bad_arguments",
            message: "Need the test id, the date as YYYY-MM-DD and a start time as HH:MM.",
          };
        }

        const isMinor = args.patient_is_minor === true;
        const guardian = String(args.guardian_name ?? "").trim();

        if (isMinor && guardian.length < 2) {
          return {
            ok: false,
            error: "guardian_required",
            message: say(
              "রোগীর বয়স ১৮-র নিচে হলে অভিভাবকের নাম লাগবে। কে নিয়ে আসছেন, জিজ্ঞেস করুন।",
              "A patient under 18 needs a guardian's name. Ask who is bringing them."
            ),
          };
        }

        if (name.length < 2 || phone.length < 6) {
          return {
            ok: false,
            error: "missing_details",
            message: say(
              "নাম আর ফোন নম্বর ছাড়া সিরিয়াল বসানো যায় না। যেটা বাকি আছে সেটা জিজ্ঞেস করুন।",
              "A booking needs their name and phone number. Ask for whichever is missing."
            ),
          };
        }

        if (!offered.has(key(serviceId, date, start))) {
          // The ledger only remembers this one request, and a booking almost
          // always happens a message later — a different request, with an empty
          // ledger. So a miss here is the ordinary case, not an attack, and
          // refusing on it told real patients their own chosen time "was never
          // offered". Ask the book instead. It is the authority on which minutes
          // are free, it survives between messages, and a time the model made up
          // still will not be in it.
          const fresh = await availability(serviceId, date);

          if (!fresh.ok) {
            return { ok: false, error: fresh.reason, message: fresh.message };
          }

          const match = fresh.data.slots.find((sl) => pad(sl.start) === pad(start));

          if (!match) {
            return {
              ok: false,
              error: "not_free",
              message: say(
                "ওই সময়টা এখন আর খালি নেই। নিচের সময়গুলো থেকে একটা দিন।",
                "That time is not free any more. Offer one of these instead."
              ),
              free_times: fresh.data.slots.slice(0, 6).map((sl) => ({
                start: sl.start,
                label: sl.label,
                with: sl.employee_name,
              })),
            };
          }

          offered.add(key(serviceId, date, start));
        }

        const r = await book({
          service_id: serviceId,
          test_date: date,
          start_time: pad(start),
          name: name.slice(0, 120),
          phone: phone.slice(0, 20),
          patient_is_minor: isMinor,
          guardian_name: isMinor ? guardian.slice(0, 120) : undefined,
          consent_ref: consentRef,
          note: typeof args.note === "string" ? args.note.slice(0, 500) : undefined,
          source: "naati",
        });

        if (!r.ok) {
          // The clinic's own sentence — written to be read to a patient.
          return { ok: false, error: r.reason, message: r.message };
        }

        booked = r.data;

        return {
          ok: true,
          booking: {
            id: r.data.id,
            status: "requested, the clinic will confirm",
            date: r.data.test_date,
            time: r.data.label,
            test: r.data.service,
            fee: r.data.fee,
            with: r.data.employee_name,
          },
        };
      }

      default:
        return { ok: false, error: "unknown_tool", message: `No tool called ${call.name}.` };
    }
  }

  return {
    dispatch,
    /** Null unless a booking really landed. The outbound guard reads this. */
    get booking() {
      return booked;
    },
  };
}
