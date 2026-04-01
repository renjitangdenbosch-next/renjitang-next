import type { WpPage } from "@/types/wordpress";
import { SITE } from "@/lib/site";

/** Vaste hoofdnavigatie (prioriteit boven alle 25 WP-pagina’s) */
export const PRIMARY_NAV = [
  { href: "/", label: "Home" },
  { href: "/acupunctuur", label: "Acupunctuur" },
  { href: "/massage", label: "Massage" },
  { href: "/behandelingen", label: "Behandelingen" },
  { href: "/contact", label: "Contact" },
  { href: SITE.bookingUrl, label: "Boek een afspraak" },
] as const;

/** Secundaire links in footer — subset van WP-routes */
export function footerLinksFromPages(pages: WpPage[]) {
  const want = new Set([
    "route",
    "algemene-voorwaarden-en-privacy-beleid",
    "disclaimer",
    "privacy-policy",
  ]);
  return pages.filter((p) => want.has(p.slug));
}
