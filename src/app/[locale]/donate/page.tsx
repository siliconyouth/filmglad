import { setRequestLocale, getTranslations } from "next-intl/server";
import { Heart } from "lucide-react";
import DonorTiers from "@/components/DonorTiers";
import DonorShowcase from "@/components/DonorShowcase";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donate" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function DonatePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "donate" });

  return (
    <div className="pt-24 bg-gradient-to-b from-black/50 to-background">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-accent mb-6">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">
                {t("mentalHealth")}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              {t("title")}
            </h1>

            <p className="text-lg text-muted max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          <DonorTiers />
        </div>
      </section>

      <DonorShowcase />
    </div>
  );
}
