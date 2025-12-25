"use client";

import { useTranslations, useLocale } from "next-intl";
import { Play, Heart } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-background/80 to-background z-10" />

      {/* Placeholder for poster background - replace with actual poster */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/poster-bg.jpg')",
          filter: "brightness(0.4)",
        }}
      />

      {/* Fallback gradient pattern if no image */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 gradient-text tracking-wider">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-muted mb-4 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <p className="text-lg text-foreground/80 mb-12 max-w-xl mx-auto italic">
            {t("tagline")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${locale}/donate`}
              className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-background font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
            >
              <Heart className="w-5 h-5" />
              {t("cta")}
            </Link>
            <a
              href="#trailer"
              className="flex items-center gap-2 border border-foreground/30 hover:border-accent text-foreground hover:text-accent px-8 py-4 rounded-lg transition-all"
            >
              <Play className="w-5 h-5" />
              {t("watchTrailer")}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-accent rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
