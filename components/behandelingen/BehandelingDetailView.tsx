"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { AnimatedLine } from "@/components/AnimatedLine";
import { ParallaxHeroBackground } from "@/components/ParallaxHeroBackground";
import type { BehandelingDetail } from "@/lib/behandelingen-data";
import { SITE } from "@/lib/site";
import { CTABanner } from "@/components/sections/CTABanner";

const DEFAULT_HERO_OVERLAY =
  "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.4) 100%)";

const fadeInUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

export function BehandelingDetailView({ data }: { data: BehandelingDetail }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="bg-paper text-ink">
      <ParallaxHeroBackground
        className="relative h-[60vh] min-h-[420px] overflow-hidden -mt-[80px] pt-[80px]"
        src={data.heroImage}
        alt={data.naam}
        priority
        imageClassName="object-cover object-center"
      >
        <div
          className="absolute inset-0 z-10"
          style={{ background: data.heroOverlay ?? DEFAULT_HERO_OVERLAY }}
          aria-hidden
        />
        <div className="pointer-events-none absolute right-6 top-1/2 z-10 -translate-y-1/2 select-none font-cormorant text-[120px] leading-none text-white/15 md:text-[180px]">
          {data.karakterCN}
        </div>
        <div className="absolute bottom-10 left-6 z-20 lg:left-16">
          <span className="mb-3 block font-lato text-[11px] uppercase tracking-[0.25em] text-[#4A9E4A]">
            Traditionele Chinese Geneeskunde
          </span>
          <h1 className="font-cormorant text-5xl font-normal text-white lg:text-7xl">{data.naam}</h1>
          <AnimatedLine
            width={160}
            color="#4A9E4A"
            strokeOpacity={0.4}
            className="mt-3 mb-6"
            noMargin
          />
          <Link
            href={SITE.bookingUrl}
            className="inline-flex items-center gap-2 rounded-sm bg-[#C0392B] px-6 py-3 font-lato text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#A93226]"
          >
            Maak afspraak →
          </Link>
        </div>
      </ParallaxHeroBackground>

      <motion.section
        variants={reduceMotion ? undefined : fadeInUp}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "show"}
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto max-w-3xl px-6 py-16"
      >
        {data.intro.map((p, i) => (
          <p key={i} className="mb-4 font-lato text-base leading-relaxed text-ink/90">
            {p}
          </p>
        ))}
        <p className="mt-4 font-lato text-sm text-[#6B8C6B]">{data.seoTekst}</p>
      </motion.section>

      <motion.section
        variants={reduceMotion ? undefined : fadeInUp}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "show"}
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <Image
            src={data.splitImage}
            alt={`Sfeerbeeld bij ${data.naam}`}
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-cormorant text-2xl text-ink md:text-3xl">{data.splitTitle}</h2>
          <p className="mt-4 font-lato leading-relaxed text-ink/85">{data.splitBody}</p>
        </div>
      </motion.section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <h2 className="font-cormorant text-2xl text-ink">Voor welke klachten</h2>
        <ul className="mt-6 space-y-3">
          {data.klachten.map((k) => (
            <li key={k} className="flex gap-3 font-lato text-ink/90">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-jade" strokeWidth={2} aria-hidden />
              {k}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <h2 className="font-cormorant text-2xl text-ink">Wat kunt u verwachten</h2>
        <ol className="mt-8 space-y-6">
          {data.stappen.map((stap, i) => (
            <li key={stap} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 font-cormorant text-lg text-gold">
                {i + 1}
              </span>
              <p className="pt-1 font-lato leading-relaxed text-ink/90">{stap}</p>
            </li>
          ))}
        </ol>
      </section>

      <CTABanner />

      <div className="mx-auto max-w-6xl px-6 pb-16 text-center">
        <Link href="/behandelingen" className="font-lato text-sm font-medium text-jade hover:underline">
          ← Alle behandelingen
        </Link>
      </div>
    </div>
  );
}
