"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BEHANDELING_HOME_CARDS } from "@/lib/behandelingen-data";
import { SectionHeader } from "@/components/ui/SectionHeader";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.1,
      ease: "easeOut" as const,
    },
  }),
};

export function BehandelingenGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-paper py-24" aria-labelledby="behandelingen-grid-heading">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Onze behandelingen"
          title="Wat wij voor u doen"
          titleId="behandelingen-grid-heading"
          align="center"
          className="mb-14"
          titleClassName="leading-tight"
        />

        <ul className="grid list-none grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BEHANDELING_HOME_CARDS.map((b, i) => (
            <motion.li
              key={b.slug}
              custom={i}
              variants={reduceMotion ? undefined : cardVariants}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "show"}
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.2 } }}
                className="group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-md transition-shadow duration-200 hover:shadow-xl"
              >
                <Link href={`/behandelingen/${b.slug}`} className="flex h-full flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-sm">
                    <Image
                      src={b.image}
                      alt={`${b.naam} bij Ren Ji Tang`}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-cormorant text-[1.4rem] text-ink">{b.naam}</h3>
                    <p className="mt-2 line-clamp-2 font-lato text-[0.9rem] leading-relaxed text-muted">
                      {b.beschrijving}
                    </p>
                    <span className="mt-auto pt-4 font-lato text-sm font-medium text-jade">
                      Meer informatie →
                    </span>
                  </div>
                </Link>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
