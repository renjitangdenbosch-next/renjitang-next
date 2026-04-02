import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "white";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  white: "btn-white",
};

type Base = {
  variant: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = Base & {
  href: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

type ButtonAsButton = Base &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: never };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant, className, children } = props;
  const c = cn(
    variantClass[variant],
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermilion",
    className
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={c} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...btnRest } = props as ButtonAsButton;
  return (
    <button type={type} className={c} {...btnRest}>
      {children}
    </button>
  );
}
