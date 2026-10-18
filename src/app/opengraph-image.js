import { ImageResponse } from "next/og";

export const alt = "Zulfa Sulthany - Backend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fffdf5",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              background: "#ffd23f",
              border: "6px solid #000",
              fontSize: "44px",
              fontWeight: 800,
            }}
          >
            Z
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            ZULFA SULTHANY
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          <div
            style={{
              alignSelf: "flex-start",
              background: "#ff90e8",
              border: "6px solid #000",
              padding: "8px 20px",
              fontSize: "26px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Backend Developer
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "70px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Backend systems that stay reliable in production.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "28px",
            fontWeight: 600,
          }}
        >
          Bandung, Indonesia · Python · Next.js · REST APIs
        </div>
      </div>
    ),
    { ...size }
  );
}
