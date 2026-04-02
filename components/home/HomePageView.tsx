import { BehandelingenGrid } from "@/components/sections/BehandelingenGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { Hero } from "@/components/sections/Hero";
import { OverOns } from "@/components/sections/OverOns";
import { Testimonials } from "@/components/sections/Testimonials";
import { HomeTrustGrid } from "@/components/sections/HomeTrustGrid";

export function HomePageView() {
  return (
    <div className="bg-paper text-ink">
      <Hero />
      <HomeTrustGrid />
      <BehandelingenGrid />
      <OverOns />
      <Testimonials />
      <CTABanner />
    </div>
  );
}
