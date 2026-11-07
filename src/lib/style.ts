import type { CSSProperties } from "react";

/** Stagger delay for [data-reveal] elements: style={delay(120)} */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Arbitrary CSS custom properties, typed loosely for inline styles. */
export const vars = (v: Record<`--${string}`, string | number>) => v as CSSProperties;
