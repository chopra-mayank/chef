import Link from "next/link";
import { ArchFrame } from "@/components/ornaments/Arch";
import { Jaali } from "@/components/ornaments/Patterns";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="theme-day relative overflow-hidden pt-[132px]">
      <div className="container-x grid min-h-[78svh] grid-cols-12 items-center gap-x-6 gap-y-14 pb-24">
        <div className="col-span-12 lg:col-span-6">
          <p className="eyebrow text-accent">404 · रास्ता भटक गए?</p>
          <h1 className="mt-8 text-d1">
            This dish isn’t <em>on the menu</em>.
          </h1>
          <p className="mt-8 max-w-[44ch] text-lede text-fg-muted">
            The page you were looking for has moved, or perhaps it was never cooked. Let us take you somewhere
            delicious instead.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/recipes">Browse the recipes</ButtonLink>
            <ButtonLink href="/" variant="outline">
              Back home
            </ButtonLink>
          </div>
          <p className="mt-10 text-small text-fg-subtle">
            Or try a favourite: <Link href="/recipes/laal-maas" className="link-rule">Laal Maas</Link>,{" "}
            <Link href="/recipes/dal-baati-churma" className="link-rule">Dal Baati Churma</Link>,{" "}
            <Link href="/recipes/ghevar" className="link-rule">Ghevar</Link>.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <div className="relative mx-auto max-w-[400px]">
            <ArchFrame kind="jharokha" ratio="3x4" outline={14} innerClassName="theme-night">
              <Jaali id="nf-jaali" size={40} className="text-zari-300 opacity-30" />
              <span className="absolute inset-0 grid place-items-center font-display text-[7rem] font-light italic text-zari-300">
                404
              </span>
            </ArchFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
