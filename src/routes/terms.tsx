import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, type PolicySection } from "@/components/itraa/PolicyPage";

const title = "Terms & Conditions — ITRAA Parfums";
const description =
  "Terms governing use of the ITRAA website and purchases from the fragrance boutique.";
const sections: PolicySection[] = [
  {
    title: "Using this site",
    paragraphs: [
      "By accessing this website, you agree to use it only for lawful personal purposes and not to interfere with its security, operation or other visitors. You must be able to enter a binding purchase agreement in your country of residence.",
      "We may update product information, pricing and these terms when necessary. The terms shown when your order is accepted will apply to that purchase.",
    ],
  },
  {
    title: "Orders & payment",
    paragraphs: [
      "Submitting checkout details is an offer to purchase. Your order is accepted when we send a dispatch confirmation; before then, we may decline or cancel it because of stock, pricing or payment issues and will return any amount charged.",
      "Prices are displayed in the selected currency. Applicable taxes and delivery charges are shown before payment. You confirm that the payment method used is yours or that you have permission to use it.",
    ],
  },
  {
    title: "Delivery",
    paragraphs: [
      "Estimated delivery windows are provided at checkout and are not guaranteed. Risk passes to you on delivery to the address supplied. Please verify your address carefully and contact us promptly if a parcel is delayed, lost or damaged.",
    ],
  },
  {
    title: "Products",
    paragraphs: [
      "Natural materials and hand-finishing can produce slight variations between batches. Product photography is illustrative, and screen settings may alter color. Ingredients printed on the product packaging are the authoritative list for that item.",
    ],
  },
  {
    title: "Intellectual property",
    paragraphs: [
      "ITRAA names, designs, copy, photography and other site materials are owned by or licensed to ITRAA. They may not be copied, altered or used commercially without written permission.",
    ],
  },
  {
    title: "Liability & law",
    paragraphs: [
      "Nothing in these terms excludes liability or consumer rights that cannot legally be excluded. To the extent permitted by law, we are not responsible for losses that were not reasonably foreseeable when the contract was formed.",
      "These terms are governed by the law applicable to the entity identified on your order confirmation, while any mandatory protections in your place of residence remain unaffected.",
    ],
  },
];

export const Route = createFileRoute("/terms")({
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
      title="Terms & Conditions"
      intro="These terms explain how you may use the ITRAA website and how purchases from our boutique are formed and fulfilled."
      sections={sections}
    />
  ),
});
