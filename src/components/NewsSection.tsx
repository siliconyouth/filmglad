"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ExternalLink, ArrowRight, Newspaper } from "lucide-react";

const newsLinks = [
  "https://www.blic.rs/kultura/prica-o-boli-i-isceljenju-prva-klapa-filma-glad-pada-u-mionici-i-okolini-valjeva/mqrhsqb",
  "https://www.k1info.rs/kultura-i-umetnost/filmserija/103998/glad-film-o-zeni/vest",
  "https://www.telegraf.rs/pop-i-kultura/film-tv/4236579-psiholoska-drama-glad-stize-na-evropske-festivale-2026-glume-jelica-kovacevic-zlatan-vidovic",
  "https://www.glassrpske.com/lat/kultura/film/zlatan-vidovic-u-glavnoj-ulozi-novog-filma-glad/601111",
];

interface NewsArticle {
  title: string;
  source: string;
  description: string;
}

export default function NewsSection() {
  const t = useTranslations("news");
  const locale = useLocale();

  const articles = t.raw("articles") as NewsArticle[];

  return (
    <section className="py-12 bg-black/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
            {t("title")}
          </h2>
          <p className="text-muted">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {articles.slice(0, 4).map((article, index) => (
            <a
              key={index}
              href={newsLinks[index]}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Newspaper className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-accent uppercase tracking-wider">
                      {article.source}
                    </span>
                    <ExternalLink className="w-3 h-3 text-muted group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-2">
                    {article.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-accent hover:text-foreground transition-colors group text-sm"
          >
            <span>{t("viewAll")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
