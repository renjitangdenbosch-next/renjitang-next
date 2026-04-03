"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { normalizeTijdslotLabelClient } from "@/lib/tijdslot-string";

const WEIGER_REDEN =
  "Aanvraag geweigerd door praktijk / 诊所已拒绝您的预约申请";

type Props = {
  bookingId: string;
  status: "pending" | "bevestigd";
  behandelingId: string;
  datumYyyyMmDd: string;
  tijdslot: string;
};

export function BoekingActies({
  bookingId,
  status,
  behandelingId,
  datumYyyyMmDd,
  tijdslot,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toonReden, setToonReden] = useState(false);
  const [reden, setReden] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [datumKeuze, setDatumKeuze] = useState(datumYyyyMmDd);
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLaden, setSlotsLaden] = useState(false);
  const [tijdKeuze, setTijdKeuze] = useState(
    () => normalizeTijdslotLabelClient(tijdslot) ?? tijdslot
  );
  const [modalFout, setModalFout] = useState<string | null>(null);

  useEffect(() => {
    if (!modalOpen) return;
    setDatumKeuze(datumYyyyMmDd);
    setTijdKeuze(normalizeTijdslotLabelClient(tijdslot) ?? tijdslot);
    setModalFout(null);
  }, [modalOpen, datumYyyyMmDd, tijdslot]);

  useEffect(() => {
    if (!modalOpen || !datumKeuze) {
      setSlots([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setSlotsLaden(true);
      try {
        const u = new URL(
          "/api/bookings/beschikbare-slots",
          window.location.origin
        );
        u.searchParams.set("datum", datumKeuze);
        u.searchParams.set("behandelingId", behandelingId);
        u.searchParams.set("excludeBookingId", bookingId);
        const res = await fetch(u.toString());
        const data = (await res.json()) as { slots?: string[] };
        if (!cancelled) {
          const list = data.slots || [];
          setSlots(list);
          setTijdKeuze((prev) => {
            const normPrev = normalizeTijdslotLabelClient(prev);
            const match =
              list.find(
                (s) =>
                  s === prev ||
                  (normPrev != null &&
                    normalizeTijdslotLabelClient(s) === normPrev)
              ) ?? "";
            return match;
          });
        }
      } finally {
        if (!cancelled) setSlotsLaden(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [modalOpen, datumKeuze, behandelingId]);

  async function patchJson(
    body: Record<string, unknown>
  ): Promise<{ ok: true } | { ok: false; error: string }> {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/boekingen/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const raw = await res.text();
      let errorMsg = "Actie mislukt / 操作失败";
      if (!res.ok) {
        try {
          const data = JSON.parse(raw) as { error?: string };
          if (data.error) errorMsg = data.error;
        } catch {
          if (raw.trim()) errorMsg = raw.trim().slice(0, 280);
        }
        return { ok: false, error: errorMsg };
      }
      return { ok: true };
    } finally {
      setLoading(false);
    }
  }

  async function actieStatus(nieuweStatus: string, redenArg?: string) {
    const result = await patchJson({ status: nieuweStatus, reden: redenArg });
    if (result.ok) {
      router.refresh();
      setToonReden(false);
      setReden("");
    } else {
      window.alert(result.error);
    }
  }

  async function opslaanReschedule() {
    setModalFout(null);
    const datumStr = datumKeuze.trim();
    const tijdNorm = normalizeTijdslotLabelClient(tijdKeuze);
    if (!datumStr || !/^\d{4}-\d{2}-\d{2}$/.test(datumStr)) {
      setModalFout("Ongeldige datum (verwacht jjjj-mm-dd) / 日期格式无效");
      return;
    }
    if (!tijdNorm) {
      setModalFout("Kies een geldig tijdslot (bijv. 09:00) / 请选择有效时间");
      return;
    }
    const result = await patchJson({
      datum: datumStr,
      tijdslot: tijdNorm,
    });
    if (result.ok) {
      window.alert("Datum/tijd gewijzigd / 日期/时间已更改");
      setModalOpen(false);
      router.refresh();
    } else {
      setModalFout(result.error);
    }
  }

  function weigeren() {
    if (
      !window.confirm(
        "Aanvraag weigeren? De klant ontvangt een annuleringsmail.\n" +
          "拒绝申请？客户将收到取消邮件。"
      )
    ) {
      return;
    }
    void actieStatus("geannuleerd", WEIGER_REDEN);
  }

  return (
    <>
      <div className="flex gap-3 flex-wrap items-center">
        {status === "pending" && (
          <button
            type="button"
            onClick={() => actieStatus("bevestigd")}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-full 
              text-sm font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            ✓ Bevestig / 确认
          </button>
        )}

        {status === "pending" && (
          <button
            type="button"
            onClick={weigeren}
            disabled={loading}
            className="px-4 py-2 bg-stone-700 text-white rounded-full 
              text-sm font-semibold hover:bg-stone-800 disabled:opacity-50"
          >
            ✗ Weiger / 拒绝
          </button>
        )}

        {!toonReden ? (
          <button
            type="button"
            onClick={() => setToonReden(true)}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-full 
              text-sm font-semibold hover:bg-red-700 disabled:opacity-50"
          >
            ✗ Annuleer / 取消
          </button>
        ) : (
          <div className="flex gap-2 flex-wrap w-full items-center">
            <input
              type="text"
              placeholder="Reden (optioneel) / 原因（可选）"
              value={reden}
              onChange={(e) => setReden(e.target.value)}
              className="flex-1 min-w-[12rem] border border-stone-200 rounded-lg 
                px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => actieStatus("geannuleerd", reden)}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg 
                text-sm font-semibold"
            >
              Bevestig annulering / 确认取消
            </button>
            <button
              type="button"
              onClick={() => setToonReden(false)}
              className="px-3 py-2 border border-stone-200 
                rounded-lg text-sm"
            >
              ✕
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          disabled={loading}
          className="px-4 py-2 border border-amber-600 text-amber-800 
            rounded-full text-sm font-semibold hover:bg-amber-50 
            disabled:opacity-50"
        >
          ✎ Wijzig datum/tijd / 修改日期/时间
        </button>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center 
            bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reschedule-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 
              border border-stone-200"
          >
            <h2
              id="reschedule-modal-title"
              className="font-serif text-lg font-semibold text-stone-900 mb-4"
            >
              Wijzig datum/tijd / 修改日期/时间
            </h2>
            <div className="space-y-4">
              <label className="block text-sm">
                <span className="text-stone-600">
                  Nieuwe datum / 新日期
                </span>
                <input
                  type="date"
                  value={datumKeuze}
                  onChange={(e) => {
                    const v = e.target.value;
                    setDatumKeuze(v);
                    setModalFout(null);
                  }}
                  className="mt-1 w-full border border-stone-200 rounded-lg 
                    px-3 py-2 text-sm text-stone-900"
                />
              </label>
              <label className="block text-sm">
                <span className="text-stone-600">
                  Nieuw tijdslot / 新时间段
                </span>
                {slotsLaden ? (
                  <p className="mt-2 text-sm text-stone-500">
                    Laden… / 加载中…
                  </p>
                ) : (
                  <select
                    value={tijdKeuze}
                    onChange={(e) => setTijdKeuze(e.target.value)}
                    className="mt-1 w-full border border-stone-200 rounded-lg 
                      px-3 py-2 text-sm bg-white"
                  >
                    <option value="">
                      — Kies tijd / 选择时间 —
                    </option>
                    {slots.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                )}
              </label>
              {modalFout && (
                <p className="text-sm text-red-600">{modalFout}</p>
              )}
              {!slotsLaden && slots.length === 0 && datumKeuze && (
                <p className="text-sm text-amber-700">
                  Geen tijdsloten op deze dag. Kies een andere datum.
                  <br />
                  当天无可用时间段，请另选日期。
                </p>
              )}
            </div>
            <div className="mt-6 flex flex-wrap gap-2 justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-stone-200 rounded-lg text-sm"
              >
                Sluiten / 关闭
              </button>
              <button
                type="button"
                onClick={() => void opslaanReschedule()}
                disabled={loading || slotsLaden}
                className="px-4 py-2 bg-amber-700 text-white rounded-lg 
                  text-sm font-semibold disabled:opacity-50"
              >
                Opslaan / 保存
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
