export function AnnouncementBanner() {
  return (
    <div
      className="overflow-hidden py-2"
      style={{
        background: "linear-gradient(90deg, #8B2635, #C9A84C, #8B2635)",
        backgroundSize: "200% 100%",
      }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="mx-6 flex shrink-0 items-center gap-6 text-sm font-medium text-white"
          >
            <span>
              🌸 Gesloten wegens vakantie 6 t/m 27 april ·
              假期休息：4月6日至4月27日
            </span>
            <span className="text-white/50">◆</span>
            <span>🎉 Welkom op onze nieuwe website! · 欢迎来到我们的新网站！</span>
            <span className="text-white/50">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
