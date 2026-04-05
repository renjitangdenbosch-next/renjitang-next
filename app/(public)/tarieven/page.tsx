import type { Metadata } from "next";
import Link from "next/link";
import { ParallaxHeroBackground } from "@/components/ParallaxHeroBackground";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tarieven — Ren Ji Tang",
  description:
    "Bekijk de tarieven voor acupunctuur, massage, cupping en andere TCM behandelingen bij Ren Ji Tang in 's-Hertogenbosch.",
  alternates: { canonical: "/tarieven" },
};

const tarieven = [
  { behandeling: "Acupunctuur", duur: "60 min", prijs: "vanaf €65" },
  { behandeling: "Tuina Massage", duur: "60 min", prijs: "vanaf €65" },
  { behandeling: "Tuina Massage", duur: "90 min", prijs: "vanaf €85" },
  { behandeling: "Cupping", duur: "45 min", prijs: "vanaf €55" },
  { behandeling: "Guasha", duur: "45 min", prijs: "vanaf €55" },
  { behandeling: "Moxibustie", duur: "45 min", prijs: "vanaf €55" },
  { behandeling: "Kruidengeneeskunde consult", duur: "60 min", prijs: "vanaf €65" },
];

export default function TarievenPage() {
  return (
    <div className="min-h-screen bg-[#F4FAF0]">
      <ParallaxHeroBackground
        className="relative h-[42vh] min-h-[300px] w-full overflow-hidden"
        src="/images/hero-behandelaar.jpg"
        alt="Tarieven Ren Ji Tang"
        priority
        sizes="100vw"
        imageClassName="object-cover object-[50%_40%]"
      >
        <div
          className="absolute inset-0 z-10"
          style={{ background: "rgba(0,0,0,0.5)" }}
          aria-hidden
        />
        <div className="absolute inset-0 z-20 flex items-end pb-12">
          <div className="mx-auto w-full max-w-3xl px-6">
            <span className="mb-4 block font-lato text-xs uppercase tracking-[0.2em] text-[#4A9E4A]">
              Tarieven
            </span>
            <h1 className="mb-4 font-cormorant text-5xl text-white">Onze tarieven</h1>
            <p className="font-lato text-lg text-white/85">Transparante prijzen — geen verrassingen.</p>
          </div>
        </div>
      </ParallaxHeroBackground>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8 overflow-hidden rounded-sm border border-stone-200/80 bg-white">
          <div className="grid grid-cols-3 bg-[#F4FAF0] px-6 py-3">
            <span className="font-lato text-xs uppercase tracking-widest text-[#4A9E4A]">Behandeling</span>
            <span className="font-lato text-xs uppercase tracking-widest text-[#4A9E4A]">Duur</span>
            <span className="text-right font-lato text-xs uppercase tracking-widest text-[#4A9E4A]">
              Tarief
            </span>
          </div>
          {tarieven.map((t, i) => (
            <div
              key={`${t.behandeling}-${t.duur}-${i}`}
              className={`grid grid-cols-3 border-b border-stone-100 px-6 py-4 ${
                i % 2 === 0 ? "bg-white" : "bg-[#F4FAF0]"
              }`}
            >
              <span className="font-cormorant text-lg text-[#1A2E1A]">{t.behandeling}</span>
              <span className="self-center font-lato text-sm text-[#6B8C6B]">{t.duur}</span>
              <span className="self-center text-right font-lato text-sm font-bold text-[#C0392B]">
                {t.prijs}
              </span>
            </div>
          ))}
        </div>

        <div className="mb-10 space-y-2 rounded-sm bg-[#EDE8DC] p-6 font-lato text-sm text-[#3D5C3D]">
          <p>✓ Veel zorgverzekeraars vergoeden TCM behandelingen (aanvullend pakket) *</p>
          <p>✓ Vraag naar onze behandelpakketten voor meerdere sessies</p>
          <p className="mt-4 text-xs italic text-[#6B8C6B]">
            * De vergoeding van TCM-behandelingen verschilt per zorgverzekeraar en per aanvullend pakket. Wij
            adviseren u vooraf uw polisvoorwaarden te raadplegen of contact op te nemen met uw
            zorgverzekeraar om te bevestigen welke behandelingen vergoed worden en onder welke voorwaarden.
            Ren Ji Tang is aangesloten bij Zhong, KAB Koepel en SCAG, wat de kans op vergoeding vergroot.
          </p>
        </div>

        <Link href={SITE.bookingUrl} className="btn-primary inline-block">
          Maak een afspraak →
        </Link>
      </div>
    </div>
  );
}
