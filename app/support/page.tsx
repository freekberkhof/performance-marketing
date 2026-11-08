import { LegalPage } from "@/components/legal-page";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Support",
  description:
    "Hulp bij de Perform+ app en het praktijkportaal: inloggen, account en contact.",
  path: "/support",
});

export default function Page(): ReactNode {
  return <LegalPage document="support" />;
}
