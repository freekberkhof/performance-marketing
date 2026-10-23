"use client";

import { useIsDesktop, useReducedMotion } from "@/lib/motion";
import {
  cubicBezier,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

type Step = {
  title: string;
  body: string;
  /** Screenshot straight out of the iOS app. */
  screen: string;
  alt: string;
  aside: ReactNode;
};

const STEPS: Step[] = [
  {
    title: "Je overzicht, elke ochtend",
    body: "Belasting, voltooide sessies en motivatie staan bovenaan. Eén blik en je weet waar je staat — en welke sessie vandaag klaarstaat.",
    screen: "/app/01.jpg",
    alt: "Overzichtsscherm met de ringen voor belasting, voltooid en motivatie",
    aside: (
      <>
        <div className="border-border bg-background rounded-2xl border p-4 shadow-sm">
          <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
            Vandaag
          </p>
          <p className="text-foreground mt-1.5 text-sm font-medium">
            Week 1 · Sessie 3
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            Belasting 7.5 · motivatie 4.5
          </p>
        </div>
        <span className="border-border bg-background text-muted-foreground rounded-full border px-3.5 py-1.5 text-xs">
          Geen Excel, geen papieren schema
        </span>
      </>
    ),
  },
  {
    title: "Sessie voor sessie afvinken",
    body: "Je week is opgedeeld in sessies, je sessie in oefeningen. Vink af tijdens het trainen; de voortgang loopt live mee.",
    screen: "/app/02.jpg",
    alt: "Sessieoverzicht van week 1 met voltooide sessies en voortgangsbalken",
    aside: (
      <>
        <div className="border-border bg-background rounded-2xl border p-4 shadow-sm">
          <div className="flex items-center justify-between gap-8">
            <p className="text-foreground text-sm font-medium">Sessie 2</p>
            <p className="text-muted-foreground font-mono text-[10px] tabular-nums">
              6/7
            </p>
          </div>
          <div className="mt-3 flex gap-1.5">
            <span className="bg-foreground h-1 w-9 rounded-full" />
            <span className="bg-foreground h-1 w-9 rounded-full" />
            <span className="bg-foreground h-1 w-9 rounded-full" />
            <span className="bg-border h-1 w-9 rounded-full" />
          </div>
        </div>
        <span className="border-border bg-background text-muted-foreground rounded-full border px-3.5 py-1.5 text-xs">
          Met je fysio en je fase in beeld
        </span>
      </>
    ),
  },
  {
    title: "Even inchecken, één minuut",
    body: "Slaap, stress, pijn en de training van gisteren. Je fysio leest je check-ins mee in je dossier — of je slaat hem over.",
    screen: "/app/03.jpg",
    alt: "Dagelijkse check-in met schuifregelaars voor slaap, stress en pijn",
    aside: (
      <>
        <div className="border-border bg-background rounded-2xl border p-4 shadow-sm">
          <p className="text-foreground text-sm font-medium">
            Check-in bewaard
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            slaap 4 · stress 7 · pijn 3
          </p>
        </div>
        <span className="border-border bg-background text-muted-foreground rounded-full border px-3.5 py-1.5 text-xs">
          Zichtbaar in het praktijkportaal
        </span>
      </>
    ),
  },
  {
    title: "Je opbouw in cijfers",
    body: "RPE, motivatie, pijn tijdens en pijn na, uitgezet over je sessies. Niet hoe je denkt dat het ging, maar wat je op het moment zelf invulde.",
    screen: "/app/04.jpg",
    alt: "Progressiescherm met programma-statistieken en het sessieverloop",
    aside: (
      <>
        <div className="border-border bg-background rounded-2xl border p-4 shadow-sm">
          <p className="text-foreground text-sm font-medium">
            2 van 3 sessies voltooid
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            Gem. RPE 7.5 · gem. pijn na 4.5
          </p>
        </div>
        <span className="border-border bg-background text-muted-foreground rounded-full border px-3.5 py-1.5 text-xs">
          Van herstel naar prestatie
        </span>
      </>
    ),
  },
];

const STEP_COUNT = STEPS.length;
const SEGMENT = 1 / STEP_COUNT;
const FADE = 0.06;
const SHEET_EASE = cubicBezier(0.32, 0.72, 0, 1);

function presenceWindow(index: number): { input: number[]; output: number[] } {
  const enter = index * SEGMENT;
  const exit = (index + 1) * SEGMENT;
  if (index === 0) return { input: [exit - FADE, exit - 0.02], output: [1, 0] };
  if (index === STEP_COUNT - 1)
    return { input: [enter - 0.02, enter + FADE], output: [0, 1] };
  return {
    input: [enter - 0.02, enter + FADE, exit - FADE, exit - 0.02],
    output: [0, 1, 1, 0],
  };
}

function driftWindow(
  index: number,
  distance: number
): { input: number[]; output: number[] } {
  const enter = index * SEGMENT;
  const exit = (index + 1) * SEGMENT;
  if (index === 0) return { input: [0, exit], output: [0, -distance] };
  if (index === STEP_COUNT - 1)
    return { input: [enter - 0.02, 1], output: [distance, 0] };
  return { input: [enter - 0.02, exit], output: [distance, -distance] };
}

function Screen({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}): ReactNode {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="300px"
      priority={priority}
      className="object-cover object-top"
    />
  );
}

