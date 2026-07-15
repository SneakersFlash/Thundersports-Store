import type { Metadata } from "next";
import { First5kSurveyClient } from "./First5kSurveyClient";

export const metadata: Metadata = {
  title: "FIRST 5K CLUB — Post Event Survey",
  description:
    "Post event survey FIRST 5K CLUB. Ceritakan pengalaman kamu setelah event untuk membantu kami menghadirkan pengalaman lari dan aktivitas komunitas yang lebih baik. Hanya butuh 3–5 menit.",
  openGraph: {
    title: "FIRST 5K CLUB — Post Event Survey",
    description:
      "Bagikan feedback kamu setelah FIRST 5K CLUB. Hanya butuh 3–5 menit.",
    type: "website",
  },
};

export default function First5kClubSurveyPage() {
  return <First5kSurveyClient />;
}
