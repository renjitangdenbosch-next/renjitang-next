import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { importeerAlles } from "@/lib/bookingpress-import";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  const payload =
    typeof body === "string"
      ? body
      : JSON.stringify(body ?? {});

  try {
    const stats = await importeerAlles(payload);
    return NextResponse.json({
      ok: true,
      klanten: stats.klanten,
      boekingen: stats.boekingen,
      siteBoekingen: stats.siteBoekingen,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Import mislukt";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
