import { SITE } from "@/lib/site";

const siteUrl = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || "https://www.renjitang.nl").replace(/\/$/, "");

export type BookingMailPayload = {
  id: string;
  naam: string;
  email: string;
  telefoon: string;
  opmerking?: string | null;
  behandeling: string;
  duur: number;
  prijsFormatted: string;
  datum: Date;
  tijdslot: string;
  annuleringsReden?: string | null;
};

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDatumNl(d: Date): string {
  return d.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Amsterdam",
  });
}

function emailShell(inner: string): string {
  const gold = "#C9A84C";
  const red = "#8B2635";
  const beige = "#F5EFE6";
  const dark = "#1A1A1A";
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
</head>
<body style="margin:0;padding:0;background:${beige};font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${beige};padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
          <tr>
            <td style="padding:28px 32px 16px;background:#FAFAF8;border-bottom:3px solid ${gold};">
              <p style="margin:0;font-size:22px;font-weight:600;color:${dark};letter-spacing:.02em;">${esc(SITE.name)}</p>
              <p style="margin:6px 0 0;font-size:12px;color:#78716c;text-transform:uppercase;letter-spacing:.2em;">Acupunctuur &amp; TCG</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;color:#44403c;font-size:16px;line-height:1.65;">
              ${inner}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;background:#FAFAF8;border-top:1px solid #e7e5e4;font-size:13px;color:#78716c;line-height:1.6;">
              <strong style="color:${dark};">Hazenburgstede 7</strong><br>
              5235 HR &apos;s-Hertogenbosch<br>
              ${esc(SITE.phone)} · <a href="mailto:${esc(SITE.email)}" style="color:${red};">${esc(SITE.email)}</a><br>
              <a href="${esc(siteUrl())}" style="color:${red};">${esc(siteUrl().replace(/^https?:\/\//, ""))}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function afspraakBlock(b: BookingMailPayload, titel = "Uw afspraak"): string {
  return `
  <table role="presentation" width="100%" style="background:#F5EFE6;border-radius:8px;padding:16px;margin:16px 0;border-left:4px solid #8B2635;">
    <tr><td style="padding:8px 12px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#8B2635;text-transform:uppercase;letter-spacing:.08em;">${esc(titel)}</p>
      <p style="margin:4px 0;"><strong>Behandeling:</strong> ${esc(b.behandeling)}</p>
      <p style="margin:4px 0;"><strong>Datum:</strong> ${esc(formatDatumNl(b.datum))}</p>
      <p style="margin:4px 0;"><strong>Tijd:</strong> ${esc(b.tijdslot)}</p>
      <p style="margin:4px 0;"><strong>Duur:</strong> ${b.duur} minuten</p>
      <p style="margin:4px 0;"><strong>Prijs:</strong> €${esc(b.prijsFormatted)}</p>
    </td></tr>
  </table>`;
}

export function subjectAanvraagOntvangen(): string {
  return "Uw aanvraag is ontvangen — Ren Ji Tang";
}

export function htmlAanvraagOntvangen(b: BookingMailPayload): string {
  const inner = `
    <p style="margin:0 0 16px;">Beste ${esc(b.naam)},</p>
    <p style="margin:0 0 16px;">Bedankt voor uw aanvraag bij Ren Ji Tang!</p>
    ${afspraakBlock(b, "Uw aanvraag")}
    <p style="margin:16px 0 0;">Wij nemen zo spoedig mogelijk contact met u op ter bevestiging.</p>
    <p style="margin:24px 0 0;">Met vriendelijke groet,<br><strong>Ren Ji Tang</strong></p>
  `;
  return emailShell(inner);
}

export function subjectPraktijkNieuweAanvraag(b: BookingMailPayload): string {
  return `🆕 Nieuwe boeking: ${b.naam} — ${b.behandeling}`;
}

export function htmlPraktijkNieuweAanvraag(b: BookingMailPayload): string {
  const adminUrl = `${siteUrl()}/admin/boekingen#${b.id}`;
  const inner = `
    <p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#8B2635;">Nieuwe boekingsaanvraag ontvangen!</p>
    <p style="margin:8px 0;"><strong>Klant:</strong> ${esc(b.naam)}</p>
    <p style="margin:8px 0;"><strong>E-mail:</strong> ${esc(b.email)}</p>
    <p style="margin:8px 0;"><strong>Telefoon:</strong> ${esc(b.telefoon)}</p>
    <p style="margin:8px 0;"><strong>Behandeling:</strong> ${esc(b.behandeling)}</p>
    <p style="margin:8px 0;"><strong>Datum:</strong> ${esc(formatDatumNl(b.datum))}</p>
    <p style="margin:8px 0;"><strong>Tijd:</strong> ${esc(b.tijdslot)}</p>
    <p style="margin:8px 0;"><strong>Opmerking:</strong> ${b.opmerking ? esc(b.opmerking) : "—"}</p>
    <p style="margin:24px 0 0;">
      <a href="${esc(adminUrl)}" style="display:inline-block;background:#8B2635;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600;">Bekijk en bevestig in beheer</a>
    </p>
    <p style="margin:12px 0 0;font-size:12px;color:#78716c;">${esc(adminUrl)}</p>
  `;
  return emailShell(inner);
}

export function subjectBoekingBevestigd(): string {
  return "✅ Uw boeking is bevestigd — Ren Ji Tang";
}

export function htmlBoekingBevestigd(b: BookingMailPayload): string {
  const inner = `
    <p style="margin:0 0 16px;">Beste ${esc(b.naam)},</p>
    <p style="margin:0 0 16px;">Geweldig nieuws! Uw boeking is bevestigd.</p>
    ${afspraakBlock(b)}
    <p style="margin:16px 0 8px;font-weight:600;color:#1A1A1A;">📍 Locatie</p>
    <p style="margin:0;">Hazenburgstede 7<br>5235 HR &apos;s-Hertogenbosch</p>
    <p style="margin:20px 0 8px;font-weight:600;color:#1A1A1A;">💡 Tips</p>
    <ul style="margin:0;padding-left:20px;color:#57534e;">
      <li>Kom 5 minuten van tevoren</li>
      <li>Draag comfortabele kleding</li>
      <li>Annuleren? Minimaal 24 uur van tevoren</li>
    </ul>
    <p style="margin:24px 0 0;">Tot dan!<br><strong>Ren Ji Tang</strong></p>
  `;
  return emailShell(inner);
}

export function subjectBoekingGeannuleerd(): string {
  return "Uw boeking is geannuleerd — Ren Ji Tang";
}

export function htmlBoekingGeannuleerd(b: BookingMailPayload): string {
  const reden = b.annuleringsReden?.trim();
  const inner = `
    <p style="margin:0 0 16px;">Beste ${esc(b.naam)},</p>
    <p style="margin:0 0 16px;">Uw geplande afspraak bij Ren Ji Tang is geannuleerd.</p>
    ${afspraakBlock(b)}
    ${reden ? `<p style="margin:16px 0;"><strong>Reden:</strong> ${esc(reden)}</p>` : ""}
    <p style="margin:16px 0 0;">Voor een nieuwe afspraak kunt u contact met ons opnemen of online boeken.</p>
    <p style="margin:24px 0 0;">Met vriendelijke groet,<br><strong>Ren Ji Tang</strong></p>
  `;
  return emailShell(inner);
}

export function subjectHerinnering(): string {
  return "⏰ Morgen uw afspraak bij Ren Ji Tang";
}

export function htmlHerinnering(b: BookingMailPayload): string {
  const inner = `
    <p style="margin:0 0 16px;">Beste ${esc(b.naam)},</p>
    <p style="margin:0 0 16px;">Herinnering: <strong>morgen</strong> heeft u een afspraak bij Ren Ji Tang!</p>
    ${afspraakBlock(b)}
    <p style="margin:16px 0 0;">Heeft u vragen? Bel ons: <strong>${esc(SITE.phone)}</strong></p>
    <p style="margin:24px 0 0;">Tot morgen!<br><strong>Ren Ji Tang</strong></p>
  `;
  return emailShell(inner);
}

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
  let p: string;
  if (typeof b.prijs === "number") p = b.prijs.toFixed(2);
  else if (typeof b.prijs === "string") p = parseFloat(b.prijs).toFixed(2);
  else p = Number(b.prijs.toString()).toFixed(2);
  return {
    id: b.id,
    naam: b.naam,
    email: b.email,
    telefoon: b.telefoon,
    opmerking: b.opmerking,
    behandeling: b.behandeling,
    duur: b.duur,
    prijsFormatted: p.replace(/\.00$/, ""),
    datum: b.datum,
    tijdslot: b.tijdslot,
    annuleringsReden: b.annuleringsReden,
  };
}
