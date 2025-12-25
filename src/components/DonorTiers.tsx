"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Check, Star, Crown, Award, Medal, CreditCard } from "lucide-react";
import DonateButton from "./DonateButton";
import PayPalProvider from "./PayPalProvider";

const tiers = [
  { id: "supporter", amount: 100, icon: Medal, color: "from-gray-500 to-gray-700" },
  { id: "patron", amount: 250, icon: Star, color: "from-blue-500 to-blue-700" },
  { id: "associate", amount: 500, icon: Award, color: "from-purple-500 to-purple-700" },
  { id: "executive", amount: 1000, icon: Crown, color: "from-amber-500 to-amber-700" },
  { id: "producer", amount: 2500, icon: Crown, color: "from-red-500 to-red-700" },
];

export default function DonorTiers() {
  const t = useTranslations("tiers");
  const tDonate = useTranslations("donate");
  const [amount, setAmount] = useState(1000);
  const [selectedTierId, setSelectedTierId] = useState<string | null>("executive");

  const getPerks = (tierId: string): string[] => {
    try {
      const perks = t.raw(`${tierId}.perks`);
      return Array.isArray(perks) ? perks : [];
    } catch {
      return [];
    }
  };

  const handleTierSelect = (tierId: string, tierAmount: number) => {
    setSelectedTierId(tierId);
    setAmount(tierAmount);
  };

  const handleCustomAmount = (value: string) => {
    const numValue = parseInt(value) || 1;
    setAmount(numValue);
    setSelectedTierId(null);
  };

  return (
    <PayPalProvider>
      <div className="space-y-8">
        {/* Tier cards with perks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const perks = getPerks(tier.id);
            const isSelected = selectedTierId === tier.id;

            return (
              <button
                key={tier.id}
                onClick={() => handleTierSelect(tier.id, tier.amount)}
                className={`relative p-5 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? "border-accent bg-accent/10 scale-[1.02]"
                    : "border-white/10 hover:border-white/30 bg-white/5"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center mb-3`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-lg font-bold mb-1">{t(`${tier.id}.name`)}</h3>
                <p className="text-2xl font-bold text-accent mb-3">
                  €{tier.amount}
                </p>

                <ul className="space-y-1.5">
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

        {/* Custom amount section */}
        <div className="max-w-md mx-auto text-center">
          <p className="text-muted mb-3">{tDonate("or")}</p>
          <label className="block text-sm text-muted mb-2">
            {tDonate("customAmount")}
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

        {/* Payment buttons */}
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-muted mb-3">
            <CreditCard className="w-4 h-4" />
            <span>Card, Debit & PayPal accepted</span>
          </div>
          <DonateButton
            amount={amount}
            onSuccess={(orderId) => {
              console.log("Donation successful:", orderId);
            }}
          />
        </div>
      </div>
    </PayPalProvider>
  );
}
