import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { ArchFrame } from "@/components/ornaments/Arch";
import { Jaali, OrnamentDivider, Rosette } from "@/components/ornaments/Patterns";
import { Ingredients } from "@/components/recipes/Ingredients";
import { RecipeActions } from "@/components/recipes/RecipeActions";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { DietMark } from "@/components/ui/DietMark";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/video/VideoCard";
import { getRecipe, recipes, relatedRecipes } from "@/content/recipes";
import { regionsHi, site } from "@/content/site";
import { videos } from "@/content/videos";
import { formatMinutes, isoDuration } from "@/lib/format";
import { delay } from "@/lib/style";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(props: PageProps<"/recipes/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const recipe = getRecipe(slug);
  if (!recipe) return {};
  return {
    title: `${recipe.title} (${recipe.titleHi})`,
    description: recipe.summary,
    openGraph: { images: [{ url: recipe.image }] },
  };
}

export default function RecipePage(props: PageProps<"/recipes/[slug]">) {
  return (
    <Suspense fallback={<RecipeSkeleton />}>
      <RecipeContent params={props.params} />
    </Suspense>
  );
}

/** Shown for a split second while a recipe streams in during client navigation. */
function RecipeSkeleton() {
  return (
    <div className="theme-day pt-[140px]" aria-busy="true" aria-label="Loading recipe">
      <div className="container-x grid grid-cols-12 gap-6 pb-28">
        <div className="col-span-12 space-y-6 lg:col-span-6 lg:pt-16">
          <div className="h-3 w-40 bg-sand-200" />
          <div className="h-24 w-4/5 bg-sand-200" />
          <div className="h-6 w-1/3 bg-sand-200" />
          <div className="h-20 w-full bg-sand-100" />
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <ArchFrame kind="jharokha" ratio="4x5" innerClassName="bg-sand-200">
            <span />
          </ArchFrame>
        </div>
      </div>
    </div>
  );
}