/** iPhone 14 proportions, so the screenshots sit in the frame uncropped. */
function PhoneFrame({ children }: { children: ReactNode }): ReactNode {
  return (
    <div className="border-border bg-background w-[272px] rounded-[44px] border p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:w-[300px] [@media(max-height:760px)]:w-[248px]">
      <div className="relative aspect-[1170/2532] w-full overflow-hidden rounded-[36px] bg-black">
        {children}
        <div
          className="absolute top-2.5 left-1/2 z-20 h-[22px] w-[76px] -translate-x-1/2 rounded-full bg-black"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function ScreenLayer({
  progress,
  index,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  children: ReactNode;
}): ReactNode {
  const enter = index * SEGMENT;
  const cover = (index + 1) * SEGMENT;
  const isFirst = index === 0;
  const isLast = index === STEP_COUNT - 1;

  const y = useTransform(
    progress,
    isFirst ? [0, 1] : [enter - FADE, enter + FADE],
    isFirst ? ["0%", "0%"] : ["103%", "0%"],
    { ease: SHEET_EASE }
  );
  const scale = useTransform(
    progress,
    isLast ? [0, 1] : [cover - FADE, cover + FADE],
    isLast ? [1, 1] : [1, 0.93]
  );
  const dim = useTransform(
    progress,
    isLast ? [0, 1] : [cover - FADE, cover + FADE],
    isLast ? [0, 0] : [0, 0.42]
  );
  const radius = useTransform(
    progress,
    isFirst
      ? [cover - FADE, cover + FADE]
      : isLast
        ? [enter - FADE, enter + FADE]
        : [enter - FADE, enter + FADE, cover - FADE, cover + FADE],
    isFirst ? [0, 24] : isLast ? [32, 0] : [32, 0, 0, 24]
  );

  return (
    <motion.div
      style={{ y, scale, borderRadius: radius }}
      className="absolute inset-0 overflow-hidden bg-black"
    >
      {children}
      <motion.div
        style={{ opacity: dim }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black"
      />
    </motion.div>
  );
}

function StepText({
  progress,
  index,
  step,
}: {
  progress: MotionValue<number>;
  index: number;
  step: Step;
}): ReactNode {
  const presence = presenceWindow(index);
  const drift = driftWindow(index, 36);
  const opacity = useTransform(progress, presence.input, presence.output);
  const y = useTransform(progress, drift.input, drift.output);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="flex items-center gap-4">
        <span className="text-foreground font-mono text-xs font-medium">
          0{index + 1}
        </span>
        <motion.span
          style={{ scaleX: opacity, originX: 0 }}
          className="bg-foreground block h-px w-12"
        />
      </div>
      <h3 className="text-foreground mt-5 font-serif text-3xl leading-[1.12] font-normal tracking-[-0.01em] xl:text-4xl">
        {step.title}
      </h3>
      <p className="text-muted-foreground mt-4 max-w-sm text-base leading-relaxed">
        {step.body}
      </p>
    </motion.div>
  );
}

function StepAside({
  progress,
  index,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  children: ReactNode;
}): ReactNode {
  const presence = presenceWindow(index);
  const drift = driftWindow(index, 70);
  const opacity = useTransform(progress, presence.input, presence.output);
  const y = useTransform(progress, drift.input, drift.output);

  return (
    <motion.div
      style={{ opacity, y }}
      aria-hidden="true"
      className="absolute inset-0 flex flex-col items-start justify-center gap-4"
    >
      {children}
    </motion.div>
  );
}

function SegmentTick({
  progress,
  index,
}: {
  progress: MotionValue<number>;
  index: number;
}): ReactNode {
  const fill = useTransform(
    progress,
    [index * SEGMENT, (index + 1) * SEGMENT],
    [0, 1]
  );

  return (
    <span className="bg-border h-[3px] w-9 overflow-hidden rounded-full">
      <motion.span
        style={{ scaleX: fill, originX: 0 }}
        className="bg-foreground block h-full w-full"
      />
    </span>
  );
}

export function AppShowcase(): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const pinned = isDesktop && !prefersReducedMotion;

  return (
    <section id="hoe-het-werkt" className="scroll-mt-24 pb-24 sm:pb-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl leading-[1.12] font-normal tracking-[-0.01em] text-balance sm:text-4xl lg:text-[2.75rem]">
            Vier schermen, één routine
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
            De hele week zit in één app: wat je vandaag doet, wat je hebt
            afgevinkt, hoe het voelde en waar je naartoe werkt.
          </p>
        </div>
      </div>

      {pinned ? (
        <div ref={wrapperRef} className="relative h-[420svh]">
          <div className="sticky top-0 flex h-svh items-center overflow-hidden">
            <div className="mx-auto grid w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-x-16 px-10">
              <div className="relative h-[340px]">
                {STEPS.map((step, i) => (
                  <StepText
                    key={step.title}
                    progress={scrollYProgress}
                    index={i}
                    step={step}
                  />
                ))}
              </div>

              <div className="relative">
                <div className="relative z-10 flex flex-col items-center gap-7">
                  <PhoneFrame>
                    <div className="absolute inset-0">
                      {STEPS.map((step, i) => (
                        <ScreenLayer
                          key={step.title}
                          progress={scrollYProgress}
                          index={i}
                        >
                          <Screen
                            src={step.screen}
                            alt={step.alt}
                            priority={i === 0}
                          />
                        </ScreenLayer>
                      ))}
                    </div>
                  </PhoneFrame>
                  <div className="flex items-center gap-2" aria-hidden="true">
                    {STEPS.map((step, i) => (
                      <SegmentTick
                        key={step.title}
                        progress={scrollYProgress}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative h-[340px]">
                {STEPS.map((step, i) => (
                  <StepAside
                    key={step.title}
                    progress={scrollYProgress}
                    index={i}
                  >
                    {step.aside}
                  </StepAside>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-14 flex max-w-[1440px] flex-col gap-16 px-5 sm:px-8 lg:px-10">
          {STEPS.map((step, i) => (
            <div key={step.title}>
              <div className="flex justify-center">
                <PhoneFrame>
                  <Screen src={step.screen} alt={step.alt} priority={i === 0} />
                </PhoneFrame>
              </div>
              <div className="mt-10">
                <div className="flex items-center gap-4">
                  <span className="text-foreground font-mono text-xs font-medium">
                    0{i + 1}
                  </span>
                  <span className="bg-foreground block h-px w-12" />
                </div>
                <h3 className="text-foreground mt-5 font-serif text-3xl leading-[1.12] font-normal tracking-[-0.01em] sm:text-4xl">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-4 max-w-sm text-base leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
