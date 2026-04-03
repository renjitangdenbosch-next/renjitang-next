/** Vaste tijdzone voor boekingskalender en weergave (gelijk aan `lib/slots.ts`). */
export const BOOKING_DISPLAY_TZ = "Europe/Amsterdam";

/** Volledige datum voor e-mails en bevestigingen. */
export function formatBookingDatumVolledigNl(d: Date): string {
  return new Intl.DateTimeFormat("nl-NL", {
    timeZone: BOOKING_DISPLAY_TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Weekdag + dag + maand (zonder jaar), o.a. admin-serverlijst. */
export function formatBookingDatumWoMaandNl(d: Date): string {
  return new Intl.DateTimeFormat("nl-NL", {
    timeZone: BOOKING_DISPLAY_TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
}

/** Client admin-tabel: weekdag, korte maand, jaar. */
export function formatBookingDatumAdminRijNl(d: Date): string {
  return new Intl.DateTimeFormat("nl-NL", {
    timeZone: BOOKING_DISPLAY_TZ,
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

/** Korte notatie voor tabellen. */
export function formatBookingDatumTabelNl(d: Date): string {
  return new Intl.DateTimeFormat("nl-NL", {
    timeZone: BOOKING_DISPLAY_TZ,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

/**
 * Kalendercel (lokale tijd browser) → `yyyy-MM-dd` zonder `toISOString()`
 * (anders verschuift de dag in NL naar UTC).
 */
export function localCalendarDateToYyyyMmDd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Alleen `yyyy-MM-dd` van de gebruiker: weergave in Amsterdam, middag-UTC-anker
 * zodat de kalenderdag niet kantelt bij formatteren.
 */
export function formatYyyyMmDdSummaryNl(dayStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dayStr)) return dayStr;
  const [y, m, d] = dayStr.split("-").map(Number);
  const anchor = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return new Intl.DateTimeFormat("nl-NL", {
    timeZone: BOOKING_DISPLAY_TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(anchor);
}
