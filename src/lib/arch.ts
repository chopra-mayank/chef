/**
 * Arch geometry used to frame images.
 *
 * - "jharokha": a multifoil (cusped) arch, as on Rajasthani balconies and palace gates.
 * - "mehrab":   a plain round arch, for small cards.
 * - "pointed":  a two-centred pointed arch.
 *
 * Paths are written in objectBoundingBox units (0–1 on both axes) so one <clipPath>
 * scales with its element. Each path is built for a given width÷height ratio so the
 * lobes stay round instead of being stretched.
 */

export type ArchKind = "jharokha" | "mehrab" | "pointed";

/** Aspect ratios we pre-generate clip paths for (width x height). */
export const ARCH_RATIOS = ["1x1", "4x5", "3x4", "2x3", "3x5", "9x16"] as const;
export type ArchRatio = (typeof ARCH_RATIOS)[number];

export function ratioValue(r: ArchRatio): number {
  const [w, h] = r.split("x").map(Number);
  return w / h;
}

export function archId(kind: ArchKind, ratio: ArchRatio) {
  return `arch-${kind}-${ratio}`;
}

const f = (n: number) => String(Math.round(n * 10000) / 10000);

interface MultifoilOptions {
  /** width ÷ height of the element the arch masks */
  ratio: number;
  /** number of lobes; odd keeps a lobe at the crown */
  lobes?: number;
  /** height of the arch above its springing, as a fraction of its span (> 0.5 is pointed) */
  rise?: number;
  /** roundness of each lobe: 1 = semicircle */
  bulge?: number;
  /** leave the bottom edge open (for outlines) */
  open?: boolean;
}

/**
 * Points along a two-centred pointed arch spanning the full width (x 0 → 1),
 * spaced evenly by arc length. The crown sits `top` below y = 0 so the crown
 * lobe has room to bulge upward. The side lobes spill past x = 0/1 and are
 * cut off by the element's box, which reads as half-lobes springing from the wall.
 */
function multifoilGeometry(lobes: number, rise: number, top: number) {
  const h = 0.5;
  const a = rise;
  const spring = top + a;
  const R = (h * h + a * a) / (2 * h);
  const cx = R;
  const thetaApex = Math.acos((0.5 - cx) / R);
  const half = R * (Math.PI - thetaApex);
  const total = 2 * half;
  const pts: [number, number][] = [];
  for (let k = 0; k <= lobes; k++) {
    const t = (k / lobes) * total;
    const onLeft = t <= half;
    const th = Math.PI - (onLeft ? t : total - t) / R;
    const x = cx + R * Math.cos(th);
    const y = spring - R * Math.sin(th);
    pts.push([onLeft ? x : 1 - x, y]);
  }
  return { spring, pts };
}

export function multifoilPath({
  ratio,
  lobes = 11,
  rise = 0.62,
  bulge = 0.62,
  open = false,
}: MultifoilOptions): string {
  const H = 1 / ratio;
  // First pass to learn the lobe size, then leave that much headroom above the crown.
  const probe = multifoilGeometry(lobes, rise, 0).pts;
  const chord = Math.hypot(probe[1][0] - probe[0][0], probe[1][1] - probe[0][1]);
  const top = ((bulge * chord) / 2) * 1.1;
  const { spring, pts } = multifoilGeometry(lobes, rise, top);

  let d = `M0 1 L0 ${f(spring / H)}`;
  for (let k = 0; k < pts.length - 1; k++) {
    const [x0, y0] = pts[k];
    const [x1, y1] = pts[k + 1];
    const c = Math.hypot(x1 - x0, y1 - y0);
    const s = (bulge * c) / 2;
    const r = (c * c) / (8 * s) + s / 2;
    d += ` A${f(r)} ${f(r / H)} 0 0 1 ${f(x1)} ${f(y1 / H)}`;
  }
  d += ` L1 1`;
  return open ? d : `${d} Z`;
}

export function mehrabPath({ ratio, open = false }: { ratio: number; open?: boolean }) {
  const ry = 0.5 * ratio;
  const d = `M0 1 L0 ${f(ry)} A0.5 ${f(ry)} 0 0 1 1 ${f(ry)} L1 1`;
  return open ? d : `${d} Z`;
}

export function pointedPath({
  ratio,
  rise = 0.62,
  open = false,
}: {
  ratio: number;
  rise?: number;
  open?: boolean;
}) {
  const H = 1 / ratio;
  const R = 0.25 + rise * rise;
  const d = `M0 1 L0 ${f(rise / H)} A${f(R)} ${f(R / H)} 0 0 1 0.5 0 A${f(R)} ${f(R / H)} 0 0 1 1 ${f(rise / H)} L1 1`;
  return open ? d : `${d} Z`;
}

export function archPath(kind: ArchKind, ratio: number, open = false) {
  if (kind === "mehrab") return mehrabPath({ ratio, open });
  if (kind === "pointed") return pointedPath({ ratio, open });
  // Taller elements get a taller, more pointed arch; squarer ones a lower one.
  const rise = ratio <= 0.6 ? 0.95 : ratio <= 0.8 ? 0.85 : ratio <= 0.9 ? 0.75 : 0.6;
  return multifoilPath({ ratio, open, rise, bulge: 0.5, lobes: 13 });
}
