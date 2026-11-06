import Image from "next/image";
import type { ReactNode } from "react";

type Audience = {
  title: string;
  body: string;
  src: string;
  alt: string;
  /** Where the crop should hold on; these are portraits, so faces first. */
  position: string;
};

const AUDIENCES: Audience[] = [
  {
    title: "Terug na een blessure",
    body: "Je bouwt de belasting in fases op en ziet na elke sessie hoe pijn, herstel en motivatie lopen.",
    src: "/audiences/01.webp",
    alt: "Wielrenster halverwege een zware inspanning",
    position: "50% 35%",
  },
  {
    title: "Op weg naar het oude niveau",
    body: "Je cliënt is hersteld, maar haalt het oude niveau nog niet. Je zet de opbouwfase klaar in hetzelfde dossier.",
    src: "/audiences/02.webp",
    alt: "Sporter in trainingstenue op het veld",
    position: "50% 30%",
  },
  {
    title: "Zelfstandig doortrainen",
    body: "Je cliënt traint op eigen kracht verder met het plan in de app, en jij blijft de check-ins in het portaal lezen.",
    src: "/audiences/03.webp",
    alt: "Hardloopster op volle snelheid",
    position: "50% 25%",
  },
];

export function Audiences(): ReactNode {
  return (
    <section
      id="voor-wie"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl leading-[1.12] font-[450] tracking-[-0.01em] text-balance sm:text-4xl lg:text-[2.75rem]">
          Voor cliënten die terug willen naar hun oude niveau
        </h2>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed text-balance sm:text-base">
          Revalidatie, opbouw en zelfstandig doortrainen zijn drie fases van
          hetzelfde traject.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
        {AUDIENCES.map((audience) => (
          <article
            key={audience.title}
            className="relative isolate aspect-[4/5] overflow-hidden md:aspect-[3/4]"
          >
            <Image
              src={audience.src}
              alt={audience.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="-z-10 object-cover"
              style={{ objectPosition: audience.position }}
            />

            {/* Lifts the panel off the photo without hiding it. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(to top, color-mix(in srgb, var(--page) 75%, transparent) 0%, transparent 55%)",
              }}
            />

            <div className="absolute inset-x-4 bottom-4 border border-white/15 bg-black/35 p-5 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
              <h3 className="text-base font-semibold tracking-tight text-white">
                {audience.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {audience.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
