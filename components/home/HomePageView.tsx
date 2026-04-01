"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";
import { SERVICES, SITE } from "@/lib/site";
import {
  DragonScaleBackground,
  GoldDivider,
  LotusIcon,
  RedDot,
  SparkIcon,
  WaveLine,
} from "@/components/ChineseDecor";

const waUrl = `https://wa.me/${SITE.phoneTel.replace(/\D/g, "")}`;

function useAnimatedInt(target: number, enabled: boolean, duration = 2) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const c = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (n) => setV(Math.round(n)),
    });
    return () => c.stop();
  }, [enabled, target, duration]);
  return v;
}

function StatBlock({
  end,
  suffix,
  label,
  isText,
}: {
  end?: number;
  suffix?: string;
  label: string;
  isText?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const n = useAnimatedInt(end ?? 0, Boolean(inView && !isText && end != null));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center sm:items-start sm:text-left"
    >
      <SparkIcon className="h-6 w-6 shrink-0 opacity-90" />
      {isText ? (
        <p className="mt-3 max-w-[14rem] font-serif text-lg leading-snug text-rjt-dark dark:text-rjt-cream">
          {label}
        </p>
      ) : (
        <>
          <p className="mt-3 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
            {n}
            {suffix}
          </p>
          <p className="mt-1 max-w-[12rem] text-sm leading-snug text-stone-600 dark:text-stone-400">
            {label}
          </p>
        </>
      )}
    </motion.div>
  );
}

const acupunctuurIcon = (
  <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden>
    <circle
      cx="24"
      cy="24"
      r="20"
      stroke="currentColor"
      strokeWidth="1"
      className="text-rjt-gold/50"
    />
    <path
      d="M24 8v32M14 14l20 20M34 14L14 34"
      stroke="currentColor"
      strokeWidth="1.2"
      className="text-rjt-gold"
      strokeLinecap="round"
    />
  </svg>
);

const cuppingIcon = (
  <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden>
    <ellipse
      cx="24"
      cy="26"
      rx="14"
      ry="16"
      stroke="currentColor"
      strokeWidth="1.2"
      className="text-rjt-gold"
    />
    <path
      d="M24 10v6"
      stroke="currentColor"
      strokeWidth="1"
      className="text-rjt-gold/70"
      strokeLinecap="round"
    />
  </svg>
);

const tuinaIcon = (
  <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden>
    <path
      d="M14 30c6-8 14-8 20 0M18 22c4-5 10-5 14 0"
      stroke="currentColor"
      strokeWidth="1.2"
      className="text-rjt-gold"
      strokeLinecap="round"
    />
    <circle cx="24" cy="34" r="3" className="fill-rjt-gold/40" />
  </svg>
);

const massageIcon = (
  <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden>
    <path
      d="M12 28c8-6 16-6 24 0"
      stroke="currentColor"
      strokeWidth="1.2"
      className="text-rjt-gold"
      strokeLinecap="round"
    />
    <path
      d="M16 20h16M16 24h12"
      stroke="currentColor"
      strokeWidth="1"
      className="text-rjt-gold/60"
      strokeLinecap="round"
    />
  </svg>
);

const guashaIcon = (
  <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden>
    <path
      d="M14 18l16 16M18 14l16 16"
      stroke="currentColor"
      strokeWidth="1.2"
      className="text-rjt-gold"
      strokeLinecap="round"
    />
    <path
      d="M12 32h24"
      stroke="currentColor"
      strokeWidth="1"
      className="text-rjt-gold/60"
      strokeLinecap="round"
    />
  </svg>
);

function serviceIcon(id: string) {
  if (
    id.startsWith("acupunctuur-") ||
    id === "intake-plus-behandeling"
  ) {
    return acupunctuurIcon;
  }
  if (id.startsWith("tuina-")) return tuinaIcon;
  if (id === "cupping") return cuppingIcon;
  if (id === "guasha") return guashaIcon;
  if (id === "ontspanningsmassage") return massageIcon;
  return <LotusIcon className="h-10 w-10" />;
}

