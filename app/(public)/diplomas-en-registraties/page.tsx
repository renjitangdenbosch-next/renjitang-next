import type { Metadata } from "next";
import Link from "next/link";
import { InfoPageLayout } from "@/components/layout/InfoPageLayout";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Diploma's, registraties & kwaliteit — Zhong, KAB, SCAG | Ren Ji Tang",
  description:
    "Wat Zhong, KAB Koepel en SCAG voor u betekenen als patiënt: erkenning, kwaliteit en klachtenregeling bij Ren Ji Tang.",
  alternates: { canonical: "/diplomas-en-registraties" },
};

export default function DiplomasRegistratiesPage() {
  return (
    <InfoPageLayout
      heroSrc="/images/hero_over_ons.jpg"
      heroAlt="Ren Ji Tang team"
      eyebrow="Vertrouwen"
      title="Diploma's & registraties"
      intro="Wij werken volgens vaknormen en zijn aangesloten bij erkende organisaties. Dat geeft u houvast bij vergoeding, kwaliteit en eventuele klachten."
    >
      <section className="space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Zhong (Nederlandse Vereniging voor Chinese Geneeskunde)</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          Zhong is een belangrijke beroepsvereniging voor traditionele Chinese geneeskunde in Nederland. Aangesloten
          therapeuten voldoen aan opleidingseisen en ethische richtlijnen. Voor u betekent dit:{" "}
          <strong className="font-semibold text-[#1A2E1A]">herkenning door zorgverzekeraars</strong> is vaker mogelijk,
          omdat veel polissen verwijzen naar erkende beroepsverenigingen.
        </p>
        <a
          href="https://zhong.nl"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-lato text-sm font-semibold text-[#2D6A2D] underline-offset-2 hover:underline"
        >
          Meer over Zhong →
        </a>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">KAB Koepel</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          De KAB Koepel verbindt beroepsverenigingen op het gebied van complementaire en alternatieve zorg. Aansluiting
          draagt bij aan <strong className="font-semibold text-[#1A2E1A]">professionalisering en samenhang</strong> in
          het veld — ook richting verzekeraars en overheid.
        </p>
        <a
          href="https://www.kab-koepel.nl/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-lato text-sm font-semibold text-[#2D6A2D] underline-offset-2 hover:underline"
        >
          Meer over KAB Koepel →
        </a>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">SCAG — klachtenregeling</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          SCAG biedt een <strong className="font-semibold text-[#1A2E1A]">onafhankelijke klachtenprocedure</strong> voor
          cliënten van aangesloten praktijken. Mocht u ooit ontevreden zijn over de behandeling of communicatie, dan heeft
          u een duidelijk kader om uw zorg te melden — los van de behandelaar zelf.
        </p>
        <a
          href="https://www.scag.nl"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-lato text-sm font-semibold text-[#2D6A2D] underline-offset-2 hover:underline"
        >
          Meer over SCAG →
        </a>
      </section>

      <section className="mt-10 space-y-4 rounded-sm border border-stone-200/80 bg-white p-6 shadow-sm">
        <h2 className="font-cormorant text-xl text-[#1A2E1A]">Samengevat voor u als patiënt</h2>
        <ul className="list-inside list-disc space-y-2 font-lato text-sm leading-relaxed text-[#3D5C3D]">
          <li>Vakbekwaamheid en ethiek worden geborgd via beroepsverenigingen.</li>
          <li>Verzekeraars herkennen behandelingen vaker wanneer aan polisvoorwaarden wordt voldaan.</li>
          <li>U heeft toegang tot een externe klachtenregeling (SCAG).</li>
        </ul>
      </section>

      <PartnerLogos />

      <p className="mt-8 font-lato text-sm text-[#6B8C6B]">
        Vragen over vergoeding? Zie{" "}
        <Link href="/zorgverzekering" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          zorgverzekering
        </Link>{" "}
        of mail{" "}
        <a href={`mailto:${SITE.email}`} className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          {SITE.email}
        </a>
        .
      </p>
    </InfoPageLayout>
  );
}
