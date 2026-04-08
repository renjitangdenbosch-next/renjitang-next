import type { Metadata } from "next";
import Link from "next/link";
import { InfoPageLayout } from "@/components/layout/InfoPageLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cadeaubon — Ren Ji Tang 's-Hertogenbosch",
  description:
    "Geef ontspanning of zorg cadeau: cadeaubon voor acupunctuur of massage bij Ren Ji Tang in Den Bosch.",
  alternates: { canonical: "/cadeaubon" },
};

export default function CadeaubonPage() {
  return (
    <InfoPageLayout
      heroSrc="/images/hero_2_massage.jpg"
      heroAlt="Wellness en zorg cadeau"
      eyebrow="Cadeau"
      title="Cadeaubon"
      intro="Verwen iemand met tijd voor zichzelf: een behandeling bij Ren Ji Tang is een persoonlijk cadeau."
    >
      <section className="space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Hoe werkt het?</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          Een cadeaubon kan bijvoorbeeld gelden voor een massage of acupunctuurbehandeling naar keuze, binnen onze
          reguliere tarieven. U bepaalt het bedrag of de behandeling in overleg met de praktijk.
        </p>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          Neem <strong className="font-semibold text-[#1A2E1A]">contact</strong> met ons op om een bon te bestellen. Wij
          maken de bon voor u klaar — fysiek om op te halen of digitaal, afhankelijk van wat u prettig vindt.
        </p>
      </section>

      <section className="mt-10 space-y-4 rounded-sm border border-[#2D6A2D]/15 bg-gradient-to-br from-[#F4FAF0] to-[#EDE8DC]/90 p-6">
        <h2 className="font-cormorant text-xl text-[#1A2E1A]">Bestellen</h2>
        <p className="font-lato text-sm leading-relaxed text-[#3D5C3D]">
          Bel{" "}
          <a href={`tel:${SITE.phoneTel}`} className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
            {SITE.phone}
          </a>
          , mail{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
            {SITE.email}
          </a>{" "}
          of gebruik het{" "}
          <Link href={SITE.contactFormUrl} className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
            contactformulier
          </Link>{" "}
          met het onderwerp “cadeaubon”.
        </p>
      </section>

      <p className="mt-8 font-lato text-xs leading-relaxed text-[#6B8C6B]">
        Cadeaubonnen zijn persoonlijk; annulerings- en geldigheidsvoorwaarden worden bij aankoop met u afgestemd en
        sluiten aan bij onze algemene voorwaarden.
      </p>
    </InfoPageLayout>
  );
}
