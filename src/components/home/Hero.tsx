import Image from "next/image";
import { Rosette } from "@/components/ornaments/Patterns";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { regionsHi, REGIONS, site } from "@/content/site";

/**
 * One screen tall on desktop: greeting on the left, the chef's portrait on the
 * right (shown exactly as photographed — no frame, crop or effects), and the
 * regions band on the fold.
 */
export function Hero() {
  return (
    <section className="theme-day relative flex flex-col overflow-hidden pt-[104px] lg:min-h-svh lg:pt-[112px]">
      <div className="container-x grid flex-1 grid-cols-12 items-center gap-x-6 gap-y-12 pb-12 lg:pb-14">
        {/* Words */}
        <div className="col-span-12 flex flex-col justify-center lg:col-span-7">
          {/* Khamma ghani — the Rajasthani greeting. The chef's name stays in the heading for screen readers and search. */}
          <h1
            lang="hi"
            className="font-deva-display text-[clamp(4rem,min(12.5vw,26svh),12rem)] font-light leading-[1.1] tracking-normal whitespace-nowrap"
          >
            <span lang="en" className="sr-only">
              {site.fullTitle} —{" "}
            </span>
            <span className="line-mask">
              <span className="animate-line-up" style={{ animationDelay: "120ms" }}>
                खम्मा <span className="text-accent">घणी</span>
              </span>
            </span>
          </h1>

          <div
            className="mt-8 grid max-w-2xl animate-rise gap-6 sm:grid-cols-[auto_1fr] sm:gap-10 lg:mt-10"
            style={{ animationDelay: "450ms" }}
          >
            <p className="flex flex-col">
              <span lang="hi" className="text-[1.65rem] leading-tight text-accent">
                {site.greeting.hi}
              </span>
              <span className="mt-2 text-small italic text-fg-subtle">{site.greeting.meaning}</span>
            </p>
            <p className="max-w-[40ch] text-lede text-fg-muted">{site.tagline}</p>
          </div>

          <div className="mt-8 flex animate-rise flex-wrap gap-3 sm:gap-4 lg:mt-10" style={{ animationDelay: "600ms" }}>
            <ButtonLink href="/recipes">Explore the recipes</ButtonLink>
            <ButtonLink href={site.youtube.url} variant="outline" icon="play">
              Watch on YouTube
            </ButtonLink>
          </div>
        </div>

        {/* Portrait — the photograph as it is */}
        <div className="col-span-12 flex justify-center lg:col-span-5 lg:justify-end">
          <Image
            src="/images/chef-saurabh-portrait.jpg"
            alt="Chef Saurabh Sharma in his whites and toque, smiling in the kitchen"
            width={1706}
            height={2560}
            loading="eager"
            fetchPriority="high"
            quality={90}
            sizes="(min-width: 1024px) 34vw, 92vw"
            className="h-auto w-full max-w-[520px] lg:h-[clamp(480px,calc(100svh-150px),880px)] lg:w-auto lg:max-w-full"
          />
        </div>
      </div>

      {/* The eight regions, scrolling slowly */}
      <div className="border-y border-line py-5 text-fg-muted">
        <Marquee
          speed={70}
          items={REGIONS.map((r) => (
            <span key={r} className="flex items-baseline gap-3">
              <span className="eyebrow text-fg">{r}</span>
              <span lang="hi" className="text-[0.95rem]">
                {regionsHi[r]}
              </span>
            </span>
          ))}
          separator={<Rosette className="size-3 text-accent-soft" />}
        />
      </div>
    </section>
  );
}
