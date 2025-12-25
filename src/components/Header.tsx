"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  const switchLocale = locale === "sr" ? "en" : "sr";
  const switchPath = pathname.replace(`/${locale}`, `/${switchLocale}`);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-xl font-black tracking-widest uppercase text-white hover:text-accent transition-colors"
          >
            <span>{locale === "sr" ? "GLAD" : "HUNGER"}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href={`/${locale}`}
              className="text-sm hover:text-accent transition-colors"
            >
              {t("nav.home")}
            </Link>
            <Link
              href={`/${locale}#synopsis`}
              className="text-sm hover:text-accent transition-colors"
            >
              {t("nav.about")}
            </Link>
            <Link
              href={`/${locale}#gallery`}
              className="text-sm hover:text-accent transition-colors"
            >
              {t("gallery.title")}
            </Link>
            <Link
              href={`/${locale}/donate`}
              className="text-sm font-semibold px-5 py-2 rounded uppercase tracking-wider btn-gradient"
            >
              {t("nav.donate")}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href={switchPath}
              className="flex items-center gap-1 text-sm hover:text-accent transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{t("language.switch")}</span>
            </Link>

            <Link
              href={`/${locale}/donate`}
              className="md:hidden text-sm font-semibold px-4 py-2 rounded uppercase tracking-wide btn-gradient"
            >
              {t("nav.donate")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
