import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArtikelHero } from "@/components/blog/BlogArtikelHero";
import { blogArtikelen } from "@/lib/blog-data";
import { SITE } from "@/lib/site";
import { BlogInhoudBody } from "@/lib/blog-render";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogArtikelen.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artikel = blogArtikelen.find((a) => a.slug === slug);
  if (!artikel) return {};
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.renjitang.nl").replace(/\/$/, "");
  const titleAbsolute = artikel.metaTitle ?? `${artikel.titel} — Ren Ji Tang`;
  return {
    title: { absolute: titleAbsolute },
    description: artikel.metaDescription ?? artikel.intro,
    alternates: { canonical: `${base}/blog/${artikel.slug}` },
  };
}

export default async function BlogArtikelPage({ params }: Props) {
  const { slug } = await params;
  const artikel = blogArtikelen.find((a) => a.slug === slug);
  if (!artikel) notFound();

  return (
    <main className="min-h-screen bg-[#F4FAF0]">
      <BlogArtikelHero
        afbeelding={artikel.afbeelding}
        titel={artikel.titel}
        categorie={artikel.categorie}
      />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-10 font-lato text-lg leading-relaxed text-[#3D5C3D]">{artikel.intro}</p>
        <BlogInhoudBody inhoud={artikel.inhoud} />

        <div className="mt-16 rounded-sm bg-[#EDE8DC] p-8 text-center">
          <h2 className="mb-3 font-cormorant text-3xl text-[#1A2E1A]">Interesse gewekt?</h2>
          <p className="mb-6 font-lato text-[#6B8C6B]">Maak een vrijblijvende afspraak bij Ren Ji Tang.</p>
          <Link href={SITE.bookingUrl} className="btn-primary inline-block">
            Maak een afspraak →
          </Link>
        </div>

        <Link
          href="/blog"
          className="mt-8 inline-block font-lato text-sm text-[#4A9E4A] hover:underline"
        >
          ← Terug naar blog
        </Link>
      </div>
    </main>
  );
}
