import { LegalPage } from "@/components/legal-page";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Privacyverklaring",
  description:
    "Hoe Perform+ omgaat met persoonsgegevens van websitebezoekers, praktijken en cliënten.",
  path: "/privacy",
});

export default function Page(): ReactNode {
  return <LegalPage document="privacyverklaring" />;
}
