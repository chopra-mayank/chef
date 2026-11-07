import { AccoladesSection } from "@/components/home/AccoladesSection";
import { Hero } from "@/components/home/Hero";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Philosophy } from "@/components/home/Philosophy";
import { PressSection } from "@/components/home/PressSection";
import { RajRasaSection } from "@/components/home/RajRasaSection";
import { RegionsAtlas } from "@/components/home/RegionsAtlas";
import { SignatureRecipes } from "@/components/home/SignatureRecipes";
import { VideosSection } from "@/components/home/VideosSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <SignatureRecipes />
      <RegionsAtlas />
      <VideosSection />
      <AccoladesSection />
      <PressSection />
      <RajRasaSection />
      <NewsletterSection />
    </>
  );
}
