"use client";

import { ParallaxHeroBackground } from "@/components/ParallaxHeroBackground";

type Props = {
  afbeelding: string;
  titel: string;
  categorie: string;
};

export function BlogArtikelHero({ afbeelding, titel, categorie }: Props) {
  return (
    <ParallaxHeroBackground
      className="relative h-[45vh] min-h-[300px] overflow-hidden"
      src={afbeelding}
      alt={titel}
      priority
      sizes="100vw"
      imageClassName="object-cover"
    >
      <div className="absolute inset-0 z-10 bg-black/20" aria-hidden />
      <div className="absolute inset-0 z-20 flex items-end pb-12">
        <div className="mx-auto w-full max-w-3xl px-6">
          <span className="mb-3 block font-lato text-xs uppercase tracking-widest text-[#4A9E4A]">
            {categorie}
          </span>
          <h1 className="font-cormorant text-4xl text-white lg:text-5xl">{titel}</h1>
        </div>
      </div>
    </ParallaxHeroBackground>
  );
}
