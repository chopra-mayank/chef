import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { awards, stats } from "@/content/awards";
import { delay } from "@/lib/style";

export function AccoladesSection() {
  return (
    <section className="theme-sand section-y">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            eyebrow="Honours"
            hi="सम्मान"
            title={
              <>
                A table, <em>honoured</em>
              </>
            }
          />
          <div className="lg:col-span-5 lg:justify-self-end">
            <ButtonLink href="/accolades" variant="text">
              All accolades
            </ButtonLink>
          </div>
        </div>

        {/* Numbers */}
        <dl className="mt-16 grid grid-cols-2 border-t border-line lg:mt-20 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              style={delay(i * 90)}
              className="flex flex-col-reverse justify-end border-b border-line py-8 pr-6 lg:border-b-0 lg:border-r lg:py-10 lg:pl-8 lg:first:pl-0 lg:last:border-r-0"
            >
              <dt className="mt-4 max-w-[18ch] text-small text-fg-muted">{s.label}</dt>
              <dd className="font-display text-d1 font-light leading-none text-fg numerals">
                {s.value}
                <span className="text-accent">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Ledger */}
        <ol className="mt-10 border-t border-line-strong lg:mt-16">
          {awards.slice(0, 5).map((a, i) => (
            <li
              key={`${a.year}-${a.title}`}
              data-reveal
              style={delay(i * 70)}
              className="group grid grid-cols-[4.5rem_1fr] gap-x-6 gap-y-1 border-b border-line py-6 sm:grid-cols-[6rem_1fr_auto] sm:items-baseline lg:py-7"
            >
              <span className="font-display text-d5 text-accent numerals">{a.year}</span>
              <span className="font-display text-d5 transition-transform duration-500 ease-[var(--ease-royal)] group-hover:translate-x-1.5">
                {a.title}
              </span>
              <span className="col-start-2 text-small text-fg-muted sm:col-start-auto sm:text-right">
                {a.body}
                {a.place ? `, ${a.place}` : ""}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
