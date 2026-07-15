import { NextRequest, NextResponse } from "next/server";
import { first5kSurveySchema } from "@/lib/validation/first5k-survey.schema";

// Server-side only — set in .env.local, never exposed to the client.
// Separate sheet from the registration form (GOOGLE_SCRIPT_URL).
const GOOGLE_SURVEY_SCRIPT_URL = process.env.GOOGLE_SURVEY_SCRIPT_URL;

// Gabungkan pilihan checkbox jadi satu string, dengan opsi "Other" diganti teks bebas.
function joinWithOther(list: string[], other?: string): string {
  if (list.includes("Other")) {
    return [...list.filter((v) => v !== "Other"), other].filter(Boolean).join(", ");
  }
  return list.join(", ");
}

// Skala linear: 0 = belum dijawab → kosongkan di sheet.
function scaleLabel(n: number): string {
  return n && n >= 1 ? String(n) : "";
}

export async function POST(request: NextRequest) {
  if (!GOOGLE_SURVEY_SCRIPT_URL) {
    return NextResponse.json(
      { message: "Survey belum bisa diproses. Silakan hubungi panitia." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Data tidak valid." }, { status: 400 });
  }

  const parsed = first5kSurveySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Data belum lengkap atau tidak valid.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const v = parsed.data;

  // Row payload — key order must match the HEADERS array in the Apps Script.
  const row = {
    namaLengkap: v.namaLengkap,
    instagram: v.instagram ?? "",
    whatsapp: v.whatsapp,
    paceGroup: v.paceGroup ?? "",
    firstExperience: v.firstExperience ?? "",
    overallExperience: scaleLabel(v.overallExperience),
    likedParts: joinWithOther(v.likedParts, v.likedPartsOther),
    pacerExperience: scaleLabel(v.pacerExperience),
    pacerHelpful: v.pacerHelpful ?? "",
    routeComfort: v.routeComfort ?? "",
    improvement: v.improvement ?? "",
    postRunGames: v.postRunGames ?? "",
    duration: v.duration ?? "",
    benefitInterest: v.benefitInterest ?? "",
    favoriteBenefit: v.favoriteBenefit.join(", "),
    memorableBenefit: v.memorableBenefit ?? "",
    nextActivityInterest: v.nextActivityInterest ?? "",
    communityInterest: v.communityInterest ?? "",
    desiredActivities: joinWithOther(v.desiredActivities, v.desiredActivitiesOther),
    preferredDays: v.preferredDays.join(", "),
    preferredAreas: joinWithOther(v.preferredAreas, v.preferredAreasOther),
    nextFormat: v.nextFormat ?? "",
    testimonialOneLine: v.testimonialOneLine ?? "",
    testimonialPermission: v.testimonialPermission ?? "",
    contactPermission: v.contactPermission ?? "",
    additionalMessage: v.additionalMessage ?? "",
  };

  try {
    const scriptRes = await fetch(GOOGLE_SURVEY_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
      redirect: "follow",
    });

    const scriptData = await scriptRes.json().catch(() => null);

    if (!scriptRes.ok || scriptData?.status !== "ok") {
      throw new Error(scriptData?.message ?? "Google Sheet menolak data.");
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("[first-5k-club-survey] Failed to write to Google Sheet:", err);
    return NextResponse.json(
      { message: "Gagal menyimpan survey. Silakan coba lagi dalam beberapa saat." },
      { status: 502 }
    );
  }
}
