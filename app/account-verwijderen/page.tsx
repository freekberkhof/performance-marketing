import { LegalPage } from "@/components/legal-page";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Account verwijderen",
  description:
    "Zo verwijder je je Perform+ account, met of zonder de app, en wat er met je gegevens gebeurt.",
  path: "/account-verwijderen",
});

export default function Page(): ReactNode {
  return <LegalPage document="account-verwijderen" />;
}
