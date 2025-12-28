import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    // Get all donors from the sorted set, ordered by date (newest first)
    const donorStrings = await kv.zrange("donors", 0, -1, { rev: true });

    const donors = donorStrings.map((str) => {
      if (typeof str === "string") {
        return JSON.parse(str);
      }
      return str;
    });

    return NextResponse.json({ donors });
  } catch (error) {
    console.error("Failed to fetch donors:", error);
    // Return empty array if KV is not configured or fails
    return NextResponse.json({ donors: [] });
  }
}
