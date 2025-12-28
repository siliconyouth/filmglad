"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Camera } from "lucide-react";
import { galleryImages } from "@/data/gallery";
import Lightbox from "@/components/Lightbox";

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex === 0 ? galleryImages.length - 1 : lightboxIndex - 1
      );
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex === galleryImages.length - 1 ? 0 : lightboxIndex + 1
      );
    }
  };

  return (
    <div className="pt-24 bg-background min-h-screen">
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 text-accent mb-4">
              <Camera className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">
                {t("photoCount")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {t("title")}
            </h1>
            <p className="text-lg text-muted">{t("subtitle")}</p>
          </div>

          {/* Gallery grid - optimized for large images */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <div className="relative aspect-video">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}
    </div>
  );
}
