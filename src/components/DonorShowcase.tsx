"use client";

import { useTranslations } from "next-intl";
import { Crown, Award, Star, Medal, Heart } from "lucide-react";

export interface Donor {
  id: string;
  name: string;
  tier: "executive" | "producer" | "patron" | "supporter";
  date: string;
  anonymous?: boolean;
}

const tierConfig = {
  executive: {
    icon: Crown,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
  },
  producer: {
    icon: Award,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
  },
  patron: {
    icon: Star,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
  },
  supporter: {
    icon: Medal,
    color: "text-gray-400",
    bg: "bg-gray-400/10",
    border: "border-gray-400/30",
  },
};

interface DonorShowcaseProps {
  donors?: Donor[];
}

export default function DonorShowcase({ donors = [] }: DonorShowcaseProps) {
  const t = useTranslations("donors");
  const tTiers = useTranslations("tiers");

  // Group donors by tier
  const groupedDonors = {
    executive: donors.filter((d) => d.tier === "executive"),
    producer: donors.filter((d) => d.tier === "producer"),
    patron: donors.filter((d) => d.tier === "patron"),
    supporter: donors.filter((d) => d.tier === "supporter"),
  };

  const totalDonors = donors.length;

  if (totalDonors === 0) {
    return (
      <section className="py-16 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 gradient-text">{t("title")}</h2>
          <p className="text-muted flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-accent" />
            {t("beFirst")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {t("title")}
          </h2>
          <p className="text-muted">{t("subtitle")}</p>
        </div>

        <div className="space-y-12">
          {(["executive", "producer", "patron", "supporter"] as const).map(
            (tierKey) => {
              const tierDonors = groupedDonors[tierKey];
              if (tierDonors.length === 0) return null;

              const config = tierConfig[tierKey];
              const Icon = config.icon;

              return (
                <div key={tierKey}>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {tTiers(`${tierKey}.name`)}
                    </h3>
                    <span className="text-sm text-muted">
                      ({tierDonors.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                    {tierDonors.map((donor) => (
                      <div
                        key={donor.id}
                        className={`p-4 rounded-lg border ${config.border} ${config.bg} text-center`}
                      >
                        <p className="font-medium truncate">
                          {donor.anonymous ? t("anonymous") : donor.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
