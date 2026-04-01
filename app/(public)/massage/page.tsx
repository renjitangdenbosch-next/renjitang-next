import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Massage in Den Bosch",
  description:
    "Tuina-massage en ontspanningsmassage bij Ren Ji Tang in 's-Hertogenbosch.",
  alternates: { canonical: "/massage" },
};

const card = "mb-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90";

export default function MassagePage() {
  return (
    <div className="bg-rjt-beige dark:bg-[#141210]">
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[280px]">
        <Image
          src="/images/PHOTO-2024-11-26-19-19-52-2.jpg"
          alt="Massage en behandeling bij Ren Ji Tang"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <h1 className="font-serif text-3xl text-white sm:text-4xl">Massage in Den Bosch</h1>
          <p className="mt-1 text-sm text-stone-400">按摩治疗</p>
          <p className="mt-2 text-white/85">Tuina &amp; ontspanningsmassage · Herstel en balans</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className={card}>
          <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Tuina-massage</h2>
          <p className="mb-4 leading-relaxed text-stone-600 dark:text-stone-300">
            Tuina is een therapeutische massage uit de Traditionele Chinese Geneeskunde. Met gerichte
            technieken worden spieren, gewrichten en meridiaanbanen benaderd om blokkades te verminderen en
            de energie weer vloeiend te laten worden.
          </p>
          <p className="mb-3 font-medium text-rjt-dark dark:text-rjt-cream">Voordelen</p>
          <ul className="space-y-2 text-stone-600 dark:text-stone-300">
            {[
              "Verlichting bij spanning en stijfheid",
              "Ondersteuning na sport of langdurig zitten",
              "Meer lichaamsbewustzijn en ontspanning",
              "Goed te combineren met acupunctuur in één traject",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-rjt-gold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={card}>
          <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
            Ontspanningsmassage
          </h2>
          <p className="leading-relaxed text-stone-600 dark:text-stone-300">
            Zachte, rustige technieken helpen het zenuwstelsel tot rust te komen. Ideaal bij stress,
            lichte spierspanning of wanneer u bewust tijd voor herstel wilt nemen — in een warme,
            professionele omgeving in &apos;s-Hertogenbosch.
          </p>
        </div>

        <div className={card}>
          <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Waarom Ren Ji Tang?</h2>
          <p className="mb-4 leading-relaxed text-stone-600 dark:text-stone-300">
            Wij werken vanuit Traditionele Chinese Geneeskunde: u wordt geholpen met vakmanschap, rust en
            aandacht voor uw verhaal. De praktijk is goed bereikbaar; voor of na uw behandeling kunt u
            ontspannen in de buurt van de stad.
          </p>
          <div className="relative mt-4 h-48 overflow-hidden rounded-xl sm:h-56">
            <Image
              src="/images/PHOTO-2024-11-26-19-19-55-3.jpg"
              alt="Sfeer Ren Ji Tang"
              fill
              className="object-cover object-center"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-rjt-red p-8 text-center text-white">
          <h3 className="mb-3 font-serif text-2xl">Massage boeken?</h3>
          <p className="mb-6 text-white/80">Neem contact op of plan direct een afspraak</p>
          <a
            href="/bookings"
            className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-rjt-red transition-colors hover:bg-rjt-beige"
          >
            Maak een afspraak
          </a>
        </div>
      </div>
    </div>
  );
}
