import type { Metadata } from "next";
import { First5kClubClient } from "./First5kClubClient";

// Server-side only — set in .env.local (see src/app/api/first-5k-club/route.ts).
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
const QUOTA_LIMIT = 100;

async function getRegistrationOpen(): Promise<boolean> {
  if (!GOOGLE_SCRIPT_URL) return true;
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, { next: { revalidate: 30 } });
    const data = await res.json();
    const count = typeof data?.count === "number" ? data.count : 0;
    return count < QUOTA_LIMIT;
  } catch (err) {
    // Fail open — the Apps Script also enforces the quota on submit, so a
    // transient fetch error here shouldn't lock out everyone from the page.
    console.error("[first-5k-club] Failed to fetch registration status:", err);
    return true;
  }
}

export const metadata: Metadata = {
  title: "FIRST 5K CLUB — Run Your Pace, Find Your People",
  description:
    "Daftar FIRST 5K CLUB — community running activation oleh Thunder Sports, Sneakers Flash, USS Running, dan Berkawan Hub. 19 Juli 2026 di Berkawan Hub, Jakarta Selatan. Registrasi gratis, kuota terbatas.",
  openGraph: {
    title: "FIRST 5K CLUB — Run Your Pace, Find Your People",
    description: "Community running activation. 19 Juli 2026 di Berkawan Hub, Jakarta Selatan. Registrasi gratis, kuota terbatas.",
    type: "website",
  },
};

export default async function First5kClubPage() {
  const registrationOpen = await getRegistrationOpen();
  return <First5kClubClient registrationOpen={registrationOpen} />;
}
