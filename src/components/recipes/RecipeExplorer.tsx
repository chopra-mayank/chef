"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRightIcon, CaretDownIcon, MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { ArchFrame } from "@/components/ornaments/Arch";
import { DietMark } from "@/components/ui/DietMark";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { COURSES, type Course, type Diet, type Recipe } from "@/content/recipes";
import { REGIONS, regionsHi, type Region } from "@/content/site";
import { formatMinutes } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useQueryParams } from "@/lib/useQueryParams";

type Sort = "newest" | "quickest";

export function RecipeExplorer({ recipes }: { recipes: Recipe[] }) {
  // Region, course and diet live in the URL so filtered views can be shared
  // (the home page links to /recipes?region=Marwar).
  const [params, setParam] = useQueryParams();
  const r = params.get("region");
  const c = params.get("course");
  const d = params.get("diet");
  const region: Region | "All" = r && (REGIONS as readonly string[]).includes(r) ? (r as Region) : "All";
  const course: Course | "All" = c && (COURSES as string[]).includes(c) ? (c as Course) : "All";
  const diet: Diet | "all" = d === "veg" || d === "nonveg" ? d : "all";
  const setRegion = (v: Region | "All") => setParam("region", v === "All" ? null : v);
  const setCourse = (v: Course | "All") => setParam("course", v === "All" ? null : v);
  const setDiet = (v: Diet | "all") => setParam("diet", v === "all" ? null : v);

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = recipes.filter(
      (r) =>
        (course === "All" || r.course === course) &&
        (region === "All" || r.region === region) &&
        (diet === "all" || r.diet === diet) &&
        (!q || [r.title, r.titleHi, r.summary, r.region].join(" ").toLowerCase().includes(q)),
    );
    return list.sort((a, b) =>
      sort === "quickest"
        ? a.prepMins + a.cookMins - (b.prepMins + b.cookMins)
        : b.published.localeCompare(a.published),
    );
  }, [recipes, course, region, diet, query, sort]);

  // Only offer courses that actually have recipes
  const courses = COURSES.filter((c) => recipes.some((r) => r.course === c));
  const isFiltered = course !== "All" || region !== "All" || diet !== "all" || query.trim() !== "";
  const featured = recipes.find((r) => r.featured);
  const reset = () => {
    setCourse("All");
    setRegion("All");
    setDiet("all");
    setQuery("");
  };

  return (
    <div>
      {/* Filter bar */}
      <div className="border-y border-line">
        <div className="container-x flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Course" className="hide-scrollbar -mx-1 flex gap-1 overflow-x-auto">
            {(["All", ...courses] as const).map((c) => (
              <button
                key={c}
                aria-pressed={course === c}
                onClick={() => setCourse(c)}
                className={cn(
                  "relative shrink-0 px-3 py-2 text-[0.75rem] font-medium uppercase tracking-[0.2em] transition-colors",
                  course === c ? "text-fg" : "text-fg-subtle hover:text-fg",
                )}
              >
                {c === "All" ? "All recipes" : c}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-px origin-left bg-current transition-transform duration-500 ease-[var(--ease-royal)]",
                    course === c ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <label className="relative flex items-center">
              <span className="sr-only">Region</span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as Region | "All")}
                className="h-11 cursor-pointer appearance-none border-b border-line-strong bg-transparent pr-8 text-small text-fg focus:border-fg focus:outline-none"
              >
                <option value="All">All regions</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r} — {regionsHi[r]}
                  </option>
                ))}
              </select>
              <CaretDownIcon aria-hidden className="pointer-events-none absolute right-1 size-4 text-fg-subtle" />
            </label>

            <div role="group" aria-label="Diet" className="flex items-center gap-1">
              {(
                [
                  ["all", "All"],
                  ["veg", "Veg"],
                  ["nonveg", "Non-veg"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  aria-pressed={diet === value}
                  onClick={() => setDiet(value)}
                  className={cn(
                    "flex h-11 items-center gap-2 px-3 text-small transition-colors",
                    diet === value ? "text-fg" : "text-fg-subtle hover:text-fg",
                  )}
                >
                  {value !== "all" && <DietMark diet={value} />}
                  <span className={cn(diet === value && "underline decoration-1 underline-offset-[6px]")}>{label}</span>
                </button>
              ))}
            </div>

            <label className="relative flex min-w-[220px] flex-1 items-center lg:flex-none">
              <span className="sr-only">Search recipes</span>
              <MagnifyingGlassIcon aria-hidden weight="light" className="pointer-events-none absolute left-0 size-5 text-fg-subtle" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search — try ‘ghee’"
                className="h-11 w-full border-b border-line-strong bg-transparent pl-8 text-small text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="container-x pb-28 pt-12 lg:pb-36">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-small text-fg-muted" aria-live="polite">
            {filtered.length === recipes.length
              ? `${recipes.length} recipes from ${new Set(recipes.map((r) => r.region)).size} regions`
              : `Showing ${filtered.length} of ${recipes.length} recipes`}
            {isFiltered && (
              <button onClick={reset} className="ml-4 inline-flex items-center gap-1 text-fg underline-offset-4 hover:underline">
                <XIcon className="size-3.5" aria-hidden /> Clear filters
              </button>
            )}
          </p>
          <label className="flex items-center gap-2 text-small text-fg-subtle">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="cursor-pointer bg-transparent text-fg focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="quickest">Quickest</option>
            </select>
          </label>
        </div>

        {/* Featured recipe — only when browsing everything */}
        {!isFiltered && featured && <FeaturedRecipe recipe={featured} />}

        {filtered.length > 0 ? (
          <div className="mt-16 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
            {filtered
              .filter((r) => isFiltered || r !== featured)
              .map((r, i) => (
                <RecipeCard key={r.slug} recipe={r} delay={(i % 3) * 100} />
              ))}
          </div>
        ) : (
          <div className="mt-20 flex flex-col items-center text-center">
            <p className="font-display text-d4">Nothing on this table yet.</p>
            <p className="mt-3 max-w-md text-fg-muted">
              No recipes match those filters. Try another region, or clear the filters to see everything.
            </p>
            <button
              onClick={reset}
              className="mt-8 inline-flex h-12 items-center gap-3 bg-primary px-7 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-on-primary"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedRecipe({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group mt-10 grid overflow-hidden bg-surface-2 md:grid-cols-2"
    >
      <div className="relative min-h-[320px] overflow-hidden md:min-h-[460px]">
        <Image
          src={recipe.image}
          alt={recipe.imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-royal)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:p-16">
        <div aria-hidden className="absolute right-8 top-8 w-14 opacity-70">
          <ArchFrame kind="jharokha" ratio="3x4" outline={0} outlineClassName="text-accent-soft">
            <span />
          </ArchFrame>
        </div>
        <p className="eyebrow text-accent">Recipe of the month</p>
        <h2 className="mt-5 text-d2 transition-colors group-hover:text-accent">{recipe.title}</h2>
        <p lang="hi" className="mt-2 text-2xl text-fg-subtle">
          {recipe.titleHi}
        </p>
        <p className="mt-6 max-w-[42ch] text-fg-muted">{recipe.summary}</p>
        <p className="eyebrow mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-fg-subtle">
          <span>{recipe.region}</span>
          <span>{formatMinutes(recipe.prepMins + recipe.cookMins)}</span>
          <span>Serves {recipe.serves}</span>
          <DietMark diet={recipe.diet} />
        </p>
        <span className="mt-10 inline-flex items-center gap-3 text-[0.75rem] font-medium uppercase tracking-[0.2em]">
          Read the recipe
          <ArrowRightIcon weight="light" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
