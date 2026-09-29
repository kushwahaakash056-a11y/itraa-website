import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, RotateCw, Star } from "lucide-react";
import { formatINR, products } from "@/lib/itraa-data";
import { useShop } from "@/lib/shop-store";
import { useReveal } from "@/lib/use-reveal";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — ITRAA" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} ${product.subtitle} — ITRAA`;
    const description = product.description.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

const accordionKeys = ["Description", "Ingredients", "Fragrance Notes", "Shipping", "Reviews"];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist, markViewed } = useShop();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<string | null>("Description");
  const [spin, setSpin] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.size);
  const root = useReveal<HTMLDivElement>({ y: 40, stagger: 0.08 });

  useEffect(() => {
    markViewed(product.slug);
    setActive(0);
    setSelectedSize(product.size);
  }, [product.slug, markViewed]);

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const wished = wishlist.includes(product.slug);
  const gallery = product.gallery;
  const selectedVariant =
    product.variants.find((variant) => variant.size === selectedSize) ?? product.variants[0]!;

  return (
    <div ref={root} className="pb-32 pt-32">
      <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="group relative overflow-hidden rounded-[28px] bg-secondary">
            <img
              src={gallery[active] ?? product.image}
              alt={`${product.name} bottle`}
              width={1200}
              height={1500}
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.35]"
              style={{ transform: `rotate(${spin}deg)` }}
            />
            <button
              onClick={() => setSpin((s) => s + 45)}
              className="glass-luxe absolute bottom-5 right-5 flex items-center gap-2 rounded-full px-5 py-2.5 font-button text-[10px] uppercase tracking-[0.2em]"
            >
              <RotateCw className="h-3.5 w-3.5" strokeWidth={1.2} />
              360° view
            </button>
          </div>
          <div className="mt-4 flex gap-4">
            {gallery.map((src: string, i: number) => (
              <button
                key={src + i}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`overflow-hidden rounded-xl border transition-colors ${
                  active === i ? "border-gold" : "border-border"
                }`}
              >
                <img src={src} alt="" loading="lazy" className="h-24 w-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p data-reveal className="eyebrow">
            {product.collection} Collection
          </p>
          <h1
            data-reveal
            className="mt-5 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02]"
          >
            {product.name}
          </h1>
          <p data-reveal className="mt-3 font-serif text-lg text-muted-foreground">
            {product.subtitle} · {selectedVariant.size}
          </p>

          <div data-reveal className="mt-6 flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(product.rating) ? "fill-gold text-gold" : "text-border"
                  }`}
                  strokeWidth={1}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.rating} · {product.reviews} reviews
            </span>
          </div>

          <p data-reveal className="mt-8 font-display text-4xl">
            {formatINR(selectedVariant.price)}
          </p>

          <div data-reveal className="mt-8">
            <p className="eyebrow">Choose size</p>
            <div className="mt-4 grid max-w-md grid-cols-3 gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.size}
                  type="button"
                  onClick={() => setSelectedSize(variant.size)}
                  aria-pressed={selectedSize === variant.size}
                  className={`rounded-xl border px-3 py-3 text-center transition-colors ${
                    selectedSize === variant.size
                      ? "border-gold bg-gold/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-gold"
                  }`}
                >
                  <span className="block font-button text-[10px] uppercase tracking-[0.16em]">
                    {variant.size}
                  </span>
                  <span className="mt-1 block text-xs">{formatINR(variant.price)}</span>
                </button>
              ))}
            </div>
          </div>

          <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-5 rounded-full border border-border px-5 py-3">
              <button aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="h-3.5 w-3.5" strokeWidth={1.4} />
              </button>
              <span className="font-button text-xs">{qty}</span>
              <button aria-label="Increase" onClick={() => setQty((q) => q + 1)}>
                <Plus className="h-3.5 w-3.5" strokeWidth={1.4} />
              </button>
            </div>
            <button className="btn-luxe" onClick={() => addToCart(product.slug, qty, selectedVariant.size)}>
              Add to cart
            </button>
            <button className="btn-ghost-luxe" onClick={() => addToCart(product.slug, qty, selectedVariant.size)}>
              Buy now
            </button>
            <button
              aria-label="Wishlist"
              onClick={() => toggleWishlist(product.slug)}
              className="grid h-12 w-12 place-items-center rounded-full border border-border"
            >
              <Heart
                className={`h-4 w-4 ${wished ? "fill-gold text-gold" : ""}`}
                strokeWidth={1.2}
              />
            </button>
          </div>

          <div data-reveal className="mt-14 border-t border-border">
            {accordionKeys.map((key) => {
              const isOpen = open === key;
              return (
                <div key={key} className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : key)}
                    className="flex w-full items-center justify-between py-6 text-left"
                  >
                    <span className="font-serif text-lg">{key}</span>
                    <Plus
                      className={`h-4 w-4 transition-transform duration-500 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      strokeWidth={1.2}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 text-sm leading-[1.9] text-muted-foreground">
                        {key === "Description" && product.description}
                        {key === "Ingredients" && product.ingredients}
                        {key === "Shipping" && product.shipping}
                        {key === "Fragrance Notes" && (
                          <ul className="space-y-2">
                            <li>Top — {product.notes.top.join(", ")}</li>
                            <li>Heart — {product.notes.heart.join(", ")}</li>
                            <li>Base — {product.notes.base.join(", ")}</li>
                          </ul>
                        )}
                        {key === "Reviews" && (
                          <p>
                            {product.reviews} verified reviews with an average of {product.rating}{" "}
                            out of 5. Most mentioned: longevity, sillage and packaging.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section className="shell mt-32">
        <p className="eyebrow">You may also wear</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {related.map((p) => (
            <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} className="group">
              <div className="overflow-hidden rounded-[22px] bg-secondary">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                />
              </div>
              <p className="mt-5 font-serif text-xl">{p.name}</p>
              <p className="text-xs text-muted-foreground">From {formatINR(p.price)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Sticky add to cart */}
      <div className="glass-luxe fixed inset-x-0 bottom-0 z-[105] grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t px-5 py-4 lg:hidden">
        <div className="min-w-0">
          <p className="truncate font-serif text-base">{product.name}</p>
          <p className="text-xs text-muted-foreground">
            {selectedVariant.size} · {formatINR(selectedVariant.price)}
          </p>
        </div>
        <button
          onClick={() => addToCart(product.slug, qty, selectedVariant.size)}
          className="shrink-0 rounded-full bg-foreground px-6 py-3 font-button text-[10px] uppercase tracking-[0.2em] text-background"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
