import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "GLAD - Film";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
            textShadow: "0 0 80px rgba(220, 38, 38, 0.5), 0 0 120px rgba(30, 64, 175, 0.4)",
          }}
        >
          GLAD
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
          Three truths. One night. No escape.
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
          Some hungers never fade — they repeat
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
