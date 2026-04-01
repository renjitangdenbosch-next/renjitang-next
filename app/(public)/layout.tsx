import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-w-0 pt-[7.75rem] md:pt-[8.75rem]">{children}</main>
      <Footer />
    </>
  );
}
