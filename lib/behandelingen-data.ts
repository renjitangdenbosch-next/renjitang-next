/** Vaste behandelingen — alleen Nederlandse UI; geen Chinese tekst in content. */

export const BEHANDELING_SLUGS = [
  "acupunctuur",
  "massage",
  "cupping",
  "guasha",
  "moxibustie",
  "kruiden",
] as const;

export type BehandelingSlug = (typeof BEHANDELING_SLUGS)[number];

export function isBehandelingSlug(s: string): s is BehandelingSlug {
  return (BEHANDELING_SLUGS as readonly string[]).includes(s);
}

export type BehandelingHomeCard = {
  slug: BehandelingSlug;
  naam: string;
  beschrijving: string;
  image: string;
};

/** Homepage grid — hero-beelden per behandeling (vlam alleen op homepage Hero.tsx) */
export const BEHANDELING_HOME_CARDS: BehandelingHomeCard[] = [
  {
    slug: "acupunctuur",
    naam: "Acupunctuur",
    beschrijving:
      "Fijne naaldjes op zorgvuldig gekozen punten ter ondersteuning van herstel en balans.",
    image: "/images/hero_acupunctuur_handen.jpg",
  },
  {
    slug: "massage",
    naam: "Tuina massage",
    beschrijving:
      "Traditionele Chinese therapeutische massage: spanning loslaten en doorstroming verbeteren.",
    image: "/images/hero_2_massage.jpg",
  },
  {
    slug: "cupping",
    naam: "Cupping",
    beschrijving:
      "Vacuümbekkens op de huid voor doorbloeding, ontspanning en loslaten van vastzittende zones.",
    image: "/images/hero_4_cupping.jpg",
  },
  {
    slug: "guasha",
    naam: "Guasha",
    beschrijving:
      "Zachte schraaptechniek langs meridianen om stagnatie te verminderen en het lichaam te verlichten.",
    image: "/images/hero_5_guasha.jpg",
  },
  {
    slug: "moxibustie",
    naam: "Moxibustie",
    beschrijving:
      "Warmte bij acupunctuurpunten met verwarmde moxa — versterkend en diep ontspannend.",
    image: "/images/hero_3_acupunctuur.jpg",
  },
  {
    slug: "kruiden",
    naam: "Kruidengeneeskunde",
    beschrijving:
      "Individueel samengestelde kruidenformules die uw behandeling aanvullen.",
    image: "/images/hero_kruiden.png",
  },
];

export type BehandelingDetail = {
  slug: BehandelingSlug;
  naam: string;
  karakterCN: string;
  heroImage: string;
  intro: [string, string];
  splitImage: string;
  splitTitle: string;
  splitBody: string;
  klachten: string[];
  stappen: string[];
  seoTekst: string;
};

