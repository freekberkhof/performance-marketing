import { CornerPlus } from "@/components/corner-plus";
import { CutButton } from "@/components/cut-button";
import { LogoMark } from "@/components/logo";
import Image from "next/image";
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

        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          {/* Lifestyle shot: the app where it is actually used. */}
          <div className="relative min-h-[420px] overflow-hidden sm:min-h-[560px] lg:min-h-full">
            <Image
              src="/app-in-de-zaal.jpg"
              alt="Sporter opent de Performance Plus-app in de sportzaal"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="from-background/80 pointer-events-none absolute inset-0 bg-gradient-to-b via-transparent to-transparent lg:bg-gradient-to-l"
            />
          </div>

          <div className="lg:border-border relative flex flex-col justify-center gap-7 px-6 py-10 sm:px-10 sm:py-14 lg:border-l lg:px-14 lg:py-16">
            <CornerPlus className="top-0 left-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
            <CornerPlus className="bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 lg:block" />

            <LogoMark className="h-9 w-9" />

            <h2 className="font-serif text-[1.75rem] leading-[1.22] font-normal tracking-[-0.01em] text-balance sm:text-4xl lg:text-[2.5rem] lg:leading-[1.2]">
              Performance Plus is gebouwd in de praktijk van{" "}
              <span className="font-sans font-semibold tracking-tight">
                PFH Performance
              </span>{" "}
              — voor cliënten die niet alleen van hun klacht af willen, maar
              terug willen naar hun sport.
            </h2>

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
