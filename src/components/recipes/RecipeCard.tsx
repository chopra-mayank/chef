import { delay as revealDelay } from "@/lib/style";
import Image from "next/image";
import Link from "next/link";
import { ClockIcon } from "@phosphor-icons/react/ssr";
import { ArchFrame } from "@/components/ornaments/Arch";
import type { ArchKind, ArchRatio } from "@/lib/arch";
import { DietMark } from "@/components/ui/DietMark";
import type { Recipe } from "@/content/recipes";
import { formatMinutes } from "@/lib/format";
import { cn } from "@/lib/cn";

export function RecipeMeta({ recipe, className }: { recipe: Recipe; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-fg-subtle", className)}>
      <span>{recipe.region}</span>
      <span aria-hidden className="h-3 w-px bg-line-strong" />
      <span>{recipe.course}</span>
      <DietMark diet={recipe.diet} className="ml-auto" />
    </p>
  );
}

export function RecipeCard({
  recipe,
  variant = "default",
  sizes = "(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw",
  className,
  delay = 0,
  arch,
  ratio = "4x5",
  compact = false,
}: {
  recipe: Recipe;
  variant?: "default" | "feature";
  sizes?: string;
  className?: string;
  delay?: number;
  /** override the arch shape (defaults: jharokha for feature, mehrab otherwise) */
  arch?: ArchKind;
  ratio?: ArchRatio;
  /** hide the one-line summary */
  compact?: boolean;
}) {
  const feature = variant === "feature";
  const kind = arch ?? (feature ? "jharokha" : "mehrab");
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      data-reveal
      style={revealDelay(delay)}
      className={cn("group block", className)}
    >
      <ArchFrame
        kind={kind}
        ratio={ratio}
        outline={feature ? 12 : false}
        innerClassName="bg-sand-200"
      >
        <Image
          src={recipe.image}
          alt={recipe.imageAlt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-royal)] group-hover:scale-[1.05]"
        />
      </ArchFrame>

      <div className={cn(feature ? "mt-9" : "mt-6")}>
        <RecipeMeta recipe={recipe} />
        <h3
          className={cn(
            "mt-3 transition-colors duration-300 group-hover:text-accent",
            feature ? "text-d3" : "text-d5",
          )}
        >
          {recipe.title}
        </h3>
        <p lang="hi" className={cn("mt-1 text-fg-subtle", feature ? "text-xl" : "text-base")}>
          {recipe.titleHi}
        </p>
        {!compact && (
          <p className={cn("mt-3 text-fg-muted", feature ? "max-w-[46ch] text-body" : "line-clamp-2 text-small")}>
            {recipe.summary}
          </p>
        )}
        <p className="mt-4 flex items-center gap-2 text-small text-fg-subtle numerals">
          <ClockIcon weight="light" className="size-4" aria-hidden />
          {formatMinutes(recipe.prepMins + recipe.cookMins)}
          <span aria-hidden>·</span>
          Serves {recipe.serves}
        </p>
      </div>
    </Link>
  );
}
