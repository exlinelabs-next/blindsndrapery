import type { RichParagraphs } from "@/types/content";

// Renders WP-authored rich body copy: one <p> per paragraph, with any
// <spl>...</spl> segment styled teal. `className` applies to every <p> —
// pass the same classes the old single-string <p> used at each call site.
export function RichText({
  paragraphs,
  className,
}: {
  paragraphs: RichParagraphs;
  className?: string;
}) {
  return (
    <>
      {paragraphs.map((segments, i) => (
        <p key={i} className={className}>
          {segments.map((segment, j) => (
            <span key={j} className={segment.emphasis ? "text-teal" : undefined}>
              {segment.text}
            </span>
          ))}
        </p>
      ))}
    </>
  );
}
