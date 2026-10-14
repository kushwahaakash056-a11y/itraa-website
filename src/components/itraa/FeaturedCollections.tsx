import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Plus, Star } from "lucide-react";
import { formatINR, getDiscountPercent, products } from "@/lib/itraa-data";
import { PriceDisplay } from "@/components/itraa/PriceDisplay";
import { useShop } from "@/lib/shop-store";
import { useReveal, useSplitReveal } from "@/lib/use-reveal";
import type { Product } from "@/lib/itraa-data";

function FeaturedProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block overflow-hidden rounded-[24px] bg-secondary"
      >
        <img
          src={product.image}
          alt={`${product.name} by ITRAA`}
          loading="lazy"
          width={900}
          height={1200}
          draggable={false}
          className="aspect-square w-full select-none object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] sm:aspect-[4/5]"
        />
      </Link>

      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="link-underline mt-5 inline-block font-serif text-xl"
      >
        {product.name}
      </Link>
      <p className="mt-1 text-xs text-muted-foreground">Inspired By {product.inspiredBy}</p>

      <PriceDisplay
        oldPrice={product.oldPrice}
        price={product.price}
        prefix="From"
        className="mt-2"
      />

      <div className="mt-3 flex items-center gap-2">
        <div className="flex gap-0.5" aria-hidden="true">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-3 w-3 ${index < Math.round(product.rating) ? "fill-gold text-gold" : "text-border"}`}
              strokeWidth={1}
            />
          ))}
        </div>
        <span className="text-[11px] text-muted-foreground">
          {product.rating} · {product.reviews} reviews
        </span>
      </div>
    </article>
  );
}

function MobileProductCard({ product }: { product: Product }) {
  const { addToCart } = useShop();
  const scentNote = product.notes.top[0] ?? product.collection;

  return (
    <article data-reveal className="min-w-0 overflow-hidden rounded-xl bg-card shadow-soft">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block bg-secondary">
        <img
          src={product.image}
          alt={`${product.name} ${product.size} by ITRAA`}
          loading="lazy"
          width={600}
          height={600}
          className="aspect-square w-full object-cover"
        />
      </Link>

      <div className="px-2.5 pb-2.5 pt-2">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="block min-h-8 font-button text-[10px] font-semibold uppercase leading-[1.35] tracking-[0.025em] text-foreground"
        >
          {product.name} — {product.size}
        </Link>
        <p className="mt-0.5 truncate font-button text-[7px] uppercase tracking-[0.04em] text-muted-foreground">
          Inspired By {product.inspiredBy}
        </p>

        <div className="mt-1 flex min-h-4 flex-wrap gap-1">
          <span className="rounded border border-foreground/35 px-1 py-px font-button text-[6px] uppercase tracking-[0.08em]">
            {product.subtitle.includes("Extrait") ? "Extrait" : "EDP"}
          </span>
          <span className="max-w-full truncate rounded border border-foreground/35 px-1 py-px font-button text-[6px] uppercase tracking-[0.08em]">
            {scentNote}
          </span>
        </div>

        <div className="mt-2 flex items-end gap-1.5">
          <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-1 gap-y-0.5 font-button">
            <span className="text-[11px] font-semibold text-foreground">
              {formatINR(product.price)}
            </span>
            <span className="text-[8px] text-muted-foreground line-through">
              {formatINR(product.oldPrice)}
            </span>
            <span className="rounded-sm bg-foreground px-1 py-0.5 text-[6px] font-semibold tracking-[0.03em] text-background">
              {getDiscountPercent(product.oldPrice, product.price)}% OFF
            </span>
          </div>
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => addToCart(product.slug)}
            className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-foreground text-background transition-transform active:scale-90"
          >
            <Plus className="h-3 w-3" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function FeaturedCollections() {
  const root = useReveal<HTMLElement>({ y: 60, stagger: 0.12 });
  const heading = useSplitReveal<HTMLHeadingElement>();
  const rail = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  const updateRailControls = useCallback(() => {
    const element = rail.current;
    if (!element) return;
    setCanGoBack(element.scrollLeft > 4);
    setCanGoForward(element.scrollLeft + element.clientWidth < element.scrollWidth - 4);
  }, []);

  const moveRail = (direction: -1 | 1) => {
    const element = rail.current;
    if (!element) return;
    element.scrollBy({ left: element.clientWidth * 0.82 * direction, behavior: "smooth" });
  };

  useEffect(() => {
    const element = rail.current;
    if (!element) return;

    updateRailControls();

    const scrollHorizontally = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const atStart = element.scrollLeft <= 0;
      const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;
      if ((event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) return;

      event.preventDefault();
      element.scrollLeft += event.deltaY;
    };

    element.addEventListener("wheel", scrollHorizontally, { passive: false });
    element.addEventListener("scroll", updateRailControls, { passive: true });
    window.addEventListener("resize", updateRailControls);
    return () => {
      element.removeEventListener("wheel", scrollHorizontally);
      element.removeEventListener("scroll", updateRailControls);
      window.removeEventListener("resize", updateRailControls);
    };
  }, [updateRailControls]);

  return (
    <section ref={root} id="collections" className="shell pb-20 pt-24 md:py-28 lg:py-40">
      <div className="flex items-end justify-between gap-4 md:hidden">
        <div>
          <p data-reveal className="eyebrow">
            Featured
          </p>
          <h2 data-reveal className="mt-3 font-display text-3xl leading-none">
            Shop the <span className="italic text-gold">collection</span>
          </h2>
        </div>
        <Link
          data-reveal
          to="/collections"
          className="shrink-0 font-button text-[8px] uppercase tracking-[0.15em] text-muted-foreground underline underline-offset-4"
        >
          View all
        </Link>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-2.5 md:hidden">
        {products.map((product) => (
          <MobileProductCard key={product.slug} product={product} />
        ))}
      </div>

      <div className="hidden gap-8 md:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-end">
        <div>
          <p data-reveal className="eyebrow">
            Featured
          </p>
          <h2
            ref={heading}
            className="mt-6 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.02]"
          >
            <span data-line className="block">
              Eight ways to be
            </span>
            <span data-line className="block italic text-gold">
              remembered.
            </span>
          </h2>
        </div>
        <p
          data-reveal
          className="hidden max-w-sm text-sm leading-relaxed text-muted-foreground sm:block lg:pb-4"
        >
          Explore every ITRAA fragrance in one smooth carousel—from Velocity to Vanilla Noir, each
          available in 30 ml, 50 ml and 100 ml.
        </p>
      </div>

      <div
        ref={rail}
        className="no-scrollbar mt-16 hidden overflow-x-auto overscroll-x-contain scroll-smooth pb-2 md:block"
        data-reveal
      >
        <div className="flex snap-x snap-mandatory gap-6">
          {products.map((product) => (
            <div
              key={product.slug}
              className="w-[88%] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
            >
              <FeaturedProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div
        data-reveal
        className="mt-10 hidden flex-wrap items-center justify-between gap-5 md:flex"
      >
        <p className="font-button text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Swipe, scroll or use the arrows to explore
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous featured fragrances"
            disabled={!canGoBack}
            onClick={() => moveRail(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.3} />
          </button>
          <button
            type="button"
            aria-label="Next featured fragrances"
            disabled={!canGoForward}
            onClick={() => moveRail(1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.3} />
          </button>
          <Link to="/collections" className="btn-ghost-luxe ml-1">
            View all eight
          </Link>
        </div>
      </div>
    </section>
  );
}
