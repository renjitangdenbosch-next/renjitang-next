import { BookingPressImportSection } from "@/components/BookingPressImportSection";
import { ImportBookingsForm } from "@/components/ImportBookingsForm";

export default function AdminImportPage() {
  return (
    <div className="space-y-10">
      <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100">
        Import
      </h1>
      <BookingPressImportSection />
      <div>
        <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
          CSV / JSON (site-boekingen)
        </h2>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          Handmatige import naar het Prisma <code>Booking</code>-model.
        </p>
        <div className="mt-4">
          <ImportBookingsForm />
        </div>
      </div>
    </div>
  );
}
