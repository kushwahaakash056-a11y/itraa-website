import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/lib/itraa-data";
import { prefersReducedMotion } from "@/lib/smooth-scroll";
import { useReveal } from "@/lib/use-reveal";

/** Pinned, asymmetrical storytelling moment for the house signature. */
export function SignatureSection() {
  const root = useRef<HTMLElement | null>(null);
  const copy = useReveal<HTMLDivElement>({ y: 40, stagger: 0.1 });

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    if (window.innerWidth < 1024) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to("[data-sig-bottle]", {
        yPercent: -14,
        rotate: -3,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to("[data-sig-word]", {
        xPercent: -22,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden py-28 lg:py-44">
      <span
        data-sig-word
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[14%] whitespace-nowrap font-display text-[22vw] leading-none text-accent/45"
      >
        Signature
      </span>

      <div className="shell relative grid gap-14 lg:grid-cols-12 lg:items-center">
        <div ref={copy} className="order-2 lg:order-1 lg:col-span-4">
          <p data-reveal className="eyebrow">
            03 — Signature
          </p>
          <h2
            data-reveal
            className="mt-6 font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.05]"
          >
            Aurea <span className="italic text-gold">Parfum</span>
          </h2>
          <p data-reveal className="mt-6 text-sm leading-[1.9] text-muted-foreground">
            The composition that defines the house. Golden amber wrapped around powdered iris,
            grounded by sandalwood aged three years. Poured into hand-blown glass with a solid
            brass cap.
          </p>
          <dl data-reveal className="mt-9 space-y-4">
            {[
              ["Concentration", "Extrait · 28%"],
              ["Longevity", "12–14 hours"],
              ["Edition", "Numbered, 500 pieces"],
            ].map(([term, value]) => (
              <div
                key={term}
                className="flex items-baseline justify-between border-b border-border pb-3"
              >
                <dt className="font-button text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {term}
                </dt>
                <dd className="font-serif text-base">{value}</dd>
              </div>
            ))}
          </dl>
          <div data-reveal className="mt-10">
            <Link to="/product/$slug" params={{ slug: "elysian-sun" }} className="btn-luxe">
              Discover Aurea
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
          <div data-sig-bottle className="relative mx-auto max-w-[620px]">
            <img
              src={images.signatureHero}
              alt="Aurea Parfum sculptural bottle resting on cream silk"
              loading="lazy"
              width={1200}
              height={1408}
              className="w-full rounded-[30px] object-cover shadow-luxe"
            />
            <span className="absolute -left-6 top-10 hidden rotate-[-90deg] font-button text-[10px] uppercase tracking-[0.42em] text-muted-foreground lg:block">
              Edition No. 001
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
