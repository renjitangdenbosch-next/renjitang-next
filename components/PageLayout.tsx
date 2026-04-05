"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { AnimatedLine } from "@/components/AnimatedLine";
import { ParallaxHeroBackground } from "@/components/ParallaxHeroBackground";
import { SITE } from "@/lib/site";

export function PageLayout({
  title,
  titleZh,
  subtitle,
  heroImage = "/images/DSC_0350-scaled.jpg",
  children,
}: {
  title: string;
  /** Chinese ondertitel direct onder de h1 (hero) */
  titleZh?: string;
  subtitle?: string;
  heroImage?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-rjt-beige dark:bg-[#141210]">
      <ParallaxHeroBackground
        className="relative flex h-[40vh] min-h-[280px] items-end overflow-hidden"
        src={heroImage}
        alt={title}
        priority
        sizes="100vw"
        imageClassName="object-cover object-center"
      >
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.1) 100%)",
          }}
          aria-hidden
        />
        <div className="relative z-20 mx-auto w-full max-w-5xl px-6 pb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 text-xs uppercase tracking-[0.4em] text-rjt-gold"
          >
            Ren Ji Tang · &apos;s-Hertogenbosch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl leading-tight text-white md:text-6xl"
          >
            {title}
          </motion.h1>
          {titleZh ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-stone-400 text-sm mb-8"
            >
              {titleZh}
            </motion.p>
          ) : null}
          {subtitle ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-lg text-white/70"
            >
              {subtitle}
            </motion.p>
          ) : null}
        </div>
      </ParallaxHeroBackground>

      <div className="flex items-center justify-center gap-4 bg-white py-6 dark:bg-[#1a1714]">
        <AnimatedLine
          width={160}
          color="#4A9E4A"
          strokeOpacity={0.4}
          noMargin
        />
        <div className="h-2 w-2 shrink-0 rotate-45 bg-rjt-gold" aria-hidden />
        <AnimatedLine
          width={160}
          color="#4A9E4A"
          strokeOpacity={0.4}
          noMargin
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto max-w-5xl px-6 py-12 pb-20"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function ContentCard({
  title,
  children,
  icon,
}: {
  title?: string;
  children: ReactNode;
  icon?: string;
}) {
  return (
    <div className="mb-6 rounded-2xl border border-stone-100 bg-white p-8 shadow-sm dark:border-stone-700 dark:bg-stone-900/90">
      {title ? (
        <h2 className="mb-4 flex items-center gap-3 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
          {icon ? <span className="text-rjt-gold">{icon}</span> : null}
          {title}
        </h2>
      ) : null}
      <div className="space-y-3 leading-relaxed text-stone-600 dark:text-stone-300">
        {children}
      </div>
    </div>
  );
}

export function CTACard() {
  return (
    <div className="mt-8 rounded-2xl bg-rjt-red p-8 text-center text-white">
      <h3 className="mb-3 font-serif text-2xl">Klaar om een afspraak te maken?</h3>
      <p className="mb-6 text-white/80">Neem contact op of boek direct online</p>
      <a
        href={SITE.bookingWizardUrl}
        className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-rjt-red transition-colors hover:bg-rjt-beige"
      >
        Maak een afspraak
      </a>
    </div>
  );
}
