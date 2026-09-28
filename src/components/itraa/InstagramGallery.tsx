import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera } from "lucide-react";
import { images } from "@/lib/itraa-data";
import { prefersReducedMotion } from "@/lib/smooth-scroll";

/** Horizontal scroll gallery, pinned on desktop, native swipe rail on mobile. */
export function InstagramGallery() {
  const root = useRef<HTMLElement | null>(null);
  const rail = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = root.current;
    const track = rail.current;
    if (!section || !track || prefersReducedMotion()) return;
    if (window.innerWidth < 1024) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - window.innerWidth + 160;
      if (distance <= 0) return;
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="overflow-hidden py-24 lg:py-0">
      <div className="lg:flex lg:h-svh lg:flex-col lg:justify-center">
        <div className="shell flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">08 — @itraa.parfums</p>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.05]">
              Life, <span className="italic text-gold">scented</span>
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost-luxe"
          >
            <Camera className="h-4 w-4" strokeWidth={1.2} />
            Follow
          </a>
        </div>

        <div className="no-scrollbar mt-12 overflow-x-auto lg:overflow-visible">
          <div ref={rail} className="flex gap-6 px-6 md:px-14 xl:px-30">
            {images.instagram.map((src, i) => (
              <figure
                key={src}
                className={`group relative w-[70vw] shrink-0 overflow-hidden rounded-[24px] sm:w-[40vw] lg:w-[26vw] ${
                  i % 2 === 1 ? "lg:mt-14" : ""
                }`}
              >
                <img
                  src={src}
                  alt={`ITRAA lifestyle editorial ${i + 1}`}
                  loading="lazy"
                  width={1000}
                  height={1000}
                  className="aspect-square w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.1]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-card/90 p-4 font-button text-[10px] uppercase tracking-[0.22em] backdrop-blur transition-transform duration-500 group-hover:translate-y-0">
                  Editorial No. {String(i + 1).padStart(2, "0")}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
