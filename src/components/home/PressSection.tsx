import { BookCover } from "@/components/press/BookCover";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { featuredIn, publications, quotes } from "@/content/press";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/style";

export function OutletStrip({ className }: { className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-6", className)}>
      {featuredIn.map((o, i) => (
        <li
          key={o.name}
          data-reveal
          style={delay(i * 60)}
          className="grid h-24 place-items-center border-b border-r border-line px-4 text-center text-fg-muted transition-colors hover:text-fg lg:h-28"
        >
          <span
            className={cn(
              o.style === "caps" && "text-[0.8125rem] font-medium tracking-[0.26em]",
              o.style === "serif" && "font-display text-[1.375rem] tracking-[-0.01em]",
              o.style === "italic" && "font-display text-[1.375rem] italic",
            )}
          >
            {o.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function PressSection() {
  const book = publications[0];
  return (
    <section className="theme-day section-y">
      <div className="container-x">
        <Eyebrow hi="प्रकाशन">As featured in</Eyebrow>
        <OutletStrip className="mt-10" />

        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-14 lg:mt-32">
          <div className="col-span-12 lg:col-span-5">
            <div data-reveal className="relative bg-sand-100 px-[16%] py-[14%]">
              <BookCover pub={book} id="home-book-jaali" className="mx-auto max-w-[320px]" />
            </div>
          </div>
          <div className="col-span-12 flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <p data-reveal className="eyebrow text-accent">
              New book · {book.year}
            </p>
            <h2 data-reveal style={delay(80)} className="mt-5 text-d2">
              {book.title}
            </h2>
            <p data-reveal style={delay(140)} className="mt-3 font-display text-d5 italic text-fg-muted">
              {book.subtitle}
            </p>
            <p data-reveal style={delay(200)} className="mt-8 max-w-[52ch] text-fg-muted">
              {book.blurb}
            </p>
            <div data-reveal style={delay(260)} className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/press">Publications &amp; press</ButtonLink>
            </div>

            <div className="mt-16 grid gap-10 border-t border-line pt-10 sm:grid-cols-2">
              {quotes.map((q, i) => (
                <figure key={q.source} data-reveal style={delay(i * 120)}>
                  <span aria-hidden className="block h-8 font-display text-[3.5rem] leading-none text-accent-soft">
                    “
                  </span>
                  <blockquote className="font-display text-[1.25rem] leading-snug">{q.text}</blockquote>
                  <figcaption className="eyebrow mt-4 text-fg-subtle">— {q.source}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
