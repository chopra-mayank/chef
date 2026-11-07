import type { Metadata } from "next";
import Image from "next/image";
import { ArchFrame } from "@/components/ornaments/Arch";
import { Jaali } from "@/components/ornaments/Patterns";
import { RecipeExplorer } from "@/components/recipes/RecipeExplorer";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { recipes } from "@/content/recipes";

export const metadata: Metadata = {
  title: "Recipes",
  description:
    "Traditional Rajasthani recipes from the royal kitchens, havelis and village chulhas of Marwar, Mewar, Shekhawati and the Thar.",
};

export default function RecipesPage() {
  return (
    <>
      <section className="theme-day relative overflow-hidden pt-[132px] lg:pt-[150px]">
        <div className="container-x grid grid-cols-12 items-end gap-x-6 gap-y-12 pb-16 lg:pb-20">
          <div className="col-span-12 lg:col-span-8">
            <Eyebrow hi="व्यंजन संग्रह" className="animate-rise">
              The recipe archive
            </Eyebrow>
            <h1 className="mt-8 text-d1">
              <span className="line-mask">
                <span className="animate-line-up" style={{ animationDelay: "120ms" }}>
                  Recipes from the
                </span>
              </span>
              <span className="line-mask">
                <span className="animate-line-up italic text-accent" style={{ animationDelay: "240ms" }}>
                  royal rasoi
                </span>
              </span>
            </h1>
            <p className="mt-8 max-w-[52ch] animate-rise text-lede text-fg-muted" style={{ animationDelay: "500ms" }}>
              Every recipe is written the way I cook it at home — with the region it comes from, the story behind
              it, and the small things my grandmother never wrote down.
            </p>
          </div>
          <div className="col-span-12 hidden lg:col-span-3 lg:col-start-10 lg:block">
            <div className="relative">
              <div aria-hidden className="absolute -inset-10 text-zari-500 opacity-25 [mask-image:radial-gradient(closest-side,black_30%,transparent)]">
                <Jaali id="recipes-hero-jaali" size={40} />
              </div>
              <div className="relative animate-curtain" style={{ animationDelay: "200ms" }}>
                <ArchFrame kind="jharokha" ratio="3x4" outline={12}>
                  <Image
                    src="/images/masala-dabba-indigo.jpg"
                    alt="A steel masala dabba of whole and ground spices on indigo cloth"
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="22vw"
                    className="animate-settle object-cover"
                  />
                </ArchFrame>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="theme-day">
        <RecipeExplorer recipes={recipes} />
      </section>
    </>
  );
}
