import type { Metadata } from "next";
import { ArrowUpRightIcon, DownloadSimpleIcon } from "@phosphor-icons/react/ssr";
import { OutletStrip } from "@/components/home/PressSection";
import { Jaali } from "@/components/ornaments/Patterns";
import { BookCover } from "@/components/press/BookCover";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { pressItems, publications } from "@/content/press";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { delay } from "@/lib/style";

export const metadata: Metadata = {
  title: "Press & Publications",
  description: "Books, columns, interviews and media coverage of Chef Saurabh Sharma.",
};

const kit = [
  { label: "Biography", detail: "Short & long versions · PDF" },
  { label: "Portraits", detail: "12 high-resolution photographs · ZIP" },
  { label: "Food photography", detail: "24 signature dishes · ZIP" },
  { label: "Logos & marks", detail: "SVG and PNG" },
];

export default function PressPage() {
  return (
    <>
      <section className="theme-day pt-[132px] lg:pt-[150px]">
        <div className="container-x pb-16 lg:pb-24">
          <Eyebrow hi="प्रकाशन" className="animate-rise">
            Publications &amp; press
          </Eyebrow>
          <h1 className="mt-8 text-d1">
            <span className="line-mask">
              <span className="animate-line-up" style={{ animationDelay: "120ms" }}>
                In print,
              </span>
            </span>
            <span className="line-mask">
              <span className="animate-line-up italic text-accent" style={{ animationDelay: "240ms" }}>
                on air
              </span>
            </span>
          </h1>
          <p className="mt-8 max-w-[54ch] animate-rise text-lede text-fg-muted" style={{ animationDelay: "450ms" }}>
            Books and columns I have written, and the conversations I have been lucky to have about the food of
            Rajasthan.
          </p>
        </div>
      </section>

      {/* Books & columns */}
      <section className="theme-sand section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Written" hi="लेखन" title={<>Books &amp; <em>columns</em></>} />
          <div className="mt-16 divide-y divide-line border-y border-line lg:mt-20">
            {publications.map((p, i) => (
              <article key={p.title} className="grid grid-cols-12 gap-x-6 gap-y-10 py-14 lg:py-20">
                <div data-reveal className="col-span-12 sm:col-span-5 lg:col-span-3">
                  <BookCover pub={p} id={`press-book-${i}`} className="mx-auto max-w-[240px] sm:mx-0" />
                </div>
                <div className="col-span-12 flex flex-col justify-center sm:col-span-7 lg:col-span-7 lg:col-start-5">
                  <p data-reveal className="eyebrow text-accent">
                    {p.kind} · {p.year}
                  </p>
                  <h3 data-reveal style={delay(80)} className="mt-4 text-d2">
                    {p.title}
                  </h3>
                  {p.subtitle && (
                    <p data-reveal style={delay(120)} className="mt-2 font-display text-d5 italic text-fg-muted">
                      {p.subtitle}
                    </p>
                  )}
                  <p data-reveal style={delay(160)} className="mt-6 max-w-[56ch] text-fg-muted">
                    {p.blurb}
                  </p>
                  <p data-reveal style={delay(200)} className="mt-6 text-small text-fg-subtle">
                    {p.publisher}
                  </p>
                  <div data-reveal style={delay(240)} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                    <a href={p.href ?? "#"} className="link-draw inline-flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.2em]">
                      {p.kind === "Book" ? "Buy the book" : "Read the column"}
                      <ArrowUpRightIcon weight="light" className="size-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="theme-day section-y">
        <div className="container-x">
          <Eyebrow hi="चर्चा में">As featured in</Eyebrow>
          <OutletStrip className="mt-10" />

          <h2 className="mt-24 text-d2 lg:mt-32">
            Selected <em>coverage</em>
          </h2>
          <ul className="mt-12 border-t border-line-strong">
            {pressItems.map((item, i) => (
              <li key={item.headline} data-reveal style={delay(Math.min(i, 4) * 60)}>
                <a
                  href={item.href ?? "#"}
                  className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-2 border-b border-line py-8 transition-colors hover:bg-surface-2"
                >
                  <span className="col-span-12 text-small text-fg-subtle numerals sm:col-span-3 lg:col-span-2">
                    {formatDate(item.date)}
                  </span>
                  <span className="col-span-12 sm:col-span-9 lg:col-span-7">
                    <span className="eyebrow block text-accent">{item.outlet}</span>
                    <span className="mt-2 block font-display text-d4 transition-transform duration-500 ease-[var(--ease-royal)] group-hover:translate-x-1.5">
                      {item.headline}
                    </span>
                    {item.excerpt && <span className="mt-2 block text-fg-muted">{item.excerpt}</span>}
                  </span>
                  <span className="col-span-12 flex items-center justify-between gap-4 text-small text-fg-subtle sm:col-span-9 sm:col-start-4 lg:col-span-3 lg:justify-end">
                    {item.kind}
                    <ArrowUpRightIcon weight="light" className="size-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Media kit */}
      <section id="media-kit" className="theme-night relative scroll-mt-20 overflow-hidden section-y">
        <Jaali id="press-kit-jaali" size={80} className="text-zari-300 opacity-[0.05]" />
        <div className="container-x relative grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow hi="मीडिया किट">For journalists</Eyebrow>
            <h2 className="mt-6 text-d2">
              The media <em>kit</em>
            </h2>
            <p className="mt-6 max-w-[44ch] text-fg-muted">
              Biography, approved portraits and food photography — free to use with credit. For interviews,
              shoots or appearances, write to the press desk.
            </p>
            <a href={`mailto:${site.pressEmail}`} className="link-draw mt-8 inline-block font-display text-d5 text-accent">
              {site.pressEmail}
            </a>
          </div>
          <ul className="col-span-12 border-t border-line lg:col-span-6 lg:col-start-7">
            {kit.map((k, i) => (
              <li key={k.label} data-reveal style={delay(i * 80)}>
                <a href="#" className="group flex items-center justify-between gap-6 border-b border-line py-6">
                  <span>
                    <span className="block font-display text-d5">{k.label}</span>
                    <span className="mt-1 block text-small text-fg-subtle">{k.detail}</span>
                  </span>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-zari-300 group-hover:bg-zari-300 group-hover:text-night-950">
                    <DownloadSimpleIcon weight="light" className="size-5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
