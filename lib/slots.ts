import {
  addDays,
  addMinutes,
  areIntervalsOverlapping,
  format,
  getDay,
  isBefore,
} from "date-fns";
import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";
import { prisma } from "@/lib/prisma";

const TZ = "Europe/Amsterdam";
export const SLOT_BUFFER_MIN = 15;
const SLOT_STEP_MIN = 30;

/** Vakantie 2026: Amsterdam-kalenderdatum als `yyyy-MM-dd` (zelfde als `dayStr` in deze module). */
const VACATION_2026_START = "2026-04-06";
const VACATION_2026_END = "2026-04-27";

function isVacationClosedDay(dayStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dayStr)) return false;
  return dayStr >= VACATION_2026_START && dayStr <= VACATION_2026_END;
}

/** JS getDay: 0=zo, 1=ma, … 6=za. Maandag gesloten. Di–vr 09:00–20:00, za–zo 09:00–17:00 */
function defaultDayWindowMinutes(dow: number): { startMin: number; endMin: number } | null {
  if (dow === 1) return null;
  if (dow >= 2 && dow <= 5) return { startMin: 9 * 60, endMin: 20 * 60 };
  if (dow === 0 || dow === 6) return { startMin: 9 * 60, endMin: 17 * 60 };
  return null;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function parseTimeToMinutes(t: string): number | null {
  const p = t.trim().split(":");
  if (p.length < 2) return null;
  const hh = parseInt(p[0], 10);
  const mm = parseInt(p[1], 10);
  if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
  return hh * 60 + mm;
}

/** `yyyy-MM-dd` → Amsterdam middernacht als UTC-Date (opslag `datum` op boeking) */
export function parsePublicBookingDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return fromZonedTime(`${y}-${pad(m)}-${pad(d)}T00:00:00`, TZ);
}

/** Starttijd van een boeking in Amsterdam */
export function bookingStartUtc(booking: {
  datum: Date;
  tijdslot: string;
}): Date {
  const z = toZonedTime(booking.datum, TZ);
  const d = format(z, "yyyy-MM-dd");
  const mins = parseTimeToMinutes(booking.tijdslot);
  if (mins == null) {
    return fromZonedTime(`${d}T09:00:00`, TZ);
  }
  const hh = Math.floor(mins / 60);
  const mm = mins % 60;
  return fromZonedTime(`${d}T${pad(hh)}:${pad(mm)}:00`, TZ);
}

function amsterdamDayBounds(dayStr: string): { dayStart: Date; nextStart: Date } {
  const z = toZonedTime(parsePublicBookingDate(dayStr), TZ);
  const ds = format(z, "yyyy-MM-dd");
  const dayStart = fromZonedTime(`${ds}T00:00:00`, TZ);
  const nextStart = fromZonedTime(
    `${format(addDays(z, 1), "yyyy-MM-dd")}T00:00:00`,
    TZ
  );
  return { dayStart, nextStart };
}

/** Beschikbare openingsvensters (minuten vanaf middernacht) voor die kalenderdag */
async function dayWindowsMinutes(dayStr: string): Promise<
  { startMin: number; endMin: number }[]
> {
  const z = toZonedTime(parsePublicBookingDate(dayStr), TZ);
  const dow = getDay(z);

  const custom = await prisma.tijdslot.findMany({
    where: { dag: dow, actief: true },
    orderBy: { startTijd: "asc" },
  });

  if (custom.length > 0) {
    const windows: { startMin: number; endMin: number }[] = [];
    for (const row of custom) {
      const s = parseTimeToMinutes(row.startTijd);
      const e = parseTimeToMinutes(row.eindTijd);
      if (s == null || e == null || e <= s) continue;
      windows.push({ startMin: s, endMin: e });
    }
    return windows;
  }

  const def = defaultDayWindowMinutes(dow);
  return def ? [def] : [];
}

function windowUtcBounds(
  dayStr: string,
  w: { startMin: number; endMin: number }
): { start: Date; end: Date } {
  const z = toZonedTime(parsePublicBookingDate(dayStr), TZ);
  const ds = format(z, "yyyy-MM-dd");
  const sh = Math.floor(w.startMin / 60);
  const sm = w.startMin % 60;
  const eh = Math.floor(w.endMin / 60);
  const em = w.endMin % 60;
  const start = fromZonedTime(`${ds}T${pad(sh)}:${pad(sm)}:00`, TZ);
  const end = fromZonedTime(`${ds}T${pad(eh)}:${pad(em)}:00`, TZ);
  return { start, end };
}

