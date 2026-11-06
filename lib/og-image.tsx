import { siteConfig } from "@/lib/metadata";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageAlt = `${siteConfig.name}: ${siteConfig.tagline.toLowerCase()}`;

/**
 * Shared social card for opengraph-image and twitter-image. Rendered at
 * build time; the mark is the 512px app icon, whose ground matches the
 * card background so it blends in.
 */
export async function renderOgImage(): Promise<ImageResponse> {
  const mark = await readFile(join(process.cwd(), "public/icon-512.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

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
          background: siteConfig.themeColor,
          color: "#f5f5f6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={88} height={88} alt="" />
          <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 72,
              height: 6,
              background: "#1de9a6",
              marginBottom: 36,
            }}
          />
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {siteConfig.tagline}
          </div>
          <div style={{ fontSize: 34, color: "#9a9aa2", marginTop: 28 }}>
            Software voor fysiotherapiepraktijken
          </div>
        </div>

        <div style={{ fontSize: 28, color: "#9a9aa2" }}>performplus.nl</div>
      </div>
    ),
    ogImageSize,
  );
}
