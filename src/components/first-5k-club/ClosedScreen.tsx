"use client";

import { EventHero } from "./EventHero";

export function ClosedScreen() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-10">
      <EventHero />

      <div className="relative mx-auto -mt-6 max-w-lg rounded-t-3xl bg-white px-5 pt-7 pb-8 shadow-xl sm:px-8">
        <h2 className="text-lg font-black uppercase tracking-tight text-neutral-900">
          First 5K Club Registration Form
        </h2>

        <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-neutral-700">
          <p>Terima kasih atas antusiasmenya untuk bergabung di FIRST 5K CLUB.</p>
          <p>Saat ini, kuota peserta sudah terpenuhi dan pendaftaran resmi ditutup.</p>
          <p>Sampai bertemu di kesempatan berikutnya.</p>
          <p className="font-bold text-neutral-900">Run your pace, find your people.</p>
        </div>
      </div>
    </div>
  );
}
