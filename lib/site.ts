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
    { dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "20:00" },
  ],
  /** Interne boekingspagina */
  bookingUrl: "/bookings",
} as const;

export const SERVICES = [
  {
    id: "Acupunctuur",
    title: "Acupunctuur",
    short: "Behandeling via meridianen en balans van Qi.",
    description:
      "In de acupunctuur wordt uw hele lichaam én geest meegenomen. Klachten worden in TCG-verband gezien, niet geïsoleerd.",
    priceEur: 65,
    durationMin: 60,
  },
  {
    id: "Cupping",
    title: "Cupping",
    short: "Ondersteuning bij afvoer en doorstroming van energie.",
    description:
      "Tijdens cupping worden afvalstoffen en stagnatie aangepakt; veel cliënten ervaren verlichting en meer ruimte in het lichaam.",
    priceEur: 45,
    durationMin: 30,
  },
  {
    id: "Tuina",
    title: "Tuina-massage",
    short: "Therapeutische massage op basis van TCG.",
    description:
      "Tuina brengt energie in balans met gerichte technieken die lichaam en geest ondersteunen.",
    priceEur: 70,
    durationMin: 60,
  },
  {
    id: "Massage",
    title: "Ontspanningsmassage",
    short: "Zachte, rustige massage voor spieren en geest.",
    description:
      "Een ontspanningsmassage helpt spieren los te laten en mentaal tot rust te komen — passend naast medische zorg.",
    priceEur: 55,
    durationMin: 60,
  },
] as const;
