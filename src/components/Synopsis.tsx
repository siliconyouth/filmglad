"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

export default function Synopsis() {
  const t = useTranslations("synopsis");

  const themes = t.raw("themes.items") as string[];

  return (
    <section id="synopsis" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text">
          {t("title")}
        </h2>

        <div className="space-y-12">
          {/* Intro */}
          <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed text-center font-light">
            {t("intro")}
          </p>

          {/* Main content */}
          <p className="text-lg text-foreground/70 leading-relaxed text-center max-w-3xl mx-auto">
            {t("content")}
          </p>

          {/* Themes list */}
          <div className="glass rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-semibold text-center mb-8 text-accent">
              {t("themes.title")}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {themes.map((theme, index) => (
                <li
                  key={index}
                  className="text-lg text-foreground/80 text-center md:text-left flex items-center gap-3"
                >
                  <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                  {theme}
                </li>
              ))}
            </ul>
          </div>

          {/* Style description */}
          <p className="text-lg text-foreground/60 leading-relaxed text-center italic max-w-3xl mx-auto">
            {t("style")}
          </p>

          {/* Quote */}
          <blockquote className="relative py-12">
            <Quote className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 text-accent/20" />
            <p className="text-2xl md:text-3xl text-foreground font-light italic text-center mb-4 pt-8">
              {t("quote")}
            </p>
            <cite className="block text-center text-accent text-sm tracking-wider uppercase">
              {t("director")}
            </cite>
          </blockquote>

          {/* Closing statement */}
          <p className="text-xl text-foreground/90 text-center font-medium tracking-wide">
            {t("closing")}
          </p>
        </div>
      </div>
    </section>
  );
}
