import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { BlockPrintBorder, Rosette } from "@/components/ornaments/Patterns";

export function NewsletterSection() {
  return (
    <section className="theme-sand relative">
      <BlockPrintBorder id="news-border-top" className="text-laal-600/80" />
      <div className="container-x py-24 lg:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Rosette className="size-5 text-accent-soft" />
          <h2 data-reveal className="mt-8 text-d2">
            Letters from the <em>rasoi</em>
          </h2>
          <p data-reveal className="mt-6 max-w-[46ch] text-lede text-fg-muted">
            One recipe, one story and one ingredient from Rajasthan — in your inbox on the first Sunday of
            every month.
          </p>
          <NewsletterForm id="home-newsletter" className="mt-12 w-full max-w-lg text-left" />
          <p className="mt-4 text-small text-fg-subtle">No noise. Unsubscribe whenever you like.</p>
        </div>
      </div>
      <BlockPrintBorder id="news-border-bottom" className="text-laal-600/80" />
    </section>
  );
}
