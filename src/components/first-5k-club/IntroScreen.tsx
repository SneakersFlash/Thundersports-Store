"use client";

import { EventHero } from "./EventHero";

export function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-10">
      <EventHero />

      <div className="relative mx-auto -mt-6 max-w-lg rounded-t-3xl bg-white px-5 pt-7 pb-8 shadow-xl sm:px-8">
        <h2 className="text-lg font-black uppercase tracking-tight text-neutral-900">
          First 5K Club Registration Form
        </h2>
        <p className="mt-1 text-sm font-bold text-neutral-900">Run your pace, find your people.</p>

        <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-neutral-700">
          <p>
            FIRST 5K CLUB adalah community running activation yang mengusung konsep <strong>&ldquo; RUN YOUR PACE, FIND YOUR
            PEOPLE&rdquo;</strong>, di mana kamu bisa berlari dengan pace yang paling nyaman sekaligus bertemu dan terhubung
            dengan banyak orang dalam suasana yang fun, supportive, dan community-driven.
          </p>
          <p>
            Acara ini bukan tentang siapa yang paling cepat. Ini tentang menikmati proses berlari sesuai ritmemu
            sendiri, memilih pace yang kamu mau — pace 7, 8, atau 9 — dan menemukan teman baru melalui pengalaman
            lari bersama.
          </p>
          <p>
            FIRST 5K CLUB merupakan hasil kolaborasi antara <strong>Thunder Sports</strong> bersama{" "}
            <strong>Sneakers Flash</strong>, <strong>USS Running</strong>, dan <strong>Berkawan Hub</strong>, yang
            bersama-sama menghadirkan pengalaman lari komunitas yang lebih seru dan inklusif.
          </p>
          <p>
            Didukung juga oleh official sponsors, yaitu <strong>Nusa Activewear</strong> sebagai{" "}
            <strong>Official Jersey Partner</strong>, serta <strong>SUNPRIDE</strong> dan <strong>OATSIDE</strong>{" "}
            sebagai sponsor yang turut mendukung terselenggaranya acara ini.
          </p>
        </div>

        <dl className="mt-5 flex flex-col gap-1.5 rounded-xl border border-neutral-200 p-4 text-sm">
          <div className="flex gap-2">
            <dt className="w-32 shrink-0 font-bold text-neutral-900">Tanggal</dt>
            <dd className="text-neutral-700">19 Juli 2026</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-32 shrink-0 font-bold text-neutral-900">Waktu</dt>
            <dd className="text-neutral-700">06.00 WIB - selesai</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-32 shrink-0 font-bold text-neutral-900">Lokasi</dt>
            <dd className="text-neutral-700">
              Berkawan Hub (Jl. Panglima Polim I No.64A, RT.3/RW.6, Melawai, Kec. Kby. Baru, Kota Jakarta Selatan,
              Daerah Khusus Ibukota Jakarta 12160)
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-32 shrink-0 font-bold text-neutral-900">Biaya Registrasi</dt>
            <dd className="text-neutral-700">Gratis</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-32 shrink-0 font-bold text-neutral-900">Kuota</dt>
            <dd className="text-neutral-700">Terbatas</dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-neutral-700">
          <p>Mohon mengisi seluruh informasi dengan lengkap dan benar.</p>
          <p>
            Setelah menyelesaikan formulir, kamu akan mendapatkan link untuk bergabung ke dalam{" "}
            <strong>WhatsApp Group resmi FIRST 5K CLUB</strong>. Pastikan kamu langsung bergabung karena seluruh
            informasi dan update mengenai acara akan disampaikan melalui grup tersebut.
          </p>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mt-6 w-full rounded-xl bg-brand-orange py-3.5 text-sm font-bold text-white shadow-md shadow-brand-orange/30 transition-colors hover:bg-brand-orangeDark"
        >
          Mulai Daftar Sekarang
        </button>
      </div>
    </div>
  );
}
