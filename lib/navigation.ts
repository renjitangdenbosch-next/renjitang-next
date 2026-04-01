import type { WpPage } from "@/types/wordpress";
import { SITE } from "@/lib/site";

/** Vaste hoofdnavigatie (prioriteit boven alle 25 WP-pagina’s) */
export const PRIMARY_NAV = [
  { href: "/", label: "Home", labelZh: "首页" },
  { href: "/acupunctuur", label: "Acupunctuur", labelZh: "针灸" },
  { href: "/massage", label: "Massage", labelZh: "按摩" },
  { href: "/behandelingen", label: "Behandelingen", labelZh: "治疗项目" },
  { href: "/contact", label: "Contact", labelZh: "联系我们" },
  { href: SITE.bookingUrl, label: "Boek een afspraak", labelZh: "预约挂号" },
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
