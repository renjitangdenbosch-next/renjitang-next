"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { BehandelingDetail } from "@/lib/behandelingen-data";
import { CTABanner } from "@/components/sections/CTABanner";

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
      <section className="relative h-[60vh] min-h-[320px] w-full overflow-hidden">
        <Image
          src={data.heroImage}
          alt={`${data.naam} — Ren Ji Tang`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15"
          aria-hidden
        />
        <div className="relative z-10 flex h-full max-w-6xl items-end px-6 pb-12 pt-28 md:px-10">
          <h1 className="font-cormorant text-4xl font-normal text-white md:text-6xl">
            {data.naam}
          </h1>
        </div>
      </section>

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
        <p className="mt-4 font-lato text-sm text-[#9E8E75]">{data.seoTekst}</p>
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
