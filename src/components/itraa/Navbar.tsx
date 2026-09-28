import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/lib/shop-store";
import { collections } from "@/lib/itraa-data";

const links = [
  { label: "Home", to: "/" },
  { label: "Collections", to: "/collections" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { cartCount, wishlist, setCartOpen, setSearchOpen, theme, toggleTheme } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      onMouseLeave={() => setMega(false)}
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-700 ${
        scrolled || mega
          ? "glass-luxe border-b py-3 shadow-soft"
          : "border-b border-transparent py-6"
      }`}
    >
      <div className="shell grid grid-cols-[auto_1fr_auto] items-center gap-6">
        <Link
          to="/"
          className="font-display text-2xl leading-none tracking-[0.4em] text-foreground"
        >
          ITRAA
        </Link>

        <nav className="hidden justify-center gap-9 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onMouseEnter={() => setMega(link.label === "Collections")}
              activeProps={{ className: "text-foreground" }}
              className="link-underline font-button text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <IconButton label="Search" onClick={() => setSearchOpen(true)}>
            <Search className="h-[18px] w-[18px]" strokeWidth={1.2} />
          </IconButton>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
          >
            <Heart
              className={`h-[18px] w-[18px] ${wishlist.length ? "fill-gold text-gold" : ""}`}
              strokeWidth={1.2}
            />
            {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
          </Link>
          <span className="hidden sm:block">
            <IconButton label="Toggle theme" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-[18px] w-[18px]" strokeWidth={1.2} />
              ) : (
                <Sun className="h-[18px] w-[18px]" strokeWidth={1.2} />
              )}
            </IconButton>
          </span>
          <Link
            to="/contact"
            aria-label="Account"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary md:flex"
          >
            <User className="h-[18px] w-[18px]" strokeWidth={1.2} />
          </Link>
          <IconButton label="Cart" onClick={() => setCartOpen(true)}>
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.2} />
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </IconButton>
          <button
            aria-label="Menu"
            onClick={() => setMobile(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.2} />
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {mega && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="hidden border-t border-border/60 lg:block"
          >
            <div className="shell grid grid-cols-4 gap-6 py-10">
              {collections.map((collection) => (
                <Link
                  key={collection.slug}
                  to="/collections"
                  onClick={() => setMega(false)}
                  className="group"
                >
                  <div className="overflow-hidden rounded-2xl bg-secondary">
                    <img
                      src={collection.image}
                      alt={`${collection.name} collection`}
                      loading="lazy"
                      className="h-40 w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-4 font-serif text-lg">{collection.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{collection.tagline}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] bg-background lg:hidden"
          >
            <div className="shell flex h-full flex-col py-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl tracking-[0.4em]">ITRAA</span>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobile(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"
                >
                  <X className="h-5 w-5" strokeWidth={1.2} />
                </button>
              </div>
              <nav className="mt-16 flex flex-col gap-6">
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.5 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobile(false)}
                      className="font-display text-4xl text-foreground"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.5 }}
                >
                  <Link
                    to="/wishlist"
                    onClick={() => setMobile(false)}
                    className="flex items-center gap-4 font-display text-4xl text-foreground"
                  >
                    Wishlist
                    {wishlist.length > 0 && (
                      <span className="grid h-7 min-w-7 place-items-center rounded-full bg-gold px-2 font-button text-[10px] text-primary-foreground">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>
                </motion.div>
              </nav>
              <div className="gold-rule mt-auto" />
              <p className="eyebrow mt-6">Maison de Parfum — Est. 2019</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function IconButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
    >
      {children}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 font-button text-[9px] font-semibold text-primary-foreground">
      {children}
    </span>
  );
}
