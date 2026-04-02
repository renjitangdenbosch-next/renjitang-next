import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PublicMain } from "@/components/layout/PublicMain";
import { FloatingCTA } from "@/components/ui/FloatingCTA";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <PublicMain>{children}</PublicMain>
      <Footer />
      <FloatingCTA />
    </>
  );
}
