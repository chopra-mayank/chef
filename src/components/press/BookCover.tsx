import { archPath } from "@/lib/arch";
import { Jaali, Rosette } from "@/components/ornaments/Patterns";
import { cn } from "@/lib/cn";
import type { Publication } from "@/content/press";

const palettes = {
  indigo: "bg-night-800 text-zari-200",
  laal: "bg-laal-700 text-zari-200",
  sand: "bg-sand-200 text-ink-900",
};

/**
 * A typographic book cover drawn in CSS — stands in for real cover art.
 */
export function BookCover({
  pub,
  className,
  id,
}: {
  pub: Publication;
  className?: string;
  id: string;
}) {
  const arch = archPath("jharokha", 0.72, true);
  return (
    <div
      className={cn(
        "group relative aspect-[2/3] w-full [perspective:1600px]",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden shadow-[18px_24px_40px_-18px_rgb(20_17_14/0.55),2px_2px_0_rgb(20_17_14/0.15)] transition-transform duration-700 ease-[var(--ease-royal)] [transform:rotateY(-14deg)] [transform-origin:left_center] group-hover:[transform:rotateY(-4deg)]",
          palettes[pub.cover],
        )}
      >
        {/* spine shading */}
        <span className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/30 via-black/5 to-transparent" />
        <span className="absolute inset-y-0 left-4 w-px bg-white/15" />
        <Jaali id={id} size={30} detailed={false} className="opacity-[0.12]" />
        {/* arch window */}
        <div className="absolute inset-x-[17%] top-[12%] bottom-[34%]">
          <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            <path d={arch} fill="none" stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <Rosette className="size-10 opacity-90" />
          </div>
        </div>
        <div className="absolute inset-x-[10%] bottom-[8%] text-center">
          <p className="font-display text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.05]">{pub.title}</p>
          {pub.subtitle && (
            <p className="mx-auto mt-2 max-w-[22ch] text-[0.6875rem] uppercase leading-snug tracking-[0.18em] opacity-75">
              {pub.subtitle}
            </p>
          )}
          <p className="mt-4 text-[0.625rem] uppercase tracking-[0.3em] opacity-70">Saurabh Sharma</p>
        </div>
      </div>
    </div>
  );
}
