"use client";

import AsciiWaves from "@/components/ascii-waves";
import { softEase, useReducedMotion } from "@/lib/motion";
import { motion } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";

function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

const FADE =
  "linear-gradient(to bottom, transparent 0%, black 25%, black 80%, transparent 100%)";

export function HeroWaves(): ReactNode {
  const mounted = useIsMounted();
  const prefersReducedMotion = useReducedMotion();

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.01 }
          : { duration: 1.6, ease: softEase, delay: 0.1 }
      }
      style={{ maskImage: FADE, WebkitMaskImage: FADE }}
    >
      <AsciiWaves
        color="#ffffff"
        intensity={0}
        elementSize={10}
        videoUrl="/sample-video-2.mp4"
        noiseScale={25}
        hasCursorInteraction={true}
        className="opacity-60"
      />
    </motion.div>
  );
}
