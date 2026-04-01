import type { WpPage, WpSiteInfo } from "@/types/wordpress";

const REVALIDATE = 3600;

function baseUrl(): string {
  const u = process.env.NEXT_PUBLIC_WP_API_URL || "https://renjitang.nl/wp-json";
  return u.replace(/\/$/, "");
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${baseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...init,
    next: { revalidate: REVALIDATE },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`WordPress API ${res.status}: ${url}`);
  }
  return res.json() as Promise<T>;
}

export async function getAllPages(): Promise<WpPage[]> {
  return fetchJson<WpPage[]>("/wp/v2/pages?per_page=100&status=publish");
}

export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  const pages = await fetchJson<WpPage[]>(
    `/wp/v2/pages?slug=${encodeURIComponent(slug)}&status=publish`
  );
  return pages[0] ?? null;
}

/** Root `wp-json` bevat site naam en URL */
export async function getSiteInfo(): Promise<WpSiteInfo> {
  const root = baseUrl();
  const res = await fetch(root, {
    next: { revalidate: REVALIDATE },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`WordPress index ${res.status}`);
  const data = (await res.json()) as {
    name: string;
    description: string;
    url: string;
  };
  return {
    name: data.name,
    description: data.description,
    url: data.url,
  };
}

/** Front page inhoud (WordPress home = page id 12) */
export async function getHomePageContent(): Promise<WpPage | null> {
  try {
    return await fetchJson<WpPage>("/wp/v2/pages/12");
  } catch {
    return null;
  }
}

export { REVALIDATE as WP_REVALIDATE_SECONDS };
