import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { PRIMARY_NAV } from "@/lib/navigation";
import { GoldDivider, WaveLine } from "@/components/ChineseDecor";

export function Footer() {
  return (
    <footer className="border-t border-rjt-gold/20 bg-rjt-dark text-rjt-cream dark:border-rjt-gold/15 dark:bg-[#0a0908]">
      <div className="border-b border-rjt-gold/10 px-4 py-3">
        <WaveLine className="mx-auto block max-w-md text-rjt-gold/35 sm:max-w-lg" />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <GoldDivider className="mb-10 text-rjt-gold/70" />
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          <div>
            <p className="font-serif text-xl tracking-tight text-rjt-gold">{SITE.name}</p>
            <p className="text-sm text-stone-400">仁济堂</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-rjt-cream/65">
              {SITE.shortDescription}
            </p>
            <p className="mt-3 text-xs text-stone-400">
              荷兰 &apos;s-Hertogenbosch 传统中医诊所
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rjt-gold/80">
              Navigatie
            </p>
            <ul className="mt-4 space-y-2 text-sm text-rjt-cream/75">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-rjt-gold"
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rjt-gold/80">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-rjt-cream/75">
              <li>
                <a className="hover:text-rjt-gold" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a className="hover:text-rjt-gold" href={`tel:${SITE.phoneTel}`}>
                  {SITE.phone}
                </a>
              </li>
              <li>{SITE.city}</li>
            </ul>
            <ul className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm">
              <li>
                <Link href="/algemene-voorwaarden-en-privacy-beleid" className="text-rjt-cream/55 hover:text-rjt-gold">
                  Voorwaarden &amp; privacy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-rjt-cream/55 hover:text-rjt-gold">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-rjt-cream/55 hover:text-rjt-gold">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/route" className="text-rjt-cream/55 hover:text-rjt-gold">
                  Route
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-stone-800 pt-8">
          <p className="mb-6 text-center text-sm text-stone-400">
            Wij zijn aangesloten bij:
          </p>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-6">
            <Image
              src="/images/logo-zhong.png"
              alt="Zhong - Nederlandse Vereniging voor Traditionele Chinese Geneeskunde"
              width={80}
              height={40}
              className="object-contain opacity-80 brightness-0 invert transition-opacity hover:opacity-100"
            />
            <Image
              src="/images/kab-koepel.webp"
              alt="KAB - Koepel Alternatieve Behandelwijzen"
              width={80}
              height={40}
              className="object-contain opacity-80 brightness-0 invert transition-opacity hover:opacity-100"
            />
            <Image
              src="/images/logo-scag.png"
              alt="SCAG"
              width={80}
              height={40}
              className="object-contain opacity-80 brightness-0 invert transition-opacity hover:opacity-100"
            />
          </div>
          <p className="text-center text-xs text-stone-500">
            KvK-nummer: 94217262
          </p>
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-rjt-cream/45">
          © {new Date().getFullYear()} renjitang.nl · Traditionele Chinese Geneeskunde
        </p>
      </div>
    </footer>
  );
}
