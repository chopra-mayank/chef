import { archPath } from "@/lib/arch";
import { cn } from "@/lib/cn";

/* ── Jaali ──────────────────────────────────────────────────────────────
 * The eight-pointed star-and-cross lattice carved into the stone screens
 * of Rajasthani forts. Drawn as fine lines; the crosses appear in the gaps.
 */
function starPath(s: number, scale = 1) {
  const c = s / 2;
  const R = (s / 2) * scale;
  const r = R * (Math.cos(Math.PI / 4) / Math.cos(Math.PI / 8));
  let d = "";
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI) / 8;
    const rad = i % 2 === 0 ? R : r;
    d += `${i ? "L" : "M"}${(c + rad * Math.cos(a)).toFixed(2)} ${(c + rad * Math.sin(a)).toFixed(2)}`;
  }
  return `${d}Z`;
}

export function Jaali({
  id,
  size = 64,
  className,
  detailed = true,
}: {
  /** must be unique on the page */
  id: string;
  size?: number;
  className?: string;
  detailed?: boolean;
}) {
  return (
    <svg
      aria-hidden
      focusable="false"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <path d={starPath(size)} fill="none" stroke="currentColor" strokeWidth={1} />
          {detailed && (
            <>
              <path
                d={starPath(size, 0.5)}
                fill="none"
                stroke="currentColor"
                strokeWidth={0.75}
                transform={`rotate(22.5 ${size / 2} ${size / 2})`}
              />
              {[
                [0, 0],
                [size, 0],
                [0, size],
                [size, size],
              ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r={size * 0.045} fill="currentColor" />
              ))}
            </>
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ── Block-print border ────────────────────────────────────────────────
 * A Sanganeri-style stamped border: five-petal buti between fine rules.
 */
export function BlockPrintBorder({ id, className }: { id: string; className?: string }) {
  return (
    <svg aria-hidden focusable="false" className={cn("block h-7 w-full text-laal-600", className)}>
      <defs>
        <pattern id={id} width="34" height="28" patternUnits="userSpaceOnUse">
          <line x1="0" y1="1.5" x2="34" y2="1.5" stroke="currentColor" strokeWidth="0.8" />
          <line x1="0" y1="4" x2="34" y2="4" stroke="currentColor" strokeWidth="0.4" />
          <line x1="0" y1="24" x2="34" y2="24" stroke="currentColor" strokeWidth="0.4" />
          <line x1="0" y1="26.5" x2="34" y2="26.5" stroke="currentColor" strokeWidth="0.8" />
          <g transform="translate(17 14)">
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse
                key={a}
                rx="2"
                ry="3.6"
                transform={`rotate(${a}) translate(0 -3.9)`}
                fill="currentColor"
              />
            ))}
            <circle r="1.5" className="fill-surface" />
            <circle r="0.7" fill="currentColor" />
          </g>
          <g fill="currentColor">
            <rect x="-1.6" y="12.4" width="3.2" height="3.2" transform="rotate(45 0 14)" />
            <rect x="32.4" y="12.4" width="3.2" height="3.2" transform="rotate(45 34 14)" />
            <circle cx="0" cy="8.6" r="0.75" />
            <circle cx="0" cy="19.4" r="0.75" />
            <circle cx="34" cy="8.6" r="0.75" />
            <circle cx="34" cy="19.4" r="0.75" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ── Leheriya ──────────────────────────────────────────────────────────
 * The wave-dyed stripes of Rajasthani turbans, as a thin band of colour.
 */
export function Leheriya({ id, className }: { id: string; className?: string }) {
  const colors = [
    "var(--color-kesar-500)",
    "var(--color-gulabi-400)",
    "var(--color-night-600)",
    "var(--color-zari-400)",
    "var(--color-laal-600)",
  ];
  const band = 5;
  return (
    <svg aria-hidden focusable="false" className={cn("block h-2 w-full", className)}>
      <defs>
        <pattern
          id={id}
          width="28"
          height={band * colors.length}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-32)"
        >
          {colors.map((c, i) => (
            <path
              key={c}
              d={`M-7 ${i * band + band / 2} q3.5 -2.4 7 0 t7 0 t7 0 t7 0 t7 0`}
              fill="none"
              strokeWidth={band + 0.6}
              style={{ stroke: c }}
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ── Rosette ───────────────────────────────────────────────────────────
 * An eight-petal phool, the small ornament used to mark section labels.
 */
export function Rosette({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="-12 -12 24 24"
      className={cn("inline-block size-3.5 shrink-0", className)}
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path
          key={a}
          d="M0 -2.2 C2.4 -4.6 2.1 -8.6 0 -11 C-2.1 -8.6 -2.4 -4.6 0 -2.2Z"
          transform={`rotate(${a})`}
          fill="currentColor"
          opacity={a % 90 === 0 ? 1 : 0.55}
        />
      ))}
      <circle r="1.7" fill="currentColor" />
    </svg>
  );
}

/* ── Divider ───────────────────────────────────────────────────────────*/
export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center gap-4 text-accent-soft", className)}>
      <span className="h-px flex-1 bg-current opacity-50" />
      <Rosette className="size-3" />
      <span className="h-px flex-1 bg-current opacity-50" />
    </div>
  );
}

/* ── Chhatri ───────────────────────────────────────────────────────────
 * Line drawing of a domed Rajput pavilion. Reuses the jharokha arch geometry.
 */
export function Chhatri({ className }: { className?: string }) {
  const arch = archPath("jharokha", 56 / 48, true);
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 120 136"
      className={cn("inline-block", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* finial */}
      <path d="M60 3V11" />
      <circle cx="60" cy="13" r="2" />
      <path d="M56.5 22.5C56.5 17.5 63.5 17.5 63.5 22.5" />
      <path d="M55 24.5H65" />
      {/* dome */}
      <path d="M31 55C31 38 44 26.5 60 26.5C76 26.5 89 38 89 55" />
      {Array.from({ length: 7 }, (_, i) => 32 + i * 8).map((x) => (
        <path key={x} d={`M${x} 55Q${x + 4} 50 ${x + 8} 55`} />
      ))}
      {/* neck and eave */}
      <path d="M28 55H92M28 59H92" />
      <path d="M22 59H98L106 67H14Z" />
      {/* brackets */}
      <path d="M24 67L30 73M96 67L90 73" />
      {/* capitals and pillars */}
      <path d="M24 67H34V71H24ZM86 67H96V71H86Z" />
      <path d="M26 71V114M32 71V114M88 71V114M94 71V114" />
      {/* cusped arch between the pillars */}
      <g transform="translate(32 71) scale(56 43)">
        <path d={arch} vectorEffect="non-scaling-stroke" />
      </g>
      {/* plinth */}
      <path d="M18 114H102V120H18ZM12 120H108V126H12Z" />
      <path d="M2 131H118" opacity={0.6} />
    </svg>
  );
}

/* ── Monogram ──────────────────────────────────────────────────────────
 * Placeholder mark: the chef's initials inside a jharokha.
 */
export function Monogram({ className }: { className?: string }) {
  const outline = archPath("jharokha", 30 / 40, true);
  return (
    <span aria-hidden className={cn("relative inline-flex h-10 w-[30px] shrink-0 items-end justify-center", className)}>
      <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <path d={outline} fill="none" stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="relative mb-[5px] font-display text-[15px] italic leading-none tracking-[-0.06em]">
        SS
      </span>
    </span>
  );
}
