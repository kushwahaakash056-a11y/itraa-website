import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/lib/itraa-data";
import { useReveal } from "@/lib/use-reveal";

const title = "Journal — Notes from the ITRAA Atelier";
const description =
  "Essays on maceration, sourcing and the craft of slow perfumery from the ITRAA atelier.";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: JournalPage,
});

const entries = [
  {
    date: "March 2026",
    title: "Why we macerate for eight weeks",
    excerpt:
      "Time is the only ingredient we cannot buy. A note on why our accords rest before they are ever bottled.",
    image: images.atelier,
  },
  {
    date: "January 2026",
    title: "Sourcing oud without shortcuts",
    excerpt:
      "Three years of visits, refusals and one small plantation in Assam that finally met the standard.",
    image: images.oud,
  },
  {
    date: "November 2025",
    title: "The case for wearing less perfume",
    excerpt:
      "Concentration is not intensity. How to wear an extrait so it stays a private pleasure.",
    image: images.floral,
  },
];

function JournalPage() {
  const root = useReveal<HTMLDivElement>({ y: 46, stagger: 0.1 });

  return (
    <div ref={root} className="shell pb-32 pt-40">
      <p data-reveal className="eyebrow">
        Journal
      </p>
      <h1
        data-reveal
        className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1.02]"
      >
        Notes from the <span className="italic text-gold">atelier</span>
      </h1>

      <div className="mt-20 space-y-14">
        {entries.map((entry) => (
          <article
            key={entry.title}
            data-reveal
            className="group grid gap-8 border-b border-border pb-14 md:grid-cols-[260px_minmax(0,1fr)] md:items-center"
          >
            <div className="overflow-hidden rounded-[22px] bg-secondary">
              <img
                src={entry.image}
                alt={entry.title}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
              />
            </div>
            <div>
              <p className="eyebrow">{entry.date}</p>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight">
                {entry.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-[1.9] text-muted-foreground">
                {entry.excerpt}
              </p>
              <span className="link-underline mt-6 inline-block font-button text-[10px] uppercase tracking-[0.24em]">
                Read the entry
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
