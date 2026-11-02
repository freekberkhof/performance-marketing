"use client";

import { CutButton } from "@/components/cut-button";
import {
  fadeInUp,
  reducedMotionVariants,
  softEase,
  useReducedMotion,
} from "@/lib/motion";
import { motion, type Variants } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
};

export function Hero(): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedMotionVariants : fadeInUp;
  const itemTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.7, ease: softEase };

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      {/* Full-bleed photo */}
      <Image
        src="/hero.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[62%_center] sm:object-[58%_center] lg:object-[55%_center]"
      />

      {/* Legibility scrims: dark from the left, plus top and bottom fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to right, color-mix(in srgb, var(--background) 92%, transparent) 0%, color-mix(in srgb, var(--background) 72%, transparent) 38%, color-mix(in srgb, var(--background) 20%, transparent) 70%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in srgb, var(--background) 70%, transparent) 0%, transparent 28%, transparent 62%, var(--background) 100%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1440px] px-5 pt-28 pb-24 sm:px-8 sm:pt-32 lg:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex max-w-2xl flex-col items-start text-left"
        >
          <motion.h1
            variants={item}
            transition={itemTransition}
            className="font-serif text-4xl leading-[1.1] font-normal tracking-[-0.01em] text-balance sm:text-5xl lg:text-[3.5rem]"
          >
            Van revalidatie naar prestatie, in één traject
          </motion.h1>

          <motion.p
            variants={item}
            transition={itemTransition}
            className="text-muted-foreground mt-5 max-w-xl text-[15px] leading-relaxed sm:text-base"
          >
            Performance Plus geeft fysiotherapiepraktijken één plek om
            oefenprogramma&apos;s in fases op te bouwen, en hun cliënten één app
            om erin te trainen. Jij ziet belasting, pijn en motivatie terug —
            sessie voor sessie.
          </motion.p>

          <motion.div
            variants={item}
            transition={itemTransition}
            className="mt-8 flex flex-wrap items-center gap-3"
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
