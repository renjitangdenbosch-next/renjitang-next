import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* === ACHTERGROND === */}
      <div className="absolute inset-0">
        <Image
          src="/images/footer-nieuw.webp"
          alt=""
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
      </div>

      {/* === GOUDEN LIJN BOVENAAN === */}
      <div className="relative z-10 border-t border-[#4A9E4A]/30" />

      {/* === HOOFD FOOTER INHOUD === */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* KOLOM 1 — Merk + contact */}
          <div>
            <Image
              src="/images/logo-transparent.png"
              alt="Ren Ji Tang"
              width={240}
              height={80}
              className="mb-4 block h-[80px] w-auto bg-transparent object-contain outline-none ring-0 [filter:brightness(0)]"
            />
            <p className="mb-4 font-lato text-sm font-medium text-[#1A2E1A]/90">
              Traditionele Chinese Geneeskunde
            </p>
            <div className="space-y-1 font-lato text-sm font-medium text-[#1A2E1A]">
              <p>Hazenburgstede 7</p>
              <p>5235 HR &apos;s-Hertogenbosch</p>
              <a href="tel:0732110224" className="block transition-colors hover:text-[#2D6A2D]">
                073 211 02 24
              </a>
              <a href="mailto:info@renjitang.nl" className="block transition-colors hover:text-[#2D6A2D]">
                info@renjitang.nl
              </a>
            </div>
          </div>

          {/* KOLOM 2 — Behandelingen links */}
          <div>
            <h3 className="mb-5 font-lato text-xs uppercase tracking-[0.2em] text-[#2D6A2D]">
              Behandelingen
            </h3>
            <ul className="space-y-2 font-lato text-sm font-medium text-[#1A2E1A]">
              <li>
                <a href="/behandelingen/acupunctuur" className="transition-colors hover:text-[#2D6A2D]">
                  Acupunctuur
                </a>
              </li>
              <li>
                <a href="/behandelingen/massage" className="transition-colors hover:text-[#2D6A2D]">
                  Tuina Massage
                </a>
              </li>
              <li>
                <a href="/behandelingen/cupping" className="transition-colors hover:text-[#2D6A2D]">
                  Cupping
                </a>
              </li>
              <li>
                <a href="/behandelingen/guasha" className="transition-colors hover:text-[#2D6A2D]">
                  Guasha
                </a>
              </li>
              <li>
                <a href="/behandelingen/moxibustie" className="transition-colors hover:text-[#2D6A2D]">
                  Moxibustie
                </a>
              </li>
              <li>
                <a href="/behandelingen/kruiden" className="transition-colors hover:text-[#2D6A2D]">
                  Kruidengeneeskunde
                </a>
              </li>
              <li>
                <a href="/blog" className="transition-colors hover:text-[#2D6A2D]">
                  Blog
                </a>
              </li>
              <li>
                <a href="/tarieven" className="transition-colors hover:text-[#2D6A2D]">
                  Tarieven
                </a>
              </li>
            </ul>
          </div>

          {/* KOLOM 3 — Openingstijden */}
          <div>
            <h3 className="mb-5 font-lato text-xs uppercase tracking-[0.2em] text-[#2D6A2D]">
              Openingstijden
            </h3>
            <div className="space-y-2 font-lato text-sm font-semibold text-[#1A2E1A]">
              <div className="flex justify-between gap-8">
                <span>Dinsdag t/m vrijdag</span>
                <span className="text-[#1A2E1A]">09:00 – 20:00</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>Zaterdag &amp; zondag</span>
                <span className="text-[#1A2E1A]">09:00 – 17:00</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>Maandag</span>
                <span className="text-[#1A2E1A]">Gesloten</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === ONDERSTE BALK === */}
      <div className="relative z-10 border-t border-[#1A2E1A]/10 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 sm:flex-row">
          <p className="font-lato text-xs font-medium text-[#1A2E1A]/70">
            © {new Date().getFullYear()} Ren Ji Tang · KvK: 94217262
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-lato text-xs font-medium text-[#1A2E1A]/70 sm:justify-end">
            <a href="/privacy" className="transition-colors hover:text-[#2D6A2D]">
              Privacybeleid
            </a>
            <span aria-hidden>·</span>
            <a href="/algemene-voorwaarden" className="transition-colors hover:text-[#2D6A2D]">
              Algemene voorwaarden
            </a>
            <span aria-hidden>·</span>
            <a href="/disclaimer" className="transition-colors hover:text-[#2D6A2D]">
              Disclaimer
            </a>
            <span aria-hidden>·</span>
            <a href="/cookiebeleid" className="transition-colors hover:text-[#2D6A2D]">
              Cookiebeleid
            </a>
            <span aria-hidden>·</span>
            <a
              href="https://allesis.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#2D6A2D]"
            >
              Website door allesis.nl
            </a>
          </div>
        </div>
        <p className="mx-auto max-w-3xl px-6 pt-4 text-center font-lato text-xs font-medium leading-relaxed text-[#1A2E1A]/70">
          Ren Ji Tang is aangesloten bij Zhong en valt onder de SCAG klachtenregeling. Acupunctuur en TCG zijn
          complementaire behandelingen en vervangen geen reguliere medische zorg.
        </p>
      </div>
    </footer>
  );
}
