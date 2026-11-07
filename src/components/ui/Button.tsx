import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon, ArrowUpRightIcon, PlayIcon } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "text";
type Icon = "arrow" | "external" | "play" | "none";

const base =
  "group/btn inline-flex items-center gap-3 text-[0.75rem] font-medium uppercase tracking-[0.2em] transition-[background-color,color,border-color] duration-300 ease-out";

const variants: Record<Variant, string> = {
  solid: "h-12 px-7 bg-primary text-on-primary hover:bg-[color-mix(in_oklab,var(--primary)_86%,var(--fg))]",
  outline: "h-12 px-7 border border-line-strong text-fg hover:border-fg",
  text: "py-1 text-fg link-draw",
};

function IconFor({ icon }: { icon: Icon }) {
  const cls = "size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-royal)]";
  if (icon === "external")
    return <ArrowUpRightIcon weight="light" className={cn(cls, "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5")} />;
  if (icon === "play") return <PlayIcon weight="fill" className={cn(cls, "size-3.5")} />;
  if (icon === "arrow") return <ArrowRightIcon weight="light" className={cn(cls, "group-hover/btn:translate-x-1")} />;
  return null;
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: Icon;
  className?: string;
}

export function ButtonLink({ href, children, variant = "solid", icon = "arrow", className }: ButtonLinkProps) {
  const external = /^https?:/.test(href);
  const content = (
    <>
      {icon === "play" && <IconFor icon="play" />}
      <span>{children}</span>
      {icon !== "play" && <IconFor icon={external && icon === "arrow" ? "external" : icon} />}
    </>
  );
  const cls = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export const buttonClasses = (variant: Variant = "solid", className?: string) =>
  cn(base, variants[variant], className);
