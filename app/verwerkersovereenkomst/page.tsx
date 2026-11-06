import { LegalPage } from "@/components/legal-page";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Verwerkersovereenkomst",
  description:
    "Het model voor de verwerkersovereenkomst tussen een praktijk en Perform+.",
  path: "/verwerkersovereenkomst",
});

export default function Page(): ReactNode {
  return <LegalPage document="verwerkersovereenkomst" />;
}
