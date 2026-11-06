import { CutButton } from "@/components/cut-button";
import { Footer } from "@/components/footer";
import { Logo } from "@/components/logo";
import type { Metadata } from "next";
import type { ReactNode } from "react";

// Overrides the root "index, follow" so the 404 never signals indexable.
export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  robots: { index: false, follow: true },
};

export default function NotFound(): ReactNode {
  return (
    <>
      <header className="border-border/50 border-b">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center px-5 sm:px-8 lg:px-10">
          <Logo href="/" />
        </div>
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-3xl px-5 py-24 outline-none sm:px-8 sm:py-32"
      >
        <h1 className="font-serif text-[2rem] leading-[1.15] font-[450] tracking-[-0.01em] text-balance sm:text-5xl">
          Pagina niet gevonden
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-[15px] leading-relaxed sm:text-base">
          Deze pagina bestaat niet of is verplaatst.
        </p>
        <div className="mt-8">
          <CutButton variant="solid" href="/">
            Naar de homepage
          </CutButton>
        </div>
      </main>
      <Footer />
    </>
  );
}
