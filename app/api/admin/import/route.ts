import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { formatInTimeZone } from "date-fns-tz";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LEGACY_SERVICE_ID_MAP, SERVICES } from "@/lib/site";
import { parsePublicBookingDate } from "@/lib/slots";

const TZ = "Europe/Amsterdam";

type Row = {
  naam: string;
  email: string;
  telefoon?: string | null;
  behandeling: string;
  datum: string;
  tijdslot?: string;
  duur?: number;
  prijs?: number;
  opmerking?: string | null;
};

function vindService(naam: string, duurHint?: number) {
  const t = naam.trim();
  const legacyId = LEGACY_SERVICE_ID_MAP[t.toLowerCase()];
  if (legacyId) {
    const hit = SERVICES.find((s) => s.id === legacyId);
    if (hit) return hit;
  }
  const byId = SERVICES.find((s) => s.id === t);
  if (byId) return byId;
  const candidates = SERVICES.filter(
    (s) =>
      s.naam === t ||
      t.toLowerCase().includes(s.naam.toLowerCase()) ||
      s.naam.toLowerCase().includes(t.toLowerCase())
  );
  if (candidates.length === 1) return candidates[0];
  if (candidates.length > 1 && duurHint && duurHint > 0) {
    const byDuur = candidates.find((s) => s.duur === duurHint);
    if (byDuur) return byDuur;
  }
  return candidates[0];
}

function normaliseerTijd(t: string): string {
  const parts = t.trim().split(":");
  const hh = String(parseInt(parts[0] || "9", 10) || 9).padStart(2, "0");
  const mm = String(parseInt(parts[1] || "0", 10) || 0).padStart(2, "0");
  return `${hh}:${mm}`;
}

function parseDatumEnTijd(row: Row): { datum: Date; tijdslot: string } | null {
  const raw = row.datum.trim();
  if (!raw) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const tijd = normaliseerTijd(row.tijdslot || "09:00");
    return { datum: parsePublicBookingDate(raw), tijdslot: tijd };
  }

  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;

  const datePart = formatInTimeZone(d, TZ, "yyyy-MM-dd");
  const tijd = row.tijdslot?.trim()
    ? normaliseerTijd(row.tijdslot)
    : formatInTimeZone(d, TZ, "HH:mm");

  return {
    datum: parsePublicBookingDate(datePart),
    tijdslot: normaliseerTijd(tijd),
  };
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  let body: { rows: Row[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 });
  }
  const rows = body.rows || [];
  const imported: string[] = [];
  const skipped: { email: string; reason: string }[] = [];

  for (const row of rows) {
    const parsed = parseDatumEnTijd(row);
    if (!parsed) {
      skipped.push({ email: row.email || "", reason: "Ongeldige datum/tijd" });
      continue;
    }

    const svc = vindService(row.behandeling, row.duur);
    const duur =
      row.duur && row.duur > 0 ? row.duur : svc?.duur ?? 60;
    const prijsEur =
      row.prijs != null && row.prijs > 0 ? row.prijs : svc?.prijs ?? 60;

    const dup = await prisma.booking.findFirst({
      where: {
        email: row.email.trim().toLowerCase(),
        datum: parsed.datum,
        tijdslot: parsed.tijdslot,
      },
    });
    if (dup) {
      skipped.push({
        email: row.email,
        reason: "Duplicaat (zelfde e-mail, dag en tijd)",
      });
      continue;
    }

    const b = await prisma.booking.create({
      data: {
        naam: row.naam.trim(),
        email: row.email.trim().toLowerCase(),
        telefoon: (row.telefoon || "").trim(),
        opmerking: row.opmerking?.trim() || null,
        behandeling: svc?.naam ?? row.behandeling.trim(),
        behandelingId: svc?.id ?? SERVICES[0].id,
        duur,
        prijs: new Prisma.Decimal(prijsEur),
        datum: parsed.datum,
        tijdslot: parsed.tijdslot,
        status: "pending",
        bron: "import",
      },
    });
    imported.push(b.id);
  }

  return NextResponse.json({
    imported: imported.length,
    ids: imported,
    skipped,
  });
}
