import { setRequestLocale, getTranslations } from "next-intl/server";
import { Newspaper, ExternalLink } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

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

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "news" });
  const articles = t.raw("articles") as NewsArticle[];

  return (
    <div className="pt-24 bg-background min-h-screen">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {t("title")}
            </h1>
            <p className="text-lg text-muted">
              {t("subtitle")}
            </p>
          </div>

          <div className="space-y-4">
            {articles.map((article, index) => (
              <a
                key={index}
                href={newsLinks[index]}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Newspaper className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-accent uppercase tracking-wider">
                        {article.source}
                      </span>
                      <ExternalLink className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                      {article.title}
                    </h2>
                    <p className="text-muted">
                      {article.description}
                    </p>
                    <span className="inline-block mt-3 text-sm text-accent group-hover:underline">
                      {t("readMore")} →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