const googleReviews = [
  {
    naam: "Rocky",
    datum: "5 maanden geleden",
    sterren: 5,
    tekst:
      "Bizar goed. Eerste naar fysio geweest. Die wisten niet wat ze ermee aan moesten. Maar hier, wauw! Zowel massage als acupunctuur. Heb een hele zware rug, bil en benen blessure opgelopen icm verrekte nek en vastzittend verdriet van rouwen om Mam (dat laatste constateerden zij, dat er verdriet vast zat). Na meerdere sessies herstel ik niet alleen lichamelijk, ook emotioneel gebeurt er veel, ik laat veel los, voel blokkades verdwijnen en de balans in lichaam en geest terugkeren. Absolute aanrader!!!!!!! Weten echt waar ze mee bezig zijn!",
  },
  {
    naam: "Sjoerd",
    datum: "een jaar geleden",
    sterren: 5,
    tekst: "In tijden niet meer z'n goede massage gehad, zeer relaxt 🙌 nogmaals bedankt",
  },
  {
    naam: "Tevreden klant",
    datum: "een jaar geleden",
    sterren: 5,
    tekst: "Na afloop van de behandeling door de acupuncturist ben ik nog steeds verbaasd en dankbaar voor het resultaat.",
  },
  {
    naam: "Tevreden klant",
    datum: "een jaar geleden",
    sterren: 5,
    tekst: "Zeer bekwaam. Na m'n acupunctuur behandelingen totaal geen pijn meer!",
  },
  {
    naam: "Tevreden klant",
    datum: "5 maanden geleden",
    sterren: 5,
    tekst: "Voor jouw gezondheid is dit een plek waar je naar toe moet 👍👍👍👍👍",
  },
] as const;

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-rjt-gold">
          <path fill="currentColor" d="M10 1.5l2.2 5.6h6l-4.8 3.6 1.8 5.8L10 13.9 4.8 16.5l1.8-5.8L1.8 7.1h6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewTekst({ tekst }: { tekst: string }) {
  const [expanded, setExpanded] = useState(false);
  const long = tekst.length > 200;
  return (
    <div className="mt-3 text-sm leading-relaxed text-stone-800 dark:text-stone-200">
      <p>
        {long && !expanded ? (
          <>
            {tekst.slice(0, 200).trim()}…{" "}
            <button
              type="button"
              className="font-medium text-rjt-red hover:underline dark:text-[#c45a68]"
              onClick={() => setExpanded(true)}
              aria-expanded={false}
            >
              Lees meer
            </button>
          </>
        ) : (
          <>
            {tekst}
            {long ? (
              <>
                {" "}
                <button
                  type="button"
                  className="font-medium text-rjt-red hover:underline dark:text-[#c45a68]"
                  onClick={() => setExpanded(false)}
                  aria-expanded
                >
                  Lees minder
                </button>
              </>
            ) : null}
          </>
        )}
      </p>
    </div>
  );
}

function SectionLotusFade() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="flex justify-center py-10"
      aria-hidden
    >
      <LotusIcon className="h-24 w-24 text-rjt-gold drop-shadow-[0_0_24px_rgba(201,168,76,0.35)]" />
    </motion.div>
  );
}

const reviewListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const reviewCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0, 0, 0.2, 1] },
  },
} as const;

