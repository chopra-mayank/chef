import type { Metadata } from "next";
import { InstagramLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react/ssr";
import { Jaali } from "@/components/ornaments/Patterns";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/video/VideoCard";
import { VideoLibrary } from "@/components/video/VideoLibrary";
import { site } from "@/content/site";
import { longform, shorts } from "@/content/videos";
import { delay } from "@/lib/style";

export const metadata: Metadata = {
  title: "Videos",
  description: "Cook along with Chef Saurabh Sharma — Rajasthani recipes filmed step by step on YouTube.",
};

export default function VideosPage() {
  const [latest] = longform;
  return (
    <div className="theme-night">
      {/* Hero */}
      <section className="relative overflow-hidden pt-[132px] lg:pt-[150px]">
        <Jaali id="videos-hero-jaali" size={88} className="text-zari-300 opacity-[0.05]" />
        <div className="container-x relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Eyebrow hi="यूट्यूब रसोई" className="animate-rise">
                On YouTube
              </Eyebrow>
              <h1 className="mt-8 text-d1">
                <span className="line-mask">
                  <span className="animate-line-up" style={{ animationDelay: "120ms" }}>
                    The kitchen,
                  </span>
                </span>
                <span className="line-mask">
                  <span className="animate-line-up italic text-accent" style={{ animationDelay: "240ms" }}>
                    on camera
                  </span>
                </span>
              </h1>
              <p className="mt-8 max-w-[52ch] animate-rise text-lede text-fg-muted" style={{ animationDelay: "450ms" }}>
                Long recipes for slow Sundays, short ones for weeknights, and stories from the bazaars and
                village kitchens of Rajasthan. New films every week.
              </p>
            </div>
            <div className="flex animate-rise flex-col gap-8 lg:col-span-4 lg:items-end" style={{ animationDelay: "550ms" }}>
              <dl className="flex gap-10">
                <div className="flex flex-col-reverse">
                  <dt className="eyebrow mt-2 text-fg-subtle">Subscribers</dt>
                  <dd className="font-display text-d3 text-accent numerals">{site.youtube.subscribers}</dd>
                </div>
                <div className="flex flex-col-reverse">
                  <dt className="eyebrow mt-2 text-fg-subtle">Films</dt>
                  <dd className="font-display text-d3 text-accent numerals">{site.youtube.videos}</dd>
                </div>
              </dl>
              <ButtonLink href={site.youtube.url} icon="play">
                Subscribe <span className="hidden sm:inline">{site.youtube.handle}</span>
              </ButtonLink>
            </div>
          </div>

          <div className="mt-16 animate-rise lg:mt-20" style={{ animationDelay: "650ms" }}>
            <p className="eyebrow mb-5 text-fg-subtle">Latest film</p>
            <VideoCard video={latest} variant="feature" sizes="(min-width: 1440px) 1312px, 92vw" preload />
          </div>
        </div>
      </section>

      {/* Library */}
      <section className="section-y">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-d2">
              The <em>library</em>
            </h2>
            <p className="max-w-[40ch] text-fg-muted">Browse by series — each film links to its written recipe.</p>
          </div>
          <VideoLibrary videos={longform} />
        </div>
      </section>

      {/* Shorts */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow hi="झटपट">Shorts</Eyebrow>
              <h2 className="mt-5 text-d2">
                Sixty seconds, <em>one secret</em>
              </h2>
            </div>
            <ButtonLink href={site.youtube.url} variant="text">
              All shorts on YouTube
            </ButtonLink>
          </div>
          <div className="hide-scrollbar -mx-[clamp(1.25rem,4.2vw,4rem)] mt-12 flex snap-x snap-mandatory scroll-px-[clamp(1.25rem,4.2vw,4rem)] gap-5 overflow-x-auto px-[clamp(1.25rem,4.2vw,4rem)] pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
            {shorts.map((v, i) => (
              <div key={v.id} data-reveal style={delay(i * 90)} className="w-[62vw] max-w-[300px] shrink-0 snap-start sm:w-[40vw] lg:w-auto lg:max-w-none">
                <VideoCard video={v} variant="short" sizes="(min-width: 1024px) 22vw, 62vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="theme-sand">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:items-center lg:py-24">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent">Cooked something from a film?</p>
            <p className="mt-5 font-display text-d3">
              Share it with <span className="italic">{site.youtube.handle}</span> — I read every comment.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:col-span-5 lg:justify-end">
            <a
              href={site.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-3 bg-primary px-7 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-on-primary"
            >
              <YoutubeLogoIcon weight="light" className="size-5" /> YouTube
            </a>
            <a
              href={site.socials[1].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-3 border border-line-strong px-7 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-fg transition-colors hover:border-fg"
            >
              <InstagramLogoIcon weight="light" className="size-5" /> Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
