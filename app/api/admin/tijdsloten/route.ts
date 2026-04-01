import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const tijdsloten = await prisma.tijdslot.findMany({
    orderBy: [{ dag: "asc" }, { startTijd: "asc" }],
  });
  return NextResponse.json({ tijdsloten });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  let body: { dag?: number; startTijd?: string; eindTijd?: string; actief?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  if (
    body.dag === undefined ||
    body.dag < 0 ||
    body.dag > 6 ||
    !body.startTijd ||
    !body.eindTijd
  ) {
    return NextResponse.json(
      { error: "dag (0-6), startTijd en eindTijd vereist" },
      { status: 400 }
    );
  }

  const row = await prisma.tijdslot.create({
    data: {
      dag: body.dag,
      startTijd: body.startTijd.trim(),
      eindTijd: body.eindTijd.trim(),
      actief: body.actief !== false,
    },
  });
  return NextResponse.json(row);
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  let body: {
    id?: string;
    dag?: number;
    startTijd?: string;
    eindTijd?: string;
    actief?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ error: "id vereist" }, { status: 400 });
  }

  const row = await prisma.tijdslot.update({
    where: { id: body.id },
    data: {
      ...(body.dag !== undefined ? { dag: body.dag } : {}),
      ...(body.startTijd !== undefined ? { startTijd: body.startTijd.trim() } : {}),
      ...(body.eindTijd !== undefined ? { eindTijd: body.eindTijd.trim() } : {}),
      ...(body.actief !== undefined ? { actief: body.actief } : {}),
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

  await prisma.tijdslot.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
