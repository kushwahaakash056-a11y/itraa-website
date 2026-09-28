import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { testimonials } from "@/lib/itraa-data";
import { useReveal } from "@/lib/use-reveal";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const root = useReveal<HTMLElement>({ y: 40, stagger: 0.09 });
  const item = testimonials[index] ?? testimonials[0]!;

  const move = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section ref={root} className="relative overflow-hidden bg-surface py-28 lg:py-40">
      <div
        aria-hidden
        className="blob drift pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] bg-accent/50"
      />
      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-center">
          <div>
            <p data-reveal className="eyebrow">
              07 — Voices
            </p>
            <h2
              data-reveal
              className="mt-6 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.05]"
            >
              Worn and <span className="italic text-gold">remembered</span>
            </h2>
            <div data-reveal className="mt-10 flex gap-3">
              <button
                aria-label="Previous testimonial"
                onClick={() => move(-1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-border transition-colors hover:border-gold"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.2} />
              </button>
              <button
                aria-label="Next testimonial"
                onClick={() => move(1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-border transition-colors hover:border-gold"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.2} />
              </button>
            </div>
          </div>

          <div data-reveal className="glass-luxe relative min-h-[320px] rounded-[28px] p-9 sm:p-14">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={1} />
                  ))}
                </div>
                <p className="mt-8 font-display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.35]">
                  “{item.quote}”
                </p>
                <footer className="mt-10">
                  <p className="font-serif text-lg">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {item.role}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="absolute bottom-9 right-9 hidden gap-2 sm:flex">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === index ? "w-10 bg-gold" : "w-4 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
