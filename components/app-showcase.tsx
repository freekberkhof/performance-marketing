"use client";

import { LogoMark } from "@/components/logo";
import { useIsDesktop, useReducedMotion } from "@/lib/motion";
import { ChartNoAxesColumn, ChevronRight, Play, Settings } from "lucide-react";
import {
  cubicBezier,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";

type Step = {
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    title: "Je overzicht, elke ochtend",
    body: "Belasting, voltooide sessies en motivatie staan bovenaan. Eén blik en je weet waar je staat — en wat er vandaag klaarstaat.",
  },
  {
    title: "Sessie voor sessie afvinken",
    body: "Je week is opgedeeld in sessies, je sessie in oefeningen. Vink af tijdens het trainen; de voortgang loopt live mee.",
  },
  {
    title: "De check-in na afloop",
    body: "Een korte check-in over belasting, pijn en motivatie. Dertig seconden werk, en je fysio ziet het meteen terug.",
  },
  {
    title: "Je pad in beeld",
    body: "Zes fases van herstel naar prestatie. Progressie laat zien wat er écht veranderd is, niet alleen hoe je je voelt.",
  },
];

const STEP_COUNT = STEPS.length;
const SEGMENT = 1 / STEP_COUNT;
const FADE = 0.06;
const SHEET_EASE = cubicBezier(0.32, 0.72, 0, 1);

/** App accent colours, lifted from the Performance Plus iOS app. */
const LOAD = "#7FB4E6";
const DONE = "#5BD3BC";
const MOOD = "#E8C464";

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

/* -------------------------------------------------------------------------
   Phone screens — static recreations of the real app, kept intentionally
   plain so they read at phone scale.
   ---------------------------------------------------------------------- */

const SCREEN_BG = "bg-[#10161b]";

function StatusBar(): ReactNode {
  return (
    <div
      className="flex items-center justify-between px-5 pt-3.5 text-[10px] font-semibold text-white/90"
      aria-hidden="true"
    >
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="block h-1.5 w-1.5 rounded-full bg-white/60" />
        <span className="block h-2 w-3 rounded-[2px] border border-white/60" />
      </span>
    </div>
  );
}

function Ring({
  value,
  label,
  sub,
  color,
  fraction,
  size = 58,
}: {
  value: string;
  label: string;
  sub: string;
  color: string;
  fraction: number;
  size?: number;
}): ReactNode {
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="relative block" style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="h-full w-full -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${c * fraction} ${c}`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-white">
          {value}
        </span>
      </span>
      <span className="text-[7px] font-semibold tracking-[0.12em] text-white/70 uppercase">
        {label}
      </span>
      <span className="max-w-[72px] text-center text-[7px] leading-tight text-white/40">
        {sub}
      </span>
    </div>
  );
}

