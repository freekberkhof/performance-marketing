import { ogImageAlt, ogImageSize, renderOgImage } from "@/lib/og-image";
import type { ImageResponse } from "next/og";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image(): Promise<ImageResponse> {
  return renderOgImage();
}
