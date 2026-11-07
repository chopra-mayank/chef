import type { ReactNode } from "react";
import { Rosette } from "@/components/ornaments/Patterns";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  hi,
  className,
}: {
  children: ReactNode;
  hi?: string;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-accent", className)}>
      <Rosette className="size-3" />
      <span>{children}</span>
      {hi && (
        <span lang="hi" className="text-[0.95rem] leading-none opacity-80">
          {hi}
        </span>
      )}
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow: ReactNode;
  hi?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  hi,
  title,
  intro,
  align = "left",
  className,
  titleClassName,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className={cn(align === "center" && "mx-auto flex flex-col items-center text-center", className)}
    >
      <Eyebrow hi={hi} className={cn(align === "center" && "justify-center")}>
        {eyebrow}
      </Eyebrow>
      <Tag className={cn("mt-6 text-d2", titleClassName)}>{title}</Tag>
      {intro && <p className="mt-6 max-w-[52ch] text-lede text-fg-muted">{intro}</p>}
    </div>
  );
}
