import heroBottle from "@/assets/hero-bottle.jpg";
import floral from "@/assets/collection-floral.jpg";
import oud from "@/assets/collection-oud.jpg";
import fresh from "@/assets/collection-fresh.jpg";
import signature from "@/assets/collection-signature.jpg";
import atelier from "@/assets/story-atelier.jpg";
import signatureHero from "@/assets/signature-hero.jpg";
import ig1 from "@/assets/ig-1.jpg";
import ig2 from "@/assets/ig-2.jpg";
import ig3 from "@/assets/ig-3.jpg";
import ig4 from "@/assets/ig-4.jpg";
import ig5 from "@/assets/ig-5.jpg";
import ig6 from "@/assets/ig-6.jpg";

export const images = {
  heroBottle,
  floral,
  oud,
  fresh,
  signature,
  atelier,
  signatureHero,
  instagram: [ig1, ig2, ig3, ig4, ig5, ig6],
};

export type Collection = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export const collections: Collection[] = [
  {
    slug: "floral",
    index: "01",
    name: "Floral",
    tagline: "Petals at first light",
    description:
      "Dew-soft jasmine and Damask rose gathered before sunrise, layered over a whisper of white musk.",
    image: floral,
  },
  {
    slug: "oud",
    index: "02",
    name: "Oud",
    tagline: "Smoke and resin",
    description:
      "Aged Assam oud, saffron and labdanum — a slow, dark warmth that lingers long after the room empties.",
    image: oud,
  },
  {
    slug: "fresh",
    index: "03",
    name: "Fresh",
    tagline: "Air off the water",
    description:
      "Calabrian bergamot, green mandarin and cut fig leaf. Clean, luminous, endlessly wearable.",
    image: fresh,
  },
  {
    slug: "signature",
    index: "04",
    name: "Signature",
    tagline: "The house accord",
    description:
      "Our founding composition. Amber, iris and sandalwood held in perfect, quiet balance.",
    image: signature,
  },
];

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  collection: string;
  price: number;
  size: string;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  description: string;
  ingredients: string;
  shipping: string;
  notes: { top: string[]; heart: string[]; base: string[] };
};

export const products: Product[] = [
  {
    slug: "elysian-sun",
    name: "Elysian Sun",
    subtitle: "Eau de Parfum",
    collection: "Signature",
    price: 245,
    size: "100 ml",
    rating: 4.9,
    reviews: 218,
    image: heroBottle,
    gallery: [heroBottle, signatureHero, signature],
    description:
      "A golden hour captured in glass. Elysian Sun opens on sunlit bergamot before settling into amber, iris and a trail of warm sandalwood that stays close to the skin for hours.",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Linalool, Coumarin. 22% concentration of natural fragrance oils. Never tested on animals.",
    shipping:
      "Complimentary worldwide express shipping on all orders. Delivered in signature ITRAA packaging within 2–5 working days. Returns accepted within 30 days.",
    notes: {
      top: ["Bergamot", "Orange Blossom"],
      heart: ["Iris", "Jasmine"],
      base: ["Amber", "Sandalwood"],
    },
  },
  {
    slug: "velvet-oud",
    name: "Velvet Oud",
    subtitle: "Extrait de Parfum",
    collection: "Oud",
    price: 320,
    size: "75 ml",
    rating: 4.8,
    reviews: 164,
    image: oud,
    gallery: [oud, signatureHero, heroBottle],
    description:
      "Deep, resinous and unapologetic. Aged oud wood is softened with saffron and a plush leather accord — a fragrance built for evening.",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua, Eugenol, Cinnamal. 28% extrait concentration. Vegan and cruelty free.",
    shipping:
      "Complimentary worldwide express shipping. Hand-packed in lacquered cedar. Delivered within 2–5 working days.",
    notes: {
      top: ["Saffron", "Pink Pepper"],
      heart: ["Rose", "Leather"],
      base: ["Oud", "Labdanum"],
    },
  },
  {
    slug: "white-jasmin",
    name: "White Jasmin",
    subtitle: "Eau de Parfum",
    collection: "Floral",
    price: 210,
    size: "100 ml",
    rating: 4.7,
    reviews: 301,
    image: floral,
    gallery: [floral, ig4, heroBottle],
    description:
      "Night-blooming jasmine sambac lifted by pear and softened with a cashmere musk drydown. Luminous, romantic, never heavy.",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua, Benzyl Salicylate, Linalool. 20% concentration. Vegan and cruelty free.",
    shipping:
      "Complimentary worldwide express shipping. Delivered within 2–5 working days in signature ITRAA packaging.",
    notes: {
      top: ["Pear", "Neroli"],
      heart: ["Jasmine Sambac", "Tuberose"],
      base: ["White Musk", "Vanilla"],
    },
  },
  {
    slug: "citrine-air",
    name: "Citrine Air",
    subtitle: "Eau de Toilette",
    collection: "Fresh",
    price: 180,
    size: "100 ml",
    rating: 4.6,
    reviews: 142,
    image: fresh,
    gallery: [fresh, ig2, heroBottle],
    description:
      "A clean sheet of light. Green mandarin and cut fig leaf over vetiver — the everyday signature for those who prefer restraint.",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Citral. 15% concentration. Vegan and cruelty free.",
    shipping:
      "Complimentary worldwide express shipping. Delivered within 2–5 working days.",
    notes: {
      top: ["Green Mandarin", "Lemon"],
      heart: ["Fig Leaf", "Lavender"],
      base: ["Vetiver", "Musk"],
    },
  },
];

export const noteFamilies = [
  {
    id: "top",
    label: "Top Notes",
    detail: "The opening — bright, volatile, gone within the hour.",
    items: ["Lemon", "Bergamot", "Orange Blossom"],
  },
  {
    id: "heart",
    label: "Heart Notes",
    detail: "The character — the accord that defines the composition.",
    items: ["Rose", "Jasmine", "Lavender"],
  },
  {
    id: "base",
    label: "Base Notes",
    detail: "The memory — resins and woods that hold for twelve hours.",
    items: ["Amber", "Musk", "Vanilla", "Sandalwood"],
  },
] as const;

export const testimonials = [
  {
    quote:
      "I have worn the same house fragrance for eleven years. Elysian Sun replaced it in a single afternoon.",
    name: "Amara Sethi",
    role: "Creative Director, Milan",
  },
  {
    quote:
      "Velvet Oud is the only oud I have found that feels modern rather than nostalgic. It reads as tailoring, not perfume.",
    name: "Julien Marchand",
    role: "Architect, Paris",
  },
  {
    quote:
      "The packaging alone deserves a shelf. What is inside deserves the skin. Nothing about ITRAA feels rushed.",
    name: "Hana Kobayashi",
    role: "Editor, Tokyo",
  },
  {
    quote:
      "Six people asked me what I was wearing in one evening. That has never happened before.",
    name: "Sofia Almeida",
    role: "Gallerist, Lisbon",
  },
];

export const pillars = [
  { title: "Long Lasting", copy: "12+ hour wear from high-concentration oils." },
  { title: "Premium Ingredients", copy: "Ethically sourced absolutes and essences." },
  { title: "Luxury Packaging", copy: "Hand-finished glass, cedar and cotton." },
  { title: "Cruelty Free", copy: "Never tested on animals. Vegan formulas." },
  { title: "Gift Ready", copy: "Every order arrives ribboned and boxed." },
  { title: "Worldwide Shipping", copy: "Complimentary express to 60+ countries." },
];
