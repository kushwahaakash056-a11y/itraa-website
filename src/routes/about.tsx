import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "@/lib/itraa-data";
import { useReveal } from "@/lib/use-reveal";

const title = "About ITRAA — A Maison of Slow Perfumery";
const description =
  "The story of ITRAA: a small atelier, nineteen raw materials and a refusal to release anything merely pleasant.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const root = useReveal<HTMLDivElement>({ y: 46, stagger: 0.09 });

  return (
    <div ref={root} className="pb-32 pt-40">
      <div className="shell">
        <p data-reveal className="eyebrow">
          Our Story
        </p>
        <h1
          data-reveal
          className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,6.4vw,5.6rem)] leading-[1.02]"
        >
          A maison built on <span className="italic text-gold">patience</span>
        </h1>

        <div data-reveal className="mt-16 overflow-hidden rounded-[30px]">
          <img
            src={images.atelier}
            alt="The ITRAA atelier"
            loading="lazy"
            width={1200}
            height={1400}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <h2 data-reveal className="font-display text-[clamp(1.8rem,3.2vw,2.6rem)] leading-snug">
            Founded in 2019, in a room with two benches and one window.
          </h2>
          <div data-reveal className="space-y-6 text-sm leading-[1.9] text-muted-foreground">
            <p>
              We began by composing for friends. The brief never changed: make something that stays
              with a person after the room empties. That meant working against every industrial
              habit — fewer materials, longer rests, smaller batches.
            </p>
            <p>
              Today ITRAA releases no more than two compositions a year. Each is bottled by hand,
              numbered, and sealed in cedar. We publish our concentrations because we are proud of
              them, and we source directly because provenance is not a marketing line.
            </p>
            <p>
              Everything is vegan, cruelty free, and made to be worn daily rather than saved for
              occasions that rarely arrive.
            </p>
            <Link to="/collections" className="btn-luxe mt-4 inline-flex">
              Explore the collections
            </Link>
          </div>
        </div>

        <div data-reveal className="gold-rule my-24" />

        <section>
          <p data-reveal className="eyebrow">
            What guides us
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-border bg-border md:grid-cols-3">
            {[
              [
                "01",
                "Fewer, better materials",
                "Every formula begins with traceable naturals and a deliberately restrained palette.",
              ],
              [
                "02",
                "Time is an ingredient",
                "Concentrates rest for six weeks before blending, then mature again before bottling.",
              ],
              [
                "03",
                "Made to be lived in",
                "Elegant compositions with presence, comfort and enough restraint for everyday wear.",
              ],
            ].map(([index, heading, copy]) => (
              <article key={index} data-reveal className="bg-card p-8 sm:p-10">
                <p className="font-button text-[10px] tracking-[0.28em] text-gold">{index}</p>
                <h2 className="mt-6 font-display text-2xl">{heading}</h2>
                <p className="mt-4 text-sm leading-[1.8] text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          data-reveal
          className="mt-24 grid gap-10 rounded-[30px] bg-surface px-8 py-12 sm:grid-cols-3 sm:px-12"
        >
          {[
            ["19", "core raw materials"],
            ["6 weeks", "minimum maceration"],
            ["2", "releases at most each year"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="font-display text-5xl text-gold">{value}</p>
              <p className="eyebrow mt-3">{label}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
