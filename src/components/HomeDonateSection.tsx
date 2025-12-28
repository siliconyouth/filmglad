"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { Heart, ArrowRight, CreditCard } from "lucide-react";
import DonateButton from "./DonateButton";

const tierAmounts = [100, 250, 500, 1000, 2500];

export default function HomeDonateSection() {
  const t = useTranslations("donate");
  const locale = useLocale();
  const [amount, setAmount] = useState(1000);
  const [selectedTier, setSelectedTier] = useState<number | null>(1000);

  const handleTierSelect = (tierAmount: number) => {
    setSelectedTier(tierAmount);
    setAmount(tierAmount);
  };

  const handleCustomAmount = (value: string) => {
    const numValue = parseInt(value) || 1;
    setAmount(numValue);
    setSelectedTier(null);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-black/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 text-accent mb-4">
          <Heart className="w-5 h-5" />
          <span className="text-sm font-medium uppercase tracking-wider">
            {t("mentalHealth")}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
          {t("title")}
        </h2>

        <p className="text-base text-muted mb-8 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        {/* Tier selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {tierAmounts.map((tierAmount) => (
            <button
              key={tierAmount}
              onClick={() => handleTierSelect(tierAmount)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedTier === tierAmount
                  ? "btn-gradient"
                  : "bg-white/5 border border-white/20 hover:border-accent text-foreground"
              }`}
            >
              €{tierAmount}
            </button>
          ))}
        </div>

        {/* Custom amount input */}
        <div className="max-w-xs mx-auto mb-6">
          <label className="block text-sm text-muted mb-2">
            {t("customAmount")}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg">
              €
            </span>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => handleCustomAmount(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-accent text-center text-xl font-semibold"
            />
          </div>
        </div>

        {/* Payment button */}
        <div className="max-w-md mx-auto mb-6">
          <div className="flex items-center justify-center gap-2 text-sm text-muted mb-3">
            <CreditCard className="w-4 h-4" />
            <span>Secure payment via Stripe</span>
          </div>
          <DonateButton amount={amount} />
        </div>

        <Link
          href={`/${locale}/donate`}
          className="inline-flex items-center gap-2 text-accent hover:text-foreground transition-colors group text-sm"
        >
          <span>See all donation tiers & perks</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
