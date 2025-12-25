"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const galleryImages = [
  { id: 1, src: "/gallery/photo1.jpg", alt: "Scene 1" },
  { id: 2, src: "/gallery/photo2.jpg", alt: "Scene 2" },
  { id: 3, src: "/gallery/photo3.jpg", alt: "Scene 3" },
  { id: 4, src: "/gallery/photo4.jpg", alt: "Scene 4" },
  { id: 5, src: "/gallery/photo5.jpg", alt: "Scene 5" },
  { id: 6, src: "/gallery/photo6.jpg", alt: "Scene 6" },
];

export default function Gallery() {
  const t = useTranslations("gallery");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const goToPrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
  };

  const goToNext = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
  };

  return (
    <section id="gallery" className="py-24 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text">
          {t("title")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="relative aspect-video overflow-hidden rounded-lg group cursor-pointer"
            >
              {/* Placeholder colored div - replace with actual images */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center text-muted group-hover:text-accent transition-colors">
                <span className="text-sm">Photo {index + 1}</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-foreground hover:text-accent transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 p-2 text-foreground hover:text-accent transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="max-w-4xl max-h-[80vh] flex items-center justify-center">
            {/* Placeholder - replace with actual image */}
            <div className="w-[800px] h-[500px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl text-muted">
                {galleryImages[selectedImage].alt}
              </span>
            </div>
          </div>

          <button
            onClick={goToNext}
            className="absolute right-4 p-2 text-foreground hover:text-accent transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