function OverviewScreen(): ReactNode {
  return (
    <div className={`flex h-full flex-col ${SCREEN_BG}`}>
      <StatusBar />
      <div className="flex-1 overflow-hidden px-4">
        <div className="mt-3 flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black">
            <LogoMark className="h-3.5 w-3.5 bg-white" />
          </span>
          <span className="flex-1">
            <span className="block text-[8px] font-semibold tracking-[0.14em] text-white/60 uppercase">
              Performance Plus
            </span>
            <span className="block text-[9px] text-white/40">
              1 actief programma
            </span>
          </span>
          <Settings className="size-3.5 text-white/40" aria-hidden="true" />
        </div>

        <p className="mt-5 text-[19px] leading-tight font-semibold tracking-tight text-white">
          Hi Frans, lekker bezig.
        </p>
        <p className="mt-1 text-[10px] text-white/45">
          Je plan, sessies en check-ins op één plek.
        </p>

        <div className="mt-5 flex items-start justify-between">
          <Ring
            value="7.5"
            label="Belasting"
            sub="Gem. RPE uit check-ins"
            color={LOAD}
            fraction={0.75}
          />
          <Ring
            value="67%"
            label="Voltooid"
            sub="2/3 sessies voltooid"
            color={DONE}
            fraction={0.67}
            size={66}
          />
          <Ring
            value="4.5"
            label="Motivatie"
            sub="Gem. motivatie uit check-ins"
            color={MOOD}
            fraction={0.9}
          />
        </div>

        <div className="mt-5 flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-3">
          <span className="flex-1">
            <span className="block text-[7px] font-semibold tracking-[0.14em] text-white/45 uppercase">
              Check-in van vandaag
            </span>
            <span className="mt-0.5 block text-[11px] text-white">
              Nog niet ingevuld
            </span>
          </span>
          <span className="text-[9px] font-semibold text-white">Invullen</span>
        </div>

        <div className="mt-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-3.5">
          <span className="flex items-center gap-1.5">
            <Play className="size-2.5 text-white/60" aria-hidden="true" />
            <span className="text-[7px] font-semibold tracking-[0.14em] text-white/45 uppercase">
              Bezig
            </span>
          </span>
          <p className="mt-2 text-[13px] font-semibold tracking-tight text-white">
            Week 1 · Sessie 3
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-black">
            Open sessie
            <ChevronRight className="size-2.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}

function SessionsScreen(): ReactNode {
  const sessions = [
    { n: 1, status: "Voltooid", done: 5, pct: 0.71 },
    { n: 2, status: "Voltooid", done: 6, pct: 0.86 },
  ];

  return (
    <div className={`flex h-full flex-col ${SCREEN_BG}`}>
      <StatusBar />
      <div className="flex-1 overflow-hidden px-4">
        <div className="mt-4 flex items-center justify-between">
          <ChevronRight
            className="size-3.5 rotate-180 text-white/30"
            aria-hidden="true"
          />
          <span className="text-[13px] font-semibold text-white">Week 1</span>
          <ChevronRight className="size-3.5 text-white/30" aria-hidden="true" />
        </div>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/15">
          <span className="block h-full w-2/3 rounded-full bg-white" />
        </div>
        <p className="mt-2 text-[10px] text-white/40">
          <span className="font-semibold text-white">2/3</span> sessies{" "}
          <span className="ml-1 font-semibold text-white">7</span> oefeningen
        </p>

        <div className="mt-3.5 flex items-center gap-2.5 rounded-2xl border border-white/10 px-3 py-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/25 text-[9px] text-white/60">
            FB
          </span>
          <span>
            <span className="block text-[11px] font-semibold text-white">
              Freek Berkhof
            </span>
            <span className="block text-[8px] text-white/45">
              Jouw fysio · Fase 2 — Dynamisch
            </span>
          </span>
        </div>

        {sessions.map((s) => (
          <div key={s.n} className="mt-2.5 rounded-2xl bg-white/[0.06] p-3">
            <div className="flex items-start justify-between">
              <span
                className="rounded-full px-2 py-0.5 text-[8px] font-semibold"
                style={{ background: "rgba(91,211,188,0.15)", color: DONE }}
              >
                {s.status}
              </span>
              <span
                className="flex size-6 items-center justify-center rounded-full text-[10px] font-bold text-black"
                style={{ background: DONE }}
                aria-hidden="true"
              >
                ✓
              </span>
            </div>
            <p className="mt-1.5 text-[14px] font-semibold tracking-tight text-white">
              Sessie {s.n}
            </p>
            <p className="mt-0.5 text-[8px] leading-tight text-white/40">
              Warm-up · Prehab · Pillar Prep · Movement Prep · Strength ·…
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                <span
                  className="block h-full rounded-full bg-white"
                  style={{ width: `${s.pct * 100}%` }}
                />
              </span>
              <span className="text-[8px] whitespace-nowrap text-white/50">
                {s.done}/7 afgevinkt
              </span>
            </div>
          </div>
        ))}

        <div className="mt-2.5 rounded-2xl bg-white/[0.06] p-3">
          <span
            className="rounded-full px-2 py-0.5 text-[8px] font-semibold"
            style={{ background: "rgba(232,196,100,0.15)", color: MOOD }}
          >
            Bezig
          </span>
          <p className="mt-1.5 text-[14px] font-semibold tracking-tight text-white">
            Sessie 3
          </p>
        </div>
      </div>
    </div>
  );
}

function CheckInScreen(): ReactNode {
  const scale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className={`flex h-full flex-col ${SCREEN_BG}`}>
      <StatusBar />
      <div className="flex-1 px-4">
        <p className="mt-6 text-[8px] font-semibold tracking-[0.14em] text-white/45 uppercase">
          Check-in · Sessie 3
        </p>
        <p className="mt-2 text-[19px] leading-tight font-semibold tracking-tight text-white">
          Hoe zwaar voelde het?
        </p>

        <div className="mt-5">
          <p className="text-[9px] text-white/45">Belasting (RPE)</p>
          <div className="mt-2 flex gap-1">
            {scale.map((n) => (
              <span
                key={n}
                className="flex-1 rounded-[3px] text-center text-[7px] leading-[18px] font-semibold"
                style={
                  {
                    background: n <= 7 ? LOAD : "rgba(255,255,255,0.08)",
                    color: n <= 7 ? "#0b1014" : "rgba(255,255,255,0.4)",
                  } as CSSProperties
                }
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[9px] text-white/45">Pijn tijdens de oefening</p>
          <div className="mt-2 flex gap-1">
            {scale.map((n) => (
              <span
                key={n}
                className="flex-1 rounded-[3px] text-center text-[7px] leading-[18px] font-semibold"
                style={
                  {
                    background: n <= 2 ? MOOD : "rgba(255,255,255,0.08)",
                    color: n <= 2 ? "#0b1014" : "rgba(255,255,255,0.4)",
                  } as CSSProperties
                }
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[9px] text-white/45">Motivatie</p>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className="flex-1 rounded-[4px] py-1.5 text-center text-[8px] font-semibold"
                style={
                  {
                    background: n <= 4 ? DONE : "rgba(255,255,255,0.08)",
                    color: n <= 4 ? "#0b1014" : "rgba(255,255,255,0.4)",
                  } as CSSProperties
                }
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-white/10 px-3 py-2.5">
          <p className="text-[8px] text-white/35">
            Opmerking voor je fysio (optioneel)
          </p>
          <p className="mt-1 text-[9px] text-white/70">
            Knie voelde stabieler dan vorige week.
          </p>
        </div>

        <div className="mt-4 rounded-full bg-white py-2.5 text-center text-[10px] font-semibold text-black">
          Check-in versturen
        </div>
      </div>
    </div>
  );
}

function ProgressScreen(): ReactNode {
  const bars = [38, 46, 52, 49, 61, 68, 74, 81];
  const phases = [
    "Fase 1 · 2 weken",
    "Fase 2 — Dynamisch",
    "Fase 3 · 3 weken",
    "Fase 4 · 4 weken",
    "Fase 5 · 4 weken",
    "Fase 6 · 2 weken",
  ];

  return (
    <div className={`flex h-full flex-col ${SCREEN_BG}`}>
      <StatusBar />
      <div className="flex-1 overflow-hidden px-4">
        <div className="mt-4 flex items-center gap-1.5">
          <ChartNoAxesColumn
            className="size-3.5 text-white/50"
            aria-hidden="true"
          />
          <span className="text-[13px] font-semibold text-white">
            Progressie
          </span>
        </div>

        <div className="mt-4 rounded-2xl bg-white/[0.06] p-3.5">
          <p className="text-[8px] font-semibold tracking-[0.14em] text-white/45 uppercase">
            Belasting over 8 weken
          </p>
          <div className="mt-3 flex h-20 items-end gap-1.5">
            {bars.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-[3px]"
                style={{
                  height: `${h}%`,
                  background: i === bars.length - 1 ? DONE : LOAD,
                  opacity: i === bars.length - 1 ? 1 : 0.5,
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-2.5 rounded-2xl bg-white/[0.06] p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-[8px] font-semibold tracking-[0.14em] text-white/45 uppercase">
              Jouw pad
            </p>
            <span
              className="rounded-full px-2 py-0.5 text-[8px] font-semibold"
              style={{ background: "rgba(91,211,188,0.15)", color: DONE }}
            >
              Fase 2 van 6
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {phases.map((p, i) => (
              <div key={p} className="flex items-center gap-2">
                <span
                  className="block size-1.5 shrink-0 rounded-full"
                  style={{
                    background: i <= 1 ? DONE : "rgba(255,255,255,0.18)",
                  }}
                />
                <span
                  className="text-[9px]"
                  style={{
                    color: i <= 1 ? "#fff" : "rgba(255,255,255,0.35)",
                    fontWeight: i === 1 ? 600 : 400,
                  }}
                >
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const SCREENS: ReactNode[] = [
  <OverviewScreen key="overzicht" />,
  <SessionsScreen key="sessies" />,
  <CheckInScreen key="check-in" />,
  <ProgressScreen key="progressie" />,
];

const ASIDES: ReactNode[] = [
  <>
    <div className="border-border bg-background rounded-2xl border p-4 shadow-sm">
      <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
        Vandaag
      </p>
      <p className="text-foreground mt-1.5 text-sm font-medium">
        Week 1 · Sessie 3 · 7 oefeningen
      </p>
      <p className="text-muted-foreground mt-1 text-xs">
        Belasting 7.5 · motivatie 4.5
      </p>
    </div>
    <span className="border-border bg-background text-muted-foreground rounded-full border px-3.5 py-1.5 text-xs">
      Geen Excel, geen papieren schema
    </span>
  </>,
  <>
    <div className="border-border bg-background rounded-2xl border p-4 shadow-sm">
      <div className="flex items-center justify-between gap-8">
        <p className="text-foreground text-sm font-medium">Sessie 3</p>
        <p className="text-muted-foreground font-mono text-[10px] tabular-nums">
          4/7
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
      Werkt ook zonder bereik in de zaal
    </span>
  </>,
  <>
    <div className="border-border bg-background rounded-2xl border p-4 shadow-sm">
      <p className="text-foreground text-sm font-medium">Check-in verstuurd</p>
      <p className="text-muted-foreground mt-1 text-xs">
        RPE 7 · pijn 2 · motivatie 4
      </p>
    </div>
    <div className="border-border bg-background rounded-2xl border p-3 shadow-sm">
      <p className="text-muted-foreground text-xs">
        Zichtbaar in het fysio-dashboard
      </p>
    </div>
  </>,
  <>
    <div className="border-border bg-background rounded-2xl border p-4 shadow-sm">
      <p className="text-foreground text-sm font-medium">Fase 2 van 6</p>
      <p className="text-muted-foreground mt-1 text-xs">
        Dynamisch bewegen met goede controle
      </p>
    </div>
    <span className="border-border bg-background text-muted-foreground rounded-full border px-3.5 py-1.5 text-xs">
      Van herstel naar prestatie
    </span>
  </>,
];

function PhoneFrame({ children }: { children: ReactNode }): ReactNode {
  return (
    <div className="border-border bg-background w-[272px] rounded-[44px] border p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] sm:w-[300px] [@media(max-height:760px)]:w-[248px]">
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[36px] bg-[#10161b]">
        {children}
        <div
          className="absolute top-2.5 left-1/2 h-[22px] w-[76px] -translate-x-1/2 rounded-full bg-black"
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
      className="absolute inset-0 overflow-hidden bg-[#10161b]"
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
            Vier schermen,{" "}
            <span className="font-sans font-semibold tracking-tight">
              één routine
            </span>
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
                      {SCREENS.map((screen, i) => (
                        <ScreenLayer
                          key={STEPS[i]?.title}
                          progress={scrollYProgress}
                          index={i}
                        >
                          {screen}
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
                {ASIDES.map((aside, i) => (
                  <StepAside
                    key={STEPS[i]?.title}
                    progress={scrollYProgress}
                    index={i}
                  >
                    {aside}
                  </StepAside>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-14 flex max-w-[1440px] flex-col gap-16 px-5 sm:px-8 lg:px-10">
          <div className="flex justify-center">
            <PhoneFrame>
              <div className="absolute inset-0">{SCREENS[0]}</div>
            </PhoneFrame>
          </div>
          <ol className="flex flex-col gap-12">
            {STEPS.map((step, i) => (
              <li key={step.title}>
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
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
