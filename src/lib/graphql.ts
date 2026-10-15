import { createHash } from "crypto";
import { WP_URL } from "./wp";

const GRAPHQL_ENDPOINT = `${WP_URL}/graphql`;

// Automatic Persisted Queries (APQ) — WPGraphQL Smart Cache's mechanism for
// registering a query as a permanent "GraphQL Document" the first time it's
// seen. Sending a plain query, even successfully, does NOT register it —
// confirmed by testing directly against the live endpoint. Per WP's own
// backend dev, the registration only happens through this hash extension,
// sent alongside the full query text so it registers in a single request
// instead of needing the hash-only/"PersistedQueryNotFound"/retry-with-text
// round trip some APQ clients use.
function sha256Hash(query: string): string {
  return createHash("sha256").update(query).digest("hex");
}

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

// The WP host (shared Hostinger hosting) hits "Error establishing a database
// connection" once too many GraphQL requests land on it at the same time —
// confirmed by firing 25 concurrent requests directly at /graphql, which
// consistently 500s a handful of them with that exact MySQL connection-limit
// message. A full `next build` fires GraphQL calls for every page's data
// (and every child-service/gallery image lookup within them) essentially at
// once, so it reliably wins that race some of the time. Any call that loses
// gets caught by the page's own `.catch(() => undefined)` and silently falls
// back to the placeholder mock content — which is why some pages/images
// come out fine and others don't, inconsistently, build to build.
//
// Two independent mitigations against that same root cause: cap how many
// requests to this host are ever in flight at once (so we stop causing the
// spike ourselves), and retry a failed request a couple of times with a
// short backoff (so a request that loses the race gets a second chance once
// the connection-pool pressure has passed, instead of taking its page's
// content down with it).
const MAX_CONCURRENT_REQUESTS = 6;
let activeRequests = 0;
const requestQueue: Array<() => void> = [];

async function acquireSlot(): Promise<void> {
  if (activeRequests < MAX_CONCURRENT_REQUESTS) {
    activeRequests++;
    return;
  }
  await new Promise<void>((resolve) => requestQueue.push(resolve));
  activeRequests++;
}

function releaseSlot(): void {
  activeRequests--;
  const next = requestQueue.shift();
  if (next) next();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 400;

async function performRequest(
  query: string,
  variables?: Record<string, unknown>,
): Promise<Response> {
  return fetch(GRAPHQL_ENDPOINT, {
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
    body: JSON.stringify({
      query,
      variables,
      extensions: {
        persistedQuery: { version: 1, sha256Hash: sha256Hash(query) },
      },
    }),
    next: { revalidate: 3600 },
  });
}

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  await acquireSlot();
  try {
    let res: Response | undefined;
    let lastError: unknown;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        res = await performRequest(query, variables);
        if (res.ok) break;
        // A 5xx here (in practice, the host's DB connection limit being hit
        // under concurrent load) is worth retrying; a 4xx is a real request
        // problem that won't fix itself.
        if (res.status < 500 || attempt === MAX_RETRIES) break;
      } catch (err) {
        lastError = err;
        if (attempt === MAX_RETRIES) break;
      }
      await sleep(RETRY_DELAY_MS * (attempt + 1));
    }

    if (!res) {
      throw lastError instanceof Error
        ? lastError
        : new Error("GraphQL request failed with no response");
    }
    if (!res.ok) {
      throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    if (json.errors?.length) {
      console.error("GraphQL errors:", json.errors);
      throw new Error(json.errors[0].message);
    }

    return json.data as T;
  } finally {
    releaseSlot();
  }
}
