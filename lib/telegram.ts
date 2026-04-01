const TELEGRAM_API = "https://api.telegram.org";

export async function sendBookingTelegram(params: {
  naam: string;
  email: string;
  telefoon?: string | null;
  behandeling: string;
  datum: Date;
  tijdslot: string;
  duur: number;
  bookingId: string;
}): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const site =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.renjitang.nl";

  if (!token || !chatId) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID ontbreekt");
    return { ok: false, error: "Telegram niet geconfigureerd" };
  }

  const dateStr = params.datum.toLocaleDateString("nl-NL", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Amsterdam",
  });

  const adminLink = `${site}/admin/boekingen#${params.bookingId}`;

  const text = `🗓 Nieuwe afspraak - Ren Ji Tang

👤 ${params.naam}
📞 ${params.telefoon || "—"}
📧 ${params.email}
💆 Behandeling: ${params.behandeling}
📅 ${dateStr}
🕐 ${params.tijdslot}
⏱ ${params.duur} minuten

✅ Bevestigen: ${adminLink}`;

  const url = `${TELEGRAM_API}/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: false,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[telegram]", res.status, err);
    return { ok: false, error: err };
  }
  return { ok: true };
}
