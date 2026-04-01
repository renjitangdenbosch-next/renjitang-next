"use client";

export function AnnouncementBanner() {
  return (
    <div className="fixed left-0 right-0 top-0 z-[60] bg-rjt-red py-2.5 text-white overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[1, 2, 3].map((i) => (
          <span key={i} className="mx-8 flex shrink-0 items-center gap-8">
            <span className="text-sm font-medium tracking-wide">
              🎉 Welkom op onze nieuwe website! 欢迎来到我们的新网站！
            </span>
            <span className="text-rjt-gold">◆</span>
            <span className="text-sm font-medium tracking-wide">
              🌸 Vakantie: 6 april t/m 27 april gesloten ·
              假期：4月6日至4月27日休息
            </span>
            <span className="text-rjt-gold">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
