"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BoekingActies({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toonReden, setToonReden] = useState(false);
  const [reden, setReden] = useState("");

  async function actie(status: string, redenArg?: string) {
    setLoading(true);
    await fetch(`/api/admin/boekingen/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, reden: redenArg }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex gap-3 flex-wrap">
      <button
        type="button"
        onClick={() => actie("bevestigd")}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded-full 
          text-sm font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        ✓ Bevestig
      </button>

      {!toonReden ? (
        <button
          type="button"
          onClick={() => setToonReden(true)}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-full 
            text-sm font-semibold hover:bg-red-700 disabled:opacity-50"
        >
          ✗ Annuleer
        </button>
      ) : (
        <div className="flex gap-2 w-full">
          <input
            type="text"
            placeholder="Reden (optioneel)"
            value={reden}
            onChange={(e) => setReden(e.target.value)}
            className="flex-1 border border-stone-200 rounded-lg 
              px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => actie("geannuleerd", reden)}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg 
              text-sm font-semibold"
          >
            Bevestig annulering
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
    </div>
  );
}
