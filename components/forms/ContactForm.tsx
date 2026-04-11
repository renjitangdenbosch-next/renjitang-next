"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const payload = {
      formType: "contact" as const,
      naam: fd.get("naam"),
      email: fd.get("email"),
      telefoon: fd.get("telefoon"),
      bericht: fd.get("bericht"),
    };
    try {
      const res = await fetch("/api/site-aanvraag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("API response:", res.status, res.ok, data);
      if (!res.ok || !data.ok) {
        setStatus("err");
        setMsg(data.error || "Versturen mislukt.");
        return;
      }
      setStatus("ok");
      setMsg("Bedankt voor uw bericht. We reageren zo snel mogelijk.");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
      setMsg("Verbinding mislukt.");
    }
  }

  useEffect(() => {
    if (status !== "ok") return;
    requestAnimationFrame(() => {
      document.getElementById("bevestiging-bericht")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [status]);

  if (status === "ok") {
    return (
      <p
        id="bevestiging-bericht"
        className="rounded-sm border border-jade/30 bg-paper p-6 font-lato text-ink"
        role="status"
      >
        {msg}
      </p>
    );
  }

  return (
    <form id="contactformulier" onSubmit={onSubmit} className="space-y-5 font-lato">
      <div>
        <label htmlFor="contact-naam" className="mb-1 block text-sm font-medium text-ink">
          Naam *
        </label>
        <input
          id="contact-naam"
          name="naam"
          required
          className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-ink">
          E-mail *
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion"
        />
      </div>
      <div>
        <label htmlFor="contact-tel" className="mb-1 block text-sm font-medium text-ink">
          Telefoon *
        </label>
        <input
          id="contact-tel"
          name="telefoon"
          type="tel"
          required
          className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion"
        />
      </div>
      <div>
        <label htmlFor="contact-bericht" className="mb-1 block text-sm font-medium text-ink">
          Bericht *
        </label>
        <textarea
          id="contact-bericht"
          name="bericht"
          required
          rows={5}
          className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion"
        />
      </div>
      {status === "err" ? (
        <p className="text-sm text-vermilion" role="alert">
          {msg}
        </p>
      ) : null}
      <Button type="submit" variant="primary" disabled={status === "loading"}>
        {status === "loading" ? "Verzenden…" : "Verzenden"}
      </Button>
      <div className="mt-3 space-y-1.5 text-sm text-muted">
        <p>
          Door dit formulier te verzenden ga je akkoord met onze{" "}
          <a href="/privacy" className="text-jade underline underline-offset-2">
            privacyverklaring
          </a>
          .
        </p>
        <p lang="zh-Hans">
          提交此表单即表示您同意我们的
          <a href="/privacy" className="text-jade underline underline-offset-2">
            隐私声明
          </a>
          。
        </p>
      </div>
    </form>
  );
}
