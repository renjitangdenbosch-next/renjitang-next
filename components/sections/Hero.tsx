"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";
import { PARALLAX_SPEED_DEFAULT, useParallax } from "@/hooks/useParallax";

const heroContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const parallaxRef = useParallax(PARALLAX_SPEED_DEFAULT, reduceMotion !== true);

  return (
    <div
      ref={parallaxRef}
      role="banner"
      className="relative min-h-[max(640px,100svh)] w-full overflow-hidden bg-[#1a0f08]"
    >
      <div className="parallax-img pointer-events-none absolute inset-x-0 top-[-20%] z-0 h-[140%] w-full will-change-transform" aria-hidden>
        <Image
          src="/images/hero_cupping_ai.png"
          alt="Acupunctuur en warme sfeer — Ren Ji Tang"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        className="absolute inset-0 z-10"
        style={{ background: "rgba(0,0,0,0.35)" }}
        aria-hidden
      />

      <div className="absolute inset-0 z-20 flex min-h-[max(640px,100svh)] items-center">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-28 md:px-10 md:pt-32 lg:px-12">
        <motion.div
          variants={reduceMotion ? undefined : heroContainer}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "show"}
          className="max-w-3xl"
        >
          <motion.span
            variants={reduceMotion ? undefined : heroItem}
            className="mb-4 block font-lato text-xs font-medium uppercase tracking-[0.28em] text-gold"
          >
            Traditionele Chinese geneeskunde
          </motion.span>
          <motion.h1
            variants={reduceMotion ? undefined : heroItem}
            className="font-cormorant text-5xl font-normal leading-[1.05] text-white md:text-7xl lg:text-8xl"
          >
            Herstel
            <br />
            je balans
          </motion.h1>
          <motion.p
            variants={reduceMotion ? undefined : heroItem}
            className="mt-6 max-w-xl font-lato text-lg text-white/80 md:text-xl"
          >
            Acupunctuur, massage en kruidengeneeskunde in &apos;s-Hertogenbosch
          </motion.p>
          <motion.div
            variants={reduceMotion ? undefined : heroItem}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button variant="primary" href={SITE.bookingUrl}>
              Maak een afspraak →
            </Button>
            <Link href="/behandelingen" className="btn-outline sm:min-w-[12rem]">
              Bekijk behandelingen
            </Link>
          </motion.div>
        </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-white/40"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-1">
          <span className="font-lato text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
