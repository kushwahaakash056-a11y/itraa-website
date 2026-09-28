import { Link } from "@tanstack/react-router";
import { images } from "@/lib/itraa-data";
import { useImageReveal, useReveal, useSplitReveal } from "@/lib/use-reveal";

export function BrandStory() {
  const root = useReveal<HTMLElement>({ y: 40 });
  const heading = useSplitReveal<HTMLHeadingElement>();
  const media = useImageReveal<HTMLDivElement>(80);

  return (
    <section ref={root} className="relative bg-surface py-28 lg:py-40">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div ref={media} className="relative lg:col-span-6 lg:col-start-1">
          <img
            src={images.atelier}
            alt="ITRAA perfumer blending fragrance oils in the atelier"
            loading="lazy"
            width={1200}
            height={1400}
            className="aspect-[4/5] w-full rounded-[28px] object-cover shadow-luxe"
          />
          <div className="glass-luxe absolute -right-4 bottom-8 hidden max-w-[220px] rounded-2xl p-6 sm:block lg:-right-12">
            <p className="font-display text-4xl text-gold">19</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              raw materials in the house accord, macerated for eight weeks.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
          <p data-reveal className="eyebrow">
            02 — The House
          </p>
          <h2
            ref={heading}
            className="mt-6 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.03]"
          >
            <span data-line className="block">
              Crafted To Be
            </span>
            <span data-line className="block italic text-gold">
              Remembered.
            </span>
          </h2>

          <div className="gold-rule my-9 max-w-[220px]" />

          <p data-reveal className="text-sm leading-[1.9] text-muted-foreground sm:text-base">
            ITRAA began in a small atelier with a single question: what makes a scent stay with
            someone long after the person has left the room? The answer was never volume. It was
            patience — absolutes distilled slowly, accords rested for weeks, and a refusal to
            release anything that felt merely pleasant.
          </p>
          <p data-reveal className="mt-6 text-sm leading-[1.9] text-muted-foreground sm:text-base">
            Every bottle is filled, labelled and sealed by hand in cotton and cedar. Nothing is
            outsourced. Nothing is hurried.
          </p>

          <div data-reveal className="mt-10">
            <Link to="/about" className="btn-ghost-luxe">
              Read Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
