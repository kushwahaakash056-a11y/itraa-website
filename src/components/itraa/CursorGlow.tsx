import { useEffect, useRef } from "react";

/** Soft gold glow that trails the cursor. Desktop + fine pointers only. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
    };

    const loop = () => {
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cx - 180}px, ${cy - 180}px, 0)`;
      }
      raf = window.requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[110] hidden h-[360px] w-[360px] rounded-full opacity-60 mix-blend-multiply md:block"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--gold) 22%, transparent) 0%, transparent 62%)",
      }}
    />
  );
}
