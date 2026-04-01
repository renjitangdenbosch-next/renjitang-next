import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessJsonLd } from "@/lib/jsonld";

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.renjitang.nl";

export const metadata: Metadata = {
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
      <body className="min-h-screen bg-rjt-beige font-sans text-rjt-dark antialiased dark:bg-[#141210] dark:text-rjt-cream">
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
      </body>
    </html>
  );
}
