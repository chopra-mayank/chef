"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { ArchFrame } from "@/components/ornaments/Arch";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { regionGuide } from "@/content/regions";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/style";

/**
 * "Every dish has an address": the regions of Rajasthan as an index.
 * On desktop a photograph of the region follows the pointer.
 */
export function RegionsAtlas() {
  const [active, setActive] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  const tick = () => {
    const p = pos.current;
    const t = target.current;
    p.x += (t.x - p.x) * 0.16;
    p.y += (t.y - p.y) * 0.16;
    if (floatRef.current) floatRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onEnter = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = wrapRef.current!.getBoundingClientRect();
    target.current = pos.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
  };
  const onMove = (e: PointerEvent) => {
    const r = wrapRef.current!.getBoundingClientRect();
    target.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const onLeave = () => {
    setActive(null);
    cancelAnimationFrame(raf.current);
  };

  return (
    <section className="theme-day section-y">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-7"
            eyebrow="Every dish has an address"
            hi="हर व्यंजन का पता"
            title={
              <>
                One state, <em>many kitchens</em>
              </>
            }
          />
          <p data-reveal className="self-end text-lede text-fg-muted lg:col-span-5">
            Rajasthan is not one cuisine. Each region cooks with its own soil, water and weather — so every
            recipe here carries the name of the place it comes from.
          </p>
        </div>

        <div
          ref={wrapRef}
          onPointerEnter={onEnter}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="relative mt-16 lg:mt-24"
        >
          <ol className="border-b border-line">
            {regionGuide.map((r, i) => (
              <li key={r.name} data-reveal style={delay(i * 70)}>
                <Link
                  href={`/recipes?region=${r.name}`}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 border-t border-line py-6 lg:grid-cols-12 lg:gap-x-6 lg:py-8"
                >
                  <span className="eyebrow numerals text-fg-subtle lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex flex-wrap items-baseline gap-x-4 lg:col-span-4">
                    <span className="font-display text-d3 transition-[color,transform] duration-500 ease-[var(--ease-royal)] group-hover:translate-x-2 group-hover:text-accent group-focus-visible:text-accent">
                      {r.name}
                    </span>
                    <span lang="hi" className="text-lg text-fg-subtle">
                      {r.hi}
                    </span>
                  </span>
                  {/* small image on touch screens */}
                  <span className="relative block w-14 lg:hidden">
                    <ArchFrame kind="mehrab" ratio="3x4">
                      <Image src={r.image} alt="" fill sizes="56px" className="object-cover" />
                    </ArchFrame>
                  </span>
                  <span className="col-span-3 mt-3 font-display text-d5 italic text-fg-muted lg:col-span-4 lg:mt-0">
                    {r.dishes.join(" · ")}
                  </span>
                  <span className="col-span-3 mt-1 flex items-center justify-between gap-4 text-small text-fg-subtle lg:col-span-3 lg:mt-0">
                    {r.districts}
                    <ArrowRightIcon
                      weight="light"
                      aria-hidden
                      className="hidden size-5 shrink-0 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 lg:block"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          {/* Floating photograph */}
          <div ref={floatRef} aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block">
            <div
              className={cn(
                "w-[250px] -translate-x-1/2 -translate-y-[60%] transition-[opacity,scale,rotate] duration-500 ease-[var(--ease-royal)]",
                active === null ? "scale-90 -rotate-3 opacity-0" : "scale-100 rotate-0 opacity-100",
              )}
            >
              <ArchFrame kind="jharokha" ratio="3x4" innerClassName="bg-sand-200 shadow-2xl">
                {regionGuide.map((r, i) => (
                  <Image
                    key={r.name}
                    src={r.image}
                    alt=""
                    fill
                    sizes="250px"
                    className={cn(
                      "object-cover transition-opacity duration-500",
                      active === i ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
              </ArchFrame>
              <p className="mt-3 bg-sand-50/90 px-3 py-2 text-[0.8125rem] italic leading-snug text-ink-700 backdrop-blur">
                {active !== null ? regionGuide[active].note : " "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
