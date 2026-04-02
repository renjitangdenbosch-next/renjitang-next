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
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative mb-16 text-center">
          <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center">
            <span className="font-cormorant text-[200px] leading-none text-[#1A1208]/5">仁</span>
          </div>
          <span className="mb-4 block font-lato text-[11px] uppercase tracking-[0.25em] text-[#B8860B]">
            Ren Ji Tang
          </span>
          <div className="mx-auto mb-4 h-[1px] w-12 bg-[#B8860B]" aria-hidden />
          <h2
            id="over-ons-home-heading"
            className="mb-4 font-cormorant text-5xl font-normal text-[#1A1208]"
          >
            Meer dan 20 jaar ervaring in TCM
          </h2>
          <p className="mx-auto max-w-md font-lato text-base text-[#9E8E75]">
            Persoonlijke zorg met aandacht voor lichaam en geest
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
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
          <div className="space-y-4 font-lato text-base leading-relaxed text-ink/85">
            <p>
              Bij Ren Ji Tang behandelen wij de mens als geheel. Niet alleen het klachtenpatroon,
              maar ook de onderliggende oorzaak. Met meer dan 20 jaar ervaring in traditionele
              Chinese geneeskunde helpen wij u herstellen — lichamelijk én emotioneel.
            </p>
          </div>
          <div className="relative mt-8">
            <div
              className="pointer-events-none absolute right-0 top-0 font-cormorant text-[180px] leading-none text-[#1A1208]/5 select-none"
              aria-hidden
            >
              仁
            </div>
            <blockquote className="relative z-10 border-l-2 border-[#C0392B] pl-6 font-cormorant text-xl italic leading-relaxed text-vermilion md:text-[1.6rem]">
              Wij behandelen de mens als geheel — niet alleen het symptoom.
            </blockquote>
          </div>
          <div className="mt-8">
            <Button variant="primary" href="/over-ons">
              Lees ons verhaal
            </Button>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
