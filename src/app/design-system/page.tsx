import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArchFrame } from "@/components/ornaments/Arch";
import {
  BlockPrintBorder,
  Chhatri,
  Jaali,
  Leheriya,
  Monogram,
  OrnamentDivider,
  Rosette,
} from "@/components/ornaments/Patterns";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { ButtonLink } from "@/components/ui/Button";
import { DietMark } from "@/components/ui/DietMark";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/video/VideoCard";
import { recipes } from "@/content/recipes";
import { videos } from "@/content/videos";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false },
};

const palette = [
  {
    name: "Sand",
    hi: "बालू",
    note: "Udaipur marble and Jaisalmer sandstone. The daytime page.",
    swatches: [
      ["sand-50", "#FBF7F0"],
      ["sand-100", "#F5EEE2"],
      ["sand-200", "#ECE0CC"],
      ["sand-300", "#DFCBAA"],
      ["sand-400", "#CBAE83"],
      ["sand-500", "#AE8E60"],
    ],
  },
  {
    name: "Ink",
    hi: "काजल",
    note: "Kohl, not black. Warm brown-black for all text on light.",
    swatches: [
      ["ink-950", "#14110E"],
      ["ink-900", "#211C17"],
      ["ink-700", "#463D35"],
      ["ink-600", "#5C5249"],
      ["ink-500", "#6F6357"],
      ["ink-400", "#9A8D7E"],
    ],
  },
  {
    name: "Night",
    hi: "नील",
    note: "Jodhpur indigo deepening into desert midnight. Video, honours, footer.",
    swatches: [
      ["night-950", "#0A1128"],
      ["night-900", "#0F1A3A"],
      ["night-800", "#16264F"],
      ["night-700", "#1C3468"],
      ["night-600", "#26468A"],
      ["night-300", "#9FB3DA"],
    ],
  },
  {
    name: "Zari",
    hi: "ज़री",
    note: "Gold thread. Ornament, numerals and accents — never large fields.",
    swatches: [
      ["zari-200", "#F1DFB8"],
      ["zari-300", "#E6C88E"],
      ["zari-400", "#D6AE68"],
      ["zari-500", "#C0924B"],
      ["zari-600", "#9C7234"],
      ["zari-700", "#7A5826"],
    ],
  },
  {
    name: "Accents",
    hi: "रंग",
    note: "Kesar, gulabi and laal — used sparingly, like a turban in a crowd.",
    swatches: [
      ["kesar-500", "#DD7A2B"],
      ["kesar-600", "#B8601C"],
      ["gulabi-300", "#EDB3A4"],
      ["gulabi-400", "#E09482"],
      ["laal-600", "#9A2C24"],
      ["laal-700", "#7B221D"],
    ],
  },
] as const;

const scale = [
  ["text-hero", "Hero — the chef’s name", "Saurabh"],
  ["text-d1", "Display 1 — page titles", "Recipes from the rasoi"],
  ["text-d2", "Display 2 — section titles", "Signature recipes"],
  ["text-d3", "Display 3 — statements", "Every dish has an address"],
  ["text-d4", "Display 4 — card titles", "Dal Baati Churma"],
  ["text-d5", "Display 5 — small titles", "Soak the chillies"],
] as const;

