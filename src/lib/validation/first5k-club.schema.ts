import { z } from "zod";

// ─── Option lists (mirrors the FIRST 5K CLUB Google Form) ────────────────────

export const RUN_FREQUENCY_OPTIONS = [
  "Belum pernah berlari",
  "Baru mulai berlari",
  "Kurang dari 1 kali dalam seminggu",
  "1–2 kali dalam seminggu",
  "Lebih dari 2 kali dalam seminggu",
] as const;

export const FIVE_K_EXPERIENCE_OPTIONS = [
  "Belum pernah",
  "Pernah, tetapi hanya beberapa kali",
  "Sudah cukup sering",
] as const;

export const HESITATION_OPTIONS = [
  "Takut tidak kuat menyelesaikan lari",
  "Merasa pace terlalu lambat",
  "Belum mempunyai teman atau komunitas lari",
  "Tidak tahu cara memulai",
  "Tidak percaya diri",
  "Kesulitan mengatur waktu",
  "Yang lain",
] as const;

export const TARGET_OPTIONS = [
  "Menyelesaikan 5K",
  "Mulai rutin berolahraga",
  "Mencari teman atau komunitas lari",
  "Belajar tentang basic running",
  "Menambah pengalaman lari",
  "Yang lain",
] as const;

export const JERSEY_SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"] as const;

export const YES_NO_OPTIONS = ["Ya, saya bersedia", "Tidak"] as const;

export const CONSENT_OPTIONS = [
  "Saya menyetujui data saya digunakan untuk kebutuhan registrasi, komunikasi acara, keamanan peserta, dokumentasi, dan evaluasi FIRST 5K CLUB.",
  "Saya tidak menyetujui.",
] as const;

export const PARTICIPANT_STATEMENTS = [
  { key: "infoBenar", label: "Saya menyatakan bahwa seluruh informasi yang saya berikan adalah benar." },
  { key: "pahamKondisiFisik", label: "Saya memahami bahwa FIRST 5K CLUB merupakan kegiatan olahraga yang membutuhkan kondisi fisik yang memadai." },
  { key: "tanggungJawabKesehatan", label: "Saya bertanggung jawab untuk memastikan kondisi kesehatan saya memungkinkan untuk mengikuti kegiatan." },
  { key: "ikutiArahanPanitia", label: "Saya bersedia mengikuti arahan panitia dan seluruh peraturan selama kegiatan berlangsung." },
  { key: "ikutiRangkaianAcara", label: "Saya bersedia mengikuti seluruh rangkaian acara dari awal sampai selesai." },
  { key: "bersediaDihubungi", label: "Saya bersedia dihubungi melalui WhatsApp atau email terkait informasi FIRST 5K CLUB." },
  { key: "bergabungWaGroup", label: "Saya bersedia bergabung ke dalam WhatsApp Group resmi FIRST 5K CLUB setelah menyelesaikan formulir." },
  { key: "izinDokumentasi", label: "Saya memberikan izin kepada penyelenggara untuk menggunakan dokumentasi foto dan video yang menampilkan diri saya untuk kebutuhan publikasi, dokumentasi, dan promosi acara." },
] as const;

// ─── Step schemas ─────────────────────────────────────────────────────────────

export const step1Schema = z.object({
  nama: z.string().trim().min(1, "Nama wajib diisi"),
  tanggalLahir: z.string().trim().optional(),
  whatsapp: z
    .string()
    .trim()
    .min(9, "Nomor WhatsApp minimal 9 digit")
    .regex(/^[0-9+\s-]+$/, "Format nomor WhatsApp tidak valid"),
  email: z.string().trim().min(1, "Email wajib diisi").email("Format email tidak valid"),
  domisili: z.string().trim().min(1, "Domisili wajib diisi"),
  komunitas: z.string().trim().min(1, 'Tulis "Tidak ada" apabila belum tergabung komunitas lari'),
  instagram: z
    .string()
    .trim()
    .min(1, "Instagram username wajib diisi")
    .transform((v) => (v.startsWith("@") ? v : `@${v}`)),
});

