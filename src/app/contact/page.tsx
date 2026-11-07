import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { ContactForm } from "@/components/forms/ContactForm";
import { BlockPrintBorder } from "@/components/ornaments/Patterns";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Collaborations, private dining, masterclasses and press enquiries for Chef Saurabh Sharma.",
};

const reasons = [
  { title: "Brand collaborations", text: "Recipe development, campaigns and long-term partnerships with brands that respect ingredients." },
  { title: "Private dining & events", text: "Royal Rajasthani feasts for weddings, celebrations and corporate gatherings — in Jaipur or wherever you are." },
  { title: "Masterclasses", text: "Hands-on classes for home cooks, culinary schools and hotel brigades." },
  { title: "Media & press", text: "Interviews, features, television and festival appearances." },
];

export default function ContactPage() {
  return (
    <>
      <section className="theme-day pt-[132px] lg:pt-[150px]">
        <div className="container-x grid grid-cols-12 gap-x-6 gap-y-16 pb-24 lg:pb-32">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow hi="संपर्क" className="animate-rise">
              Contact
            </Eyebrow>
            <h1 className="mt-8 text-d1">
              <span className="line-mask">
                <span className="animate-line-up" style={{ animationDelay: "120ms" }}>
                  Write to
                </span>
              </span>
              <span className="line-mask">
                <span className="animate-line-up italic text-accent" style={{ animationDelay: "240ms" }}>
                  the kitchen
                </span>
              </span>
            </h1>
            <p className="mt-8 max-w-[44ch] animate-rise text-lede text-fg-muted" style={{ animationDelay: "450ms" }}>
              For collaborations, events, classes or a question about a recipe — every message is read by the
              team, and the interesting ones by me.
            </p>

            <dl className="mt-14 space-y-8 border-t border-line pt-10">
              {reasons.map((r) => (
                <div key={r.title} data-reveal>
                  <dt className="font-display text-d5">{r.title}</dt>
                  <dd className="mt-2 max-w-[46ch] text-small text-fg-muted">{r.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="theme-sand relative animate-rise" style={{ animationDelay: "400ms" }}>
              <BlockPrintBorder id="contact-border" className="text-laal-600/80" />
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow text-accent">Send a note</p>
                <p className="mt-3 font-display text-d4">We reply within three working days.</p>
                <div className="mt-10">
                  <ContactForm />
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <div>
                <p className="eyebrow text-fg-subtle">Email</p>
                <a href={`mailto:${site.email}`} className="link-draw mt-3 inline-block break-all text-small">
                  {site.email}
                </a>
              </div>
              <div>
                <p className="eyebrow text-fg-subtle">Press</p>
                <a href={`mailto:${site.pressEmail}`} className="link-draw mt-3 inline-block break-all text-small">
                  {site.pressEmail}
                </a>
              </div>
              <div>
                <p className="eyebrow text-fg-subtle">Table at RajRasa</p>
                <a
                  href={site.restaurant.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw mt-3 inline-flex items-center gap-1 text-small"
                >
                  rajrasa.com <ArrowUpRightIcon className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="theme-night relative isolate overflow-hidden">
        <Image src="/images/peacock-gate.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover object-[50%_40%] opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night-950/90 via-night-950/40 to-night-950/20" />
        <div className="container-x flex min-h-[64svh] flex-col items-center justify-end pb-20 text-center">
          <p lang="hi" className="text-[clamp(2rem,5vw,3.5rem)] leading-tight text-zari-200">
            {site.greeting.hi}
          </p>
          <p className="mt-3 font-display text-d5 italic text-fg-muted">
            {site.greeting.en} — {site.greeting.meaning.toLowerCase()}.
          </p>
        </div>
      </section>
    </>
  );
}
