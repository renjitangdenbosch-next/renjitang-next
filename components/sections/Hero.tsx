"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";
import { PARALLAX_SPEED_DEFAULT, useParallax } from "@/hooks/useParallax";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const parallaxRef = useParallax(PARALLAX_SPEED_DEFAULT, reduceMotion !== true);

  return (
    <div
      ref={parallaxRef}
      role="banner"
      className="relative min-h-[max(640px,100svh)] w-full overflow-hidden bg-[#F4FAF0]"
    >
      <div className="parallax-img pointer-events-none absolute inset-x-0 top-[-20%] z-0 h-[140%] w-full will-change-transform" aria-hidden>
        <Image
          src="/images/hero-behandelaar.jpg"
          alt="Acupunctuur en warme sfeer — Ren Ji Tang"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "rgba(255, 255, 255, 0.68)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 100%)",
        }}
        aria-hidden
      />

      <div className="absolute inset-0 z-20 flex min-h-[max(640px,100svh)] items-center">
        <div className="relative z-30 mx-auto w-full max-w-6xl px-6 pb-16 pt-28 md:px-10 md:pt-32 lg:px-12">
        <div className="max-w-3xl">
          <span
            className="hero-fade-up mb-4 block font-lato text-xs font-medium uppercase tracking-[0.28em] text-[#3B6D11]"
          >
            Traditionele Chinese geneeskunde
          </span>
          <h1
            className="hero-fade-up hero-fade-up-delay-1 font-cormorant text-5xl font-normal leading-[1.05] text-[#173404] md:text-7xl lg:text-8xl"
          >
            Herstel
            <br />
            je balans
          </h1>
          <p
            className="hero-fade-up hero-fade-up-delay-2 mt-6 max-w-xl font-lato text-lg text-[#27500A] md:text-xl"
          >
            Acupunctuur, massage en kruidengeneeskunde in &apos;s-Hertogenbosch
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="primary" href={SITE.bookingUrl}>
              Maak een afspraak →
            </Button>
            <Link
              href="/behandelingen"
              className="sm:min-w-[12rem] inline-block rounded-[4px] border-[1.5px] border-[#27500A] bg-[rgba(255,255,255,0.5)] px-8 py-[13px] text-center font-[family:var(--font-sans),sans-serif] text-[0.8rem] font-normal uppercase tracking-[0.08em] text-[#27500A] transition-[border-color] duration-200 hover:border-[#27500A]"
            >
              Bekijk behandelingen
            </Link>
          </div>
        </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-white/40"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-1">
          <span className="font-lato text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
