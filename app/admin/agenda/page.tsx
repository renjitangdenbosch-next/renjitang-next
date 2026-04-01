import { addDays, addMinutes } from "date-fns";
import { prisma } from "@/lib/prisma";
import { AdminAgendaView } from "@/components/admin/AdminAgendaView";
import type { SerializedAgendaEvent } from "@/components/admin/AdminAgendaView";
import { bookingStartUtc } from "@/lib/slots";

export const dynamic = "force-dynamic";

export default async function AdminAgendaPage() {
  const [bookings, blokkeringen] = await Promise.all([
    prisma.booking.findMany({
      orderBy: [{ datum: "asc" }, { tijdslot: "asc" }],
      take: 500,
    }),
    prisma.blokkering.findMany({
      orderBy: { datum: "desc" },
      take: 200,
    }),
  ]);

  const events: SerializedAgendaEvent[] = [];

  for (const b of bookings) {
    const start = bookingStartUtc(b);
    events.push({
      id: b.id,
      title: `${b.behandeling} — ${b.naam}`,
      start: start.toISOString(),
      end: addMinutes(start, b.duur).toISOString(),
      resource: {
        type: "booking",
        status: b.status,
        bookingId: b.id,
        naam: b.naam,
        email: b.email,
        telefoon: b.telefoon,
        behandeling: b.behandeling,
        tijdslot: b.tijdslot,
        opmerking: b.opmerking,
      },
    });
  }

  for (const bl of blokkeringen) {
    if (!bl.tijdslot) {
      const dayStart = bookingStartUtc({
        datum: bl.datum,
        tijdslot: "00:00",
      });
      events.push({
        id: `blok-${bl.id}`,
        title: bl.reden || "Geblokkeerd (hele dag)",
        start: dayStart.toISOString(),
        end: addDays(dayStart, 1).toISOString(),
        allDay: true,
        resource: { type: "block" },
      });
    } else {
      const start = bookingStartUtc({
        datum: bl.datum,
        tijdslot: bl.tijdslot,
      });
      events.push({
        id: `blok-${bl.id}`,
        title: bl.reden || `Geblokkeerd ${bl.tijdslot}`,
        start: start.toISOString(),
        end: addMinutes(start, 30).toISOString(),
        resource: { type: "block" },
      });
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100">
        Agenda
      </h1>
      <AdminAgendaView events={events} />
    </div>
  );
}
