import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, type PolicySection } from "@/components/itraa/PolicyPage";

const title = "Refund & Cancellation Policy — ITRAA Parfums";
const description = "Cancellation timeframes and refund processing information for ITRAA orders.";
const sections: PolicySection[] = [
  {
    title: "Cancel an order",
    paragraphs: [
      "Please contact us promptly if you need to cancel. We will try to stop an order before it is prepared for dispatch, but cancellation cannot be guaranteed once it has shipped.",
    ],
  },
  {
    title: "Refund review",
    paragraphs: [
      "After an approved return is received and checked, we will notify you of the outcome. Approved refunds are returned to the original payment method.",
      "Processing times can vary by payment provider and bank. Original shipping charges may not be refundable where an order is returned by choice.",
    ],
  },
  {
    title: "Incorrect or damaged items",
    paragraphs: [
      "If your parcel arrives damaged or contains the wrong item, contact hello@itraa.in with your order number and clear photographs. We will review the issue and arrange an appropriate resolution.",
    ],
  },
  {
    title: "Refund timing",
    paragraphs: [
      "Approved refunds are submitted within 7 working days after inspection. Your bank or card issuer may require an additional 3–10 working days to display the credit.",
      "Refunds are made in the original transaction currency. Exchange-rate differences and fees applied by your payment provider are outside our control.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "For cancellations or refund questions, email hello@itraa.in and include your order reference.",
    ],
  },
];

export const Route = createFileRoute("/refunds")({
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
      title="Refund & Cancellation Policy"
      intro="How to cancel before dispatch, when a refund is available and what happens after your return reaches us."
      sections={sections}
    />
  ),
});
