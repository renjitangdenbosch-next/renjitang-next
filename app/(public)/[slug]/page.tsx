import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageLayout } from "@/components/PageLayout";
import { WpContent } from "@/components/WpContent";
import { getAllPages, getPageBySlug, WP_REVALIDATE_SECONDS } from "@/lib/wordpress";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import { heroImageForSlug } from "@/lib/wp-hero-images";

type Props = { params: Promise<{ slug: string }> };

const TYPO_VERGOEDING = "acupuctuur-en-vergoeding-zorgverzekering";
const FIXED_VERGOEDING = "acupunctuur-en-vergoeding-zorgverzekering";

/** Vaste Next-routes; niet opnieuw als [slug] pre-renderen. */
const RESERVED_SLUGS = new Set([
  "acupunctuur",
  "massage",
  "cupping",
  "guasha",
  "contact",
  "behandelingen",
  "over-ons",
  "afspraak",
  "bookings",
  "privacy",
  "cookiebeleid",
  "algemene-voorwaarden",
  "disclaimer",
  "blog",
  "tarieven",
]);

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").slice(0, 160);
}

export async function generateStaticParams() {
  try {
    const pages = await getAllPages();
    return pages
      .filter((p) => p.slug !== "home" && !RESERVED_SLUGS.has(p.slug))
      .map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export const revalidate = WP_REVALIDATE_SECONDS;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "home") return { title: "Home" };
  let page = await getPageBySlug(slug);
  if (!page && slug === FIXED_VERGOEDING) {
    page = await getPageBySlug(TYPO_VERGOEDING);
  }
  if (!page) return { title: "Niet gevonden" };
  const title = page.title.rendered.replace(/<[^>]+>/g, "");
  const desc =
    page.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() ||
    stripTags(page.content.rendered);
  return {
    title,
    description: desc || SITE.shortDescription,
    alternates: { canonical: `/${slug}` },
    openGraph: { title, description: desc },
  };
}

export default async function WpPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "home") redirect("/");

  let page = await getPageBySlug(slug);
  if (!page && slug === FIXED_VERGOEDING) {
    page = await getPageBySlug(TYPO_VERGOEDING);
  }
  if (!page) notFound();

  const title = page.title.rendered.replace(/<[^>]+>/g, "");
  const subtitle =
    page.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim().slice(0, 180) || undefined;

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: title, path: `/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />
      <PageLayout
        title={title}
        subtitle={subtitle}
        heroImage={heroImageForSlug(slug)}
      >
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm sm:p-10 dark:border-stone-700 dark:bg-stone-900/80">
          <WpContent html={page.content.rendered} />
        </div>
      </PageLayout>
    </>
  );
}
