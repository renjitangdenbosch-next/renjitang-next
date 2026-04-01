import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  sendBoekingBevestigd,
  sendBoekingGeannuleerd,
} from "@/lib/email";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { id } = await params;
  let body: { status?: string; annuleringsReden?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  const allowed = new Set(["bevestigd", "geannuleerd"]);
  if (!body.status || !allowed.has(body.status)) {
    return NextResponse.json({ error: "Alleen bevestigd of geannuleerd" }, { status: 400 });
  }

  const existing = await prisma.booking.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  }

  const now = new Date();
  const data =
    body.status === "bevestigd"
      ? {
          status: "bevestigd" as const,
          bevestigdOp: now,
          annuleringsReden: null,
        }
      : {
          status: "geannuleerd" as const,
          geannuleerdOp: now,
          annuleringsReden: body.annuleringsReden?.trim() || null,
        };

  const updated = await prisma.booking.update({
    where: { id },
    data,
  });

  if (body.status === "bevestigd" && existing.status !== "bevestigd") {
    await sendBoekingBevestigd(updated);
  }
  if (body.status === "geannuleerd" && existing.status !== "geannuleerd") {
    await sendBoekingGeannuleerd(updated);
  }

  return NextResponse.json({
    ...updated,
    prijs: updated.prijs.toString(),
  });
}
