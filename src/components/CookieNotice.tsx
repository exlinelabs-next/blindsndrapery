"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "bnd-cookie-notice";
const CHANGE_EVENT = "bnd-cookie-notice-change";

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// Any stored value means the notice has been seen. Unreadable storage
// (private browsing) reads as unseen, so the notice simply shows again.
function noticeSeen(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

function dismissNotice() {
  try {
    window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  } catch {
    // Storage blocked — the dismissal still applies for this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// Cookie notice — informs rather than gates, per the client's choice: GA4
// (root layout) loads on arrival regardless, and one "Got it" dismisses the
// banner for good. Not a consent mechanism, so not a compliant setup for
// EU/UK visitors. Read through useSyncExternalStore so the server render
// (notice hidden) matches the first client paint instead of flashing.
export function CookieNotice() {
  const seen = useSyncExternalStore(subscribe, noticeSeen, () => true);
  if (seen) return null;

  return (
    <section aria-label="Cookie notice" className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 md:px-6 md:pb-6">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-4 rounded-lg border border-ice bg-white p-5 shadow-[0px_8px_40px_rgba(15,30,60,0.2)] md:flex-row md:items-center md:justify-between md:gap-6 md:p-6">
        <p className="text-[15px] leading-[23px] text-navy">
          We use cookies to understand how visitors use this site, so we can keep improving it. See our{" "}
          <Link href="/privacy-policy" className="font-semibold text-teal-dark underline underline-offset-2 hover:text-teal-dark-pressed">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <Button type="button" showArrow={false} onClick={dismissNotice} className="shrink-0">
          Got it
        </Button>
      </div>
    </section>
  );
}
