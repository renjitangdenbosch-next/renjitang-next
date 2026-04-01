import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { prisma } from "@/lib/prisma";
import { LEGACY_SERVICE_ID_MAP, SERVICES } from "@/lib/site";

const TZ = "Europe/Amsterdam";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function alleenDatumAmsterdam(d: Date): Date {
  const z = toZonedTime(d, TZ);
  const ds = format(z, "yyyy-MM-dd");
  return fromZonedTime(`${ds}T00:00:00`, TZ);
}

function mapWpNaarBookingStatus(raw: string): string {
  const s = (raw || "").toLowerCase();
  if (s.includes("cancel")) return "geannuleerd";
  if (s.includes("approv") || s.includes("confirm")) return "bevestigd";
  if (s === "pending") return "pending";
  return "pending";
}

function vindServiceVoorDienst(dienst: string) {
  const d = dienst.trim();
  const legacyId = LEGACY_SERVICE_ID_MAP[d.toLowerCase()];
  if (legacyId) {
    const hit = SERVICES.find((s) => s.id === legacyId);
    if (hit) return hit;
  }
  return SERVICES.find(
    (s) =>
      s.id === d ||
      s.naam === d ||
      d.toLowerCase().includes(s.naam.toLowerCase()) ||
      s.naam.toLowerCase().includes(d.toLowerCase())
  );
}

function normaliseerTijd(t: string): string {
  const raw = (t || "09:00").trim().replace(/\s/g, "");
  const parts = raw.split(":");
  const hh = parseInt(parts[0] || "9", 10) || 0;
  const mm = parseInt(parts[1] || "0", 10) || 0;
  return `${pad(hh)}:${pad(mm)}`;
}

/** Ruwe BookingPress-klant (exportvelden + aliassen) */
export type ParsedWPKlant = {
  wpId: string;
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string | null;
  aangemaakt: Date | null;
};

export type ParsedWPBoeking = {
  wpId: string;
  klantNaam: string;
  klantEmail: string;
  klantTelefoon: string | null;
  dienst: string;
  datum: Date;
  tijd: string;
  status: string;
  notities: string | null;
};

function str(v: unknown): string | undefined {
  if (v == null) return undefined;
  const s = String(v).trim();
  return s === "" ? undefined : s;
}

function pick(
  o: Record<string, unknown>,
  ...keys: string[]
): string | undefined {
  for (const k of keys) {
    const v = str(o[k]);
    if (v !== undefined) return v;
  }
  return undefined;
}

function parseMaybeDate(v: unknown): Date | null {
  const s = str(v);
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Verzamel objecten die aan predicate voldoen (diep door arrays/nested objects) */
function collectRecords(
  root: unknown,
  predicate: (o: Record<string, unknown>) => boolean
): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const seen = new Set<unknown>();

  function walk(x: unknown) {
    if (x == null || typeof x !== "object") return;
    if (seen.has(x)) return;
    seen.add(x);

    if (Array.isArray(x)) {
      x.forEach(walk);
      return;
    }
    const o = x as Record<string, unknown>;
    if (predicate(o)) out.push(o);
    for (const v of Object.values(o)) walk(v);
  }

  walk(root);
  return out;
}

function isKlantRow(o: Record<string, unknown>): boolean {
  return (
    pick(o, "bookingpress_customer_id", "bookingpress_customer_ID") !==
    undefined
  );
}

function isBoekingRow(o: Record<string, unknown>): boolean {
  return (
    pick(
      o,
      "bookingpress_appointment_id",
      "bookingpress_appointment_ID",
      "appointment_id"
    ) !== undefined
  );
}

