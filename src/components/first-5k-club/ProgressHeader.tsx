"use client";

import Image from "next/image";

const STEP_LABELS = ["Data Diri", "Running Journey", "Event Info", "Emergency", "Persetujuan", "Review"];

const COLLAB_LOGOS = [
  { src: "/images/LOGO THUNDER SPORT FULL WHITE.png", alt: "Thunder Sports", width: 110 },
  { src: "/images/logo uss run 2026-03.png", alt: "USS Running", width: 70 },
  { src: "/images/CREAM LOGO.png", alt: "Berkawan Hub", width: 100 },
];

const SUPPORTER_LOGOS = [
  { src: "/images/Logo Full Putih.png", alt: "Sneakers Flash", width: 90 },
  { src: "/images/NUSA LOGO BODAS.png", alt: "Nusa Activewear", width: 60 },
  { src: "/images/Sunpride_Logo_FA_CMYK_Reverse_white-01__3_-removebg-preview.png", alt: "Sunpride", width: 70 },
  { src: "/images/Oatside_Wordmark_White.png", alt: "Oatside", width: 70 },
];

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
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {COLLAB_LOGOS.map((logo) => (
            <div key={logo.src} className="relative h-7 sm:h-8" style={{ width: logo.width }}>
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" sizes="120px" />
            </div>
          ))}
        </div>
        <h1 className="mt-4 font-display text-4xl font-black italic text-brand-white sm:text-5xl">
          FIRST 5K CLUB
        </h1>
        <p className="mt-1 text-sm font-semibold text-white/90 sm:text-base">
          Run your pace. Find your people.
        </p>

        <div className="mt-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Supported by</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {SUPPORTER_LOGOS.map((logo) => (
              <div key={logo.src} className="relative h-5 sm:h-6" style={{ width: logo.width }}>
                <Image src={logo.src} alt={logo.alt} fill className="object-contain" sizes="100px" />
              </div>
            ))}
          </div>
        </div>

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
