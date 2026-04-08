import type { MetadataRoute } from "next";
import { blogArtikelen } from "@/lib/blog-data";
import { klachtenSitemapPaths } from "@/lib/klachten-data";

const staticPaths = [
  "/",
  "/behandelingen",
  "/behandelingen/acupunctuur",
  "/behandelingen/massage",
  "/behandelingen/cupping",
  "/behandelingen/guasha",
  "/behandelingen/moxibustie",
  "/behandelingen/kruiden",
  "/over-ons",
  "/tarieven",
  "/zorgverzekering",
  "/locatie",
  "/eerste-bezoek",
  "/klachten",
  "/faq",
  "/diplomas-en-registraties",
  "/cadeaubon",
  "/acupunctuur-zwangerschap",
  "/acupunctuur-stress-burnout",
  "/blog",
  "/contact",
  "/bookings",
  "/privacy",
  "/disclaimer",
  "/cookiebeleid",
  ...klachtenSitemapPaths,
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.renjitang.nl").replace(
    /\/$/,
    ""
  );
  const lastModified = new Date();

  function entryForPath(path: (typeof staticPaths)[number]): MetadataRoute.Sitemap[number] {
    const url = path === "/" ? base : `${base}${path}`;

    if (path === "/") {
      return { url, lastModified, changeFrequency: "weekly", priority: 1 };
    }
    if (path === "/behandelingen") {
      return { url, lastModified, changeFrequency: "monthly", priority: 0.9 };
    }
    if (path === "/behandelingen/acupunctuur") {
      return { url, lastModified, changeFrequency: "monthly", priority: 0.9 };
    }
    if (path.startsWith("/behandelingen/")) {
      return { url, lastModified, changeFrequency: "monthly", priority: 0.8 };
    }
    if (path === "/bookings") {
      return { url, lastModified, changeFrequency: "weekly", priority: 0.9 };
    }
    if (path === "/blog") {
      return { url, lastModified, changeFrequency: "weekly", priority: 0.7 };
    }
    if (path === "/tarieven" || path === "/zorgverzekering" || path === "/over-ons") {
      return { url, lastModified, changeFrequency: "monthly", priority: 0.7 };
    }
    if (path === "/klachten") {
      return { url, lastModified, changeFrequency: "monthly", priority: 0.78 };
    }
    if (path.startsWith("/klachten/")) {
      return { url, lastModified, changeFrequency: "monthly", priority: 0.72 };
    }
    if (
      path === "/locatie" ||
      path === "/eerste-bezoek" ||
      path === "/faq" ||
      path === "/diplomas-en-registraties" ||
      path === "/cadeaubon" ||
      path === "/acupunctuur-zwangerschap" ||
      path === "/acupunctuur-stress-burnout"
    ) {
      return { url, lastModified, changeFrequency: "monthly", priority: 0.72 };
    }
    if (path === "/contact") {
      return { url, lastModified, changeFrequency: "monthly", priority: 0.6 };
    }
    if (path === "/privacy" || path === "/disclaimer" || path === "/cookiebeleid") {
      return { url, lastModified, changeFrequency: "yearly", priority: 0.3 };
    }
    return { url, lastModified, changeFrequency: "monthly", priority: 0.75 };
  }

  const staticRoutes = staticPaths.map(entryForPath);

  const blogRoutes: MetadataRoute.Sitemap = blogArtikelen.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: a.sitemapPriority ?? 0.65,
  }));

  return [...staticRoutes, ...blogRoutes];
}
