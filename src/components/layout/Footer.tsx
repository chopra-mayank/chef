import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { Chhatri, Jaali, Leheriya } from "@/components/ornaments/Patterns";
import { nav, site } from "@/content/site";

export function Footer() {
  const year = 2026;
  return (
    <footer className="theme-night relative overflow-hidden" data-print="hide">
      <Leheriya id="footer-leheriya" className="h-1.5" />
      <Jaali id="footer-jaali" size={80} className="text-zari-300 opacity-[0.045]" />

      <div className="container-x relative pb-10 pt-24 lg:pt-28">
        {/* 1 · The chhatri, the greeting and the statement, centred */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Chhatri className="h-24 w-auto text-accent-soft lg:h-28" />
          <p lang="hi" className="mt-8 text-xl text-accent">
            {site.greeting.hi}
          </p>
          <p className="mt-4 font-display text-d2 font-light italic">
            Come for the food.
            <br />
            <span className="not-italic">Stay for the story.</span>
          </p>
        </div>

        {/* 2 · Links */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-14 border-t border-line pt-14 text-center md:grid-cols-3 lg:mt-24">
          <div>
            <p className="eyebrow text-fg-subtle">Explore</p>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-draw text-fg-muted transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-fg-subtle">Follow</p>
            <ul className="mt-6 space-y-3">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw text-fg-muted transition-colors hover:text-fg"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="eyebrow text-fg-subtle">The restaurant</p>
            <a
              href={site.restaurant.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 font-display text-2xl"
            >
              {site.restaurant.name}
              <ArrowUpRightIcon
                weight="light"
                className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <p className="mx-auto mt-3 max-w-[26ch] text-small text-fg-muted">{site.restaurant.address}</p>
            <p className="eyebrow mt-8 text-fg-subtle">Write</p>
            <a
              href={`mailto:${site.email}`}
              className="link-draw mt-3 inline-block break-words text-small text-fg-muted hover:text-fg"
            >
              {site.email}
            </a>
          </div>
        </div>

        {/* 3 · Copyright */}
        <p className="mx-auto mt-20 max-w-4xl border-t border-line pt-8 text-center text-[0.8125rem] text-fg-subtle lg:mt-24">
          © {year} {site.fullTitle}. Made in Jaipur.
        </p>
      </div>
    </footer>
  );
}
