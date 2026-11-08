import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

/** Date of the current legal documents (Versie 1.1, see legal/*.md). */
const LEGAL_UPDATED = new Date("2026-11-08");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...[
      "/privacy",
      "/voorwaarden",
      "/verwerkersovereenkomst",
      "/support",
      "/account-verwijderen",
    ].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
