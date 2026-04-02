/** Vijf gouden sterren — geen emoji. */
export function StarRating({
  count = 5,
  size = 18,
  className = "text-gold",
}: {
  count?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="currentColor"
          className="shrink-0"
        >
          <path d="M10 1.5l2.2 5.6h6l-4.8 3.6 1.8 5.8L10 13.9 4.8 16.5l1.8-5.8L1.8 7.1h6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
