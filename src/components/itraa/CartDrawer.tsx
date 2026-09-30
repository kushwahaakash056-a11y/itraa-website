import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useShop } from "@/lib/shop-store";
import { formatINR, products } from "@/lib/itraa-data";

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, setQty, removeFromCart, cartTotal } = useShop();
  const whatsappMessage = [
    "Hello ITRAA, I would like to place this order:",
    "",
    ...cart.flatMap((line) => {
      const product = products.find((item) => item.slug === line.slug);
      if (!product) return [];
      const unitPrice =
        product.variants.find((variant) => variant.size === line.size)?.price ?? product.price;
      return [
        `• ${product.name} — ${line.size} × ${line.qty} = ${formatINR(unitPrice * line.qty)}`,
      ];
    }),
    "",
    `Total: ${formatINR(cartTotal)}`,
  ].join("\n");
  const whatsappCheckoutUrl = `https://wa.me/917852879790?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[150] bg-foreground/25 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[160] flex w-full max-w-[440px] flex-col bg-card"
          >
            <div className="flex items-center justify-between border-b border-border px-7 py-6">
              <span className="eyebrow">Your selection</span>
              <button
                aria-label="Close cart"
                onClick={() => setCartOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
              >
                <X className="h-4 w-4" strokeWidth={1.2} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-7 py-6">
              {cart.length === 0 && (
                <p className="mt-16 text-center font-display text-2xl text-muted-foreground">
                  Your cart is quietly empty.
                </p>
              )}
              <ul className="space-y-7">
                {cart.map((line) => {
                  const product = products.find((p) => p.slug === line.slug);
                  if (!product) return null;
                  return (
                    <li key={`${line.slug}-${line.size}`} className="grid grid-cols-[80px_minmax(0,1fr)] gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-24 w-20 rounded-xl object-cover"
                      />
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate font-serif text-lg">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{line.size}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(line.slug, line.size)}
                            className="font-button text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-3 rounded-full border border-border px-3 py-1.5">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => setQty(line.slug, line.size, line.qty - 1)}
                            >
                              <Minus className="h-3.5 w-3.5" strokeWidth={1.4} />
                            </button>
                            <span className="font-button text-xs">{line.qty}</span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => setQty(line.slug, line.size, line.qty + 1)}
                            >
                              <Plus className="h-3.5 w-3.5" strokeWidth={1.4} />
                            </button>
                          </div>
                          <span className="font-button text-xs tracking-[0.18em]">
                            {formatINR(
                              (product.variants.find((item) => item.size === line.size)?.price ??
                                product.price) * line.qty,
                            )}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-border px-7 py-6">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="font-display text-3xl">{formatINR(cartTotal)}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Complimentary express shipping and gift wrapping included.
              </p>
              {cart.length > 0 ? (
                <a
                  href={whatsappCheckoutUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-luxe mt-6 w-full"
                >
                  Proceed to checkout on WhatsApp
                </a>
              ) : (
                <button disabled className="btn-luxe mt-6 w-full cursor-not-allowed opacity-50">
                  Proceed to checkout on WhatsApp
                </button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
