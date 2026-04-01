import { SITE } from "@/lib/site";

export function TopBar() {
  return (
    <div className="bg-stone-800 px-4 py-1.5 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
        <div className="flex items-center gap-4">
          <span>
            🕐 Di–Vr 09:00–20:00 · Za–Zo 09:00–17:00 · Ma gesloten
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="transition-colors hover:text-rjt-gold"
          >
            📞 {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="transition-colors hover:text-rjt-gold"
          >
            ✉ {SITE.email}
          </a>
        </div>
      </div>
    </div>
  );
}
