"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Acknowledgement popup shown over the page once a form submission
// succeeds — shared by every form (home/city/free-quote contact forms and
// the commercial bid form). Portals to document.body so no section's
// stacking context (e.g. ServiceProcess's pinned z-[51]) can trap it. ESC,
// a click on the backdrop, or the Close button dismiss it; page scroll is
// locked while it's open.
export function SuccessDialog({ message, onClose }: { message: string | null; onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const open = message !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus into the dialog so keyboard/screen-reader users land on it.
    cardRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/70 p-5"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-success-message"
    >
      <div
        ref={cardRef}
        tabIndex={-1}
        className="animate-toast-in flex w-full max-w-[460px] flex-col items-center gap-6 rounded-lg border border-ice bg-white px-6 py-10 text-center shadow-[0px_8px_40px_rgba(15,30,60,0.25)] outline-none md:px-10"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-teal-hover text-teal-dark">
          <Check className="size-7" strokeWidth={2.25} aria-hidden="true" />
        </span>
        <p id="form-success-message" className="font-body text-[16px] leading-[26px] text-navy">
          {message}
        </p>
        <Button type="button" showArrow={false} onClick={onClose}>
          Close
        </Button>
      </div>
    </div>,
    document.body,
  );
}
