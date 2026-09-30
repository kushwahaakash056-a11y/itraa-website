import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, type PolicySection } from "@/components/itraa/PolicyPage";

const title = "Return Policy — ITRAA Parfums";
const description = "Return eligibility, timeframes and instructions for ITRAA fragrance orders.";
const sections: PolicySection[] = [
  {
    title: "Return window",
    paragraphs: [
      "Eligible items may be returned within 30 calendar days of delivery. Contact us before sending a parcel so we can confirm eligibility and provide the correct return address and authorization.",
    ],
  },
  {
    title: "Condition",
    paragraphs: [
      "To protect product quality and hygiene, fragrance must be unopened, unused, with its cellophane or seal intact, and returned in the original packaging. Gift sets and promotional bundles must be returned complete.",
      "Opened fragrance is not eligible for a change-of-mind return. This does not affect your rights where an item is faulty, damaged or not as described.",
    ],
  },
  {
    title: "Non-returnable items",
    paragraphs: [
      "Engraved, personalized and final-sale items cannot be returned for change of mind. Discovery samples cannot be returned once their outer seal has been opened.",
    ],
  },
  {
    title: "Return shipping",
    paragraphs: [
      "Unless an item arrived damaged or incorrect, return postage is the customer's responsibility. We recommend using a tracked service and keeping proof of dispatch.",
    ],
  },
  {
    title: "How to begin",
    paragraphs: [
      "Email hello@itraa.in with your order reference and the item you wish to return. We will confirm eligibility and next steps.",
    ],
  },
];

export const Route = createFileRoute("/returns")({
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
  component: () => (
    <PolicyPage
      eyebrow="ITRAA Perfum information"
      title="Return Policy"
      intro="Our return process is designed to be clear, careful and respectful of fragrance hygiene requirements."
      sections={sections}
    />
  ),
});
