import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Synopsis from "@/components/Synopsis";
import Trailer from "@/components/Trailer";
import HomeDonateSection from "@/components/HomeDonateSection";
import DonorShowcase from "@/components/DonorShowcase";
import NewsSection from "@/components/NewsSection";
import CrewCastSection from "@/components/CrewCastSection";
import GallerySection from "@/components/GallerySection";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <HomeDonateSection />
      <DonorShowcase />
      <Synopsis />
      <GallerySection />
      <CrewCastSection />
      <NewsSection />
      <Trailer />
    </>
  );
}
