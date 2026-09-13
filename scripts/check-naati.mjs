#!/usr/bin/env node
/**
 * Drives a whole conversation through Naati and checks a real appointment
 * comes out the other end.
 *
 *   node scripts/check-naati.mjs
 *
 * This one costs model calls, so it is separate from check-booking.mjs. It is
 * also the only test that exercises the part nothing else can: whether the
 * assistant looks the day up before it speaks, and whether the guard lets a
 * booking claim through only when a row really went into the database.
 *
 * It prints the transcript. Read it — a green tick here means a booking was
 * made, not that the conversation was any good.
 */

const BASE = process.env.CHECK_BASE_URL ?? "http://localhost:3000";
const MAX_TURNS = 7;

const stamp = Date.now().toString().slice(-7);

/**
 * What a person would say. Deliberately not in a fixed order — the assistant
 * decides what it needs next, so each reply carries everything it might ask
 * for, the way a real impatient person answers.
 */
const SCRIPT = [
  "পরশু কান পরীক্ষা করাতে চাই। কোন সময় খালি আছে?",
  `যেকোনো একটা দিলেই হবে। আমার নাম টেস্ট রোগী ${stamp}, ফোন ০১৭${stamp}।`,
  "হ্যাঁ, ওই সময়টাই দিন। কনফার্ম করুন।",
  "হ্যাঁ।",
  "হ্যাঁ, ঠিক আছে।",
  "ধন্যবাদ।",
];

const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;

function wrap(text, indent) {
  return text
    .split("\n")
    .flatMap((line) => line.match(/.{1,76}(\s|$)/gu) ?? [""])
    .map((l) => indent + l.trim())
    .join("\n");
}

async function main() {
  console.log(`\x1b[1mNaati booking\x1b[0m  ${BASE}\n${"─".repeat(70)}\n`);

  const turns = [];
  let booking = null;

  for (let i = 0; i < MAX_TURNS && i < SCRIPT.length && !booking; i++) {
    turns.push({ role: "user", text: SCRIPT[i] });

    console.log(`\x1b[36m  রোগী\x1b[0m`);
    console.log(wrap(SCRIPT[i], "    "));

    const res = await fetch(`${BASE}/api/naati/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ lang: "bn", turns }),
    });

    const body = await res.json().catch(() => null);

    if (!res.ok) {
      console.log(red(`\n  chat failed: ${res.status}  ${body?.error ?? ""}`));
      if (body?.detail) console.log(red(`  ${body.detail}`));
      if (res.status === 429) console.log(dim("  rate limited — wait a minute and run it again."));
      process.exit(1);
    }

    console.log(`\n\x1b[35m  নাতি\x1b[0m ${dim(body.tone ?? "")}`);
    console.log(wrap(body.reply ?? "", "    "));
    console.log();

    turns.push({ role: "assistant", text: body.reply ?? "" });
    booking = body.booking ?? null;
  }

  console.log("─".repeat(70));

  const claimed = /সিরিয়াল|বুক|booked|appointment/i.test(
    turns.filter((t) => t.role === "assistant").map((t) => t.text).join(" ")
  );

  if (!booking) {
    console.log(red("  no booking was made."));
    console.log(
      claimed
        ? dim("  it talked about serials but never put one in — check the tool calls in the dev server log.")
        : dim("  it never got as far as booking. Read the transcript above.")
    );
    process.exit(1);
  }

  console.log(green(`  booked  #${booking.id}`));
  console.log(`  ${booking.service} — ${booking.date} at ${booking.time}`);
  console.log(dim("  status is pending until the counter accepts it.\n"));

  console.log(dim("  confirm it is really in the clinic's database:"));
  console.log(
    dim(
      `    docker compose exec db mysql -usenso -psenso senso -e "SELECT id,test_date,status,source FROM appointments WHERE id=${booking.id}"`
    ) + "\n"
  );
}

main().catch((e) => {
  console.error(`\n${red("Could not run:")} ${e.message}`);
  console.error(dim(`Is the site running at ${BASE}?  (npm run dev)\n`));
  process.exit(1);
});