export function HomePageView() {
  return (
    <div className="bg-rjt-beige text-rjt-dark dark:bg-[#141210] dark:text-rjt-cream">
      {/* —— Hero —— */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Image
          src="/images/DSC_0350-scaled.jpg"
          alt="Ren Ji Tang team"
          fill
          priority
          className="object-cover object-top"
        />

        <div className="absolute inset-0 bg-black/55 z-[1]" />

        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/60">
            Ren Ji Tang
          </p>
          <h1 className="mb-2 font-serif text-5xl text-white md:text-7xl">
            Herstel je balans
          </h1>
          <p className="mb-2 text-sm tracking-widest text-white/60">
            恢复您的平衡
          </p>
          <p className="mb-2 text-lg text-white/80">
            Traditionele Chinese geneeskunde · &apos;s-Hertogenbosch
          </p>
          <p className="mb-10 text-sm text-white/50">
            &apos;s-Hertogenbosch 传统中医
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/bookings"
              className="rounded-full bg-rjt-red px-8 py-3 font-semibold text-white transition-colors hover:bg-red-900"
            >
              Maak een afspraak
            </a>
            <a
              href="/behandelingen"
              className="rounded-full border border-white/70 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Bekijk behandelingen
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs tracking-widest text-white/40">
          SCROLL ↓
        </div>
      </section>

      {/* —— Trust —— */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0 }}
        className="full-bleed border-y border-rjt-gold/15 bg-rjt-beige py-14 dark:border-rjt-gold/10 dark:bg-[#1c1814]"
        aria-label="Kerngegevens praktijk"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 sm:px-6 lg:grid-cols-4 lg:gap-8">
          <StatBlock end={15} suffix="+" label="jaar ervaring" />
          <StatBlock end={460} suffix="+" label="tevreden klanten" />
          <StatBlock end={8} label="behandelingen" />
          <StatBlock isText label="Vergoed door zorgverzekeraar" />
        </div>
      </motion.section>

      <SectionLotusFade />

      {/* —— Over ons —— */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28"
        aria-labelledby="over-ons-heading"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            className="max-w-[500px] overflow-hidden rounded-2xl ring-2 ring-transparent transition-shadow duration-300 hover:ring-rjt-gold"
          >
            <Image
              src="/images/PHOTO-2024-11-26-19-19-52-2.jpg"
              alt="Behandeling bij Ren Ji Tang"
              width={500}
              height={400}
              className="w-full object-cover"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            className="max-w-[500px] overflow-hidden rounded-2xl ring-2 ring-transparent transition-shadow duration-300 hover:ring-rjt-gold"
          >
            <Image
              src="/images/PHOTO-2024-11-26-19-19-05-6.jpg"
              alt="Sfeerimpressie praktijk Ren Ji Tang"
              width={500}
              height={400}
              className="w-full object-cover"
            />
          </motion.div>
          <div className="relative flex min-h-[220px] items-center justify-center rounded-sm border border-rjt-gold/25 bg-rjt-cream/80 p-10 dark:border-rjt-gold/20 dark:bg-[#1f1b17]">
          <DragonScaleBackground className="!opacity-30 rounded-sm" />
          <div className="relative text-center">
            <LotusIcon className="mx-auto h-16 w-16 opacity-80" />
            <p
              className="mt-6 font-serif text-5xl text-rjt-gold/90 dark:text-rjt-gold/80"
              style={{
                fontFamily: '"KaiTi", "STKaiti", "Songti SC", "Noto Serif SC", SimSun, serif',
              }}
            >
              仁術堂
            </p>
            <WaveLine className="mx-auto mt-6 w-48 opacity-70" />
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
              Menselijkheid · Vakmanschap
            </p>
          </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative pl-0 lg:pl-4"
        >
          <span className="absolute left-0 top-2 hidden h-16 w-1 bg-rjt-red/90 lg:block" aria-hidden />
          <RedDot className="mb-4 h-3 w-3 lg:ml-1" />
          <h2
            id="over-ons-heading"
            className="font-serif text-3xl text-rjt-dark dark:text-rjt-cream sm:text-4xl"
          >
            Vakmanschap uit traditie
          </h2>
          <GoldDivider className="my-6" align="start" />
          <div className="space-y-4 text-stone-700 dark:text-stone-300">
            <p>
              Bij Ren Ji Tang combineren we eeuwenoude inzichten uit Traditionele Chinese Geneeskunde
              met een moderne, professionele praktijk in het hart van &apos;s-Hertogenbosch.
            </p>
            <p>
              Geen losse klachten, maar het geheel: lichaam, geest en omgeving horen bij elkaar. Met
              acupunctuur, Tuina, cupping en massage ondersteunen we uw natuurlijke herstelvermogen —
              rustig, deskundig en met oog voor uw verhaal.
            </p>
            <p>
              Authentieke TCG-filosofie staat voor ons gelijk aan warmte, precisie en respect voor
              uw tempo.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* —— Behandelingen —— */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        id="behandelingen"
        className="full-bleed bg-rjt-cream py-20 dark:bg-[#181512]"
        aria-labelledby="behandelingen-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2
              id="behandelingen-heading"
              className="inline-block font-serif text-3xl text-rjt-dark dark:text-rjt-cream sm:text-4xl"
            >
              Onze behandelingen
            </h2>
            <div className="mx-auto mt-3 h-1 w-24 bg-rjt-gold/90" />
            <p className="mx-auto mt-4 max-w-2xl text-stone-600 dark:text-stone-400">
              Voor elk traject een passende aanpak binnen TCG — heldere tijden en tarieven.
            </p>
          </motion.div>

          <ul className="mt-14 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => {
              const featured = i === 0;
              return (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={cn(featured && "sm:col-span-2 lg:col-span-2")}
                >
                  {featured ? (
                    <motion.div
                      whileHover={{
                        y: -8,
                        boxShadow: "0 20px 40px rgba(139,38,53,0.25)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative h-full min-h-[260px] overflow-hidden rounded-sm bg-rjt-red p-8 text-white shadow-md ring-2 ring-transparent transition-[box-shadow] hover:ring-rjt-gold"
                    >
                      <span
                        className="pointer-events-none absolute -bottom-2 -right-1 select-none font-serif text-[clamp(4.5rem,14vw,8rem)] leading-none text-white/[0.14]"
                        aria-hidden
                      >
                        医
                      </span>
                      <div className="relative z-[1] text-rjt-gold">
                        {serviceIcon(s.id)}
                      </div>
                      <h3 className="relative z-[1] mt-4 font-serif text-xl text-white">
                        {s.naam}
                      </h3>
                      <p className="relative z-[1] mt-2 text-sm text-white/85">
                        {s.beschrijving}
                      </p>
                      <p className="relative z-[1] mt-4 text-sm font-medium text-rjt-gold">
                        €{s.prijs} · {s.duur} min
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{
                        y: -8,
                        boxShadow:
                          "0 20px 40px rgba(139,38,53,0.15), 0 0 0 2px rgba(201,168,76,0.9)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="h-full rounded-sm border-2 border-stone-200/90 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-[#1f1b17]"
                    >
                      <div className="text-rjt-gold">{serviceIcon(s.id)}</div>
                      <h3 className="mt-4 font-serif text-xl text-rjt-dark dark:text-rjt-cream">
                        {s.naam}
                      </h3>
                      <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                        {s.beschrijving}
                      </p>
                      <p className="mt-4 text-sm font-medium text-rjt-red dark:text-[#c45a68]">
                        €{s.prijs} · {s.duur} min
                      </p>
                    </motion.div>
                  )}
                </motion.li>
              );
            })}
            <motion.li
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: SERVICES.length * 0.1 }}
              className="sm:col-span-2 lg:col-span-4"
            >
              <div className="group flex h-full min-h-[200px] flex-col justify-center rounded-sm border border-dashed border-rjt-gold/40 bg-rjt-beige/50 p-6 text-center transition hover:border-rjt-gold hover:bg-rjt-beige dark:border-rjt-gold/30 dark:bg-[#252018] dark:hover:bg-[#2a241c]">
                <LotusIcon className="mx-auto h-12 w-12 opacity-70" />
                <p className="mt-4 font-serif text-lg text-rjt-dark dark:text-rjt-cream">
                  Advies op maat
                </p>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                  Eerste consult, vragen of combinatie van technieken — we denken met u mee.
                </p>
                <Link
                  href="/contact-formulier"
                  className="mt-5 inline-flex justify-center text-sm font-semibold text-rjt-red underline-offset-4 hover:underline dark:text-[#c45a68]"
                >
                  Neem contact op
                </Link>
              </div>
            </motion.li>
          </ul>

          <div className="mt-12 text-center">
            <Link
              href="/acupunctuur"
              className="inline-flex rounded-sm border border-rjt-dark bg-transparent px-8 py-3 text-sm font-semibold text-rjt-dark transition hover:bg-rjt-dark hover:text-rjt-cream dark:border-rjt-cream dark:text-rjt-cream dark:hover:bg-rjt-cream dark:hover:text-rjt-dark"
            >
              Bekijk alle behandelingen
            </Link>
          </div>
        </div>
      </motion.section>

      <SectionLotusFade />

      {/* —— Hoe het werkt —— */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24"
        aria-labelledby="stappen-heading"
      >
        <h2
          id="stappen-heading"
          className="text-center font-serif text-3xl text-rjt-dark dark:text-rjt-cream sm:text-4xl"
        >
          Hoe het werkt
        </h2>
        <GoldDivider className="my-8" />

        <div className="relative mt-4 grid gap-10 md:grid-cols-3 md:gap-6">
          <div
            className="pointer-events-none absolute left-0 right-0 top-[2.25rem] hidden h-px bg-gradient-to-r from-transparent via-rjt-gold/50 to-transparent md:block"
            aria-hidden
          />
          {[
            { step: "1", title: "Maak een afspraak", body: "Online of telefonisch — kies een moment dat u uitkomt." },
            { step: "2", title: "Intake gesprek", body: "We luisteren naar uw klachten en doelen binnen TCG." },
            { step: "3", title: "Behandeling & herstel", body: "Zorg op maat, met ruimte voor herstel tussen de sessies." },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-rjt-gold bg-rjt-beige text-lg font-serif text-rjt-dark dark:border-rjt-gold dark:bg-[#1f1b17] dark:text-rjt-cream">
                {item.step}
              </div>
              {i < 2 && (
                <div
                  className="my-4 h-8 w-px bg-rjt-gold/50 md:hidden"
                  aria-hidden
                />
              )}
              <h3 className="mt-6 font-serif text-xl text-rjt-dark dark:text-rjt-cream">{item.title}</h3>
              <p className="mt-2 max-w-xs text-sm text-stone-600 dark:text-stone-400">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <SectionLotusFade />

      {/* —— Reviews —— */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="full-bleed border-y border-stone-200/80 bg-rjt-beige py-20 dark:border-stone-800 dark:bg-[#1c1814]"
        aria-labelledby="reviews-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2
            id="reviews-heading"
            className="text-center font-serif text-3xl text-rjt-dark dark:text-rjt-cream sm:text-4xl"
          >
            Wat onze klanten zeggen
          </h2>
          <GoldDivider className="my-8" />
          <div className="mb-4 text-center">
            <div className="mb-2 flex justify-center gap-1 text-lg" aria-hidden>
              ⭐⭐⭐⭐⭐
            </div>
            <p className="text-2xl font-bold text-rjt-dark dark:text-rjt-cream">5.0</p>
            <p className="text-sm text-stone-500 dark:text-stone-400">7 Google reviews</p>
          </div>
          <motion.ul
            className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={reviewListVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {googleReviews.map((r, i) => (
              <motion.li key={`${r.naam}-${i}`} variants={reviewCardVariants}>
                <blockquote className="flex h-full flex-col rounded-sm border border-stone-200/90 bg-rjt-cream p-6 shadow-md dark:border-stone-700 dark:bg-[#232018]">
                  <Stars count={r.sterren} />
                  <footer className="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-200/80 pb-3 dark:border-stone-600/80">
                    <cite className="not-italic">
                      <span className="font-semibold text-rjt-dark dark:text-rjt-cream">{r.naam}</span>
                    </cite>
                    <span className="text-xs text-stone-500 dark:text-stone-400">{r.datum}</span>
                  </footer>
                  <ReviewTekst tekst={r.tekst} />
                </blockquote>
              </motion.li>
            ))}
          </motion.ul>
          <p className="mt-10 text-center">
            <a
              href="https://www.google.com/maps/place/Renjitang+Massage+%26+Acupunctuur+praktijk/@51.7210204,5.3090705"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-rjt-red underline underline-offset-2 hover:text-red-900 dark:text-[#c45a68] dark:hover:text-[#e07d88]"
            >
              Bekijk alle reviews op Google (5.0 ⭐ · 7 reviews)
            </a>
          </p>
        </div>
      </motion.section>

      {/* —— Openingstijden + contact —— */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="full-bleed bg-rjt-dark py-20 text-rjt-cream dark:bg-[#0f0e0c]"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 id="contact-heading" className="font-serif text-2xl text-rjt-gold sm:text-3xl">
              Openingstijden
            </h2>
            <div className="mt-2 h-px max-w-xs bg-rjt-gold/40" />
            <table className="mt-8 w-full max-w-md text-left text-sm">
              <tbody className="divide-y divide-white/10">
                <tr>
                  <th className="py-3 pr-4 font-normal text-rjt-cream/70">Maandag</th>
                  <td className="py-3 text-rjt-cream/90">Gesloten</td>
                </tr>
                <tr>
                  <th className="py-3 pr-4 font-normal text-rjt-cream/70">Di t/m zo</th>
                  <td className="py-3 text-rjt-cream/90">
                    {SITE.openingHoursSpecification[0]?.opens} – {SITE.openingHoursSpecification[0]?.closes}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 text-xs text-rjt-cream/50">
              Afwijkingen mogelijk; bij twijfel even bellen of appen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-serif text-2xl text-rjt-gold">Contact</h3>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={`tel:${SITE.phoneTel}`} className="text-rjt-cream hover:text-rjt-gold">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="text-rjt-cream hover:text-rjt-gold">
                  {SITE.email}
                </a>
              </li>
              <li className="text-rjt-cream/80">{SITE.city}</li>
            </ul>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp ons
            </a>
            <div className="relative mt-8 inline-flex w-fit">
              <motion.div
                aria-hidden
                className="absolute inset-0 -m-3 rounded-full bg-rjt-red blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Link
                href={SITE.bookingUrl}
                className="relative z-10 inline-flex w-fit items-center justify-center rounded-sm bg-rjt-red px-10 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[#a02f40]"
              >
                Boek nu
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
