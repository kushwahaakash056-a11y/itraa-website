import { Link } from "@tanstack/react-router";
import { Eye, Heart, Star } from "lucide-react";
import { products } from "@/lib/itraa-data";
import { PriceDisplay } from "@/components/itraa/PriceDisplay";
import { useShop } from "@/lib/shop-store";
import { useReveal } from "@/lib/use-reveal";
import type { Product } from "@/lib/itraa-data";

export function BestSellers() {
  const root = useReveal<HTMLElement>({ y: 56, stagger: 0.1 });
  const featuredSlugs = ["velocity", "vanilla-noir", "arabica", "obsidian"];
  const bestSellers = featuredSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));

  return (
    <section ref={root} id="bestsellers" className="hidden py-28 md:block lg:py-40">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p data-reveal className="eyebrow">
              Best Sellers
            </p>
            <h2
              data-reveal
              className="mt-6 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.03]"
            >
              The most <span className="italic text-gold">worn</span>
            </h2>
          </div>
          <Link
            data-reveal
            to="/shop"
            className="link-underline font-button text-[11px] uppercase tracking-[0.24em]"
          >
            View all fragrances
          </Link>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              showVariants={false}
              showReviews={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({
  product,
  showQuickAdd = true,
  showVariants = true,
  showReviews = true,
}: {
  product: Product;
  showQuickAdd?: boolean;
  showVariants?: boolean;
  showReviews?: boolean;
}) {
  const { addToCart, toggleWishlist, wishlist, setQuickView } = useShop();
  const wished = wishlist.includes(product.slug);

  return (
    <article data-reveal className="group">
      <div className="relative overflow-hidden rounded-[24px] bg-secondary">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <img
            src={product.image}
            alt={`${product.name} ${product.subtitle} by ITRAA`}
            loading="lazy"
            width={900}
            height={1200}
            className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
          />
        </Link>

        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.slug)}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-card/85 backdrop-blur transition-transform duration-500 hover:scale-110"
        >
          <Heart
            className={`h-4 w-4 ${wished ? "fill-gold text-gold" : "text-foreground"}`}
            strokeWidth={1.2}
          />
        </button>

        <div
          className={`absolute bottom-4 flex translate-y-6 gap-2 opacity-0 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 ${showQuickAdd ? "inset-x-4" : "right-4"}`}
        >
          {showQuickAdd && (
            <button
              onClick={() => addToCart(product.slug)}
              className="flex-1 rounded-full bg-foreground px-4 py-3 font-button text-[10px] uppercase tracking-[0.22em] text-background"
            >
              Add to cart
            </button>
          )}
          <button
            aria-label="Quick view"
            onClick={() => setQuickView(product)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card"
          >
            <Eye className="h-4 w-4" strokeWidth={1.2} />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="link-underline font-serif text-xl"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">{product.subtitle}</p>
        </div>
        <PriceDisplay
          oldPrice={product.oldPrice}
          price={product.price}
          prefix="From"
          className="justify-end font-button tracking-[0.08em]"
        />
      </div>

      {showVariants && (
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {product.variants.map((variant) => (
            <div key={variant.size} className="rounded-lg bg-secondary px-2 py-2 text-center">
              <p className="font-button text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                {variant.size}
              </p>
              <PriceDisplay
                oldPrice={variant.oldPrice}
                price={variant.price}
                size="xs"
                className="mt-1 justify-center"
              />
            </div>
          ))}
        </div>
      )}

      {showReviews && (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.round(product.rating) ? "fill-gold text-gold" : "text-border"}`}
                strokeWidth={1}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">
            {product.rating} · {product.reviews} reviews
          </span>
        </div>
      )}
    </article>
  );
}
