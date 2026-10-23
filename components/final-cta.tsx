"use client";

import { CutButton } from "@/components/cut-button";
import { AsciiField } from "@/components/ascii-field";
import { softEase, useReducedMotion } from "@/lib/motion";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const CTA_MASK =
  "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staticContainer: Variants = { hidden: {}, visible: {} };

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function FinalCta(): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  const itemTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.7, ease: softEase };

  return (
    <section className="relative overflow-hidden">
      <AsciiField mask={CTA_MASK} opacity={0.55} className="-z-10" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-[1] h-[130%] w-[70%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--background) 0%, color-mix(in srgb, var(--background) 70%, transparent) 50%, transparent 78%)",
        }}
      />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <motion.div
          variants={prefersReducedMotion ? staticContainer : container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto flex max-w-2xl flex-col items-center py-28 text-center sm:py-36 lg:py-44"
        >
          <motion.h2
            variants={item}
            transition={itemTransition}
            className="font-serif text-4xl leading-[1.08] font-normal tracking-[-0.01em] text-balance sm:text-5xl lg:text-[3.75rem]"
          >
            Van herstel naar prestatie, zonder losse eindjes
          </motion.h2>

          <motion.p
            variants={item}
            transition={itemTransition}
            className="text-muted-foreground mt-5 max-w-md text-[15px] leading-relaxed text-balance sm:text-base"
          >
            Zie in een half uur hoe een traject in Performance Plus wordt
            opgebouwd — en wat je ervan terugkrijgt na elke sessie.
          </motion.p>

          <motion.div
            variants={item}
            transition={itemTransition}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <CutButton variant="solid" href="#demo">
              Demo aanvragen
            </CutButton>
            <CutButton variant="outline" href="#hoe-het-werkt">
              Bekijk de app
            </CutButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
