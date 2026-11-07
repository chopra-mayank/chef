import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A slow, endless band of words. Content is doubled so the loop is seamless. */
export function Marquee({
  items,
  separator,
  className,
  itemClassName,
  speed = 60,
}: {
  items: ReactNode[];
  separator?: ReactNode;
  className?: string;
  itemClassName?: string;
  /** seconds per loop */
  speed?: number;
}) {
  const row = (copy: number) =>
    items.map((item, i) => (
      <Fragment key={`${copy}-${i}`}>
        <span className={cn("shrink-0", itemClassName)}>{item}</span>
        {separator && <span className="shrink-0">{separator}</span>}
      </Fragment>
    ));
  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee items-center gap-8 pr-8 hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {row(0)}
        <span aria-hidden className="contents">
          {row(1)}
        </span>
      </div>
    </div>
  );
}
