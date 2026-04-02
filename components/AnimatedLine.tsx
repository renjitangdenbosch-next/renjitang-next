"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function AnimatedLine({
  width = 80,
  color = "#c8a040",
  duration = 1500,
  strokeWidth = 2,
  strokeOpacity = 1,
  className,
  noMargin,
}: {
  width?: number;
  color?: string;
  duration?: number;
  strokeWidth?: number;
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

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => {
            setVisible(true);
          }, 50);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  const cy = strokeWidth >= 2 ? 3 : 2;
  const svgH = strokeWidth >= 2 ? 6 : 4;

  return (
    <svg
      ref={svgRef}
      width={width}
      height={svgH}
      className={cn("block shrink-0", !noMargin && "mt-3 mb-6", className)}
      aria-hidden
    >
      <line
        x1="0"
        y1={cy}
        x2={width}
        y2={cy}
        stroke={color}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        strokeDasharray={width}
        strokeDashoffset={visible ? 0 : width}
        strokeLinecap="round"
        style={{
          transition: visible ? `stroke-dashoffset ${duration}ms ease-out` : "none",
        }}
      />
    </svg>
  );
}
