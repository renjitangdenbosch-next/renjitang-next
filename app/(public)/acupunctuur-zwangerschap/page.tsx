import type { Metadata } from "next";
import Link from "next/link";
import { InfoPageLayout } from "@/components/layout/InfoPageLayout";

export const metadata: Metadata = {
  title: "Acupunctuur tijdens zwangerschap — Ren Ji Tang Den Bosch",
  description:
    "Zwangerschap en acupunctuur: wat is mogelijk, wanneer voorzichtigheid en hoe TCM ondersteuning kan bieden in 's-Hertogenbosch.",
  alternates: { canonical: "/acupunctuur-zwangerschap" },
};

export default function AcupunctuurZwangerschapPage() {
  return (
    <InfoPageLayout
      heroSrc="/images/hero_3_acupunctuur.jpg"
      heroAlt="Zachte acupunctuur"
      eyebrow="Zwangerschap"
      title="Acupunctuur tijdens zwangerschap"
      intro="Veel vrouwen zoeken acupunctuur voor misselijkheid, vermoeidheid, rugklachten of om te ontspannen. Veiligheid staat voorop: we stemmen punten en techniek af op uw trimester en medische situatie."
    >
      <section className="space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Waar kan het bij helpen?</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          In de praktijk worden acupunctuur en gerelateerde TCM vaak ingezet bij o.a. ochtendmisselijkheid, spanning,
          (on)rustig slapen, rug- en bekkenklachten en algemene vermoeidheid. Iedere zwangerschap is anders; tijdens de
          intake bespreken we uw klachten en eventuele risico’s uitgebreid.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Veiligheid en overleg</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          Wij behandelen <strong className="font-semibold text-[#1A2E1A]">niet in plaats van</strong> uw verloskundige
          of gynaecoloog. Bij bloedingsklachten, hevige pijn, koorts of andere acute signalen verwijzen wij u altijd naar
          uw zorgverlener. Sommige punten en technieken worden tijdens zwangerschap vermeden; daar houden wij ons strikt
          aan.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Kruiden tijdens zwangerschap</h2>
        <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
          Kruidengeneeskunde in de zwangerschap vraagt extra voorzichtigheid. Gebruik geen kruiden op advies van het
          internet; alleen in overleg met een ervaren therapeut en — waar nodig — uw arts.
        </p>
      </section>

      <p className="mt-10 font-lato text-sm text-[#6B8C6B]">
        Ook interessant:{" "}
        <Link href="/klachten/hormonale-klachten" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          hormonale klachten &amp; cyclus
        </Link>
        ,{" "}
        <Link href="/eerste-bezoek" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          eerste bezoek
        </Link>
        .
      </p>
    </InfoPageLayout>
  );
}
