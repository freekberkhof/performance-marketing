import { AppShowcase } from "@/components/app-showcase";
import { Audiences } from "@/components/audiences";
import { CaseStudy } from "@/components/case-study";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HeroWaves } from "@/components/hero-waves";
import { Nav } from "@/components/nav";
import { Stats } from "@/components/stats";
import { ValueProp } from "@/components/value-prop";
import { WindowMockup } from "@/components/window-mockup";
import { InView } from "@/lib/motion";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Home",
    description: siteConfig.description,
    path: "/",
  }),
  title: {
    absolute: "Perform+: van revalidatie naar prestatie",
  },
};

// Plain literals (built server-side) passed as props to the client motion
// wrappers, kept inline to avoid importing values from a "use client" module.
const SOFT_EASE = [0.22, 1, 0.36, 1] as const;
const RISE_IN = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function HomePage(): ReactNode {
  return (
    <>
      <span id="top" className="sr-only" />
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 overflow-x-clip outline-none"
      >
        <Hero />
        <InView className="pt-24 sm:pt-32">
          <Audiences />
        </InView>
        <AppShowcase />
        <section
          id="praktijkportaal"
          className="relative scroll-mt-24 pb-24 sm:pb-32"
        >
          <HeroWaves />
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
            <InView className="relative max-w-2xl">
              <h2 className="font-serif text-3xl leading-[1.12] font-[450] tracking-[-0.01em] text-balance sm:text-4xl lg:text-[2.75rem]">
                Jij ziet het hele traject in het praktijkportaal
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
                Je bouwt trajecten in fases op met programma&apos;s uit je eigen
                bibliotheek, en leest in hetzelfde overzicht de check-ins van je
                cliënten.
              </p>
              <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
                Je begint een sessie met de oefeningen en weerstanden van je
                cliënt sinds de vorige afspraak, en met het verloop van pijn en
                motivatie. In de behandelkamer besteed je je tijd aan bijsturen
                en minder aan uitvragen.
              </p>
            </InView>
          </div>
          <InView
            variants={RISE_IN}
            transition={{ duration: 0.85, ease: SOFT_EASE }}
            className="relative mt-12 px-5 sm:px-8 lg:px-10"
          >
            <WindowMockup />
          </InView>
        </section>
        <InView>
          <ValueProp />
        </InView>
        <InView>
          <Stats />
        </InView>
        <InView>
          <CaseStudy />
        </InView>
        <InView>
          <Faq />
        </InView>
        <FinalCta />
      </main>
      <InView>
        <Footer />
      </InView>
    </>
  );
}