export function parseKlanten(data: unknown): ParsedWPKlant[] {
  const rows = collectRecords(data, isKlantRow);
  const byId = new Map<string, ParsedWPKlant>();

  for (const o of rows) {
    const wpId = pick(o, "bookingpress_customer_id", "bookingpress_customer_ID");
    if (!wpId) continue;

    const voornaam =
      pick(
        o,
        "bookingpress_user_firstname",
        "bookingpress_user_first_name",
        "firstname",
        "first_name"
      ) ?? "";
    const achternaam =
      pick(
        o,
        "bookingpress_user_lastname",
        "bookingpress_user_last_name",
        "lastname",
        "last_name"
      ) ?? "";
    const email =
      pick(o, "bookingpress_user_email", "user_email", "email") ?? "";
    const telefoon =
      pick(o, "bookingpress_user_phone", "user_phone", "phone") ?? null;
    const aangemaakt = parseMaybeDate(
      pick(o, "bookingpress_user_created", "user_created", "created", "created_at")
    );

    byId.set(wpId, {
      wpId,
      voornaam,
      achternaam,
      email,
      telefoon,
      aangemaakt,
    });
  }

  return Array.from(byId.values());
}

/** Parse datum+tijd naar één Date; `tijd` bewaart de (genormaliseerde) weergave-string */
function parseDatumTijd(
  dateStr: string | undefined,
  timeStr: string | undefined
): { datum: Date; tijd: string } | null {
  const dPart = dateStr?.trim() ?? "";
  if (!dPart) return null;

  const rawTime = (timeStr?.trim() || "00:00").replace(/\s/g, "");
  let hh = 0;
  let mm = 0;
  const parts = rawTime.split(":");
  if (parts.length >= 2) {
    hh = parseInt(parts[0], 10) || 0;
    mm = parseInt(parts[1], 10) || 0;
  }
  const tijd = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;

  if (dPart.includes("T")) {
    const datum = new Date(dPart);
    if (!Number.isNaN(datum.getTime())) {
      return { datum, tijd: rawTime || tijd };
    }
  }

  const isoGuess = `${dPart}T${tijd}:00`;
  let datum = new Date(isoGuess);
  if (Number.isNaN(datum.getTime())) {
    datum = new Date(`${dPart} ${tijd}`);
  }
  if (Number.isNaN(datum.getTime())) return null;
  return { datum, tijd: rawTime || tijd };
}

export function parseBoekingen(data: unknown): ParsedWPBoeking[] {
  const rows = collectRecords(data, isBoekingRow);
  const byId = new Map<string, ParsedWPBoeking>();

  for (const o of rows) {
    const wpId = pick(
      o,
      "bookingpress_appointment_id",
      "bookingpress_appointment_ID",
      "appointment_id"
    );
    if (!wpId) continue;

    const naamFromParts = [
      pick(o, "bookingpress_user_firstname", "customer_firstname"),
      pick(o, "bookingpress_user_lastname", "customer_lastname"),
    ]
      .filter(Boolean)
      .join(" ")
      .trim();
    const klantNaam =
      pick(
        o,
        "bookingpress_customer_name",
        "bookingpress_client_name",
        "customer_name",
        "client_name"
      ) ||
      naamFromParts ||
      "";

    const klantEmail =
      pick(
        o,
        "bookingpress_customer_email",
        "customer_email",
        "bookingpress_user_email"
      ) ?? "";
    const klantTelefoon =
      pick(
        o,
        "bookingpress_customer_phone",
        "customer_phone",
        "bookingpress_user_phone"
      ) ?? null;

    const dienst =
      pick(
        o,
        "bookingpress_service_name",
        "service_name",
        "bookingpress_service_title"
      ) ?? "";

    const dateRaw = pick(
      o,
      "bookingpress_appointment_date",
      "appointment_date",
      "booking_date",
      "bookingpress_date"
    );
    const timeRaw = pick(
      o,
      "bookingpress_appointment_time",
      "appointment_time",
      "booking_time",
      "bookingpress_time",
      "bookingpress_appointment_start_time"
    );

    const parsed = parseDatumTijd(dateRaw, timeRaw);
    if (!parsed) continue;

    const status =
      pick(
        o,
        "bookingpress_appointment_status",
        "appointment_status",
        "status"
      ) ?? "unknown";

    const notities =
      pick(
        o,
        "bookingpress_appointment_note",
        "bookingpress_appointment_internal_note",
        "appointment_note",
        "notes",
        "note"
      ) ?? null;

    byId.set(wpId, {
      wpId,
      klantNaam,
      klantEmail,
      klantTelefoon,
      dienst,
      datum: parsed.datum,
      tijd: parsed.tijd,
      status,
      notities,
    });
  }

  return Array.from(byId.values());
}

