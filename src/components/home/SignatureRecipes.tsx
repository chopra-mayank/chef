import { RecipeCard } from "@/components/recipes/RecipeCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { recipes, signatureRecipes } from "@/content/recipes";

/**
 * Five signature recipes as one aligned row of arches — like the arcade of a
 * haveli courtyard, with the centre window cusped. Swipes sideways on small screens.
 */
export function SignatureRecipes() {
  const five = signatureRecipes();
  const centre = Math.floor(five.length / 2);

  return (
    <section className="theme-sand section-y relative">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="From the rasoi"
            hi="रसोई"
            title={
              <>
                Signature <em>recipes</em>
              </>
            }
            intro="Five dishes that tell my story best — tested in my kitchen, written for yours."
          />
          <ButtonLink href="/recipes" variant="text" className="mb-2">
            All {recipes.length} recipes
          </ButtonLink>
        </div>

        <ul className="hide-scrollbar -mx-[clamp(1.25rem,4.2vw,4rem)] mt-16 flex snap-x snap-mandatory scroll-px-[clamp(1.25rem,4.2vw,4rem)] gap-5 overflow-x-auto px-[clamp(1.25rem,4.2vw,4rem)] pb-2 lg:mx-0 lg:mt-20 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 xl:gap-8">
          {five.map((r, i) => (
            <li key={r.slug} className="w-[68vw] max-w-[300px] shrink-0 snap-start sm:w-[40vw] lg:w-auto lg:max-w-none">
              <RecipeCard
                recipe={r}
                compact
                ratio="3x4"
                arch={i === centre ? "jharokha" : "mehrab"}
                delay={i * 90}
                sizes="(min-width: 1024px) 19vw, (min-width: 640px) 40vw, 68vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
