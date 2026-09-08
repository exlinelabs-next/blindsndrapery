import Link from "next/link";

// Breadcrumb content everywhere is authored as a single " > "-separated
// string (e.g. "HOME > SERVICES > Shades"), not structured {label, href}
// data, so hrefs for the known category segments are resolved here by
// label rather than threaded through every content type. The first
// segment always links home; the last segment is the current page and is
// never a link; anything in between links only if its label matches a
// known section below (case-insensitive) — unrecognized segments render
// as plain text rather than a dead link.
const SECTION_HREFS: Record<string, string> = {
  services: "/services",
  shades: "/services/shades",
  commercial: "/commercial",
  gallery: "/gallery",
  locations: "/locations",
  "locations hub": "/locations",
  about: "/about",
  "about us": "/about",
  "free quote": "/free-quote",
  blog: "/resources",
  resources: "/resources",
  "knowledge base": "/knowledge-base",
};

export function Breadcrumb({ trail }: { trail: string }) {
  const segments = trail
    .split(">")
    .map((segment) => segment.trim())
    .filter(Boolean);

  return (
    <>
      {segments.map((label, i) => {
        const isLast = i === segments.length - 1;
        const href = i === 0 ? "/" : SECTION_HREFS[label.toLowerCase()];

        return (
          <span key={i}>
            {i > 0 && " > "}
            {!isLast && href ? (
              <Link href={href} className="hover:text-teal">
                {label}
              </Link>
            ) : (
              label
            )}
          </span>
        );
      })}
    </>
  );
}
