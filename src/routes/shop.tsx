import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { formatINR, products } from "@/lib/itraa-data";
import type { Product } from "@/lib/itraa-data";
import { ProductCard } from "@/components/itraa/BestSellers";
import { useShop } from "@/lib/shop-store";
import { useReveal } from "@/lib/use-reveal";

const title = "Shop All Fragrances — ITRAA Parfums";
const description =
  "Browse every ITRAA eau de parfum and extrait. Filter by collection, compare compositions and revisit recently viewed bottles.";

export const Route = createFileRoute("/shop")({
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
  component: ShopPage,
});

const filters = ["All", "Signature", "Oud", "Floral", "Fresh"] as const;

function ShopPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [compare, setCompare] = useState<string[]>([]);
  const { recentlyViewed, wishlist } = useShop();
  const root = useReveal<HTMLDivElement>({ y: 46, stagger: 0.08 });

  const visible = useMemo(
    () => (filter === "All" ? products : products.filter((p) => p.collection === filter)),
    [filter],
  );

  const compared = products.filter((p) => compare.includes(p.slug));

  return (
    <div ref={root} className="shell pb-32 pt-40">
      <p data-reveal className="eyebrow">
        The Boutique
      </p>
      <h1
        data-reveal
        className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1.02]"
      >
        Every bottle, <span className="italic text-gold">in one place</span>
      </h1>

      <div data-reveal className="mt-12 flex flex-wrap gap-3">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-full border px-6 py-2.5 font-button text-[10px] uppercase tracking-[0.22em] transition-colors ${
              filter === item
                ? "border-gold bg-gold/10 text-foreground"
                : "border-border text-muted-foreground hover:border-gold"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((product) => (
          <div key={product.slug}>
            <ProductCard product={product} showQuickAdd={false} />
            <ShopPurchaseControls product={product} />
            <label className="mt-4 flex cursor-pointer items-center gap-2 font-button text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <input
                type="checkbox"
                checked={compare.includes(product.slug)}
                onChange={() =>
                  setCompare((prev) =>
                    prev.includes(product.slug)
                      ? prev.filter((s) => s !== product.slug)
                      : [...prev, product.slug],
                  )
                }
                className="h-3.5 w-3.5 accent-[var(--gold)]"
              />
              Compare
            </label>
          </div>
        ))}
      </div>

      {compared.length > 1 && (
        <section className="mt-24 overflow-x-auto rounded-[24px] border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-5 eyebrow">Comparison</th>
                {compared.map((p) => (
                  <th key={p.slug} className="p-5 font-serif text-lg">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {(
                [
                  ["Collection", (p: (typeof products)[number]) => p.collection],
                  [
                    "Price",
                    (p: (typeof products)[number]) =>
                      p.variants.map((variant) => formatINR(variant.price)).join(" / "),
                  ],
                  [
                    "Size",
                    (p: (typeof products)[number]) =>
                      p.variants.map((variant) => variant.size).join(" / "),
                  ],
                  ["Rating", (p: (typeof products)[number]) => `${p.rating} / 5`],
                  ["Base notes", (p: (typeof products)[number]) => p.notes.base.join(", ")],
                ] as const
              ).map(([label, get]) => (
                <tr key={label} className="border-b border-border last:border-0">
                  <td className="p-5 font-button text-[10px] uppercase tracking-[0.2em]">
                    {label}
                  </td>
                  {compared.map((p) => (
                    <td key={p.slug} className="p-5">
                      {get(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {wishlist.length > 0 && (
        <section className="mt-24">
          <p className="eyebrow">Your wishlist</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products
              .filter((p) => wishlist.includes(p.slug))
              .map((p) => (
                <Link
                  key={p.slug}
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  className="group flex gap-4"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-24 w-20 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-serif text-lg">{p.name}</p>
                    <p className="text-xs text-muted-foreground">From {formatINR(p.price)}</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section className="mt-24">
          <p className="eyebrow">Recently viewed</p>
          <div className="mt-8 flex flex-wrap gap-6">
            {recentlyViewed.map((slug) => {
              const p = products.find((item) => item.slug === slug);
              if (!p) return null;
              return (
                <Link
                  key={slug}
                  to="/product/$slug"
                  params={{ slug }}
                  className="flex items-center gap-4 rounded-full border border-border py-2 pl-2 pr-6"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <span className="font-serif text-base">{p.name}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function ShopPurchaseControls({ product }: { product: Product }) {
  const { addToCart } = useShop();
  const [size, setSize] = useState(product.size);
  const [quantity, setQuantity] = useState(1);
  const selectedVariant =
    product.variants.find((variant) => variant.size === size) ?? product.variants[0]!;

  return (
    <div className="mt-4 rounded-2xl border border-border bg-card/60 p-3">
      <p className="font-button text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
        Select size
      </p>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {product.variants.map((variant) => (
          <button
            key={variant.size}
            type="button"
            aria-pressed={size === variant.size}
            onClick={() => setSize(variant.size)}
            className={`rounded-lg border px-1 py-2 font-button text-[9px] uppercase tracking-[0.08em] transition-colors ${
              size === variant.size
                ? "border-gold bg-gold/10 text-foreground"
                : "border-border text-muted-foreground hover:border-gold"
            }`}
          >
            {variant.size}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex h-10 items-center rounded-full border border-border">
          <button
            type="button"
            aria-label={`Decrease ${product.name} quantity`}
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="grid h-10 w-9 place-items-center"
          >
            <Minus className="h-3 w-3" strokeWidth={1.5} />
          </button>
          <span className="min-w-6 text-center font-button text-xs" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            aria-label={`Increase ${product.name} quantity`}
            onClick={() => setQuantity((value) => Math.min(10, value + 1))}
            className="grid h-10 w-9 place-items-center"
          >
            <Plus className="h-3 w-3" strokeWidth={1.5} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product.slug, quantity, selectedVariant.size)}
          className="flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-3 font-button text-[9px] uppercase tracking-[0.12em] text-background"
        >
          <ShoppingBag className="h-3.5 w-3.5 shrink-0" strokeWidth={1.3} />
          Add · {formatINR(selectedVariant.price * quantity)}
        </button>
      </div>
    </div>
  );
}
