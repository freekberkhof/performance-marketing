import { CornerPlus } from "@/components/corner-plus";
import { Server } from "lucide-react";
import type { ReactNode } from "react";

const STANDARDS = [
  "NEN 7510",
  "NEN 7512",
  "NEN 7513",
  "AVG / GDPR",
  "ISO 27001-host",
];

export function TrustedBy(): ReactNode {
  return (
    <section
      id="veiligheid"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-24 sm:px-8 lg:px-10"
    >
      <div className="border-border relative border">
        <CornerPlus className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <CornerPlus className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />

        <div className="flex flex-col items-stretch md:flex-row">
          <div className="border-border flex shrink-0 items-center justify-center border-b px-6 py-5 md:border-r md:border-b-0 md:py-7">
            <span className="text-muted-foreground text-xs font-medium">
              Gebouwd voor resultaat
            </span>
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-evenly gap-x-8 gap-y-4 px-8 py-7">
            {STANDARDS.map((s) => (
              <span
                key={s}
                className="text-foreground/70 font-mono text-[13px] font-medium tracking-tight"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="border-border text-muted-foreground flex shrink-0 items-center justify-center gap-2 border-t px-6 py-5 md:border-t-0 md:border-l md:py-7">
            <Server className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            <span className="text-xs font-medium">Gehost in Europa</span>
          </div>
        </div>
      </div>
    </section>
  );
}
