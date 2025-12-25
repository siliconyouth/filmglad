import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "GLAD - Film";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const content = {
  sr: {
    title: "GLAD",
    subtitle: "Tri istine. Jedna noć. Nema izlaza.",
    tagline: "Neke gladi se nikada ne gase — one se ponavljaju",
  },
  en: {
    title: "HUNGER",
    subtitle: "Three truths. One night. No escape.",
    tagline: "Some hungers never fade — they repeat",
  },
};

export default async function Image({ params }: { params: { locale: string } }) {
  const locale = params.locale as "sr" | "en";
  const t = content[locale] || content.sr;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(220, 38, 38, 0.3) 0%, transparent 50%, rgba(30, 64, 175, 0.3) 100%)",
          }}
        />

        {/* Vignette effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.8) 100%)",
          }}
        />

        {/* Title with gradient */}
        <div
          style={{
            display: "flex",
            fontSize: 280,
            fontWeight: "bold",
            letterSpacing: "-0.02em",
            background:
              "linear-gradient(135deg, #dc2626 0%, #e85d04 20%, #f48c06 35%, #48cae4 65%, #00b4d8 80%, #1e40af 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {t.title}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            color: "#c0c0c0",
            marginTop: 20,
            letterSpacing: "0.1em",
          }}
        >
          {t.subtitle}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            fontSize: 24,
            color: "#666",
            fontStyle: "italic",
          }}
        >
          {t.tagline}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
