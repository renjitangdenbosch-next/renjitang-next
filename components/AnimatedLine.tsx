"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function AnimatedLine({
  width = 80,
  color = "#c8a040",
  duration = 800,
  strokeOpacity = 1,
  className,
  noMargin,
}: {
  width?: number;
  color?: string;
  duration?: number;
  /** 0–1, voor zachtere goudtinten (zoals /40 in PageLayout) */
  strokeOpacity?: number;
  className?: string;
  /** Geen standaard marge (bijv. naast ornament in GoldDivider) */
  noMargin?: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const el = svgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={4}
      className={cn("block shrink-0", !noMargin && "mt-3 mb-6", className)}
      aria-hidden
    >
      <line
        x1="0"
        y1="2"
        x2={width}
        y2="2"
        stroke={color}
        strokeOpacity={strokeOpacity}
        strokeWidth={1}
        strokeDasharray={width}
        strokeDashoffset={visible ? 0 : width}
        style={{
          transition: visible ? `stroke-dashoffset ${duration}ms ease-out` : "none",
        }}
      />
    </svg>
  );
}
