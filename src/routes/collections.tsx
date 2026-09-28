import { createFileRoute, Link } from "@tanstack/react-router";
import { collections, products } from "@/lib/itraa-data";
import { useReveal } from "@/lib/use-reveal";

const title = "Collections — ITRAA Parfums";
const description =
  "Four chapters of the ITRAA maison: Floral, Oud, Fresh and Signature. Each composed from slowly macerated absolutes.";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const root = useReveal<HTMLDivElement>({ y: 50, stagger: 0.1 });

  return (
    <div ref={root} className="shell pb-32 pt-40">
      <p data-reveal className="eyebrow">
        The Maison
      </p>
      <h1
        data-reveal
        className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6.4vw,5.4rem)] leading-[1.02]"
      >
        Collections composed as <span className="italic text-gold">chapters</span>
      </h1>

      <div className="mt-24 space-y-28">
        {collections.map((collection, i) => (
          <article
            key={collection.slug}
            data-reveal
            className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
              i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
            }`}
          >
            <figure className="overflow-hidden rounded-[28px] bg-secondary">
              <img
                src={collection.image}
                alt={`${collection.name} collection`}
                loading="lazy"
                width={900}
                height={1200}
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1600ms] hover:scale-105"
              />
            </figure>
            <div>
              <p className="eyebrow">{collection.index}</p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.4rem)]">{collection.name}</h2>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-gold">
                {collection.tagline}
              </p>
              <div className="gold-rule my-8 max-w-[160px]" />
              <p className="max-w-md text-sm leading-[1.9] text-muted-foreground">
                {collection.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {products
                  .filter((product) => product.collection === collection.name)
                  .map((product) => (
                    <Link
                      key={product.slug}
                      to="/product/$slug"
                      params={{ slug: product.slug }}
                      className="rounded-full border border-border px-4 py-2 font-button text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-gold hover:text-foreground"
                    >
                      {product.name}
                    </Link>
                  ))}
              </div>
              <Link to="/shop" className="btn-ghost-luxe mt-10">
                Shop {collection.name}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section
        data-reveal
        className="mt-28 rounded-[30px] bg-surface px-6 py-14 text-center sm:px-12 lg:py-20"
      >
        <p className="eyebrow">Find your chapter</p>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight">
          Begin with instinct. <span className="italic text-gold">Stay for the drydown.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-[1.9] text-muted-foreground">
          Floral wears luminous, Oud deepens after dusk, Fresh stays close and clean, while
          Signature balances woods, iris and amber for every hour.
        </p>
        <Link to="/contact" className="btn-luxe mt-9">
          Ask a fragrance advisor
        </Link>
      </section>
    </div>
  );
}
