const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ??
  "https://blindsndrapery.exlinelabs.com/graphql";

// WP Application Password auth for the "Allow only specific queries"
// GraphQL restriction. Server-only env vars (no NEXT_PUBLIC_ prefix) so
// this never reaches the client bundle — this function also runs from
// "use client" components (see src/lib/forms.ts), and those calls go out
// unauthenticated. If/when the WP-side restriction is turned on, those
// client-side mutation calls will need to move behind a Next.js API route
// that attaches this same auth server-side instead of calling WP directly
// from the browser, since an application password can never be shipped to
// client-side JS.
const WP_AUTH_HEADER: Record<string, string> =
  process.env.WP_GRAPHQL_USERNAME && process.env.WP_GRAPHQL_APP_PASSWORD
    ? {
        Authorization: `Basic ${Buffer.from(
          `${process.env.WP_GRAPHQL_USERNAME}:${process.env.WP_GRAPHQL_APP_PASSWORD}`,
        ).toString("base64")}`,
      }
    : {};

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      ...WP_AUTH_HEADER,
      ...(process.env.WP_BUILD_TOKEN
        ? { "X-Build-Token": process.env.WP_BUILD_TOKEN }
        : {}),
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    console.error("GraphQL errors:", json.errors);
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}
