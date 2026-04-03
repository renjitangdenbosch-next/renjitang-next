import { sendTransactionalHtml, stuurAnnulering } from "@/lib/email";
import { generateAnnuleringsToken } from "@/lib/email-templates";
import { SITE } from "@/lib/site";
import { prisma } from "@/lib/prisma";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function publicBaseUrl(): string {
  return (
    process.env.NEXTAUTH_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://renjitang.nl"
  ).replace(/\/$/, "");
}

function htmlPage(title: string, inner: string, status = 200) {
  return new Response(
    `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <style>
    body { font-family: Georgia, serif;
      background: #F5EFE6;
      display: flex; align-items: center;
      justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: white; border-radius: 16px;
      padding: 48px; max-width: 480px; text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #8B2635; font-size: 24px; }
    p { color: #666; line-height: 1.6; }
    a { color: #8B2635; }
    .muted h1 { color: #666; }
    .check { font-size: 48px; margin-bottom: 16px; }
    .ok h1 { color: #1A1A1A; font-size: 24px; margin-bottom: 8px; }
    .btn { display: inline-block; margin-top: 24px;
      background: #8B2635; color: white;
      padding: 12px 28px; border-radius: 24px;
      text-decoration: none; font-size: 14px; }
  </style>
</head>
<body>
${inner}
</body>
</html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  if (!token || !id) {
    return new Response("Ongeldige link", { status: 400 });
  }

  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!booking) {
    return new Response("Boeking niet gevonden", { status: 404 });
  }

  const verwachtToken = generateAnnuleringsToken(booking.email, id);
  if (token !== verwachtToken) {
    return new Response("Ongeldige link", { status: 403 });
  }

  const nu = new Date();
  const afspraak = new Date(booking.datum);
  const tijdVerschil = afspraak.getTime() - nu.getTime();
  const urenVerschil = tijdVerschil / (1000 * 60 * 60);

  if (urenVerschil < 24) {
    return htmlPage(
      "Annulering niet mogelijk",
      `<div class="card">
          <h1>Annulering niet mogelijk</h1>
          <p>Helaas kunt u uw afspraak niet meer annuleren.
          Annuleren is alleen mogelijk tot 24 uur voor de afspraak.</p>
          <p>Neem contact op via
            <a href="tel:0732110224">073 211 02 24</a> of
            <a href="mailto:info@renjitang.nl">info@renjitang.nl</a>
          </p>
        </div>`
    );
  }

  if (booking.status === "geannuleerd") {
    return htmlPage(
      "Al geannuleerd",
      `<div class="card muted">
          <h1>Afspraak al geannuleerd</h1>
          <p>Deze afspraak is al eerder geannuleerd.</p>
        </div>`
    );
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: {
      status: "geannuleerd",
      geannuleerdOp: new Date(),
      annuleringsReden: "Geannuleerd door klant via email link",
    },
  });

  try {
    await stuurAnnulering(updated, "Op uw verzoek geannuleerd");
  } catch (e) {
    console.error("Email fout:", e);
  }

  const adminTo = process.env.ADMIN_EMAIL || "info@renjitang.nl";

  if (process.env.BREVO_API_KEY && process.env.BREVO_FROM) {
    try {
      const { ok, error } = await sendTransactionalHtml(
        adminTo,
        `❌ Klant heeft geannuleerd: ${booking.naam}`,
        `
      <p>De klant heeft zelf geannuleerd via de email link.</p>
      <p><strong>Naam:</strong> ${esc(booking.naam)}</p>
      <p><strong>Behandeling:</strong> ${esc(booking.behandeling)}</p>
      <p><strong>Datum:</strong> ${esc(
        new Date(booking.datum).toLocaleDateString("nl-NL", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })
      )} om ${esc(booking.tijdslot)}</p>
    `
      );
      if (!ok) {
        console.error("Admin mail fout:", error);
      }
    } catch (e) {
      console.error("Admin mail fout:", e);
    }
  }

  const boekUrl = `${publicBaseUrl()}${SITE.bookingWizardUrl}`;

  return htmlPage(
    "Afspraak geannuleerd",
    `<div class="card ok">
        <div class="check">✅</div>
        <h1>Afspraak geannuleerd</h1>
        <p>Uw afspraak is geannuleerd.
        U ontvangt een bevestiging per e-mail.</p>
        <p>Wilt u een nieuwe afspraak maken?</p>
        <a href="${esc(boekUrl)}" class="btn">Maak nieuwe afspraak</a>
      </div>`
  );
}
