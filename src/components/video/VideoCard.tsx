"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon, PlayIcon, XIcon, YoutubeLogoIcon } from "@phosphor-icons/react";
import { lockScroll, unlockScroll } from "@/components/motion/SmoothScroll";
import type { Video } from "@/content/videos";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";

type Variant = "feature" | "default" | "row" | "short";

function PlayBadge({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid place-items-center rounded-full border border-sand-100/70 bg-night-950/25 text-sand-50 backdrop-blur-[2px] transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-royal)] group-hover:scale-110 group-hover:border-zari-300 group-hover:bg-zari-300 group-hover:text-night-950",
        size === "lg" ? "size-20" : size === "md" ? "size-14" : "size-10",
      )}
    >
      <PlayIcon weight="fill" className={cn("translate-x-[1px]", size === "lg" ? "size-6" : "size-4")} />
    </span>
  );
}

export function VideoCard({
  video,
  variant = "default",
  sizes = "(min-width: 1024px) 30vw, 92vw",
  className,
  preload = false,
}: {
  video: Video;
  variant?: Variant;
  sizes?: string;
  className?: string;
  preload?: boolean;
}) {
  const thumb = (
    <Image
      src={video.thumb}
      alt=""
      fill
      sizes={sizes}
      loading={preload ? "eager" : "lazy"}
      fetchPriority={preload ? "high" : "auto"}
      className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-royal)] group-hover:scale-[1.04]"
    />
  );

  let card: ReactNode;
  if (variant === "feature") {
    card = (
      <>
        <span className="relative block aspect-video overflow-hidden bg-night-900">
          {thumb}
          <span className="absolute inset-0 bg-gradient-to-t from-night-950/85 via-night-950/15 to-transparent" />
          <span className="absolute right-4 top-4 sm:inset-0 sm:grid sm:place-items-center">
            <span className="sm:hidden">
              <PlayBadge size="sm" />
            </span>
            <span className="hidden sm:block">
              <PlayBadge size="lg" />
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 text-sand-50 sm:gap-3 sm:p-10">
            <span className="eyebrow text-zari-300">
              {video.series} · {video.duration}
            </span>
            <span className="max-w-[24ch] font-display text-[1.25rem] font-light leading-tight sm:text-d3">
              {video.title}
            </span>
          </span>
        </span>
      </>
    );
  } else if (variant === "row") {
    card = (
      <span className="grid grid-cols-[9.5rem_1fr] items-center gap-5 sm:grid-cols-[11rem_1fr]">
        <span className="relative block aspect-video overflow-hidden bg-night-900">
          {thumb}
          <span className="absolute inset-0 grid place-items-center">
            <PlayBadge size="sm" />
          </span>
        </span>
        <span className="flex flex-col gap-2">
          <span className="eyebrow text-accent">{video.series}</span>
          <span className="font-display text-[1.125rem] leading-snug transition-colors group-hover:text-accent">
            {video.title}
          </span>
          <span className="text-[0.8125rem] text-fg-subtle numerals">
            {video.duration} · {video.views} views
          </span>
        </span>
      </span>
    );
  } else if (variant === "short") {
    card = (
      <span className="relative block aspect-[9/16] overflow-hidden bg-night-900">
        {thumb}
        <span className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />
        <span className="absolute right-4 top-4">
          <PlayBadge size="sm" />
        </span>
        <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 text-sand-50">
          <span className="font-display text-[1.25rem] leading-tight">{video.title}</span>
          <span className="text-[0.8125rem] text-sand-100/70 numerals">{video.views} views</span>
        </span>
      </span>
    );
  } else {
    card = (
      <>
        <span className="relative block aspect-video overflow-hidden bg-night-900">
          {thumb}
          <span className="absolute inset-0 grid place-items-center">
            <PlayBadge />
          </span>
          <span className="absolute bottom-3 right-3 bg-night-950/80 px-2 py-1 text-[0.75rem] text-sand-50 numerals">
            {video.duration}
          </span>
        </span>
        <span className="mt-5 block eyebrow text-accent">{video.series}</span>
        <span className="mt-2 block font-display text-d5 transition-colors group-hover:text-accent">{video.title}</span>
        <span className="mt-2 block text-small text-fg-subtle numerals">
          {video.views} views · {formatDate(video.published)}
        </span>
      </>
    );
  }

  return (
    <Dialog.Root onOpenChange={(open) => (open ? lockScroll() : unlockScroll())}>
      <Dialog.Trigger className={cn("group block w-full cursor-pointer text-left", className)}>
        <span className="sr-only">Play video: </span>
        {card}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] animate-fade-in bg-night-950/92 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="theme-night fixed left-1/2 top-1/2 z-[81] w-[min(92vw,1120px)] -translate-x-1/2 -translate-y-1/2 animate-fade-in !bg-transparent"
        >
          <div className="mb-4 flex items-center justify-between gap-6">
            <Dialog.Title className="eyebrow text-accent">
              {video.series} · {video.duration}
            </Dialog.Title>
            <Dialog.Close className="grid size-11 place-items-center text-fg" aria-label="Close video">
              <XIcon weight="light" className="size-6" />
            </Dialog.Close>
          </div>
          <div
            className={cn(
              "relative mx-auto overflow-hidden bg-night-900",
              video.vertical ? "aspect-[9/16] h-[min(78vh,760px)]" : "aspect-video w-full",
            )}
          >
            {video.youtubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <>
                <Image src={video.thumb} alt="" fill sizes="90vw" className="object-cover opacity-30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center">
                  <YoutubeLogoIcon weight="light" className="size-10 text-zari-300" />
                  <p className="max-w-md font-display text-d5 text-sand-50">{video.title}</p>
                  <p className="max-w-sm text-small text-fg-muted">
                    Placeholder — add this video’s YouTube ID in <code>content/videos.ts</code> and it will play here.
                  </p>
                  <a
                    href={site.youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 bg-zari-300 px-6 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-night-950"
                  >
                    Open the channel
                  </a>
                </div>
              </>
            )}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <p className="font-display text-d5 text-fg">{video.title}</p>
            {video.recipeSlug && (
              <Link
                href={`/recipes/${video.recipeSlug}`}
                className="inline-flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-accent"
              >
                Get the recipe <ArrowRightIcon weight="light" className="size-4" />
              </Link>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
