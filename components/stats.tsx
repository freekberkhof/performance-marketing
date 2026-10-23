"use client";

import { CornerPlus } from "@/components/corner-plus";
import { useReducedMotion } from "@/lib/motion";
import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
};

const STATS: Stat[] = [
  {
    value: 4,
    label: "Meetpunten per sessie",
    note: "RPE, pijn tijdens, pijn na en motivatie",
  },
  {
    value: 6,
    label: "Fases in een traject",
    note: "Zelf in te richten, per fase een eigen programma",
  },
  {
    value: 7,
    suffix: "+",
    label: "Pijnscore wordt een melding",
    note: "Automatisch, met locatie en context",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function StatNumber({
  value,
  prefix,
  suffix,
  inView,
  reduce,
  delay,
}: {
  value: number;
  prefix: string;
  suffix: string;
  inView: boolean;
  reduce: boolean;
  delay: number;
}): ReactNode {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      const raf = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(raf);
    }
    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease: EASE,
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, reduce, value, delay]);

  return (
    <span className="block font-serif text-5xl leading-none font-normal tracking-[-0.02em] tabular-nums sm:text-6xl">
      <span aria-hidden="true">{`${prefix}${Math.round(display)}${suffix}`}</span>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
    </span>
  );
}

export function Stats(): ReactNode {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, margin: "-80px" });

  return (
    <section
      id="praktijken"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10"
    >
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:pt-6">
          <h2 className="font-serif text-3xl leading-[1.12] font-normal tracking-[-0.01em] text-balance sm:text-4xl lg:text-[2.75rem]">
            Wat je terugkrijgt na elke sessie
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed sm:text-base">
            De cliënt vult na het trainen een korte check-in in. Die vier scores
            vormen samen het beeld dat je in het portaal terugziet: per sessie,
            per week en over het hele traject.
          </p>
          <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
            Performance Plus ondersteunt je beoordeling — het vervangt hem niet.
            De app geeft geen trainingsvrijgave en stuurt nooit uit zichzelf
            advies naar je cliënt.
          </p>
        </div>

        <div ref={panelRef} className="border-border relative border">
          <CornerPlus className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
          <CornerPlus className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
          <CornerPlus className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
          <CornerPlus className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />

          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`relative flex items-center justify-between gap-6 px-6 py-9 sm:px-8 sm:py-11 ${
                i > 0 ? "border-border border-t" : ""
              }`}
            >
              {i > 0 && (
                <>
                  <CornerPlus className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
                  <CornerPlus className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
                </>
              )}
              <div>
                <StatNumber
                  value={stat.value}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix ?? ""}
                  inView={inView}
                  reduce={reduce}
                  delay={i * 0.12}
                />
                <p className="mt-3 text-sm font-medium tracking-tight sm:text-base">
                  {stat.label}
                </p>
                <p className="text-muted-foreground mt-1 max-w-xs text-xs leading-relaxed sm:text-sm">
                  {stat.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
