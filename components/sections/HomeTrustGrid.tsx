"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, MapPin, Star } from "lucide-react";

const REVIEW_URL = "https://g.page/r/CWfINr7YXGk6EBM/review";

const gold = "#c8a040";
const borderGold = "rgba(200,160,64,0.3)";

function useCountUp(target: number, durationMs: number, active: boolean) {
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      setN(Math.round(target * t));
      if (t < 1) requestAnimationFrame(step);
      else setN(target);
    };
    requestAnimationFrame(step);
  }, [active, target, durationMs]);

  return n;
}

export function HomeTrustGrid() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(460, 1200, visible);

  return (
    <section
      ref={ref}
      className="bg-[#F4FAF0] py-10 md:py-12"
      aria-label="Openingstijden, reviews en klanten"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 divide-y divide-[rgba(200,160,64,0.12)] md:grid-cols-3 md:divide-x md:divide-y-0 md:divide-[rgba(200,160,64,0.12)]">
          {/* CEL 1 */}
          <div className="flex flex-col items-center gap-3 px-4 py-8 text-center md:px-6 md:py-10">
            <Clock className="h-[18px] w-[18px] shrink-0" style={{ color: gold }} strokeWidth={1.5} aria-hidden />
            <p
              className="font-serif font-light leading-none"
              style={{ fontSize: "3rem", color: gold }}
            >
              Di–Za
            </p>
            <p
              className="font-lato uppercase text-[#1A2E1A]/70"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}
            >
              Openingstijden
            </p>
            <p className="font-lato" style={{ fontSize: "0.72rem", color: gold, opacity: 0.45 }}>
              9:00 – 20:00 u
            </p>
          </div>

          {/* CEL 2 */}
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 px-4 py-8 text-center transition-colors duration-200 hover:bg-white/[0.04] md:px-6 md:py-10"
            style={{ boxShadow: `inset 0 0 0 1px ${borderGold}` }}
          >
            <Star className="h-[18px] w-[18px] shrink-0" style={{ color: gold }} strokeWidth={1.5} aria-hidden />
            <span className="text-lg leading-none tracking-tight" style={{ color: gold }} aria-hidden>
              ★★★★★
            </span>
            <p className="font-serif font-light leading-none" style={{ fontSize: "2.4rem", color: gold }}>
              5,0
            </p>
            <p className="font-lato text-[0.65rem] text-[#1A2E1A]/70">op Google</p>
            <p
              className="font-lato transition-opacity group-hover:opacity-100"
              style={{ fontSize: "0.72rem", color: gold, opacity: 0.45 }}
            >
              Lees onze reviews →
            </p>
          </a>

          {/* CEL 3 */}
          <div className="flex flex-col items-center gap-3 px-4 py-8 text-center md:px-6 md:py-10">
            <MapPin className="h-[18px] w-[18px] shrink-0" style={{ color: gold }} strokeWidth={1.5} aria-hidden />
            <p className="font-serif font-light tabular-nums leading-none" style={{ fontSize: "2.4rem", color: gold }}>
              {count}+
            </p>
            <p
              className="font-lato uppercase text-[#1A2E1A]/70"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}
            >
              Tevreden klanten
            </p>
            <p className="font-lato" style={{ fontSize: "0.72rem", color: gold, opacity: 0.45 }}>
              &apos;s-Hertogenbosch
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[rgba(200,160,64,0.3)] px-[1.8rem] py-[0.6rem] font-lato text-[#c8a040] transition-colors duration-200 hover:border-[#c8a040]"
          >
            Lees alle reviews op Google →
          </a>
        </div>
      </div>
    </section>
  );
}
