"use client";

import { useState } from "react";
import { useForm, type FieldErrors, type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { SurveyProgressHeader } from "@/components/first-5k-club-survey/SurveyProgressHeader";
import { SurveyIntroScreen } from "@/components/first-5k-club-survey/SurveyIntroScreen";
import { SurveyConfirmationScreen } from "@/components/first-5k-club-survey/SurveyConfirmationScreen";
import {
  FieldShell,
  TextField,
  TextAreaField,
  PillSingleSelect,
  PillMultiSelect,
  LinearScale,
} from "@/components/first-5k-club/FormFields";
import {
  first5kSurveySchema,
  defaultFirst5kSurveyValues,
  STEP_FIELDS,
  TOTAL_STEPS,
  PACE_GROUP_OPTIONS,
  FIRST_EXPERIENCE_OPTIONS,
  LIKED_PARTS_OPTIONS,
  PACER_HELPFUL_OPTIONS,
  ROUTE_COMFORT_OPTIONS,
  POST_RUN_GAMES_OPTIONS,
  DURATION_OPTIONS,
  BENEFIT_INTEREST_OPTIONS,
  FAVORITE_BENEFIT_OPTIONS,
  NEXT_ACTIVITY_INTEREST_OPTIONS,
  COMMUNITY_INTEREST_OPTIONS,
  DESIRED_ACTIVITIES_OPTIONS,
  PREFERRED_DAYS_OPTIONS,
  PREFERRED_AREAS_OPTIONS,
  NEXT_FORMAT_OPTIONS,
  TESTIMONIAL_PERMISSION_OPTIONS,
  CONTACT_PERMISSION_OPTIONS,
  type First5kSurveyFormValues,
} from "@/lib/validation/first5k-survey.schema";

type Register = UseFormRegister<First5kSurveyFormValues>;
type SetValue = UseFormSetValue<First5kSurveyFormValues>;
type Errors = FieldErrors<First5kSurveyFormValues>;

export function First5kSurveyClient() {
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
  } = useForm<First5kSurveyFormValues>({
    resolver: zodResolver(first5kSurveySchema),
    defaultValues: defaultFirst5kSurveyValues,
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

  const onSubmit = async (values: First5kSurveyFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/first-5k-club-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? "Gagal mengirim survey");
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mengirim survey. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = () => toast.error("Mohon lengkapi data yang wajib diisi.");

  if (submitted) {
    return <SurveyConfirmationScreen />;
  }

  if (!started) {
    return (
      <SurveyIntroScreen
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
      <SurveyProgressHeader step={step} totalSteps={TOTAL_STEPS} />

      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
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
            {step === 1 && <Section1 register={register} setValue={setValue} values={values} errors={errors} />}
            {step === 2 && <Section2 register={register} setValue={setValue} values={values} />}
            {step === 3 && <Section3 register={register} setValue={setValue} values={values} />}
            {step === 4 && <Section4 register={register} setValue={setValue} values={values} />}
            {step === 5 && <Section5 register={register} setValue={setValue} values={values} />}
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
              onClick={handleSubmit(onSubmit, onInvalid)}
              disabled={isSubmitting}
              className="flex-[2] rounded-xl bg-brand-blue py-3 text-sm font-bold text-white shadow-md shadow-brand-blue/30 transition-colors hover:bg-brand-blueDark disabled:opacity-60"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Survey"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section 1 — Participant Information ─────────────────────────────────────

function Section1({
  register,
  setValue,
  values,
  errors,
}: {
  register: Register;
  setValue: SetValue;
  values: First5kSurveyFormValues;
  errors: Errors;
}) {
  return (
    <>
      <SectionTitle title="Participant Information" subtitle="Sedikit informasi tentang kamu sebagai peserta." />
      <FieldShell label="Nama lengkap" required error={errors.namaLengkap?.message}>
        <TextField placeholder="Nama lengkap" error={errors.namaLengkap?.message} {...register("namaLengkap")} />
      </FieldShell>
      <FieldShell label="Instagram username" hint="Tuliskan dengan format @username">
        <TextField placeholder="@username" {...register("instagram")} />
      </FieldShell>
      <FieldShell label="Nomor WhatsApp aktif" required error={errors.whatsapp?.message}>
        <TextField placeholder="08xxxxxxxxxx" inputMode="tel" error={errors.whatsapp?.message} {...register("whatsapp")} />
      </FieldShell>
      <FieldShell label="Pace group saat event">
        <PillSingleSelect
          options={PACE_GROUP_OPTIONS}
          value={values.paceGroup}
          onChange={(v) => setValue("paceGroup", v as First5kSurveyFormValues["paceGroup"])}
          columns={2}
        />
      </FieldShell>
      <FieldShell label="Apakah ini pengalaman pertama kamu mengikuti 5K run event?">
        <PillSingleSelect
          options={FIRST_EXPERIENCE_OPTIONS}
          value={values.firstExperience}
          onChange={(v) => setValue("firstExperience", v as First5kSurveyFormValues["firstExperience"])}
        />
      </FieldShell>
    </>
  );
}

// ─── Section 2 — Event Experience ────────────────────────────────────────────

function Section2({
  register,
  setValue,
  values,
}: {
  register: Register;
  setValue: SetValue;
  values: First5kSurveyFormValues;
}) {
  const showLikedOther = values.likedParts?.includes("Other");
  return (
    <>
      <SectionTitle title="Event Experience" subtitle="Bagaimana pengalaman kamu selama event berlangsung." />
      <FieldShell label="Overall, bagaimana pengalaman kamu mengikuti First 5K Club?">
        <LinearScale
          value={values.overallExperience || undefined}
          onChange={(n) => setValue("overallExperience", n)}
          minLabel="1 = Not satisfied"
          maxLabel="5 = Very satisfied"
        />
      </FieldShell>
      <FieldShell label="Apa bagian yang paling kamu suka dari First 5K Club?">
        <PillMultiSelect
          options={LIKED_PARTS_OPTIONS}
          value={values.likedParts ?? []}
          onChange={(v) => setValue("likedParts", v)}
        />
        {showLikedOther && (
          <TextField className="mt-2" placeholder="Tulis lainnya" {...register("likedPartsOther")} />
        )}
      </FieldShell>
      <FieldShell label="Bagaimana pengalaman kamu dengan pacer dari USS Running?">
        <LinearScale
          value={values.pacerExperience || undefined}
          onChange={(n) => setValue("pacerExperience", n)}
          minLabel="1 = Not helpful"
          maxLabel="5 = Very helpful"
        />
      </FieldShell>
      <FieldShell label="Apakah pacer cukup membantu selama lari?">
        <PillSingleSelect
          options={PACER_HELPFUL_OPTIONS}
          value={values.pacerHelpful}
          onChange={(v) => setValue("pacerHelpful", v as First5kSurveyFormValues["pacerHelpful"])}
        />
      </FieldShell>
      <FieldShell label="Menurut kamu, apakah rute 5K-nya nyaman dan aman?">
        <PillSingleSelect
          options={ROUTE_COMFORT_OPTIONS}
          value={values.routeComfort}
          onChange={(v) => setValue("routeComfort", v as First5kSurveyFormValues["routeComfort"])}
          columns={2}
        />
      </FieldShell>
      <FieldShell label="Apa yang menurut kamu perlu diperbaiki dari First 5K Club?">
        <TextAreaField placeholder="Tulis masukan kamu..." {...register("improvement")} />
      </FieldShell>
    </>
  );
}

// ─── Section 3 — Post Run Activity & Benefits ────────────────────────────────

function Section3({
  register,
  setValue,
  values,
}: {
  register: Register;
  setValue: SetValue;
  values: First5kSurveyFormValues;
}) {
  return (
    <>
      <SectionTitle title="Post Run Activity & Benefits" subtitle="Tentang aktivitas setelah lari dan benefit event." />
      <FieldShell label="Bagaimana pendapat kamu tentang post-run games?">
        <PillSingleSelect
          options={POST_RUN_GAMES_OPTIONS}
          value={values.postRunGames}
          onChange={(v) => setValue("postRunGames", v as First5kSurveyFormValues["postRunGames"])}
        />
      </FieldShell>
      <FieldShell label="Apakah durasi acara menurut kamu sudah pas?">
        <PillSingleSelect
          options={DURATION_OPTIONS}
          value={values.duration}
          onChange={(v) => setValue("duration", v as First5kSurveyFormValues["duration"])}
        />
      </FieldShell>
      <FieldShell label="Apakah benefit event ini cukup menarik?">
        <PillSingleSelect
          options={BENEFIT_INTEREST_OPTIONS}
          value={values.benefitInterest}
          onChange={(v) => setValue("benefitInterest", v as First5kSurveyFormValues["benefitInterest"])}
        />
      </FieldShell>
      <FieldShell label="Benefit apa yang paling kamu suka?">
        <PillMultiSelect
          options={FAVORITE_BENEFIT_OPTIONS}
          value={values.favoriteBenefit ?? []}
          onChange={(v) => setValue("favoriteBenefit", v)}
        />
      </FieldShell>
      <FieldShell label="Dari semua benefit yang ada, apa yang menurut kamu paling memorable?">
        <TextAreaField placeholder="Ceritakan..." {...register("memorableBenefit")} />
      </FieldShell>
    </>
  );
}

// ─── Section 4 — Community Interest ──────────────────────────────────────────

function Section4({
  register,
  setValue,
  values,
}: {
  register: Register;
  setValue: SetValue;
  values: First5kSurveyFormValues;
}) {
  const showActivitiesOther = values.desiredActivities?.includes("Other");
  const showAreasOther = values.preferredAreas?.includes("Other");
  return (
    <>
      <SectionTitle title="Community Interest" subtitle="Rencana kamu untuk aktivitas lari berikutnya." />
      <FieldShell label="Apakah kamu tertarik ikut kegiatan lari berikutnya dari Thunder Sports?">
        <PillSingleSelect
          options={NEXT_ACTIVITY_INTEREST_OPTIONS}
          value={values.nextActivityInterest}
          onChange={(v) => setValue("nextActivityInterest", v as First5kSurveyFormValues["nextActivityInterest"])}
          columns={2}
        />
      </FieldShell>
      <FieldShell label="Kalau Thunder Sports membuat running community atau regular running session, kamu tertarik untuk join?">
        <PillSingleSelect
          options={COMMUNITY_INTEREST_OPTIONS}
          value={values.communityInterest}
          onChange={(v) => setValue("communityInterest", v as First5kSurveyFormValues["communityInterest"])}
        />
      </FieldShell>
      <FieldShell label="Aktivitas seperti apa yang kamu pengen ada berikutnya?">
        <PillMultiSelect
          options={DESIRED_ACTIVITIES_OPTIONS}
          value={values.desiredActivities ?? []}
          onChange={(v) => setValue("desiredActivities", v)}
        />
        {showActivitiesOther && (
          <TextField className="mt-2" placeholder="Tulis lainnya" {...register("desiredActivitiesOther")} />
        )}
      </FieldShell>
      <FieldShell label="Hari apa yang paling cocok buat kamu ikut aktivitas lari?">
        <PillMultiSelect
          options={PREFERRED_DAYS_OPTIONS}
          value={values.preferredDays ?? []}
          onChange={(v) => setValue("preferredDays", v)}
        />
      </FieldShell>
      <FieldShell label="Area mana yang paling nyaman buat kamu?">
        <PillMultiSelect
          options={PREFERRED_AREAS_OPTIONS}
          value={values.preferredAreas ?? []}
          onChange={(v) => setValue("preferredAreas", v)}
        />
        {showAreasOther && (
          <TextField className="mt-2" placeholder="Tulis area lainnya" {...register("preferredAreasOther")} />
        )}
      </FieldShell>
      <FieldShell label="Kalau ada event lari berikutnya, kamu lebih tertarik ikut format seperti apa?">
        <PillSingleSelect
          options={NEXT_FORMAT_OPTIONS}
          value={values.nextFormat}
          onChange={(v) => setValue("nextFormat", v as First5kSurveyFormValues["nextFormat"])}
        />
      </FieldShell>
    </>
  );
}

// ─── Section 5 — Testimonial & Permission ────────────────────────────────────

function Section5({
  register,
  setValue,
  values,
}: {
  register: Register;
  setValue: SetValue;
  values: First5kSurveyFormValues;
}) {
  return (
    <>
      <SectionTitle title="Testimonial & Permission" subtitle="Bagikan kesan kamu dan izin penggunaan testimonial." />
      <FieldShell label="Dalam satu kalimat, ceritakan pengalaman kamu ikut First 5K Club.">
        <TextAreaField placeholder="Satu kalimat tentang pengalaman kamu..." {...register("testimonialOneLine")} />
      </FieldShell>
      <FieldShell label="Boleh nggak jawaban kamu digunakan sebagai testimonial untuk kebutuhan konten Thunder Sports?">
        <PillSingleSelect
          options={TESTIMONIAL_PERMISSION_OPTIONS}
          value={values.testimonialPermission}
          onChange={(v) => setValue("testimonialPermission", v as First5kSurveyFormValues["testimonialPermission"])}
          columns={2}
        />
      </FieldShell>
      <FieldShell label="Apakah kamu bersedia dihubungi untuk event atau community activity berikutnya?">
        <PillSingleSelect
          options={CONTACT_PERMISSION_OPTIONS}
          value={values.contactPermission}
          onChange={(v) => setValue("contactPermission", v as First5kSurveyFormValues["contactPermission"])}
          columns={2}
        />
      </FieldShell>
      <FieldShell label="Ada pesan tambahan untuk Thunder Sports, USS Running, Berkawan Hub, atau sponsor First 5K Club?">
        <TextAreaField placeholder="Pesan tambahan..." {...register("additionalMessage")} />
      </FieldShell>
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
