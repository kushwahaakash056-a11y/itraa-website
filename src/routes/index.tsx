import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/itraa/Hero";
import { FeaturedCollections } from "@/components/itraa/FeaturedCollections";
import { BrandStory } from "@/components/itraa/BrandStory";
import { SignatureSection } from "@/components/itraa/SignatureSection";
import { BestSellers } from "@/components/itraa/BestSellers";
import { FragranceNotes } from "@/components/itraa/FragranceNotes";
import { WhyItraa } from "@/components/itraa/WhyItraa";
import { Testimonials } from "@/components/itraa/Testimonials";
import { InstagramGallery } from "@/components/itraa/InstagramGallery";
import { Newsletter } from "@/components/itraa/Newsletter";

const title = "ITRAA — Luxury Fragrance Maison | Wear Your Aura";
const description =
  "ITRAA composes slow, hand-bottled luxury perfume. Floral, oud, fresh and signature collections crafted from premium fragrance oils.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <BrandStory />
      <SignatureSection />
      <BestSellers />
      <FragranceNotes />
      <WhyItraa />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
