import { useReveal } from "@/lib/use-reveal";

export type PolicySection = { title: string; paragraphs: string[] };

export function PolicyPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PolicySection[];
}) {
  const root = useReveal<HTMLDivElement>({ y: 38, stagger: 0.06 });

  return (
    <div ref={root} className="shell max-w-5xl pb-32 pt-40">
      <p data-reveal className="eyebrow">
        {eyebrow}
      </p>
      <h1
        data-reveal
        className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1.02]"
      >
        {title}
      </h1>
      <p data-reveal className="mt-8 max-w-3xl text-base leading-[1.9] text-muted-foreground">
        {intro}
      </p>
      <div className="mt-16 divide-y divide-border border-y border-border">
        {sections.map((section, index) => (
          <section
            key={section.title}
            data-reveal
            className="grid gap-5 py-8 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-10"
          >
            <h2 className="font-serif text-xl">{section.title}</h2>
            <div className="space-y-4 text-sm leading-[1.9] text-muted-foreground">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
        Last updated: 26 September 2026. For questions about this policy, contact hello@itraa.in.
      </p>
    </div>
  );
}
