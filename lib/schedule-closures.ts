import { addDays, format } from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";

const TZ = "Europe/Amsterdam";

/** Standaardtekst sitewide banner (cursus juni 2026). */
export const COURSE_2026_JUNE_ANNOUNCEMENT =
  "Wegens cursus gesloten van 15 t/m 21 juni" as const;

export type ScheduleClosure = {
  id: string;
  /** Inclusief, `yyyy-MM-dd` (Amsterdam-kalenderdag). */
  start: string;
  end: string;
  /** Reden in kalender / API-fouten. */
  reason: string;
  /** Sitewide banner; leeg = geen banner voor deze periode. */
  announcement: string;
  /**
   * Eerste dag waarop de banner zichtbaar is (`yyyy-MM-dd`).
   * Leeg = meteen zichtbaar (ook vóór `start` — aanloopperiode).
   */
  announcementFrom?: string;
  /**
   * Laatste dag waarop de banner zichtbaar is (`yyyy-MM-dd`).
   * Leeg = t/m `end` van de sluiting.
   */
  announcementUntil?: string;
};

/** Geplande sluitingen — één bron voor banner, boekingen en agenda. */
export const SCHEDULE_CLOSURES: ScheduleClosure[] = [
  {
    id: "course-2026-june",
    start: "2026-06-15",
    end: "2026-06-21",
    reason: "Cursus gesloten",
    announcement: COURSE_2026_JUNE_ANNOUNCEMENT,
    announcementUntil: "2026-06-21",
    // Geen announcementFrom → banner al zichtbaar vóór 15 juni (aanloop)
  },
];

export function getClosureForDay(dayStr: string): ScheduleClosure | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dayStr)) return null;
  for (const c of SCHEDULE_CLOSURES) {
    if (dayStr >= c.start && dayStr <= c.end) return c;
  }
  return null;
}

export function isScheduleClosedDay(dayStr: string): boolean {
  return getClosureForDay(dayStr) !== null;
}

/** Vandaag (Amsterdam) als `yyyy-MM-dd`. */
export function todayAmsterdamDayStr(): string {
  return formatInTimeZone(new Date(), TZ, "yyyy-MM-dd");
}

function isCourseAnnouncementForced(): boolean {
  return process.env.NEXT_PUBLIC_FORCE_COURSE_ANNOUNCEMENT === "true";
}

/** Of de banner voor deze sluiting vandaag getoond moet worden. */
function isAnnouncementActiveForToday(c: ScheduleClosure, today: string): boolean {
  const text = c.announcement.trim();
  if (!text) return false;

  if (isCourseAnnouncementForced() && c.id === "course-2026-june") {
    return true;
  }

  const until = c.announcementUntil ?? c.end;
  if (today > until) return false;

  const from = c.announcementFrom;
  if (from && today < from) return false;

  // Geen check op c.start: aanloopbanner mag vóór de sluitingsperiode.
  return true;
}

/**
 * Actieve sitewide banner op basis van de huidige datum (Amsterdam).
 * Bij meerdere kandidaten: voorkeur voor `course-2026-june`.
 *
 * Preview: zet `NEXT_PUBLIC_FORCE_COURSE_ANNOUNCEMENT=true` om de cursusbanner
 * altijd te tonen (ook na 21 juni of buiten het normale venster).
 */
export function getActivePublicAnnouncement(): string | null {
  if (isCourseAnnouncementForced()) {
    return COURSE_2026_JUNE_ANNOUNCEMENT;
  }

  const today = todayAmsterdamDayStr();
  const active = SCHEDULE_CLOSURES.filter((c) =>
    isAnnouncementActiveForToday(c, today)
  );

  if (active.length === 0) return null;

  const course = active.find((c) => c.id === "course-2026-june");
  return (course ?? active[0]).announcement.trim();
}

/** Agenda-events voor admin (hele dag geblokkeerd, geen DB-record nodig). */
export function getScheduledClosureAgendaEvents(): {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: true;
}[] {
  const out: {
    id: string;
    title: string;
    start: string;
    end: string;
    allDay: true;
  }[] = [];

  for (const c of SCHEDULE_CLOSURES) {
    const [sy, sm, sd] = c.start.split("-").map(Number);
    const [ey, em, ed] = c.end.split("-").map(Number);
    let cursor = new Date(sy, sm - 1, sd);
    const end = new Date(ey, em - 1, ed);

    while (cursor.getTime() <= end.getTime()) {
      const cursorStr = format(cursor, "yyyy-MM-dd");
      const dayStart = fromZonedTime(`${cursorStr}T00:00:00`, TZ);
      const nextStr = format(addDays(cursor, 1), "yyyy-MM-dd");
      const nextStart = fromZonedTime(`${nextStr}T00:00:00`, TZ);
      out.push({
        id: `closure-${c.id}-${cursorStr}`,
        title: c.reason,
        start: dayStart.toISOString(),
        end: nextStart.toISOString(),
        allDay: true,
      });
      cursor = addDays(cursor, 1);
    }
  }

  return out;
}
