"use client";

const STEP_LABELS = ["Data Diri", "Running Journey", "Event Info", "Emergency", "Persetujuan", "Review"];

export function ProgressHeader({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div className="relative overflow-hidden bg-brand-orange px-5 pt-8 pb-6 sm:pt-10 sm:pb-8">
      {/* Blue pixel-block accent, echoes the campaign banner */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 opacity-20 sm:h-56 sm:w-56">
        <div className="grid h-full w-full grid-cols-6 grid-rows-6 gap-0.5">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className={`bg-brand-blue ${(i + Math.floor(i / 6)) % 3 === 0 ? "opacity-0" : ""}`} />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-lg text-center">
        <p className="text-xs font-bold tracking-[0.2em] text-white/80">
          THUNDER SPORTS × SNEAKERS FLASH × USS RUNNING × BERKAWAN HUB
        </p>
        <h1 className="mt-2 font-display text-4xl font-black italic text-brand-white sm:text-5xl">
          FIRST 5K CLUB
        </h1>
        <p className="mt-1 text-sm font-semibold text-white/90 sm:text-base">
          Run your pace. Find your people.
        </p>

        {/* Step progress */}
        <div className="mt-6 flex items-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < step ? "bg-brand-blue" : "bg-white/30"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-xs font-medium text-white/80">
          Langkah {step} dari {totalSteps} — {STEP_LABELS[step - 1]}
        </p>
      </div>
    </div>
  );
}
