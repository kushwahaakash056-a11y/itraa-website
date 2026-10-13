import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { products } from "@/lib/itraa-data";
import { PriceDisplay } from "@/components/itraa/PriceDisplay";
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
    <section ref={root} id="collections" className="shell py-28 lg:py-40">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-end">
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
        className="no-scrollbar mt-16 overflow-x-auto overscroll-x-contain scroll-smooth pb-2"
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

      <div data-reveal className="mt-10 flex flex-wrap items-center justify-between gap-5">
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
