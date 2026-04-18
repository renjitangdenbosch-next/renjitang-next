import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { CookieBanner } from "@/components/CookieBanner";
import { GoogleAdsTag } from "@/components/GoogleAdsTag";
import { GoogleAnalyticsWithConsent } from "@/components/GoogleAnalyticsWithConsent";
import { isGoogleAdsConfigured } from "@/lib/google-ads";
import SchemaOrg from "./components/SchemaOrg";

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

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.renjitang.nl").replace(
  /\/$/,
  ""
);

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
    default: "Ren Ji Tang — Acupunctuur & TCG in 's-Hertogenbosch",
    template: "%s | Ren Ji Tang",
  },
  description:
    "De beste TCG-praktijk in 's-Hertogenbosch. Acupunctuur, cupping, massage en kruidengeneeskunde. 5 sterren op Google. Online afspraak 24/7. Erkend door CZ, VGZ, Menzis.",
  keywords: [
    "acupunctuur Den Bosch",
    "acupunctuur 's-Hertogenbosch",
    "Chinese geneeskunde Den Bosch",
    "TCG Den Bosch",
    "cupping Den Bosch",
    "massage Den Bosch",
    "acupuncturist Den Bosch",
    "traditionele Chinese geneeskunde Noord-Brabant",
    "burn-out behandeling Den Bosch",
    "stress behandeling Den Bosch",
  ],
  authors: [{ name: "Ren Ji Tang" }],
  creator: "Ren Ji Tang",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: siteUrl,
    siteName: "Ren Ji Tang",
    title: "Ren Ji Tang — Acupunctuur & TCG in 's-Hertogenbosch | 5 Sterren",
    description:
      "Enige TCG-praktijk in 's-Hertogenbosch met Mandarijnsprekende behandelaar. 5.0 sterren op Google. Online afspraak 24/7. Erkend door alle grote zorgverzekeraars.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const googleAdsEnabled = isGoogleAdsConfigured();
  const needsConsentBootstrap = Boolean(gaId || googleAdsEnabled);

  return (
    <html lang="nl" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased dark:bg-[#141210] dark:text-rjt-cream">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-sm focus:bg-vermilion focus:px-4 focus:py-2 focus:text-white"
        >
          Ga naar inhoud
        </a>
        {needsConsentBootstrap ? (
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
                  'functionality_storage': 'granted',
                  'personalization_storage': 'denied',
                  'security_storage': 'granted'
                });
              `}
            </Script>
            {gaId ? <GoogleAnalyticsWithConsent measurementId={gaId} /> : null}
            {googleAdsEnabled ? <GoogleAdsTag /> : null}
          </>
        ) : null}
        <SchemaOrg />
        <Providers>{children}</Providers>
        <CookieBanner />
      </body>
    </html>
  );
}
