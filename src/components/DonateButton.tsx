"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Heart, Check, AlertCircle, Loader2 } from "lucide-react";

interface DonateButtonProps {
  amount?: number;
  onSuccess?: (orderId: string) => void;
  className?: string;
}

export default function DonateButton({
  amount = 10,
  onSuccess,
  className = "",
}: DonateButtonProps) {
  const t = useTranslations("donate");
  const [{ isPending }] = usePayPalScriptReducer();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  if (isPending) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <Loader2 className="w-6 h-6 animate-spin text-accent" />
        <span className="ml-2 text-muted">{t("processing")}</span>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className={`flex items-center justify-center gap-2 p-4 bg-green-900/30 rounded-lg ${className}`}>
        <Check className="w-6 h-6 text-green-400" />
        <span className="text-green-400">{t("success")}</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={`flex flex-col items-center gap-2 p-4 bg-red-900/30 rounded-lg ${className}`}>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-400" />
          <span className="text-red-400">{t("error")}</span>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <PayPalButtons
        key={amount}
        forceReRender={[amount]}
        style={{
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "donate",
          height: 50,
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                  currency_code: "EUR",
                },
                description: "GLAD Film Donation - Mental Health Awareness",
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          try {
            const order = await actions.order?.capture();
            if (order) {
              setStatus("success");
              setMessage(t("success"));
              if (order.id) {
                onSuccess?.(order.id);
              }
            }
          } catch (err) {
            console.error("Payment error:", err);
            setStatus("error");
            setMessage(t("error"));
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          setStatus("error");
          setMessage(t("error"));
        }}
        onCancel={() => {
          setStatus("idle");
        }}
      />
    </div>
  );
}
