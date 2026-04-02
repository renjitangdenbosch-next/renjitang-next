import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactPageHero } from "@/components/contact/ContactPageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact",
  description: `Neem contact op met ${SITE.name}: adres, kaart, openingstijden en formulier.`,
  alternates: { canonical: "/contact" },
};

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Hazenburgstede+7,+5235+HR+%27s-Hertogenbosch,+Netherlands&output=embed&hl=nl&z=16";

export default function ContactPage() {
  return (
    <div className="bg-paper text-ink">
      <ContactPageHero />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <div className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden />
              <div>
                <h2 className="font-cormorant text-xl text-ink">Adres</h2>
                <p className="mt-2 font-lato text-sm leading-relaxed text-ink/80">
                  {SITE.name}
                  <br />
                  {SITE.streetAddress}
                  <br />
                  {SITE.postalCode} {SITE.city}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden />
              <div>
                <h2 className="font-cormorant text-xl text-ink">Telefoon</h2>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="mt-2 inline-block font-lato text-ink hover:text-vermilion"
                >
                  {SITE.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden />
              <div>
                <h2 className="font-cormorant text-xl text-ink">E-mail</h2>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-2 inline-block font-lato text-ink hover:text-vermilion"
                >
                  {SITE.email}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden />
              <div>
                <h2 className="font-cormorant text-xl text-ink">Openingstijden</h2>
                <table className="mt-3 font-lato text-sm text-ink/80">
                  <tbody>
                    <tr>
                      <td className="py-1 pr-6">Dinsdag t/m vrijdag</td>
                      <td className="py-1">09:00 – 20:00</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-6">Zaterdag &amp; zondag</td>
                      <td className="py-1">09:00 – 17:00</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-6">Maandag</td>
                      <td className="py-1">Gesloten</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 h-80 w-full overflow-hidden rounded-sm border border-stone-200 shadow-sm">
              <iframe
                title="Ren Ji Tang locatie"
                src={MAP_EMBED_SRC}
                width="100%"
                height="100%"
                className="border-0"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <Button variant="primary" href={SITE.bookingUrl}>
              Maak een afspraak
            </Button>
          </div>

          <div>
            <h2 className="font-cormorant text-2xl text-ink">Stuur een bericht</h2>
            <div className="mt-6 rounded-sm border border-stone-200 bg-white p-8 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
