"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedLine } from "@/components/AnimatedLine";
import { StarRating } from "@/components/ui/StarRating";

const reviews = [
  {
    tekst:
      "Bizar goed. Eerste naar fysio geweest — die wisten niet wat ze ermee aan moesten. Maar hier, wauw! Zowel massage als acupunctuur. Heb een hele zware rug-, bil- en benenblessure opgelopen. Na meerdere sessies herstel ik niet alleen lichamelijk — ook emotioneel gebeurt er veel. Ik laat veel los, voel blokkades verdwijnen en de balans in lichaam en geest terugkeren.",
    auteur: "Google-recensent",
  },
  {
    tekst:
      "Absolute aanrader! Weten echt waar ze mee bezig zijn. In tijden niet meer zo'n goede massage gehad — zeer relaxt. Nogmaals bedankt.",
    auteur: "Google-recensent",
  },
  {
    tekst:
      "Na afloop van de behandeling door de acupuncturist ben ik nog steeds verbaasd en dankbaar voor het resultaat. Voor jouw gezondheid is dit een plek waar je naartoe moet.",
    auteur: "Google-recensent",
  },
  {
    tekst: "Zeer bekwaam. Na mijn acupunctuurbehandelingen totaal geen pijn meer!",
    auteur: "Google-recensent",
  },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export function Testimonials() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#F4FAF0] py-24" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="relative mb-16 text-center">
          <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center">
            <span className="font-cormorant text-[200px] leading-none text-[#1A2E1A]/[0.06]">信</span>
          </div>
          <span className="mb-4 block font-lato text-[11px] uppercase tracking-[0.25em] text-[#4A9E4A]">
            Ren Ji Tang
          </span>
          <AnimatedLine width={160} color="#4A9E4A" className="mx-auto mb-4" noMargin />
          <h2
            id="testimonials-heading"
            className="mb-4 font-cormorant text-5xl font-normal text-[#1A2E1A]"
          >
            Ervaringen die spreken
          </h2>
          <p className="mx-auto max-w-md font-lato text-base text-[#1A2E1A]/70">
            5,0 · Beoordeeld op Google
          </p>
        </div>

        <ul className="grid list-none grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-6">
          {reviews.map((r, index) => (
            <motion.li
              key={index}
              custom={index}
              variants={reduceMotion ? undefined : cardVariants}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "show"}
              viewport={{ once: true, margin: "-40px" }}
            >
              <article className="h-full rounded-md border border-gold/25 bg-white p-10">
                <span
                  className="block font-cormorant text-[5rem] leading-none text-[#4A9E4A]/50"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <StarRating size={18} className="mt-2 text-[#4A9E4A]" />
                <blockquote className="mt-5 font-cormorant text-[1.15rem] italic leading-[1.85] text-[#1A2E1A]/80">
                  {r.tekst}
                </blockquote>
                <div className="my-6 h-px w-full bg-gold/25" aria-hidden />
                <p className="font-lato text-[0.75rem] uppercase tracking-[0.12em] text-muted">
                  {r.auteur}
                </p>
              </article>
            </motion.li>
          ))}
        </ul>

        <p className="mt-12 text-center">
          <a
            href="https://www.google.com/maps/place/Renjitang+Massage+%26+Acupunctuur+praktijk/@51.7210204,5.3090705"
            target="_blank"
            rel="noopener noreferrer"
            className="font-lato text-sm text-[#4A9E4A] underline-offset-4 hover:underline"
          >
            Bekijk ons Google-profiel
          </a>
        </p>
      </div>
    </section>
  );
}
