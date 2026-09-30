import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, type PolicySection } from "@/components/itraa/PolicyPage";

const title = "Privacy Policy — ITRAA Parfums";
const description = "How ITRAA collects, uses, protects and retains customer information.";
const sections: PolicySection[] = [
  {
    title: "Information we collect",
    paragraphs: [
      "When you browse, contact us or place an order, we may receive your name, contact details, billing and delivery address, order history, communications, device information and site activity. Payment card details are handled by our payment provider and are not stored in full by ITRAA.",
    ],
  },
  {
    title: "How it is used",
    paragraphs: [
      "Customer information may be used to process orders, respond to enquiries, provide service updates and maintain the security of the site.",
      "We do not sell personal information. Information may be shared with service providers only as needed to deliver a requested service or meet legal obligations.",
    ],
  },
  {
    title: "Legal basis & retention",
    paragraphs: [
      "We process information to fulfil orders, answer requests, comply with law, prevent fraud and pursue legitimate interests such as improving our service. Marketing is sent with consent where required.",
      "We keep information only as long as needed for these purposes, including tax, accounting, warranty and dispute obligations, then delete or anonymize it securely.",
    ],
  },
  {
    title: "Sharing & transfers",
    paragraphs: [
      "Information may be shared with trusted providers for payments, hosting, delivery, customer support and analytics, and with authorities when legally required. Providers may process data in other countries using safeguards required by applicable law.",
    ],
  },
  {
    title: "Your choices",
    paragraphs: [
      "Depending on your location, you may request access, correction, deletion, restriction, portability or objection, and may withdraw consent. Contact hello@itraa.in to make a request. You may also complain to your local data protection authority.",
    ],
  },
  {
    title: "Cookies & security",
    paragraphs: [
      "Essential browser storage supports the basket, wishlist and display preferences. Optional analytics or advertising technologies should operate only according to the choices presented in our cookie controls.",
      "We use proportionate administrative and technical measures to protect information, but no online service can promise absolute security.",
    ],
  },
];

export const Route = createFileRoute("/privacy")({
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
      title="Privacy Policy"
      intro="This notice explains what personal information ITRAA handles, why we use it and the choices available to you."
      sections={sections}
    />
  ),
});
