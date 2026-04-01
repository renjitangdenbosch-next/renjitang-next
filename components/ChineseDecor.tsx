import { cn } from "@/lib/cn";

type SvgProps = React.SVGProps<SVGSVGElement> & { className?: string };

/** Golvende lijn in goud */
export function WaveLine({ className, ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 400 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-rjt-gold", className)}
      aria-hidden
      {...props}
    >
      <path
        d="M0 12c40-8 80 8 120 0s80-8 120 0 80 8 120 0 40-8 40-8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Gestileerde lotus */
export function LotusIcon({ className, ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-rjt-gold", className)}
      aria-hidden
      {...props}
    >
      <path
        d="M32 8c-4 12-12 20-20 24 8 4 16 4 20 0 4 4 12 4 20 0-8-4-16-12-20-24Z"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M32 20v28M22 36c4-6 6-10 10-10s6 4 10 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="32" cy="52" r="3" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}

/** Schub-/golfpatroon als subtiele achtergrondlaag */
export function DragonScaleBackground({ className }: { className?: string }) {
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28"><path d="M0 14 Q8 6 16 14 T32 14" fill="none" stroke="%23C9A84C" stroke-width="0.45" opacity="0.35"/><path d="M0 22 Q8 14 16 22 T32 22" fill="none" stroke="%23C9A84C" stroke-width="0.35" opacity="0.22"/></svg>`,
  );
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 opacity-[0.55] dark:opacity-[0.4]",
        className,
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,${svg}")`,
        backgroundSize: "32px 28px",
      }}
      aria-hidden
    />
  );
}

/** Alias: schubpatroon-achtergrond (specificatie: DragonScale) */
export const DragonScale = DragonScaleBackground;

/** Decoratief Chinees karakter 仁 (Ren) */
export function RenCharacterDecor({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-rjt-gold", className)}
      aria-hidden
    >
      <text
        x="50%"
        y="52%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="currentColor"
        fillOpacity={0.2}
        style={{
          fontSize: 200,
          fontFamily: '"KaiTi", "STKaiti", "Songti SC", "Noto Serif SC", SimSun, serif',
        }}
      >
        仁
      </text>
    </svg>
  );
}

/** Rood accentpunt */
export function RedDot({ className, ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={cn("text-rjt-red", className)}
      aria-hidden
      {...props}
    >
      <circle cx="6" cy="6" r="4" fill="currentColor" />
    </svg>
  );
}

/** Gouden scheidingslijn met ornament */
export function GoldDivider({
  className,
  align = "center",
}: {
  className?: string;
  align?: "center" | "start";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-rjt-gold",
        align === "start" ? "justify-start" : "justify-center",
        className,
      )}
      role="presentation"
    >
      <span className="h-px w-12 bg-current opacity-60 sm:w-20" />
      <svg width="28" height="12" viewBox="0 0 28 12" fill="none" aria-hidden>
        <path
          d="M14 1 L17 6 L14 11 L11 6 Z"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity="0.2"
        />
      </svg>
      <span className="h-px w-12 bg-current opacity-60 sm:w-20" />
    </div>
  );
}

/** Klein decoratief sterretje (voor stats) */
export function SparkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("text-rjt-gold", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l1.8 5.5h5.8l-4.7 3.4 1.8 5.5L12 13.9 7.3 16.4l1.8-5.5L4.4 7.5h5.8L12 2z" />
    </svg>
  );
}
