import floral from "@/assets/collection-floral.jpg";
import oud from "@/assets/collection-oud.jpg";
import fresh from "@/assets/collection-fresh.jpg";
import signature from "@/assets/collection-signature.jpg";
import atelier from "@/assets/story-atelier.jpg";
import storyCrafting from "@/assets/story-crafting.png";
import ig1 from "@/assets/ig-1.jpg";
import ig2 from "@/assets/ig-2.jpg";
import ig3 from "@/assets/ig-3.jpg";
import ig4 from "@/assets/ig-4.jpg";
import ig5 from "@/assets/ig-5.jpg";
import ig6 from "@/assets/ig-6.jpg";
import homepageHero from "@/assets/homepage-hero.jpg";
import arabicaImage from "@/assets/products/arabica.jpg";
import liberaImage from "@/assets/products/libera.jpg";
import obsidianImage from "@/assets/products/obsidian.jpg";
import revaImage from "@/assets/products/reva.jpg";
import rogueImage from "@/assets/products/rogue.jpg";
import vanillaNoirImage from "@/assets/products/vanilla-noir.jpg";
import velocityImage from "@/assets/products/velocity.jpg";
import velorisImage from "@/assets/products/veloris.jpg";

export const images = {
  heroBottle: homepageHero,
  floral,
  oud,
  fresh,
  signature,
  atelier,
  storyCrafting,
  signatureHero: arabicaImage,
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
  variants: { size: "30 ml" | "50 ml" | "100 ml"; price: number }[];
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  description: string;
  ingredients: string;
  shipping: string;
  notes: { top: string[]; heart: string[]; base: string[] };
};

export const formatINR = (price: number) => `₹${price.toLocaleString("en-IN")}`;

