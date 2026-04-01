/** Bedrijfsgegevens voor copy, JSON-LD en llms.txt */
export const SITE = {
  name: "Ren Ji Tang",
  shortDescription:
    "Acupunctuur en Traditionele Chinese Geneeskunde (TCG) in 's-Hertogenbosch (Den Bosch).",
  city: "'s-Hertogenbosch",
  region: "Noord-Brabant",
  country: "NL",
  email: "info@renjitang.nl",
  phone: "073 211 02 24",
  phoneTel: "+31732110224",
  openingHoursSpecification: [
    {
      dayOfWeek: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  /** Interne boekingspagina */
  bookingUrl: "/bookings",
} as const;

export type SiteService = {
  id: string;
  naam: string;
  duur: number;
  prijs: number;
  beschrijving: string;
};

/** Oude site-/exportnamen (lowercase) → huidige service-id */
export const LEGACY_SERVICE_ID_MAP: Record<string, string> = {
  acupunctuur: "acupunctuur-vervolg",
  cupping: "cupping",
  tuina: "tuina-60",
  "tuina-massage": "tuina-60",
  massage: "ontspanningsmassage",
  ontspanningsmassage: "ontspanningsmassage",
};

export const SERVICES: SiteService[] = [
  {
    id: "intake-acupunctuur",
    naam: "Intake Acupunctuur",
    duur: 15,
    prijs: 50,
    beschrijving: "Kennismakingsgesprek voor acupunctuur.",
  },
  {
    id: "acupunctuur-vervolg",
    naam: "Acupunctuur Vervolgbehandeling",
    duur: 60,
    prijs: 60,
    beschrijving: "Vervolgbehandeling acupunctuur.",
  },
  {
    id: "intake-plus-behandeling",
    naam: "Intake + Acupunctuur Behandeling",
    duur: 70,
    prijs: 80,
    beschrijving: "30 min intake + 40 min behandeling.",
  },
  {
    id: "tuina-30",
    naam: "Tuina Massage 30 min",
    duur: 30,
    prijs: 40,
    beschrijving: "Traditionele Chinese massage.",
  },
  {
    id: "tuina-60",
    naam: "Tuina Massage 60 min",
    duur: 60,
    prijs: 60,
    beschrijving: "Uitgebreide Tuina massage.",
  },
  {
    id: "guasha",
    naam: "Guasha Massage",
    duur: 30,
    prijs: 40,
    beschrijving: "Traditionele Chinese therapie.",
  },
  {
    id: "cupping",
    naam: "Cupping Behandeling",
    duur: 30,
    prijs: 40,
    beschrijving: "Cups op de huid voor betere doorbloeding.",
  },
  {
    id: "ontspanningsmassage",
    naam: "Ontspanningsmassage",
    duur: 60,
    prijs: 60,
    beschrijving: "Ontspannende massage voor lichaam en geest.",
  },
];
