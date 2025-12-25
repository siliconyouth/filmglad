"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

export default function Synopsis() {
  const t = useTranslations("synopsis");

  return (
    <section id="synopsis" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text">
          {t("title")}
        </h2>

        <div className="space-y-8">
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed text-center">
            {t("content")}
          </p>

          <blockquote className="relative glass rounded-2xl p-8 md:p-12">
            <Quote className="absolute top-4 left-4 w-8 h-8 text-accent/30" />
            <p className="text-xl md:text-2xl text-foreground italic text-center mb-4">
              {t("quote")}
            </p>
            <cite className="block text-center text-accent">
              {t("director")}
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
