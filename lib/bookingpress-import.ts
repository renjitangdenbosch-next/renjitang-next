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

/** BookingPress `bookingpress_appointment_status`: 1 bevestigd, 0 pending, 2 geannuleerd */
function mapBookingPressAppointmentStatus(raw: unknown): string {
  const s = String(raw ?? "").trim().toLowerCase();
  if (s === "1") return "bevestigd";
  if (s === "2") return "geannuleerd";
  if (s === "0") return "pending";
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
  /** Gemapt voor site + WPBoeking */
  status: string;
  notities: string | null;
  duurMin: number | null;
  prijsEur: number | null;
  createdAt: Date | null;
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

function pickIntMinuten(v: unknown): number | null {
  if (v == null || v === "") return null;
  const n = typeof v === "number" ? Math.round(v) : parseInt(String(v).trim(), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function pickPrijsEuro(v: unknown): number | null {
  if (v == null || v === "") return null;
  const s = String(v).trim().replace(",", ".");
  const n = typeof v === "number" ? v : parseFloat(s);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/** `bookingpress_appointment_time`: eerste 5 tekens zoals `11:40` (uit `11:40:00`) */
function appointmentTimeNaarTijdslot(raw: unknown): string {
  const s = String(raw ?? "").replace(/\s/g, "");
  if (!s) return "00:00";
  const head = s.slice(0, 5);
  if (/^\d{2}:\d{2}$/.test(head)) return head;
  const m = s.match(/^(\d{1,2}):(\d{2})/);
  if (m) return `${m[1].padStart(2, "0")}:${m[2]}`;
  return normaliseerTijd(s);
}

function telefoonZonderSpaties(raw: unknown): string | null {
  if (raw == null) return null;
  const t = String(raw).replace(/\s/g, "").trim();
  return t === "" ? null : t;
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
  if (
    pick(
      o,
      "bookingpress_appointment_id",
      "bookingpress_appointment_ID",
      "appointment_id",
      /** phpMyAdmin-export van `wp_bookingpress_appointment_bookings` */
      "bookingpress_appointment_booking_id",
      "bookingpress_appointment_booking_ID"
    ) !== undefined
  ) {
    return true;
  }
  return false;
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
        "bookingpress_customer_firstname",
        "bookingpress_customer_first_name",
        "firstname",
        "first_name"
      ) ?? "";
    const achternaam =
      pick(
        o,
        "bookingpress_user_lastname",
        "bookingpress_user_last_name",
        "bookingpress_customer_lastname",
        "bookingpress_customer_last_name",
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
  let dPart = dateStr?.trim() ?? "";
  let tFromField = timeStr?.trim();

  /** `Y-m-d H:i:s` of vergelijkbaar in één kolom (phpMyAdmin) */
  if (dPart && !dPart.includes("T") && /^\d{4}-\d{2}-\d{2}\s+\S/.test(dPart)) {
    const sp = dPart.indexOf(" ");
    const timeChunk = dPart.slice(sp + 1).trim();
    dPart = dPart.slice(0, 10);
    if (!tFromField) tFromField = timeChunk;
  }

  if (dPart.includes("T")) {
    const [da, rest] = dPart.split("T");
    dPart = da;
    if (!tFromField && rest) tFromField = rest.replace(/Z$/i, "");
  }

  if (!dPart) return null;

  let rawTime = (tFromField || "00:00").replace(/\s/g, "");
  /** Tijdveld soms volledige datetime of `HH:mm:ss` */
  if (rawTime.includes("T") || /^\d{4}-\d{2}-\d{2}/.test(rawTime)) {
    const td = new Date(rawTime);
    if (!Number.isNaN(td.getTime())) {
      rawTime = `${String(td.getHours()).padStart(2, "0")}:${String(
        td.getMinutes()
      ).padStart(2, "0")}`;
    }
  } else {
    const timeMatch = rawTime.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
    if (timeMatch) {
      rawTime = `${timeMatch[1].padStart(2, "0")}:${timeMatch[2]}`;
    }
  }
  let hh = 0;
  let mm = 0;
  const parts = rawTime.split(":");
  if (parts.length >= 2) {
    hh = parseInt(parts[0], 10) || 0;
    mm = parseInt(parts[1], 10) || 0;
  }
  const tijd = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;

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
      "bookingpress_appointment_booking_id",
      "bookingpress_appointment_booking_ID",
      "bookingpress_appointment_id",
      "bookingpress_appointment_ID",
      "appointment_id"
    );
    if (!wpId) continue;

    const fn =
      pick(o, "bookingpress_customer_firstname", "bookingpress_customer_first_name") ??
      "";
    const ln =
      pick(o, "bookingpress_customer_lastname", "bookingpress_customer_last_name") ??
      "";
    const naamFromParts = [fn, ln].filter(Boolean).join(" ").trim();
    const klantNaam =
      naamFromParts ||
      pick(
        o,
        "bookingpress_customer_name",
        "bookingpress_client_name",
        "customer_name",
        "client_name",
        "bookingpress_user_firstname"
      ) ||
      pick(o, "bookingpress_user_lastname") ||
      "";

    const klantEmail =
      pick(
        o,
        "bookingpress_customer_email",
        "customer_email",
        "bookingpress_user_email"
      ) ?? "";

    const klantTelefoon = telefoonZonderSpaties(
      pick(o, "bookingpress_customer_phone", "customer_phone", "bookingpress_user_phone")
    );

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
      "bookingpress_appointed_date",
      "appointment_date",
      "booking_date",
      "bookingpress_date"
    );
    const timeField = pick(
      o,
      "bookingpress_appointment_time",
      "bookingpress_appointment_slot_start_time",
      "appointment_time",
      "booking_time",
      "bookingpress_time",
      "bookingpress_appointment_start_time"
    );
    const tijdslot = appointmentTimeNaarTijdslot(timeField);

    const parsed = parseDatumTijd(dateRaw, tijdslot);
    if (!parsed) continue;

    const statusRaw = pick(
      o,
      "bookingpress_appointment_status",
      "bookingpress_booking_status",
      "appointment_status",
      "status"
    );
    const status = mapBookingPressAppointmentStatus(statusRaw ?? "0");

    const notities =
      pick(
        o,
        "bookingpress_appointment_internal_note",
        "bookingpress_appointment_note",
        "appointment_note",
        "notes",
        "note"
      ) ?? null;

    const duurMin = pickIntMinuten(o.bookingpress_service_duration_val);
    const prijsEur = pickPrijsEuro(o.bookingpress_service_price);
    const createdAt = parseMaybeDate(
      pick(o, "bookingpress_created_at", "created_at")
    );

    byId.set(wpId, {
      wpId,
      klantNaam,
      klantEmail,
      klantTelefoon,
      dienst,
      datum: parsed.datum,
      tijd: tijdslot,
      status,
      notities,
      duurMin,
      prijsEur,
      createdAt,
    });
  }

  return Array.from(byId.values());
}

const IMPORT_BATCH_SIZE = 10;

export type BookingPressBatchCursor = {
  phase: "klanten" | "wpBoekingen" | "siteBoekingen";
  offset: number;
  siteUpsertsSoFar: number;
};

export type BookingPressBatchResult = {
  done: boolean;
  cursor: BookingPressBatchCursor | null;
  progress: {
    phase: BookingPressBatchCursor["phase"];
    processedInPhase: number;
    totalInPhase: number;
    batchProcessed: number;
    totals: { klanten: number; boekingen: number };
  };
  stats?: {
    klanten: number;
    boekingen: number;
    siteBoekingen: { upserted: number };
  };
};

export async function importeerBookingPressBatch(
  jsonString: string,
  cursor: BookingPressBatchCursor | null
): Promise<BookingPressBatchResult> {
  let data: unknown;
  try {
    data = JSON.parse(jsonString) as unknown;
  } catch {
    throw new Error("Ongeldige JSON");
  }

  const klantenRows = parseKlanten(data);
  const boekingenRows = parseBoekingen(data);
  const now = new Date();

  const phase = cursor?.phase ?? "klanten";
  const offset = cursor?.offset ?? 0;
  let siteUpsertsSoFar = cursor?.siteUpsertsSoFar ?? 0;

  const baseProgress = (
    p: BookingPressBatchCursor["phase"],
    processedInPhase: number,
    totalInPhase: number,
    batchProcessed: number
  ): BookingPressBatchResult["progress"] => ({
    phase: p,
    processedInPhase,
    totalInPhase,
    batchProcessed,
    totals: { klanten: klantenRows.length, boekingen: boekingenRows.length },
  });

  if (phase === "klanten") {
    const slice = klantenRows.slice(offset, offset + IMPORT_BATCH_SIZE);
    for (const k of slice) {
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
    const nextOff = offset + slice.length;
    if (nextOff >= klantenRows.length) {
      return {
        done: false,
        cursor: {
          phase: "wpBoekingen",
          offset: 0,
          siteUpsertsSoFar: 0,
        },
        progress: baseProgress(
          "klanten",
          klantenRows.length,
          klantenRows.length,
          slice.length
        ),
      };
    }
    return {
      done: false,
      cursor: {
        phase: "klanten",
        offset: nextOff,
        siteUpsertsSoFar: 0,
      },
      progress: baseProgress("klanten", nextOff, klantenRows.length, slice.length),
    };
  }

  if (phase === "wpBoekingen") {
    const slice = boekingenRows.slice(offset, offset + IMPORT_BATCH_SIZE);
    for (const b of slice) {
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
    const nextOff = offset + slice.length;
    if (nextOff >= boekingenRows.length) {
      return {
        done: false,
        cursor: {
          phase: "siteBoekingen",
          offset: 0,
          siteUpsertsSoFar: 0,
        },
        progress: baseProgress(
          "wpBoekingen",
          boekingenRows.length,
          boekingenRows.length,
          slice.length
        ),
      };
    }
    return {
      done: false,
      cursor: {
        phase: "wpBoekingen",
        offset: nextOff,
        siteUpsertsSoFar: 0,
      },
      progress: baseProgress(
        "wpBoekingen",
        nextOff,
        boekingenRows.length,
        slice.length
      ),
    };
  }

  const slice = boekingenRows.slice(offset, offset + IMPORT_BATCH_SIZE);
  for (const b of slice) {
    const svc = vindServiceVoorDienst(b.dienst);
    const duur = b.duurMin ?? svc?.duur ?? 60;
    const prijsEur = b.prijsEur ?? svc?.prijs ?? 60;
    const status = b.status;
    const tijdslot = normaliseerTijd(b.tijd);
    const datum = alleenDatumAmsterdam(b.datum);
    const email = b.klantEmail.trim().toLowerCase();
    const telefoon = b.klantTelefoon ?? "";
    const naam = b.klantNaam.trim() || "Onbekend";
    const stamp = b.createdAt ?? now;
    const bevestigdOp = status === "bevestigd" ? stamp : null;
    const geannuleerdOp = status === "geannuleerd" ? stamp : null;

    await prisma.booking.upsert({
      where: { wpId: b.wpId },
      create: {
        wpId: b.wpId,
        naam,
        email,
        telefoon,
        opmerking: b.notities,
        behandeling: b.dienst.trim() || (svc?.naam ?? SERVICES[0].naam),
        behandelingId: svc?.id ?? SERVICES[0].id,
        duur,
        prijs: new Prisma.Decimal(prijsEur),
        datum,
        tijdslot,
        status,
        bron: "wordpress",
        bevestigdOp,
        geannuleerdOp,
        ...(b.createdAt != null ? { createdAt: b.createdAt } : {}),
      },
      update: {
        naam,
        email,
        telefoon,
        opmerking: b.notities,
        behandeling: b.dienst.trim() || (svc?.naam ?? SERVICES[0].naam),
        behandelingId: svc?.id ?? SERVICES[0].id,
        duur,
        prijs: new Prisma.Decimal(prijsEur),
        datum,
        tijdslot,
        status,
        bron: "wordpress",
        bevestigdOp,
        geannuleerdOp,
        ...(b.createdAt != null ? { createdAt: b.createdAt } : {}),
      },
    });
    siteUpsertsSoFar += 1;
  }

  const nextOff = offset + slice.length;
  if (nextOff >= boekingenRows.length) {
    return {
      done: true,
      cursor: null,
      progress: baseProgress(
        "siteBoekingen",
        boekingenRows.length,
        boekingenRows.length,
        slice.length
      ),
      stats: {
        klanten: klantenRows.length,
        boekingen: boekingenRows.length,
        siteBoekingen: { upserted: siteUpsertsSoFar },
      },
    };
  }

  return {
    done: false,
    cursor: {
      phase: "siteBoekingen",
      offset: nextOff,
      siteUpsertsSoFar,
    },
    progress: baseProgress(
      "siteBoekingen",
      nextOff,
      boekingenRows.length,
      slice.length
    ),
  };
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
    const duur = b.duurMin ?? svc?.duur ?? 60;
    const prijsEur = b.prijsEur ?? svc?.prijs ?? 60;
    const status = b.status;
    const tijdslot = normaliseerTijd(b.tijd);
    const datum = alleenDatumAmsterdam(b.datum);
    const email = b.klantEmail.trim().toLowerCase();
    const telefoon = b.klantTelefoon ?? "";
    const naam = b.klantNaam.trim() || "Onbekend";
    const stamp = b.createdAt ?? now;
    const bevestigdOp = status === "bevestigd" ? stamp : null;
    const geannuleerdOp = status === "geannuleerd" ? stamp : null;

    await prisma.booking.upsert({
      where: { wpId: b.wpId },
      create: {
        wpId: b.wpId,
        naam,
        email,
        telefoon,
        opmerking: b.notities,
        behandeling: b.dienst.trim() || (svc?.naam ?? SERVICES[0].naam),
        behandelingId: svc?.id ?? SERVICES[0].id,
        duur,
        prijs: new Prisma.Decimal(prijsEur),
        datum,
        tijdslot,
        status,
        bron: "wordpress",
        bevestigdOp,
        geannuleerdOp,
        ...(b.createdAt != null ? { createdAt: b.createdAt } : {}),
      },
      update: {
        naam,
        email,
        telefoon,
        opmerking: b.notities,
        behandeling: b.dienst.trim() || (svc?.naam ?? SERVICES[0].naam),
        behandelingId: svc?.id ?? SERVICES[0].id,
        duur,
        prijs: new Prisma.Decimal(prijsEur),
        datum,
        tijdslot,
        status,
        bron: "wordpress",
        bevestigdOp,
        geannuleerdOp,
        ...(b.createdAt != null ? { createdAt: b.createdAt } : {}),
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
