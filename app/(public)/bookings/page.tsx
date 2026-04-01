import type { Metadata } from "next";
import { BookingWizard } from "@/components/BookingWizard";
import { PageLayout } from "@/components/PageLayout";
import { SITE } from "@/lib/site";

const canonicalBase =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://www.renjitang.nl").replace(
    /\/$/,
    ""
  );

export const metadata: Metadata = {
  title: "Boek een afspraak",
  description: `Plan een afspraak voor acupunctuur, cupping, Tuina of massage bij Ren Ji Tang in ${SITE.city}.`,
  alternates: { canonical: `${canonicalBase}/bookings` },
};

export default function BookingsPage() {
  return (
    <PageLayout
      title="Boek een afspraak"
      subtitle="Kies een behandeling, datum en tijd — na uw aanvraag ontvangt u een e-mail en bevestigt de praktijk uw afspraak."
      heroImage="/images/DSC_0378-scaled.jpg"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-stone-100 bg-white p-6 shadow-sm sm:p-8 dark:border-stone-700 dark:bg-stone-900/80">
        <BookingWizard />
      </div>
    </PageLayout>
  );
}
