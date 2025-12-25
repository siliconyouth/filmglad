"use client";

import { useTranslations, useLocale } from "next-intl";
import { Play, Heart } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden vignette film-grain">
      {/* Deep black gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-10" />

      {/* Orange & Cyan duotone glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "linear-gradient(135deg, rgba(232, 93, 4, 0.3) 0%, transparent 50%, rgba(0, 180, 216, 0.3) 100%)",
        }}
      />

      {/* Placeholder for poster background - replace with actual poster */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/poster-bg.jpg')",
          filter: "brightness(0.2) saturate(0.8)",
        }}
      />

      {/* Fallback dark gradient if no image */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black opacity-95" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="animate-fade-in">
          {/* Cinematic title with Bebas Neue */}
          <h1
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-none mb-8 gradient-text tracking-[0.2em]"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            {t("title")}
          </h1>

          <p className="text-xl md:text-2xl text-silver mb-3 max-w-2xl mx-auto font-light tracking-wide">
            {t("subtitle")}
          </p>
          <p className="text-lg text-foreground/60 mb-16 max-w-xl mx-auto italic font-light">
            {t("tagline")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href={`/${locale}/donate`}
              className="flex items-center gap-3 bg-accent hover:bg-accent-light text-white font-semibold px-10 py-5 rounded transition-all transform hover:scale-105 glow-red uppercase tracking-wider text-sm"
            >
              <Heart className="w-5 h-5" />
              {t("cta")}
            </Link>
            <a
              href="#trailer"
              className="flex items-center gap-3 border border-white/20 hover:border-accent text-white/80 hover:text-accent px-10 py-5 rounded transition-all uppercase tracking-wider text-sm"
            >
              <Play className="w-5 h-5" />
              {t("watchTrailer")}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-9 border border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-0.5 h-2 bg-accent rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
