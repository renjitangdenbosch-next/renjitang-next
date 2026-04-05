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
          <h1 className="font-cormorant text-4xl font-normal text-[#4A9E4A] md:text-5xl">Privacybeleid</h1>
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
                <span>
                  Bezoekersgegevens via Google Analytics (o.a. geanonimiseerd IP-adres, paginabezoeken) — alleen
                  als u analytische cookies accepteert
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Google Analytics</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Wij kunnen Google Analytics gebruiken om bij te houden hoe bezoekers onze website gebruiken.
              Dit gebeurt alleen nadat u in de cookiebanner op &apos;Accepteren&apos; heeft geklikt. Wij
              gebruiken Google Consent Mode: zonder toestemming worden er geen analytische cookies geplaatst en
              wordt het meetscript niet geladen. Als u toestemming geeft, kan Google Analytics cookies plaatsen.
              De informatie wordt zo veel mogelijk geanonimiseerd (o.a. IP-anonimisering). Gegevens kunnen
              worden verwerkt door Google, ook buiten de Europese Economische Ruimte.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Cookies</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Zie ons{" "}
              <a href="/cookiebeleid" className="text-rjt-red underline hover:no-underline">
                cookiebeleid
              </a>{" "}
              voor een overzicht van cookies en vergelijkbare technieken. Uw keuze voor analytische cookies
              slaan wij op in de browser (localStorage). U kunt uw keuze wijzigen via de knop op de
              cookiebeleidpagina.
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
                <span>
                  <strong className="font-medium text-rjt-dark dark:text-rjt-cream">Brevo</strong> (Sendinblue)
                  — voor het verzenden van transactionele e-mails, zoals bevestigingen van afspraken. Zie{" "}
                  <a
                    href="https://www.brevo.com/legal/privacypolicy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rjt-red underline hover:no-underline"
                  >
                    het privacybeleid van Brevo
                  </a>
                  .
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-rjt-gold">◆</span>
                <span>
                  <strong className="font-medium text-rjt-dark dark:text-rjt-cream">Supabase</strong> — voor
                  opslag en beveiligde verwerking van gegevens in onze applicatie (database/backend). Zie{" "}
                  <a
                    href="https://supabase.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rjt-red underline hover:no-underline"
                  >
                    het privacybeleid van Supabase
                  </a>
                  .
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-rjt-gold">◆</span>
                <span>
                  <strong className="font-medium text-rjt-dark dark:text-rjt-cream">Vercel</strong> — voor
                  hosting en uitvoering van deze website. Zie{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rjt-red underline hover:no-underline"
                  >
                    het privacybeleid van Vercel
                  </a>
                  .
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-rjt-gold">◆</span>
                <span>
                  <strong className="font-medium text-rjt-dark dark:text-rjt-cream">Google Analytics</strong>{" "}
                  — alleen als u analytische cookies accepteert; voor geanonimiseerde websitestatistieken. Zie{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rjt-red underline hover:no-underline"
                  >
                    het privacybeleid van Google
                  </a>
                  .
                </span>
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
