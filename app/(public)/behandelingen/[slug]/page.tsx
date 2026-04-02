import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BehandelingDetailView } from "@/components/behandelingen/BehandelingDetailView";
import {
  BEHANDELING_DETAILS,
  BEHANDELING_SLUGS,
  isBehandelingSlug,
} from "@/lib/behandelingen-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BEHANDELING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isBehandelingSlug(slug)) return { title: "Behandeling" };
  const d = BEHANDELING_DETAILS[slug];
  return {
    title: `${d.naam} in 's-Hertogenbosch — Ren Ji Tang`,
    description: d.seoTekst,
    alternates: { canonical: `/behandelingen/${slug}` },
  };
}

export default async function BehandelingSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!isBehandelingSlug(slug)) notFound();
  const data = BEHANDELING_DETAILS[slug];
  return <BehandelingDetailView data={data} />;
}
