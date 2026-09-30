import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/itraa-data";
import { prefersReducedMotion } from "@/lib/smooth-scroll";
import { Magnetic } from "./Magnetic";

export function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const bottleWrap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-hero-word]", { yPercent: 115 });
      const tl = gsap.timeline({ delay: 2.05, defaults: { ease: "power4.out" } });
      tl.to("[data-hero-word]", { yPercent: 0, duration: 1.2, stagger: 0.06 })
        .from("[data-hero-fade]", { y: 26, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.75")
        .from(
          "[data-hero-visual]",
          { scale: 1.06, opacity: 0, duration: 1.6, ease: "power3.out" },
          "-=1.4",
        );
    }, el);

    return () => ctx.revert();
  }, []);

  // Mouse parallax on the bottle + shapes
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = root.current;
    if (!el) return;

    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-parallax]"));
    const quick = layers.map((layer) => ({
      layer,
      depth: Number(layer.dataset["parallax"] ?? 20),
      x: gsap.quickTo(layer, "x", { duration: 1.1, ease: "power3" }),
      y: gsap.quickTo(layer, "y", { duration: 1.1, ease: "power3" }),
    }));

    const onMove = (event: MouseEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      quick.forEach(({ depth, x, y }) => {
        x(nx * depth);
        y(ny * depth);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16 lg:pt-32"
    >
      {/* Organic background shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          data-parallax="26"
          className="blob drift absolute -left-24 top-24 h-[420px] w-[420px] bg-accent/60"
        />
        <div
          data-parallax="42"
          className="blob absolute right-[6%] top-[12%] h-[520px] w-[520px] bg-secondary"
          style={{ animation: "itraa-drift 22s ease-in-out infinite reverse" }}
        />
        <div
          data-parallax="14"
          className="absolute bottom-[8%] left-[42%] h-[220px] w-[220px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--gold) 18%, transparent), transparent 68%)",
          }}
        />
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="float-slow absolute h-1 w-1 rounded-full bg-gold/40"
            style={{
              left: `${(i * 37) % 96}%`,
              top: `${(i * 53) % 88}%`,
              animationDelay: `${i * 0.55}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      <div className="shell relative grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-20">
        <div>
          <p data-hero-fade className="eyebrow">
            Luxury Fragrance Collection
          </p>

          <h1 className="mt-8 font-display text-[clamp(3rem,8.2vw,7.5rem)] font-light leading-[0.92] tracking-[-0.02em]">
            <span className="block overflow-hidden">
              <span data-hero-word className="inline-block">
                Wear Your Aura.
              </span>
            </span>
            <span className="block overflow-hidden italic text-gold">
              <span data-hero-word className="inline-block">
                Pure Essence.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-word className="inline-block">
                Lasting Memories.
              </span>
            </span>
          </h1>

          <div data-hero-fade className="mt-10 flex max-w-md items-start gap-5">
            <span className="mt-3 h-px w-14 shrink-0 bg-gold" />
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Crafted with premium fragrance oils and timeless elegance to leave unforgettable
              impressions.
            </p>
          </div>

          <div data-hero-fade className="mt-12 flex flex-wrap items-center gap-4">
            <Magnetic as={Link} to="/collections" className="btn-luxe">
              Explore Collection
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
            </Magnetic>
            <Magnetic as={Link} to="/about" className="btn-ghost-luxe" strength={0.25}>
              Our Story
            </Magnetic>
          </div>

          <div data-hero-fade className="mt-16 flex flex-wrap gap-10">
            {[
              ["8h+", "Wear time"],
              ["30%", "Oil concentration"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-3xl">{value}</p>
                <p className="mt-1 font-button text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div ref={bottleWrap} data-hero-visual className="relative">
          <div
            data-parallax="34"
            className="relative mx-auto max-w-[520px] overflow-hidden rounded-[42%_58%_46%_54%/48%_42%_58%_52%] shadow-luxe"
          >
            <img
              src={images.heroBottle}
              alt="ITRAA Veloris and Reva luxury perfume bottles"
              width={1200}
              height={1504}
              fetchPriority="high"
              className="float-slow h-full w-full object-cover"
            />
          </div>
          <div
            data-parallax="60"
            className="glass-luxe absolute -bottom-4 left-0 hidden rounded-2xl px-6 py-5 sm:block"
          >
            <p className="eyebrow">ITRAA Perfum</p>
            <p className="mt-2 font-serif text-xl">Veloris &amp; Reva</p>
            <p className="mt-1 text-xs text-muted-foreground">Floral · Amber · Musk</p>
          </div>
        </div>
      </div>

      <div className="shell absolute inset-x-0 bottom-6 hidden items-center justify-between lg:flex">
        <p className="font-button text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll to discover
        </p>
        <div className="h-10 w-px bg-gradient-to-b from-transparent to-gold" />
      </div>
    </section>
  );
}
