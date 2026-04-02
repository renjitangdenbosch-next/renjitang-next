import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsResetButton } from "@/components/CookieSettingsResetButton";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description: `Cookiebeleid van ${SITE.name}: functionele cookies, analytische cookies en Google Maps.`,
  alternates: { canonical: "/cookiebeleid" },
};

export default function CookiebeleidPage() {
  return (
    <div className="-mt-[7rem] text-ink">
      <section className="relative overflow-hidden bg-[#1a0f08] pb-16 pt-28 md:pb-20 md:pt-32">
        <div
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-cormorant text-[min(28vw,9rem)] leading-none text-[#B8860B]/15 md:right-10 md:text-[140px]"
          aria-hidden
        >
          隐
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <span className="mb-3 block font-lato text-xs uppercase tracking-[0.2em] text-[#B8860B]">
            Juridisch
          </span>
          <h1 className="font-cormorant text-4xl font-normal text-[#B8860B] md:text-5xl">Cookiebeleid</h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="mb-8 text-sm text-stone-400 dark:text-stone-500">Laatste update: april 2026</p>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Wat zijn cookies?</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer u onze website
              bezoekt.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
              Welke cookies gebruiken wij?
            </h2>
            <ul className="space-y-6 text-stone-600 dark:text-stone-300">
              <li>
                <p className="font-medium text-rjt-dark dark:text-rjt-cream">Functionele cookies (altijd actief)</p>
                <p className="mt-2 leading-relaxed">
                  Noodzakelijk voor het correct functioneren van de website. Bewaartermijn: sessie tot max. 1 jaar.
                </p>
              </li>
              <li>
                <p className="font-medium text-rjt-dark dark:text-rjt-cream">
                  Analytische cookies (alleen met toestemming)
                </p>
                <p className="mt-2 leading-relaxed">
                  Wij gebruiken Google Analytics om bij te houden hoe bezoekers de website gebruiken. De gegevens
                  zijn geanonimiseerd en worden niet gedeeld met derden. Bewaartermijn: max. 2 jaar.
                </p>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Cookies van derden</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Onze website bevat een Google Maps integratie op de{" "}
              <Link href="/contact" className="text-rjt-red underline hover:no-underline">
                contactpagina
              </Link>
              . Google kan hierbij cookies plaatsen. Zie het privacybeleid van Google voor meer informatie:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rjt-red underline hover:no-underline"
              >
                policies.google.com/privacy
              </a>
              .
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Cookies beheren</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              U kunt cookies weigeren of verwijderen via uw browserinstellingen. Houd er rekening mee dat het
              uitschakelen van cookies de functionaliteit van de website kan beperken. U kunt uw toestemming ook
              altijd intrekken via de cookiebanner onderaan de pagina.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Contact</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Heeft u vragen over ons cookiebeleid? Neem contact op via{" "}
              <a href={`mailto:${SITE.email}`} className="text-rjt-red underline hover:no-underline">
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center border-t border-stone-200 pt-10 dark:border-stone-700">
          <CookieSettingsResetButton />
        </div>
      </div>
    </div>
  );
}
