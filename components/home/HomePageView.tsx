import { BehandelingenGrid } from "@/components/sections/BehandelingenGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { Hero } from "@/components/sections/Hero";
import { OverOns } from "@/components/sections/OverOns";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustBar } from "@/components/sections/TrustBar";

export function HomePageView() {
  return (
    <div className="bg-paper text-ink">
      <Hero />
      <TrustBar />
      <BehandelingenGrid />
      <OverOns />
      <Testimonials />
      <CTABanner />
    </div>
  );
}
