import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/lib/shop-store";
import { BrandLogo } from "./BrandLogo";

const links = [
  { label: "Home", to: "/" },
  { label: "Collections", to: "/collections" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { cartCount, wishlist, setCartOpen, setSearchOpen, theme, toggleTheme } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobile(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobile]);

  return (
    <header
      className={`fixed inset-x-0 top-0 transition-all duration-700 ${mobile ? "z-[300]" : "z-[100]"} ${
        scrolled ? "glass-luxe border-b py-3 shadow-soft" : "border-b border-transparent py-6"
      }`}
    >
      <div className="shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 lg:grid-cols-[auto_1fr_auto] lg:gap-6">
        <BrandLogo className="h-12 w-auto sm:h-14 lg:h-16" />

        <nav className="hidden justify-center gap-9 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-foreground" }}
              className="link-underline font-button text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <span className="hidden sm:block">
            <IconButton label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-[18px] w-[18px]" strokeWidth={1.2} />
            </IconButton>
          </span>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary sm:flex"
          >
            <Heart
              className={`h-[18px] w-[18px] ${wishlist.length ? "fill-gold text-gold" : ""}`}
              strokeWidth={1.2}
            />
            {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
          </Link>
          <IconButton label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="h-[18px] w-[18px]" strokeWidth={1.2} />
            ) : (
              <Sun className="h-[18px] w-[18px]" strokeWidth={1.2} />
            )}
          </IconButton>
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[130] isolate bg-background lg:hidden"
          >
            <div className="absolute inset-0 -z-10 bg-background" />
            <div className="shell flex h-full flex-col overflow-y-auto py-4 sm:py-6">
              <div className="flex items-center justify-between">
                <BrandLogo className="h-14 w-auto" onClick={() => setMobile(false)} />
                <button
                  aria-label="Close menu"
                  onClick={() => setMobile(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"
                >
                  <X className="h-5 w-5" strokeWidth={1.2} />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-4 sm:mt-16 sm:gap-6">
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
                      className="font-display text-3xl text-foreground sm:text-4xl"
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
                    className="flex items-center gap-4 font-display text-3xl text-foreground sm:text-4xl"
                  >
                    Wishlist
                    {wishlist.length > 0 && (
                      <span className="grid h-7 min-w-7 place-items-center rounded-full bg-gold px-2 font-button text-[10px] text-primary-foreground">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.5 }}
                  onClick={() => {
                    setMobile(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center gap-3 text-left font-display text-3xl text-foreground sm:text-4xl"
                >
                  <Search className="h-6 w-6" strokeWidth={1.2} />
                  Search
                </motion.button>
              </nav>
              <div className="gold-rule mt-auto" />
              <p className="eyebrow mt-6">ITRAA Perfum — Est. 2019</p>
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
