"use client";

import { useTranslations, useLocale } from "next-intl";
import { Heart, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link
              href={`/${locale}`}
              className="text-2xl font-black tracking-widest uppercase text-white hover:text-accent transition-colors mb-4 inline-block"
            >
              {locale === "sr" ? "GLAD" : "HUNGER"}
            </Link>
            <p className="text-muted text-sm">
              {t("meta.description")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("nav.home")}</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href={`/${locale}`} className="hover:text-accent transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#synopsis`} className="hover:text-accent transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#gallery`} className="hover:text-accent transition-colors">
                  {t("gallery.title")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/donate`} className="hover:text-accent transition-colors">
                  {t("nav.donate")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.contact")}</h3>
            <a
              href="mailto:contact@filmglad.com"
              className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              contact@filmglad.com
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            © {currentYear} {locale === "sr" ? "GLAD" : "HUNGER"} Film. {t("footer.rights")}.
          </p>
          <p className="flex items-center gap-2 text-sm text-accent">
            <Heart className="w-4 h-4" />
            {t("footer.mentalHealthNote")}
          </p>
        </div>
      </div>
    </footer>
  );
}
