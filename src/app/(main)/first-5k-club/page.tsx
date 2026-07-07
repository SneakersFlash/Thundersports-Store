import type { Metadata } from "next";
import { First5kClubClient } from "./First5kClubClient";

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

export default function First5kClubPage() {
  return <First5kClubClient />;
}
