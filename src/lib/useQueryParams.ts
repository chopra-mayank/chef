"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENT = "querychange";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

/**
 * The URL's query string as shareable state. Pages stay statically prerendered
 * (the server snapshot is empty); the browser picks up ?region=… after hydration.
 */
export function useQueryParams() {
  const search = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );

  const setParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return [new URLSearchParams(search), setParam] as const;
}
