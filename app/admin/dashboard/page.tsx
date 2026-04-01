import Link from "next/link";
import {
  addDays,
  addMonths,
  addWeeks,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const TZ = "Europe/Amsterdam";

export default async function AdminDashboardPage() {
  const now = new Date();
  const z = toZonedTime(now, TZ);

  const monthStartAm = startOfMonth(z);
  const monthStart = fromZonedTime(
    `${format(monthStartAm, "yyyy-MM-dd")}T00:00:00`,
    TZ
  );
  const monthEnd = addMonths(monthStart, 1);

  const weekStartAm = startOfWeek(z, { weekStartsOn: 1 });
  const weekStart = fromZonedTime(
    `${format(weekStartAm, "yyyy-MM-dd")}T00:00:00`,
    TZ
  );
  const weekEnd = addDays(weekStart, 7);

  const [
    pending,
    bevestigd,
    geannuleerd,
    voltooid,
    total,
    revenueAgg,
    weekCount,
    popular,
    recent,
    nieuweDezeMaand,
    weekChart,
  ] = await Promise.all([
    prisma.booking.count({ where: { status: "pending" } }),
    prisma.booking.count({ where: { status: "bevestigd" } }),
    prisma.booking.count({ where: { status: "geannuleerd" } }),
    prisma.booking.count({ where: { status: "voltooid" } }),
    prisma.booking.count(),
    prisma.booking.aggregate({
      where: {
        status: { in: ["bevestigd", "voltooid"] },
        datum: { gte: monthStart, lt: monthEnd },
      },
      _sum: { prijs: true },
    }),
    prisma.booking.count({
      where: {
        datum: { gte: weekStart, lt: weekEnd },
        status: { not: "geannuleerd" },
      },
    }),
    prisma.booking.groupBy({
      by: ["behandeling"],
      where: {
        datum: { gte: monthStart, lt: monthEnd },
        status: { not: "geannuleerd" },
      },
      _count: { behandeling: true },
      orderBy: { _count: { behandeling: "desc" } },
      take: 1,
    }),
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.booking.count({
      where: {
        createdAt: { gte: monthStart, lt: monthEnd },
        bron: "website",
      },
    }),
    Promise.all(
      Array.from({ length: 8 }, (_, j) => {
        const i = 7 - j;
        const w0 = addWeeks(weekStart, -i);
        const w1 = addDays(w0, 7);
        return prisma.booking
          .count({
            where: {
              datum: { gte: w0, lt: w1 },
              status: { not: "geannuleerd" },
            },
          })
          .then((count) => ({
            label: format(toZonedTime(w0, TZ), "d MMM"),
            count,
          }));
      })
    ),
  ]);

  const omzet = revenueAgg._sum.prijs
    ? Number(revenueAgg._sum.prijs)
    : 0;
  const topBehandeling = popular[0]?.behandeling ?? "—";
  const maxChart = Math.max(1, ...weekChart.map((w) => w.count));

  return (
    <div className="space-y-10">
      <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100">
        Dashboard
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Omzet deze maand (€)", value: omzet.toFixed(0) },
          { label: "Boekingen deze week", value: weekCount },
          { label: "Populairste behandeling", value: topBehandeling },
          { label: "Nieuwe aanvragen (site, deze maand)", value: nieuweDezeMaand },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900"
          >
            <p className="text-sm text-stone-500 dark:text-stone-400">{c.label}</p>
            <p className="mt-2 font-serif text-2xl text-stone-900 dark:text-stone-50">
              {c.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Totaal", value: total },
          { label: "In afwachting", value: pending },
          { label: "Bevestigd", value: bevestigd },
          { label: "Geannuleerd", value: geannuleerd },
          { label: "Voltooid", value: voltooid },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-700 dark:bg-stone-900"
          >
            <p className="text-sm text-stone-500 dark:text-stone-400">{c.label}</p>
            <p className="mt-2 font-serif text-2xl text-stone-900 dark:text-stone-50">
              {c.value}
            </p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
        <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
          Boekingen per week (laatste 8 weken)
        </h2>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Niet-geannuleerde afspraken met datum in die week (vanaf maandag).
        </p>
        <div className="mt-6 flex h-48 items-end gap-2">
          {weekChart.map((w, idx) => (
            <div
              key={`${idx}-${w.label}`}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div
                className="w-full max-w-[48px] rounded-t-md bg-rjt-red/80 dark:bg-amber-800/90"
                style={{
                  height: `${Math.max(8, (w.count / maxChart) * 100)}%`,
                  minHeight: w.count > 0 ? 12 : 4,
                }}
                title={`${w.count} boekingen`}
              />
              <span className="text-center text-[10px] text-stone-500 sm:text-xs">
                {w.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
        <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
          Recente boekingen
        </h2>
        <ul className="mt-4 divide-y divide-stone-100 dark:divide-stone-800">
          {recent.map((b) => (
            <li
              key={b.id}
              className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"
            >
              <span className="font-medium text-stone-800 dark:text-stone-100">
                {b.naam}
              </span>
              <span className="text-stone-600 dark:text-stone-400">
                {b.behandeling} · {b.tijdslot}
              </span>
              <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs capitalize dark:bg-stone-800">
                {b.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <p>
        <Link
          href="/admin/boekingen"
          className="font-medium text-amber-900 underline dark:text-amber-200"
        >
          Alle boekingen beheren →
        </Link>
      </p>
    </div>
  );
}
