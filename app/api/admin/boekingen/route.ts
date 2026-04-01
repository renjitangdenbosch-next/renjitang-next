import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parsePublicBookingDate } from "@/lib/slots";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const datum = searchParams.get("datum");
  const search = searchParams.get("search")?.trim();

  const where: Prisma.BookingWhereInput = {};

  if (status && status !== "alle") {
    where.status = status;
  }

  if (datum && /^\d{4}-\d{2}-\d{2}$/.test(datum)) {
    const d0 = parsePublicBookingDate(datum);
    const d1 = new Date(d0.getTime() + 86400000);
    where.datum = { gte: d0, lt: d1 };
  }

  if (search) {
    where.OR = [
      { naam: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [bookings, countRows] = await Promise.all([
    prisma.booking.findMany({
      where,
      orderBy: [{ datum: "desc" }, { tijdslot: "desc" }],
      take: 500,
    }),
    prisma.booking.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
  ]);

  const counts: Record<string, number> = {};
  for (const row of countRows) {
    counts[row.status] = row._count._all;
  }

  return NextResponse.json({
    bookings: bookings.map((b) => ({
      ...b,
      prijs: b.prijs.toString(),
    })),
    counts,
  });
}
