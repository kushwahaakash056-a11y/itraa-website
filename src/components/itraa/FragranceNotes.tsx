import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { noteFamilies } from "@/lib/itraa-data";
import { useReveal } from "@/lib/use-reveal";

export function FragranceNotes() {
  const [active, setActive] = useState<number>(1);
  const root = useReveal<HTMLElement>({ y: 40, stagger: 0.08 });
  const family = noteFamilies[active] ?? noteFamilies[0]!;

  return (
    <section ref={root} className="relative overflow-hidden bg-surface py-28 lg:py-40">
      <div className="shell">
        <div className="max-w-xl">
          <p data-reveal className="eyebrow">
            05 — The Pyramid
          </p>
          <h2
            data-reveal
            className="mt-6 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.03]"
          >
            How a scent <span className="italic text-gold">unfolds</span>
          </h2>
        </div>

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Concentric gold rings */}
          <div data-reveal className="relative mx-auto aspect-square w-full max-w-[460px]">
            {noteFamilies.map((f, i) => {
              const scale = 1 - i * 0.24;
              const isActive = i === active;
              return (
                <button
                  key={f.id}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-label={f.label}
                  className="absolute left-1/2 top-1/2 rounded-full border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    width: `${scale * 100}%`,
                    height: `${scale * 100}%`,
                    transform: `translate(-50%, -50%) scale(${isActive ? 1.04 : 1})`,
                    borderColor: isActive
                      ? "color-mix(in oklab, var(--gold) 90%, transparent)"
                      : "var(--border)",
                    background: isActive
                      ? "color-mix(in oklab, var(--gold) 7%, transparent)"
                      : "transparent",
                  }}
                />
              );
            })}

            <AnimatePresence mode="wait">
              <motion.div
                key={family.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute inset-0 grid place-items-center text-center"
              >
                <div>
                  <p className="font-display text-5xl text-gold">0{active + 1}</p>
                  <p className="mt-2 font-serif text-xl">{family.label}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            {noteFamilies.map((f, i) => {
              const isActive = i === active;
              return (
                <button
                  key={f.id}
                  data-reveal
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="block w-full border-b border-border py-8 text-left"
                >
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-6">
                    <span className="font-button text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                      0{i + 1}
                    </span>
                    <div>
                      <h3
                        className={`font-display text-3xl transition-colors duration-500 sm:text-4xl ${
                          isActive ? "text-gold" : "text-foreground"
                        }`}
                      >
                        {f.label}
                      </h3>
                      <div
                        className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pt-3 text-sm text-muted-foreground">{f.detail}</p>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {f.items.map((item) => (
                              <li
                                key={item}
                                className="rounded-full border border-gold/40 px-4 py-1.5 font-button text-[10px] uppercase tracking-[0.2em]"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
