import { ImageResponse } from "next/og";

export const alt = "Depup Studio — Independent software studio. Depup Cloud, Depup Office and Sentinel ID.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const products = ["Depup Cloud", "Depup Office", "Sentinel ID"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#F3F6FC",
          background: "linear-gradient(155deg, #0B3A8C 0%, #0A2463 45%, #061634 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#1F6FEB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            D
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>Depup Studio</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>One studio.</div>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, color: "#8AB4FF" }}>Made to move.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {products.map((p) => (
              <div
                key={p}
                style={{ display: "flex", padding: "10px 22px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.25)", fontSize: 24 }}
              >
                {p}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 24, color: "#A9B8D6" }}>depupstudio.com</div>
        </div>
      </div>
    ),
    size
  );
}
