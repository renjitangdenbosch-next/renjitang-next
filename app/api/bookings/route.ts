import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { stuurAanvraagMails } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import {
  formatSlotLabel,
  getAvailableSlots,
  normalizeTijdslotLabel,
} from "@/lib/slots";
import { SERVICES } from "@/lib/site";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { naam, email, telefoon, opmerking, behandelingId, datum, tijdslot } =
      body;

    if (
      !naam ||
      !email ||
      !telefoon ||
      !behandelingId ||
      !datum ||
      !tijdslot
    ) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in" },
        { status: 400 }
      );
    }

    const service = SERVICES.find((s) => s.id === behandelingId);
    if (!service) {
      return NextResponse.json(
        { error: "Onbekende behandeling" },
        { status: 400 }
      );
    }

    const datumStr = String(datum).trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(datumStr)) {
      return NextResponse.json({ error: "Ongeldige datum" }, { status: 400 });
    }

    const tijdslotNorm = normalizeTijdslotLabel(String(tijdslot));
    if (!tijdslotNorm) {
      return NextResponse.json({ error: "Ongeldig tijdslot" }, { status: 400 });
    }

    const beschikbaar = await getAvailableSlots(datumStr, service.duur);
    const magStarten = new Set(beschikbaar.map(formatSlotLabel));
    if (!magStarten.has(tijdslotNorm)) {
      return NextResponse.json(
        {
          error:
            "Dit tijdslot is niet meer beschikbaar. Kies een andere tijd.",
        },
        { status: 409 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        naam,
        email,
        telefoon,
        opmerking: opmerking || null,
        behandeling: service.naam,
        behandelingId: service.id,
        duur: service.duur,
        prijs: new Prisma.Decimal(service.prijs),
        datum: new Date(datumStr),
        tijdslot: tijdslotNorm,
        status: "pending",
        bron: "website",
      },
    });

    try {
      await stuurAanvraagMails(booking);
    } catch (e) {
      console.error("Email fout:", e);
    }

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Er ging iets mis" },
      { status: 500 }
    );
  }
}
