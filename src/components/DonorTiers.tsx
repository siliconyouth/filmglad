"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { CreditCard } from "lucide-react";
import DonateButton from "./DonateButton";
import PayPalProvider from "./PayPalProvider";

const tierAmounts = [100, 250, 500, 1000, 2500];

export default function DonorTiers() {
  const t = useTranslations("donate");
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
    <PayPalProvider>
      <div className="max-w-2xl mx-auto">
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
          <label className="block text-sm text-muted mb-2 text-center">
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
