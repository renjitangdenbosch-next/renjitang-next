export function PartnerLogos() {
  return (
    <section className="border-t border-stone-200 bg-[#EDE8DC] py-10">
      <div className="mx-auto max-w-4xl px-6">
        <p className="mb-6 text-center font-lato text-xs uppercase tracking-widest text-[#9E8E75]">
          Wij zijn aangesloten bij
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12">
          <a href="https://zhong.nl" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/logo-zhong.png"
              alt="Zhong"
              style={{ height: "36px", width: "auto" }}
            />
          </a>
          <a href="https://www.kab-koepel.nl/" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/kab-koepel.webp"
              alt="KAB Koepel"
              style={{ height: "36px", width: "auto" }}
            />
          </a>
          <a href="https://www.scag.nl" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/logo-scag.png"
              alt="SCAG"
              style={{ height: "36px", width: "auto" }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
