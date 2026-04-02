"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

export function CTABanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-vermilion py-20" aria-label="Afspraak maken">
      <motion.div
        variants={reduceMotion ? undefined : fadeInUp}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "show"}
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto max-w-[600px] px-6 text-center"
      >
        <h2 className="font-cormorant text-4xl font-normal leading-tight text-white md:text-[3.5rem]">
          Klaar om uw balans te herstellen?
        </h2>
        <p className="mt-4 font-lato text-base leading-relaxed text-white/80">
          Plan uw eerste kennismakingsgesprek — vrijblijvend en persoonlijk.
        </p>
        <div className="mt-10">
          <Button variant="white" href={SITE.bookingUrl}>
            Maak een afspraak
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
