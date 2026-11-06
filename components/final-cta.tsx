"use client";

import { CutButton } from "@/components/cut-button";
import { softEase, useReducedMotion } from "@/lib/motion";
import { motion, type Variants } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

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
    <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
      <div className="relative isolate flex min-h-[560px] items-end overflow-hidden sm:min-h-[640px] lg:min-h-[720px]">
        <Image
          src="/cta.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1440px) 1360px, 100vw"
          className="-z-20 object-cover object-[60%_center] lg:object-center"
        />

        {/* Scrim: heaviest at the bottom-left where the copy sits, so the
            track and the runner stay readable everywhere else. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--page) 88%, transparent) 0%, color-mix(in srgb, var(--page) 55%, transparent) 38%, transparent 72%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to right, color-mix(in srgb, var(--page) 70%, transparent) 0%, transparent 60%)",
          }}
        />

        {/* Mobile: the copy fills most of the card and reaches up into the
            bright sky, so darken the whole lower two-thirds. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 sm:hidden"
          style={{
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--page) 80%, transparent) 0%, color-mix(in srgb, var(--page) 65%, transparent) 55%, color-mix(in srgb, var(--page) 15%, transparent) 85%, transparent 100%)",
          }}
        />

        <motion.div
          variants={prefersReducedMotion ? staticContainer : container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative flex max-w-xl flex-col items-start p-7 text-left sm:p-10 lg:p-14"
        >
          <motion.h2
            variants={item}
            transition={itemTransition}
            className="font-serif text-4xl leading-[1.08] font-[450] tracking-[-0.01em] text-balance text-white sm:text-5xl lg:text-[3.75rem]"
          >
            Van herstel naar prestatie in één dossier
          </motion.h2>

          <motion.p
            variants={item}
            transition={itemTransition}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-white/75 sm:text-base"
          >
            In een half uur laten we je zien hoe je een traject opbouwt en welke
            gegevens je na elke sessie terugkrijgt.
          </motion.p>

          <motion.div
            variants={item}
            transition={itemTransition}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <CutButton
              variant="solid"
              href="#demo"
              className="w-full sm:w-auto sm:min-w-44"
            >
              Demo aanvragen
            </CutButton>
            <CutButton
              variant="outline"
              href="#hoe-het-werkt"
              className="w-full sm:w-auto sm:min-w-44"
            >
              Bekijk de app
            </CutButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
