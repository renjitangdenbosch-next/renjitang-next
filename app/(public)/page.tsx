import { HomePageView } from "@/components/home/HomePageView";
import { WpContent } from "@/components/WpContent";
import { GoldDivider, WaveLine } from "@/components/ChineseDecor";
import { getHomePageContent } from "@/lib/wordpress";

export const revalidate = 3600;

export default async function HomePage() {
  const wp = await getHomePageContent();

  return (
    <>
      <HomePageView />

      {wp?.content?.rendered && (
        <section
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
          aria-label="Aanvullende inhoud"
        >
          <div className="mb-10 text-center">
            <WaveLine className="mx-auto w-64 text-rjt-gold opacity-60" />
            <GoldDivider className="mt-6" />
          </div>
          <div className="rounded-sm border border-stone-200/90 bg-rjt-cream/90 p-6 dark:border-stone-700 dark:bg-[#1a1714] sm:p-10">
            <WpContent html={wp.content.rendered} />
          </div>
        </section>
      )}
    </>
  );
}
