import { LegalPage } from "@/components/legal-page";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden voor het gebruik van Perform+ door fysiotherapiepraktijken.",
  path: "/voorwaarden",
});

export default function Page(): ReactNode {
  return <LegalPage document="algemene-voorwaarden" />;
}
