import { cn } from "@/lib/cn";
import type { Diet } from "@/content/recipes";

/** The FSSAI symbols every Indian reader recognises: green dot = veg, brown triangle = non-veg. */
export function DietMark({ diet, className, withLabel = false }: { diet: Diet; className?: string; withLabel?: boolean }) {
  const veg = diet === "veg";
  const label = veg ? "Vegetarian" : "Non-vegetarian";
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        role="img"
        aria-label={label}
        title={label}
        className={cn(
          "inline-grid size-[13px] shrink-0 place-items-center border-[1.5px] bg-sand-50",
          veg ? "border-veg" : "border-nonveg",
        )}
      >
        {veg ? (
          <span className="size-[5px] rounded-full bg-veg" />
        ) : (
          <svg viewBox="0 0 10 10" className="size-[7px]" aria-hidden>
            <path d="M5 1 9.2 8.6H.8Z" className="fill-nonveg" />
          </svg>
        )}
      </span>
      {withLabel && <span>{veg ? "Veg" : "Non-veg"}</span>}
    </span>
  );
}
