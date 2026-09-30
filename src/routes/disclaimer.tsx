import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, type PolicySection } from "@/components/itraa/PolicyPage";

const title = "Disclaimer — ITRAA Parfums";
const description =
  "Important information about ITRAA fragrance descriptions, allergens and website materials.";
const sections: PolicySection[] = [
  {
    title: "Product information",
    paragraphs: [
      "Fragrance notes and descriptions are intended as an evocative guide; scent perception varies from person to person. Always review the ingredient information supplied with a product.",
      "If you have a known sensitivity or allergy, seek appropriate professional advice before use.",
    ],
  },
  {
    title: "Safe use",
    paragraphs: [
      "Use fragrance only as directed, avoid contact with eyes and irritated skin, and keep it away from heat, flame and children. Stop use if irritation occurs. Product information is not medical advice.",
    ],
  },
  {
    title: "Website content",
    paragraphs: [
      "We take reasonable care to keep product details accurate, but images, colors, prices and availability may change. Website materials are general information and are not a substitute for individualized medical or professional advice.",
    ],
  },
  {
    title: "External services",
    paragraphs: [
      "Links to third-party services are provided for convenience. ITRAA is not responsible for the content or privacy practices of external websites.",
    ],
  },
  {
    title: "Questions",
    paragraphs: ["For questions about a product or this notice, please contact hello@itraa.in."],
  },
];

export const Route = createFileRoute("/disclaimer")({
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
      title="Disclaimer"
      intro="Important guidance on fragrance descriptions, safe use and the information presented on this website."
      sections={sections}
    />
  ),
});
