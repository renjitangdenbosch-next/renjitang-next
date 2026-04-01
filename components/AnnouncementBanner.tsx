"use client";

const vakantieTekst =
  "🌸 Wij zijn gesloten wegens vakantie van 6 t/m 27 april · " +
  "假期休息：4月6日至4月27日 · " +
  "🌸 Wij zijn gesloten wegens vakantie van 6 t/m 27 april · " +
  "假期休息：4月6日至4月27日";

export function AnnouncementBanner() {
  return (
    <div
      className="fixed left-0 right-0 top-0 z-[60] relative overflow-hidden py-2.5 text-white animate-gradientShift"
      style={{
        background:
          "linear-gradient(90deg, #D4580A, #6B6B6B, #D4580A, #6B6B6B)",
        backgroundSize: "300% 100%",
      }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className="mx-8 shrink-0 text-sm font-semibold tracking-wide"
          >
            {vakantieTekst}
          </span>
        ))}
      </div>
    </div>
  );
}
