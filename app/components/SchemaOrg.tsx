const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.renjitang.nl").replace(
  /\/$/,
  ""
);

export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Ren Ji Tang",
    alternateName: ["仁济堂", "Ren Ji Tang Den Bosch"],
    description:
      "Traditionele Chinese Geneeskunde praktijk in 's-Hertogenbosch. Acupunctuur, cupping, tuina-massage, moxibustie en kruidengeneeskunde. Erkend door alle grote zorgverzekeraars.",
    url: baseUrl,
    telephone: "073 211 02 24",
    email: "info@renjitang.nl",
    foundingDate: "2022",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hazenburgstede 7",
      postalCode: "5235 HR",
      addressLocality: "'s-Hertogenbosch",
      addressRegion: "Noord-Brabant",
      addressCountry: "NL",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "25",
      bestRating: "5",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    priceRange: "€65-€85",
    medicalSpecialty: "Acupuncture",
    availableLanguage: ["Dutch", "Chinese"],
    knowsAbout: [
      "Acupunctuur",
      "Traditionele Chinese Geneeskunde",
      "Cupping",
      "Tuina massage",
      "Moxibustie",
      "Guasha",
      "Kruidengeneeskunde",
      "Burn-out behandeling",
      "Stress behandeling",
      "Vruchtbaarheid",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Behandelingen Ren Ji Tang",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalTherapy",
            name: "Acupunctuur intake",
            description: "Uitgebreide intake en eerste behandeling TCG",
          },
          price: "85",
          priceCurrency: "EUR",
          eligibleDuration: {
            "@type": "QuantitativeValue",
            value: 90,
            unitCode: "MIN",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalTherapy",
            name: "Acupunctuur vervolgbehandeling",
          },
          price: "65",
          priceCurrency: "EUR",
          eligibleDuration: {
            "@type": "QuantitativeValue",
            value: 60,
            unitCode: "MIN",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalTherapy",
            name: "Cupping",
          },
          price: "65",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalTherapy",
            name: "Tuina-massage therapeutisch",
          },
          price: "65",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalTherapy",
            name: "Guasha",
          },
          price: "65",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalTherapy",
            name: "Moxibustie",
          },
          price: "65",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalTherapy",
            name: "Kruidengeneeskunde consult",
          },
          price: "65",
          priceCurrency: "EUR",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
