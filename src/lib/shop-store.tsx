import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./itraa-data";

export type CartLine = { slug: string; size: string; qty: number };

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  recentlyViewed: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  quickView: Product | null;
  theme: "light" | "dark";
  addToCart: (slug: string, qty?: number, size?: string) => void;
  removeFromCart: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  toggleWishlist: (slug: string) => void;
  markViewed: (slug: string) => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setQuickView: (product: Product | null) => void;
  toggleTheme: () => void;
  cartCount: number;
  cartTotal: number;
};

const ShopContext = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    try {
      const savedWishlist = window.localStorage.getItem("itraa-wishlist");
      const savedCart = window.localStorage.getItem("itraa-cart");
      const savedTheme = window.localStorage.getItem("itraa-theme");

      if (savedWishlist) {
        const slugs = JSON.parse(savedWishlist);
        if (Array.isArray(slugs)) {
          setWishlist(slugs.filter((slug): slug is string => typeof slug === "string"));
        }
      }

      if (savedCart) {
        const lines = JSON.parse(savedCart);
        if (Array.isArray(lines)) {
          setCart(
            lines
              .filter(
                (line): line is { slug: string; size?: string; qty: number } =>
                  typeof line?.slug === "string" && typeof line?.qty === "number" && line.qty > 0,
              )
              .map((line) => ({
                slug: line.slug,
                size: line.size ?? products.find((product) => product.slug === line.slug)?.size ?? "30 ml",
                qty: line.qty,
              })),
          );
        }
      }

      if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    } catch {
      // Ignore malformed browser storage and continue with a clean boutique state.
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    window.localStorage.setItem("itraa-wishlist", JSON.stringify(wishlist));
  }, [storageReady, wishlist]);

  useEffect(() => {
    if (!storageReady) return;
    window.localStorage.setItem("itraa-cart", JSON.stringify(cart));
  }, [cart, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    window.localStorage.setItem("itraa-theme", theme);
  }, [storageReady, theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const addToCart = useCallback((slug: string, qty = 1, requestedSize?: string) => {
    const product = products.find((item) => item.slug === slug);
    const size = requestedSize ?? product?.size ?? "30 ml";
    setCart((prev) => {
      const found = prev.find((line) => line.slug === slug && line.size === size);
      if (found) {
        return prev.map((line) =>
          line.slug === slug && line.size === size ? { ...line, qty: line.qty + qty } : line,
        );
      }
      return [...prev, { slug, size, qty }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback(
    (slug: string, size: string) =>
      setCart((prev) => prev.filter((line) => line.slug !== slug || line.size !== size)),
    [],
  );

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((line) => line.slug !== slug || line.size !== size)
        : prev.map((line) =>
            line.slug === slug && line.size === size ? { ...line, qty } : line,
          ),
    );
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const markViewed = useCallback((slug: string) => {
    setRecentlyViewed((prev) => [slug, ...prev.filter((s) => s !== slug)].slice(0, 4));
  }, []);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);

  const value = useMemo<ShopState>(() => {
    const cartCount = cart.reduce((n, l) => n + l.qty, 0);
    const cartTotal = cart.reduce((sum, line) => {
      const product = products.find((p) => p.slug === line.slug);
      const variant = product?.variants.find((item) => item.size === line.size);
      return sum + (variant ? variant.price * line.qty : 0);
    }, 0);

    return {
      cart,
      wishlist,
      recentlyViewed,
      cartOpen,
      searchOpen,
      quickView,
      theme,
      addToCart,
      removeFromCart,
      setQty,
      toggleWishlist,
      markViewed,
      setCartOpen,
      setSearchOpen,
      setQuickView,
      toggleTheme,
      cartCount,
      cartTotal,
    };
  }, [
    cart,
    wishlist,
    recentlyViewed,
    cartOpen,
    searchOpen,
    quickView,
    theme,
    addToCart,
    removeFromCart,
    setQty,
    toggleWishlist,
    markViewed,
    toggleTheme,
  ]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
