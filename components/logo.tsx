import type { CSSProperties, ReactNode } from "react";

const MARK_MASK = "url(/logo-mark.webp) center / contain no-repeat";

/**
 * The Perform+ "P+" mark. Rendered as a CSS mask over
 * `bg-foreground` so the white source artwork inherits the active theme
 * colour instead of disappearing on a light background.
 */
export function LogoMark({
  className = "h-7 w-7",
}: {
  className?: string;
}): ReactNode {
  return (
    <span
      aria-hidden="true"
      style={{ mask: MARK_MASK, WebkitMask: MARK_MASK } as CSSProperties}
      className={`bg-foreground block ${className}`}
    />
  );
}

export function Logo({ href = "#top" }: { href?: string }): ReactNode {
  return (
    <a
      href={href}
      className="focus-ring group inline-flex items-center gap-2.5"
      aria-label="Perform+, naar de homepage"
    >
      <LogoMark className="h-7 w-7 transition-transform duration-300 group-hover:scale-105" />
      <span className="text-[17px] font-semibold tracking-tight max-[374px]:sr-only">
        Perform+
      </span>
    </a>
  );
}
