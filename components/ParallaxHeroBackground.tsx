"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { PARALLAX_SPEED_DEFAULT, useParallax } from "@/hooks/useParallax";

type Props = {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  speed?: number;
  /** Indien gezet: forceer aan/uit; anders volgt Framer `useReducedMotion`. */
  parallaxEnabled?: boolean;
  children?: ReactNode;
};

/**
 * Hero met parallax: donkere `#1a0f08` achtergrond, `overflow-hidden`, laag `.parallax-img` 140% hoog.
 */
export function ParallaxHeroBackground({
  src,
  alt,
  className,
  imageClassName,
  sizes = "100vw",
  priority,
  speed = PARALLAX_SPEED_DEFAULT,
  parallaxEnabled,
  children,
}: Props) {
  const reduceFramer = useReducedMotion();
  const enabled =
    parallaxEnabled !== undefined ? parallaxEnabled : reduceFramer !== true;
  const parallaxRef = useParallax(speed, enabled);

  return (
    <div ref={parallaxRef} className={cn("relative overflow-hidden bg-[#1a0f08]", className)}>
      <div
        className="parallax-img pointer-events-none absolute inset-x-0 top-[-20%] z-0 h-[140%] w-full will-change-transform"
        aria-hidden
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      </div>
      {children}
    </div>
  );
}
