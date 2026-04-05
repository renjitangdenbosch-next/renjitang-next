import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Disclaimer van ${SITE.name}: geen medisch advies, aansprakelijkheid en intellectueel eigendom.`,
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="-mt-[7rem] text-ink">
      <section className="relative overflow-hidden bg-[#F4FAF0] pb-16 pt-28 md:pb-20 md:pt-32">
        <div
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-cormorant text-[min(28vw,9rem)] leading-none text-[#B8860B]/15 md:right-10 md:text-[140px]"
          aria-hidden
        >
          信
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <span className="mb-3 block font-lato text-xs uppercase tracking-[0.2em] text-[#4A9E4A]">
            Juridisch
          </span>
          <h1 className="font-cormorant text-4xl font-normal text-[#4A9E4A] md:text-5xl">Disclaimer</h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="mb-8 text-sm text-stone-400 dark:text-stone-500">Laatste update: april 2026</p>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Algemeen</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Ren Ji Tang streeft naar de juistheid en volledigheid van de informatie op deze website. Aan de
              inhoud kunnen echter geen rechten worden ontleend.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Geen medisch advies</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              De informatie op deze website is uitsluitend bedoeld ter algemene informatie en vervangt geen
              professioneel medisch advies, diagnose of behandeling. Raadpleeg altijd uw huisarts of specialist
              bij gezondheidsklachten.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Acupunctuur en TCG</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Acupunctuur en Traditionele Chinese Geneeskunde zijn complementaire behandelingen. De
              effectiviteit kan per persoon verschillen. Ren Ji Tang is aangesloten bij Zhong en werkt volgens de
              beroepscode van de SCAG.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Aansprakelijkheid</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Ren Ji Tang is niet aansprakelijk voor schade die voortvloeit uit het gebruik van deze website of de
              daarop vermelde informatie.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Externe links</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Deze website kan verwijzingen bevatten naar externe websites. Ren Ji Tang is niet verantwoordelijk
              voor de inhoud van deze externe websites.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Intellectueel eigendom</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Alle content op deze website — teksten, afbeeldingen en logo&apos;s — zijn eigendom van Ren Ji Tang.
              Niets mag worden overgenomen zonder schriftelijke toestemming.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Gegevens</h2>
            <ul className="space-y-2 leading-relaxed text-stone-600 dark:text-stone-300">
              <li>KvK-nummer: 94217262</li>
              <li>
                Adres: {SITE.streetAddress}, {SITE.postalCode} {SITE.city}
              </li>
              <li>
                E-mail:{" "}
                <a href={`mailto:${SITE.email}`} className="text-rjt-red underline hover:no-underline">
                  {SITE.email}
                </a>
              </li>
              <li>
                Telefoon:{" "}
                <a href={`tel:${SITE.phoneTel}`} className="text-rjt-red underline hover:no-underline">
                  {SITE.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
