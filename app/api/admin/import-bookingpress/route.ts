import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  importeerBookingPressBatch,
  type BookingPressBatchCursor,
} from "@/lib/bookingpress-import";

type Body = {
  payload?: unknown;
  cursor?: BookingPressBatchCursor | null;
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  if (body.payload === undefined) {
    return NextResponse.json(
      { error: "Veld 'payload' ontbreekt (BookingPress-export)." },
      { status: 400 }
    );
  }

  const payloadStr =
    typeof body.payload === "string"
      ? body.payload
      : JSON.stringify(body.payload ?? {});

  const cursor =
    body.cursor === undefined || body.cursor === null
      ? null
      : body.cursor;

  try {
    const result = await importeerBookingPressBatch(payloadStr, cursor);
    if (result.done && result.stats) {
      return NextResponse.json({
        ok: true,
        done: true,
        progress: result.progress,
        klanten: result.stats.klanten,
        boekingen: result.stats.boekingen,
        siteBoekingen: result.stats.siteBoekingen,
      });
    }
    return NextResponse.json({
      ok: true,
      done: false,
      progress: result.progress,
      cursor: result.cursor,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Import mislukt";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
