import type { Metadata } from "next";
import Link from "next/link";
import { InfoPageLayout } from "@/components/layout/InfoPageLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Acupunctuur bij stress & burn-out — Ren Ji Tang",
  description:
    "Stress, overspanning en burn-out: acupunctuur en TCM ter ondersteuning in Den Bosch. Rust, slaap en herstel.",
  alternates: { canonical: "/acupunctuur-stress-burnout" },
};

export default function AcupunctuurStressBurnoutPage() {
  return (
    <InfoPageLayout
      heroSrc="/images/hero_acupunctuur_handen.jpg"
      heroAlt="Acupunctuur voor rust en balans"
      eyebrow="Doelgroep"
      title="Acupunctuur bij stress &amp; burn-out"
      intro="Als u langdurig “aan” staat, kan uw lichaam moeilijk ontspannen — zelfs als u stil ligt. Acupunctuur wordt door veel mensen ervaren als een zachte duw richting herstel, naast gesprekken, rust en eventuele reguliere begeleiding."
    >
      <section className="space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Wat merkt u mogelijk?</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          Veel cliënten rapporteren betere nachtrust, minder innerlijke onrust of meer energie na een reeks behandelingen.
          Het is geen “quick fix”, vooral niet bij langdurige uitputting — wel een gestructureerde manier om uw
          zenuwstelsel te helpen reguleren.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Complementair, niet vervangend</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          Bij ernstige burn-out hoort medische en/of arbeidsgerichte begeleiding. Wij vullen aan waar dat passend is en
          verwijzen door wanneer dat nodig is.
        </p>
      </section>

      <section className="mt-10 space-y-4 rounded-sm border border-stone-200/80 bg-white p-6 shadow-sm">
        <h2 className="font-cormorant text-xl text-[#1A2E1A]">Verder lezen</h2>
        <p className="font-lato text-sm leading-relaxed text-[#3D5C3D]">
          Op onze blog staat een artikel over{" "}
          <Link
            href="/blog/acupunctuur-bij-burn-out"
            className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline"
          >
            acupunctuur bij burn-out
          </Link>
          . Zie ook{" "}
          <Link href="/klachten/stress" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
            stress (klachtenpagina)
          </Link>{" "}
          en{" "}
          <Link href="/klachten/burnout" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
            burn-out (klachtenpagina)
          </Link>
          .
        </p>
      </section>

      <p className="mt-8 font-lato text-sm text-[#6B8C6B]">
        Vergoeding:{" "}
        <Link href="/zorgverzekering" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          aanvullende zorgverzekering
        </Link>
        . Afspraak:{" "}
        <Link href={SITE.bookingUrl} className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          online boeken
        </Link>
        .
      </p>
    </InfoPageLayout>
  );
}
