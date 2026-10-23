"use client";

import { AsciiIcon, type Shape } from "@/components/ascii-icon";
import { CutButton } from "@/components/cut-button";
import { useReducedMotion } from "@/lib/motion";
import { CircleCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type CSSProperties, type ReactNode } from "react";

type Tier = {
  name: string;
  blurb: string;
  monthly: number;
  yearly: number;
  icon: Shape;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Praktijk",
    blurb: "Voor een praktijk met één locatie.",
    monthly: 4,
    yearly: 3,
    icon: "bolt",
    features: [
      "Tot 50 actieve cliënten",
      "Trajecten, fases en programma's",
      "App voor je cliënten (iOS en Android)",
      "Sessie- en dagelijkse check-ins",
      "Meldingen bij hoge pijnscores",
      "Eigen oefeningen- en templatebibliotheek",
    ],
    cta: "Demo aanvragen",
  },
  {
    name: "Praktijk+",
    blurb: "Voor een team dat samen behandelt.",
    monthly: 7,
    yearly: 5,
    icon: "plus",
    features: [
      "Alles uit Praktijk",
      "Onbeperkt actieve cliënten",
      "Teambeheer en rollen",
      "Gedeelde praktijkbibliotheek",
      "Volledig sessielogboek en export",
      "Voorrang bij support",
    ],
    cta: "Demo aanvragen",
    highlighted: true,
  },
  {
    name: "Groep",
    blurb: "Voor meerdere locaties onder één merk.",
    monthly: 0,
    yearly: 0,
    icon: "bars",
    features: [
      "Alles uit Praktijk+",
      "Meerdere praktijken, strikt gescheiden",
      "Globale templates over locaties heen",
      "Verwerkersovereenkomst op maat",
      "Begeleide migratie van je huidige schema's",
      "Vaste contactpersoon",
    ],
    cta: "Neem contact op",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const CARD_CLIP =
  "polygon(0 0, calc(100% - 34px) 0, 100% 34px, 100% 100%, 0 100%)";

function PriceValue({
  value,
  yearly,
  reduce,
}: {
  value: number;
  yearly: boolean;
  reduce: boolean;
}): ReactNode {
  const enterY = reduce ? 0 : yearly ? "-110%" : "110%";
  const exitY = reduce ? 0 : yearly ? "110%" : "-110%";

  return (
    <span className="relative inline-flex overflow-hidden leading-none tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: enterY, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: exitY, opacity: 0 }}
          transition={{ duration: reduce ? 0.001 : 0.45, ease: EASE }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Toggle({
  yearly,
  setYearly,
  reduce,
}: {
  yearly: boolean;
  setYearly: (value: boolean) => void;
  reduce: boolean;
}): ReactNode {
  const options = [
    { id: "monthly", label: "Maandelijks", value: false },
    { id: "yearly", label: "Jaarlijks", value: true },
  ] as const;

  return (
    <div className="border-border bg-muted inline-flex items-center gap-1 rounded-md border p-1">
      {options.map((opt) => {
        const isActive = opt.value === yearly;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setYearly(opt.value)}
            aria-pressed={isActive}
            className="focus-ring relative rounded-[5px] px-4 py-1.5 text-sm font-medium"
          >
            {isActive && (
              <motion.span
                layoutId="pricing-toggle-active"
                className="bg-background absolute inset-0 rounded-[5px] shadow-sm"
                transition={
                  reduce
                    ? { duration: 0.001 }
                    : { type: "spring", stiffness: 420, damping: 34 }
                }
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-2 transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {opt.label}
              {opt.value && (
                <span className="rounded-[3px] bg-[#2f80ff] px-1.5 py-0.5 text-[11px] leading-none font-semibold text-white">
                  -25%
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function Pricing(): ReactNode {
  const [yearly, setYearly] = useState(false);
  const reduce = useReducedMotion();
  const clip = { clipPath: CARD_CLIP } as CSSProperties;

  return (
    <section
      id="tarieven"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl leading-[1.12] font-normal tracking-[-0.01em] text-balance sm:text-4xl lg:text-[2.75rem]">
            Tarieven die meegroeien met je{" "}
            <span className="font-sans font-semibold tracking-tight">
              praktijk
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
            Je betaalt per actieve cliënt, niet per behandelaar. Alle pakketten
            bevatten de volledige app, het praktijkportaal en de Europese
            hosting.
          </p>
        </div>
        <div className="shrink-0">
          <Toggle yearly={yearly} setYearly={setYearly} reduce={reduce} />
        </div>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
        {TIERS.map((tier) => {
          const price = yearly ? tier.yearly : tier.monthly;
          return (
            <div
              key={tier.name}
              className={`p-px ${tier.highlighted ? "bg-[#2f80ff]" : "bg-border"}`}
              style={clip}
            >
              <article
                className="bg-background flex h-full flex-col p-6 sm:p-7"
                style={clip}
              >
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {tier.name}
                      </h3>
                      {tier.highlighted && (
                        <span className="rounded-[3px] bg-[#2f80ff] px-2 py-0.5 text-[11px] leading-none font-semibold text-white">
                          Meest gekozen
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1.5 text-sm">
                      {tier.blurb}
                    </p>
                  </div>
                  <AsciiIcon
                    shape={tier.icon}
                    cols={10}
                    className="-mt-1 shrink-0"
                  />
                </header>

                {price === 0 ? (
                  <>
                    <div className="mt-6 flex items-end">
                      <span className="font-sans text-4xl leading-none font-semibold tracking-tight">
                        Op aanvraag
                      </span>
                    </div>
                    <div className="text-muted-foreground mt-2 h-5 text-xs">
                      afgestemd op het aantal locaties
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-6 flex items-end">
                      <span className="self-start pt-1 text-2xl font-semibold tracking-tight">
                        €
                      </span>
                      <span className="font-sans text-5xl leading-none font-semibold tracking-tight">
                        <PriceValue
                          value={price}
                          yearly={yearly}
                          reduce={reduce}
                        />
                      </span>
                      <span className="text-muted-foreground ml-2 pb-1 text-sm">
                        / actieve cliënt / maand
                      </span>
                    </div>
                    <div className="text-muted-foreground mt-2 h-5 text-xs">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={yearly ? "annual" : "monthly"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: reduce ? 0.001 : 0.2 }}
                          className="inline-block"
                        >
                          {yearly
                            ? "jaarlijks gefactureerd, excl. btw"
                            : "maandelijks gefactureerd, excl. btw"}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </>
                )}

                <div className="border-border my-6 border-t border-dotted" />

                <ul className="flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CircleCheck
                        className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#2f80ff]"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <CutButton
                    href="#demo"
                    variant={tier.highlighted ? "solid" : "outline"}
                    fullWidth
                  >
                    {tier.cta}
                  </CutButton>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      <div className="bg-border mt-6 p-px" style={clip}>
        <div
          className="bg-background flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          style={clip}
        >
          <div>
            <h3 className="font-serif text-xl font-normal tracking-[-0.01em] sm:text-2xl">
              Liever eerst zien hoe het werkt?
            </h3>
            <p className="text-muted-foreground mt-1.5 max-w-xl text-sm leading-relaxed">
              We lopen in een half uur met je door een echt traject heen — van
              template tot check-in — met je eigen casuïstiek als voorbeeld.
            </p>
          </div>
          <CutButton
            href="#demo"
            variant="outline"
            className="shrink-0 self-start sm:self-auto"
          >
            Plan een demo
          </CutButton>
        </div>
      </div>
    </section>
  );
}
