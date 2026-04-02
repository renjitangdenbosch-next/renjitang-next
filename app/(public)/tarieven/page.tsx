import type { Metadata } from "next";
import Link from "next/link";

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
  { behandeling: "Kennismakingsgesprek", duur: "15 min", prijs: "Gratis" },
];

export default function TarievenPage() {
  return (
    <main className="min-h-screen bg-[#F9F5EE]">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <span className="mb-4 block font-lato text-xs uppercase tracking-[0.2em] text-[#B8860B]">
          Tarieven
        </span>
        <h1 className="mb-4 font-cormorant text-5xl text-[#1A1208]">Onze tarieven</h1>
        <p className="mb-12 font-lato text-lg text-[#9E8E75]">Transparante prijzen — geen verrassingen.</p>

        <div className="mb-8 overflow-hidden rounded-sm border border-stone-200/80 bg-white">
          <div className="grid grid-cols-3 bg-[#1A1208] px-6 py-3">
            <span className="font-lato text-xs uppercase tracking-widest text-[#B8860B]">Behandeling</span>
            <span className="font-lato text-xs uppercase tracking-widest text-[#B8860B]">Duur</span>
            <span className="text-right font-lato text-xs uppercase tracking-widest text-[#B8860B]">
              Tarief
            </span>
          </div>
          {tarieven.map((t, i) => (
            <div
              key={`${t.behandeling}-${t.duur}-${i}`}
              className={`grid grid-cols-3 border-b border-stone-100 px-6 py-4 ${
                i % 2 === 0 ? "bg-white" : "bg-[#F9F5EE]"
              }`}
            >
              <span className="font-cormorant text-lg text-[#1A1208]">{t.behandeling}</span>
              <span className="self-center font-lato text-sm text-[#9E8E75]">{t.duur}</span>
              <span className="self-center text-right font-lato text-sm font-bold text-[#C0392B]">
                {t.prijs}
              </span>
            </div>
          ))}
        </div>

        <div className="mb-10 space-y-2 rounded-sm bg-[#EDE8DC] p-6 font-lato text-sm text-[#5A4E3C]">
          <p>✓ Veel zorgverzekeraars vergoeden TCM behandelingen (aanvullend pakket)</p>
          <p>✓ Vraag naar onze behandelpakketten voor meerdere sessies</p>
          <p>✓ Eerste kennismakingsgesprek altijd gratis en vrijblijvend</p>
        </div>

        <Link href="/bookings" className="btn-primary inline-block">
          Maak een afspraak →
        </Link>
      </div>
    </main>
  );
}
