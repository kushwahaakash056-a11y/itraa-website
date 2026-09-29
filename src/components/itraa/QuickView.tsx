import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useShop } from "@/lib/shop-store";
import { formatINR } from "@/lib/itraa-data";

export function QuickView() {
  const { quickView, setQuickView, addToCart } = useShop();

  return (
    <AnimatePresence>
      {quickView && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickView(null)}
            className="fixed inset-0 z-[150] bg-foreground/30 backdrop-blur-[3px]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-[160] w-[min(920px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-card shadow-lift"
          >
            <button
              aria-label="Close quick view"
              onClick={() => setQuickView(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 hover:bg-secondary"
            >
              <X className="h-4 w-4" strokeWidth={1.2} />
            </button>
            <div className="grid md:grid-cols-2">
              <img
                src={quickView.image}
                alt={quickView.name}
                loading="lazy"
                className="h-64 w-full object-cover md:h-full"
              />
              <div className="p-8 sm:p-12">
                <p className="eyebrow">{quickView.collection} Collection</p>
                <h3 className="mt-4 font-display text-4xl">{quickView.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {quickView.description}
                </p>
                <div className="gold-rule my-7" />
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-3xl">From {formatINR(quickView.price)}</span>
                  <span className="text-xs text-muted-foreground">30 ml · 50 ml · 100 ml</span>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    className="btn-luxe"
                    onClick={() => {
                      addToCart(quickView.slug);
                      setQuickView(null);
                    }}
                  >
                    Add to cart
                  </button>
                  <Link
                    to="/product/$slug"
                    params={{ slug: quickView.slug }}
                    onClick={() => setQuickView(null)}
                    className="btn-ghost-luxe"
                  >
                    Full details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
