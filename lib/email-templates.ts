const header = `
<div style="background:#1A1A1A;padding:24px 32px;text-align:center">
  <p style="color:white;font-family:Georgia,serif;font-size:24px;
    margin:0;letter-spacing:2px">REN JI TANG</p>
  <p style="color:#C9A84C;font-size:11px;letter-spacing:3px;margin:4px 0 0">
    仁济堂 · ACUPUNCTUUR · MASSAGE · TCG
  </p>
</div>
<div style="height:3px;background:linear-gradient(
  90deg,#8B2635,#C9A84C,#8B2635)"></div>`;

const footer = `
<div style="background:#F5EFE6;padding:24px 32px;
  text-align:center;border-top:1px solid #e5e0d8;
  font-family:Arial,sans-serif">
  <p style="color:#8B2635;font-weight:bold;margin:0 0 8px;font-size:15px">
    Ren Ji Tang
  </p>
  <p style="color:#666;font-size:13px;margin:0;line-height:1.6">
    Hazenburgstede 7 · 5235 HR 's-Hertogenbosch<br/>
    Tel: 073 211 02 24 · 
    <a href="mailto:info@renjitang.nl" 
      style="color:#8B2635;text-decoration:none">
      info@renjitang.nl
    </a>
  </p>
  <p style="color:#999;font-size:11px;margin:12px 0 0">
    © 2026 Ren Ji Tang · 
    <a href="https://renjitang.nl/privacy" 
      style="color:#999;text-decoration:none">Privacybeleid</a>
  </p>
</div>`;

function wrap(content: string): string {
  return `<div style="font-family:Arial,sans-serif;background:#FAFAF8;
    max-width:600px;margin:0 auto;border-radius:8px;overflow:hidden;
    box-shadow:0 2px 8px rgba(0,0,0,0.1)">
    ${header}
    <div style="padding:40px 32px;background:white">
      ${content}
    </div>
    ${footer}
  </div>`;
}