async function RecipeContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  const video = videos.find((v) => v.recipeSlug === recipe.slug && !v.vertical);
  const related = relatedRecipes(recipe, 3);
  const total = recipe.prepMins + recipe.cookMins;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    alternateName: recipe.titleHi,
    description: recipe.summary,
    image: [`${site.url}${recipe.image}`],
    author: { "@type": "Person", name: site.fullTitle },
    datePublished: recipe.published,
    prepTime: isoDuration(recipe.prepMins),
    cookTime: isoDuration(recipe.cookMins),
    totalTime: isoDuration(total),
    recipeYield: `${recipe.serves} servings`,
    recipeCategory: recipe.course,
    recipeCuisine: `Rajasthani (${recipe.region})`,
    suitableForDiet: recipe.diet === "veg" ? "https://schema.org/VegetarianDiet" : undefined,
    recipeIngredient: recipe.ingredients.flatMap((g) =>
      g.items.map((i) => [i.qty, i.unit, i.name].filter(Boolean).join(" ")),
    ),
    recipeInstructions: recipe.steps.map((s) => ({ "@type": "HowToStep", name: s.title, text: s.text })),
  };

  const meta = [
    { label: "Prep", value: formatMinutes(recipe.prepMins) },
    { label: "Cook", value: formatMinutes(recipe.cookMins) },
    { label: "Serves", value: String(recipe.serves) },
    { label: "Level", value: recipe.difficulty },
  ];

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* ── Hero ── */}
      <section className="theme-day relative overflow-hidden pt-[120px] lg:pt-[140px]">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-14 pb-20 lg:pb-28">
          <div className="col-span-12 flex flex-col lg:col-span-6 lg:pt-6">
            <nav aria-label="Breadcrumb" className="animate-rise text-small text-fg-subtle">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/recipes" className="link-draw">
                    Recipes
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href={`/recipes?region=${recipe.region}`} className="link-draw">
                    {recipe.region}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-fg-muted">
                  {recipe.title}
                </li>
              </ol>
            </nav>

            <p className="eyebrow mt-10 flex animate-rise items-center gap-3 text-accent" style={{ animationDelay: "80ms" }}>
              <Rosette className="size-3" />
              {recipe.region} <span lang="hi">{regionsHi[recipe.region]}</span>
              <span aria-hidden className="h-3 w-px bg-line-strong" />
              {recipe.course}
              <DietMark diet={recipe.diet} withLabel className="ml-2 text-fg-subtle" />
            </p>

            <h1 className="mt-6 text-d1">
              <span className="line-mask">
                <span className="animate-line-up" style={{ animationDelay: "150ms" }}>
                  {recipe.title}
                </span>
              </span>
            </h1>
            <p lang="hi" className="mt-3 animate-rise text-[2rem] leading-tight text-accent" style={{ animationDelay: "300ms" }}>
              {recipe.titleHi}
            </p>
            <p className="mt-8 max-w-[46ch] animate-rise text-lede text-fg-muted" style={{ animationDelay: "400ms" }}>
              {recipe.summary}
            </p>

            <dl
              className="mt-10 grid animate-rise grid-cols-2 border-y border-line sm:grid-cols-4"
              style={{ animationDelay: "500ms" }}
            >
              {meta.map((m, i) => (
                <div
                  key={m.label}
                  className={`flex flex-col-reverse gap-1 py-5 ${i > 0 ? "sm:border-l sm:border-line sm:pl-5" : ""} ${i % 2 === 1 ? "border-l border-line pl-5" : ""}`}
                >
                  <dt className="eyebrow text-fg-subtle">{m.label}</dt>
                  <dd className="font-display text-d5 numerals">{m.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex animate-rise flex-wrap items-center gap-x-8 gap-y-3" style={{ animationDelay: "600ms" }}>
              <a
                href="#recipe"
                className="inline-flex h-12 items-center gap-3 bg-primary px-7 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-on-primary"
              >
                Jump to recipe <ArrowDownIcon weight="light" className="size-4" />
              </a>
              <RecipeActions title={recipe.title} />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="relative mx-auto max-w-[520px]">
              <div
                aria-hidden
                className="absolute -inset-12 text-zari-500 opacity-25 [mask-image:radial-gradient(closest-side,black_35%,transparent)]"
              >
                <Jaali id="recipe-hero-jaali" size={44} />
              </div>
              <div className="relative animate-curtain" style={{ animationDelay: "200ms" }}>
                <ArchFrame kind="jharokha" ratio="4x5" outline={14}>
                  <Image
                    src={recipe.image}
                    alt={recipe.imageAlt}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    className="animate-settle object-cover"
                  />
                </ArchFrame>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Story & chef's note ── */}
      <section className="theme-day pb-24 lg:pb-32">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow hi="कहानी">The story of this dish</Eyebrow>
            <div className="mt-8 space-y-6 text-lede text-fg-muted">
              {recipe.intro.map((p, i) => (
                <p key={i} data-reveal style={delay(i * 100)} className={i === 0 ? "drop-cap text-fg" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          {recipe.chefNote && (
            <aside className="col-span-12 lg:col-span-4 lg:col-start-9" data-reveal>
              <div className="frame-miniature">
                <div className="bg-sand-100 p-7 lg:p-9">
                  <p className="eyebrow flex items-center gap-3 text-laal-600">
                    <Rosette className="size-3" /> Chef’s note
                  </p>
                  <p className="mt-5 font-display text-[1.375rem] leading-snug text-ink-900">{recipe.chefNote}</p>
                  <p className="mt-6 text-small italic text-ink-500">— Saurabh</p>
                </div>
              </div>
            </aside>
          )}
        </div>
      </section>

      {/* ── Video ── */}
      {video && (
        <section id="video" className="theme-night relative overflow-hidden py-20 lg:py-28" data-print="hide">
          <Jaali id="recipe-video-jaali" size={80} className="text-zari-300 opacity-[0.05]" />
          <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <Eyebrow hi="देखिए">Watch the method</Eyebrow>
              <h2 className="mt-6 text-d3">Cook it with me, step by step.</h2>
              <p className="mt-6 text-fg-muted">
                {video.duration} · {video.views} views on YouTube
              </p>
            </div>
            <div className="lg:col-span-8">
              <VideoCard video={video} variant="feature" sizes="(min-width: 1024px) 60vw, 92vw" />
            </div>
          </div>
        </section>
      )}

      {/* ── The recipe ── */}
      <section id="recipe" className="theme-sand scroll-mt-24 py-24 lg:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow hi="विधि">The recipe</Eyebrow>
              <h2 className="mt-5 text-d2">
                {recipe.title} <span className="italic text-fg-subtle">for {recipe.serves}</span>
              </h2>
            </div>
            <p className="text-small text-fg-muted numerals">
              Total time <span className="font-medium text-fg">{formatMinutes(total)}</span>
            </p>
          </div>

          <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-16">
            <div className="col-span-12 lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Ingredients groups={recipe.ingredients} serves={recipe.serves} />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <div className="flex items-center justify-between border-b border-line-strong pb-5">
                <h3 className="font-display text-d4">Method</h3>
                <p className="text-small text-fg-subtle">{recipe.steps.length} steps</p>
              </div>
              <ol>
                {recipe.steps.map((step, i) => (
                  <li
                    key={step.title}
                    data-reveal
                    style={delay(Math.min(i, 3) * 60)}
                    className="grid grid-cols-[3.25rem_1fr] gap-x-5 border-b border-line py-9 sm:grid-cols-[4.5rem_1fr] sm:gap-x-8"
                  >
                    <span className="font-display text-d3 leading-none text-accent numerals">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="font-display text-d5">{step.title}</h4>
                      <p className="mt-3 text-fg-muted">{step.text}</p>
                      {step.tip && (
                        <p className="mt-6 border-l-2 border-kesar-500 bg-surface py-3 pl-5 pr-4 text-small text-fg-muted">
                          <span className="eyebrow mb-1 block text-kesar-700">Rasoi secret</span>
                          {step.tip}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              {recipe.serveWith && (
                <div className="mt-12">
                  <p className="eyebrow text-fg-subtle">Serve with</p>
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {recipe.serveWith.map((s) => (
                      <li key={s.label}>
                        {s.slug ? (
                          <Link
                            href={`/recipes/${s.slug}`}
                            className="inline-flex h-10 items-center gap-2 border border-line-strong px-4 text-small transition-colors hover:border-fg"
                          >
                            {s.label} <ArrowRightIcon weight="light" className="size-3.5" />
                          </Link>
                        ) : (
                          <span className="inline-flex h-10 items-center border border-line px-4 text-small text-fg-muted">
                            {s.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <OrnamentDivider className="mt-16" />
              <p className="mt-6 text-center font-display text-d5 italic text-fg-muted">
                Khamma ghani — <span lang="hi">खम्मा घणी</span>. Cook it, and tell me how it went.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related ── */}
      <section className="theme-day section-y" data-print="hide">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow hi="और भी">You might also cook</Eyebrow>
              <h2 className="mt-5 text-d2">
                More from <em>{recipe.region}</em> and beyond
              </h2>
            </div>
            <Link href="/recipes" className="link-draw mb-2 text-[0.75rem] font-medium uppercase tracking-[0.2em]">
              All recipes
            </Link>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
            {related.map((r, i) => (
              <RecipeCard key={r.slug} recipe={r} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
