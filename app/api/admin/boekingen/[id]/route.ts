import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import {
  stuurAnnulering,
  stuurBevestiging,
  stuurDatumTijdWijzigingPendingNaarKlant,
} from "@/lib/email";
import { prisma } from "@/lib/prisma";
import {
  formatSlotLabel,
  getAvailableSlots,
  normalizeTijdslotLabel,
  parsePublicBookingDate,
} from "@/lib/slots";
import { SERVICES } from "@/lib/site";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const body = (await req.json()) as {
    status?: string;
    reden?: string | null;
    datum?: string;
    tijdslot?: string;
  };

  console.log("PATCH body:", body);

  const { status, reden, datum: datumBody, tijdslot: tijdslotBody } = body;

  const existing = await prisma.booking.findUnique({
    where: { id: params.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Boeking niet gevonden" }, { status: 404 });
  }

  const hasDatumTijd =
    datumBody != null &&
    String(datumBody).trim() !== "" &&
    tijdslotBody != null &&
    String(tijdslotBody).trim() !== "";

  const datumTouched = datumBody != null && String(datumBody).trim() !== "";
  const tijdTouched = tijdslotBody != null && String(tijdslotBody).trim() !== "";
  if (datumTouched !== tijdTouched) {
    return NextResponse.json(
      { error: "Datum en tijdslot zijn beide verplicht" },
      { status: 400 }
    );
  }

  const wantsStatus = status !== undefined && status !== null && status !== "";
  const wantsReschedule = hasDatumTijd;

  if (!wantsStatus && !wantsReschedule) {
    return NextResponse.json({ error: "Geen wijzigingen" }, { status: 400 });
  }

  const ALLOWED_STATUS = [
    "pending",
    "bevestigd",
    "geannuleerd",
    "voltooid",
  ] as const;
  const statusNormalized =
    wantsStatus && typeof status === "string"
      ? status.trim().toLowerCase()
      : "";
  const statusForDb =
    wantsStatus && typeof status === "string"
      ? (ALLOWED_STATUS as readonly string[]).includes(statusNormalized)
        ? statusNormalized
        : status.trim()
      : "";

  const data: Prisma.BookingUpdateInput = {};

  if (wantsReschedule) {
    if (existing.status !== "pending" && existing.status !== "bevestigd") {
      return NextResponse.json(
        { error: "Kan datum niet wijzigen voor deze status" },
        { status: 400 }
      );
    }
    const datumStr = String(datumBody).trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(datumStr)) {
      return NextResponse.json({ error: "Ongeldige datum" }, { status: 400 });
    }
    const tijdslotNorm = normalizeTijdslotLabel(String(tijdslotBody));
    if (!tijdslotNorm) {
      return NextResponse.json({ error: "Ongeldig tijdslot" }, { status: 400 });
    }
    const service = SERVICES.find((s) => s.id === existing.behandelingId);
    if (!service) {
      return NextResponse.json({ error: "Onbekende behandeling" }, { status: 400 });
    }
    const beschikbaar = await getAvailableSlots(
      datumStr,
      service.duur,
      existing.id
    );
    const magStarten = new Set(beschikbaar.map(formatSlotLabel));
    if (!magStarten.has(tijdslotNorm)) {
      return NextResponse.json(
        {
          error:
            "Dit tijdslot is niet beschikbaar. Kies een andere tijd.",
        },
        { status: 409 }
      );
    }
    data.datum = parsePublicBookingDate(datumStr);
    data.tijdslot = tijdslotNorm;
  }

  if (wantsStatus) {
    data.status = statusForDb;
    if (statusForDb === "bevestigd") {
      data.bevestigdOp = new Date();
    }
    if (statusForDb === "geannuleerd") {
      data.geannuleerdOp = new Date();
      data.annuleringsReden = reden?.trim() ? reden.trim() : null;
    }
  }

  const booking = await prisma.booking.update({
    where: { id: params.id },
    data,
  });

  const redenVoorAnnuleringMail =
    reden?.trim() ? reden.trim() : booking.annuleringsReden ?? undefined;

  try {
    if (wantsStatus && statusForDb === "bevestigd") {
      await stuurBevestiging(booking);
    } else if (wantsStatus && statusForDb === "geannuleerd") {
      console.log("[admin PATCH] annulering: stuurAnnulering start", {
        bookingId: booking.id,
        naar: booking.email,
        reden: redenVoorAnnuleringMail ?? "(geen)",
      });
      const mailResult = await stuurAnnulering(
        booking,
        redenVoorAnnuleringMail
      );
      console.log("[admin PATCH] annulering: stuurAnnulering klaar", {
        bookingId: booking.id,
        ok: mailResult.ok,
        error: mailResult.error ?? null,
      });
      if (!mailResult.ok) {
        console.error(
          "[admin PATCH] annulering: e-mail NIET verstuurd",
          mailResult.error
        );
      }
    } else if (wantsReschedule) {
      if (existing.status === "bevestigd") {
        await stuurBevestiging(booking);
      } else if (existing.status === "pending") {
        await stuurDatumTijdWijzigingPendingNaarKlant(booking);
      }
    }
  } catch (e) {
    console.error("[admin PATCH] e-mail uitzondering (niet opgevangen door stuur*):", e);
  }

  return NextResponse.json({ success: true, booking });
}
