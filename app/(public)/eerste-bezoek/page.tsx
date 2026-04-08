import type { Metadata } from "next";
import Link from "next/link";
import { InfoPageLayout } from "@/components/layout/InfoPageLayout";

export const metadata: Metadata = {
  title: "Eerste bezoek — wat kun je verwachten? | Ren Ji Tang",
  description:
    "Uw eerste afspraak bij Ren Ji Tang: intake, duur, wat meenemen en hoe acupunctuur of massage verloopt in Den Bosch.",
  alternates: { canonical: "/eerste-bezoek" },
};

export default function EersteBezoekPage() {
  return (
    <InfoPageLayout
      heroSrc="/images/hero-behandelaar.jpg"
      heroAlt="Welkom bij Ren Ji Tang"
      eyebrow="Praktisch"
      title="Uw eerste bezoek"
      intro="We begrijpen dat een eerste keer TCM spannend kan zijn. Zo bereidt u zich rustig voor."
    >
      <section className="space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Hoe verloopt de kennismaking?</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          Bij acupunctuur (en vergelijkbare consulten) starten we met een uitgebreid gesprek: uw klachten, medische
          voorgeschiedenis, leefstijl en wat u hoopt te bereiken. Daarna volgt — waar passend — de eerste behandeling op
          de tafel. Voor massage kan de nadruk meer op intake en directe behandeling liggen, afhankelijk van het type
          afspraak.
        </p>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          Een eerste consult duurt doorgaans <strong className="font-semibold text-[#1A2E1A]">rond 60 minuten</strong>{" "}
          (soms langer bij een uitgebreide intake; het exacte tijdsblok staat bij uw boeking). Kom{" "}
          <strong className="font-semibold text-[#1A2E1A]">enkele minuten eerder</strong> zodat u rustig kunt
          binnenkomen.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Wat neemt u mee?</h2>
        <ul className="list-inside list-disc space-y-2 font-lato text-[#1A2E1A]/88">
          <li>Comfortabele, <strong className="font-semibold">loszittende kleding</strong> (makkelijk tot aan elleboog en knie).</li>
          <li>Lijst van <strong className="font-semibold">medicatie en supplementen</strong> die u gebruikt (of een foto daarvan).</li>
          <li>Eventuele <strong className="font-semibold">onderzoeksuitslagen</strong> of brieven van uw specialist, als die relevant zijn.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Eten, koffie en alcohol</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          U hoeft niet nuchter te zijn voor acupunctuur, tenzij uw arts anders heeft voorgeschreven. Een lichte maaltijd
          vooraf is prima. Vermijd vlak voor de behandeling grote hoeveelheden cafeïne of alcohol, zodat u uw lichaam
          goed kunt voelen.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Na de behandeling</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          Veel mensen voelen zich ontspannen of juist even “licht in het hoofd”. Plan waar mogelijk geen zware
          inspanning direct daarna; drink water en geef uzelf even rust.
        </p>
      </section>

      <p className="mt-10 font-lato text-sm text-[#6B8C6B]">
        Route en parkeren: zie{" "}
        <Link href="/locatie" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          locatie &amp; parkeren
        </Link>
        . Vergoeding: zie{" "}
        <Link href="/zorgverzekering" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          zorgverzekering
        </Link>
        .
      </p>
    </InfoPageLayout>
  );
}
