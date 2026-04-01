import { adminWpBookingStatusLabel } from "@/lib/admin-i18n";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HistoriePage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const zoek = searchParams.q || "";

  const boekingen = await prisma.wPBoeking.findMany({
    where: zoek
      ? {
          OR: [
            { klantNaam: { contains: zoek, mode: "insensitive" } },
            { klantEmail: { contains: zoek, mode: "insensitive" } },
            { dienst: { contains: zoek, mode: "insensitive" } },
          ],
        }
      : {},
    orderBy: { datum: "desc" },
    take: 100,
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="font-serif text-3xl mb-2">
        WordPress Historie 历史预约记录
      </h1>
      <p className="text-stone-500 mb-6">
        {boekingen.length} afspraken uit het oude systeem
      </p>

      {/* Zoekbalk */}
      <form method="get" className="mb-6">
        <input
          name="q"
          defaultValue={zoek}
          placeholder="Zoek op naam, email of behandeling..."
          className="w-full border border-stone-200 rounded-xl 
            px-4 py-3 focus:outline-none focus:border-rjt-red"
        />
      </form>

      {/* Tabel */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr>
              <th
                className="text-left px-4 py-3 font-medium 
                text-stone-600"
              >
                Klant
              </th>
              <th
                className="text-left px-4 py-3 font-medium 
                text-stone-600"
              >
                Dienst
              </th>
              <th
                className="text-left px-4 py-3 font-medium 
                text-stone-600"
              >
                Datum
              </th>
              <th
                className="text-left px-4 py-3 font-medium 
                text-stone-600"
              >
                Tijd
              </th>
              <th
                className="text-left px-4 py-3 font-medium 
                text-stone-600"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {boekingen.map((b) => (
              <tr key={b.id} className="hover:bg-stone-50">
                <td className="px-4 py-3">
                  <p className="font-medium">{b.klantNaam}</p>
                  <p className="text-stone-400 text-xs">{b.klantEmail}</p>
                </td>
                <td className="px-4 py-3 text-stone-600">{b.dienst}</td>
                <td className="px-4 py-3 text-stone-600">
                  {new Date(b.datum).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 text-stone-600">{b.tijd}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs 
                    font-medium
                    ${
                      b.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : b.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {adminWpBookingStatusLabel(b.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {boekingen.length === 0 && (
          <p className="text-center text-stone-400 py-12">
            Geen resultaten gevonden
          </p>
        )}
      </div>
    </div>
  );
}
