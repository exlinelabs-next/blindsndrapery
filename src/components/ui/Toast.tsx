import { CheckCircle2, X } from "lucide-react";

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-toast-in fixed inset-x-4 bottom-6 z-50 md:inset-x-auto md:right-6 md:w-[420px]"
    >
      <div className="flex items-start gap-3 rounded-lg border border-teal/33 bg-white p-4 shadow-[0px_8px_24px_rgba(15,30,60,0.15)]">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal" strokeWidth={2} />
        <p className="flex-1 text-[15px] leading-[22px] text-navy">{message}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="shrink-0 text-black/40 transition-colors hover:text-black/70"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
