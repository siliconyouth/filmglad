"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

export default function Synopsis() {
  const t = useTranslations("synopsis");

  const themes = t.raw("themes.items") as string[];

  return (
    <section id="synopsis" className="py-12 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center gradient-text">
          {t("title")}
        </h2>

        <div className="space-y-5">
          {/* Intro */}
          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed text-center font-light">
            {t("intro")}
          </p>

          {/* Main content */}
          <p className="text-base text-foreground/70 leading-relaxed text-center max-w-3xl mx-auto">
            {t("content")}
          </p>

          {/* Themes list */}
          <div className="glass rounded-xl p-5 md:p-6">
            <h3 className="text-xl font-semibold text-center mb-4 gradient-text">
              {t("themes.title")}
            </h3>
            <ul className="grid grid-cols-2 gap-2 max-w-xl mx-auto">
              {themes.map((theme, index) => (
                <li
                  key={index}
                  className="text-sm text-foreground/80 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                  {theme}
                </li>
              ))}
            </ul>
          </div>

          {/* Style description */}
          <p className="text-base text-foreground/60 leading-relaxed text-center italic max-w-3xl mx-auto">
            {t("style")}
          </p>

          {/* Quote */}
          <blockquote className="relative py-4">
            <Quote className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 text-accent/20" />
            <p className="text-xl md:text-2xl text-foreground font-light italic text-center mb-2 pt-6">
              {t("quote")}
            </p>
            <cite className="block text-center text-accent text-xs tracking-wider uppercase">
              {t("director")}
            </cite>
          </blockquote>

          {/* Closing statement */}
          <p className="text-lg text-foreground/90 text-center font-medium tracking-wide">
            {t("closing")}
          </p>
        </div>
      </div>
    </section>
  );
}
