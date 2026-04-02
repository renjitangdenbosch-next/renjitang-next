import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessJsonLd } from "@/lib/jsonld";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.renjitang.nl";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ren Ji Tang — Acupunctuur & TCG 's-Hertogenbosch",
    template: "%s | Ren Ji Tang",
  },
  description:
    "Ren Ji Tang: acupunctuur, Tuina-massage, cupping en ontspanningsmassage in het kader van Traditionele Chinese Geneeskunde (TCG) in 's-Hertogenbosch (Den Bosch).",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: siteUrl,
    siteName: "Ren Ji Tang",
    title: "Ren Ji Tang — Acupunctuur & TCG Den Bosch",
    description:
      "Praktijk voor Traditionele Chinese Geneeskunde in 's-Hertogenbosch.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="nl" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased dark:bg-[#141210] dark:text-rjt-cream">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-sm focus:bg-vermilion focus:px-4 focus:py-2 focus:text-white"
        >
          Ga naar inhoud
        </a>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  anonymize_ip: true,
                });
              `}
            </Script>
          </>
        ) : null}
        <JsonLd data={localBusinessJsonLd()} />
        <Providers>{children}</Providers>
        <CookieBanner />
      </body>
    </html>
  );
}
