export type BlogArtikel = {
  slug: string;
  titel: string;
  categorie: string;
  intro: string;
  afbeelding: string;
  datum: string;
  inhoud: string;
  /** Optioneel: exacte meta title (zonder layout-template). */
  metaTitle?: string;
  /** Optioneel: meta description; anders wordt intro gebruikt. */
  metaDescription?: string;
  /** Optioneel: sitemap-priority (default 0,65 in sitemap.ts). */
  sitemapPriority?: number;
};

export const blogArtikelen: BlogArtikel[] = [
  {
    slug: "wat-is-acupunctuur",
    titel: "Wat is acupunctuur en hoe werkt het?",
    categorie: "Acupunctuur",
    intro:
      "Acupunctuur is een van de oudste geneeswijzen ter wereld. Met dunne naalden op specifieke punten stimuleren we het zelfherstellend vermogen van het lichaam.",
    afbeelding: "/images/hero_3_acupunctuur.jpg",
    datum: "2025-03-01",
    inhoud: `
Acupunctuur is een behandelmethode uit de Traditionele Chinese Geneeskunde (TCG) die al meer dan 3000 jaar wordt toegepast. Door het plaatsen van dunne, steriele naalden op specifieke punten in het lichaam — de zogenaamde acupunctuurpunten — wordt de energiestroom (Qi) gestimuleerd en hersteld.

## Hoe werkt acupunctuur?

Volgens de TCG stroomt er door ons lichaam energie via meridianen — onzichtbare kanalen die organen en lichaamsdelen met elkaar verbinden. Als deze energiestroom geblokkeerd of verstoord raakt, kunnen klachten ontstaan. Acupunctuur helpt deze blokkades op te heffen.

Vanuit westerse wetenschap wordt acupunctuur verklaard door de stimulering van het zenuwstelsel, het vrijkomen van endorfines en het verbeteren van de doorbloeding.

## Voor welke klachten?

- Chronische en acute pijn (rug, nek, schouders)
- Hoofdpijn en migraine
- Stress en burn-out
- Slaapproblemen
- Spijsverteringsklachten
- Vruchtbaarheidsproblemen

## Wat kun je verwachten bij een behandeling?

Een eerste consult bij Ren Ji Tang duurt ongeveer 60 minuten. De acupuncturist stelt uitgebreide vragen over uw gezondheid, levensstijl en klachten. Daarna volgt de behandeling waarbij 5 tot 20 naalden worden geplaatst op specifieke punten.

De naalden zijn zeer dun — dunner dan een haar — en het inbrengen voelt voor de meeste mensen nauwelijks. Tijdens de behandeling ervaren velen een gevoel van diepe ontspanning.
    `.trim(),
  },
  {
    slug: "cupping-bij-rugpijn",
    titel: "Cupping bij rugpijn — wat kun je verwachten?",
    categorie: "Cupping",
    intro:
      "Cupping is een eeuwenoude techniek waarbij glazen koppen op de huid worden geplaatst. Het bevordert de doorbloeding en verlicht spierspanning, ook bij hardnekkige rugpijn.",
    afbeelding: "/images/hero_4_cupping.jpg",
    datum: "2025-03-15",
    inhoud: `
Cupping of ventosa is een behandeltechniek waarbij glazen of plastic koppen op de huid worden geplaatst, waardoor onderdruk (vacuüm) ontstaat. Deze techniek wordt al eeuwenlang gebruikt in de Traditionele Chinese Geneeskunde.

## Hoe werkt cupping?

Bij fire cupping — de traditionele methode die wij bij Ren Ji Tang toepassen — wordt een vlam kort in de glazen kop gehouden om de lucht eruit te trekken. Vervolgens wordt de kop snel op de huid geplaatst. Het vacuüm trekt de huid omhoog en bevordert de doorbloeding in de diepere spierlagen.

## Cupping bij rugpijn

Rugpijn is een van de meest voorkomende klachten waarvoor mensen cupping laten toepassen. De behandeling:

- Lost spierspanning en verklevingen op
- Verbetert de doorbloeding in de rug
- Vermindert ontstekingen
- Geeft direct verlichting bij acute pijn

## De rode cirkels — wat zijn dat?

Na een cuppingbehandeling zijn er vaak ronde rode of paarse vlekken zichtbaar op de huid. Dit zijn geen blauwe plekken maar een teken dat er stagnatie (opgesloten bloed en gifstoffen) is losgemaakt. Ze verdwijnen na 3 tot 7 dagen.

## Hoeveel sessies heb je nodig?

Dit verschilt per persoon en per klacht. Bij chronische rugpijn adviseren wij gemiddeld 5 tot 8 behandelingen, eens per week of eens per twee weken.
    `.trim(),
  },
  {
    slug: "tcm-in-den-bosch",
    titel: "Traditionele Chinese Geneeskunde in 's-Hertogenbosch",
    categorie: "TCM",
    intro:
      "Ren Ji Tang is de enige erkende TCM-praktijk in het hart van 's-Hertogenbosch. Ontdek wat traditionele Chinese geneeskunde voor u kan betekenen.",
    afbeelding: "/images/hero_kruiden.png",
    datum: "2025-04-01",
    inhoud: `
Traditionele Chinese Geneeskunde (TCG of TCM) is een meer dan 3000 jaar oud medisch systeem dat de mens als geheel benadert — lichaam, geest en omgeving zijn onlosmakelijk met elkaar verbonden.

## Wat is TCM?

TCM omvat verschillende behandelmethoden:

- **Acupunctuur** — naalden op energiepunten
- **Tuina massage** — therapeutische massage langs meridianen
- **Cupping** — glazen koppen voor doorbloeding
- **Guasha** — schraaptechniek voor stagnatie
- **Moxibustie** — warmtebehandeling met kruiden
- **Kruidengeneeskunde** — gepersonaliseerde kruidenformules

## Ren Ji Tang in 's-Hertogenbosch

Onze praktijk is gevestigd aan de Hazenburgstede 7 in 's-Hertogenbosch en is bereikbaar vanuit de hele regio: Den Bosch, Oss, Veghel, Boxtel en omstreken.

Wij zijn erkend door Zhong (Nederlandse Vereniging voor TCM), KAB Koepel en SCAG — zodat u kunt declareren bij uw zorgverzekeraar (aanvullend pakket).

## Vergoeding zorgverzekeraar

Veel zorgverzekeraars vergoeden TCM behandelingen gedeeltelijk via het aanvullend pakket. Controleer uw polisvoorwaarden of neem contact met ons op voor meer informatie.
    `.trim(),
  },
  {
    slug: "acupunctuur-bij-burn-out",
    titel: "Acupunctuur bij burn-out: wat kun je verwachten?",
    categorie: "Acupunctuur",
    metaTitle: "Acupunctuur bij burn-out: wat kun je verwachten?",
    metaDescription:
      "Burn-out herstel met acupunctuur in 's-Hertogenbosch. Ren Ji Tang behandelt stress en vermoeidheid met TCG. Vergoed door zorgverzekeraar.",
    sitemapPriority: 0.8,
    intro:
      "Burn-out is meer dan alleen vermoeidheid. Het is een toestand waarbij lichaam en geest volledig uitgeput zijn — waarbij rust alleen niet genoeg is om te herstellen. Steeds meer mensen in 's-Hertogenbosch zoeken naast reguliere begeleiding naar natuurlijke ondersteuning. Acupunctuur is daar één van.",
    afbeelding: "/images/hero_3_acupunctuur.jpg",
    datum: "2026-01-10",
    inhoud: `
## Wat doet acupunctuur bij burn-out?

Vanuit de Traditionele Chinese Geneeskunde (TCG) wordt burn-out gezien als een ernstige uitputting van de levensenergie (Qi). Het lichaam heeft letterlijk zijn reserves opgebruikt. Acupunctuur herstelt deze balans door specifieke punten te stimuleren die het zenuwstelsel kalmeren, de bijnieren ondersteunen en de slaapkwaliteit verbeteren.

## Wat merk je tijdens de behandeling?

De meeste cliënten ervaren al tijdens de eerste behandeling een diep ontspannen gevoel. Sommigen vallen in slaap op de behandeltafel. Na een aantal behandelingen melden cliënten:

- Betere slaap
- Meer energie overdag
- Minder piekeren
- Rustiger zenuwstelsel
- Meer veerkracht

## Hoe lang duurt een behandeltraject?

Bij burn-out adviseren wij meestal 6 tot 10 behandelingen, afhankelijk van hoe lang de klachten al spelen. De intake bij Ren Ji Tang duurt 90 minuten — daarin bespreken we klachten uitgebreid en starten we met de eerste behandeling.

## Wordt het vergoed?

Ja. Acupunctuur wordt vergoed via de aanvullende zorgverzekering. Ren Ji Tang is aangesloten bij Zhong en erkend door CZ, VGZ, Menzis, Zilveren Kruis en DSW.

## Afspraak maken

Maak een afspraak via renjitang.nl/bookings of bel 073 211 02 24. Bereikbaar dinsdag t/m vrijdag tot 20:00 en in het weekend.
    `.trim(),
  },
  {
    slug: "acupunctuur-vergoeding-2026",
    titel: "Wordt acupunctuur vergoed in 2026?",
    categorie: "Vergoeding",
    metaTitle: "Wordt acupunctuur vergoed in 2026?",
    metaDescription:
      "Acupunctuur vergoeding 2026: ontdek welke zorgverzekeraars TCG vergoeden. Ren Ji Tang in 's-Hertogenbosch is erkend door CZ, VGZ, Menzis en meer.",
    sitemapPriority: 0.8,
    intro:
      "Een van de meest gestelde vragen bij Ren Ji Tang: vergoedt mijn zorgverzekering de behandelingen? Het antwoord is in de meeste gevallen: ja — via de aanvullende verzekering.",
    afbeelding: "/images/hero_acupunctuur_handen.jpg",
    datum: "2026-02-01",
    inhoud: `
## Hoe werkt de vergoeding?

Acupunctuur valt niet onder het basispakket maar wel onder het aanvullend pakket. Hoeveel je vergoed krijgt hangt af van je verzekering en pakket.

Ren Ji Tang is aangesloten bij Zhong, erkend door:

- CZ
- VGZ
- Menzis
- Zilveren Kruis
- DSW
- En meer

## Hoeveel krijg ik vergoed?

Dit verschilt per verzekeraar. Gemiddeld vergoeden aanvullende pakketten tussen €200 en €600 per jaar voor alternatieve geneeskunde. Controleer je polisvoorwaarden of bel je verzekeraar.

## Wat kost een behandeling bij Ren Ji Tang?

- Intake (90 minuten): vanaf €85
- Vervolgbehandeling (60 minuten): vanaf €65

## Hoe declareer ik?

Na elke behandeling ontvang je een factuur van Ren Ji Tang. Die stuur je op naar je zorgverzekeraar. Veel verzekeraars hebben hier een app voor.

## Vragen of afspraak?

Vragen over vergoeding? Bel 073 211 02 24 of WhatsApp. Afspraak maken via renjitang.nl/bookings.
    `.trim(),
  },
  {
    slug: "acupunctuur-of-fysiotherapie",
    titel: "Acupunctuur of fysiotherapie: wat past bij jou?",
    categorie: "Acupunctuur",
    metaTitle: "Acupunctuur of fysiotherapie: wat past bij jou?",
    metaDescription:
      "Wat is het verschil tussen acupunctuur en fysiotherapie? Ren Ji Tang legt uit wanneer TCG de betere keuze is voor rugpijn, stress en chronische klachten.",
    sitemapPriority: 0.8,
    intro:
      "Bij rugpijn of nekklachten denken veel mensen direct aan de fysiotherapeut. Logisch — fysiotherapie is bekend en goed vergoed. Maar steeds meer mensen in 's-Hertogenbosch kiezen ook voor acupunctuur, soms naast fysiotherapie, soms als alternatief.",
    afbeelding: "/images/hero_2_massage.jpg",
    datum: "2026-03-05",
    inhoud: `
## Fysiotherapie: gericht op het bewegingsapparaat

Fysiotherapie richt zich op spieren, gewrichten en het bewegingsapparaat via oefeningen, mobilisatie en massage. Effectief bij acute blessures en revalidatie.

## Acupunctuur: gericht op de oorzaak

Traditionele Chinese Geneeskunde beschouwt klachten als een verstoring van de balans in het lichaam. Acupunctuur behandelt niet alleen het symptoom maar ook de onderliggende oorzaak. Effectief bij chronische pijn, stress-gerelateerde klachten en klachten waarbij fysiotherapie onvoldoende helpt.

## Wanneer kies je voor acupunctuur?

- Chronische klachten die niet overgaan
- Pijn gecombineerd met stress of vermoeidheid
- Slaapproblemen naast fysieke klachten
- Als aanvulling op fysiotherapie
- Bij burn-out of overspannenheid

## Kunnen ze samen?

Ja. Acupunctuur en fysiotherapie sluiten elkaar niet uit. Veel cliënten van Ren Ji Tang combineren beide behandelingen met goed resultaat.

## Beide vergoed?

Ja, beide via de aanvullende zorgverzekering. Ren Ji Tang is erkend door alle grote verzekeraars via Zhong.

## Intake plannen

Twijfel je welke behandeling bij jou past? Maak een intake afspraak via renjitang.nl/bookings. Bel of WhatsApp: 073 211 02 24.
    `.trim(),
  },
];
