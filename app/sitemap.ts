import type { MetadataRoute } from "next";
import { getAllPages } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.renjitang.nl").replace(
    /\/$/,
    ""
  );
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/acupunctuur`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/massage`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/behandelingen`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    {
      url: `${base}/bookings`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const nextAppSlugs = new Set([
    "acupunctuur",
    "massage",
    "contact",
    "behandelingen",
    "bookings",
    "privacy",
  ]);

  let wpRoutes: MetadataRoute.Sitemap = [];
  try {
    const pages = await getAllPages();
    wpRoutes = pages
      .filter((p) => p.slug !== "home" && !nextAppSlugs.has(p.slug))
      .map((p) => ({
        url: `${base}/${p.slug}`,
        lastModified: new Date(p.modified),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    const urls = new Set(wpRoutes.map((r) => r.url));
    const canonicalVergoeding = `${base}/acupunctuur-en-vergoeding-zorgverzekering`;
    if (!urls.has(canonicalVergoeding)) {
      wpRoutes.push({
        url: canonicalVergoeding,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {
    /* WP onbereikbaar tijdens build */
  }

  return [...staticRoutes, ...wpRoutes];
}
