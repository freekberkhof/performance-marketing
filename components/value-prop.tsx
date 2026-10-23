import { Kicker } from "@/components/corner-plus";
import type { CSSProperties, ReactNode } from "react";

const PROBLEMS: { title: string; body: string }[] = [
  {
    title: "Het schema verdwijnt na de behandeling",
    body: "Een PDF of een foto van een A4 is twee weken later onvindbaar. Wat er thuis of in de zaal écht gebeurt, hoor je pas bij de volgende afspraak.",
  },
  {
    title: "Revalidatie en performance leven apart",
    body: "Zodra iemand hersteld is begint het opbouwen. In de meeste systemen is dat een nieuw dossier, een nieuwe tool, en een breuk in de lijn die je net hebt opgebouwd.",
  },
  {
    title: "Signalen komen te laat binnen",
    body: "Pijn die oploopt, motivatie die wegzakt, check-ins die niet meer worden ingevuld — dat zie je zonder data pas als er al iets is misgegaan.",
  },
];

const CUT_CLIP =
  "polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px)";

/** A small, honest slice of the practice portal: what lands when it matters. */
function AlertsVisual(): ReactNode {
  const items: {
    label: string;
    detail: string;
    time: string;
    critical?: boolean;
  }[] = [
    {
      label: "Hoge pijnscore",
      detail: "Frans Broekhof · pijn na sessie 8/10 · knie rechts",
      time: "4 min",
      critical: true,
    },
    {
      label: "Dagelijkse check-in",
      detail: "Sanne Bos · pijn 3/10 · slaap 4/10 · stress 7/10",
      time: "26 min",
    },
    {
      label: "Sessie afgerond",
      detail: "Youssef El Amrani · Week 3 · Sessie 2 · 7/7 afgevinkt",
      time: "1 uur",
    },
    {
      label: "Hoge pijnscore (check-in)",
      detail: "Lotte Vermeer · pijn 7/10",
      time: "3 uur",
    },
  ];

  return (
    <div
      className="border-border bg-muted/30 relative flex h-full w-full flex-col border p-6 sm:p-8"
      style={{ clipPath: CUT_CLIP } as CSSProperties}
    >
      <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
        Meldingen · vandaag
      </p>

      <ul className="divide-border/60 mt-5 flex flex-col divide-y">
        {items.map((item) => (
          <li key={item.label + item.detail} className="flex gap-3 py-4">
            <span
              aria-hidden="true"
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                item.critical ? "bg-foreground" : "bg-foreground/25"
              }`}
            />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[13px] font-semibold tracking-tight">
                {item.label}
              </span>
              <span className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
                {item.detail}
              </span>
            </span>
            <span className="text-muted-foreground shrink-0 text-[11px] tabular-nums">
              {item.time}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-muted-foreground border-border mt-auto border-t border-dotted pt-5 text-xs leading-relaxed">
        Meldingen gaan naar de praktijk, nooit automatisch terug naar de cliënt.
        De app doet geen beoordeling en is geen spoedkanaal.
      </p>
    </div>
  );
}

export function ValueProp(): ReactNode {
  return (
    <section
      id="meldingen"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        <div className="lg:order-2">
          <AlertsVisual />
        </div>

        <div className="lg:order-1">
          <Kicker>De uitdaging</Kicker>
          <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-[1.12] font-normal tracking-[-0.01em] text-balance sm:text-4xl lg:text-[2.75rem]">
            Je weet wat iemand{" "}
            <span className="font-sans font-semibold tracking-tight">
              zou moeten doen
            </span>
            . Zelden wat er{" "}
            <span className="font-sans font-semibold tracking-tight">
              echt gebeurt
            </span>
          </h2>

          <dl className="mt-10">
            {PROBLEMS.map((item) => (
              <div
                key={item.title}
                className="border-border border-t border-dotted py-5"
              >
                <dt className="text-sm font-semibold tracking-tight">
                  {item.title}
                </dt>
                <dd className="text-muted-foreground mt-1.5 max-w-md text-sm leading-relaxed">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
