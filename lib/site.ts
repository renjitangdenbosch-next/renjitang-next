/** Bedrijfsgegevens voor copy, JSON-LD en llms.txt */
export const SITE = {
  name: "Ren Ji Tang",
  shortDescription:
    "Acupunctuur en Traditionele Chinese Geneeskunde (TCG) in 's-Hertogenbosch (Den Bosch).",
  city: "'s-Hertogenbosch",
  region: "Noord-Brabant",
  country: "NL",
  streetAddress: "Hazenburgstede 7",
  postalCode: "5235 HR",
  email: "info@renjitang.nl",
  phone: "073 211 02 24",
  phoneTel: "+31732110224",
  /** Schema.org openingstijden — maandag gesloten */
  openingHoursSpecification: [
    {
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"] as const,
      opens: "09:00",
      closes: "20:00",
    },
    {
      dayOfWeek: ["Saturday", "Sunday"] as const,
      opens: "09:00",
      closes: "17:00",
    },
  ],
  /** Eenvoudige aanvraagpagina */
  bookingUrl: "/bookings",
  /** Uitgebreide online agenda */
  bookingWizardUrl: "/bookings",
} as const;

export type SiteService = {
  id: string;
  naam: string;
  naamCN: string;
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
    naamCN: "针灸初诊",
    duur: 15,
    prijs: 50,
    beschrijving: "Kennismakingsgesprek voor acupunctuur.",
  },
  {
    id: "acupunctuur-vervolg",
    naam: "Acupunctuur Vervolgbehandeling",
    naamCN: "针灸复诊",
    duur: 60,
    prijs: 60,
    beschrijving: "Vervolgbehandeling acupunctuur.",
  },
  {
    id: "intake-plus-behandeling",
    naam: "Intake + Acupunctuur Behandeling",
    naamCN: "初诊+针灸治疗",
    duur: 70,
    prijs: 80,
    beschrijving: "30 min intake + 40 min behandeling.",
  },
  {
    id: "tuina-30",
    naam: "Tuina Massage 30 min",
    naamCN: "推拿按摩 30分钟",
    duur: 30,
    prijs: 40,
    beschrijving: "Traditionele Chinese massage.",
  },
  {
    id: "tuina-60",
    naam: "Tuina Massage 60 min",
    naamCN: "推拿按摩 60分钟",
    duur: 60,
    prijs: 60,
    beschrijving: "Uitgebreide Tuina massage.",
  },
  {
    id: "guasha",
    naam: "Guasha Massage",
    naamCN: "刮痧",
    duur: 30,
    prijs: 40,
    beschrijving: "Traditionele Chinese therapie.",
  },
  {
    id: "cupping",
    naam: "Cupping Behandeling",
    naamCN: "拔罐",
    duur: 30,
    prijs: 40,
    beschrijving: "Cups op de huid voor betere doorbloeding.",
  },
  {
    id: "ontspanningsmassage",
    naam: "Ontspanningsmassage",
    naamCN: "放松按摩",
    duur: 60,
    prijs: 60,
    beschrijving: "Ontspannende massage voor lichaam en geest.",
  },
];
