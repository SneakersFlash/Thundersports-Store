import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link"; // Tambahkan import Link
import { TrustRow }          from "@/components/home/TrustRow";
import { HeroBanner }        from "@/components/home/HeroBanner";
import { CategoryShortcuts } from "@/components/home/CategoryShortcuts";
import { BrandCarousel }     from "@/components/home/BrandCarousel";
import { ProductSection }    from "@/components/home/ProductSection";
import { Suspense } from "react"; // 1. Add this import
// Services
import { bannersService } from "@/lib/api/banners.service";
import { categoriesService } from "@/lib/api/categories.service";
import CampaignsService from "@/lib/api/campaigns.service";
import { EventCampaignSection } from "@/components/home/EventCampaignSection"
import VoucherClaimSection from "@/components/home/VoucherClaimSection";

export const metadata: Metadata = {
  title: "ThunderSports — Premium Sports Footwear & Gear",
  description:
    "Toko sepatu & perlengkapan olahraga premium Indonesia. Nike, Adidas, New Balance dan lebih. Gratis ongkir di atas Rp 500k.",
};

export const revalidate = 60;

const SECTION_COLORS = [
  "#4A3728",
  "#1A2E1A",
  "#1A1A2E",
  "#2D2A26",
  "#3E2723",
];

export default async function HomePage() {
  // Fetch Data (Banners, Categories, & Active Campaigns)
  const [banners, apiCategories, campaigns, middleBanners] = await Promise.all([
    bannersService.getBanners("home_top").catch(() => []),
    categoriesService.getAll().catch(() => []), 
    CampaignsService.getEvent().catch(()=> []),
    bannersService.getBanners("home_middle").catch(() => [])
  ]);

  const sidebarBanner = middleBanners?.[0];

  const getCategoryImage = (categoryName: string) => {
    const foundCategory = (apiCategories as any[]).find(
      (c) => c.name.toLowerCase() === categoryName.toLowerCase()
    );
    return foundCategory?.imageUrl || null;
  };

  const firstGroup = [
    {
      id: "entry-level",
      title: "Entry-Level",
      filters: { tag: "entry level", limit: 8 },
      href: "/products?tag=entry+level",
      bgImage: getCategoryImage("Footwear")
    },
    {
      id: "mid-level",
      title: "Mid-Level",
      filters: { tag: "mid level", limit: 8 },
      href: "/products?tag=mid+level",
      bgImage: getCategoryImage("Lifestyle/Casual")
    }
  ];

  const restGroup = [
    {
      id: "elite-level",
      title: "Elite / Racing",
      filters: { tag: "elite / racing", limit: 8 },
      href: "/products?tag=elite+%2F+racing",
      bgImage: getCategoryImage("Womens")
    },
  ];  

  return (
    <>
      <TrustRow />
      <HeroBanner banners={banners} />
      
      {/* ========================================== */}
      {/* BAGIAN EVENT / CAMPAIGN (e.g. LAST DROP)   */}
      {/* ========================================== */}
      <div className="container mx-auto px-4 max-w-7xl mt-4">

        <Suspense fallback={<div className="h-32 w-full animate-pulse bg-gray-100 rounded-xl" />}>
          <VoucherClaimSection />
        </Suspense>

      <EventCampaignSection campaigns={campaigns} />

      <CategoryShortcuts />
      <BrandCarousel />

        {/* ========================================== */}
        {/* KAWASAN PRODUK REGULER (Footwear, dll)     */}
        {/* ========================================== */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          

          {/* KUMPULAN PRODUCT SECTION (Kanan) */}
          <div className="flex-1 flex flex-col gap-4 w-full min-w-0">
            {firstGroup.map((section) => (
              <ProductSection
                key={section.id}
                title={section.title}
                filters={section.filters}
                viewAllHref={section.href}
                backgroundImage={section.bgImage}
              />
            ))}
            {restGroup.map((section, index) => {
              const bgColor = SECTION_COLORS[index % SECTION_COLORS.length];
              return (
                <ProductSection
                  key={section.id}
                  title={section.title}
                  filters={section.filters}
                  bgColor={bgColor}
                  viewAllHref={section.href}
                  backgroundImage={section.bgImage}
                />
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}