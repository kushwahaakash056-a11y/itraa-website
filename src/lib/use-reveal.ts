import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./smooth-scroll";

type RevealOptions = {
  /** Selector for children to stagger. Defaults to `[data-reveal]`. */
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
};

/**
 * Scroll-triggered fade/rise reveal for any container's `[data-reveal]` children.
 * Uses transform + opacity only, and no-ops under prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const {
    selector = "[data-reveal]",
    y = 44,
    stagger = 0.09,
    duration = 1.05,
    start = "top 82%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(selector);
      if (!targets.length) return;
      gsap.from(targets, {
        y,
        opacity: 0,
        duration,
        stagger,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [selector, y, stagger, duration, start]);

  return ref;
}

/** Clip-path image reveal + slow scroll parallax on the inner <img>. */
export function useImageReveal<T extends HTMLElement>(parallax = 60) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );

      const img = el.querySelector("img");
      if (img && parallax) {
        gsap.fromTo(
          img,
          { yPercent: -parallax / 10 },
          {
            yPercent: parallax / 10,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, [parallax]);

  return ref;
}

/** Word-by-word masked reveal for editorial headlines. */
export function useSplitReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const lines = Array.from(el.querySelectorAll<HTMLElement>("[data-line]"));
    const originals = lines.map((line) => line.innerHTML);

    lines.forEach((line) => {
      const words = (line.textContent ?? "").split(" ").filter(Boolean);
      line.innerHTML = words
        .map(
          (word) =>
            `<span class="inline-block overflow-hidden align-bottom"><span class="inline-block will-change-transform" data-word>${word}</span></span>`,
        )
        .join(" ");
    });

    const ctx = gsap.context(() => {
      gsap.from("[data-word]", {
        yPercent: 118,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.045,
        delay,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);

    return () => {
      ctx.revert();
      lines.forEach((line, i) => {
        line.innerHTML = originals[i] ?? line.innerHTML;
      });
    };
  }, [delay]);

  return ref;
}
