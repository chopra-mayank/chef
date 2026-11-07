"use client";

import { useState, type FormEvent } from "react";
import { ArrowRightIcon, CaretDownIcon, CheckIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

const TOPICS = [
  "Brand collaboration",
  "Private dining or event",
  "Masterclass or workshop",
  "Media or press",
  "Something else",
] as const;

type Errors = Partial<Record<"name" | "email" | "topic" | "message", string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!data.get("name")?.toString().trim()) errors.name = "Please tell us your name.";
  const email = data.get("email")?.toString().trim() ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter an email we can reply to, like name@example.com.";
  if (!data.get("topic")) errors.topic = "Choose what you’re writing about.";
  if ((data.get("message")?.toString().trim().length ?? 0) < 10)
    errors.message = "A line or two about what you have in mind helps us reply properly.";
  return errors;
}

const fieldCls =
  "peer h-14 w-full border-b bg-transparent pt-4 text-body text-fg placeholder:text-transparent focus:outline-none";
const labelCls =
  "pointer-events-none absolute left-0 top-4 origin-left text-fg-subtle transition-all duration-300 ease-[var(--ease-royal)] peer-focus:-translate-y-4 peer-focus:scale-[0.8] peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-[0.8]";

/** Enquiry form. PLACEHOLDER: not connected — wire `onSubmit` to email (e.g. Resend) or a form service. */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(new FormData(form));
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setState("sending");
    await new Promise((r) => setTimeout(r, 900));
    setState("sent");
  }

  if (state === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-6 py-10">
        <span className="grid size-14 place-items-center rounded-full border border-accent text-accent">
          <CheckIcon className="size-6" />
        </span>
        <p className="font-display text-d3">Thank you — your note is with the kitchen.</p>
        <p className="max-w-[44ch] text-fg-muted">We reply to every message within three working days.</p>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} role="alert" className="mt-2 text-small text-laal-600">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <div className="relative">
            <input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={cn(fieldCls, errors.name ? "border-laal-600" : "border-line-strong focus:border-fg")}
            />
            <label htmlFor="name" className={labelCls}>
              Your name <span aria-hidden>*</span>
            </label>
          </div>
          {err("name")}
        </div>
        <div>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(fieldCls, errors.email ? "border-laal-600" : "border-line-strong focus:border-fg")}
            />
            <label htmlFor="email" className={labelCls}>
              Email <span aria-hidden>*</span>
            </label>
          </div>
          {err("email")}
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <div className="relative">
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Phone"
              className={cn(fieldCls, "border-line-strong focus:border-fg")}
            />
            <label htmlFor="phone" className={labelCls}>
              Phone (optional)
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="topic" className="block pt-1 text-[0.8125rem] text-fg-subtle">
            I’m writing about <span aria-hidden>*</span>
          </label>
          <div className="relative">
            <select
              id="topic"
              name="topic"
              defaultValue=""
              aria-invalid={!!errors.topic}
              aria-describedby={errors.topic ? "topic-error" : undefined}
              className={cn(
                "h-10 w-full cursor-pointer appearance-none border-b bg-transparent pr-8 text-body text-fg focus:outline-none",
                errors.topic ? "border-laal-600" : "border-line-strong focus:border-fg",
              )}
            >
              <option value="" disabled>
                Choose one
              </option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <CaretDownIcon aria-hidden className="pointer-events-none absolute right-1 top-3 size-4 text-fg-subtle" />
          </div>
          {err("topic")}
        </div>
      </div>

      <div>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Message"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : "message-help"}
            className={cn(
              "peer w-full resize-y border-b bg-transparent pt-8 text-body text-fg placeholder:text-transparent focus:outline-none",
              errors.message ? "border-laal-600" : "border-line-strong focus:border-fg",
            )}
          />
          <label htmlFor="message" className={labelCls}>
            Tell us a little about it <span aria-hidden>*</span>
          </label>
        </div>
        {errors.message ? (
          err("message")
        ) : (
          <p id="message-help" className="mt-2 text-small text-fg-subtle">
            Dates, city and number of guests help for events.
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
        <p className="text-small text-fg-subtle">
          <span aria-hidden>*</span> Required
        </p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex h-12 items-center gap-3 bg-primary px-8 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-on-primary transition-opacity disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send to the kitchen"}
          <ArrowRightIcon weight="light" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
