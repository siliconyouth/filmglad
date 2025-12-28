"use client";

import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const YOUTUBE_VIDEO_ID = "rNeIqYR_rB0";

export default function Trailer() {
  const t = useTranslations("trailer");
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;

  return (
    <section id="trailer" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text">
          {t("title")}
        </h2>

        <div className="relative aspect-video rounded-2xl overflow-hidden glass">
          {isPlaying ? (
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex flex-col items-center justify-center group"
            >
              {/* YouTube thumbnail */}
              <Image
                src={thumbnailUrl}
                alt="GLAD trailer thumbnail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />

              {/* Dark overlay for better contrast */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-accent/90 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all shadow-2xl">
                  <Play className="w-8 h-8 text-background ml-1" fill="currentColor" />
                </div>
                <span className="text-lg font-medium text-foreground drop-shadow-lg">
                  {t("watchNow")}
                </span>
              </div>

              {/* Subtle animation ring */}
              <div className="absolute w-24 h-24 rounded-full border-2 border-accent/50 animate-ping" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
