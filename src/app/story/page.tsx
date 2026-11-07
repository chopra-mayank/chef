import type { Metadata } from "next";
import Image from "next/image";
import { ArchFrame } from "@/components/ornaments/Arch";
import { Chhatri, Jaali, Rosette } from "@/components/ornaments/Patterns";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { chapters, pillars, timeline } from "@/content/story";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/style";

export const metadata: Metadata = {
  title: "Story",
  description:
    "From a grandmother’s chulha in Jaipur to RajRasa — the story and cooking philosophy of Chef Saurabh Sharma.",
};

export default function StoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="theme-night relative isolate flex min-h-[92svh] items-end overflow-hidden">
        <Image
          src="/images/dunes-dusk.jpg"
          alt="Sand dunes of the Thar desert at dusk"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="-z-10 animate-settle object-cover object-[50%_60%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night-950 via-night-950/55 to-night-950/30" />
        <div className="container-x pb-20 pt-40 lg:pb-28">
          <Eyebrow hi="कहानी" className="animate-rise">
            The story
          </Eyebrow>
          <h1 className="mt-8 text-hero font-light">
            <span className="line-mask">
              <span className="animate-line-up" style={{ animationDelay: "150ms" }}>
                A life in
              </span>
            </span>
            <span className="line-mask">
              <span className="animate-line-up pl-[0.4em] italic text-accent" style={{ animationDelay: "280ms" }}>
                the rasoi
              </span>
            </span>
          </h1>
          <p className="mt-10 max-w-[46ch] animate-rise text-lede text-fg-muted" style={{ animationDelay: "550ms" }}>
            From a grandmother’s chulha in Jaipur to a dining room that holds all of Rajasthan — the people,
            places and recipes that made me a cook.
          </p>
        </div>
      </section>

      {/* Opening statement */}
      <section className="theme-day section-y">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <div data-reveal="mask" className="mx-auto max-w-[420px] lg:mx-0">
              <ArchFrame kind="jharokha" ratio="3x4" outline={14}>
                <Image
                  src="/images/plating-bw-1.jpg"
                  alt="Black-and-white portrait of the chef’s hands plating"
                  fill
                  sizes="(min-width: 1024px) 32vw, 90vw"
                  className="object-cover grayscale"
                />
              </ArchFrame>
            </div>
          </div>
          <div className="col-span-12 flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <Eyebrow>In his own words</Eyebrow>
            <p data-reveal className="mt-8 font-display text-d3 font-light leading-[1.18]">
              “I am not inventing anything. I am a messenger — carrying recipes from the people who cooked them
              to the people who will cook them next.”
            </p>
            <p data-reveal style={delay(120)} className="mt-8 max-w-[52ch] text-fg-muted">
              Saurabh Sharma is a chef, restaurateur and teacher from Jaipur. For more than two decades he has
              cooked, collected and filmed the food of Rajasthan — from royal kitchens to shepherds’ camps — and
              brought it to a single table at RajRasa.
            </p>
          </div>
        </div>
      </section>

      {/* Chapters, joined by a saffron thread */}
      <section className="theme-day pb-24 lg:pb-36">
        <div className="container-x relative">
          <div
            aria-hidden
            className="absolute bottom-0 left-[calc(clamp(1.25rem,4.2vw,4rem)+1.75rem)] top-0 hidden w-px bg-gradient-to-b from-transparent via-zari-500/60 to-transparent md:block lg:left-1/2"
          />
          <ol className="space-y-28 lg:space-y-40">
            {chapters.map((c, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={c.numeral} className="relative grid grid-cols-12 items-center gap-x-6 gap-y-10">
                  <span
                    aria-hidden
                    className="absolute left-[1.75rem] top-0 hidden size-3 -translate-x-1/2 rotate-45 border border-zari-500 bg-sand-50 md:block lg:left-1/2"
                  />
                  <div
                    className={cn(
                      "col-span-12 md:col-span-10 md:col-start-3 lg:col-span-5",
                      flip ? "lg:order-2 lg:col-start-8" : "lg:col-start-1",
                    )}
                  >
                    <div data-reveal="mask" className={cn("max-w-[460px]", flip ? "lg:ml-auto" : "")}>
                      <ArchFrame kind={i % 2 ? "pointed" : "mehrab"} ratio="4x5" innerClassName="bg-sand-200">
                        <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 1024px) 34vw, 80vw" className="object-cover" />
                      </ArchFrame>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "col-span-12 md:col-span-10 md:col-start-3 lg:col-span-5",
                      flip ? "lg:order-1 lg:col-start-1 lg:text-right" : "lg:col-start-8",
                    )}
                  >
                    <p data-reveal className={cn("flex items-baseline gap-5", flip && "lg:justify-end")}>
                      <span className="font-display text-d1 font-light italic leading-none text-accent">{c.numeral}</span>
                      <span className="eyebrow text-fg-subtle">{c.years}</span>
                    </p>
                    <h2 data-reveal style={delay(80)} className="mt-6 text-d3">
                      {c.title}
                    </h2>
                    <p data-reveal style={delay(120)} lang="hi" className="mt-2 text-xl text-fg-subtle">
                      {c.titleHi}
                    </p>
                    <div className={cn("mt-6 space-y-5 text-fg-muted", flip && "lg:ml-auto")}>
                      {c.text.map((t, j) => (
                        <p key={j} data-reveal style={delay(160 + j * 80)} className="max-w-[48ch] lg:inline-block">
                          {t}
                        </p>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Pillars */}
      <section className="theme-night section-y relative overflow-hidden">
        <Jaali id="story-pillars-jaali" size={84} className="text-zari-300 opacity-[0.05]" />
        <div className="container-x relative">
          <SectionHeading
            align="center"
            eyebrow="What I cook by"
            hi="सिद्धांत"
            title={
              <>
                Three <em>rules</em> of the rasoi
              </>
            }
          />
          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                data-reveal
                style={delay(i * 120)}
                className="relative flex flex-col items-center border border-line px-8 pb-12 pt-14 text-center"
              >
                <span className="absolute -top-px left-1/2 h-px w-16 -translate-x-1/2 bg-accent" />
                <Rosette className="size-5 text-accent" />
                <h3 className="mt-8 text-d4">{p.title}</h3>
                <p lang="hi" className="mt-2 text-lg text-accent">
                  {p.hi}
                </p>
                <p className="mt-6 max-w-[34ch] text-fg-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="theme-sand section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Milestones" hi="पड़ाव" title={<>Twenty-five years, <em>briefly</em></>} />
          <ol className="relative mt-16 grid gap-10 md:grid-cols-4 lg:mt-20 lg:grid-cols-7 lg:gap-6">
            <span aria-hidden className="absolute left-0 right-0 top-[0.4rem] hidden h-px bg-line-strong lg:block" />
            {timeline.map((t, i) => (
              <li key={t.year} data-reveal style={delay(i * 80)} className="relative lg:pt-10">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 hidden size-3.5 rotate-45 border border-zari-600 bg-sand-100 lg:block"
                />
                <p className="font-display text-d4 text-accent numerals">{t.year}</p>
                <p className="mt-3 text-small text-fg-muted">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Close */}
      <section className="theme-day section-y">
        <div className="container-x flex flex-col items-center text-center">
          <Chhatri className="h-28 w-auto text-accent-soft" />
          <p data-reveal className="mt-10 max-w-[22ch] font-display text-d2">
            The rest of the story is <em>on the plate</em>.
          </p>
          <div data-reveal style={delay(120)} className="mt-12 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/recipes">Cook the recipes</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Work with me
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
