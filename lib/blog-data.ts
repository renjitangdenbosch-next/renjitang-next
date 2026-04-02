export type BlogArtikel = {
  slug: string;
  titel: string;
  categorie: string;
  intro: string;
  afbeelding: string;
  datum: string;
  inhoud: string;
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
];
