import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parsePublicBookingDate } from "@/lib/slots";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const items = await prisma.blokkering.findMany({
    orderBy: { datum: "desc" },
    take: 200,
  });
  return NextResponse.json({ blokkeringen: items });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  let body: { datum?: string; tijdslot?: string | null; reden?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  if (!body.datum || !/^\d{4}-\d{2}-\d{2}$/.test(body.datum)) {
    return NextResponse.json({ error: "datum (yyyy-MM-dd) vereist" }, { status: 400 });
  }

  const datum = parsePublicBookingDate(body.datum);
  const tijdslot =
    body.tijdslot === undefined || body.tijdslot === ""
      ? null
      : String(body.tijdslot).trim();

  const row = await prisma.blokkering.create({
    data: {
      datum,
      tijdslot,
      reden: body.reden?.trim() || null,
    },
  });

  return NextResponse.json(row);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id vereist" }, { status: 400 });
  }

  await prisma.blokkering.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
