"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { ProgressHeader } from "@/components/first-5k-club/ProgressHeader";
import { ConfirmationScreen } from "@/components/first-5k-club/ConfirmationScreen";
import { IntroScreen } from "@/components/first-5k-club/IntroScreen";
import { ClosedScreen } from "@/components/first-5k-club/ClosedScreen";
import {
  FieldShell,
  TextField,
  TextAreaField,
  PillSingleSelect,
  PillMultiSelect,
  ConsentCheckbox,
} from "@/components/first-5k-club/FormFields";
import {
  first5kClubSchema,
  defaultFirst5kClubValues,
  STEP_FIELDS,
  TOTAL_STEPS,
  RUN_FREQUENCY_OPTIONS,
  FIVE_K_EXPERIENCE_OPTIONS,
  HESITATION_OPTIONS,
  TARGET_OPTIONS,
  JERSEY_SIZE_OPTIONS,
  YES_NO_OPTIONS,
  CONSENT_OPTIONS,
  PARTICIPANT_STATEMENTS,
  type First5kClubFormValues,
} from "@/lib/validation/first5k-club.schema";

export function First5kClubClient({ registrationOpen }: { registrationOpen: boolean }) {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<First5kClubFormValues>({
    resolver: zodResolver(first5kClubSchema),
    defaultValues: defaultFirst5kClubValues,
    mode: "onSubmit",
  });

  const goNext = async () => {
    const fields = STEP_FIELDS[step];
    const valid = fields ? await trigger(fields) : true;
    if (!valid) {
      toast.error("Mohon lengkapi data yang wajib diisi.");
      return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (values: First5kClubFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/first-5k-club", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? "Gagal mengirim pendaftaran");
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mengirim pendaftaran. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!registrationOpen) {
    return <ClosedScreen />;
  }

  if (submitted) {
    return <ConfirmationScreen />;
  }

  if (!started) {
    return (
      <IntroScreen
        onStart={() => {
          setStarted(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  const values = watch();

  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-28">
      <ProgressHeader step={step} totalSteps={TOTAL_STEPS} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mx-auto -mt-6 max-w-lg rounded-t-3xl bg-white px-5 pt-7 pb-8 shadow-xl sm:px-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-5"
          >
            {step === 1 && <Step1PersonalInfo register={register} errors={errors} />}
            {step === 2 && (
              <Step2RunningJourney values={values} setValue={setValue} register={register} errors={errors} />
            )}
            {step === 3 && <Step3EventInfo values={values} setValue={setValue} errors={errors} />}
            {step === 4 && <Step4Emergency register={register} errors={errors} />}
            {step === 5 && <Step5Agreement values={values} setValue={setValue} errors={errors} />}
            {step === 6 && <Step6Review values={values} onEdit={setStep} />}
          </motion.div>
        </AnimatePresence>
      </form>

      {/* Sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-neutral-200 bg-white/95 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-lg gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={goBack}
              disabled={isSubmitting}
              className="flex-1 rounded-xl border border-neutral-300 py-3 text-sm font-bold text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50"
            >
              Kembali
            </button>
          )}
          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={goNext}
              className="flex-[2] rounded-xl bg-brand-orange py-3 text-sm font-bold text-white shadow-md shadow-brand-orange/30 transition-colors hover:bg-brand-orangeDark"
            >
              Lanjut
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="flex-[2] rounded-xl bg-brand-blue py-3 text-sm font-bold text-white shadow-md shadow-brand-blue/30 transition-colors hover:bg-brand-blueDark disabled:opacity-60"
            >
              {isSubmitting ? "Mengirim..." : "Daftar Sekarang"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Step 1 — Data Diri & Kontak ─────────────────────────────────────────────

function Step1PersonalInfo({
  register,
  errors,
}: {
  register: ReturnType<typeof useForm<First5kClubFormValues>>["register"];
  errors: FieldErrors<First5kClubFormValues>;
}) {
  return (
    <>
      <SectionTitle title="Data Diri & Kontak" subtitle="Informasi dasar untuk mendaftarkan kamu ke FIRST 5K CLUB." />
      <FieldShell label="Nama" required error={errors.nama?.message}>
        <TextField placeholder="Nama lengkap" error={errors.nama?.message} {...register("nama")} />
      </FieldShell>
      <FieldShell label="Tanggal Lahir" hint="Contoh: 7 Januari 2019">
        <TextField type="date" {...register("tanggalLahir")} />
      </FieldShell>
      <FieldShell
        label="WhatsApp"
        required
        hint="Pastikan nomor dapat dihubungi dan terhubung dengan WhatsApp."
        error={errors.whatsapp?.message}
      >
        <TextField placeholder="08xxxxxxxxxx" inputMode="tel" error={errors.whatsapp?.message} {...register("whatsapp")} />
      </FieldShell>
      <FieldShell label="Email" required error={errors.email?.message}>
        <TextField type="email" placeholder="nama@email.com" error={errors.email?.message} {...register("email")} />
      </FieldShell>
      <FieldShell label="Domisili" required hint="Contoh: Jakarta Selatan" error={errors.domisili?.message}>
        <TextField placeholder="Kota domisili" error={errors.domisili?.message} {...register("domisili")} />
      </FieldShell>
      <FieldShell label="Komunitas" required hint="Jika ada. Tulis 'Tidak ada' jika belum tergabung." error={errors.komunitas?.message}>
        <TextField placeholder="Nama komunitas lari" error={errors.komunitas?.message} {...register("komunitas")} />
      </FieldShell>
      <FieldShell label="Instagram Username" required hint="Tuliskan dengan format @username" error={errors.instagram?.message}>
        <TextField placeholder="@username" error={errors.instagram?.message} {...register("instagram")} />
      </FieldShell>
    </>
  );
}

// ─── Step 2 — Running Journey ────────────────────────────────────────────────

function Step2RunningJourney({
  values,
  setValue,
  register,
  errors,
}: {
  values: First5kClubFormValues;
  setValue: ReturnType<typeof useForm<First5kClubFormValues>>["setValue"];
  register: ReturnType<typeof useForm<First5kClubFormValues>>["register"];
  errors: FieldErrors<First5kClubFormValues>;
}) {
  const showHambatanLainnya = values.hambatan?.includes("Yang lain");
  const showTargetLainnya = values.target === "Yang lain";

  return (
    <>
      <SectionTitle title="Your Running Journey" subtitle="Ceritakan sedikit tentang perjalanan larimu." />
      <FieldShell label="Seberapa sering kamu berlari?">
        <PillSingleSelect
          options={RUN_FREQUENCY_OPTIONS}
          value={values.seberapaSeringBerlari}
          onChange={(v) => setValue("seberapaSeringBerlari", v as First5kClubFormValues["seberapaSeringBerlari"])}
        />
      </FieldShell>
      <FieldShell label="Apakah kamu pernah menyelesaikan lari sejauh 5K?">
        <PillSingleSelect
          options={FIVE_K_EXPERIENCE_OPTIONS}
          value={values.pengalaman5k}
          onChange={(v) => setValue("pengalaman5k", v as First5kClubFormValues["pengalaman5k"])}
        />
      </FieldShell>
      <FieldShell label="Apa alasan utama kamu ingin mengikuti FIRST 5K CLUB?" required error={errors.alasanUtama?.message}>
        <TextAreaField placeholder="Ceritakan alasanmu..." error={errors.alasanUtama?.message} {...register("alasanUtama")} />
      </FieldShell>
      <FieldShell label="Apa yang biasanya membuat kamu ragu atau kesulitan untuk mulai berlari?">
        <PillMultiSelect
          options={HESITATION_OPTIONS}
          value={values.hambatan ?? []}
          onChange={(v) => setValue("hambatan", v)}
        />
        {showHambatanLainnya && (
          <TextField
            className="mt-2"
            placeholder="Tulis alasan lainnya"
            {...register("hambatanLainnya")}
          />
        )}
      </FieldShell>
      <FieldShell label="Apa target kamu dalam mengikuti FIRST 5K CLUB?">
        <PillSingleSelect
          options={TARGET_OPTIONS}
          value={values.target}
          onChange={(v) => setValue("target", v as First5kClubFormValues["target"])}
        />
        {showTargetLainnya && (
          <TextField className="mt-2" placeholder="Tulis target lainnya" {...register("targetLainnya")} />
        )}
      </FieldShell>
    </>
  );
}

// ─── Step 3 — Event Information ──────────────────────────────────────────────

function Step3EventInfo({
  values,
  setValue,
  errors,
}: {
  values: First5kClubFormValues;
  setValue: ReturnType<typeof useForm<First5kClubFormValues>>["setValue"];
  errors: FieldErrors<First5kClubFormValues>;
}) {
  return (
    <>
      <SectionTitle title="Event Information" subtitle="Pilih ukuran jersey dan konfirmasi kesediaanmu." />
      <FieldShell
        label="Ukuran Jersey"
        required
        hint="Pastikan memilih ukuran dengan benar — tidak dapat diubah atau ditukar setelah pendaftaran."
        error={errors.ukuranJersey?.message}
      >
        <div className="relative mb-1 w-full overflow-hidden rounded-xl border border-neutral-200">
          <Image
            src="/images/Jersey Size Chart.jpg.jpeg"
            alt="Referensi ukuran jersey FIRST 5K CLUB"
            width={3840}
            height={6413}
            className="h-auto w-full"
            sizes="(max-width: 640px) 100vw, 512px"
          />
        </div>
        <PillSingleSelect
          options={JERSEY_SIZE_OPTIONS}
          value={values.ukuranJersey}
          onChange={(v) => setValue("ukuranJersey", v as First5kClubFormValues["ukuranJersey"])}
          error={errors.ukuranJersey?.message}
          columns={2}
        />
      </FieldShell>
      <FieldShell
        label="Apakah kamu bersedia mengikuti seluruh rangkaian acara dari awal sampai selesai?"
        required
        error={errors.bersediaIkutAcara?.message}
      >
        <PillSingleSelect
          options={YES_NO_OPTIONS}
          value={values.bersediaIkutAcara}
          onChange={(v) => setValue("bersediaIkutAcara", v as First5kClubFormValues["bersediaIkutAcara"])}
          error={errors.bersediaIkutAcara?.message}
        />
      </FieldShell>
      <FieldShell
        label="Apakah kamu bersedia mengunggah Instagram Story selama atau setelah kegiatan dan menandai akun yang telah ditentukan?"
        required
        error={errors.bersediaUploadIg?.message}
      >
        <PillSingleSelect
          options={YES_NO_OPTIONS}
          value={values.bersediaUploadIg}
          onChange={(v) => setValue("bersediaUploadIg", v as First5kClubFormValues["bersediaUploadIg"])}
          error={errors.bersediaUploadIg?.message}
        />
      </FieldShell>
    </>
  );
}

// ─── Step 4 — Emergency & Safety Information ─────────────────────────────────

function Step4Emergency({
  register,
  errors,
}: {
  register: ReturnType<typeof useForm<First5kClubFormValues>>["register"];
  errors: FieldErrors<First5kClubFormValues>;
}) {
  return (
    <>
      <SectionTitle title="Emergency & Safety Information" subtitle="Data ini hanya digunakan untuk keamanan selama acara." />
      <FieldShell label="Nama Kontak Darurat" required error={errors.namaKontakDarurat?.message}>
        <TextField placeholder="Nama kontak darurat" error={errors.namaKontakDarurat?.message} {...register("namaKontakDarurat")} />
      </FieldShell>
      <FieldShell label="Nomor Kontak Darurat" required error={errors.nomorKontakDarurat?.message}>
        <TextField inputMode="tel" placeholder="08xxxxxxxxxx" error={errors.nomorKontakDarurat?.message} {...register("nomorKontakDarurat")} />
      </FieldShell>
      <FieldShell
        label="Hubungan dengan Kontak Darurat"
        required
        hint="Contoh: Orang tua, pasangan, saudara, atau teman."
        error={errors.hubunganKontakDarurat?.message}
      >
        <TextField placeholder="Hubungan" error={errors.hubunganKontakDarurat?.message} {...register("hubunganKontakDarurat")} />
      </FieldShell>
      <FieldShell
        label="Apakah terdapat kondisi kesehatan, riwayat cedera, alergi, atau informasi penting yang perlu diketahui oleh penyelenggara?"
        required
        hint='Isi "Tidak Ada" apabila tidak memiliki kondisi khusus.'
        error={errors.kondisiKesehatan?.message}
      >
        <TextAreaField placeholder="Tidak Ada" error={errors.kondisiKesehatan?.message} {...register("kondisiKesehatan")} />
      </FieldShell>
    </>
  );
}

// ─── Step 5 — Agreement & Consent ────────────────────────────────────────────

function Step5Agreement({
  values,
  setValue,
  errors,
}: {
  values: First5kClubFormValues;
  setValue: ReturnType<typeof useForm<First5kClubFormValues>>["setValue"];
  errors: FieldErrors<First5kClubFormValues>;
}) {
  const checked = values.pernyataanPeserta ?? [];

  const toggleStatement = (key: string) => {
    setValue(
      "pernyataanPeserta",
      checked.includes(key) ? checked.filter((k) => k !== key) : [...checked, key]
    );
  };

  return (
    <>
      <SectionTitle title="Agreement & Consent" subtitle="Mohon baca dan centang seluruh pernyataan berikut untuk melanjutkan." />
      <FieldShell label="Pernyataan Peserta" required error={errors.pernyataanPeserta?.message as string | undefined}>
        <div className="flex flex-col gap-2">
          {PARTICIPANT_STATEMENTS.map((s) => (
            <ConsentCheckbox key={s.key} label={s.label} checked={checked.includes(s.key)} onChange={() => toggleStatement(s.key)} />
          ))}
        </div>
      </FieldShell>
      <FieldShell label="Persetujuan Penggunaan Data" required error={errors.persetujuanData?.message}>
        <PillSingleSelect
          options={CONSENT_OPTIONS}
          value={values.persetujuanData}
          onChange={(v) => setValue("persetujuanData", v as First5kClubFormValues["persetujuanData"])}
          error={errors.persetujuanData?.message}
        />
      </FieldShell>
    </>
  );
}

// ─── Step 6 — Review & Submit ────────────────────────────────────────────────

function Step6Review({ values, onEdit }: { values: First5kClubFormValues; onEdit: (step: number) => void }) {
  const rows: { label: string; value: string; step: number }[] = [
    { label: "Nama", value: values.nama, step: 1 },
    { label: "Tanggal Lahir", value: values.tanggalLahir || "-", step: 1 },
    { label: "WhatsApp", value: values.whatsapp, step: 1 },
    { label: "Email", value: values.email, step: 1 },
    { label: "Domisili", value: values.domisili, step: 1 },
    { label: "Komunitas", value: values.komunitas, step: 1 },
    { label: "Instagram", value: values.instagram, step: 1 },
    { label: "Seberapa Sering Berlari", value: values.seberapaSeringBerlari || "-", step: 2 },
    { label: "Pengalaman 5K", value: values.pengalaman5k || "-", step: 2 },
    { label: "Alasan Utama", value: values.alasanUtama, step: 2 },
    { label: "Target", value: values.target === "Yang lain" ? values.targetLainnya || "-" : values.target || "-", step: 2 },
    { label: "Ukuran Jersey", value: values.ukuranJersey, step: 3 },
    { label: "Ikut Acara Penuh", value: values.bersediaIkutAcara, step: 3 },
    { label: "Upload IG Story", value: values.bersediaUploadIg, step: 3 },
    { label: "Kontak Darurat", value: `${values.namaKontakDarurat} (${values.hubunganKontakDarurat}) — ${values.nomorKontakDarurat}`, step: 4 },
    { label: "Kondisi Kesehatan", value: values.kondisiKesehatan, step: 4 },
  ];

  return (
    <>
      <SectionTitle title="Review & Submit" subtitle="Periksa kembali data kamu sebelum mengirim pendaftaran." />
      <div className="flex flex-col divide-y divide-neutral-100 rounded-xl border border-neutral-200">
        {rows.map((r) => (
          <button
            type="button"
            key={r.label}
            onClick={() => onEdit(r.step)}
            className="flex items-start justify-between gap-3 px-4 py-3 text-left hover:bg-neutral-50"
          >
            <span>
              <span className="block text-xs font-semibold text-neutral-500">{r.label}</span>
              <span className="block text-sm text-neutral-900">{r.value}</span>
            </span>
            <span className="shrink-0 text-xs font-semibold text-brand-orange">Ubah</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-neutral-500">
        Dengan menekan &ldquo;Daftar Sekarang&rdquo;, kamu menyatakan seluruh pernyataan persetujuan pada langkah sebelumnya berlaku
        untuk pendaftaran ini.
      </p>
    </>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-lg font-black uppercase tracking-tight text-neutral-900">{title}</h2>
      <p className="mt-0.5 text-sm text-neutral-500">{subtitle}</p>
    </div>
  );
}
