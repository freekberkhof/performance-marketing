import { AppShowcase } from "@/components/app-showcase";
import { CaseStudy } from "@/components/case-study";
import { Faq } from "@/components/faq";
import { Features } from "@/components/features";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HeroWaves } from "@/components/hero-waves";
import { Nav } from "@/components/nav";
import { Stats } from "@/components/stats";
import { TrustedBy } from "@/components/trusted-by";
import { ValueProp } from "@/components/value-prop";
import { WindowMockup } from "@/components/window-mockup";
import { InView, MotionSection } from "@/lib/motion";
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
    absolute: "Performance Plus — van revalidatie naar prestatie",
  },
};

// Plain literals (built server-side) passed as props to the client motion
// wrappers — kept inline to avoid importing values from a "use client" module.
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
      <main id="main-content" className="flex-1 overflow-x-clip">
        <div className="relative">
          <HeroWaves />
          <Hero />
          <MotionSection
            variants={RISE_IN}
            transition={{ duration: 0.85, delay: 0.55, ease: SOFT_EASE }}
            className="relative px-5 pb-24 sm:px-8 lg:px-10"
          >
            <WindowMockup />
          </MotionSection>
        </div>
        <InView>
          <TrustedBy />
        </InView>
        <InView>
          <Features />
        </InView> 
        <AppShowcase />
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
