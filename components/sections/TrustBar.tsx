"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, Leaf, Shield, Star } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

const items = [
  { icon: Shield, text: "Erkende TCM-praktijk" },
  { icon: Clock, text: "Di–Vr 9–20u · Za–Zo 9–17u" },
  { icon: Star, text: "5,0 op Google" },
  { icon: Leaf, text: "Kruidenformules op maat" },
] as const;

export function TrustBar() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="full-bleed border-t border-gold/30 bg-ink py-10"
      aria-label="Vertrouwen en praktijkgegevens"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {items.map(({ icon: Icon, text }) => (
          <motion.div
            key={text}
            variants={reduceMotion ? undefined : fadeInUp}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left"
          >
            <Icon className="h-7 w-7 shrink-0 text-gold" strokeWidth={1.25} aria-hidden />
            <p className="font-lato text-sm font-light leading-snug text-white">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
