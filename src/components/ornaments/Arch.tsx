import type { CSSProperties, ReactNode } from "react";
import {
  ARCH_RATIOS,
  archId,
  archPath,
  ratioValue,
  type ArchKind,
  type ArchRatio,
} from "@/lib/arch";
import { cn } from "@/lib/cn";

const KINDS: ArchKind[] = ["jharokha", "mehrab", "pointed"];

/** Rendered once in the root layout; every ArchFrame points at these clip paths. */
export function ArchDefs() {
  return (
    <svg aria-hidden focusable="false" width="0" height="0" className="pointer-events-none absolute">
      <defs>
        {KINDS.flatMap((kind) =>
          ARCH_RATIOS.map((r) => (
            <clipPath key={archId(kind, r)} id={archId(kind, r)} clipPathUnits="objectBoundingBox">
              <path d={archPath(kind, ratioValue(r))} />
            </clipPath>
          )),
        )}
      </defs>
    </svg>
  );
}

interface ArchFrameProps {
  kind?: ArchKind;
  ratio?: ArchRatio;
  /** draw a fine gold line around the arch, offset by this many px */
  outline?: number | false;
  className?: string;
  innerClassName?: string;
  outlineClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * An image window shaped like a Rajasthani arch. Put a `next/image` with `fill`
 * (or any media) inside.
 */
export function ArchFrame({
  kind = "jharokha",
  ratio = "3x4",
  outline = false,
  className,
  innerClassName,
  outlineClassName,
  style,
  children,
}: ArchFrameProps) {
  const [w, h] = ratio.split("x");
  return (
    <div className={cn("relative", className)} style={{ aspectRatio: `${w} / ${h}`, ...style }}>
      <div
        className={cn("absolute inset-0 overflow-hidden", innerClassName)}
        style={{ clipPath: `url(#${archId(kind, ratio)})` }}
      >
        {children}
      </div>
      {outline !== false && (
        <ArchOutline kind={kind} ratio={ratio} offset={outline} className={outlineClassName} />
      )}
    </div>
  );
}

export function ArchOutline({
  kind,
  ratio,
  offset = 12,
  className,
}: {
  kind: ArchKind;
  ratio: ArchRatio;
  offset?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute overflow-visible text-accent-soft", className)}
      style={{
        inset: -offset,
        width: `calc(100% + ${offset * 2}px)`,
        height: `calc(100% + ${offset * 2}px)`,
      }}
    >
      <path
        d={archPath(kind, ratioValue(ratio), true)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
