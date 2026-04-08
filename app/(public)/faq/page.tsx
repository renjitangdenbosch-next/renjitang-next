import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { InfoPageLayout } from "@/components/layout/InfoPageLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Veelgestelde vragen (FAQ) — Ren Ji Tang",
  description:
    "Wordt acupunctuur vergoed? Doet het pijn? Hoeveel sessies? Antwoorden op veelgestelde vragen over TCM bij Ren Ji Tang in Den Bosch.",
  alternates: { canonical: "/faq" },
};

const items: { q: string; a: ReactNode }[] = [
  {
    q: "Wordt acupunctuur of massage vergoed door mijn zorgverzekering?",
    a: (
      <>
        Vaak wel, <strong className="font-semibold text-[#1A2E1A]">via het aanvullende pakket</strong> — niet via de
        basisverzekering. Het verschilt per maatschappij en polis. Lees meer op onze pagina over{" "}
        <Link href="/zorgverzekering" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          aanvullende zorgverzekering
        </Link>
        .
      </>
    ),
  },
  {
    q: "Doet acupunctuur pijn?",
    a: "De naalden zijn veel dunner dan bij een prik of injectie. De meeste mensen voelen een lichte prik, een zwaarte of warmte, soms bijna niets. Als iets onprettig voelt, passen we direct aan.",
  },
  {
    q: "Hoeveel behandelingen heb ik nodig?",
    a: "Dat hangt af van uw klacht, hoe lang die al speelt en hoe u reageert. Acute klachten kunnen soms in enkele sessies verbeteren; chronische patronen vragen vaker om een reeks afspraken. Tijdens de intake bespreken we een realistisch voorstel.",
  },
  {
    q: "Is acupunctuur veilig?",
    a: "Wij werken met steriele disposable naalden en volgen hygiënerichtlijnen. Bij zwangerschap, bloedverdunners of bepaalde aandoeningen stemmen we de behandeling af — meld dit altijd bij de intake.",
  },
  {
    q: "Wat is het verschil tussen acupunctuur en massage bij jullie?",
    a: (
      <>
        Acupunctuur werkt via gerichte prikkels op het lichaam; tuina-massage werkt met druk, strekkingen en technieken
        op spieren en meridiaanbanen. Soms combineren we beide. Zie ook{" "}
        <Link href="/behandelingen" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          alle behandelingen
        </Link>
        .
      </>
    ),
  },
  {
    q: "Waar zitten jullie en kan ik parkeren?",
    a: (
      <>
        Aan de Hazenburgstede 7 in &apos;s-Hertogenbosch — zie{" "}
        <Link href="/locatie" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          locatie &amp; parkeren
        </Link>{" "}
        voor route, OV en gratis parkeren in de buurt.
      </>
    ),
  },
  {
    q: "Kan ik online een afspraak maken?",
    a: (
      <>
        Ja, via onze{" "}
        <Link href={SITE.bookingUrl} className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          online agenda
        </Link>
        . Liever bellen of mailen?{" "}
        <a href={`tel:${SITE.phoneTel}`} className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          {SITE.phone}
        </a>
        .
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <InfoPageLayout
      heroSrc="/images/hero_3_acupunctuur.jpg"
      heroAlt="Ren Ji Tang praktijk"
      eyebrow="Info"
      title="Veelgestelde vragen"
      intro="Antwoorden op vragen die we vaak horen. Staat uw vraag er niet tussen? Neem gerust contact op."
    >
      <div className="space-y-10">
        {items.map((item) => (
          <section key={item.q}>
            <h2 className="font-cormorant text-xl text-[#1A2E1A]">{item.q}</h2>
            <div className="mt-3 font-lato leading-relaxed text-[#1A2E1A]/88">{item.a}</div>
          </section>
        ))}
      </div>

      <p className="mt-12 font-lato text-sm text-[#6B8C6B]">
        Meer diepgang: bekijk ook onze{" "}
        <Link href="/blog" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          blog
        </Link>
        .
      </p>
    </InfoPageLayout>
  );
}
