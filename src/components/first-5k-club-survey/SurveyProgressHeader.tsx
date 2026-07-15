"use client";

import { EventHero } from "@/components/first-5k-club/EventHero";

const STEP_LABELS = [
  "Participant Info",
  "Event Experience",
  "Post Run & Benefits",
  "Community Interest",
  "Testimonial",
];

export function SurveyProgressHeader({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <EventHero>
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
    </EventHero>
  );
}
