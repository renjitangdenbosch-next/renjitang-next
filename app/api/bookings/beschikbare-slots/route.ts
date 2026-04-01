import { NextResponse } from "next/server";
import { SERVICES } from "@/lib/site";
import { formatSlotLabel, getAvailableSlots } from "@/lib/slots";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const datum = searchParams.get("datum") || searchParams.get("date");
  const behandelingId =
    searchParams.get("behandelingId") || searchParams.get("service");

  if (!datum || !/^\d{4}-\d{2}-\d{2}$/.test(datum)) {
    return NextResponse.json(
      { error: "Param datum (yyyy-MM-dd) vereist" },
      { status: 400 }
    );
  }

  const svc = SERVICES.find((s) => s.id === behandelingId);
  if (!behandelingId || !svc) {
    return NextResponse.json(
      { error: "Param behandelingId vereist (bekende dienst)" },
      { status: 400 }
    );
  }

  try {
    const slots = await getAvailableSlots(datum, svc.duur);
    return NextResponse.json({
      slots: slots.map((s) => ({
        label: formatSlotLabel(s),
        iso: s.toISOString(),
      })),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Kon beschikbaarheid niet laden" },
      { status: 500 }
    );
  }
}
