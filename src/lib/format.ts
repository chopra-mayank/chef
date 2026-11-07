/** 95 → "1 hr 35 min" */
export function formatMinutes(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (!h) return `${m} min`;
  if (!m) return `${h} hr`;
  return `${h} hr ${m} min`;
}

/** ISO-8601 duration for schema.org, e.g. PT1H35M */
export function isoDuration(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : h ? "" : "0M"}`;
}

/** "2026-03-14" → "14 March 2026" (fixed locale so server and client agree) */
export function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Pretty-print a scaled ingredient quantity: 1.5 → "1½", 0.25 → "¼" */
export function formatQty(n: number) {
  // Large quantities (grams, ml) read better as rounded numbers
  if (n >= 10) return String(Math.round(n));
  const whole = Math.floor(n + 1e-9);
  const frac = n - whole;
  if (frac < 0.06) return String(whole);
  if (frac > 0.94) return String(whole + 1);
  const fractions: [number, string][] = [
    [0.125, "⅛"],
    [0.25, "¼"],
    [1 / 3, "⅓"],
    [0.5, "½"],
    [2 / 3, "⅔"],
    [0.75, "¾"],
  ];
  const [, glyph] = fractions.reduce((best, cur) =>
    Math.abs(cur[0] - frac) < Math.abs(best[0] - frac) ? cur : best,
  );
  return whole ? `${whole}${glyph}` : glyph;
}
