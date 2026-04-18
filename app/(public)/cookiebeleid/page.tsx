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
      <section className="relative overflow-hidden bg-[#F4FAF0] pb-16 pt-28 md:pb-20 md:pt-32">
        <div
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-cormorant text-[min(28vw,9rem)] leading-none text-[#B8860B]/15 md:right-10 md:text-[140px]"
          aria-hidden
        >
          隐
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <span className="mb-3 block font-lato text-xs uppercase tracking-[0.2em] text-[#4A9E4A]">
            Juridisch
          </span>
          <h1 className="font-cormorant text-4xl font-normal text-[#4A9E4A] md:text-5xl">Cookiebeleid</h1>
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
              Overzicht: cookies, opslag en partijen
            </h2>
            <p className="mb-4 leading-relaxed text-stone-600 dark:text-stone-300">
              Onderstaand overzicht noemt de belangrijkste technieken die wij of geïntegreerde diensten kunnen
              gebruiken. Exacte cookienamen kunnen door updates bij een aanbieder wijzigen; het doel blijft
              gelijk.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse text-left text-sm text-stone-600 dark:text-stone-300">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-600">
                    <th className="py-2 pr-4 font-serif font-medium text-rjt-dark dark:text-rjt-cream">Naam / type</th>
                    <th className="py-2 pr-4 font-serif font-medium text-rjt-dark dark:text-rjt-cream">Partij</th>
                    <th className="py-2 pr-4 font-serif font-medium text-rjt-dark dark:text-rjt-cream">Doel</th>
                    <th className="py-2 font-serif font-medium text-rjt-dark dark:text-rjt-cream">Bewaartermijn</th>
                  </tr>
                </thead>
                <tbody className="align-top">
                  <tr className="border-b border-stone-100 dark:border-stone-700">
                    <td className="py-3 pr-4">cookie-consent (localStorage)</td>
                    <td className="py-3 pr-4">Ren Ji Tang / uw browser</td>
                    <td className="py-3 pr-4">
                      Onthoudt uw keuzes voor analytische en marketingcookies (geen HTTP-cookie).
                    </td>
                    <td className="py-3">Tot u de gegevens wist of opnieuw kiest via cookie-instellingen</td>
                  </tr>
                  <tr className="border-b border-stone-100 dark:border-stone-700">
                    <td className="py-3 pr-4">Sessie- / beveiligingscookies (indien nodig)</td>
                    <td className="py-3 pr-4">Ren Ji Tang / Vercel</td>
                    <td className="py-3 pr-4">Technische werking, beveiliging en prestaties van de site.</td>
                    <td className="py-3">Sessie of zoals door het platform ingesteld</td>
                  </tr>
                  <tr className="border-b border-stone-100 dark:border-stone-700">
                    <td className="py-3 pr-4">o.a. _ga, _ga_*</td>
                    <td className="py-3 pr-4">Google (Analytics)</td>
                    <td className="py-3 pr-4">
                      Meten van bezoek en gebruik van de website. Alleen na toestemming voor analytische cookies;
                      wij laden Analytics pas na uw keuze.
                    </td>
                    <td className="py-3">Doorgaans tot 2 jaar (instelbaar door Google)</td>
                  </tr>
                  <tr className="border-b border-stone-100 dark:border-stone-700">
                    <td className="py-3 pr-4">Google Ads / conversie (o.a. via gtag)</td>
                    <td className="py-3 pr-4">Google (Ads)</td>
                    <td className="py-3 pr-4">
                      Conversiemeting en advertentiefuncties. Alleen na aparte toestemming voor marketing in de
                      cookiebanner.
                    </td>
                    <td className="py-3">Zie het cookie- en privacybeleid van Google</td>
                  </tr>
                  <tr className="border-b border-stone-100 dark:border-stone-700">
                    <td className="py-3 pr-4">o.a. NID, 1P_JAR (voorbeeld)</td>
                    <td className="py-3 pr-4">Google (Maps)</td>
                    <td className="py-3 pr-4">
                      Kaartweergave en functionaliteit op de contactpagina. Google kan hierbij cookies plaatsen.
                    </td>
                    <td className="py-3">Zie het cookie- en privacybeleid van Google</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
              Welke cookies gebruiken wij?
            </h2>
            <ul className="space-y-6 text-stone-600 dark:text-stone-300">
              <li>
                <p className="font-medium text-rjt-dark dark:text-rjt-cream">Strikt noodzakelijk</p>
                <p className="mt-2 leading-relaxed">
                  Nodig voor technische werking en beveiliging van de website. Voor deze categorie vragen wij geen
                  aparte toestemming, conform de AVG-gedragslijnen.
                </p>
              </li>
              <li>
                <p className="font-medium text-rjt-dark dark:text-rjt-cream">
                  Analytisch (alleen na &apos;Accepteren&apos;)
                </p>
                <p className="mt-2 leading-relaxed">
                  Google Analytics meet hoe de website wordt gebruikt. Kiest u &apos;Weigeren&apos;, dan wordt het
                  Analytics-script niet geladen en worden er geen analytische cookies voor dit doel geplaatst. Wij
                  zetten Google Consent Mode v2 in met standaard geweigerde analytische opslag tot u toestemming
                  geeft.
                </p>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Cookies van derden</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Onze website bevat een Google Maps integratie op de{" "}
              <Link href={SITE.contactFormUrl} className="text-rjt-red underline hover:no-underline">
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
              Bij uw eerste bezoek kunt u in de banner &apos;Accepteren&apos; of &apos;Weigeren&apos; kiezen; beide
              opties zijn gelijk zichtbaar. U kunt cookies en vergelijkbare gegevens ook beheren of verwijderen via
              uw browserinstellingen. Uw eerdere keuze kunt u wijzigen met onderstaande knop; daarna verschijnt de
              banner opnieuw bij een volgende pagina.
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
