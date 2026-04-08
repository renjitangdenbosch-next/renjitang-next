import type { ReactNode } from "react";
import Link from "next/link";
import { ParallaxHeroBackground } from "@/components/ParallaxHeroBackground";
import { SITE } from "@/lib/site";

type Props = {
  heroSrc: string;
  heroAlt: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  /** Standaard CTA onderaan */
  showBookingCta?: boolean;
};

export function InfoPageLayout({
  heroSrc,
  heroAlt,
  eyebrow,
  title,
  intro,
  children,
  showBookingCta = true,
}: Props) {
  return (
    <div className="min-h-screen bg-[#F4FAF0]">
      <ParallaxHeroBackground
        className="relative h-[38vh] min-h-[260px] w-full overflow-hidden"
        src={heroSrc}
        alt={heroAlt}
        priority
        sizes="100vw"
        imageClassName="object-cover object-[50%_40%]"
      >
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.5) 42%, rgba(0,0,0,0.22) 100%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 z-20 flex items-end pb-10">
          <div className="mx-auto w-full max-w-3xl px-6">
            <span className="mb-3 block font-lato text-xs uppercase tracking-[0.2em] text-white/85">
              {eyebrow}
            </span>
            <h1 className="font-cormorant text-4xl text-white drop-shadow-sm sm:text-5xl">{title}</h1>
            {intro ? (
              <p className="mt-4 max-w-2xl font-lato text-base leading-relaxed text-white/95 drop-shadow-sm">
                {intro}
              </p>
            ) : null}
          </div>
        </div>
      </ParallaxHeroBackground>

      <div className="mx-auto max-w-3xl px-6 py-12 text-ink dark:text-ink">
        {children}
        {showBookingCta ? (
          <div className="mt-14 rounded-sm border border-stone-200/80 bg-white p-8 text-center shadow-sm">
            <p className="font-cormorant text-xl text-[#1A2E1A]">Vragen of een afspraak?</p>
            <p className="mx-auto mt-2 max-w-md font-lato text-sm text-[#3D5C3D]">
              Bel <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>, mail{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> of plan online.
            </p>
            <Link href={SITE.bookingUrl} className="btn-primary mt-6 inline-block">
              Maak een afspraak →
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
