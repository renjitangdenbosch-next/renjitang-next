import { NextResponse } from "next/server";
import { SERVICES } from "@/lib/site";
import { formatSlotLabel, getAvailableSlots } from "@/lib/slots";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const datum = searchParams.get("datum");
  const behandelingId = searchParams.get("behandelingId");

  if (!datum || !behandelingId || !/^\d{4}-\d{2}-\d{2}$/.test(datum)) {
    return NextResponse.json({ slots: [] });
  }

  const service = SERVICES.find((s) => s.id === behandelingId);
  if (!service) return NextResponse.json({ slots: [] });

  try {
    const slotDates = await getAvailableSlots(datum, service.duur);
    const slots = slotDates.map(formatSlotLabel);
    return NextResponse.json({ slots });
  } catch (e) {
    console.error("[beschikbare-slots]", e);
    return NextResponse.json({ slots: [] });
  }
}