export async function isDayFullyBlocked(dayStr: string): Promise<boolean> {
  const { dayStart, nextStart } = amsterdamDayBounds(dayStr);
  const full = await prisma.blokkering.findFirst({
    where: {
      datum: { gte: dayStart, lt: nextStart },
      tijdslot: null,
    },
  });
  return !!full;
}

export async function getBlockedSlotStarts(dayStr: string): Promise<Set<string>> {
  const { dayStart, nextStart } = amsterdamDayBounds(dayStr);
  const rows = await prisma.blokkering.findMany({
    where: {
      datum: { gte: dayStart, lt: nextStart },
      tijdslot: { not: null },
    },
    select: { tijdslot: true },
  });
  return new Set(
    rows.map((r) => r.tijdslot!).map((t) => t.trim())
  );
}

/** Busy intervals: elke bestaande boeking blokkeert duur + buffer vanaf start */
export async function getBusyIntervalsForDay(
  dayStr: string,
  excludeBookingId?: string
): Promise<{ start: Date; end: Date }[]> {
  const { dayStart, nextStart } = amsterdamDayBounds(dayStr);
  const bookings = await prisma.booking.findMany({
    where: {
      datum: { gte: dayStart, lt: nextStart },
      status: { not: "geannuleerd" },
      ...(excludeBookingId
        ? { id: { not: excludeBookingId } }
        : {}),
    },
    select: { datum: true, tijdslot: true, duur: true },
  });
  return bookings.map((b) => ({
    start: bookingStartUtc(b),
    end: addMinutes(bookingStartUtc(b), b.duur + SLOT_BUFFER_MIN),
  }));
}

export async function getAvailableSlots(
  dayStr: string,
  durationMin: number,
  excludeBookingId?: string
): Promise<Date[]> {
  if (isVacationClosedDay(dayStr)) return [];
  if (await isDayFullyBlocked(dayStr)) return [];

  const windows = await dayWindowsMinutes(dayStr);
  if (windows.length === 0) return [];

  const busy = await getBusyIntervalsForDay(dayStr, excludeBookingId);
  const blockedStarts = await getBlockedSlotStarts(dayStr);
  const now = new Date();
  const out: Date[] = [];
  const occupancy = durationMin + SLOT_BUFFER_MIN;

  for (const w of windows) {
    const { start: winStart, end: winEnd } = windowUtcBounds(dayStr, w);
    const lastStart = addMinutes(winEnd, -durationMin).getTime();
    if (!isBefore(winStart, winEnd)) continue;

    for (
      let t = winStart.getTime();
      t <= lastStart;
      t += SLOT_STEP_MIN * 60 * 1000
    ) {
      const slot = new Date(t);
      const isTodayAmsterdam =
        formatInTimeZone(slot, TZ, "yyyy-MM-dd") ===
        formatInTimeZone(now, TZ, "yyyy-MM-dd");
      if (isTodayAmsterdam && slot.getTime() <= now.getTime()) continue;

      const slotLabel = formatInTimeZone(slot, TZ, "HH:mm");
      if (blockedStarts.has(slotLabel)) continue;

      const candidate = {
        start: slot,
        end: addMinutes(slot, occupancy),
      };
      if (addMinutes(slot, durationMin) > winEnd) continue;

      const overlaps = busy.some((b) =>
        areIntervalsOverlapping(b, candidate, { inclusive: false })
      );
      if (!overlaps) out.push(slot);
    }
  }

  return out;
}

export function formatSlotLabel(d: Date): string {
  return formatInTimeZone(d, TZ, "HH:mm");
}

/** Client-tijd naar hetzelfde HH:mm-formaat als `formatSlotLabel` (leading zeros). */
export function normalizeTijdslotLabel(t: string): string | null {
  const mins = parseTimeToMinutes(t);
  if (mins == null) return null;
  const hh = Math.floor(mins / 60);
  const mm = mins % 60;
  return `${pad(hh)}:${pad(mm)}`;
}
