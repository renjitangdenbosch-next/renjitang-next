import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stuurAnnulering, stuurBevestiging } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { status, reden } = await req.json();

  const booking = await prisma.booking.update({
    where: { id: params.id },
    data: {
      status,
      bevestigdOp: status === "bevestigd" ? new Date() : undefined,
      geannuleerdOp: status === "geannuleerd" ? new Date() : undefined,
      annuleringsReden: reden || null,
    },
  });

  try {
    if (status === "bevestigd") {
      await stuurBevestiging(booking);
    } else if (status === "geannuleerd") {
      await stuurAnnulering(booking, reden);
    }
  } catch (e) {
    console.error("Email fout:", e);
  }

  return NextResponse.json({ success: true, booking });
}
