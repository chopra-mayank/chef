import Image from "next/image";
import { ArchFrame } from "@/components/ornaments/Arch";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { delay } from "@/lib/style";

export function Philosophy() {
  return (
    <section className="theme-day section-y">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-14">
        <div className="col-span-12 lg:col-span-4">
          <Eyebrow hi="दर्शन">The philosophy</Eyebrow>
          <figure data-reveal className="mt-12 hidden max-w-[320px] lg:block" style={delay(150)}>
            <ArchFrame kind="pointed" ratio="3x4" innerClassName="bg-ink-900">
              <Image
                src="/images/plating-bw-window.jpg"
                alt="Black-and-white photograph of hands finishing a plate by window light"
                fill
                sizes="320px"
                className="object-cover grayscale"
              />
            </ArchFrame>
            <figcaption className="mt-4 text-small italic text-fg-subtle">
              Plating by window light, RajRasa.
            </figcaption>
          </figure>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <p data-reveal className="font-display text-d3 font-light leading-[1.16] tracking-[-0.018em]">
            In Rajasthan, food was never about abundance. It was about{" "}
            <em className="text-accent">ingenuity</em> — a feast made from millet, buttermilk and a
            handful of dried desert berries, served with such grace that the guest never noticed the
            desert outside.
          </p>

          <div className="mt-14 grid gap-8 text-fg-muted sm:grid-cols-2 lg:mt-16">
            <p data-reveal className="drop-cap" style={delay(100)}>
              I cook the way my grandmother did — by smell and by sound, with whole spices, slow fire and
              more ghee than anyone admits to. No tomato where the old recipe never had one, and no
              shortcut that the dish would notice.
            </p>
            <p data-reveal style={delay(200)}>
              This website is my notebook: the recipes I have gathered from havelis, hunting camps and
              village kitchens across Rajasthan, the videos where we cook them together, and the stories
              of the people who taught me.
            </p>
          </div>

          <div data-reveal className="mt-14 flex flex-wrap items-center justify-between gap-8 border-t border-line pt-8">
            <div>
              <p className="font-display text-d5 italic">Saurabh Sharma</p>
              <p className="eyebrow mt-2 text-fg-subtle">Chef &amp; founder, RajRasa</p>
            </div>
            <ButtonLink href="/story" variant="text">
              Read the story
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
