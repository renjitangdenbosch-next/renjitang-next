"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const fadeInUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

export function OverOns() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-cream py-24" aria-labelledby="over-ons-home-heading">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <motion.div
          variants={reduceMotion ? undefined : fadeInUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, margin: "-80px" }}
          className="order-2 lg:order-1"
        >
          <div
            className="relative mx-auto aspect-[3/4] max-h-[500px] w-full max-w-md overflow-hidden rounded-sm border border-gold/30 lg:mx-0 lg:aspect-auto lg:h-[500px] lg:max-w-none"
          >
            <Image
              src="/images/DSC_0377-scaled.jpg"
              alt="Behandelkamer Ren Ji Tang"
              fill
              sizes="(max-width:1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          variants={reduceMotion ? undefined : fadeInUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, margin: "-80px" }}
          className="order-1 lg:order-2 lg:pl-16"
        >
          <span className="mb-3 block font-lato text-xs font-medium uppercase tracking-[0.2em] text-gold">
            Over Ren Ji Tang
          </span>
          <h2
            id="over-ons-home-heading"
            className="font-cormorant text-3xl font-normal text-ink sm:text-4xl"
          >
            Meer dan 20 jaar ervaring in TCM
          </h2>
          <div className="mt-6 space-y-4 font-lato text-base leading-relaxed text-ink/85">
            <p>
              Bij Ren Ji Tang behandelen wij de mens als geheel. Niet alleen het klachtenpatroon,
              maar ook de onderliggende oorzaak. Met meer dan 20 jaar ervaring in traditionele
              Chinese geneeskunde helpen wij u herstellen — lichamelijk én emotioneel.
            </p>
          </div>
          <blockquote className="mt-8 border-l-2 border-vermilion/40 pl-6 font-cormorant text-xl italic leading-relaxed text-vermilion md:text-[1.6rem]">
            Wij behandelen de mens als geheel — niet alleen het symptoom.
          </blockquote>
          <div className="mt-8">
            <Button variant="primary" href="/over-ons">
              Lees ons verhaal
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
