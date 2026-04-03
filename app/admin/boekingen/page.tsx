import { BoekingActies } from "@/components/admin/BoekingActies";
import { adminBookingStatusLabel } from "@/lib/admin-i18n";
import { prisma } from "@/lib/prisma";
import { SERVICES } from "@/lib/site";

export const dynamic = "force-dynamic";

const STATUS_FILTERS = [
  "pending",
  "bevestigd",
  "geannuleerd",
  "voltooid",
] as const;

export default async function BoekingenPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const boekingen = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  const statusParam = searchParams?.status;
  const statusFilter = STATUS_FILTERS.find((s) => s === statusParam) ?? null;
  const getoond = statusFilter
    ? boekingen.filter((b) => b.status === statusFilter)
    : boekingen;

  const pending = boekingen.filter((b) => b.status === "pending");
  const bevestigd = boekingen.filter((b) => b.status === "bevestigd");
  const geannuleerd = boekingen.filter((b) => b.status === "geannuleerd");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="font-serif text-3xl mb-1">Boekingen</h1>
      <p className="text-stone-400 text-sm mb-6">预约</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div
          className="bg-amber-50 border border-amber-200 
          rounded-xl p-4 text-center"
        >
          <p className="text-2xl font-bold text-amber-700">
            {pending.length}
          </p>
          <p className="text-sm text-amber-600">
            In afwachting / 待确认
          </p>
        </div>
        <div
          className="bg-green-50 border border-green-200 
          rounded-xl p-4 text-center"
        >
          <p className="text-2xl font-bold text-green-700">
            {bevestigd.length}
          </p>
          <p className="text-sm text-green-600">Bevestigd / 已确认</p>
        </div>
        <div
          className="bg-red-50 border border-red-200 
          rounded-xl p-4 text-center"
        >
          <p className="text-2xl font-bold text-red-700">
            {geannuleerd.length}
          </p>
          <p className="text-sm text-red-600">Geannuleerd / 已取消</p>
        </div>
      </div>

      {/* Boekingen lijst */}
      <div className="space-y-4">
        {getoond.map((b) => (
          <div
            key={b.id}
            id={`booking-${b.id}`}
            className="scroll-mt-24 bg-white rounded-2xl p-6 shadow-sm border 
              border-stone-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold text-lg">{b.naam}</p>
                <p className="text-stone-500 text-sm">{b.behandeling}</p>
                <p className="text-stone-400 text-xs">
                  {SERVICES.find((s) => s.id === b.behandelingId)?.naamCN}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs 
                font-semibold
                ${
                  b.status === "pending"
                    ? "bg-amber-100 text-amber-700"
                    : b.status === "bevestigd"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {adminBookingStatusLabel(b.status)}
              </span>
            </div>

            <div
              className="grid grid-cols-2 gap-2 text-sm 
              text-stone-600 mb-4"
            >
              <p>
                📅{" "}
                {new Date(b.datum).toLocaleDateString("nl-NL", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}{" "}
                om {b.tijdslot}
              </p>
              <p>
                ⏱ {b.duur} min · €{Number(b.prijs).toFixed(2)}
              </p>
              <p>📧 {b.email}</p>
              <p>📞 {b.telefoon}</p>
              {b.opmerking && (
                <p className="col-span-2">💬 {b.opmerking}</p>
              )}
            </div>

            {b.status === "pending" && <BoekingActies bookingId={b.id} />}
          </div>
        ))}

        {getoond.length === 0 && (
          <div className="py-12 text-center text-stone-400">
            <p>
              {statusFilter
                ? "Geen boekingen met deze status"
                : "Nog geen boekingen"}
            </p>
            {statusFilter && (
              <p className="mt-1 text-sm text-stone-400">无此状态预约</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
