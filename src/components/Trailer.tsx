"use client";

import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { useState } from "react";

interface TrailerProps {
  videoUrl?: string;
}

export default function Trailer({ videoUrl }: TrailerProps) {
  const t = useTranslations("trailer");
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract video ID from YouTube or Vimeo URL
  const getEmbedUrl = (url: string) => {
    // YouTube
    const youtubeMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }

    return url;
  };

  // Default placeholder - replace with actual trailer URL
  const trailerUrl = videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const embedUrl = getEmbedUrl(trailerUrl);

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
              {/* Placeholder thumbnail - replace with actual thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black" />

              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-accent/90 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                  <Play className="w-8 h-8 text-background ml-1" fill="currentColor" />
                </div>
                <span className="text-lg font-medium text-foreground">
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
