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

export type SendHtmlOptions = {
  replyTo?: string;
};

function brevoErrorMessage(data: unknown): string {
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (typeof o.message === "string") return o.message;
    if (Array.isArray(o.message)) {
      return o.message.map(String).join("; ");
    }
    if (typeof o.code === "string") return o.code;
  }
  return "Onbekende fout";
}

async function sendHtml(
  to: string,
  subject: string,
  html: string,
  options?: SendHtmlOptions
): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.BREVO_API_KEY?.trim();
  const fromEmail = process.env.BREVO_FROM?.trim();

  console.log("[email] Brevo env check", {
    hasBREVO_API_KEY: Boolean(key),
    BREVO_API_KEY_length: key?.length ?? 0,
    BREVO_API_KEY_prefix: key ? `${key.slice(0, 14)}…` : null,
    BREVO_FROM: fromEmail ?? null,
    to,
  });

  if (!key) {
    console.warn("[email] BREVO_API_KEY ontbreekt; geen mail verstuurd");
    return { ok: false, error: "E-mail niet geconfigureerd" };
  }
  if (!fromEmail) {
    console.warn("[email] BREVO_FROM ontbreekt; geen mail verstuurd");
    return { ok: false, error: "E-mail niet geconfigureerd" };
  }

  const body: Record<string, unknown> = {
    sender: { name: "Ren Ji Tang", email: fromEmail },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  };
  if (options?.replyTo) {
    body.replyTo = { email: options.replyTo };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": key,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    });

    const rawText = await response.text();
    let data: unknown = {};
    if (rawText) {
      try {
        data = JSON.parse(rawText) as unknown;
      } catch (parseErr) {
        console.error("[email] Brevo response is geen JSON", {
          status: response.status,
          rawPreview: rawText.slice(0, 500),
          parseErr,
        });
        data = { rawPreview: rawText.slice(0, 200) };
      }
    }

    if (!response.ok) {
      const err = brevoErrorMessage(data);
      console.error("[email] Brevo API error", {
        status: response.status,
        statusText: response.statusText,
        errorMessage: err,
        responseBody: data,
      });
      return { ok: false, error: err };
    }

    console.log("[email] Brevo send OK", {
      status: response.status,
      messageId:
        data && typeof data === "object" && "messageId" in data
          ? (data as { messageId?: string }).messageId
          : undefined,
    });
    return { ok: true };
  } catch (err) {
    console.error("[email] Brevo fetch exception (netwerk/timeout)", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
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
  const [r1, r2] = await Promise.all([
    sendAanvraagOntvangen(booking),
    sendPraktijkNieuweAanvraag(booking),
  ]);
  if (!r1.ok) {
    console.error("[email] sendAanvraagOntvangen mislukt", r1.error);
  }
  if (!r2.ok) {
    console.error("[email] sendPraktijkNieuweAanvraag mislukt", r2.error);
  }
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
  const uitBody = reden?.trim() ? reden.trim() : null;
  const merged: Booking = {
    ...booking,
    /** Expliciete reden uit de aanroep gaat vóór DB-waarde (betrouwbaar in admin-PATCH). */
    annuleringsReden: uitBody ?? booking.annuleringsReden ?? null,
  };
  return sendBoekingGeannuleerd(merged);
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Mail naar klant bij door de praktijk gewijzigde datum/tijd zolang de boeking nog pending is. */
export async function stuurDatumTijdWijzigingPendingNaarKlant(
  booking: Booking
): Promise<{ ok: boolean; error?: string }> {
  const datumNl = new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(booking.datum);
  const html = `
<div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;max-width:560px">
  <p>Beste ${escHtml(booking.naam)},</p>
  <p>De datum en het tijdslot van uw <strong>aanvraag</strong> zijn door de praktijk aangepast.</p>
  <p style="background:#f5f5f0;padding:12px 16px;border-radius:8px">
    <strong>Behandeling / 治疗：</strong> ${escHtml(booking.behandeling)}<br/>
    <strong>Datum / 日期：</strong> ${escHtml(datumNl)}<br/>
    <strong>Tijd / 时间：</strong> ${escHtml(booking.tijdslot)}
  </p>
  <p style="color:#555;font-size:14px">
    日期/时间已更改 — 以上为新的预约申请时间。
  </p>
  <p>Met vriendelijke groet,<br/>Ren Ji Tang</p>
</div>`;
  return sendTransactionalHtml(
    booking.email,
    "Datum/tijd gewijzigd / 日期/时间已更改 — Ren Ji Tang",
    html
  );
}

/** Transactionele HTML-mail via Brevo (o.a. site-aanvraag, admin-notificaties). */
export async function sendTransactionalHtml(
  to: string,
  subject: string,
  html: string,
  options?: SendHtmlOptions
): Promise<{ ok: boolean; error?: string }> {
  return sendHtml(to, subject, html, options);
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
