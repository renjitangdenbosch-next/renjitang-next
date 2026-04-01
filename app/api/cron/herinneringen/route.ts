import { NextResponse } from "next/server";
import { addDays, format } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { sendHerinnering } from "@/lib/email";
import { prisma } from "@/lib/prisma";

const TZ = "Europe/Amsterdam";

export const dynamic = "force-dynamic";

function morgenAmsterdamDayBounds(): { start: Date; end: Date } {
  const nowAm = toZonedTime(new Date(), TZ);
  const morgen = addDays(nowAm, 1);
  const ds = format(morgen, "yyyy-MM-dd");
  const start = fromZonedTime(`${ds}T00:00:00`, TZ);
  const end = addDays(start, 1);
  return { start, end };
}

async function handleCron(req: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  const authorized =
    !!secret &&
    (auth === `Bearer ${secret}` ||
      req.headers.get("x-cron-secret") === secret);

  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { start, end } = morgenAmsterdamDayBounds();

  const candidates = await prisma.booking.findMany({
    where: {
      datum: { gte: start, lt: end },
      status: "bevestigd",
      herinneringSent: false,
    },
  });

  let sent = 0;
  const errors: string[] = [];

  for (const b of candidates) {
    const r = await sendHerinnering(b);
    if (r.ok) {
      await prisma.booking.update({
        where: { id: b.id },
        data: { herinneringSent: true },
      });
      sent += 1;
    } else {
      errors.push(`${b.id}: ${r.error || "?"}`);
    }
  }

  return NextResponse.json({
    ok: true,
    checked: candidates.length,
    sent,
    errors,
  });
}

export async function GET(req: Request) {
  return handleCron(req);
}

export async function POST(req: Request) {
  return handleCron(req);
}
