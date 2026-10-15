import { RECAPTCHA_SITE_KEY } from "@/lib/recaptcha";

// Google's required attribution when the floating reCAPTCHA badge is hidden
// (see .grecaptcha-badge in globals.css — it would otherwise sit on top of
// the bottom-right ScrollProgress button). Rendered under every form that
// sends a v3 token; hidden when reCAPTCHA isn't configured.
export function RecaptchaNotice() {
  if (!RECAPTCHA_SITE_KEY) return null;
  return (
    <p className="text-[12px] leading-[18px] text-white-dark-hover">
      This site is protected by reCAPTCHA and the Google{" "}
      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-navy">
        Privacy Policy
      </a>{" "}
      and{" "}
      <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-navy">
        Terms of Service
      </a>{" "}
      apply.
    </p>
  );
}
