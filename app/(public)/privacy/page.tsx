import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: `Privacybeleid van ${SITE.name}: gegevens, cookies, Google Analytics en uw rechten (AVG).`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
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
          <h1 className="font-cormorant text-4xl font-normal text-[#B8860B] md:text-5xl">Privacybeleid</h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="mb-8 text-sm text-stone-400 dark:text-stone-500">Laatste update: april 2026</p>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Wie zijn wij</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Ren Ji Tang is een acupunctuur- en massagepraktijk gevestigd aan Hazenburgstede 7, 5235 HR
              &apos;s-Hertogenbosch. Ons websiteadres is:
            </p>
            <p className="mt-2">
              <a
                href="https://renjitang.nl"
                className="text-[#c8a040] no-underline hover:underline"
              >
                https://renjitang.nl
              </a>
            </p>
            <p className="mt-2 leading-relaxed text-stone-600 dark:text-stone-300">KvK-nummer: 94217262</p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
              Welke gegevens verzamelen wij
            </h2>
            <p className="mb-4 leading-relaxed text-stone-600 dark:text-stone-300">
              Wij verzamelen de volgende persoonsgegevens:
            </p>
            <ul className="space-y-2 text-stone-600 dark:text-stone-300">
              <li className="flex gap-2">
                <span className="shrink-0 text-rjt-gold">◆</span>
                <span>Naam, e-mailadres en telefoonnummer bij het maken van een afspraak</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-rjt-gold">◆</span>
                <span>Opmerkingen die u invult bij uw boeking</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-rjt-gold">◆</span>
                <span>Bezoekersgegevens via Google Analytics (geanonimiseerd IP-adres, paginabezoeken)</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Google Analytics</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Wij maken gebruik van Google Analytics om bij te houden hoe bezoekers onze website gebruiken.
              Google Analytics plaatst een cookie op uw computer. De informatie die wordt verzameld wordt zo
              veel mogelijk geanonimiseerd. Uw IP-adres wordt nadrukkelijk niet meegegeven. De informatie wordt
              overgebracht naar en opgeslagen op servers van Google in de Verenigde Staten.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Cookies</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Onze website maakt gebruik van functionele cookies voor het bijhouden van uw sessie en analytische
              cookies via Google Analytics. U kunt cookies uitschakelen via uw browserinstellingen.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
              Hoe lang bewaren wij uw gegevens
            </h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Boekingsgegevens bewaren wij conform de wettelijke bewaartermijnen. Medische dossiers bewaren wij
              minimaal 15 jaar conform de WGBO. Overige gegevens worden niet langer bewaard dan noodzakelijk.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
              Met wie delen wij uw gegevens
            </h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Wij verkopen uw gegevens nooit aan derden. Gegevens worden alleen gedeeld met:
            </p>
            <ul className="mt-4 space-y-2 text-stone-600 dark:text-stone-300">
              <li className="flex gap-2">
                <span className="shrink-0 text-rjt-gold">◆</span>
                <span>Google Analytics (geanonimiseerd, voor websitestatistieken)</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-rjt-gold">◆</span>
                <span>Resend (voor het versturen van bevestigingsmails)</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Uw rechten</h2>
            <p className="mb-4 leading-relaxed text-stone-600 dark:text-stone-300">
              U heeft de volgende rechten met betrekking tot uw persoonsgegevens:
            </p>
            <ul className="space-y-2 text-stone-600 dark:text-stone-300">
              <li className="flex gap-2">
                <span className="shrink-0 text-rjt-gold">◆</span>
                <span>Recht op inzage van uw gegevens</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-rjt-gold">◆</span>
                <span>Recht op correctie van onjuiste gegevens</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-rjt-gold">◆</span>
                <span>Recht op verwijdering van uw gegevens</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-rjt-gold">◆</span>
                <span>Recht op bezwaar tegen verwerking</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Contact</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Voor vragen over ons privacybeleid of het uitoefenen van uw rechten kunt u contact opnemen via:
            </p>
            <div className="mt-4 space-y-2 text-stone-600 dark:text-stone-300">
              <p>
                📧{" "}
                <a href={`mailto:${SITE.email}`} className="text-rjt-red underline hover:no-underline">
                  {SITE.email}
                </a>
              </p>
              <p>
                📞{" "}
                <a href={`tel:${SITE.phoneTel}`} className="text-rjt-red underline hover:no-underline">
                  {SITE.phone}
                </a>
              </p>
              <p>📍 Hazenburgstede 7, 5235 HR &apos;s-Hertogenbosch</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
              Autoriteit Persoonsgegevens
            </h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Als u van mening bent dat wij niet op de juiste manier met uw gegevens omgaan, heeft u het recht
              om een klacht in te dienen bij de Autoriteit Persoonsgegevens via{" "}
              <a
                href="https://www.autoriteitpersoonsgegevens.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rjt-red underline hover:no-underline"
              >
                www.autoriteitpersoonsgegevens.nl
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
