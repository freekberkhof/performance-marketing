import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy", "/contact", "/account-deletion"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date("2026-10-29T00:00:00Z"),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.5,
  }));
}
