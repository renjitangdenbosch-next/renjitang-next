import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { KlantenSearch } from "@/components/KlantenSearch";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function AdminKlantenPage({ searchParams }: Props) {
  const raw = searchParams.q;
  const q = typeof raw === "string" ? raw.trim() : "";

  const where =
    q.length > 0
      ? {
          OR: [
            { voornaam: { contains: q, mode: "insensitive" as const } },
            { achternaam: { contains: q, mode: "insensitive" as const } },
            { email: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {};

  const klanten = await prisma.wPKlant.findMany({
    where,
    orderBy: [{ achternaam: "asc" }, { voornaam: "asc" }],
    take: 500,
  });

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100">
        Klanten 客户
      </h1>
      <Suspense
        fallback={
          <div className="h-10 max-w-md animate-pulse rounded-lg bg-stone-200 dark:bg-stone-700" />
        }
      >
        <KlantenSearch key={q || "_"} initialQuery={q} />
      </Suspense>
      <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-700">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-stone-100 dark:bg-stone-800">
            <tr>
              <th className="p-3">Naam</th>
              <th className="p-3">E-mail</th>
              <th className="p-3">Telefoon</th>
              <th className="p-3">Aangemaakt</th>
            </tr>
          </thead>
          <tbody>
            {klanten.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-stone-500">
                  Geen klanten gevonden.
                </td>
              </tr>
            ) : (
              klanten.map((k) => (
                <tr
                  key={k.id}
                  className="border-t border-stone-200 dark:border-stone-700"
                >
                  <td className="p-3">
                    {k.voornaam} {k.achternaam}
                  </td>
                  <td className="p-3">{k.email}</td>
                  <td className="p-3">{k.telefoon ?? "—"}</td>
                  <td className="p-3 whitespace-nowrap text-stone-600 dark:text-stone-400">
                    {k.aangemaakt
                      ? new Intl.DateTimeFormat("nl-NL", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(k.aangemaakt)
                      : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {klanten.length >= 500 && (
        <p className="text-xs text-stone-500">
          Maximaal 500 resultaten getoond — verfijn uw zoekopdracht.
        </p>
      )}
    </div>
  );
}
