import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { products } from "@/lib/itraa-data";
import { ProductCard } from "@/components/itraa/BestSellers";
import { useShop } from "@/lib/shop-store";
import { useReveal } from "@/lib/use-reveal";

const title = "Your Wishlist — ITRAA Parfums";
const description = "Return to the ITRAA fragrances you have saved for later.";

export const Route = createFileRoute("/wishlist")({
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
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, addToCart, toggleWishlist } = useShop();
  const root = useReveal<HTMLDivElement>({ y: 40, stagger: 0.08 });
  const saved = products.filter((product) => wishlist.includes(product.slug));

  return (
    <div ref={root} className="shell pb-32 pt-40">
      <p data-reveal className="eyebrow">
        Your saved fragrances
      </p>
      <h1 data-reveal className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1.02]">
        A collection <span className="italic text-gold">of your own</span>
      </h1>
      {saved.length ? (
        <>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-border py-5">
            <p className="text-sm text-muted-foreground">
              {saved.length} {saved.length === 1 ? "fragrance" : "fragrances"} saved on this device
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => saved.forEach((product) => addToCart(product.slug))}
                className="btn-luxe"
              >
                Add all to cart
              </button>
              <button
                onClick={() => saved.forEach((product) => toggleWishlist(product.slug))}
                className="btn-ghost-luxe"
              >
                Clear wishlist
              </button>
            </div>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {saved.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div data-reveal className="mt-16 border-y border-border py-16 text-center">
          <Heart className="mx-auto h-7 w-7 text-gold" strokeWidth={1.2} />
          <p className="mt-5 font-display text-3xl">Nothing saved just yet.</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Keep the fragrances you love close by saving them from the collection or boutique.
          </p>
          <Link to="/shop" className="btn-luxe mt-8 inline-flex">
            Explore the boutique
          </Link>
        </div>
      )}
    </div>
  );
}
