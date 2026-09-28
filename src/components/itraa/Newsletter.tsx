import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useReveal } from "@/lib/use-reveal";

export function Newsletter() {
  const [sent, setSent] = useState(false);
  const root = useReveal<HTMLElement>({ y: 40, stagger: 0.09 });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section ref={root} className="shell py-28 lg:py-40">
      <div className="relative overflow-hidden rounded-[36px] bg-surface px-7 py-20 sm:px-16 lg:px-24">
        <div
          aria-hidden
          className="blob drift pointer-events-none absolute -left-24 -top-24 h-[360px] w-[360px] bg-accent/60"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p data-reveal className="eyebrow">
            09 — Newsletter
          </p>
          <h2
            data-reveal
            className="mt-6 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02]"
          >
            Become Part of <span className="italic text-gold">ITRAA.</span>
          </h2>
          <p data-reveal className="mx-auto mt-6 max-w-lg text-sm text-muted-foreground">
            Private launches, layering notes from our perfumer, and first access to numbered
            editions. Four letters a year — never more.
          </p>

          <form
            data-reveal
            onSubmit={onSubmit}
            className="mx-auto mt-12 grid max-w-xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border pb-4"
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="your@email.com"
              className="min-w-0 bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground/70 sm:text-lg"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform duration-500 hover:scale-105"
            >
              {sent ? (
                <Check className="h-4 w-4" strokeWidth={1.4} />
              ) : (
                <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
              )}
            </button>
          </form>
          {sent && (
            <p className="mt-4 font-button text-[10px] uppercase tracking-[0.24em] text-gold">
              Welcome to the maison
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
