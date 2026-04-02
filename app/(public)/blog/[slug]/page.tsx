import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogArtikelen } from "@/lib/blog-data";
import { BlogInhoudBody } from "@/lib/blog-render";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogArtikelen.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artikel = blogArtikelen.find((a) => a.slug === slug);
  if (!artikel) return {};
  return {
    title: `${artikel.titel} — Ren Ji Tang`,
    description: artikel.intro,
    alternates: { canonical: `/blog/${artikel.slug}` },
  };
}

export default async function BlogArtikelPage({ params }: Props) {
  const { slug } = await params;
  const artikel = blogArtikelen.find((a) => a.slug === slug);
  if (!artikel) notFound();

  return (
    <main className="min-h-screen bg-[#F9F5EE]">
      <div className="relative min-h-[300px] h-[45vh] overflow-hidden">
        <Image
          src={artikel.afbeelding}
          alt={artikel.titel}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden />
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="mx-auto w-full max-w-3xl px-6">
            <span className="mb-3 block font-lato text-xs uppercase tracking-widest text-[#B8860B]">
              {artikel.categorie}
            </span>
            <h1 className="font-cormorant text-4xl text-white lg:text-5xl">{artikel.titel}</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-10 font-lato text-lg leading-relaxed text-[#5A4E3C]">{artikel.intro}</p>
        <BlogInhoudBody inhoud={artikel.inhoud} />

        <div className="mt-16 rounded-sm bg-[#EDE8DC] p-8 text-center">
          <h2 className="mb-3 font-cormorant text-3xl text-[#1A1208]">Interesse gewekt?</h2>
          <p className="mb-6 font-lato text-[#9E8E75]">Maak een vrijblijvende afspraak bij Ren Ji Tang.</p>
          <Link href="/bookings" className="btn-primary inline-block">
            Maak een afspraak →
          </Link>
        </div>

        <Link
          href="/blog"
          className="mt-8 inline-block font-lato text-sm text-[#3D6B4F] hover:underline"
        >
          ← Terug naar blog
        </Link>
      </div>
    </main>
  );
}
