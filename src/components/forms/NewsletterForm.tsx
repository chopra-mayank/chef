"use client";

import { useState, type FormEvent } from "react";
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/**
 * Newsletter sign-up. PLACEHOLDER: not wired to a mailing service yet —
 * connect to Mailchimp / ConvertKit / Resend in `onSubmit`.
 */
export function NewsletterForm({
  id,
  className,
  tone = "day",
}: {
  id: string;
  className?: string;
  tone?: "day" | "night";
}) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email")?.toString().trim() ?? "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address, like name@example.com.");
      return;
    }
    setError(null);
    setState("sending");
    await new Promise((r) => setTimeout(r, 700));
    setState("done");
  }

  if (state === "done") {
    return (
      <p role="status" className={cn("flex items-center gap-3 text-fg", className)}>
        <span className="grid size-8 place-items-center rounded-full border border-line-strong">
          <CheckIcon className="size-4 text-accent" />
        </span>
        Thank you — the first letter is on its way.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={className}>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div
        className={cn(
          "flex items-center border-b transition-colors focus-within:border-fg",
          tone === "night" ? "border-line-strong" : "border-ink-900/30",
        )}
      >
        <input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Your email address"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-14 min-w-0 flex-1 bg-transparent text-body text-fg placeholder:text-fg-subtle focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="group flex h-14 items-center gap-2 pl-4 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-fg disabled:opacity-50"
        >
          {state === "sending" ? "Sending…" : "Subscribe"}
          <ArrowRightIcon weight="light" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className={cn("mt-3 text-small", tone === "night" ? "text-gulabi-300" : "text-laal-600")}
        >
          {error}
        </p>
      )}
    </form>
  );
}
