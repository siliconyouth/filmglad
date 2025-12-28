// Run this script once after setting up Vercel KV to seed initial donors
// Usage: npx tsx scripts/seed-donors.ts

import { kv } from "@vercel/kv";

const initialDonors = [
  {
    id: "seed_lisa_boneta",
    name: "Lisa Boneta",
    tier: "supporter",
    amount: 100,
    date: new Date().toISOString(),
    anonymous: false,
  },
];

async function seed() {
  console.log("Seeding donors...");

  for (const donor of initialDonors) {
    await kv.zadd("donors", {
      score: new Date(donor.date).getTime(),
      member: JSON.stringify(donor),
    });
    console.log(`Added donor: ${donor.name}`);
  }

  console.log("Done!");
}

seed().catch(console.error);
