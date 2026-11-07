"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRightIcon, XIcon, YoutubeLogoIcon } from "@phosphor-icons/react";
import { lockScroll, unlockScroll } from "@/components/motion/SmoothScroll";
import { Jaali, Rosette } from "@/components/ornaments/Patterns";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Pages whose first screen is dark, so the header starts in light ink. */
const DARK_HEROES = ["/videos", "/story", "/accolades"];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const darkHero = DARK_HEROES.some((p) => isActive(pathname, p));

  // Condense after the first scroll; tuck away while reading down, return on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let hiddenNow = false;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 32);
      let next = hiddenNow;
      if (y < 480) next = false;
      else if (y > last + 6) next = true;
      else if (y < last - 6) next = false;
      if (next !== hiddenNow) {
        hiddenNow = next;
        setHidden(next);
      }
      last = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) lockScroll();
    else unlockScroll();
  }, [open]);

  const lightInk = darkHero && !scrolled;
  const left = nav.slice(0, 3);
  const right = nav.slice(3);

  return (
    <header
      data-print="hide"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,box-shadow] duration-500 ease-[var(--ease-royal)]",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? darkHero
            ? "bg-night-950/88 text-sand-100 shadow-[0_1px_0_rgb(245_238_226/0.12)] backdrop-blur-md"
            : "bg-sand-50/88 text-ink-900 shadow-[0_1px_0_rgb(33_28_23/0.1)] backdrop-blur-md"
          : lightInk
            ? "text-sand-100"
            : "text-ink-900",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sand-50"
      >
        Skip to content
      </a>
      <div
        className={cn(
          "container-x grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-500",
          scrolled ? "h-[72px]" : "h-[92px]",
        )}
      >
        {/* left */}
        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {left.map((item) => (
            <NavLink key={item.href} href={item.href} active={isActive(pathname, item.href)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-11 items-center gap-3 justify-self-start text-[0.75rem] font-medium uppercase tracking-[0.2em] lg:hidden"
          aria-label="Open menu"
        >
          <span aria-hidden className="flex w-6 flex-col gap-[6px]">
            <span className="h-px w-full bg-current" />
            <span className="h-px w-3/4 bg-current" />
          </span>
          <span className="hidden sm:inline">Menu</span>
        </button>

        {/* centre: wordmark */}
        <Link href="/" className="flex flex-col items-center leading-none" aria-label={`${site.fullTitle} — home`}>
          <span className="font-display text-[1.25rem] tracking-[-0.01em] sm:text-[1.5rem]">{site.name}</span>
          <span className="mt-1.5 text-[0.625rem] uppercase tracking-[0.32em] opacity-70">Chef · Jaipur</span>
        </Link>

        {/* right */}
        <nav aria-label="Secondary" className="hidden items-center justify-end gap-9 lg:flex">
          {right.map((item) => (
            <NavLink key={item.href} href={item.href} active={isActive(pathname, item.href)}>
              {item.label}
            </NavLink>
          ))}
          <a
            href={site.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube channel"
            className="-mr-2 grid size-10 place-items-center opacity-80 transition-opacity hover:opacity-100"
          >
            <YoutubeLogoIcon weight="light" className="size-[22px]" />
          </a>
        </nav>
        <a
          href={site.youtube.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube channel"
          className="grid size-11 place-items-center justify-self-end lg:hidden"
        >
          <YoutubeLogoIcon weight="light" className="size-[22px]" />
        </a>
      </div>

      <MobileMenu open={open} onOpenChange={setOpen} pathname={pathname} />
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="link-draw relative text-[0.75rem] font-medium uppercase tracking-[0.2em]"
    >
      {children}
    </Link>
  );
}

function MobileMenu({
  open,
  onOpenChange,
  pathname,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  pathname: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Content
          data-lenis-prevent
          className="theme-night fixed inset-0 z-[70] flex animate-fade-in flex-col overflow-y-auto"
          aria-describedby={undefined}
        >
          <Jaali id="menu-jaali" size={72} className="text-zari-300 opacity-[0.07]" />
          <div className="container-x relative flex h-[92px] shrink-0 items-center justify-between">
            <Dialog.Title className="eyebrow text-accent">Menu</Dialog.Title>
            <Dialog.Close className="grid size-11 place-items-center" aria-label="Close menu">
              <XIcon weight="light" className="size-6" />
            </Dialog.Close>
          </div>
          <nav className="container-x relative flex flex-1 flex-col justify-center gap-1 py-8">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                onClick={() => onOpenChange(false)}
                className="group flex animate-rise items-baseline justify-between border-b border-line py-4"
                style={{ animationDelay: `${120 + i * 60}ms` }}
              >
                <span className="font-display text-[clamp(2.25rem,9vw,3.5rem)] leading-none tracking-[-0.02em] transition-colors group-aria-[current=page]:text-accent">
                  {item.label}
                </span>
                <span lang="hi" className="text-lg text-fg-subtle">
                  {item.hi}
                </span>
              </Link>
            ))}
          </nav>
          <div className="container-x relative flex shrink-0 flex-col gap-6 pb-10 pt-4">
            <p className="flex items-center gap-3 text-fg-muted">
              <Rosette className="size-3 text-accent" />
              <span lang="hi">{site.greeting.hi}</span>
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.75rem] uppercase tracking-[0.2em]">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw">
                  {s.label}
                </a>
              ))}
              <a href={site.restaurant.url} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex items-center gap-1">
                RajRasa <ArrowUpRightIcon className="size-3.5" />
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
