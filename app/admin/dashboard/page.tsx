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
import { adminBookingStatusLabel } from "@/lib/admin-i18n";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const TZ = "Europe/Amsterdam";

const cardBase =
  "block rounded-xl border border-stone-200 bg-white p-6 transition hover:border-purple-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-purple-600";

const cardBaseSm =
  "block rounded-xl border border-stone-200 bg-white p-5 transition hover:border-purple-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-purple-600";

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
      <section
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 via-violet-700 to-purple-900 p-8 text-white shadow-lg"
        aria-label="Snel naar alle boekingen"
      >
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
              Alle boekingen beheren
            </h2>
            <p className="mt-2 text-sm text-purple-100">管理所有预约</p>
          </div>
          <Link
            href="/admin/boekingen"
            className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-white px-8 py-3.5 text-base font-semibold text-purple-800 shadow-md transition hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-purple-800 sm:self-center"
          >
            <span>Naar boekingen</span>
            <span className="text-xl leading-none" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </section>

      <div>
        <h1 className="mb-1 font-serif text-3xl text-stone-900 dark:text-stone-100">
          Beheer
        </h1>
        <p className="text-sm text-stone-400">管理后台</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/historie" className={cardBase}>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Omzet deze maand (€)
          </p>
          <p className="mt-2 font-serif text-2xl text-stone-900 dark:text-stone-50">
            {omzet.toFixed(0)}
          </p>
        </Link>
        <Link href="/admin/boekingen" className={cardBase}>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Boekingen deze week
          </p>
          <p className="mt-2 font-serif text-2xl text-stone-900 dark:text-stone-50">
            {weekCount}
          </p>
        </Link>
        <Link href="/admin/boekingen" className={cardBase}>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Populairste behandeling
          </p>
          <p className="mt-2 font-serif text-2xl text-stone-900 dark:text-stone-50">
            {topBehandeling}
          </p>
        </Link>
        <Link
          href="/admin/boekingen?status=pending"
          className={cardBase}
        >
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Nieuwe aanvragen (site, deze maand)
          </p>
          <p className="mt-2 font-serif text-2xl text-stone-900 dark:text-stone-50">
            {nieuweDezeMaand}
          </p>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Link href="/admin/boekingen" className={cardBaseSm}>
          <p className="text-sm text-stone-500 dark:text-stone-400">Totaal</p>
          <p className="mt-2 font-serif text-2xl text-stone-900 dark:text-stone-50">
            {total}
          </p>
        </Link>
        <Link
          href="/admin/boekingen?status=pending"
          className={cardBaseSm}
        >
          <p className="text-sm text-stone-500 dark:text-stone-400">
            In afwachting / 待确认
          </p>
          <p className="mt-2 font-serif text-2xl text-stone-900 dark:text-stone-50">
            {pending}
          </p>
        </Link>
        <Link
          href="/admin/boekingen?status=bevestigd"
          className={cardBaseSm}
        >
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Bevestigd / 已确认
          </p>
          <p className="mt-2 font-serif text-2xl text-stone-900 dark:text-stone-50">
            {bevestigd}
          </p>
        </Link>
        <Link
          href="/admin/boekingen?status=geannuleerd"
          className={cardBaseSm}
        >
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Geannuleerd / 已取消
          </p>
          <p className="mt-2 font-serif text-2xl text-stone-900 dark:text-stone-50">
            {geannuleerd}
          </p>
        </Link>
        <Link
          href="/admin/boekingen?status=voltooid"
          className={cardBaseSm}
        >
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Voltooid / 已完成
          </p>
          <p className="mt-2 font-serif text-2xl text-stone-900 dark:text-stone-50">
            {voltooid}
          </p>
        </Link>
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
        <p className="mt-1 text-sm text-stone-400">最近预约</p>
        <ul className="mt-4 divide-y divide-stone-100 dark:divide-stone-800">
          {recent.map((b) => (
            <li key={b.id}>
              <Link
                href={`/admin/boekingen#booking-${b.id}`}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg py-3 text-sm text-stone-800 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:text-stone-100 dark:hover:bg-stone-800/60"
              >
                <span className="font-medium">{b.naam}</span>
                <span className="text-stone-600 dark:text-stone-400">
                  {b.behandeling} · {b.tijdslot}
                </span>
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs dark:bg-stone-800">
                  {adminBookingStatusLabel(b.status)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
