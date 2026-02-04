"use client";

import { useEffect, useRef } from "react";

export function useChatScroll(deps: unknown[] = []) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = endRef.current;
    if (!el) return;
    el.scrollIntoView({ block: "end" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { endRef };
}
