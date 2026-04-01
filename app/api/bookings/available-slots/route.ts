import { NextResponse } from "next/server";
import { SERVICES } from "@/lib/site";
import { getAvailableSlots } from "@/lib/slots";

/** @deprecated Gebruik /api/bookings/beschikbare-slots?datum=&behandelingId= */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const behandelingId =
    searchParams.get("behandelingId") ||
    searchParams.get("service") ||
    "acupunctuur-vervolg";
  const durationStr = searchParams.get("duration") || "60";

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Param date (yyyy-MM-dd) vereist" },
      { status: 400 }
    );
  }

  const svc = SERVICES.find((s) => s.id === behandelingId);
  const duration = svc?.duur ?? Math.max(15, parseInt(durationStr, 10) || 60);

  try {
    const slots = await getAvailableSlots(date, duration);
    return NextResponse.json({
      slots: slots.map((s) => s.toISOString()),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Kon beschikbaarheid niet laden" },
      { status: 500 }
    );
  }
}
