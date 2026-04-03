# Ren Ji Tang — Next.js site

Acupunctuur, Traditionele Chinese Geneeskunde (TCG), Tuina-massage, cupping en ontspanningsmassage in **’s-Hertogenbosch (Den Bosch)**. Content wordt grotendeels uit **WordPress REST API** gehaald; **boekingen** staan in **PostgreSQL** (Prisma).

## Ontwikkeling

```bash
npm install
cp .env.local .env.local # pas aan
npx prisma generate
npx prisma db push       # of migrate — eerste keer database aanmaken
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Beheer: `/admin/login`.

## Build

```bash
npm run build
npm start
```

## Omgevingsvariabelen

| Variabele | Beschrijving |
|-----------|----------------|
| `NEXT_PUBLIC_WP_API_URL` | Basis-URL WordPress REST API (eindigt op `/wp-json`). |
| `NEXT_PUBLIC_SITE_URL` | Publieke site-URL (canonical, sitemap, Telegram-links); bv. `https://www.renjitang.nl`. |
| `DATABASE_URL` | PostgreSQL connection string (Vercel Postgres, Supabase, …). |
| `NEXTAUTH_SECRET` | Geheim voor JWT-sessies; genereer met `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | Basis-URL van de app; lokaal `http://localhost:3000`, productie `https://www.renjitang.nl`. |
| `ADMIN_EMAIL` | Inlog e-mail voor het adminpaneel. |
| `ADMIN_PASSWORD` | Wachtwoord voor het adminpaneel. |
| `TELEGRAM_BOT_TOKEN` | Bot token van @BotFather (optioneel). |
| `TELEGRAM_CHAT_ID` | Chat-ID voor notificaties (optioneel). |
| `BREVO_API_KEY` | API key van [Brevo](https://www.brevo.com) (SMTP API) voor transactionele e-mail (optioneel). |
| `BREVO_FROM` | Geverifieerd afzender-e-mailadres in Brevo (zelfde domein als in het dashboard). |

Kopieer `.env.local` en vul waarden in. **Commit geen geheimen.**

## Stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS  
- Prisma + PostgreSQL  
- NextAuth.js (credentials) voor `/admin`  
- Brevo (REST) voor e-mail, Telegram voor push bij nieuwe boeking  
- ISR op WordPress-pagina’s: `revalidate` 3600 s  
- `public/llms.txt`, `app/sitemap.ts`, `app/robots.ts`, JSON-LD in `app/layout.tsx` en selectief op pagina’s  

## Vercel

Koppel de repo, stel alle env vars in, en gebruik Vercel Postgres of externe Postgres. Voer `npx prisma migrate deploy` (of `db push`) uit tegen productie-DB bij eerste deploy.

## WordPress

Homepage-inhoud: pagina **id 12**. Typo-redirect: oude slug `acupuctuur-en-vergoeding-zorgverzekering` → canonieke URL `acupunctuur-en-vergoeding-zorgverzekering` (zie `next.config.ts`).
