import type { Metadata } from "next";
import Image from "next/image";
import { Jaali, Rosette } from "@/components/ornaments/Patterns";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { awards, roles, stats } from "@/content/awards";
import { delay, vars } from "@/lib/style";

export const metadata: Metadata = {
  title: "Accolades",
  description: "Awards, honours and recognition for Chef Saurabh Sharma and RajRasa, Jaipur.",
};

export default function AccoladesPage() {
  const featured = awards.filter((a) => a.featured);
  const years = [...new Set(awards.map((a) => a.year))].sort((a, b) => b - a);

  return (
    <>
      <section className="theme-night relative overflow-hidden pt-[132px] lg:pt-[150px]">
        <Jaali id="accolades-hero-jaali" size={76} className="text-zari-300 opacity-[0.06]" />
        <div className="container-x relative pb-20 lg:pb-28">
          <Eyebrow hi="सम्मान" className="animate-rise">
            Honours &amp; accolades
          </Eyebrow>
          <h1 className="mt-8 text-d1">
            <span className="line-mask">
              <span className="animate-line-up" style={{ animationDelay: "120ms" }}>
                Honours, held
              </span>
            </span>
            <span className="line-mask">
              <span className="animate-line-up italic text-accent" style={{ animationDelay: "240ms" }}>
                with both hands
              </span>
            </span>
          </h1>
          <p className="mt-8 max-w-[54ch] animate-rise text-lede text-fg-muted" style={{ animationDelay: "450ms" }}>
            Every award on this page belongs as much to the cooks of RajRasa, the farmers who grow our millets and
            the grandmothers whose recipes we carry.
          </p>

          <dl className="mt-16 grid animate-rise grid-cols-2 border-t border-line lg:mt-20 lg:grid-cols-4" style={{ animationDelay: "550ms" }}>
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col-reverse justify-end border-b border-line py-8 pr-6 lg:border-b-0 lg:border-r lg:py-10 lg:pl-8 lg:first:pl-0 lg:last:border-r-0"
              >
                <dt className="mt-4 max-w-[18ch] text-small text-fg-muted">{s.label}</dt>
                <dd className="font-display text-d1 font-light leading-none text-accent numerals">
                  {s.value}
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Featured honours, framed like miniature paintings */}
      <section className="theme-day section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Highlights" hi="विशेष" title={<>The ones that <em>mattered</em></>} />
          <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-3 lg:mt-20">
            {featured.map((a, i) => (
              <article key={a.title} data-reveal style={delay(i * 120)}>
                <div className="frame-miniature" style={vars({ "--band": i === 1 ? "var(--color-night-800)" : "var(--color-laal-600)" })}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand-200">
                    {a.image && <Image src={a.image} alt="" fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" />}
                  </div>
                </div>
                <p className="eyebrow mt-8 flex items-center gap-3 text-accent">
                  <Rosette className="size-3" /> {a.year}
                </p>
                <h3 className="mt-4 text-d4">{a.title}</h3>
                <p className="mt-2 text-small text-fg-subtle">
                  {a.body}
                  {a.place ? ` · ${a.place}` : ""}
                </p>
                {a.citation && <p className="mt-5 font-display text-[1.1875rem] italic leading-snug text-fg-muted">“{a.citation}”</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Full ledger */}
      <section className="theme-sand section-y">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow hi="सूची">The full list</Eyebrow>
              <h2 className="mt-6 text-d2">
                By the <em>year</em>
              </h2>
              <div className="mt-12 border-t border-line pt-8">
                <p className="eyebrow text-fg-subtle">Also</p>
                <ul className="mt-5 space-y-5">
                  {roles.map((r) => (
                    <li key={r.title}>
                      <p className="font-display text-d5">{r.title}</p>
                      <p className="text-small text-fg-muted">{r.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {years.map((year) => (
              <div key={year} data-reveal className="grid grid-cols-[5.5rem_1fr] gap-x-6 border-t border-line-strong py-8 sm:grid-cols-[8rem_1fr]">
                <p className="font-display text-d3 font-light leading-none text-accent numerals">{year}</p>
                <ul className="space-y-6">
                  {awards
                    .filter((a) => a.year === year)
                    .map((a) => (
                      <li key={a.title}>
                        <p className="font-display text-d5">{a.title}</p>
                        <p className="mt-1 text-small text-fg-muted">
                          {a.body}
                          {a.place ? `, ${a.place}` : ""}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-day py-24 lg:py-28">
        <div className="container-x flex flex-col items-start justify-between gap-10 border-y border-line py-14 lg:flex-row lg:items-center">
          <p className="max-w-[30ch] font-display text-d3">
            Writing about the chef or <em>RajRasa</em>?
          </p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/press#media-kit">Download the media kit</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Press enquiries
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
