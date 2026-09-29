import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/itraa-data";
import { ProductCard } from "@/components/itraa/BestSellers";
import { useReveal } from "@/lib/use-reveal";

const title = "Collections — ITRAA Parfums";
const description =
  "Discover all eight ITRAA fragrances, available in 30 ml, 50 ml and 100 ml sizes.";

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
        Eight scents, one <span className="italic text-gold">distinct aura</span>
      </h1>
      <p data-reveal className="mt-7 max-w-2xl text-sm leading-[1.9] text-muted-foreground">
        Explore the complete ITRAA collection—from luminous everyday signatures to deep premium
        extraits. Every fragrance is available in 30 ml, 50 ml and 100 ml.
      </p>

      <div className="mt-16 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <section
        data-reveal
        className="mt-28 rounded-[30px] bg-surface px-6 py-14 text-center sm:px-12 lg:py-20"
      >
        <p className="eyebrow">Find your signature</p>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight">
          Begin with instinct. <span className="italic text-gold">Stay for the drydown.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-[1.9] text-muted-foreground">
          Compare all eight compositions, choose your preferred size and discover the scent that
          feels unmistakably yours.
        </p>
        <Link to="/contact" className="btn-luxe mt-9">
          Ask a fragrance advisor
        </Link>
      </section>
    </div>
  );
}
