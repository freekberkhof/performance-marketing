import { AsciiField } from "@/components/ascii-field";
import type { ReactNode } from "react";

const MASK =
  "linear-gradient(to bottom, transparent 0%, black 25%, black 78%, transparent 100%)";

export function HeroWaves(): ReactNode {
  return <AsciiField mask={MASK} opacity={0.45} className="-z-10" />;
}
