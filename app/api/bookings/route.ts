import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import {
  sendAanvraagOntvangen,
  sendPraktijkNieuweAanvraag,
} from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { SERVICES } from "@/lib/site";
import {
  formatSlotLabel,
  getAvailableSlots,
  parsePublicBookingDate,
} from "@/lib/slots";
import { sendBookingTelegram } from "@/lib/telegram";

const ALLOWED = new Set<string>(SERVICES.map((s) => s.id));

export async function POST(req: Request) {
  let body: {
    naam?: string;
    email?: string;
    telefoon?: string;
    opmerking?: string;
    behandelingId?: string;
    datum?: string;
    tijdslot?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  const { naam, email, telefoon, opmerking, behandelingId, datum, tijdslot } =
    body;

  if (!naam?.trim() || !email?.trim() || !telefoon?.trim() || !behandelingId || !datum || !tijdslot) {
    return NextResponse.json({ error: "Ontbrekende velden" }, { status: 400 });
  }

  if (!ALLOWED.has(behandelingId)) {
    return NextResponse.json({ error: "Onbekende behandeling" }, { status: 400 });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(datum)) {
    return NextResponse.json({ error: "Ongeldige datum" }, { status: 400 });
  }

  const svc = SERVICES.find((s) => s.id === behandelingId)!;
  const duur = svc.duur;
  const prijs = new Prisma.Decimal(svc.prijs);
  const datumDb = parsePublicBookingDate(datum);

  const slots = await getAvailableSlots(datum, duur);
  const labels = new Set(slots.map((s) => formatSlotLabel(s)));
  if (!labels.has(tijdslot.trim())) {
    return NextResponse.json(
      { error: "Dit tijdslot is niet meer beschikbaar" },
      { status: 409 }
    );
  }

  const booking = await prisma.booking.create({
    data: {
      naam: naam.trim(),
      email: email.trim().toLowerCase(),
      telefoon: telefoon.trim(),
      opmerking: opmerking?.trim() || null,
      behandeling: svc.naam,
      behandelingId,
      duur,
      prijs,
      datum: datumDb,
      tijdslot: tijdslot.trim(),
      status: "pending",
      bron: "website",
    },
  });

  await sendBookingTelegram({
    naam: booking.naam,
    email: booking.email,
    telefoon: booking.telefoon,
    behandeling: booking.behandeling,
    datum: datumDb,
    tijdslot: booking.tijdslot,
    duur: booking.duur,
    bookingId: booking.id,
  });

  await Promise.all([
    sendAanvraagOntvangen(booking),
    sendPraktijkNieuweAanvraag(booking),
  ]);

  return NextResponse.json({
    bookingId: booking.id,
    status: "pending" as const,
  });
}
