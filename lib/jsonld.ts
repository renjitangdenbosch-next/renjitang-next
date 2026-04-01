import { SITE, SERVICES } from "@/lib/site";

const siteUrl = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || "https://www.renjitang.nl").replace(
    /\/$/,
    ""
  );

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${siteUrl()}/#business`,
    name: SITE.name,
    description: SITE.shortDescription,
    url: siteUrl(),
    email: SITE.email,
    telephone: SITE.phoneTel,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    openingHoursSpecification: SITE.openingHoursSpecification.map((o) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: o.dayOfWeek,
      opens: o.opens,
      closes: o.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Behandelingen TCG",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          areaServed: { "@type": "City", name: SITE.city },
        },
        position: i + 1,
      })),
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl()}${it.path.startsWith("/") ? it.path : `/${it.path}`}`,
    })),
  };
}
