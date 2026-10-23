import { AsciiIcon, type Shape } from "@/components/ascii-icon";
import { CutButton } from "@/components/cut-button";
import { ArrowRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

type Feature = {
  shape: Shape;
  title: string;
  body: string;
  meta: string;
  href: string;
};

const FEATURES: Feature[] = [
  {
    shape: "scan",
    title: "Eén traject, van klacht tot doel",
    body: "Revalidatie en performance zitten in hetzelfde dossier. Je bouwt het pad in fases, geeft de volgende fase vrij wanneer het kan — zonder je cliënt over te zetten naar een ander systeem.",
    meta: "Traject · fases en plan",
    href: "#praktijkportaal",
  },
  {
    shape: "shield",
    title: "Je ziet wat er in de zaal gebeurt",
    body: "Afgevinkte oefeningen, ingevulde weerstanden, RPE, pijn tijdens en na, motivatie en herstel. Niet wat iemand zich achteraf herinnert, maar wat er op het moment zelf is ingevuld.",
    meta: "Check-ins · sessielogboek",
    href: "#hoe-het-werkt",
  },
  {
    shape: "key",
    title: "Compliance die je niet hoeft te regelen",
    body: "Hosting binnen de EU bij een gecertificeerde partij, inzage in dossiers gelogd in een append-only auditlog, invite-only toegang en wachtwoorden van minimaal 12 tekens.",
    meta: "NEN 7510 / 7512 / 7513",
    href: "#veiligheid",
  },
];

const CARD_CLIP =
  "polygon(0 0, calc(100% - 34px) 0, 100% 34px, 100% 100%, 0 100%)";

export function Features(): ReactNode {
  const clip = { clipPath: CARD_CLIP } as CSSProperties;

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
      <div className="max-w-2xl">
        <h2 className="font-serif text-3xl leading-[1.12] font-normal tracking-[-0.01em] text-balance sm:text-4xl lg:text-[2.75rem]">
          Het schema, de uitvoering en de terugkoppeling in één systeem
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
          Geen losse PDF&apos;s, Excel-schema&apos;s of appjes meer. De praktijk
          bouwt, de cliënt traint, en alles wat er gebeurt komt op dezelfde plek
          terug.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="bg-border p-px" style={clip}>
            <article
              className="bg-background flex h-full flex-col p-6 sm:p-7"
              style={clip}
            >
              <h3 className="text-lg font-semibold tracking-tight">
                {feature.title}
              </h3>

              <div className="border-border my-5 border-t border-dotted" />
              <div className="flex justify-center py-6 sm:py-8">
                <AsciiIcon shape={feature.shape} />
              </div>
              <div className="border-border mb-6 border-t border-dotted" />

              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.body}
              </p>

              <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                <span className="text-muted-foreground text-xs font-medium">
                  {feature.meta}
                </span>
                <CutButton
                  href={feature.href}
                  variant="outline"
                  iconOnly
                  aria-label={`Meer over ${feature.title}`}
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </CutButton>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
