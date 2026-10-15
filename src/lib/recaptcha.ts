// reCAPTCHA v3 (invisible, score-based) — browser side. The script itself
// is loaded site-wide from the root layout (v3 scores better when it sees
// the whole visit, not just the form page); forms call getRecaptchaToken()
// right before submitting and send the token along for server-side
// verification (src/lib/recaptcha-server.ts).
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

// A v3 token for this submission, or null if reCAPTCHA isn't configured or
// never loaded (ad blocker, offline) — the server decides what a missing
// token means.
export function getRecaptchaToken(action: string): Promise<string | null> {
  const grecaptcha = typeof window !== "undefined" ? window.grecaptcha : undefined;
  if (!RECAPTCHA_SITE_KEY || !grecaptcha) return Promise.resolve(null);
  return new Promise((resolve) => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action })
        .then(resolve)
        .catch(() => resolve(null));
    });
  });
}
