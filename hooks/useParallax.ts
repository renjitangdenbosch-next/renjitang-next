"use client";

import { useEffect, useRef } from "react";

/** 60% — `translateY` wordt `getBoundingClientRect().top * speed` i.p.v. pagina-scroll. */
export const PARALLAX_SPEED_DEFAULT = 0.6;

/**
 * Parallax op de hero-container (`ref`): zoekt `.parallax-img` en zet `translateY(rect.top * speed)`.
 * Tekst blijft in siblings boven de laag (hogere z-index).
 * Uit bij `prefers-reduced-motion` of `enabled === false`.
 */
export function useParallax(speed: number = PARALLAX_SPEED_DEFAULT, enabled: boolean = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const img = () => el.querySelector(".parallax-img") as HTMLElement | null;

    if (!enabled) {
      const node = img();
      if (node) node.style.transform = "";
      return;
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;

    const apply = () => {
      rafId = 0;
      const node = img();
      if (!node) return;
      if (mq.matches) {
        node.style.transform = "";
        return;
      }
      const rect = el.getBoundingClientRect();
      const offset = rect.top * speed;
      node.style.transform = `translateY(${offset}px)`;
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(apply);
    };

    const onMotionChange = () => {
      apply();
    };

    apply();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    mq.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      mq.removeEventListener("change", onMotionChange);
      if (rafId) cancelAnimationFrame(rafId);
      const node = img();
      if (node) node.style.transform = "";
    };
  }, [speed, enabled]);

  return ref;
}
