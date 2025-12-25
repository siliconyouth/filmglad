import { setRequestLocale, getTranslations } from "next-intl/server";
import { Film, Users, Camera, Clapperboard, Pen, ExternalLink } from "lucide-react";
import {
  director,
  writers,
  cast,
  producers,
  cinematographer,
  IMDB_URL,
  IMDB_CREDITS_URL,
} from "@/data/crew";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "crew" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function CrewPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "crew" });

  return (
    <div className="pt-24 bg-background min-h-screen">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {t("title")}
            </h1>
            <p className="text-lg text-muted mb-4">{t("subtitle")}</p>
            <a
              href={IMDB_CREDITS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 64 32" fill="currentColor">
                <path d="M0 0h8v32H0V0zm12 0h8l4 12 4-12h8v32h-8V12l-4 12-4-12v20h-8V0zm28 0h12c4 0 8 2 8 8v16c0 6-4 8-8 8H40V0zm8 8v16h4V8h-4z" />
              </svg>
              <span>{t("imdbLink")}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-8">
            {/* 1. Producers */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Film className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-accent uppercase tracking-wider">
                  {t("producers")}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {producers.map((person, index) => (
                  <a
                    key={`${person.imdbId}-${index}`}
                    href={`https://www.imdb.com/name/${person.imdbId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="font-semibold text-foreground">
                      {person.name}
                    </span>
                    <span className="text-muted text-sm">
                      {t(person.role as "producer" | "executiveProducer" | "lineProducer")}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* 2. Cast */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-accent uppercase tracking-wider">
                  {t("cast")}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cast.map((person) => (
                  <a
                    key={person.imdbId}
                    href={`https://www.imdb.com/name/${person.imdbId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="font-semibold text-foreground">
                      {person.name}
                    </span>
                    <span className="text-muted text-sm">
                      {t("as")} {person.character}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* 3. Director */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Clapperboard className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-accent uppercase tracking-wider">
                  {t("director")}
                </h2>
              </div>
              <a
                href={`https://www.imdb.com/name/${director.imdbId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-foreground hover:text-accent transition-colors"
              >
                {director.name}
              </a>
            </div>

            {/* 4. Cinematographer */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-accent uppercase tracking-wider">
                  {t("cinematographer")}
                </h2>
              </div>
              <a
                href={`https://www.imdb.com/name/${cinematographer.imdbId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-foreground hover:text-accent transition-colors"
              >
                {cinematographer.name}
              </a>
              <span className="text-muted ml-2">({t("directorOfPhotography")})</span>
            </div>

            {/* 5. Writers */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Pen className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-accent uppercase tracking-wider">
                  {t("writers")}
                </h2>
              </div>
              <div className="space-y-2">
                {writers.map((person) => (
                  <a
                    key={person.imdbId}
                    href={`https://www.imdb.com/name/${person.imdbId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-foreground hover:text-accent transition-colors"
                  >
                    <span className="font-semibold">{person.name}</span>
                    <span className="text-muted ml-2">({t(person.role as "screenplay" | "story")})</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
