import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InfoPageLayout } from "@/components/layout/InfoPageLayout";
import { getKlachtBySlug, klachtenPages } from "@/lib/klachten-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return klachtenPages.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getKlachtBySlug(slug);
  if (!page) return { title: "Niet gevonden" };
  return {
    title: `${page.title} | Ren Ji Tang`,
    description: page.metaDescription,
    alternates: { canonical: `/klachten/${page.slug}` },
  };
}

export default async function KlachtDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getKlachtBySlug(slug);
  if (!page) notFound();

  return (
    <InfoPageLayout
      heroSrc={page.heroImage}
      heroAlt={page.heroAlt}
      eyebrow="Klachten"
      title={page.title.split(" — ")[0]}
      intro={page.intro}
    >
      <p className="font-lato text-sm text-[#6B8C6B]">
        <Link href="/klachten" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          ← Alle klachten &amp; aandoeningen
        </Link>
      </p>

      <div className="mt-10 space-y-10">
        {page.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-cormorant text-2xl text-[#1A2E1A]">{s.heading}</h2>
            <div className="mt-4 space-y-3">
              {s.paragraphs.map((p, i) => (
                <p key={`${s.heading}-${i}`} className="font-lato leading-relaxed text-[#1A2E1A]/88">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-12 font-lato text-sm text-[#6B8C6B]">
        Behandelingen:{" "}
        <Link href="/behandelingen/acupunctuur" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          acupunctuur
        </Link>
        ,{" "}
        <Link href="/behandelingen/massage" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          massage
        </Link>
        ,{" "}
        <Link href="/faq" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
          FAQ
        </Link>
        .
      </p>
    </InfoPageLayout>
  );
}
