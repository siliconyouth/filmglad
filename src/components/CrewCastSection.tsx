"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight, Film, Users, Camera, Clapperboard, Pen } from "lucide-react";
import {
  director,
  writers,
  cast,
  producers,
  cinematographer,
  IMDB_URL,
} from "@/data/crew";

export default function CrewCastSection() {
  const t = useTranslations("crew");
  const locale = useLocale();

  return (
    <section className="py-12 bg-black/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
            {t("title")}
          </h2>
          <p className="text-muted">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* 1. Producers - all 6 */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Film className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                {t("producers")}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
              {producers.map((person, index) => (
                <a
                  key={`${person.imdbId}-${index}`}
                  href={`https://www.imdb.com/name/${person.imdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-foreground hover:text-accent transition-colors"
                >
                  <span className="font-medium">{person.name}</span>
                  <span className="text-muted text-xs ml-1">
                    ({t(person.role as "producer" | "executiveProducer" | "lineProducer")})
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* 2. Cast - all 5 */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 lg:row-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                {t("cast")}
              </span>
            </div>
            <div className="space-y-1">
              {cast.map((person) => (
                <a
                  key={person.imdbId}
                  href={`https://www.imdb.com/name/${person.imdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-foreground hover:text-accent transition-colors"
                >
                  <span className="font-medium">{person.name}</span>
                  <span className="text-muted text-xs ml-1">
                    {t("as")} {person.character}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* 3. Director */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Clapperboard className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                {t("director")}
              </span>
            </div>
            <a
              href={`https://www.imdb.com/name/${director.imdbId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-accent transition-colors"
            >
              {director.name}
            </a>
          </div>

          {/* 4. Cinematographer */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Camera className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                {t("cinematographer")}
              </span>
            </div>
            <a
              href={`https://www.imdb.com/name/${cinematographer.imdbId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-accent transition-colors"
            >
              {cinematographer.name}
            </a>
          </div>

          {/* 5. Writers */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Pen className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                {t("writers")}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
              {writers.map((person) => (
                <a
                  key={person.imdbId}
                  href={`https://www.imdb.com/name/${person.imdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-foreground hover:text-accent transition-colors"
                >
                  <span className="font-medium">{person.name}</span>
                  <span className="text-muted text-xs ml-1">
                    ({t(person.role as "screenplay" | "story")})
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <Link
            href={`/${locale}/crew`}
            className="inline-flex items-center gap-2 text-accent hover:text-foreground transition-colors group text-sm"
          >
            <span>{t("viewAll")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={IMDB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors text-sm"
          >
            <span>{t("imdbLink")}</span>
            <span className="font-bold text-sm">IMDb</span>
          </a>
        </div>
      </div>
    </section>
  );
}
