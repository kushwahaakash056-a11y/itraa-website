import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/lib/use-reveal";

const title = "Contact ITRAA — Fragrance Advisors & Support";
const description =
  "Speak with an ITRAA fragrance advisor about layering, orders, shipping and private appointments.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const root = useReveal<HTMLDivElement>({ y: 44, stagger: 0.09 });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div ref={root} className="shell pb-32 pt-40">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p data-reveal className="eyebrow">
            Contact
          </p>
          <h1
            data-reveal
            className="mt-6 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.03]"
          >
            Speak with an <span className="italic text-gold">advisor</span>
          </h1>
          <div data-reveal className="gold-rule my-10 max-w-[180px]" />
          <dl data-reveal className="space-y-8 text-sm">
            {[
              ["Boutique", "12 Rue des Parfumeurs, Grasse, France"],
              ["Email", "maison@itraa.com"],
              ["Telephone", "+33 4 93 00 00 00"],
              ["Hours", "Tuesday – Saturday, 10:00 – 19:00"],
            ].map(([term, value]) => (
              <div key={term}>
                <dt className="eyebrow">{term}</dt>
                <dd className="mt-2 font-serif text-lg">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <form
          data-reveal
          onSubmit={onSubmit}
          className="rounded-[28px] border border-border bg-card p-8 sm:p-12"
        >
          <div className="space-y-7">
            {[
              { id: "name", label: "Full name", type: "text" },
              { id: "email", label: "Email address", type: "email" },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="eyebrow">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  required
                  className="mt-3 w-full border-b border-border bg-transparent py-3 outline-none transition-colors focus:border-gold"
                />
              </div>
            ))}
            <div>
              <label htmlFor="subject" className="eyebrow">
                How can we help?
              </label>
              <select
                id="subject"
                required
                defaultValue=""
                className="mt-3 w-full border-b border-border bg-transparent py-3 outline-none transition-colors focus:border-gold"
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option>Fragrance advice</option>
                <option>Order & delivery</option>
                <option>Return or refund</option>
                <option>Private appointment</option>
                <option>Press & partnerships</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="eyebrow">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                className="mt-3 w-full resize-none border-b border-border bg-transparent py-3 outline-none transition-colors focus:border-gold"
              />
            </div>
          </div>
          <button type="submit" className="btn-luxe mt-10 w-full">
            {sent ? "Message received — thank you" : "Send message"}
          </button>
          {sent && (
            <p
              role="status"
              className="mt-4 text-center text-xs leading-relaxed text-muted-foreground"
            >
              Your enquiry has been noted. A maison advisor will reply within two working days.
            </p>
          )}
        </form>
      </div>

      <section data-reveal className="mt-24 border-y border-border py-14">
        <p className="eyebrow">Before you write</p>
        <div className="mt-9 grid gap-10 md:grid-cols-3">
          {[
            [
              "Fragrance advice",
              "Tell us what you wear now, the notes you avoid and when you plan to wear your next scent.",
            ],
            [
              "Order support",
              "Include your order number so our team can locate your parcel or payment quickly.",
            ],
            [
              "Private appointments",
              "Boutique consultations are available Tuesday to Saturday and last approximately 45 minutes.",
            ],
          ].map(([heading, copy]) => (
            <article key={heading}>
              <h2 className="font-serif text-xl">{heading}</h2>
              <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
