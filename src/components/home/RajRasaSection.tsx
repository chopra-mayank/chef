import Image from "next/image";
import { ArchFrame } from "@/components/ornaments/Arch";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { delay } from "@/lib/style";

/** The chef's restaurant — links out to rajrasa.com */
export function RajRasaSection() {
  const r = site.restaurant;
  return (
    <section className="theme-night relative isolate overflow-hidden">
      <Image
        src="/images/city-palace-blue.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-55"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night-950 via-night-950/80 to-night-950/20" />

      <div className="container-x grid min-h-[86vh] grid-cols-12 items-center gap-x-6 gap-y-14 py-28 lg:py-36">
        <div className="col-span-12 lg:col-span-6">
          <Eyebrow hi="राजरसा">The restaurant</Eyebrow>
          <h2 data-reveal className="mt-6 text-d1">
            {r.name}
            <span className="block text-d3 italic text-accent">{r.city}</span>
          </h2>
          <p data-reveal style={delay(120)} className="mt-8 font-display text-d4 font-light">
            “{r.tagline}”
          </p>
          <p data-reveal style={delay(200)} className="mt-6 max-w-[48ch] text-fg-muted">
            Every region of Rajasthan on a single menu — cooked the traditional way, with no tomato as a
            base and no shortcuts, in a dining room dressed in Jaipur blue.
          </p>
          <div data-reveal style={delay(260)} className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow text-fg-subtle">Find us</p>
              <p className="mt-3 text-small text-fg-muted">{r.address}</p>
            </div>
            <div>
              <p className="eyebrow text-fg-subtle">Hours</p>
              <ul className="mt-3 text-small text-fg-muted">
                {r.hours.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
          <div data-reveal style={delay(320)} className="mt-10">
            <ButtonLink href={r.url}>Visit rajrasa.com</ButtonLink>
          </div>
        </div>

        <div className="col-span-12 hidden lg:col-span-4 lg:col-start-9 lg:block">
          <div data-reveal="mask">
            <ArchFrame kind="jharokha" ratio="2x3" outline={14} outlineClassName="text-zari-300/70">
              <Image
                src="/images/thali-bandhani.jpg"
                alt="A Rajasthani thali on a red bandhani cloth"
                fill
                sizes="30vw"
                className="object-cover"
              />
            </ArchFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
