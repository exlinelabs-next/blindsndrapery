// reCAPTCHA v3 — server-side token verification. Server-only: reads the
// secret key, which must never be NEXT_PUBLIC_.

// v3 scores 0.0 (bot) to 1.0 (human); 0.5 is Google's own default.
const MIN_SCORE = 0.5;

// Codes that mean the token itself is bad — the only verdicts worth refusing
// a submission over. Anything else Google reports (e.g. "browser-error", or
// our own misconfiguration) is logged and let through: losing a real enquiry
// costs more than letting an occasional bot past the honeypot. A missing
// token is still refused, or skipping it would bypass reCAPTCHA entirely.
const REJECT_CODES = new Set(["invalid-input-response", "timeout-or-duplicate"]);

// Fails open when no secret is configured (a deploy without the env var
// keeps taking enquiries) and when Google is unreachable (a timeout there
// must not cost a real lead).
export async function verifyRecaptcha(token: string | null | undefined): Promise<{ ok: boolean; reason?: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true, reason: "not configured" };
  if (!token) return { ok: false, reason: "no token" };

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    const result = (await response.json()) as { success?: boolean; score?: number; "error-codes"?: string[] };

    const codes = result["error-codes"] ?? [];
    if (!result.success && codes.some((code) => REJECT_CODES.has(code))) {
      return { ok: false, reason: codes.join(", ") };
    }
    if (!result.success) {
      console.warn(`[recaptcha] inconclusive, allowing submission: ${codes.join(", ") || "unknown"}`);
      return { ok: true };
    }
    if (typeof result.score === "number" && result.score < MIN_SCORE) {
      return { ok: false, reason: `score ${result.score}` };
    }
    return { ok: true };
  } catch (error) {
    console.warn(`[recaptcha] unreachable, allowing submission: ${error instanceof Error ? error.message : error}`);
    return { ok: true, reason: "verification unavailable" };
  }
}
