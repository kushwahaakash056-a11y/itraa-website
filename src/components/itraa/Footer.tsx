import { Link } from "@tanstack/react-router";
import { Camera, MessageCircle, Share2 } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Collections", to: "/collections" },
      { label: "Shop", to: "/shop" },
      { label: "About ITRAA Perfum", to: "/about" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "Floral", to: "/collections" },
      { label: "Oud", to: "/collections" },
      { label: "Fresh", to: "/collections" },
      { label: "Signature", to: "/collections" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Wishlist", to: "/wishlist" },
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Return Policy", to: "/returns" },
      { label: "Refund / Cancellation Policy", to: "/refunds" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Disclaimer", to: "/disclaimer" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-surface pt-24">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.7fr)]">
          <div>
            <div>
              <BrandLogo className="h-36 w-auto" />
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              ITRAA Perfum creates slow perfumery. Hand-composed in small batches, shipped worldwide in cedar
              and cotton.
            </p>
            <div className="mt-8 flex gap-3">
              {[Camera, Share2, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="https://www.instagram.com/itraa_perfumery"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="ITRAA social profile"
                  className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.2} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="eyebrow">{column.title}</p>
                <ul className="mt-6 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="gold-rule mt-20" />
        <div className="flex flex-col gap-3 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="font-button text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            © {new Date().getFullYear()} ITRAA Parfums. All rights reserved.
          </p>
          <p className="font-button text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Composed in Grasse · Bottled by hand
          </p>
        </div>
      </div>
    </footer>
  );
}
