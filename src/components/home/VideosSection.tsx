import { Jaali } from "@/components/ornaments/Patterns";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/video/VideoCard";
import { site } from "@/content/site";
import { longform } from "@/content/videos";
import { delay } from "@/lib/style";

export function VideosSection() {
  const [feature, ...rest] = longform;
  return (
    <section className="theme-night section-y relative overflow-hidden">
      <Jaali id="videos-jaali" size={88} className="text-zari-300 opacity-[0.05]" />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            eyebrow="On YouTube"
            hi="यूट्यूब रसोई"
            title={
              <>
                Cook along, <em>step by step</em>
              </>
            }
            intro="New recipes every week — filmed in my kitchen, with every pinch and every pause left in."
          />
          <div data-reveal className="flex flex-wrap items-end gap-x-12 gap-y-6 lg:col-span-5 lg:justify-end">
            <dl className="flex gap-10">
              <div>
                <dt className="eyebrow text-fg-subtle">Subscribers</dt>
                <dd className="mt-2 font-display text-d3 text-accent numerals">{site.youtube.subscribers}</dd>
              </div>
              <div>
                <dt className="eyebrow text-fg-subtle">Videos</dt>
                <dd className="mt-2 font-display text-d3 text-accent numerals">{site.youtube.videos}</dd>
              </div>
            </dl>
            <ButtonLink href={site.youtube.url} icon="play">
              Subscribe
            </ButtonLink>
          </div>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-12 lg:mt-20 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-8">
            <VideoCard video={feature} variant="feature" sizes="(min-width: 1024px) 62vw, 92vw" />
          </div>
          <div className="flex flex-col gap-7 lg:col-span-4">
            {rest.slice(0, 3).map((v, i) => (
              <div key={v.id} data-reveal style={delay(120 + i * 90)} className="border-b border-line pb-7 last:border-0 last:pb-0">
                <VideoCard video={v} variant="row" sizes="176px" />
              </div>
            ))}
            <ButtonLink href="/videos" variant="text" className="self-start">
              The full video library
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
