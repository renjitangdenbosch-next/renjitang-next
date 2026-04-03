import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description: `Algemene voorwaarden van ${SITE.name}: diensten, betaling, annulering, aansprakelijkheid en geschillen (EU).`,
  alternates: { canonical: "/algemene-voorwaarden" },
};

export default function AlgemeneVoorwaardenPage() {
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
          <h1 className="font-cormorant text-4xl font-normal text-[#B8860B] md:text-5xl">
            Algemene voorwaarden
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="mb-8 text-sm text-stone-400 dark:text-stone-500">Laatste update: april 2026</p>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
              1. Partijen en toepasselijkheid
            </h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Deze algemene voorwaarden zijn van toepassing op alle overeenkomsten tussen u en Ren Ji Tang,
              gevestigd aan Hazenburgstede 7, 5235 HR &apos;s-Hertogenbosch, KvK-nummer 94217262 (hierna:
              &apos;de praktijk&apos;), met betrekking tot behandelingen, consulten en gerelateerde diensten in het
              kader van Traditionele Chinese Geneeskunde en welzijn (zoals acupunctuur, massage en aanverwante
              technieken). Afwijkende afspraken gelden alleen als deze schriftelijk zijn bevestigd door de
              praktijk.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">2. Diensten</h2>
            <p className="mb-4 leading-relaxed text-stone-600 dark:text-stone-300">
              De praktijk verricht complementaire zorg- en welzijnsdiensten. De behandeling is geen vervanging van
              medische diagnostiek of behandeling door een arts of andere zorgverlener. U blijft zelf
              verantwoordelijk voor uw gezondheid en voor het volgen van medisch advies dat u elders ontvangt. Wij
              adviseren u bij twijfel of klachten altijd contact op te nemen met uw huisarts of behandelaar.
            </p>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              De praktijk voert werkzaamheden uit naar beste vermogen en conform de geldende beroeps- en
              branchestandaarden. Er wordt geen resultaat of genezing gegarandeerd; het effect van behandelingen
              kan per persoon verschillen.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
              3. Afspraken en deelname
            </h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Afspraken kunnen online, telefonisch of op andere door de praktijk aangeboden wijze worden gemaakt. U
              verstrekt juiste contact- en gezondheidsinformatie voor zover nodig voor een veilige behandeling. De
              praktijk mag een behandeling uitstellen of weigeren indien dit naar redelijk oordeel noodzakelijk is
              voor uw veiligheid of die van anderen.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">4. Betaling en tarieven</h2>
            <p className="mb-4 leading-relaxed text-stone-600 dark:text-stone-300">
              De geldende tarieven zijn vermeld op de website of worden bij de afspraak gecommuniceerd. Betaling
              geschiedt volgens de op de website of ter plaatse aangegeven methode (bijvoorbeeld pin of contant),
              tenzij schriftelijk anders overeengekomen.
            </p>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Vergoeding door een zorgverzekeraar is een zaak tussen u en uw verzekeraar, tenzij uitdrukkelijk
              anders vermeld. Niet-vergoede kosten blijven voor uw rekening.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
              5. Annulering en niet verschijnen / 取消预约与未到
            </h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Annulering moet minimaal 24 uur van tevoren worden doorgegeven.
            </p>
            <p lang="zh-Hans" className="mt-2 leading-relaxed text-stone-600 dark:text-stone-300">
              取消预约须至少提前24小时通知。
            </p>
            <p className="mt-4 leading-relaxed text-stone-600 dark:text-stone-300">
              Bij annulering binnen 24 uur of no-show wordt 50% van de behandelprijs in rekening gebracht.
            </p>
            <p lang="zh-Hans" className="mt-2 leading-relaxed text-stone-600 dark:text-stone-300">
              在预约开始前24小时内取消或未到（缺席）的，收取该次治疗费用的50%。
            </p>
            <p className="mt-4 leading-relaxed text-stone-600 dark:text-stone-300">
              Bij herhaald niet verschijnen zonder bericht kan de praktijk aanvullende voorwaarden stellen aan
              nieuwe boekingen.
            </p>
            <p lang="zh-Hans" className="mt-2 leading-relaxed text-stone-600 dark:text-stone-300">
              屡次无故缺席者，诊所可对新预约附加条件。
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">6. Aansprakelijkheid</h2>
            <p className="mb-4 leading-relaxed text-stone-600 dark:text-stone-300">
              De aansprakelijkheid van de praktijk is beperkt tot schade die het rechtstreeks gevolg is van een
              toerekenbare tekortkoming in de uitvoering van de overeenkomst, met uitzondering van schade door
              grove schuld of opzet aan de zijde van de praktijk.
            </p>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              De praktijk is niet aansprakelijk voor indirecte schade, gevolgschade, gederfde winst of
              immateriële schade, voor zover wettelijk toegestaan. Voor consumenten blijven dwingende wettelijke
              aansprakelijkheidsbepalingen onverminderd van toepassing.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
              7. Klachten, geschillen en online geschillenbeslechting (EU)
            </h2>
            <p className="mb-4 leading-relaxed text-stone-600 dark:text-stone-300">
              Heeft u een klacht over de uitvoering van de dienst, neem dan eerst contact op met de praktijk via{" "}
              <a href={`mailto:${SITE.email}`} className="text-rjt-red underline hover:no-underline">
                {SITE.email}
              </a>{" "}
              of{" "}
              <a href={`tel:${SITE.phoneTel}`} className="text-rjt-red underline hover:no-underline">
                {SITE.phone}
              </a>
              . Wij streven ernaar klachten in onderling overleg op te lossen.
            </p>
            <p className="mb-4 leading-relaxed text-stone-600 dark:text-stone-300">
              Ren Ji Tang is aangesloten bij Zhong en valt waar van toepassing onder de klachtenregeling van de
              Stichting Complementaire en Alternatieve Gezondheidszorg (SCAG). Informatie daarover vindt u bij uw
              beroeps- of brancheorganisatie en op{" "}
              <a
                href="https://www.scag.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rjt-red underline hover:no-underline"
              >
                www.scag.nl
              </a>
              .
            </p>
            <p className="mb-4 leading-relaxed text-stone-600 dark:text-stone-300">
              Bent u consument in de Europese Unie en komt u er met ons niet uit, dan kunt u uw klacht indienen via
              het Europese platform voor online geschillenbeslechting (ODR):{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rjt-red underline hover:no-underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .               Buitengerechtelijke geschillenbeslechting via een commissie is vrijwillig, tenzij de wet anders
              voorschrijft. Wij voldoen aan de informatieplicht voor consumenten in de EU met betrekking tot het
              ODR-platform.
            </p>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              Op alle overeenkomsten is Nederlands recht van toepassing. Bent u consument, dan behoudt u de
              bescherming van dwingend recht van uw woonland voor zover dat gunstiger voor u is. Geschillen
              worden voorgelegd aan de bevoegde rechter in Nederland, tenzij de wet anders voorschrijft.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
            <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">8. Wijzigingen</h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-300">
              De praktijk kan deze voorwaarden wijzigen. De versie op de website geldt voor nieuwe afspraken. Bij
              wezenlijke wijzigingen wordt u waar passend geïnformeerd.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
