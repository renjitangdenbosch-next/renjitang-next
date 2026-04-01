import { cn } from "@/lib/cn";

/** Rendert WordPress HTML (prose). Lege alt in CMS: overweeg handmatige alt in WordPress. */
export function WpContent({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "wp-content prose prose-stone max-w-none dark:prose-invert prose-headings:font-serif prose-img:rounded-lg",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