export async function importeerAlles(
  jsonString: string
): Promise<{
  klanten: number;
  boekingen: number;
  siteBoekingen: { upserted: number };
}> {
  let data: unknown;
  try {
    data = JSON.parse(jsonString) as unknown;
  } catch {
    throw new Error("Ongeldige JSON");
  }

  const klantenRows = parseKlanten(data);
  const boekingenRows = parseBoekingen(data);
  const now = new Date();

  for (const k of klantenRows) {
    await prisma.wPKlant.upsert({
      where: { wpId: k.wpId },
      create: {
        wpId: k.wpId,
        voornaam: k.voornaam,
        achternaam: k.achternaam,
        email: k.email,
        telefoon: k.telefoon,
        aangemaakt: k.aangemaakt,
        syncedAt: now,
      },
      update: {
        voornaam: k.voornaam,
        achternaam: k.achternaam,
        email: k.email,
        telefoon: k.telefoon,
        aangemaakt: k.aangemaakt,
        syncedAt: now,
      },
    });
  }

  for (const b of boekingenRows) {
    await prisma.wPBoeking.upsert({
      where: { wpId: b.wpId },
      create: {
        wpId: b.wpId,
        klantNaam: b.klantNaam,
        klantEmail: b.klantEmail,
        klantTelefoon: b.klantTelefoon,
        dienst: b.dienst,
        datum: b.datum,
        tijd: b.tijd,
        status: b.status,
        notities: b.notities,
        syncedAt: now,
      },
      update: {
        klantNaam: b.klantNaam,
        klantEmail: b.klantEmail,
        klantTelefoon: b.klantTelefoon,
        dienst: b.dienst,
        datum: b.datum,
        tijd: b.tijd,
        status: b.status,
        notities: b.notities,
        syncedAt: now,
      },
    });
  }

  let siteUpserted = 0;
  for (const b of boekingenRows) {
    const svc = vindServiceVoorDienst(b.dienst);
    const duur = svc?.duur ?? 60;
    const prijsEur = svc?.prijs ?? 60;
    const status = mapWpNaarBookingStatus(b.status);
    const tijdslot = normaliseerTijd(b.tijd);
    const datum = alleenDatumAmsterdam(b.datum);

    await prisma.booking.upsert({
      where: { wpId: b.wpId },
      create: {
        wpId: b.wpId,
        naam: b.klantNaam.trim() || "Onbekend",
        email: b.klantEmail,
        telefoon: (b.klantTelefoon || "").trim(),
        opmerking: b.notities,
        behandeling: svc?.naam ?? b.dienst,
        behandelingId: svc?.id ?? SERVICES[0].id,
        duur,
        prijs: new Prisma.Decimal(prijsEur),
        datum,
        tijdslot,
        status,
        bron: "import",
        bevestigdOp: status === "bevestigd" ? now : null,
        geannuleerdOp: status === "geannuleerd" ? now : null,
      },
      update: {
        naam: b.klantNaam.trim() || "Onbekend",
        email: b.klantEmail,
        telefoon: (b.klantTelefoon || "").trim(),
        opmerking: b.notities,
        behandeling: svc?.naam ?? b.dienst,
        behandelingId: svc?.id ?? SERVICES[0].id,
        duur,
        prijs: new Prisma.Decimal(prijsEur),
        datum,
        tijdslot,
        status,
        bron: "import",
        bevestigdOp: status === "bevestigd" ? now : null,
        geannuleerdOp: status === "geannuleerd" ? now : null,
      },
    });
    siteUpserted += 1;
  }

  return {
    klanten: klantenRows.length,
    boekingen: boekingenRows.length,
    siteBoekingen: { upserted: siteUpserted },
  };
}
