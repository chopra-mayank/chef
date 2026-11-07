"use client";

import { useState } from "react";
import { CheckIcon, MinusIcon, PlusIcon } from "@phosphor-icons/react";
import type { IngredientGroup } from "@/content/recipes";
import { formatQty } from "@/lib/format";
import { cn } from "@/lib/cn";

/** Ingredient list that scales with servings and lets the cook tick things off. */
export function Ingredients({ groups, serves }: { groups: IngredientGroup[]; serves: number }) {
  const [count, setCount] = useState(serves);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const factor = count / serves;

  const toggle = (key: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <div>
      <div className="flex items-center justify-between gap-6 border-b border-line-strong pb-5">
        <h3 className="font-display text-d4">Ingredients</h3>
        <div className="flex items-center gap-1" role="group" aria-label="Servings">
          <button
            type="button"
            onClick={() => setCount((c) => Math.max(1, c - 1))}
            disabled={count <= 1}
            aria-label="Fewer servings"
            className="grid size-10 place-items-center border border-line-strong transition-colors hover:border-fg disabled:opacity-40"
          >
            <MinusIcon className="size-4" />
          </button>
          <output aria-live="polite" className="min-w-[5.5rem] text-center text-small numerals">
            Serves <span className="font-medium text-fg">{count}</span>
          </output>
          <button
            type="button"
            onClick={() => setCount((c) => Math.min(24, c + 1))}
            aria-label="More servings"
            className="grid size-10 place-items-center border border-line-strong transition-colors hover:border-fg"
          >
            <PlusIcon className="size-4" />
          </button>
        </div>
      </div>

      {groups.map((group, gi) => (
        <div key={gi} className="mt-8">
          {group.title && <p className="eyebrow mb-3 text-accent">{group.title}</p>}
          <ul>
            {group.items.map((item, ii) => {
              const key = `${gi}-${ii}`;
              const done = checked.has(key);
              return (
                <li key={key} className="border-b border-line">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={done}
                    onClick={() => toggle(key)}
                    className="group flex w-full items-start gap-4 py-3.5 text-left"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1 grid size-[18px] shrink-0 place-items-center border transition-colors",
                        done ? "border-accent bg-accent text-surface" : "border-line-strong group-hover:border-fg",
                      )}
                    >
                      {done && <CheckIcon weight="bold" className="size-3" />}
                    </span>
                    <span className={cn("transition-opacity", done && "opacity-45 line-through decoration-1")}>
                      {item.qty !== undefined && (
                        <span className="font-medium text-fg numerals">
                          {formatQty(item.qty * factor)}
                          {item.unit ? ` ${item.unit}` : ""}{" "}
                        </span>
                      )}
                      <span>{item.name}</span>
                      {item.note && <span className="text-fg-subtle">, {item.note}</span>}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      {count !== serves && (
        <p className="mt-5 text-small italic text-fg-subtle">
          Quantities scaled from the original {serves} servings. Cooking times stay roughly the same.
        </p>
      )}
    </div>
  );
}
