import Image from "next/image";
import { Fragment } from "react";

const partners = [
  { href: "https://zhong.nl", src: "/images/zhong-transparent.png", alt: "Zhong" },
  { href: "https://www.kab-koepel.nl/", src: "/images/kab-transparent.png", alt: "KAB Koepel" },
  { href: "https://www.scag.nl", src: "/images/scag-transparent.png", alt: "SCAG" },
] as const;

const logoContainerClass = "inline-block !bg-transparent";

const logoImgClass =
  "block h-[60px] w-auto max-w-[260px] bg-transparent object-contain object-center " +
  "origin-center opacity-[0.75] transition-[opacity,transform] duration-300 ease-out " +
  "[filter:sepia(1)_brightness(0.7)_saturate(0.8)] " +
  "group-hover:opacity-100 group-hover:scale-105";

export function PartnerLogos() {
  return (
    <section
      className="bg-[#f0ebe0] py-10 [@media(prefers-color-scheme:dark)]:bg-[#1a0f08]"
      aria-label="Aangesloten bij"
    >
      <div className="mx-auto max-w-5xl px-6">
        <p
          className="text-center font-lato text-[11px] uppercase tracking-[0.2em] text-[#8B6914] [@media(prefers-color-scheme:dark)]:text-[#c8a040]"
        >
          Aangesloten bij
        </p>
        <div
          className="mx-auto mt-3 h-px w-10 bg-[#8B6914]/20 [@media(prefers-color-scheme:dark)]:bg-[#c8a040]/20"
          aria-hidden
        />
        <div className="mx-auto mt-8 max-w-[600px] overflow-x-auto pb-1 [scrollbar-width:thin]">
          <div className="flex flex-nowrap items-center justify-center gap-8">
            {partners.map((p, i) => (
              <Fragment key={p.href}>
                {i > 0 ? (
                  <div
                    className="h-[40px] w-px shrink-0 self-center bg-[#8B6914] opacity-[0.85] [filter:sepia(0.2)_brightness(0.35)_saturate(0.5)] [@media(prefers-color-scheme:dark)]:bg-[#c8a040]"
                    aria-hidden
                  />
                ) : null}
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block shrink-0"
              >
                <span className={logoContainerClass}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={260}
                    height={60}
                    className={logoImgClass}
                  />
                </span>
              </a>
            </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
