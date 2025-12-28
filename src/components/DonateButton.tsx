"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

interface DonateButtonProps {
  amount?: number;
  className?: string;
}

export default function DonateButton({
  amount = 100,
  className = "",
}: DonateButtonProps) {
  const t = useTranslations("donate");
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, locale }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-gradient hover:opacity-90 ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{t("processing")}</span>
        </>
      ) : (
        <>
          <CreditCard className="w-5 h-5" />
          <span>
            {t("title")} €{amount}
          </span>
        </>
      )}
    </button>
  );
}
