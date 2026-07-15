"use client";

export function SurveyConfirmationScreen() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-orange px-6 py-16 text-center">
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 opacity-20 sm:h-56 sm:w-56">
        <div className="grid h-full w-full grid-cols-6 grid-rows-6 gap-0.5">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className={`bg-brand-blue ${(i + Math.floor(i / 6)) % 3 === 0 ? "opacity-0" : ""}`} />
          ))}
        </div>
      </div>

      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white">
        <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-brand-orange">
          <path d="M4 12.5 9.5 18 20 6" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1 className="relative mt-6 font-display text-3xl font-black italic text-brand-white sm:text-4xl">
        Thank you for sharing your feedback.
      </h1>
      <p className="relative mt-3 max-w-md text-sm text-white/90">
        We&rsquo;re glad to have you as part of First 5K Club. See you on the next run with Thunder Sports.
      </p>

      <p className="relative mt-10 font-display text-lg font-black italic text-brand-white">
        RUN YOUR PACE, FIND YOUR PEOPLE.
      </p>
    </div>
  );
}
