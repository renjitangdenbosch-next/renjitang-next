/** Zelfde logica als `normalizeTijdslotLabel` in `lib/slots.ts`, zonder server-only deps (bruikbaar in client). */
export function normalizeTijdslotLabelClient(t: string): string | null {
  const trimmed = t.trim();
  const p = trimmed.split(":");
  if (p.length < 2) return null;
  const hh = parseInt(p[0], 10);
  const mm = parseInt(p[1], 10);
  if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
