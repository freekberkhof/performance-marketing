import { CornerPlus } from "@/components/corner-plus";
import { CutButton } from "@/components/cut-button";
import { LogoMark } from "@/components/logo";
import type { ReactNode } from "react";

export function CaseStudy(): ReactNode {
  return (
    <section
      id="praktijkportaal"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10"
    >
      <div className="border-border relative border">
        <CornerPlus className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <CornerPlus className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />

        <div className="grid gap-y-8 lg:grid-cols-[1.55fr_1fr]">
          <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <LogoMark className="mb-7 h-9 w-9" />
            <h2 className="font-serif text-[1.75rem] leading-[1.22] font-normal tracking-[-0.01em] text-balance sm:text-4xl lg:text-[2.5rem] lg:leading-[1.2]">
              Performance Plus is gebouwd in de praktijk van PFH Performance —
              voor cliënten die niet alleen van hun klacht af willen, maar terug
              willen naar hun sport.
            </h2>
          </div>

          <div className="lg:border-border relative flex flex-col justify-center gap-7 px-6 pb-10 sm:px-10 sm:pb-14 lg:border-l lg:px-12 lg:py-16">
            <CornerPlus className="top-0 left-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
            <CornerPlus className="bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 lg:block" />
            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
              Daarom staat de hele opzet op één aanname: revalidatie en
              prestatie zijn geen twee trajecten, maar fases van hetzelfde
              traject. Je begint bij belasting opbouwen en eindigt bij terug op
              het veld, zonder onderweg van systeem te wisselen.
            </p>
            <CutButton href="#demo" variant="outline" className="self-start">
              Plan een rondleiding
            </CutButton>
          </div>
        </div>
      </div>
    </section>
  );
}
