"use client";

import { ParallaxHeroBackground } from "@/components/ParallaxHeroBackground";

export function ContactPageHero() {
  return (
    <ParallaxHeroBackground
      className="relative h-[42vh] min-h-[280px] w-full overflow-hidden"
      src="/images/DSC_0377-scaled.jpg"
      alt="Praktijkruimte Ren Ji Tang"
      priority
      sizes="100vw"
      imageClassName="object-cover object-center"
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/65 via-black/40 to-black/25" aria-hidden />
      <div className="absolute inset-0 z-20 flex items-end pb-12">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h1 className="font-cormorant text-4xl font-normal text-white md:text-5xl">Contact</h1>
          <p className="mt-3 font-lato text-white/80">Wij helpen u graag verder.</p>
        </div>
      </div>
    </ParallaxHeroBackground>
  );
}
