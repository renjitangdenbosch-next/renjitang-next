import { adminWpBookingStatusLabel } from "@/lib/admin-i18n";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

function historieQueryHref(page: number, q: string) {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  if (page > 1) p.set("page", String(page));
  const qs = p.toString();
  return qs ? `/admin/historie?${qs}` : "/admin/historie";
}

export default async function HistoriePage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const zoek = searchParams.q || "";

  const where = zoek
    ? {
        OR: [
          { klantNaam: { contains: zoek, mode: "insensitive" as const } },
          { klantEmail: { contains: zoek, mode: "insensitive" as const } },
          { dienst: { contains: zoek, mode: "insensitive" as const } },
        ],
      }
    : {};

  const totalCount = await prisma.wPBoeking.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  let currentPage = parseInt(String(searchParams.page ?? "1"), 10);
  if (!Number.isFinite(currentPage) || currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const boekingen = await prisma.wPBoeking.findMany({
    where,
    orderBy: { datum: "desc" },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="font-serif text-3xl mb-2">
        WordPress Historie 历史预约记录
      </h1>
      <p className="text-stone-500 mb-6">
        {totalCount} afspraken uit het oude systeem
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

      {totalCount > 0 && (
        <div
          className="mt-6 flex flex-col gap-4 sm:flex-row 
          sm:items-center sm:justify-between"
        >
          <p className="text-sm text-stone-600">
            Pagina {currentPage} van {totalPages}
            <span className="mx-2 text-stone-400">·</span>
            第{currentPage}页，共{totalPages}页
          </p>
          <div className="flex gap-2">
            {currentPage > 1 ? (
              <Link
                href={historieQueryHref(currentPage - 1, zoek)}
                className="rounded-xl border border-stone-200 bg-white px-4 py-2 
                  text-sm font-medium text-stone-700 shadow-sm 
                  hover:border-rjt-red hover:text-rjt-red"
              >
                Vorige
              </Link>
            ) : (
              <span
                className="rounded-xl border border-stone-100 bg-stone-50 px-4 
                  py-2 text-sm font-medium text-stone-400"
              >
                Vorige
              </span>
            )}
            {currentPage < totalPages ? (
              <Link
                href={historieQueryHref(currentPage + 1, zoek)}
                className="rounded-xl border border-stone-200 bg-white px-4 py-2 
                  text-sm font-medium text-stone-700 shadow-sm 
                  hover:border-rjt-red hover:text-rjt-red"
              >
                Volgende
              </Link>
            ) : (
              <span
                className="rounded-xl border border-stone-100 bg-stone-50 px-4 
                  py-2 text-sm font-medium text-stone-400"
              >
                Volgende
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
