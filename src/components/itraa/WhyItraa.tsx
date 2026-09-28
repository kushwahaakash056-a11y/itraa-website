import { Clock, Gift, Globe2, Leaf, PawPrint, Package } from "lucide-react";
import { pillars } from "@/lib/itraa-data";
import { useReveal } from "@/lib/use-reveal";

const icons = [Clock, Leaf, Package, PawPrint, Gift, Globe2];

export function WhyItraa() {
  const root = useReveal<HTMLElement>({ y: 44, stagger: 0.07 });

  return (
    <section ref={root} className="shell py-28 lg:py-40">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p data-reveal className="eyebrow">
            06 — Why ITRAA
          </p>
          <h2
            data-reveal
            className="mt-6 font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.05]"
          >
            Standards we <span className="italic text-gold">refuse</span> to lower
          </h2>
          <div data-reveal className="gold-rule mt-8 max-w-[180px]" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {pillars.map((pillar, i) => {
            const Icon = icons[i] ?? Clock;
            return (
              <div
                key={pillar.title}
                data-reveal
                className="hover-lift rounded-[22px] border border-border bg-card p-8"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary">
                  <Icon className="h-5 w-5 text-gold" strokeWidth={1.1} />
                </span>
                <h3 className="mt-6 font-serif text-xl">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
