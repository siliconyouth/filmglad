"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import DonateButton from "./DonateButton";
import PayPalProvider from "./PayPalProvider";

export default function HomeDonateSection() {
  const t = useTranslations("donate");
  const locale = useLocale();

  return (
    <section className="py-24 bg-gradient-to-b from-background to-black/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 text-accent mb-6">
          <Heart className="w-5 h-5" />
          <span className="text-sm font-medium uppercase tracking-wider">
            {t("mentalHealth")}
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          {t("title")}
        </h2>

        <p className="text-lg text-muted mb-12 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        <div className="max-w-md mx-auto mb-8">
          <PayPalProvider>
            <DonateButton amount={25} />
          </PayPalProvider>
        </div>

        <Link
          href={`/${locale}/donate`}
          className="inline-flex items-center gap-2 text-accent hover:text-foreground transition-colors group"
        >
          <span>See all donation tiers</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
