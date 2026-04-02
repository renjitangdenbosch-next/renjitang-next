import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Over Ren Ji Tang",
  description: `Leer ${SITE.name} kennen: TCM-praktijk in ${SITE.city} met meer dan 20 jaar ervaring.`,
  alternates: { canonical: "/over-ons" },
};

export default function OverOnsPage() {
  return (
    <div className="-mt-[7rem] bg-paper text-ink">
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="/images/hero_over_ons.jpg"
          alt="Het team van Ren Ji Tang"
          fill
          priority
          className="object-cover object-[50%_25%]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10"
          aria-hidden
        />
        <div className="absolute inset-0 z-10 flex items-end pb-16">
          <div className="mx-auto w-full max-w-5xl px-6 lg:px-16">
            <span className="mb-3 block font-lato text-xs uppercase tracking-[0.2em] text-[#B8860B]">
              Over ons
            </span>
            <h1 className="font-cormorant text-5xl font-normal text-white lg:text-6xl">Ren Ji Tang</h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-lato text-lg leading-relaxed text-ink/90">
          Welkom bij Ren Ji Tang, een praktijk voor Traditionele Chinese Geneeskunde in het hart van
          &apos;s-Hertogenbosch. Al meer dan twintig jaar begeleiden wij mensen die zoeken naar
          verlichting van klachten, meer energie of emotionele balans.
        </p>
        <p className="mt-6 font-lato leading-relaxed text-ink/90">
          Onze aanpak is holistisch: we kijken naar het hele plaatje — niet alleen naar het symptoom,
          maar ook naar oorzaak, leefstijl en wat voor úw lichaam werkt. Met acupunctuur, massage,
          cupping, guasha en waar passend kruiden ondersteunen wij uw herstel in een rustige,
          professionele omgeving.
        </p>
        <p className="mt-6 font-lato leading-relaxed text-ink/90">
          Wij werken volgens de principes van TCM en blijven ons scholen. De praktijk is aangesloten
          bij erkende beroepsorganisaties. Uw veiligheid en comfort staan voorop.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="/images/DSC_0377-scaled.jpg"
              alt="Behandelkamer"
              fill
              className="object-cover"
              sizes="(max-width:640px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="/images/DSC_03788-scaled.jpg"
              alt="Praktijk Ren Ji Tang"
              fill
              className="object-cover"
              sizes="(max-width:640px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="mt-14">
          <Button variant="primary" href={SITE.bookingUrl}>
            Maak een afspraak
          </Button>
        </div>
      </div>
    </div>
  );
}
