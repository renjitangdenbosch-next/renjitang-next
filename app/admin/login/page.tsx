"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Ongeldige inloggegevens.");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="admin flex min-h-screen items-center justify-center bg-stone-warm px-4 dark:bg-stone-950">
      <form
        onSubmit={onSubmit}
        className="admin-modal-panel w-full max-w-sm space-y-4 rounded-2xl border border-stone-200 p-8 shadow dark:border-stone-300"
      >
        <h1 className="font-serif text-2xl text-[#1a0f08]">
          Beheerderslogin
        </h1>
        <p className="text-sm text-stone-500">管理员登录</p>
        <div>
          <label className="text-sm font-medium text-[#1a0f08]">E-mail</label>
          <input
            type="email"
            autoComplete="username"
            className="mt-1 w-full rounded-lg border border-[#d4c5a0] px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-[#1a0f08]">Wachtwoord</label>
          <input
            type="password"
            autoComplete="current-password"
            className="mt-1 w-full rounded-lg border border-[#d4c5a0] px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-stone-800 py-2 text-sm font-semibold text-white dark:bg-amber-800"
        >
          {loading ? "Bezig…" : "Inloggen"}
        </button>
      </form>
    </div>
  );
}
