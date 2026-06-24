"use client";

import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import SectionWrapper from "@/components/layout/SectionWrapper";

type Lang = "id" | "en";

const content = {
  id: {
    pageSubtitle: "Lahir dari semangat olahraga. Tumbuh selama satu dekade. Inilah perjalanan kami.",
    stats: [
      { value: "50K+", label: "Pelanggan Aktif" },
      { value: "10K+", label: "Produk Tersedia" },
      { value: "5★",   label: "Rating Kepuasan" },
      { value: "2015", label: "Berdiri Sejak" },
    ],
    storyTitle: "Cerita Kami",
    storyParagraphs: [
      "Dari Sebuah Passion Menjadi Destinasi Olahraga Terpercaya.",
      "Thunder Sports didirikan pada tahun 2015 dengan satu keyakinan sederhana. Setiap orang berhak mendapatkan akses ke sepatu dan perlengkapan olahraga original berkualitas tanpa ribet. Berawal dari inisiatif kecil yang didorong oleh passion, kini Thunder Sports berkembang menjadi salah satu destinasi terpercaya di Indonesia untuk sepatu dan perlengkapan olahraga.",
      "Seiring waktu, Thunder Sports tidak hanya sekadar menjual produk. Kami membangun komunitas yang terdiri dari atlet, pecinta olahraga, dan individu yang menjalani gaya hidup aktif.",
      "Lebih dari Sekadar Perlengkapan.",
      "Di Thunder Sports, setiap produk kami kurasi dengan cermat. Mulai dari sepatu lari, sepatu basket, jersey, hingga aksesori latihan, semua dipastikan memenuhi standar kualitas dan keaslian kami. Kami percaya bahwa perlengkapan olahraga bukan hanya sekadar peralatan. Ia adalah bagian dari semangat, performa, dan gaya hidup aktif. Karena itu, kami tidak hanya fokus pada apa yang kami jual, tetapi juga bagaimana kami menghadirkan pengalaman bagi setiap pelanggan.",
      "Dibangun dari Kepercayaan. Dikirim dengan Cepat.",
      "Kami berkomitmen untuk menghadirkan produk 100 persen original, pengiriman cepat dan terpercaya ke seluruh Indonesia, serta pengalaman belanja yang mudah dan nyaman. Dengan pertumbuhan yang terus berjalan, baik di platform digital maupun aktivitas offline, Thunder Sports akan terus melangkah maju — membawa semangat olahraga lebih dekat ke semua orang, kapan saja dan di mana saja.",
      "Inilah Thunder Sports. Tempat setiap langkah dimulai.",
    ],
    visionLabel: "🎯 Visi",
    visionText: "Menjadi destinasi utama untuk sepatu dan perlengkapan olahraga di Indonesia yang dikenal karena keaslian, kurasi produk, dan pengalaman belanja yang terpercaya.",
    missionLabel: "🚀 Misi",
    missionItems: [
      "Menyediakan sepatu dan perlengkapan olahraga yang 100 persen original dengan kualitas terbaik.",
      "Menghadirkan pilihan produk yang relevan untuk setiap cabang olahraga, mulai dari lari, basket, sepak bola, hingga latihan harian.",
      "Memberikan pengalaman belanja yang mudah, cepat, dan dapat diandalkan di seluruh Indonesia.",
      "Membangun komunitas yang terhubung melalui passion terhadap olahraga, performa, dan gaya hidup aktif.",
      "Terus berkembang melalui inovasi, baik secara digital maupun melalui berbagai aktivasi online dan offline.",
    ],
    valuesTitle: "Nilai Kami",
    values: [
      {
        icon: "⚡",
        title: "Thunder Speed",
        desc: "Kami bergerak cepat. Dari rilisan terbaru hingga sampai ke tanganmu. Dalam dunia olahraga yang dinamis, kecepatan adalah keunggulan kami.",
      },
      {
        icon: "✔",
        title: "100% Authentic",
        desc: "Keaslian adalah standar, bukan pilihan. Setiap produk melewati proses verifikasi ketat. No fake. No compromise.",
      },
      {
        icon: "🌐",
        title: "Community First",
        desc: "Kami tumbuh bersama komunitas. Thunder Sports bukan sekadar platform — ini rumah bagi para atlet dan pecinta olahraga.",
      },
      {
        icon: "♻",
        title: "Sustainable",
        desc: "Kami percaya pertumbuhan harus sejalan dengan tanggung jawab. Dari packaging hingga operasional, kami terus bergerak ke arah yang lebih berkelanjutan.",
      },
    ],
    timelineTitle: "Perjalanan Kami",
    milestones: [
      { year: "2015", event: "Thunder Sports lahir dari sebuah passion. Berawal dari keyakinan bahwa semua orang berhak mendapatkan perlengkapan olahraga original berkualitas." },
      { year: "2017", event: "Pelanggan pertama kami tumbuh hingga ribuan. Kepercayaan komunitas mulai terbentuk." },
      { year: "2019", event: "Ekspansi ke platform digital penuh. Hadir di seluruh Indonesia dengan pengiriman terpercaya." },
      { year: "2021", event: "Thunder Club diluncurkan — program membership eksklusif untuk para atlet dan pecinta olahraga sejati." },
      { year: "2023", event: "Bermitra dengan 50+ brand olahraga global. Warehouse diperluas untuk mendukung pertumbuhan." },
      { year: "2025", event: "50.000+ pelanggan aktif di seluruh Indonesia. Thunder Sports terus melangkah maju." },
    ],
  },

  en: {
    pageSubtitle: "Born from a passion for sport. Grown over a decade. This is our journey.",
    stats: [
      { value: "50K+", label: "Active Customers" },
      { value: "10K+", label: "Products Available" },
      { value: "5★",   label: "Satisfaction Rating" },
      { value: "2015", label: "Founded" },
    ],
    storyTitle: "Our Story",
    storyParagraphs: [
      "From a Passion for Sport to a Trusted Destination.",
      "Thunder Sports was founded in 2015 with one simple belief. Everyone deserves access to authentic, high-quality sports footwear and gear without the hassle. What started as a small initiative driven by passion has grown into one of Indonesia's trusted destinations for sports shoes and equipment.",
      "Over the years, Thunder Sports has evolved beyond just selling products. We've built a community of athletes, sports lovers, and everyday individuals who live an active lifestyle.",
      "More Than Just Gear.",
      "At Thunder Sports, we carefully curate every product. From running shoes and basketball shoes to jerseys and training accessories, ensuring every product meets our standard of authenticity and quality. We understand that sports gear is more than just equipment — it represents spirit, performance, and an active lifestyle. That's why we focus not only on what we sell, but also on how we deliver the experience.",
      "Built on Trust. Delivered with Speed.",
      "We are committed to 100 percent authentic products, fast and reliable nationwide shipping, and a seamless shopping experience. With continuous growth across digital platforms and offline activations, Thunder Sports continues to move forward — bringing the spirit of sport closer to everyone, anytime, anywhere.",
      "This is Thunder Sports. Where every step begins.",
    ],
    visionLabel: "🎯 Vision",
    visionText: "To become the leading destination for sports footwear and equipment in Indonesia, known for authenticity, curated selections, and a trusted shopping experience.",
    missionLabel: "🚀 Mission",
    missionItems: [
      "To provide 100 percent authentic sports footwear and equipment with the highest quality.",
      "To curate products that stay relevant for every sport, from running and basketball to football and everyday training.",
      "To deliver a seamless, fast, and reliable shopping experience across Indonesia.",
      "To build a community connected through a shared passion for sport, performance, and an active lifestyle.",
      "To continuously grow through innovation, both digitally and through online and offline activations.",
    ],
    valuesTitle: "Our Values",
    values: [
      {
        icon: "⚡",
        title: "Thunder Speed",
        desc: "We move fast. From the latest releases to your doorstep. In a dynamic sports world, speed is our edge.",
      },
      {
        icon: "✔",
        title: "100% Authentic",
        desc: "Authenticity is not an option — it's our standard. Every product goes through strict verification. No fakes. No compromises.",
      },
      {
        icon: "🌐",
        title: "Community First",
        desc: "We grow with the community. Thunder Sports is not just a platform — it's home for athletes and sports lovers.",
      },
      {
        icon: "♻",
        title: "Sustainable",
        desc: "We believe growth comes with responsibility. From packaging to operations, we're moving toward a more sustainable future.",
      },
    ],
    timelineTitle: "Our Journey",
    milestones: [
      { year: "2015", event: "Thunder Sports was born from passion — a belief that everyone deserves access to authentic, quality sports gear." },
      { year: "2017", event: "Our first customers grew to thousands. Community trust began to take shape." },
      { year: "2019", event: "Full expansion to digital. Nationwide shipping with trusted delivery partners." },
      { year: "2021", event: "Thunder Club launched — an exclusive membership program for true athletes and sports enthusiasts." },
      { year: "2023", event: "Partnered with 50+ global sports brands. Warehouse expanded to support growing demand." },
      { year: "2025", event: "50,000+ active customers across Indonesia. Thunder Sports keeps moving forward." },
    ],
  },
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
const headingParagraphs = new Set([
  "Dari Sebuah Passion Menjadi Destinasi Olahraga Terpercaya.",
  "Lebih dari Sekadar Perlengkapan.",
  "Dibangun dari Kepercayaan. Dikirim dengan Cepat.",
  "Inilah Thunder Sports. Tempat setiap langkah dimulai.",
  "From a Passion for Sport to a Trusted Destination.",
  "More Than Just Gear.",
  "Built on Trust. Delivered with Speed.",
  "This is Thunder Sports. Where every step begins.",
]);

export default function AboutPage() {
  const [lang, setLang] = useState<Lang>("id");
  const t = content[lang];

  return (
    <PageLayout>
      {/* Language Toggle */}
      <div className="flex justify-end px-6 pt-4">
        <div className="inline-flex border border-gray-300 overflow-hidden">
          {(["id", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors duration-150 ${
                lang === l ? "bg-black text-white" : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <PageHeader
        title="About ThunderSports"
        subtitle={t.pageSubtitle}
        accentWord="Sports"
      />

      <SectionWrapper>
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 mb-24">
          {t.stats.map((s) => (
            <div key={s.label} className="bg-white p-8 text-center">
              <p className="text-4xl md:text-5xl font-black text-black mb-2">{s.value}</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
          <div>
            <h2 className="text-2xl font-black text-black uppercase tracking-wider mb-6">
              {t.storyTitle}
            </h2>
            <div className="space-y-4 text-sm leading-relaxed">
              {t.storyParagraphs.map((p, i) =>
                headingParagraphs.has(p) ? (
                  <p key={i} className="font-black text-black uppercase tracking-wide text-base">
                    {p}
                  </p>
                ) : (
                  <p key={i} className="text-gray-600">{p}</p>
                )
              )}
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="space-y-5">
            <div className="border border-orange-300 bg-orange-50 p-6">
              <p className="text-orange-700 text-xs uppercase tracking-widest font-bold mb-3">
                {t.visionLabel}
              </p>
              <p className="text-gray-900 font-semibold leading-relaxed">{t.visionText}</p>
            </div>
            <div className="border border-gray-200 bg-gray-50 p-6">
              <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-3">
                {t.missionLabel}
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                {t.missionItems.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-2xl font-black text-black uppercase tracking-wider mb-8">
            {t.valuesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.values.map((v) => (
              <div
                key={v.title}
                className="border border-gray-200 bg-white p-6 hover:border-black transition-colors group"
              >
                <p className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">
                  {v.icon}
                </p>
                <p className="font-black text-black uppercase text-sm tracking-wider mb-3">
                  {v.title}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-2xl font-black text-black uppercase tracking-wider mb-8">
            {t.timelineTitle}
          </h2>
          <div className="space-y-0 max-w-2xl">
            {t.milestones.map((m, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-black mt-1 flex-shrink-0" />
                  {i < t.milestones.length - 1 && (
                    <div className="w-px flex-1 bg-gray-200 mt-1" style={{ minHeight: "40px" }} />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-black font-black text-xs tracking-widest mb-1">{m.year}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
