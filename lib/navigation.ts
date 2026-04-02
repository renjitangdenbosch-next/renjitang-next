import type { WpPage } from "@/types/wordpress";
import { SITE } from "@/lib/site";

/** Links naar detailpagina's — alleen Nederlands in UI */
export const BEHANDELING_NAV_ITEMS = [
  { href: "/behandelingen/acupunctuur", label: "Acupunctuur" },
  { href: "/behandelingen/massage", label: "Tuina massage" },
  { href: "/behandelingen/cupping", label: "Cupping" },
  { href: "/behandelingen/guasha", label: "Guasha" },
  { href: "/behandelingen/moxibustie", label: "Moxibustie" },
  { href: "/behandelingen/kruiden", label: "Kruidengeneeskunde" },
] as const;

export const HEADER_LINKS = [
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
] as const;

/** Platte lijst voor mobiel menu (zonder dropdown) */
export const PRIMARY_NAV = [
  { href: "/", label: "Home" },
  { href: "/behandelingen", label: "Behandelingen" },
  ...BEHANDELING_NAV_ITEMS.map((i) => ({ href: i.href, label: i.label })),
  ...HEADER_LINKS,
  { href: SITE.bookingUrl, label: "Maak afspraak" },
] as const;

/** @deprecated Gebruik BEHANDELING_NAV_ITEMS */
export const BEHANDELING_SUBNAV = BEHANDELING_NAV_ITEMS;

export function footerLinksFromPages(pages: WpPage[]) {
  const want = new Set([
    "route",
    "algemene-voorwaarden-en-privacy-beleid",
    "disclaimer",
    "privacy-policy",
  ]);
  return pages.filter((p) => want.has(p.slug));
}
