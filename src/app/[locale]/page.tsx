import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Synopsis from "@/components/Synopsis";
import Trailer from "@/components/Trailer";
import HomeDonateSection from "@/components/HomeDonateSection";
import DonorShowcase from "@/components/DonorShowcase";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Synopsis />
      <Trailer />
      <HomeDonateSection />
      <DonorShowcase />
    </>
  );
}
