export type KlachtSection = { heading: string; paragraphs: string[] };

export type KlachtPage = {
  slug: string;
  title: string;
  metaDescription: string;
  heroImage: string;
  heroAlt: string;
  intro: string;
  sections: KlachtSection[];
};

export const klachtenPages: KlachtPage[] = [
  {
    slug: "rugpijn",
    title: "Rugpijn — TCM en acupunctuur in Den Bosch",
    metaDescription:
      "Rugpijn behandelen met acupunctuur, massage of cupping bij Ren Ji Tang in 's-Hertogenbosch. Complementaire zorg, vaak deels vergoed.",
    heroImage: "/images/hero_4_cupping.jpg",
    heroAlt: "Therapeutische behandeling bij rugklachten",
    intro:
      "Rugpijn is een van de meest voorkomende redenen om TCM te zoeken. We combineren waar passend acupunctuur, tuina, cupping en moxa om spanning te verlagen, doorbloeding te verbeteren en herstel te ondersteunen.",
    sections: [
      {
        heading: "Hoe kijkt TCM naar rugpijn?",
        paragraphs: [
          "In de Traditionele Chinese Geneeskunde wordt rugpijn vaak in verband gebracht met stagnatie (blokkade van energie en bloed), kou of een combinatie van spanning en vermoeidheid. Niet iedere rugpijn is hetzelfde: tijdens het intakegesprek kijken we naar uw patroon.",
        ],
      },
      {
        heading: "Welke behandelingen kunnen helpen?",
        paragraphs: [
          "Acupunctuur kan spieren en het zenuwstelsel helpen ontspannen. Tuina-massage richt zich op diepe spieren en fascia. Cupping bevordert doorbloeding en kan verlichting geven bij starre, pijnlijke rugspieren. We stellen een plan op maat voor.",
        ],
      },
      {
        heading: "Wat u kunt verwachten",
        paragraphs: [
          "Het aantal sessies hangt af van acute of chronische klachten en uw algemene conditie. Bij langdurige rugpijn is een reeks behandelingen meestal realistischer dan één enkele afspraak.",
        ],
      },
    ],
  },
  {
    slug: "stress",
    title: "Stress — ondersteuning met acupunctuur & TCM",
    metaDescription:
      "Overbelasting en stress? Ren Ji Tang in 's-Hertogenbosch biedt acupunctuur en massage om het zenuwstelsel te kalmeren en beter te slapen.",
    heroImage: "/images/hero_3_acupunctuur.jpg",
    heroAlt: "Rustige acupunctuurbehandeling",
    intro:
      "Langdurige stress beïnvloedt slaap, spijsvertering en concentratie. Acupunctuur en aanverwante technieken worden door veel mensen als verlichtend ervaren — als aanvulling op gesprekken bij uw huisarts of psycholoog.",
    sections: [
      {
        heading: "Hoe kan TCM ondersteunen?",
        paragraphs: [
          "We werken met het idee dat lichaam en geest samenhangen. Door gerichte punten te stimuleren, wordt vaak een gevoel van kalmte en meer ruimte in het lichaam nagestreefd. Dat is geen vervanging van psychische zorg, maar kan er goed naast bestaan.",
        ],
      },
      {
        heading: "Welke klachten horen hier vaak bij?",
        paragraphs: [
          "Spanning in nek en schouders, gespannen buik, hartkloppingen, prikkelbaarheid of slecht inslapen. Tijdens de intake brengen we uw beeld in kaart.",
        ],
      },
    ],
  },
  {
    slug: "burnout",
    title: "Burn-out — zachte herstelondersteuning",
    metaDescription:
      "Uitputting en burn-out: acupunctuur en TCM ter ondersteuning van herstel in 's-Hertogenbosch bij Ren Ji Tang.",
    heroImage: "/images/hero_acupunctuur_handen.jpg",
    heroAlt: "Acupunctuur voor ontspanning en herstel",
    intro:
      "Bij burn-out is het lichaam vaak langdurig op scherp gestaan. Rust alleen is niet altijd genoeg. Veel mensen merken dat zachte lichaamsgerichte behandelingen helpen om beter te slapen en weer contact te krijgen met ontspanning.",
    sections: [
      {
        heading: "TCM en uitputting",
        paragraphs: [
          "We benaderen burn-out serieus: het gaat om herstel in uw tempo. Acupunctuur kan het autonome zenuwstelsel helpen reguleren. Soms adviseren we ook massage of lichte moxa — altijd in overleg met wat u aankunt.",
        ],
      },
      {
        heading: "Samen met reguliere zorg",
        paragraphs: [
          "Wij zijn complementair: blijf bij ernstige klachten altijd in contact met uw huisarts of bedrijfsarts. Wij vullen aan waar dat passend en veilig is.",
        ],
      },
    ],
  },
  {
    slug: "slaapproblemen",
    title: "Slaapproblemen — beter slapen met acupunctuur",
    metaDescription:
      "Moeilijk inslapen, nachtelijk wakker worden? Probeer acupunctuur bij Ren Ji Tang Den Bosch als onderdeel van uw slaap-hygiëne.",
    heroImage: "/images/hero-behandelaar.jpg",
    heroAlt: "Ontspannen in de praktijk",
    intro:
      "Slechte slaap versterkt pijn, stress en somberheid. Acupunctuur wordt veel ingezet om het lichaam te helpen schakelen naar rust. We kijken ook naar factoren zoals spanning, hormonen of pijn die uw slaap verstoren.",
    sections: [
      {
        heading: "Individueel plan",
        paragraphs: [
          "De ene persoon ligt uren wakker van piekeren, de ander wordt meerdere keren per nacht wakker. We stemmen de behandeling af op uw patroon en bespreken eenvoudige leefstijltips die u zelf kunt toepassen.",
        ],
      },
      {
        heading: "Geduld en herhaling",
        paragraphs: [
          "Slaap verbetert bij sommige mensen snel, bij anderen na een paar weken. Een korte reeks afspraken is meestal zinvoller dan één losse sessie.",
        ],
      },
    ],
  },
  {
    slug: "hormonale-klachten",
    title: "Hormonale klachten — cyclus, overgang & vruchtbaarheid",
    metaDescription:
      "Ondersteuning bij hormonale klachten, cyclus en overgang met TCM en acupunctuur bij Ren Ji Tang in 's-Hertogenbosch.",
    heroImage: "/images/hero_kruiden.png",
    heroAlt: "TCM en kruidengeneeskunde",
    intro:
      "Veel vrouwen (en in sommige gevallen mannen) zoeken TCM bij onregelmatige cyclus, PMS, overgangsklachten of als aanvulling rond vruchtbaarheid. We werken holistisch: lichaam, cyclus en leefomstandigheden horen bij elkaar.",
    sections: [
      {
        heading: "Wat behandelen we niet in de plaats van?",
        paragraphs: [
          "Wij stellen geen medische diagnose in de plaats van uw gynaecoloog of huisarts. Bij twijfel of acute klachten verwijzen we u door. TCM kan wel ondersteunend zijn naast reguliere controles.",
        ],
      },
      {
        heading: "Acupunctuur en kruiden",
        paragraphs: [
          "Naast acupunctuur kan kruidengeneeskunde onderdeel zijn van de aanpak, indien daarvoor aanwijzingen zijn en het veilig is in combinatie met uw medicatie. Dat bespreken we altijd expliciet.",
        ],
      },
    ],
  },
];

export function getKlachtBySlug(slug: string): KlachtPage | undefined {
  return klachtenPages.find((k) => k.slug === slug);
}

/** Voor sitemap */
export const klachtenSitemapPaths: string[] = klachtenPages.map((p) => `/klachten/${p.slug}`);
