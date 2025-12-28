"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera } from "lucide-react";
import { featuredImages } from "@/data/gallery";

export default function GallerySection() {
  const t = useTranslations("gallery");
  const locale = useLocale();

  return (
    <section className="py-12 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-accent mb-4">
            <Camera className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              {t("photoCount")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
            {t("title")}
          </h2>
          <p className="text-muted">{t("subtitle")}</p>
        </div>

        {/* Featured images grid - cinematic aspect ratio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {featuredImages.map((image, index) => (
            <Link
              key={image.id}
              href={`/${locale}/gallery`}
              className={`group relative overflow-hidden rounded-lg ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`relative ${index === 0 ? "aspect-video" : "aspect-video"}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/gallery`}
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