function Block({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="eyebrow text-accent">{eyebrow}</p>
          <h2 className="mt-4 text-d3">{title}</h2>
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="theme-day">
      <section className="pt-[132px] lg:pt-[150px]">
        <div className="container-x pb-20">
          <Eyebrow hi="रूप-रेखा">Design system · v0.1</Eyebrow>
          <h1 className="mt-8 text-d1">
            Din aur <em className="text-accent">Raat</em>
          </h1>
          <p className="mt-8 max-w-[60ch] text-lede text-fg-muted">
            Day and night in the Thar. Pages read like a heritage cookbook by day — marble, sandstone and kohl ink —
            and turn to Jodhpur indigo and lamplit gold for film, honours and the close of the page. Rajasthani
            craft appears as structure, never as decoration for its own sake: jharokha windows frame photographs,
            jaali lattice sits behind dark sections, block-print borders mark a change of chapter.
          </p>
          <nav aria-label="Sections" className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[0.75rem] font-medium uppercase tracking-[0.2em]">
            {["Colour", "Type", "Ornament", "Components", "Motion", "Photography"].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="link-draw">
                {s}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="container-x pb-24">
        {/* Colour */}
        <Block id="colour" eyebrow="01 · Colour" title="Sandstone, kohl, indigo & zari">
          <div className="space-y-14">
            {palette.map((group) => (
              <div key={group.name}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-d5">{group.name}</h3>
                  <span lang="hi" className="text-fg-subtle">
                    {group.hi}
                  </span>
                  <p className="w-full text-small text-fg-muted sm:ml-auto sm:w-auto">{group.note}</p>
                </div>
                <ul className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {group.swatches.map(([token, hex]) => (
                    <li key={token}>
                      <span className="block aspect-[4/3] border border-line" style={{ background: hex }} />
                      <span className="mt-2 block text-[0.8125rem] font-medium">{token}</span>
                      <span className="block text-[0.75rem] uppercase text-fg-subtle numerals">{hex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="theme-day border border-line p-6">
                <p className="eyebrow text-accent">Day</p>
                <p className="mt-3 font-display text-d5">Ink 900 on Sand 50</p>
                <p className="mt-2 text-small text-fg-muted">Body text 15.8 : 1 · muted text 7.1 : 1</p>
              </div>
              <div className="theme-sand border border-line p-6">
                <p className="eyebrow text-accent">Sand band</p>
                <p className="mt-3 font-display text-d5">Ink 900 on Sand 100</p>
                <p className="mt-2 text-small text-fg-muted">Alternating sections, recipe cards</p>
              </div>
              <div className="theme-night p-6">
                <p className="eyebrow text-accent">Night</p>
                <p className="mt-3 font-display text-d5">Sand 100 on Night 950</p>
                <p className="mt-2 text-small text-fg-muted">Zari 300 for accents · 11.6 : 1</p>
              </div>
            </div>
          </div>
        </Block>

        {/* Type */}
        <Block id="type" eyebrow="02 · Type" title="Three voices, one from each tradition">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="border border-line p-7">
              <p className="eyebrow text-fg-subtle">Display · Zodiak</p>
              <p className="mt-6 font-display text-[3.5rem] font-light leading-none">
                Aa <em>Aa</em>
              </p>
              <p className="mt-6 text-small text-fg-muted">
                High-contrast serif by the Indian Type Foundry, Ahmedabad. Light for headlines, italic for the one
                word that matters.
              </p>
            </div>
            <div className="border border-line p-7">
              <p className="eyebrow text-fg-subtle">Text & labels · Ranade</p>
              <p className="mt-6 text-[3.5rem] leading-none">Aa</p>
              <p className="mt-6 text-small text-fg-muted">
                A warm humanist sans, also from ITF. 17 px body, generous leading; wide-tracked capitals for labels.
              </p>
            </div>
            <div className="border border-line p-7">
              <p className="eyebrow text-fg-subtle">Devanagari · Tiro</p>
              <p lang="hi" className="mt-6 text-[3.5rem] leading-none text-accent">
                अआ
              </p>
              <p className="mt-6 text-small text-fg-muted">
                Tiro Devanagari Hindi for dish names, regions and labels; Halant Light (ITF) for the large “खम्मा घणी” greeting on the home page.
              </p>
            </div>
          </div>
          <div className="mt-14 divide-y divide-line border-y border-line">
            {scale.map(([cls, label, sample]) => (
              <div key={cls} className="grid gap-3 py-6 md:grid-cols-[14rem_1fr] md:items-baseline">
                <div>
                  <p className="text-[0.8125rem] font-medium">{cls}</p>
                  <p className="text-[0.75rem] text-fg-subtle">{label}</p>
                </div>
                <p className={`${cls} truncate font-display font-light`}>{sample}</p>
              </div>
            ))}
            <div className="grid gap-3 py-6 md:grid-cols-[14rem_1fr]">
              <div>
                <p className="text-[0.8125rem] font-medium">text-lede / text-body</p>
                <p className="text-[0.75rem] text-fg-subtle">Ranade 19 / 17 px</p>
              </div>
              <div>
                <p className="text-lede">In Rajasthan, food was never about abundance. It was about ingenuity.</p>
                <p className="mt-3 text-fg-muted">
                  Soak the chillies in hot water for 30 minutes, then grind them with the garlic into a coarse paste.
                </p>
              </div>
            </div>
            <div className="grid gap-3 py-6 md:grid-cols-[14rem_1fr]">
              <div>
                <p className="text-[0.8125rem] font-medium">eyebrow</p>
                <p className="text-[0.75rem] text-fg-subtle">12 px · 0.24 em tracking</p>
              </div>
              <Eyebrow hi="रसोई">From the rasoi</Eyebrow>
            </div>
          </div>
        </Block>

        {/* Ornament */}
        <Block id="ornament" eyebrow="03 · Ornament" title="Craft as structure">
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-3">
            {(
              [
                ["jharokha", "Jharokha", "Hero images & features"],
                ["mehrab", "Mehrab", "Recipe cards"],
                ["pointed", "Pointed", "Story & editorial"],
              ] as const
            ).map(([kind, name, use]) => (
              <figure key={kind}>
                <ArchFrame kind={kind} ratio="3x4" outline={kind === "jharokha" ? 12 : false} innerClassName="bg-night-800">
                  <Image src="/images/masala-dabba-dark.jpg" alt="" fill sizes="30vw" className="object-cover" />
                </ArchFrame>
                <figcaption className="mt-6">
                  <p className="font-display text-d5">{name}</p>
                  <p className="text-small text-fg-muted">{use}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <div className="theme-night relative h-56 overflow-hidden p-6">
              <Jaali id="ds-jaali" size={56} className="text-zari-300 opacity-25" />
              <p className="eyebrow relative text-accent">Jaali — star & cross lattice</p>
            </div>
            <div className="relative h-56 overflow-hidden border border-line p-6">
              <Jaali id="ds-jaali-light" size={44} className="text-zari-500 opacity-40" />
              <p className="eyebrow relative text-accent">Jaali on sand, behind arches</p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="theme-sand flex flex-col justify-center gap-4 p-6">
              <BlockPrintBorder id="ds-block" />
              <p className="eyebrow text-accent">Block-print border — Sanganeri buti</p>
            </div>
            <div className="flex flex-col justify-center gap-4 border border-line p-6">
              <Leheriya id="ds-leheriya" className="h-3" />
              <p className="eyebrow text-accent">Leheriya — the turban stripe, as a thin band</p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="grid place-items-center gap-4 border border-line p-8 text-center">
              <Rosette className="size-10 text-accent-soft" />
              <p className="eyebrow text-fg-subtle">Rosette</p>
            </div>
            <div className="grid place-items-center gap-4 border border-line p-8 text-center">
              <Chhatri className="h-20 w-auto text-accent-soft" />
              <p className="eyebrow text-fg-subtle">Chhatri line drawing</p>
            </div>
            <div className="grid place-items-center gap-4 border border-line p-8 text-center">
              <span className="flex items-center gap-3 text-fg">
                <Monogram />
                <span className="font-display text-xl">Saurabh Sharma</span>
              </span>
              <p className="eyebrow text-fg-subtle">Monogram (placeholder)</p>
            </div>
            <div className="grid place-items-center gap-4 border border-line p-8 text-center">
              <span className="flex items-center gap-5 text-small">
                <DietMark diet="veg" withLabel />
                <DietMark diet="nonveg" withLabel />
              </span>
              <p className="eyebrow text-fg-subtle">FSSAI food marks</p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="frame-miniature">
              <div className="bg-sand-100 p-8">
                <p className="eyebrow text-laal-600">Miniature frame</p>
                <p className="mt-3 font-display text-d5 text-ink-900">
                  The border of a Mewar painting: gold rule, madder band, gold rule, cream.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center border border-line p-8">
              <OrnamentDivider />
              <p className="eyebrow mt-6 text-center text-fg-subtle">Ornament divider</p>
            </div>
          </div>
        </Block>

        {/* Components */}
        <Block id="components" eyebrow="04 · Components" title="Quiet controls">
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="/recipes">Primary</ButtonLink>
            <ButtonLink href="/recipes" variant="outline">
              Secondary
            </ButtonLink>
            <ButtonLink href="/recipes" variant="text">
              Text link
            </ButtonLink>
            <ButtonLink href="https://www.youtube.com/" variant="outline" icon="play">
              Play
            </ButtonLink>
          </div>
          <div className="theme-night mt-6 flex flex-wrap items-center gap-4 p-8">
            <ButtonLink href="/recipes">On night</ButtonLink>
            <ButtonLink href="/recipes" variant="outline">
              Secondary
            </ButtonLink>
            <ButtonLink href="/recipes" variant="text">
              Text link
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-3">
            <RecipeCard recipe={recipes[1]} />
            <div className="theme-night p-6 md:col-span-2">
              <VideoCard video={videos[0]} />
            </div>
          </div>
          <div className="mt-14 max-w-md">
            <p className="eyebrow mb-4 text-fg-subtle">Input</p>
            <NewsletterForm id="ds-newsletter" />
          </div>
        </Block>

        {/* Motion */}
        <Block id="motion" eyebrow="05 · Motion" title="Unhurried, like slow cooking">
          <ul className="grid gap-6 md:grid-cols-2">
            {[
              ["Reveal", "Content rises 28 px and fades in over 1 s as it enters the screen, staggered 60–120 ms."],
              ["Headlines", "Lines lift out of a mask, one after another — the page’s only flourish."],
              ["Images", "Arches open like a curtain and the photograph settles from 112% to 100%."],
              ["Easing", "cubic-bezier(0.22, 1, 0.36, 1) everywhere. Nothing bounces."],
              ["Scroll", "Lenis smooth scrolling with light inertia; switched off for reduced-motion users."],
              ["Respect", "prefers-reduced-motion removes every animation; all content is visible without JavaScript."],
            ].map(([t, d]) => (
              <li key={t} className="border-t border-line pt-5">
                <p className="font-display text-d5">{t}</p>
                <p className="mt-2 text-small text-fg-muted">{d}</p>
              </li>
            ))}
          </ul>
        </Block>

        {/* Photography */}
        <Block id="photography" eyebrow="06 · Photography" title="Low light, real hands, real brass">
          <div className="grid gap-6 sm:grid-cols-3">
            {["/images/laal-maas.jpg", "/images/plating-bw-window.jpg", "/images/haveli-niche.jpg"].map((src) => (
              <div key={src} className="relative aspect-[4/5] overflow-hidden bg-sand-200">
                <Image src={src} alt="" fill sizes="30vw" className="object-cover" />
              </div>
            ))}
          </div>
          <ul className="mt-10 grid gap-6 text-small text-fg-muted md:grid-cols-2">
            <li className="border-t border-line pt-4">
              <span className="font-medium text-fg">Do —</span> single-source window light, deep shadows, brass,
              copper and stone surfaces, steam and smoke, the cook’s hands mid-gesture.
            </li>
            <li className="border-t border-line pt-4">
              <span className="font-medium text-fg">Avoid —</span> bright flat lighting, white plastic, stock
              “smiling chef” poses, heavy filters, garnish for its own sake.
            </li>
            <li className="border-t border-line pt-4">
              <span className="font-medium text-fg">Portraits —</span> in whites in the RajRasa kitchen, and in
              natural light in Jaipur’s old city. One black-and-white series for the story page.
            </li>
            <li className="border-t border-line pt-4">
              <span className="font-medium text-fg">Formats —</span> shoot vertical 4:5 for arches and cards,
              16:9 for film thumbnails, plus a few wide landscapes for full-bleed bands.
            </li>
          </ul>
        </Block>
      </div>
    </div>
  );
}
