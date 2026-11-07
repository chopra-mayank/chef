"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

let lenis: Lenis | null = null;

/** Pause smooth scrolling (e.g. while a menu or dialog is open). */
export function lockScroll() {
  lenis?.stop();
}
export function unlockScroll() {
  lenis?.start();
}

/**
 * Gentle inertial scrolling with Lenis. Skipped entirely for people who
 * prefer reduced motion. Also drives the scroll-reveal observer.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.11, anchors: { offset: -96 }, autoRaf: true });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // New page: make sure scrolling is running (a dialog may have paused it) and
  // start at the top without easing from the old position.
  useEffect(() => {
    lenis?.start();
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  // Reveal-on-scroll for anything marked data-reveal.
  // React hydrates page segments after this layout-level effect runs, and it
  // complains if we touch an element's attributes first — so start once the
  // browser is idle, and only mark elements React has already taken over.
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    const timers = new Set<number>();
    const hydrated = (el: Element) => Object.keys(el).some((k) => k.startsWith("__reactFiber$"));
    const reveal = (el: Element) => {
      if (!el.isConnected) return;
      if (hydrated(el)) el.classList.add("is-revealed");
      else timers.add(window.setTimeout(() => reveal(el), 120));
    };
    const start = () => {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              io?.unobserve(entry.target);
              reveal(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
      );
      const scan = () =>
        document.querySelectorAll("[data-reveal]:not(.is-revealed)").forEach((el) => io?.observe(el));
      scan();
      mo = new MutationObserver(scan);
      mo.observe(document.body, { childList: true, subtree: true });
    };
    const hasIdle = "requestIdleCallback" in window;
    const idle = hasIdle ? window.requestIdleCallback(start, { timeout: 1200 }) : window.setTimeout(start, 250);
    return () => {
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      timers.forEach((t) => window.clearTimeout(t));
      io?.disconnect();
      mo?.disconnect();
    };
  }, [pathname]);

  return null;
}