export const step2Schema = z.object({
  seberapaSeringBerlari: z.enum(RUN_FREQUENCY_OPTIONS).optional().or(z.literal("")),
  pengalaman5k: z.enum(FIVE_K_EXPERIENCE_OPTIONS).optional().or(z.literal("")),
  alasanUtama: z.string().trim().min(1, "Alasan utama wajib diisi"),
  hambatan: z.array(z.string()).default([]),
  hambatanLainnya: z.string().trim().optional(),
  target: z.enum(TARGET_OPTIONS).optional().or(z.literal("")),
  targetLainnya: z.string().trim().optional(),
});

export const step3Schema = z.object({
  ukuranJersey: z.enum(JERSEY_SIZE_OPTIONS, { message: "Pilih ukuran jersey" }),
  bersediaIkutAcara: z.enum(YES_NO_OPTIONS, { message: "Wajib dipilih" }),
  bersediaUploadIg: z.enum(YES_NO_OPTIONS, { message: "Wajib dipilih" }),
});

export const step4Schema = z.object({
  namaKontakDarurat: z.string().trim().min(1, "Nama kontak darurat wajib diisi"),
  nomorKontakDarurat: z
    .string()
    .trim()
    .min(9, "Nomor kontak darurat minimal 9 digit")
    .regex(/^[0-9+\s-]+$/, "Format nomor tidak valid"),
  hubunganKontakDarurat: z.string().trim().min(1, "Hubungan kontak darurat wajib diisi"),
  kondisiKesehatan: z.string().trim().min(1, 'Tulis "Tidak Ada" apabila tidak memiliki kondisi khusus'),
});

export const step5Schema = z.object({
  pernyataanPeserta: z
    .array(z.string())
    .refine((arr) => arr.length === PARTICIPANT_STATEMENTS.length, {
      message: "Seluruh pernyataan wajib dicentang untuk melanjutkan pendaftaran",
    }),
  persetujuanData: z.literal(CONSENT_OPTIONS[0], {
    message: "Kamu perlu menyetujui penggunaan data untuk mendaftar",
  }),
});

// ─── Full schema (steps 1–5; step 6 is review/submit only) ──────────────────

export const first5kClubSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema);

export type First5kClubFormValues = z.infer<typeof first5kClubSchema>;

export const STEP_FIELDS: Record<number, (keyof First5kClubFormValues)[]> = {
  1: ["nama", "tanggalLahir", "whatsapp", "email", "domisili", "komunitas", "instagram"],
  2: ["seberapaSeringBerlari", "pengalaman5k", "alasanUtama", "hambatan", "hambatanLainnya", "target", "targetLainnya"],
  3: ["ukuranJersey", "bersediaIkutAcara", "bersediaUploadIg"],
  4: ["namaKontakDarurat", "nomorKontakDarurat", "hubunganKontakDarurat", "kondisiKesehatan"],
  5: ["pernyataanPeserta", "persetujuanData"],
};

export const TOTAL_STEPS = 6;

export const defaultFirst5kClubValues: First5kClubFormValues = {
  nama: "",
  tanggalLahir: "",
  whatsapp: "",
  email: "",
  domisili: "",
  komunitas: "",
  instagram: "",
  seberapaSeringBerlari: "",
  pengalaman5k: "",
  alasanUtama: "",
  hambatan: [],
  hambatanLainnya: "",
  target: "",
  targetLainnya: "",
  ukuranJersey: undefined as unknown as First5kClubFormValues["ukuranJersey"],
  bersediaIkutAcara: undefined as unknown as First5kClubFormValues["bersediaIkutAcara"],
  bersediaUploadIg: undefined as unknown as First5kClubFormValues["bersediaUploadIg"],
  namaKontakDarurat: "",
  nomorKontakDarurat: "",
  hubunganKontakDarurat: "",
  kondisiKesehatan: "",
  pernyataanPeserta: [],
  persetujuanData: undefined as unknown as First5kClubFormValues["persetujuanData"],
};
