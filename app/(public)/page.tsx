import type { Metadata } from "next";
import { HomePageView } from "@/components/home/HomePageView";
import { PartnerLogos } from "@/components/sections/PartnerLogos";

export const metadata: Metadata = {
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/`
      : "https://www.renjitang.nl/",
  },
};

export default function HomePage() {
  return (
    <>
      <HomePageView />
      <PartnerLogos />
    </>
  );
}
