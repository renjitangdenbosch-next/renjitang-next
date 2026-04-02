"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BEHANDELING_DETAILS, BEHANDELING_HOME_CARDS } from "@/lib/behandelingen-data";

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
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-paper py-16" aria-labelledby="behandelingen-grid-heading">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative mb-16 text-center">
          <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center">
            <span className="font-cormorant text-[200px] leading-none text-[#1A1208]/5">療</span>
          </div>
          <span className="mb-4 block font-lato text-[11px] uppercase tracking-[0.25em] text-[#B8860B]">
            Ren Ji Tang
          </span>
          <div className="mx-auto mb-4 h-[1px] w-12 bg-[#B8860B]" aria-hidden />
          <h2
            id="behandelingen-grid-heading"
            className="mb-4 font-cormorant text-5xl font-normal text-[#1A1208]"
          >
            Onze behandelingen
          </h2>
          <p className="mx-auto max-w-md font-lato text-base text-[#9E8E75]">
            Traditionele Chinese geneeskunde voor lichaam en geest
          </p>
        </div>

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
                className="group relative cursor-pointer overflow-hidden rounded-sm"
                whileHover={reduceMotion ? undefined : { y: -6 }}
                onClick={() => router.push(`/behandelingen/${b.slug}`)}
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={b.image}
                    alt={b.naam}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="pointer-events-none absolute right-4 top-4 select-none font-cormorant text-[80px] leading-none text-white/10">
                    {BEHANDELING_DETAILS[b.slug].karakterCN}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="mb-3 h-[1px] w-8 bg-[#B8860B]" />
                    <span className="mb-1 block font-lato text-[10px] uppercase tracking-[0.2em] text-[#B8860B]">
                      Traditionele Chinese Geneeskunde
                    </span>
                    <h3 className="mb-2 font-cormorant text-2xl font-normal text-white">{b.naam}</h3>
                    <p className="mb-3 line-clamp-2 font-lato text-sm text-white/75">{b.beschrijving}</p>
                    <span className="font-lato text-xs uppercase tracking-wide text-[#B8860B]">
                      Meer informatie →
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
