import type { Metadata } from "next";
import Link from "next/link";
import { InfoPageLayout } from "@/components/layout/InfoPageLayout";
import { klachtenPages } from "@/lib/klachten-data";

export const metadata: Metadata = {
  title: "Klachten & aandoeningen — acupunctuur & TCM | Ren Ji Tang",
  description:
    "Rugpijn, stress, burn-out, slaapproblemen, hormonale klachten: hoe Ren Ji Tang in Den Bosch met TCM ondersteunt.",
  alternates: { canonical: "/klachten" },
};

export default function KlachtenHubPage() {
  return (
    <InfoPageLayout
      heroSrc="/images/hero-massage-new.jpg"
      heroAlt="Ondersteuning bij klachten"
      eyebrow="Klachten"
      title="Klachten & aandoeningen"
      intro="Mensen zoeken vaak op hun klacht — niet alleen op de naam van een behandeling. Hier leest u hoe wij met Traditionele Chinese Geneeskunde ondersteunen bij veelvoorkomende klachten."
    >
      <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
        Geen medisch advies op afstand: bij twijfel of acute klachten raadpleeg altijd uw huisarts. Onderstaande
        pagina&apos;s beschrijven onze <strong className="font-semibold text-[#1A2E1A]">complementaire</strong> aanpak.
      </p>

      <ul className="mt-10 space-y-4">
        {klachtenPages.map((k) => (
          <li
            key={k.slug}
            className="rounded-sm border border-stone-200/80 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <Link href={`/klachten/${k.slug}`} className="block px-6 py-5">
              <span className="font-cormorant text-xl text-[#1A2E1A]">{k.title.split(" — ")[0]}</span>
              <p className="mt-2 font-lato text-sm leading-relaxed text-[#3D5C3D]">{k.intro}</p>
              <span className="mt-3 inline-block font-lato text-xs font-semibold uppercase tracking-wider text-[#2D6A2D]">
                Lees meer →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </InfoPageLayout>
  );
}
