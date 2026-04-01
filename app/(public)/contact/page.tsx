import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Neem contact op met ${SITE.name}: adres Hazenburgstede 7, telefoon, WhatsApp en openingstijden.`,
  alternates: { canonical: "/contact" },
};

const waMobile = "31644010388";
const waUrl = `https://wa.me/${waMobile}`;

/** Embed op adres Hazenburgstede 7, 5235 HR 's-Hertogenbosch */
const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Hazenburgstede+7,+5235+HR+%27s-Hertogenbosch,+Netherlands&output=embed&hl=nl&z=16";

const card =
  "rounded-2xl border border-stone-100 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900/90";

export default function ContactPage() {
  return (
    <PageLayout
      title="Contact"
      titleZh="联系我们"
      subtitle="Wij helpen u graag verder"
      heroImage="/images/PHOTO-2024-11-26-19-19-05(1).jpg"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <div className={card}>
            <p className="mb-2 text-lg" aria-hidden>
              📍
            </p>
            <h2 className="font-serif text-lg text-rjt-dark dark:text-rjt-cream">Adres</h2>
            <p className="mt-2 leading-relaxed text-stone-600 dark:text-stone-300">
              {SITE.name}
              <br />
              Hazenburgstede 7
              <br />
              5235 HR &apos;s-Hertogenbosch
            </p>
          </div>

          <div className={card}>
            <p className="mb-2 text-lg" aria-hidden>
              📞
            </p>
            <h2 className="font-serif text-lg text-rjt-dark dark:text-rjt-cream">Telefoon</h2>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="mt-2 inline-block text-lg font-medium text-rjt-red hover:underline"
            >
              {SITE.phone}
            </a>
          </div>

          <div className={card}>
            <p className="mb-2 text-lg" aria-hidden>
              📱
            </p>
            <h2 className="font-serif text-lg text-rjt-dark dark:text-rjt-cream">WhatsApp</h2>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-medium text-rjt-red hover:underline"
            >
              06 44 01 03 88
            </a>
          </div>

          <div className={card}>
            <p className="mb-2 text-lg" aria-hidden>
              📧
            </p>
            <h2 className="font-serif text-lg text-rjt-dark dark:text-rjt-cream">E-mail</h2>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 inline-block font-medium text-rjt-red hover:underline"
            >
              {SITE.email}
            </a>
          </div>

          <div className={card}>
            <p className="mb-2 text-lg" aria-hidden>
              🕐
            </p>
            <h2 className="font-serif text-lg text-rjt-dark dark:text-rjt-cream">Openingstijden</h2>
            <table className="mt-3 w-full text-left text-sm text-stone-600 dark:text-stone-300">
              <tbody className="divide-y divide-stone-100 dark:divide-stone-700">
                <tr>
                  <th className="py-2 pr-4 font-normal text-stone-500 dark:text-stone-400">
                    Maandag
                  </th>
                  <td className="py-2">Gesloten</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4 font-normal text-stone-500 dark:text-stone-400">
                    Dinsdag t/m vrijdag
                  </th>
                  <td className="py-2">09:00 – 20:00</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4 font-normal text-stone-500 dark:text-stone-400">
                    Zaterdag &amp; zondag
                  </th>
                  <td className="py-2">09:00 – 17:00</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
              Afwijkingen mogelijk; bij twijfel even bellen of appen.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-700 dark:bg-stone-900/80">
            <iframe
              title="Kaart: Ren Ji Tang, Hazenburgstede 7 Den Bosch"
              src={MAP_EMBED_SRC}
              width="100%"
              height={400}
              className="border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-center text-sm text-stone-500 dark:text-stone-400 lg:text-left">
            <Link
              href={SITE.bookingUrl}
              className="inline-flex w-full items-center justify-center rounded-full bg-rjt-red px-10 py-4 text-base font-semibold text-white transition-colors hover:bg-red-800 lg:w-auto"
            >
              Boek een afspraak
            </Link>
            <span className="mt-3 block">
              Online boeken op deze site. Voor vragen: bel of WhatsApp ons.
            </span>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