function formatDatum(d: Date): string {
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function generateAnnuleringsToken(email: string, id: string): string {
  return Buffer.from(email + id).toString("base64").slice(0, 16);
}

export function generateAnnuleringsLink(email: string, id: string): string {
  const token = generateAnnuleringsToken(email, id);
  const base = (
    process.env.NEXTAUTH_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://renjitang.nl"
  ).replace(/\/$/, "");
  return `${base}/api/bookings/annuleer?id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`;
}

function absBookingsUrl(): string {
  const base = (
    process.env.NEXTAUTH_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://renjitang.nl"
  ).replace(/\/$/, "");
  return `${base}/bookings#stap-behandeling`;
}

function prijsEuro(b: BookingEmailData): string {
  const n =
    typeof b.prijs === "number"
      ? b.prijs
      : typeof b.prijs === "string"
        ? parseFloat(b.prijs)
        : Number(b.prijs.toString());
  return Number.isFinite(n) ? n.toFixed(2) : "0.00";
}

export type BookingEmailData = {
  id: string;
  naam: string;
  email: string;
  telefoon: string;
  opmerking?: string | null;
  behandeling: string;
  duur: number;
  prijs: { toString(): string; toNumber?(): number } | string | number;
  datum: Date;
  tijdslot: string;
  annuleringsReden?: string | null;
};

function afspraakBox(b: BookingEmailData): string {
  return `<div style="background:#F5EFE6;border-left:4px solid #8B2635;
    padding:16px 20px;border-radius:4px;margin:20px 0;
    font-family:Arial,sans-serif;font-size:14px;line-height:2">
    <strong>Behandeling:</strong> ${esc(b.behandeling)}<br/>
    <strong>Datum:</strong> ${formatDatum(new Date(b.datum))}<br/>
    <strong>Tijd:</strong> ${esc(b.tijdslot)}<br/>
    <strong>Duur:</strong> ${b.duur} minuten<br/>
    <strong>Prijs:</strong> €${prijsEuro(b)}
  </div>`;
}

function annuleerViaEmailBlock(booking: BookingEmailData): string {
  const annuleerLink = generateAnnuleringsLink(booking.email, booking.id);
  return `<div style="margin-top:20px;padding:16px;background:#fff9f9;
  border:1px solid #ffcccc;border-radius:8px;font-size:13px;
  color:#666;text-align:center">
  <p style="margin:0 0 8px">
    Wilt u annuleren? Dat kan tot 24 uur voor uw afspraak.
  </p>
  <a href="${esc(annuleerLink)}"
    style="color:#8B2635;text-decoration:underline;font-size:13px">
    Afspraak annuleren
  </a>
</div>`;
}

export type EmailTemplateResult = { subject: string; html: string };

export function aanvraagOntvangen(booking: BookingEmailData): EmailTemplateResult {
  const content = `
  <h2 style="color:#1A1A1A;font-family:Georgia,serif">
    Bedankt voor uw aanvraag
  </h2>
  <p>Beste ${esc(booking.naam)},</p>
  <p>Wij hebben uw aanvraag ontvangen en nemen zo spoedig 
  mogelijk contact op ter bevestiging.</p>
  ${afspraakBox(booking)}
  ${annuleerViaEmailBlock(booking)}
  <a href="https://renjitang.nl" style="display:inline-block;
    background:#8B2635;color:white;padding:12px 28px;
    border-radius:24px;text-decoration:none;font-size:14px">
    Bezoek onze website
  </a>
  <p style="color:#666;font-size:13px;margin-top:24px">
    Heeft u vragen? Bel ons op 073 211 02 24
  </p>`;
  return {
    subject: "Uw aanvraag is ontvangen — Ren Ji Tang",
    html: wrap(content),
  };
}

export function praktijkNieuweAanvraag(booking: BookingEmailData): EmailTemplateResult {
  const content = `
  <h2 style="color:#1A1A1A;font-family:Georgia,serif">
    Nieuwe boekingsaanvraag
  </h2>
  <div style="background:#f8f8f8;padding:16px 20px;
    border-radius:4px;margin:16px 0;font-size:14px;line-height:2">
    <strong>Naam:</strong> ${esc(booking.naam)}<br/>
    <strong>Email:</strong> ${esc(booking.email)}<br/>
    <strong>Telefoon:</strong> ${esc(booking.telefoon)}<br/>
    <strong>Opmerking:</strong> ${booking.opmerking?.trim() ? esc(booking.opmerking.trim()) : "geen"}
  </div>
  ${afspraakBox(booking)}
  <div style="display:flex;gap:12px;margin-top:20px">
    <a href="https://renjitang.nl/admin/boekingen"
      style="background:#2d6a4f;color:white;padding:12px 24px;
      border-radius:24px;text-decoration:none;font-size:14px">
      ✓ Bekijk en bevestig
    </a>
  </div>`;
  return {
    subject: `🆕 Nieuwe boeking: ${booking.naam} — ${booking.behandeling}`,
    html: wrap(content),
  };
}

export function boekingBevestigd(booking: BookingEmailData): EmailTemplateResult {
  const content = `
  <div style="text-align:center;margin-bottom:24px">
    <div style="font-size:48px">✅</div>
    <h2 style="color:#2d6a4f;font-family:Georgia,serif">
      Uw afspraak is bevestigd!
    </h2>
  </div>
  <p>Beste ${esc(booking.naam)}, wij verheugen ons op uw bezoek.</p>
  ${afspraakBox(booking)}
  ${annuleerViaEmailBlock(booking)}
  <div style="background:#FFF9E6;border:1px solid #C9A84C;
    padding:16px 20px;border-radius:4px;margin:20px 0;
    font-size:13px;line-height:2">
    <strong style="color:#8B2635">Praktische tips:</strong><br/>
    ✓ Kom 5 minuten voor uw afspraak<br/>
    ✓ Draag comfortabele, loshangende kleding<br/>
    ✓ Eet niet te zwaar voor de behandeling<br/>
    ✓ Annuleren? Minimaal 24 uur van tevoren
  </div>
  <a href="https://maps.google.com/?q=Hazenburgstede+7+Den+Bosch"
    style="display:inline-block;background:#8B2635;color:white;padding:12px 28px;
    border-radius:24px;text-decoration:none;font-size:14px">
    Route naar de praktijk
  </a>`;
  return {
    subject: "✅ Uw afspraak is bevestigd — Ren Ji Tang",
    html: wrap(content),
  };
}

export function boekingGeannuleerd(booking: BookingEmailData): EmailTemplateResult {
  const reden = booking.annuleringsReden?.trim();
  const content = `
  <h2 style="color:#1A1A1A;font-family:Georgia,serif">
    Afspraak geannuleerd
  </h2>
  <p>Beste ${esc(booking.naam)},</p>
  <p>Uw geplande afspraak bij Ren Ji Tang is geannuleerd.</p>
  ${afspraakBox(booking)}
  ${
    reden
      ? `<p style="font-size:14px;line-height:1.6"><strong>Reden:</strong> ${esc(reden)}</p>`
      : ""
  }
  <p style="color:#666;font-size:14px;line-height:1.6">
    Voor een nieuwe afspraak kunt u contact met ons opnemen of online boeken.
  </p>
  <a href="${esc(absBookingsUrl())}" style="display:inline-block;
    background:#8B2635;color:white;padding:12px 28px;
    border-radius:24px;text-decoration:none;font-size:14px;margin-top:16px">
    Nieuwe afspraak boeken
  </a>
  <p style="color:#666;font-size:13px;margin-top:24px">
    Vragen? Bel 073 211 02 24
  </p>`;
  return {
    subject: "Uw boeking is geannuleerd — Ren Ji Tang",
    html: wrap(content),
  };
}

export function herinnering(booking: BookingEmailData): EmailTemplateResult {
  const content = `
  <h2 style="color:#1A1A1A;font-family:Georgia,serif">
    Herinnering: morgen uw afspraak
  </h2>
  <p>Beste ${esc(booking.naam)},</p>
  <p>Morgen heeft u een afspraak bij Ren Ji Tang. Wij kijken ernaar uit u te verwelkomen.</p>
  ${afspraakBox(booking)}
  <p style="color:#666;font-size:13px;margin-top:20px">
    Heeft u vragen of moet u verzetten? Bel ons op 073 211 02 24.
  </p>`;
  return {
    subject: "⏰ Morgen uw afspraak bij Ren Ji Tang",
    html: wrap(content),
  };
}

/** @deprecated gebruik aanvraagOntvangen(booking).html */
export type BookingMailPayload = BookingEmailData;

export function bookingToMailPayload(b: {
  id: string;
  naam: string;
  email: string;
  telefoon: string;
  opmerking?: string | null;
  behandeling: string;
  duur: number;
  prijs: { toString(): string; toNumber?(): number } | string | number;
  datum: Date;
  tijdslot: string;
  annuleringsReden?: string | null;
}): BookingMailPayload {
  return { ...b };
}

export function subjectAanvraagOntvangen(): string {
  return "Uw aanvraag is ontvangen — Ren Ji Tang";
}

export function htmlAanvraagOntvangen(b: BookingMailPayload): string {
  return aanvraagOntvangen(b).html;
}

export function subjectPraktijkNieuweAanvraag(b: BookingMailPayload): string {
  return praktijkNieuweAanvraag(b).subject;
}

export function htmlPraktijkNieuweAanvraag(b: BookingMailPayload): string {
  return praktijkNieuweAanvraag(b).html;
}

export function subjectBoekingBevestigd(): string {
  return "✅ Uw afspraak is bevestigd — Ren Ji Tang";
}

export function htmlBoekingBevestigd(b: BookingMailPayload): string {
  return boekingBevestigd(b).html;
}

export function subjectBoekingGeannuleerd(): string {
  return "Uw boeking is geannuleerd — Ren Ji Tang";
}

export function htmlBoekingGeannuleerd(b: BookingMailPayload): string {
  return boekingGeannuleerd(b).html;
}

export function subjectHerinnering(): string {
  return "⏰ Morgen uw afspraak bij Ren Ji Tang";
}

export function htmlHerinnering(b: BookingMailPayload): string {
  return herinnering(b).html;
}
