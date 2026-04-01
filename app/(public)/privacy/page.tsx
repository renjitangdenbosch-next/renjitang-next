import type { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { SITE } from "@/lib/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.renjitang.nl";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: `Privacyverklaring van ${SITE.name}: hoe wij omgaan met uw persoonsgegevens (AVG).`,
  alternates: { canonical: "/privacy" },
};

const card =
  "rounded-2xl border border-stone-100 bg-white p-8 shadow-sm dark:border-stone-700 dark:bg-stone-900/80";
const h2 = "mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream";
const body = "space-y-3 text-stone-600 leading-relaxed dark:text-stone-300";
const list =
  "list-disc space-y-2 pl-5 text-stone-600 leading-relaxed dark:text-stone-300";

export default function PrivacyPage() {
  return (
    <PageLayout
      title="Privacybeleid"
      subtitle="Hoe wij omgaan met uw gegevens"
      heroImage="/images/DSC_0350-scaled.jpg"
    >
      <p className="mb-8 text-sm text-stone-500 dark:text-stone-400">
        Laatst bijgewerkt: april 2026
      </p>

      <div className="space-y-6">
        <div className={card}>
          <h2 className={h2}>Wie zijn wij</h2>
          <div className={body}>
            <p>
              Ons websiteadres is:{" "}
              <a
                href={siteUrl}
                className="font-medium text-rjt-red underline underline-offset-2 hover:no-underline"
              >
                {siteUrl.replace(/^https?:\/\//, "")}
              </a>
              . {SITE.name} is een praktijk voor acupunctuur, Traditionele Chinese Geneeskunde (TCG)
              en aanverwante behandelingen, gevestigd in {SITE.city}.
            </p>
          </div>
        </div>

        <div className={card}>
          <h2 className={h2}>Verwerkingsverantwoordelijke</h2>
          <div className={body}>
            <p>
              Voor de verwerking van persoonsgegevens via deze website en in het kader van de praktijk
              is {SITE.name} de verwerkingsverantwoordelijke in de zin van de Algemene verordening
              gegevensbescherming (AVG).
            </p>
            <p>
              <strong className="text-rjt-dark dark:text-rjt-cream">Contact:</strong>
              <br />
              E-mail:{" "}
              <a href={`mailto:${SITE.email}`} className="text-rjt-red underline underline-offset-2">
                {SITE.email}
              </a>
              <br />
              Telefoon:{" "}
              <a href={`tel:${SITE.phoneTel}`} className="text-rjt-red underline underline-offset-2">
                {SITE.phone}
              </a>
              <br />
              Plaats: {SITE.city}
            </p>
          </div>
        </div>

        <div className={card}>
          <h2 className={h2}>Welke persoonsgegevens verwerken wij?</h2>
          <div className={body}>
            <p>Wij kunnen de volgende categorieën gegevens verwerken, afhankelijk van uw contact met ons:</p>
            <ul className={list}>
              <li>
                <strong>Identiteits- en contactgegevens</strong> (bijv. naam, e-mailadres, telefoonnummer)
                wanneer u contact met ons opneemt via het contactformulier, per e-mail of telefoon.
              </li>
              <li>
                <strong>Gezondheidsinformatie</strong> in zoverre u die vrijwillig deelt in het kader van
                een intake, behandeling of correspondentie met de praktijk. Wij behandelen zorggegevens
                zorgvuldig en alleen voor zover dat noodzakelijk is voor de behandeling en wettelijke
                verplichtingen.
              </li>
              <li>
                <strong>Technische gegevens</strong> zoals IP-adres, browsertype en apparaatinformatie
                wanneer u onze website bezoekt, voor beveiliging, functionaliteit en (anonieme)
                statistieken waar van toepassing.
              </li>
            </ul>
          </div>
        </div>

        <div className={card}>
          <h2 className={h2}>Doeleinden en rechtsgronden</h2>
          <div className={body}>
            <p>Wij verwerken persoonsgegevens alleen als dat mag volgens de AVG, onder meer op basis van:</p>
            <ul className={list}>
              <li>
                <strong>Uitvoering van een overeenkomst</strong> of voorbereiding daarvan (bijv. het
                inplannen en uitvoeren van behandelingen).
              </li>
              <li>
                <strong>Gerechtvaardigd belang</strong> (bijv. beantwoorden van vragen, beveiliging van
                de website, administratie), waarbij wij uw belangen afwegen.
              </li>
              <li>
                <strong>Toestemming</strong>, waar wij die expliciet vragen (bijv. voor bepaalde
                communicatie of niet-noodzakelijke cookies).
              </li>
              <li>
                <strong>Wettelijke verplichting</strong>, bijvoorbeeld op het gebied van administratie
                en zorgdocumentatie waar de wet dat voorschrijft.
              </li>
            </ul>
          </div>
        </div>

        <div className={card}>
          <h2 className={h2}>Contactformulier en correspondentie</h2>
          <div className={body}>
            <p>
              Wanneer u het contactformulier invult of ons per e-mail benadert, bewaren wij de door u
              verstrekte gegevens zolang dat nodig is om uw verzoek af te handelen en eventuele vervolg
              communicatie te voeren. Wij gebruiken deze gegevens niet voor ongevraagde marketing, tenzij
              u daar apart toestemming voor geeft.
            </p>
          </div>
        </div>

        <div className={card}>
          <h2 className={h2}>Online afspraken (BookingPress)</h2>
          <div className={body}>
            <p>
              Voor het plannen van afspraken kan worden verwezen naar een online boekingstool op onze
              bestaande WordPress-omgeving (BookingPress). Bij het boeken kunnen daar naam, contact- en
              afspraakgegevens worden verwerkt. Die verwerking geschiedt door de beheerder van die
              omgeving en plugins, in overeenstemming met hun voorwaarden en dit privacybeleid waar van
              toepassing. Raadpleeg bij twijfel ook het privacybeleid op{" "}
              <a
                href="https://renjitang.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rjt-red underline underline-offset-2"
              >
                renjitang.nl
              </a>
              .
            </p>
          </div>
        </div>

        <div className={card}>
          <h2 className={h2}>Reacties en gebruikersinhoud</h2>
          <div className={body}>
            <p>
              Wanneer bezoekers reacties of berichten achterlaten op onderdelen van de site waar dat
              mogelijk is, kunnen wij de gegevens uit het formulier vastleggen, evenals het IP-adres en
              de user-agentstring van de browser om spam en misbruik te helpen voorkomen en te
              detecteren. Een geanonimiseerde string (hash) afgeleid van uw e-mailadres kan aan
              diensten zoals Gravatar worden verstrekt om te tonen of u een profielfoto heeft; zie de
              privacyverklaring van Gravatar voor details. Na goedkeuring kan uw reactie inclusief
              profielinformatie zichtbaar zijn voor andere bezoekers, tenzij anders aangegeven.
            </p>
          </div>
        </div>

        <div className={card}>
          <h2 className={h2}>Cookies</h2>
          <div className={body}>
            <p>
              Onze website kan cookies en vergelijkbare technieken gebruiken voor noodzakelijke
              functionaliteit (bijv. taal of sessie), voorkeuren of — indien van toepassing — anonieme
              statistieken. Waar wettelijk verplicht vragen wij toestemming voor niet-noodzakelijke
              cookies. U kunt cookies in uw browser beperken of verwijderen; let op dat sommige functies
              dan minder goed werken.
            </p>
          </div>
        </div>

        <div className={card}>
          <h2 className={h2}>Beveiliging</h2>
          <div className={body}>
            <p>
              Wij nemen passende technische en organisatorische maatregelen om persoonsgegevens te
              beschermen tegen verlies, ongeautoriseerde toegang of onrechtmatige verwerking. Toegang tot
              persoonsgegevens is beperkt tot personen die die informatie nodig hebben voor hun
              werkzaamheden.
            </p>
          </div>
        </div>

        <div className={card}>
          <h2 className={h2}>Bewaartermijnen</h2>
          <div className={body}>
            <p>
              Wij bewaren persoonsgegevens niet langer dan nodig is voor de doeleinden waarvoor zij zijn
              verzameld, tenzij een langere bewaartermijn wettelijk verplicht of gerechtvaardigd is
              (bijv. fiscale of zorggerelateerde bewaartermijnen).
            </p>
          </div>
        </div>

        <div className={card}>
          <h2 className={h2}>Verwerkers en doorsturen</h2>
          <div className={body}>
            <p>
              Wij kunnen voor hosting, e-mail, boekingen of IT-ondersteuning samenwerken met
              dienstverleners die als verwerker optreden. Met zulke partijen sluiten wij waar nodig
              verwerkersovereenkomsten. Gegevens worden niet verkocht. Doorstuur buiten de Europese
              Economische Ruimte vindt alleen plaats met passende waarborgen, zoals voorgeschreven in de
              AVG.
            </p>
          </div>
        </div>

        <div className={card}>
          <h2 className={h2}>Uw rechten</h2>
          <div className={body}>
            <p>Onder de AVG heeft u onder meer het recht om:</p>
            <ul className={list}>
              <li>inzage te vragen in uw persoonsgegevens;</li>
              <li>rectificatie of verwijdering te verzoeken, voor zover mogelijk;</li>
              <li>bezwaar te maken tegen bepaalde verwerkingen;</li>
              <li>beperking van de verwerking te vragen;</li>
              <li>gegevensoverdraagbaarheid te vragen waar van toepassing;</li>
              <li>
                toestemming in te trekken, zonder afbreuk aan de rechtmatigheid van eerdere verwerking.
              </li>
            </ul>
            <p>
              U kunt hiertoe contact met ons opnemen via{" "}
              <a href={`mailto:${SITE.email}`} className="text-rjt-red underline underline-offset-2">
                {SITE.email}
              </a>
              . Ook heeft u het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens (
              <a
                href="https://www.autoriteitpersoonsgegevens.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rjt-red underline underline-offset-2"
              >
                autoriteitpersoonsgegevens.nl
              </a>
              ).
            </p>
          </div>
        </div>

        <div className={card}>
          <h2 className={h2}>Wijzigingen</h2>
          <div className={body}>
            <p>
              Wij kunnen dit privacybeleid van tijd tot tijd aanpassen, bijvoorbeeld bij wijzigingen in
              wetgeving of onze dienstverlening. De actuele versie is steeds op deze pagina beschikbaar.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
