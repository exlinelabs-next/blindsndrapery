// The WordPress backend's origin, read from NEXT_PUBLIC_WP_URL (.env.local
// locally, the host's env settings in deployment). NEXT_PUBLIC_ so it's
// inlined into client bundles too — src/lib/forms.ts posts the commercial
// bid straight to WP from the browser. Trailing slashes are stripped so
// callers can always append "/graphql", "/wp-json/...", etc.
const raw = process.env.NEXT_PUBLIC_WP_URL;

if (!raw) {
  throw new Error("NEXT_PUBLIC_WP_URL is not set — add it to .env.local");
}

export const WP_URL = raw.replace(/\/+$/, "");
export const WP_HOSTNAME = new URL(WP_URL).hostname;