export const BEHANDELING_DETAILS: Record<BehandelingSlug, BehandelingDetail> = {
  acupunctuur: {
    slug: "acupunctuur",
    naam: "Acupunctuur",
    karakterCN: "針",
    heroImage: "/images/hero_acupunctuur_handen.jpg",
    intro: [
      "Acupunctuur werkt met dunne, steriele naalden op specifieke punten van het lichaam. Zo wordt de natuurlijke balans en energiestroom ondersteund — zacht, gericht en evidence-informed binnen traditionele Chinese geneeskunde.",
      "Tijdens het consult kijken we naar uw klacht, uw algemene conditie en wat u nodig heeft. Geen standaardprotocol, maar een aanpak op maat in een rustige behandelruimte.",
    ],
    splitImage: "/images/acupunctuur-2.jpg",
    splitTitle: "Waarom acupunctuur?",
    splitBody:
      "Veel mensen merken verlichting van pijn, stress en slaapproblemen. De behandeling is geschikt als aanvulling op reguliere zorg en wordt door veel zorgverzekeraars (deels) vergoed — informeer bij uw polis.",
    klachten: [
      "Stress, spanning en burn-out-klachten",
      "Rug-, nek- en schouderklachten",
      "Hoofdpijn en migraine",
      "Slaapproblemen",
      "Vrouwengezondheid en hormonale balans",
      "Spijsvertering en vermoeidheid",
      "Ondersteuning bij herstel na blessure",
    ],
    stappen: [
      "Intake: we bespreken uw klacht, medische voorgeschiedenis en doelen.",
      "Diagnose vanuit TCM: tong- en polsbeoordeling waar passend.",
      "Behandeling: naaldplaatsing met ruimte om te ontspannen.",
      "Advies: eventueel aanvullende tips of vervolgafspraken.",
    ],
    seoTekst:
      "Acupunctuur in 's-Hertogenbosch bij erkende TCM-praktijk Ren Ji Tang. Effectief bij pijn, stress, slaapproblemen en meer. Vergoed door zorgverzekeraar.",
  },
  massage: {
    slug: "massage",
    naam: "Tuina massage",
    karakterCN: "按",
    heroImage: "/images/hero_2_massage.jpg",
    intro: [
      "Tuina is een therapeutische massagevorm uit China. Met gerichte technieken worden spieren, gewrichten en meridianen benaderd om blokkades te verminderen en het lichaam soepeler te maken.",
      "De druk wordt afgestemd op uw wensen — van stevig tot zacht — zodat u zich veilig en gehoord voelt.",
    ],
    splitImage: "/images/massage2.jpg",
    splitTitle: "Wanneer Tuina?",
    splitBody:
      "Geschikt bij vastzittende spieren, spanning door werk of sport, en als onderdeel van een breder hersteltraject naast acupunctuur of cupping.",
    klachten: [
      "Spierspanning en stijfheid",
      "Sportblessures en overbelasting",
      "Stressgerelateerde lichamelijke klachten",
      "Hoofd- en nekklachten",
      "Beperkte beweeglijkheid",
    ],
    stappen: [
      "Korte afstemming: waar zit de spanning en wat voelt u?",
      "Behandeling op bank of stoel, afhankelijk van de techniek.",
      "Nazorg: tips voor thuis of vervolg.",
    ],
    seoTekst:
      "Tuina massage in 's-Hertogenbosch. Traditionele Chinese therapeutische massage voor ontspanning en pijnverlichting. Erkende TCM-praktijk.",
  },
  cupping: {
    slug: "cupping",
    naam: "Cupping",
    karakterCN: "拔",
    heroImage: "/images/hero_cupping_real.jpg",
    intro: [
      "Cupping gebruikt zacht vacuüm op de huid om doorbloeding en ontspanning te bevorderen. Het is een klassieke techniek binnen TCM, vaak gecombineerd met massage of acupunctuur.",
      "De typische cirkels verdwijnen na enkele dagen; ze zijn onschuldig en horen bij het proces.",
    ],
    splitImage: "/images/cupping.jpg",
    splitTitle: "Effect en beleving",
    splitBody:
      "Veel mensen ervaren direct meer ruimte in schouders en rug. De behandeling duurt meestal dertig minuten en wordt altijd in overleg met u toegepast.",
    klachten: [
      "Vastzittende schouders en bovenrug",
      "Spanning na zittend werk",
      "Ondersteuning bij sportherstel",
      "Luchtige gevoelens van “zwaarte” in het lichaam",
    ],
    stappen: [
      "Warm-up van de huid en uitleg van de werking.",
      "Plaatsen van de cups met controleerbare zuigkracht.",
      "Rustmoment en evaluatie.",
    ],
    seoTekst:
      "Cupping therapie in 's-Hertogenbosch bij Ren Ji Tang. Fire cupping voor rugpijn, spierspanning en doorbloeding. Erkend door Zhong.",
  },
  guasha: {
    slug: "guasha",
    naam: "Guasha",
    karakterCN: "刮",
    heroImage: "/images/hero_5_guasha.jpg",
    intro: [
      "Guasha betekent schrapen met een glad instrument over de huid, met olie als buffer. Het activeert de microcirculatie en kan verlichting geven bij spanning en stagnatie.",
      "De huid kan licht rood kleuren (sha); dat trekt binnen enkele dagen weg.",
    ],
    splitImage: "/images/hero_5_guasha.jpg",
    splitTitle: "Voor wie?",
    splitBody:
      "Geschikt bij nek- en schouderklachten, spanningshoofdpijn en wanneer u een lichte, verfrissende behandeling zoekt naast andere TCM-technieken.",
    klachten: [
      "Nek- en schouder spanning",
      "Beginnende verkoudheidsklachten (in overleg)",
      "Spanningshoofdpijn",
      "Algemene voorkeur voor manuele technieken",
    ],
    stappen: [
      "Huid voorbereiden met warmte of olie.",
      "Gecontroleerde strijkbewegingen langs meridianen.",
      "Nazorg en hydratatie.",
    ],
    seoTekst:
      "Guasha behandeling in 's-Hertogenbosch. Schraaptechniek voor spierklachten en energie. Traditionele Chinese Geneeskunde.",
  },
  moxibustie: {
    slug: "moxibustie",
    naam: "Moxibustie",
    karakterCN: "灸",
    heroImage: "/images/hero_3_acupunctuur.jpg",
    intro: [
      "Moxibustie werkt met gerichte warmte, meestal van verwarmde moxa (Artemisia), nabij acupunctuurpunten. Warmte wordt diep ervaren en ondersteunt energie en circulatie.",
      "We stemmen intensiteit en duur af op uw huidtype en comfort.",
    ],
    splitImage: "/images/acupunctuur-2.jpg",
    splitTitle: "Traditie en comfort",
    splitBody:
      "Vaak gecombineerd met acupunctuur bij kou-voorkeur, vermoeidheid of herstel. U blijft de controle houden over de warmte-ervaring.",
    klachten: [
      "Kou-gevoel en vermoeidheid",
      "Ondersteuning bij spijsvertering (in TCM-verband)",
      "Herstel na ziekte of uitputting",
      "Aanvulling op acupunctuurbehandeling",
    ],
    stappen: [
      "Veiligheidscheck en uitleg.",
      "Warmtetoepassing op gekozen punten.",
      "Evaluatie en rust.",
    ],
    seoTekst:
      "Moxibustie in 's-Hertogenbosch. Warmtebehandeling met moxa bij koude klachten, vermoeidheid en lage weerstand. TCM-praktijk Ren Ji Tang.",
  },
  kruiden: {
    slug: "kruiden",
    naam: "Kruidengeneeskunde",
    karakterCN: "藥",
    heroImage: "/images/hero_kruiden.png",
    intro: [
      "Kruidenformules worden in de TCM zorgvuldig samengesteld — niet één kruid, maar een balanced combinatie die bij uw patroon past.",
      "Wij werken met gecontroleerde kwaliteit en geven duidelijke instructies voor gebruik.",
    ],
    splitImage: "/images/hero_2_massage.jpg",
    splitTitle: "Individueel samengesteld",
    splitBody:
      "Kruiden zijn een aanvulling op acupunctuur of massage, nooit een vervanging van medisch advies van uw huisarts of specialist.",
    klachten: [
      "Ondersteuning bij langdurige klachtenpatronen",
      "Aanvulling op acupunctuurtraject",
      "Slaap, stress en vermoeidheid (in overleg)",
    ],
    stappen: [
      "Analyse vanuit TCM tijdens het consult.",
      "Formulekeuze en uitleg over inname.",
      "Vervolg en bijstelling waar nodig.",
    ],
    seoTekst:
      "Chinese kruidengeneeskunde in 's-Hertogenbosch. Gepersonaliseerde kruidenformules op basis van uw klachtenpatroon. Erkende TCM-praktijk.",
  },
};

export const AFSPRAAK_BEHANDEL_OPTIES = BEHANDELING_HOME_CARDS.map((c) => ({
  value: c.slug,
  label: c.naam,
}));
