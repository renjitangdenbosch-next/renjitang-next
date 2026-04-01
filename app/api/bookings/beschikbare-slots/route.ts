import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SERVICES } from "@/lib/site";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const datum = searchParams.get("datum");
  const behandelingId = searchParams.get("behandelingId");

  if (!datum || !behandelingId) {
    return NextResponse.json({ slots: [] });
  }

  const service = SERVICES.find((s) => s.id === behandelingId);
  if (!service) return NextResponse.json({ slots: [] });

  const dag = new Date(datum);
  const dagNummer = dag.getDay();

  // Maandag gesloten
  if (dagNummer === 1) {
    return NextResponse.json({ slots: [] });
  }

  // Openingstijden
  const startUur = 9;
  const eindUur = dagNummer === 0 || dagNummer === 6 ? 17 : 20;

  // Genereer slots per 30 min
  const alleSlots: string[] = [];
  for (let uur = startUur; uur < eindUur; uur++) {
    alleSlots.push(`${String(uur).padStart(2, "0")}:00`);
    if (uur + 0.5 < eindUur) {
      alleSlots.push(`${String(uur).padStart(2, "0")}:30`);
    }
  }

  // Haal geboekte slots op voor deze dag
  const startDag = new Date(datum);
  startDag.setHours(0, 0, 0, 0);
  const eindDag = new Date(datum);
  eindDag.setHours(23, 59, 59, 999);

  const geboekt = await prisma.booking.findMany({
    where: {
      datum: { gte: startDag, lte: eindDag },
      status: { not: "geannuleerd" },
    },
    select: { tijdslot: true },
  });

  const geboekteSlots = geboekt.map((b) => b.tijdslot);
  const beschikbaar = alleSlots.filter((s) => !geboekteSlots.includes(s));

  return NextResponse.json({ slots: beschikbaar });
}
