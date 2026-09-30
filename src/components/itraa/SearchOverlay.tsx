import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useShop } from "@/lib/shop-store";
import { formatINR, products } from "@/lib/itraa-data";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useShop();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 3);
    return products.filter((p) =>
      `${p.name} ${p.collection} ${p.subtitle}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[150] glass-luxe"
        >
          <div className="shell flex h-full flex-col py-8">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Search ITRAA Perfum</span>
              <button
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"
              >
                <X className="h-5 w-5" strokeWidth={1.2} />
              </button>
            </div>

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 flex items-center gap-4 border-b border-border pb-6"
            >
              <Search className="h-6 w-6 text-muted-foreground" strokeWidth={1} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “oud”, “jasmin”, “fresh”…"
                className="w-full bg-transparent font-display text-3xl outline-none placeholder:text-muted-foreground/60 sm:text-5xl"
              />
            </motion.div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {results.map((product, i) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                >
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    onClick={() => setSearchOpen(false)}
                    className="group flex gap-4"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-24 w-20 rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-serif text-lg">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.collection}</p>
                      <p className="mt-2 font-button text-xs tracking-[0.18em]">
                        From {formatINR(product.price)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
              {results.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nothing found. Try another note or collection.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
