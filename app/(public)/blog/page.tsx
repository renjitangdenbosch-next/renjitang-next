import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogArtikelen } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog — Ren Ji Tang | TCM kennis en inzichten",
  description:
    "Lees meer over acupunctuur, cupping, massage en traditionele Chinese geneeskunde.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#F4FAF0] py-20">
      <div className="mx-auto max-w-5xl px-6">
        <span className="mb-4 block text-center font-lato text-xs uppercase tracking-[0.2em] text-[#4A9E4A]">
          Kennis &amp; Inzichten
        </span>
        <h1 className="mb-16 text-center font-cormorant text-5xl text-[#1A2E1A]">Blog</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {blogArtikelen.map((artikel) => (
            <Link
              key={artikel.slug}
              href={`/blog/${artikel.slug}`}
              className="group overflow-hidden rounded-sm border border-stone-200/80 bg-white transition-shadow hover:shadow-md"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={artikel.afbeelding}
                  alt={artikel.titel}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="mb-2 block font-lato text-xs uppercase tracking-widest text-[#4A9E4A]">
                  {artikel.categorie}
                </span>
                <h2 className="mb-2 font-cormorant text-xl text-[#1A2E1A] transition-colors group-hover:text-[#C0392B]">
                  {artikel.titel}
                </h2>
                <p className="line-clamp-2 font-lato text-sm text-[#6B8C6B]">{artikel.intro}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
