"use client";

import type { CSSProperties } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { nl } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { nl };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

export type AgendaEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: {
    type?: "booking" | "block";
    status?: string;
    bookingId?: string;
    naam?: string;
    email?: string;
    telefoon?: string;
    behandeling?: string;
    tijdslot?: string;
    opmerking?: string | null;
  };
};

type Props = {
  events: AgendaEvent[];
  eventPropGetter?: (event: AgendaEvent) => { style?: CSSProperties };
  onSelectEvent?: (event: AgendaEvent) => void;
};

export function AgendaCalendar({
  events,
  eventPropGetter,
  onSelectEvent,
}: Props) {
  return (
    <div className="h-[70vh] min-h-[420px] rounded-xl border border-stone-200 bg-white p-2 dark:border-stone-700 dark:bg-stone-900 [&_.rbc-toolbar]:flex-wrap [&_.rbc-toolbar]:gap-2">
      <Calendar
        localizer={localizer}
        culture="nl"
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["month", "week", "day", "agenda"]}
        eventPropGetter={
          eventPropGetter
            ? (e) => eventPropGetter(e as AgendaEvent)
            : undefined
        }
        onSelectEvent={
          onSelectEvent
            ? (e) => onSelectEvent(e as AgendaEvent)
            : undefined
        }
        messages={{
          next: "Volgende",
          previous: "Vorige",
          today: "Vandaag",
          month: "Maand",
          week: "Week",
          day: "Dag",
          agenda: "Agenda",
          date: "Datum",
          time: "Tijd",
          event: "Afspraak",
          noEventsInRange: "Geen afspraken in deze periode.",
        }}
      />
    </div>
  );
}
