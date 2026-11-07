"use client";

import { useState } from "react";
import { VideoCard } from "@/components/video/VideoCard";
import { SERIES, type Series, type Video } from "@/content/videos";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/style";

/** Long-form videos with a series filter. */
export function VideoLibrary({ videos }: { videos: Video[] }) {
  const [series, setSeries] = useState<Series | "All">("All");
  const available = SERIES.filter((s) => s !== "Shorts" && videos.some((v) => v.series === s));
  const list = videos.filter((v) => series === "All" || v.series === series);

  return (
    <div>
      <div role="group" aria-label="Series" className="hide-scrollbar -mx-1 flex gap-1 overflow-x-auto border-b border-line">
        {(["All", ...available] as const).map((s) => (
          <button
            key={s}
            aria-pressed={series === s}
            onClick={() => setSeries(s)}
            className={cn(
              "relative shrink-0 px-3 pb-4 pt-2 text-[0.75rem] font-medium uppercase tracking-[0.2em] transition-colors",
              series === s ? "text-accent" : "text-fg-subtle hover:text-fg",
            )}
          >
            {s === "All" ? "All series" : s}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-3 -bottom-px h-px origin-left bg-current transition-transform duration-500 ease-[var(--ease-royal)]",
                series === s ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        ))}
      </div>
      <p className="mt-6 text-small text-fg-subtle" aria-live="polite">
        {list.length} {list.length === 1 ? "film" : "films"}
      </p>
      <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v, i) => (
          <div key={v.id} data-reveal style={delay((i % 3) * 90)}>
            <VideoCard video={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
