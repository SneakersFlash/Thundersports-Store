"use client";

import { EventHero } from "@/components/first-5k-club/EventHero";

export function SurveyIntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-10">
      <EventHero />

      <div className="relative mx-auto -mt-6 max-w-lg rounded-t-3xl bg-white px-5 pt-7 pb-8 shadow-xl sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Post Event Survey</p>
        <h2 className="mt-1 text-lg font-black uppercase tracking-tight text-neutral-900">
          First 5K Club Post Event Survey
        </h2>

        <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-neutral-700">
          <p>Thank you for joining First 5K Club.</p>
          <p>
            We&rsquo;d love to hear your thoughts about the event. Your feedback will help us improve the next running
            experience and create better community activities for runners like you.
          </p>
          <p className="font-semibold text-neutral-900">This survey will only take around 3–5 minutes.</p>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mt-6 w-full rounded-xl bg-brand-orange py-3.5 text-sm font-bold text-white shadow-md shadow-brand-orange/30 transition-colors hover:bg-brand-orangeDark"
        >
          Mulai Isi Survey
        </button>
      </div>
    </div>
  );
}
