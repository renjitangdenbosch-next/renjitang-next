/** Hero-afbeeldingen voor dynamische WP-pagina’s (alleen /public/images). */
export const WP_HERO_IMAGES = [
  "/images/DSC_0350-scaled.jpg",
  "/images/DSC_0378-scaled.jpg",
  "/images/PHOTO-2024-11-26-19-19-05(1).jpg",
  "/images/PHOTO-2024-11-26-19-19-05-6.jpg",
  "/images/PHOTO-2024-11-26-19-19-52-2.jpg",
  "/images/PHOTO-2024-11-26-19-19-53-4.jpg",
  "/images/PHOTO-2024-11-26-19-19-53-5-1.jpg",
  "/images/PHOTO-2024-11-26-19-19-53-6-1.jpg",
  "/images/PHOTO-2024-11-26-19-19-54(1).jpg",
] as const;

const DEFAULT_HERO = "/images/DSC_0350-scaled.jpg";

export function heroImageForSlug(slug: string): string {
  if (!slug) return DEFAULT_HERO;
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const idx = h % WP_HERO_IMAGES.length;
  return WP_HERO_IMAGES[idx] ?? DEFAULT_HERO;
}
