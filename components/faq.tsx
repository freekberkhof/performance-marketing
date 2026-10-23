"use client";

import { CutButton } from "@/components/cut-button";
import { CornerPlus } from "@/components/corner-plus";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type QA = { question: string; answer: string };

const FAQS: QA[] = [
  {
    question: "Wat is Performance Plus precies?",
    answer:
      "Performance Plus bestaat uit twee delen: een praktijkportaal waarin je trajecten, fases en oefenprogramma's opbouwt, en een app waarin je cliënt die sessies uitvoert, oefeningen afvinkt en check-ins invult. Alles wat er in de app gebeurt, komt in het portaal terug.",
  },
  {
    question: "Voor wie is het bedoeld?",
    answer:
      "Voor fysiotherapiepraktijken die cliënten begeleiden van klacht naar doel. De praktijk is de klant; behandelaars en praktijkbeheerders werken in het portaal, cliënten krijgen een uitnodiging voor de app. Toegang is uitsluitend op uitnodiging — er is geen open registratie.",
  },
  {
    question: "Hoe zit het met revalidatie versus performance?",
    answer:
      "Dat is één traject, geen twee. Een traject bestaat uit fases, en per fase wijs je een programma toe vanuit je bibliotheek. Of dat programma uit de categorie revalidatie of performance komt, maakt voor het dossier niet uit — je cliënt blijft in dezelfde lijn en hoeft nergens opnieuw te beginnen.",
  },
  {
    question: "Wat vult een cliënt in na een sessie?",
    answer:
      "Een korte check-in: pijn tijdens de training, pijn na de training, RPE oftewel hoe zwaar het voelde, motivatie, en optioneel een notitie voor jou. Daarnaast is er een dagelijkse check-in over slaap, stress, pijn en spierpijn die uitkomt op een herstelscore.",
  },
  {
    question: "Krijg ik een melding als het misgaat?",
    answer:
      "Ja. Afgeronde sessies en ingevulde check-ins landen als melding in het portaal, en bij een pijnscore van 7 of hoger krijgt die melding voorrang, inclusief locatie en score. Je handelt meldingen af vanuit het portaal. De app is nadrukkelijk geen spoedkanaal — daarvoor gelden je eigen afspraken.",
  },
  {
    question: "Geeft de app trainingsadvies aan mijn cliënt?",
    answer:
      "Nee. De herstelscore is een signaal, geen vrijgave om te trainen, en de app vervangt geen persoonlijke beoordeling. Er gaat ook nooit automatisch iets naar jou toe zonder dat de cliënt dat zelf doet — behalve de meldingen die in het portaal verschijnen.",
  },
  {
    question: "Waar staan de gegevens?",
    answer:
      "Bij een gecertificeerde host binnen de EU. De opzet volgt NEN 7510, 7512 en 7513: inzage in dossiers en programma's wordt gelogd in een auditlog waarin niets achteraf gewijzigd of verwijderd kan worden, en er staan nooit gezondheidswaarden in die logs.",
  },
  {
    question: "Moet ik mijn bestaande schema's opnieuw invoeren?",
    answer:
      "Je bouwt je oefeningen en templates één keer op in je eigen praktijkbibliotheek; daarna wijs je ze met twee klikken toe. Bij grotere praktijken helpen we bij het overzetten van bestaande schema's — dat bespreken we in de demo.",
  },
  {
    question: "Is dit een afgerond product?",
    answer:
      "Performance Plus draait als pilotversie en wordt stap voor stap verbeterd op basis van gebruik en feedback uit de praktijk. Dat zeggen we ook in de app zelf. Wat er staat, werkt; wat eraan komt, bepalen we samen met de praktijken die meedraaien.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function FaqItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: QA;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}): ReactNode {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="border-border border-dotted [&:not(:first-child)]:border-t">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="focus-ring flex w-full items-center justify-between gap-6 py-5 pr-1 text-left lg:py-6 lg:pl-12"
        >
          <span className="text-base font-medium tracking-tight sm:text-lg">
            {item.question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="text-muted-foreground shrink-0"
          >
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground max-w-xl pr-6 pb-6 text-sm leading-relaxed lg:pl-12">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq(): ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const accordionRef = useRef<HTMLDivElement | null>(null);
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const node = accordionRef.current;
    if (node === null) return;

    let peak = 0;
    let width = node.offsetWidth;

    const observer = new ResizeObserver(() => {
      if (node.offsetWidth !== width) {
        width = node.offsetWidth;
        peak = 0;
        setMinHeight(undefined);
        return;
      }
      const next = node.offsetHeight;
      if (next > peak) {
        peak = next;
        setMinHeight(next);
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="faq"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10"
    >
      <div className="border-border relative grid border-y lg:grid-cols-[0.85fr_1.15fr]">
        {/* Outer frame corners */}
        <CornerPlus className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <CornerPlus className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />

        {/* Left: heading */}
        <div className="border-border border-b py-10 lg:border-r lg:border-b-0 lg:py-16 lg:pr-12">
          <h2 className="font-serif text-4xl leading-[1.05] font-normal tracking-[-0.01em] text-balance sm:text-5xl lg:text-[3.5rem]">
            Veelgestelde vragen
          </h2>
          <p className="text-muted-foreground mt-6 max-w-sm text-sm leading-relaxed sm:text-base">
            Alles over werken met Performance Plus in je praktijk. Staat je
            vraag er niet bij? We denken graag mee.
          </p>
          <div className="mt-8">
            <CutButton href="#demo" variant="outline">
              Stel je vraag
            </CutButton>
          </div>
        </div>

        {/* Right: accordion */}
        <div
          ref={accordionRef}
          className="relative"
          style={minHeight !== undefined ? { minHeight } : undefined}
        >
          {/* Plus marks where the divider meets the frame */}
          <CornerPlus className="top-0 left-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
          <CornerPlus className="bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 lg:block" />
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.question}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
