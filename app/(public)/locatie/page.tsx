import type { Metadata } from "next";
import Link from "next/link";
import { InfoPageLayout } from "@/components/layout/InfoPageLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Locatie, parkeren & bereikbaarheid — Ren Ji Tang Den Bosch",
  description:
    "Hazenburgstede 7: route, gratis parkeren, OV en fiets. Praktijk Ren Ji Tang op bedrijventerrein in 's-Hertogenbosch, vlak bij het centrum.",
  alternates: { canonical: "/locatie" },
};

const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=Hazenburgstede+7+5235+HR+%27s-Hertogenbosch";

export default function LocatiePage() {
  return (
    <InfoPageLayout
      heroSrc="/images/DSC_0377-scaled.jpg"
      heroAlt="Praktijk Ren Ji Tang"
      eyebrow="Praktisch"
      title="Locatie, parkeren & bereikbaarheid"
      intro="Hazenburgstede 7 ligt op een rustig bedrijventerrein. Cliënten geven aan dat ze de weg soms even moeten zoeken — onderstaande tips helpen u goed aan te komen."
    >
      <section className="space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Adres</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          {SITE.name}
          <br />
          {SITE.streetAddress}
          <br />
          {SITE.postalCode} {SITE.city}
        </p>
        <a
          href={MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-lato text-sm font-semibold text-[#2D6A2D] underline-offset-2 hover:underline"
        >
          Open in Google Maps →
        </a>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Bedrijventerrein — wat verwachten?</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          Hazenburgstede is een bedrijventerrein met kantoren en bedrijven. Het oogt anders dan een winkelstraat in het
          centrum: rustiger, met ruimte om te parkeren. Onze praktijk zit in een net pand; binnen is het warm en
          huiselijk ingericht.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Auto &amp; parkeren</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          In de omgeving is doorgaans <strong className="font-semibold text-[#1A2E1A]">gratis parkeren</strong>{" "}
          mogelijk langs de weg of op voor de hand liggende parkeervakken. Let op lokale borden; regels kunnen per stuk
          straat verschillen. Bij twijfel: bel kort van tevoren, dan wijzen we u naar de meest handige plek dichtbij de
          deur.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Openbaar vervoer</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          Vanaf het centrum van &apos;s-Hertogenbosch bent u met bus of fiets in ongeveer{" "}
          <strong className="font-semibold text-[#1A2E1A]">10 minuten</strong> in de buurt van de praktijk — exacte lijn
          en halte raden we aan te plannen via{" "}
          <a
            href="https://9292.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline"
          >
            9292.nl
          </a>{" "}
          of uw vervoerder-app, omdat dienstregelingen wijzigen.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Fiets</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          Vanuit de stad is de route goed te fietsen. Bij het pand is ruimte om uw fiets kort te stallen; vraag gerust
          waar dat het handigst is.
        </p>
      </section>

      <p className="mt-10 font-lato text-sm text-[#6B8C6B]">
        Meer praktische vragen? Zie ook{" "}
        <Link href="/faq" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          veelgestelde vragen
        </Link>{" "}
        of{" "}
        <Link href={SITE.contactFormUrl} className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          contact
        </Link>
        .
      </p>
    </InfoPageLayout>
  );
}
