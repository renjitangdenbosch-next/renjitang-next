import type { ReactNode } from "react";

function inlineFormat(s: string): ReactNode {
  const parts = s.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderAfterHeading(lines: string[]): ReactNode[] {
  const out: ReactNode[] = [];
  let paraBuf: string[] = [];
  let listBuf: string[] = [];

  const flushPara = () => {
    if (paraBuf.length === 0) return;
    const text = paraBuf.join(" ").trim();
    if (text) {
      out.push(
        <p key={`p-${out.length}`} className="mb-4 leading-relaxed text-[#3D5C3D]">
          {inlineFormat(text)}
        </p>
      );
    }
    paraBuf = [];
  };

  const flushList = () => {
    if (listBuf.length === 0) return;
    out.push(
      <ul key={`ul-${out.length}`} className="mb-4 list-disc space-y-2 pl-6 leading-relaxed text-[#3D5C3D]">
        {listBuf.map((line, li) => (
          <li key={li}>{inlineFormat(line.replace(/^-\s+/, ""))}</li>
        ))}
      </ul>
    );
    listBuf = [];
  };

  for (const line of lines) {
    if (line.startsWith("- ")) {
      flushPara();
      listBuf.push(line);
    } else {
      flushList();
      paraBuf.push(line);
    }
  }
  flushPara();
  flushList();
  return out;
}

/** Eenvoudige weergave van blogtekst met ## koppen en - lijsten. */
export function BlogInhoudBody({ inhoud }: { inhoud: string }) {
  const sections = inhoud.trim().split(/\n(?=## )/);

  return (
    <div className="max-w-none font-lato">
      {sections.map((section, si) => {
        const t = section.trim();
        if (!t.startsWith("##")) {
          return (
            <div key={si}>
              {t.split(/\n\n+/).map((para, pi) => (
                <p key={pi} className="mb-4 leading-relaxed text-[#3D5C3D]">
                  {inlineFormat(para.trim())}
                </p>
              ))}
            </div>
          );
        }

        const lines = t.split("\n").map((l) => l.trim()).filter(Boolean);
        const titleLine = lines[0]?.replace(/^##\s+/, "") ?? "";
        const rest = lines.slice(1);

        return (
          <div key={si} className="mb-2">
            <h2 className="mb-3 mt-8 font-cormorant text-2xl text-[#1A2E1A] first:mt-0">
              {inlineFormat(titleLine)}
            </h2>
            {renderAfterHeading(rest)}
          </div>
        );
      })}
    </div>
  );
}
