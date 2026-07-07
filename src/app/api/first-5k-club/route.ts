import { NextRequest, NextResponse } from "next/server";
import { first5kClubSchema, PARTICIPANT_STATEMENTS } from "@/lib/validation/first5k-club.schema";

// Server-side only — set in .env.local, never exposed to the client.
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

export async function POST(request: NextRequest) {
  if (!GOOGLE_SCRIPT_URL) {
    return NextResponse.json(
      { message: "Pendaftaran belum bisa diproses. Silakan hubungi panitia." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Data tidak valid." }, { status: 400 });
  }

  const parsed = first5kClubSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Data belum lengkap atau tidak valid.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const v = parsed.data;

  const hambatanLabel = v.hambatan.includes("Yang lain")
    ? [...v.hambatan.filter((h) => h !== "Yang lain"), v.hambatanLainnya].filter(Boolean).join(", ")
    : v.hambatan.join(", ");

  const targetLabel = v.target === "Yang lain" ? v.targetLainnya ?? "" : v.target ?? "";

  const pernyataanLabel = v.pernyataanPeserta
    .map((key) => PARTICIPANT_STATEMENTS.find((s) => s.key === key)?.label ?? key)
    .join(" | ");

  // Row payload — column order must match the header row of the target Sheet tab.
  const row = {
    timestamp: new Date().toISOString(),
    nama: v.nama,
    tanggalLahir: v.tanggalLahir ?? "",
    whatsapp: v.whatsapp,
    email: v.email,
    domisili: v.domisili,
    komunitas: v.komunitas,
    instagram: v.instagram,
    seberapaSeringBerlari: v.seberapaSeringBerlari ?? "",
    pengalaman5k: v.pengalaman5k ?? "",
    alasanUtama: v.alasanUtama,
    hambatan: hambatanLabel,
    target: targetLabel,
    ukuranJersey: v.ukuranJersey,
    bersediaIkutAcara: v.bersediaIkutAcara,
    bersediaUploadIg: v.bersediaUploadIg,
    namaKontakDarurat: v.namaKontakDarurat,
    nomorKontakDarurat: v.nomorKontakDarurat,
    hubunganKontakDarurat: v.hubunganKontakDarurat,
    kondisiKesehatan: v.kondisiKesehatan,
    pernyataanPeserta: pernyataanLabel,
    persetujuanData: v.persetujuanData,
  };

  try {
    const scriptRes = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
      redirect: "follow",
    });

    const scriptData = await scriptRes.json().catch(() => null);

    if (scriptData?.status === "closed") {
      return NextResponse.json(
        { message: scriptData.message ?? "Kuota pendaftaran sudah penuh." },
        { status: 409 }
      );
    }

    if (!scriptRes.ok || scriptData?.status !== "ok") {
      throw new Error(scriptData?.message ?? "Google Sheet menolak data.");
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("[first-5k-club] Failed to write to Google Sheet:", err);
    return NextResponse.json(
      { message: "Gagal menyimpan pendaftaran. Silakan coba lagi dalam beberapa saat." },
      { status: 502 }
    );
  }
}
