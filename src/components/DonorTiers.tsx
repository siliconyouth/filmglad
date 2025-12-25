"use client";

import { useTranslations } from "next-intl";
import { Check, Star, Crown, Award, Medal } from "lucide-react";
import { useState } from "react";
import DonateButton from "./DonateButton";
import PayPalProvider from "./PayPalProvider";

const tiers = [
  { id: "supporter", amount: 5, icon: Medal, color: "from-gray-600 to-gray-800" },
  { id: "patron", amount: 25, icon: Star, color: "from-blue-600 to-blue-800" },
  { id: "producer", amount: 100, icon: Award, color: "from-purple-600 to-purple-800" },
  { id: "executive", amount: 500, icon: Crown, color: "from-amber-600 to-amber-800" },
];

export default function DonorTiers() {
  const t = useTranslations("tiers");
  const tDonate = useTranslations("donate");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<number>(10);

  const getPerks = (tierId: string): string[] => {
    try {
      const perks = t.raw(`${tierId}.perks`);
      return Array.isArray(perks) ? perks : [];
    } catch {
      return [];
    }
  };

  return (
    <PayPalProvider>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const perks = getPerks(tier.id);
            const isSelected = selectedTier === tier.id;

            return (
              <button
                key={tier.id}
                onClick={() => {
                  setSelectedTier(tier.id);
                  setCustomAmount(tier.amount);
                }}
                className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? "border-accent bg-accent/10 scale-105"
                    : "border-white/10 hover:border-white/30 glass"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-1">{t(`${tier.id}.name`)}</h3>
                <p className="text-2xl font-bold text-accent mb-4">
                  {t(`${tier.id}.amount`)}
                </p>

                <ul className="space-y-2">
                  {perks.map((perk, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-background" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="text-center text-muted">
          <span>{tDonate("or")}</span>
        </div>

        <div className="max-w-md mx-auto">
          <label className="block text-sm font-medium mb-2">
            {tDonate("customAmount")}
          </label>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                €
              </span>
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(parseInt(e.target.value) || 1);
                  setSelectedTier(null);
                }}
                className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <DonateButton
            amount={customAmount}
            onSuccess={(orderId) => {
              console.log("Donation successful:", orderId);
            }}
          />
        </div>
      </div>
    </PayPalProvider>
  );
}
