import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { CookieBanner } from "@/components/CookieBanner";
import { GoogleAnalyticsWithConsent } from "@/components/GoogleAnalyticsWithConsent";
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
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
    other: [
      { rel: "android-chrome", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome", url: "/android-chrome-512x512.png" },
    ],
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
            <Script id="google-consent-mode-default" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'denied',
                  'functionality_storage': 'denied',
                  'personalization_storage': 'denied',
                  'security_storage': 'granted'
                });
              `}
            </Script>
            <GoogleAnalyticsWithConsent measurementId={gaId} />
          </>
        ) : null}
        <JsonLd data={localBusinessJsonLd()} />
        <Providers>{children}</Providers>
        <CookieBanner />
      </body>
    </html>
  );
}
