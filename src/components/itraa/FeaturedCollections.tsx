import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/lib/itraa-data";
import { useReveal, useSplitReveal } from "@/lib/use-reveal";

export function FeaturedCollections() {
  const root = useReveal<HTMLElement>({ y: 60, stagger: 0.12 });
  const heading = useSplitReveal<HTMLHeadingElement>();

  return (
    <section ref={root} id="collections" className="shell py-28 lg:py-40">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-end">
        <div>
          <p data-reveal className="eyebrow">
            01 — Featured
          </p>
          <h2
            ref={heading}
            className="mt-6 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.02]"
          >
            <span data-line className="block">
              Four ways to be
            </span>
            <span data-line className="block italic text-gold">
              remembered.
            </span>
          </h2>
        </div>
        <p data-reveal className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:pb-4">
          Each collection is composed as a chapter — a distinct temperament, built from the same
          obsessive sourcing and the same restraint.
        </p>
      </div>

      <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((collection, i) => (
          <Link
            key={collection.slug}
            to="/collections"
            data-reveal
            className={`group block ${i % 2 === 1 ? "lg:mt-16" : ""}`}
          >
            <div className="relative overflow-hidden rounded-[26px] bg-secondary">
              <img
                src={collection.image}
                alt={`${collection.name} collection by ITRAA`}
                loading="lazy"
                width={900}
                height={1200}
                className="aspect-[3/4] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.09]"
              />
              <span className="absolute left-5 top-5 font-button text-[10px] tracking-[0.3em] text-background mix-blend-difference">
                {collection.index}
              </span>
              <span className="absolute bottom-5 right-5 grid h-11 w-11 translate-y-4 place-items-center rounded-full bg-card opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.2} />
              </span>
            </div>
            <div className="mt-6">
              <h3 className="font-serif text-2xl">{collection.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">
                {collection.tagline}
              </p>
              <div className="grid grid-rows-[0fr] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr]">
                <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="block pt-3">{collection.description}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
