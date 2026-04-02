import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/site";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ongeldige aanvraag" }, { status: 400 });
  }

  const formType = body.formType === "afspraak" ? "afspraak" : "contact";
  const naam = String(body.naam ?? "").trim();
  const email = String(body.email ?? "").trim();
  const telefoon = String(body.telefoon ?? "").trim();
  const bericht = String(body.bericht ?? "").trim();

  if (!naam || !email || !telefoon) {
    return NextResponse.json({ ok: false, error: "Vul naam, e-mail en telefoon in." }, { status: 400 });
  }

  const behandeling =
    formType === "afspraak" ? String(body.behandeling ?? "").trim() : "";
  const voorkeursdatum =
    formType === "afspraak" ? String(body.voorkeursdatum ?? "").trim() : "";
  const voorkeurstijd =
    formType === "afspraak" ? String(body.voorkeurstijd ?? "").trim() : "";

  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "Ren Ji Tang <onboarding@resend.dev>";
  const adminTo = process.env.ADMIN_EMAIL || SITE.email;

  const rows =
    formType === "afspraak"
      ? `
    <tr><td>Behandeling</td><td>${esc(behandeling || "—")}</td></tr>
    <tr><td>Voorkeursdatum</td><td>${esc(voorkeursdatum || "—")}</td></tr>
    <tr><td>Voorkeurstijdstip</td><td>${esc(voorkeurstijd || "—")}</td></tr>
    <tr><td>Bericht</td><td>${esc(bericht || "—")}</td></tr>
  `
      : `<tr><td>Bericht</td><td>${esc(bericht || "—")}</td></tr>`;

  const html = `
    <h1>${formType === "afspraak" ? "Afspraakaanvraag" : "Contactformulier"}</h1>
    <table>
    <tr><td>Naam</td><td>${esc(naam)}</td></tr>
    <tr><td>E-mail</td><td>${esc(email)}</td></tr>
    <tr><td>Telefoon</td><td>${esc(telefoon)}</td></tr>
    ${rows}
    </table>
  `;

  if (!key) {
    console.warn("[site-aanvraag] RESEND_API_KEY ontbreekt");
    return NextResponse.json({ ok: true, warning: "E-mail niet verstuurd (geen API key)." });
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: adminTo,
    replyTo: email,
    subject:
      formType === "afspraak"
        ? `Afspraakaanvraag website — ${naam}`
        : `Contactformulier website — ${naam}`,
    html,
  });

  if (error) {
    console.error("[site-aanvraag]", error);
    return NextResponse.json({ ok: false, error: "Versturen mislukt." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
