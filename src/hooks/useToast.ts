"use client";

import { useCallback, useRef, useState } from "react";

// Auto-dismissing toast notification state, shared by every form that needs
// a "your request went through" confirmation without swapping its fields
// out for a static message block.
export function useToast(duration = 5000) {
  const [message, setMessage] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideToast = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMessage(null);
  }, []);

  const showToast = useCallback(
    (msg: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setMessage(msg);
      timeoutRef.current = setTimeout(() => setMessage(null), duration);
    },
    [duration],
  );

  return { message, showToast, hideToast };
}
