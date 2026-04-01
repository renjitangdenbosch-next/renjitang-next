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
    id: "acupunctuur-intake",
    naam: "Intake Acupunctuur",
    duur: 15,
    prijs: 50,
    beschrijving:
      "Intake gesprek voor acupunctuur. Kennismaking en analyse van uw klachten.",
  },
  {
    id: "acupunctuur-vervolg",
    naam: "Acupunctuur Vervolgbehandeling",
    duur: 60,
    prijs: 60,
    beschrijving:
      "Vervolgafspraak met naaldzetting en evaluatie van uw traject.",
  },
  {
    id: "intake-plus-behandeling",
    naam: "Intake + Acupunctuur Behandeling",
    duur: 70,
    prijs: 80,
    beschrijving:
      "Intake gesprek direct gevolgd door eerste acupunctuurbehandeling. 30 min intake + 40 min behandeling.",
  },
  {
    id: "tuina-30",
    naam: "Tuina Massage",
    duur: 30,
    prijs: 40,
    beschrijving:
      "Traditionele Chinese massage gericht op het opheffen van blokkades en verbeteren van de energiestroom.",
  },
  {
    id: "tuina-60",
    naam: "Tuina Massage",
    duur: 60,
    prijs: 60,
    beschrijving:
      "Uitgebreide Tuina massage voor diepgaande ontspanning en behandeling van klachten.",
  },
  {
    id: "guasha",
    naam: "Guasha Massage",
    duur: 30,
    prijs: 40,
    beschrijving:
      "Traditionele Chinese therapie waarbij de huid wordt gestimuleerd met een speciaal instrument voor betere circulatie.",
  },
  {
    id: "cupping",
    naam: "Cupping Behandeling",
    duur: 30,
    prijs: 40,
    beschrijving:
      "Cups op de huid stimuleren de doorbloeding, lossen verklevingen op en voeren afvalstoffen af.",
  },
  {
    id: "ontspanningsmassage",
    naam: "Ontspanningsmassage",
    duur: 60,
    prijs: 60,
    beschrijving:
      "Zachte massage voor diepe ontspanning van lichaam en geest. Vermindert stress en verbetert de slaapkwaliteit.",
  },
];
