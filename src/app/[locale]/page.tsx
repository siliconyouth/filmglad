import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Synopsis from "@/components/Synopsis";
import Trailer from "@/components/Trailer";
import HomeDonateSection from "@/components/HomeDonateSection";
import DonorShowcase, { Donor } from "@/components/DonorShowcase";
import NewsSection from "@/components/NewsSection";
import CrewCastSection from "@/components/CrewCastSection";
import GallerySection from "@/components/GallerySection";
import { kv } from "@vercel/kv";

interface PageProps {
  params: Promise<{ locale: string }>;
}

async function getDonors(): Promise<Donor[]> {
  try {
    const donorStrings = await kv.zrange("donors", 0, -1, { rev: true });
    return donorStrings.map((str) => {
      if (typeof str === "string") {
        return JSON.parse(str);
      }
      return str as Donor;
    });
  } catch {
    return [];
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const donors = await getDonors();

  return (
    <>
      <Hero />
      <HomeDonateSection />
      <DonorShowcase donors={donors} />
      <Synopsis />
      <GallerySection />
      <CrewCastSection />
      <NewsSection />
      <Trailer />
    </>
  );
}
