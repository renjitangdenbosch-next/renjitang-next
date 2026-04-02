import { AnimatedLine } from "@/components/AnimatedLine";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: string;
  /** id op de H2 voor aria-labelledby */
  titleId?: string;
  subtitle?: string;
  align?: "center" | "left";
  /** Donkere achtergrond: witte titel */
  dark?: boolean;
  /** Goud lijntje tussen eyebrow en titel (40px) — testimonials-stijl */
  goldRule?: boolean;
  className?: string;
  titleClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  titleId,
  subtitle,
  align = "center",
  dark,
  goldRule,
  className,
  titleClassName,
}: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = dark ? "text-white" : "text-ink";

  return (
    <div className={cn(alignCls, className)}>
      <span
        className={cn(
          "mb-3 block font-lato text-xs font-medium uppercase tracking-[0.2em]",
          dark ? "text-gold" : "text-gold"
        )}
      >
        {eyebrow}
      </span>
      {goldRule ? (
        <AnimatedLine width={120} className="mx-auto mb-4" noMargin />
      ) : null}
      <h2
        id={titleId}
        className={cn(
          "font-cormorant text-3xl font-normal sm:text-4xl md:text-[2.75rem]",
          titleColor,
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 max-w-2xl font-lato text-base",
            align === "center" && "mx-auto",
            dark ? "text-white/50" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
