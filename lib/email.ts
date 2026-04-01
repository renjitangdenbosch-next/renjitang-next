import { Resend } from "resend";
import {
  bookingToMailPayload,
  htmlAanvraagOntvangen,
  htmlBoekingBevestigd,
  htmlBoekingGeannuleerd,
  htmlHerinnering,
  htmlPraktijkNieuweAanvraag,
  subjectAanvraagOntvangen,
  subjectBoekingBevestigd,
  subjectBoekingGeannuleerd,
  subjectHerinnering,
  subjectPraktijkNieuweAanvraag,
  type BookingMailPayload,
} from "@/lib/email-templates";
import type { Booking } from "@prisma/client";

async function sendHtml(
  to: string,
  subject: string,
  html: string
): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM || "Ren Ji Tang <onboarding@resend.dev>";

  if (!key) {
    console.warn("[email] RESEND_API_KEY ontbreekt; geen mail verstuurd");
    return { ok: false, error: "E-mail niet geconfigureerd" };
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({ from, to, subject, html });

  if (error) {
    console.error("[email]", error);
    return { ok: false, error: String(error) };
  }
  return { ok: true };
}

function payloadFromBooking(b: Booking): BookingMailPayload {
  return bookingToMailPayload({
    id: b.id,
    naam: b.naam,
    email: b.email,
    telefoon: b.telefoon,
    opmerking: b.opmerking,
    behandeling: b.behandeling,
    duur: b.duur,
    prijs: b.prijs,
    datum: b.datum,
    tijdslot: b.tijdslot,
    annuleringsReden: b.annuleringsReden,
  });
}

export async function sendAanvraagOntvangen(
  booking: Booking
): Promise<{ ok: boolean; error?: string }> {
  const p = payloadFromBooking(booking);
  return sendHtml(booking.email, subjectAanvraagOntvangen(), htmlAanvraagOntvangen(p));
}

export async function sendPraktijkNieuweAanvraag(
  booking: Booking
): Promise<{ ok: boolean; error?: string }> {
  const adminTo = process.env.ADMIN_EMAIL || "info@renjitang.nl";
  const p = payloadFromBooking(booking);
  return sendHtml(
    adminTo,
    subjectPraktijkNieuweAanvraag(p),
    htmlPraktijkNieuweAanvraag(p)
  );
}

export async function sendBoekingBevestigd(
  booking: Booking
): Promise<{ ok: boolean; error?: string }> {
  const p = payloadFromBooking(booking);
  return sendHtml(
    booking.email,
    subjectBoekingBevestigd(),
    htmlBoekingBevestigd(p)
  );
}

export async function sendBoekingGeannuleerd(
  booking: Booking
): Promise<{ ok: boolean; error?: string }> {
  const p = payloadFromBooking(booking);
  return sendHtml(
    booking.email,
    subjectBoekingGeannuleerd(),
    htmlBoekingGeannuleerd(p)
  );
}

export async function sendHerinnering(
  booking: Booking
): Promise<{ ok: boolean; error?: string }> {
  const p = payloadFromBooking(booking);
  return sendHtml(booking.email, subjectHerinnering(), htmlHerinnering(p));
}

export async function stuurAanvraagMails(booking: Booking): Promise<void> {
  await Promise.all([
    sendAanvraagOntvangen(booking),
    sendPraktijkNieuweAanvraag(booking),
  ]);
}

export async function stuurBevestiging(
  booking: Booking
): Promise<{ ok: boolean; error?: string }> {
  return sendBoekingBevestigd(booking);
}

export async function stuurAnnulering(
  booking: Booking,
  reden?: string | null
): Promise<{ ok: boolean; error?: string }> {
  const merged: Booking = {
    ...booking,
    annuleringsReden:
      booking.annuleringsReden ?? (reden?.trim() ? reden.trim() : null),
  };
  return sendBoekingGeannuleerd(merged);
}

/** @deprecated gebruik sendAanvraagOntvangen */
export async function sendBookingConfirmationEmail(
  to: string,
  body: {
    name: string;
    service: string;
    date: Date;
    duration: number;
  }
): Promise<{ ok: boolean; error?: string }> {
  const inner = `
    <p>Beste ${body.name},</p>
    <p>We hebben uw aanvraag voor <strong>${body.service}</strong> ontvangen.</p>
    <p>Met vriendelijke groet,<br/>Ren Ji Tang</p>
  `;
  return sendHtml(
    to,
    "Bevestiging aanvraag afspraak — Ren Ji Tang",
    inner
  );
}
