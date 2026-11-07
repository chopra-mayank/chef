"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CookingPotIcon, PrinterIcon, ShareNetworkIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

const actionCls =
  "inline-flex h-11 items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-fg";

/** Print, share and "cook mode" (keeps the screen awake while cooking). */
export function RecipeActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [cookMode, setCookMode] = useState(false);
  const lock = useRef<WakeLockSentinel | null>(null);
  // Only offer cook mode where the Screen Wake Lock API exists (false while prerendering)
  const canWake = useSyncExternalStore(
    () => () => {},
    () => "wakeLock" in navigator,
    () => false,
  );

  useEffect(() => {
    if (!cookMode) {
      lock.current?.release().catch(() => {});
      lock.current = null;
      return;
    }
    navigator.wakeLock
      .request("screen")
      .then((l) => {
        lock.current = l;
        l.addEventListener("release", () => setCookMode(false));
      })
      .catch(() => setCookMode(false));
    return () => {
      lock.current?.release().catch(() => {});
    };
  }, [cookMode]);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* cancelled */
      }
    }
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-1" data-print="hide">
      <button type="button" onClick={() => window.print()} className={actionCls}>
        <PrinterIcon weight="light" className="size-[18px]" /> Print
      </button>
      <button type="button" onClick={share} className={actionCls}>
        <ShareNetworkIcon weight="light" className="size-[18px]" />
        <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
      </button>
      {canWake && (
        <button
          type="button"
          role="switch"
          aria-checked={cookMode}
          onClick={() => setCookMode((v) => !v)}
          className={cn(actionCls, cookMode && "text-accent")}
          title="Keeps your screen awake while you cook"
        >
          <CookingPotIcon weight={cookMode ? "fill" : "light"} className="size-[18px]" />
          Cook mode {cookMode ? "on" : "off"}
        </button>
      )}
    </div>
  );
}