export const products: Product[] = [
  {
    slug: "velocity",
    name: "Velocity",
    subtitle: "Eau de Parfum",
    collection: "Signature",
    price: 499,
    size: "30 ml",
    variants: [
      { size: "30 ml", price: 499 },
      { size: "50 ml", price: 699 },
      { size: "100 ml", price: 1199 },
    ],
    rating: 4.9,
    reviews: 218,
    image: velocityImage,
    gallery: [velocityImage],
    description:
      "Bright citrus and aromatic woods move with effortless energy. Velocity is a clean, confident signature designed to stay with you from first light to late evening.",
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
    slug: "obsidian",
    name: "Obsidian",
    subtitle: "Extrait de Parfum",
    collection: "Oud",
    price: 599,
    size: "30 ml",
    variants: [
      { size: "30 ml", price: 599 },
      { size: "50 ml", price: 799 },
      { size: "100 ml", price: 1299 },
    ],
    rating: 4.8,
    reviews: 164,
    image: obsidianImage,
    gallery: [obsidianImage],
    description:
      "Dark woods, saffron and a smooth leather accord create a deep, polished trail. Obsidian is composed for evenings that call for quiet confidence.",
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
    slug: "rogue",
    name: "ROGUE",
    subtitle: "Eau de Parfum",
    collection: "Signature",
    price: 599,
    size: "30 ml",
    variants: [
      { size: "30 ml", price: 599 },
      { size: "50 ml", price: 799 },
      { size: "100 ml", price: 1299 },
    ],
    rating: 4.8,
    reviews: 187,
    image: rogueImage,
    gallery: [rogueImage],
    description:
      "Spiced citrus breaks into smoky amber and dry cedar. ROGUE is bold without being loud—a modern scent with an unmistakable edge.",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua, Benzyl Salicylate, Linalool. 20% concentration. Vegan and cruelty free.",
    shipping:
      "Complimentary worldwide express shipping. Delivered within 2–5 working days in signature ITRAA packaging.",
    notes: {
      top: ["Bergamot", "Black Pepper"],
      heart: ["Saffron", "Cedar"],
      base: ["Amber", "Musk"],
    },
  },
  {
    slug: "veloris",
    name: "Veloris",
    subtitle: "Eau de Parfum",
    collection: "Fresh",
    price: 599,
    size: "30 ml",
    variants: [
      { size: "30 ml", price: 599 },
      { size: "50 ml", price: 799 },
      { size: "100 ml", price: 1299 },
    ],
    rating: 4.7,
    reviews: 156,
    image: velorisImage,
    gallery: [velorisImage],
    description:
      "A cool rush of mandarin and green leaves settles into vetiver and soft musk. Veloris feels crisp, refined and endlessly wearable.",
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
  {
    slug: "arabica",
    name: "Arabica",
    subtitle: "Premium Extrait de Parfum",
    collection: "Oud",
    price: 599,
    size: "30 ml",
    variants: [
      { size: "30 ml", price: 599 },
      { size: "50 ml", price: 899 },
      { size: "100 ml", price: 1399 },
    ],
    rating: 4.9,
    reviews: 204,
    image: arabicaImage,
    gallery: [arabicaImage],
    description:
      "Roasted coffee, cardamom and warm resin unfold over a velvety oud base. Arabica is a rich premium composition with exceptional depth.",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua, Eugenol, Cinnamal. High-concentration fragrance oils. Vegan and cruelty free.",
    shipping:
      "Complimentary express shipping. Delivered in signature ITRAA packaging within 2–5 working days.",
    notes: {
      top: ["Coffee", "Cardamom"],
      heart: ["Rose", "Cacao"],
      base: ["Oud", "Amber"],
    },
  },
  {
    slug: "floreva",
    name: "Floreva",
    subtitle: "Eau de Parfum",
    collection: "Floral",
    price: 599,
    size: "30 ml",
    variants: [
      { size: "30 ml", price: 599 },
      { size: "50 ml", price: 799 },
      { size: "100 ml", price: 1299 },
    ],
    rating: 4.8,
    reviews: 173,
    image: revaImage,
    gallery: [revaImage],
    description:
      "Luminous jasmine and rose petals bloom over cashmere musk. Floreva is soft, graceful and memorable without ever feeling heavy.",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua, Benzyl Salicylate, Linalool. Premium fragrance oils. Vegan and cruelty free.",
    shipping:
      "Complimentary express shipping. Delivered in signature ITRAA packaging within 2–5 working days.",
    notes: {
      top: ["Pear", "Neroli"],
      heart: ["Jasmine", "Rose"],
      base: ["Cashmere Musk", "Sandalwood"],
    },
  },
  {
    slug: "libera",
    name: "Libera",
    subtitle: "Eau de Parfum",
    collection: "Fresh",
    price: 599,
    size: "30 ml",
    variants: [
      { size: "30 ml", price: 599 },
      { size: "50 ml", price: 799 },
      { size: "100 ml", price: 1299 },
    ],
    rating: 4.7,
    reviews: 149,
    image: liberaImage,
    gallery: [liberaImage],
    description:
      "Sparkling citrus, lavender and clean woods create an airy sense of freedom. Libera is effortless, modern and made for every day.",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Linalool. Premium fragrance oils. Vegan and cruelty free.",
    shipping:
      "Complimentary express shipping. Delivered in signature ITRAA packaging within 2–5 working days.",
    notes: {
      top: ["Lemon", "Bergamot"],
      heart: ["Lavender", "Violet Leaf"],
      base: ["Musk", "Cedar"],
    },
  },
  {
    slug: "vanilla-noir",
    name: "Vanilla Noir",
    subtitle: "Premium Extrait de Parfum",
    collection: "Signature",
    price: 599,
    size: "30 ml",
    variants: [
      { size: "30 ml", price: 599 },
      { size: "50 ml", price: 899 },
      { size: "100 ml", price: 1399 },
    ],
    rating: 4.9,
    reviews: 231,
    image: vanillaNoirImage,
    gallery: [vanillaNoirImage],
    description:
      "Madagascan vanilla turns dark and sophisticated with amber, cacao and polished woods. Vanilla Noir is indulgent, smooth and distinctly premium.",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua, Coumarin, Benzyl Benzoate. High-concentration fragrance oils. Vegan and cruelty free.",
    shipping:
      "Complimentary express shipping. Delivered in signature ITRAA packaging within 2–5 working days.",
    notes: {
      top: ["Pink Pepper", "Bergamot"],
      heart: ["Vanilla", "Cacao"],
      base: ["Amber", "Sandalwood"],
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
      "Arabica has such a warm and rich fragrance. The coffee and sweet spicy notes are noticeable but not overpowering. I personally loved it for evening wear, especially in cooler weather.",
    name: "Ruchi Patel",
    role: "Jaipur",
  },
  {
    quote:
      "Vanilla Noir is soft, creamy and very comforting. I thought it might be too sweet, but it’s actually quite balanced. It settles beautifully after some time and feels really elegant.",
    name: "Pankhuri Jain",
    role: "Jaipur",
  },
  {
    quote:
      "Velocity is fresh, clean and very easy to wear. I’ve used it for office and casual outings, and it never feels too strong. The citrusy freshness makes it a really nice everyday fragrance.",
    name: "Arushi Chauhan",
    role: "Jaipur",
  },
  {
    quote:
      "Obsidian really impressed me. It starts fresh and then settles into a deeper, more premium fragrance. I wore it in the evening and could still notice it on my clothes hours later. Definitely feels worth the price.",
    name: "Abhishek Bhatt",
    role: "Jaipur",
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
