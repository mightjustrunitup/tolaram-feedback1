
// Define product types
export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  variants: Array<{
    id: string;
    name: string;
  }>;
}

// Use local placeholder images with text to ensure display
export const products: Product[] = [
  {
    id: "indomie",
    name: "Indomie",
    image: "https://placehold.co/400x300/FFFFFF/E51E25?text=Indomie",
    description: "Delicious instant noodles with a variety of flavors",
    variants: [
      { id: "indomie-chicken", name: "Indomie Tables Chicken" },
      { id: "indomie-jollof", name: "Indomie Jollof Flavor" },
      { id: "indomie-onion-chicken", name: "Indomie Onion Chicken Flavour" },
      { id: "indomie-crayfish", name: "Indomie Crayfish Flavour" },
      { id: "indomie-chicken-pepper-soup", name: "Indomie Chicken Pepper Soup" },
      { id: "indomie-oriental", name: "Indomie Oriental Fried Noodle" },
      { id: "indomie-relish-beef", name: "Indomie Relish Beef" },
      { id: "indomie-relish-seafood", name: "Indomie Relish Sea Food Delight" }
    ]
  },
  {
    id: "minimie",
    name: "Minimie",
    image: "https://placehold.co/400x300/FFFFFF/FFB800?text=Minimie",
    description: "Mini-sized instant noodles perfect for snacking",
    variants: [
      { id: "minimie-chinchin", name: "Minimie Chinchin" },
      { id: "minimie-chinchin-spicy", name: "Minimie Chinchin (Hot and Spicy)" },
      { id: "minimie-noodle-chicken", name: "Minimie Instant Noodle Chicken Flavour" },
      { id: "minimie-noodle-vegetable", name: "Minimie Instant Noodle Vegetable" },
      { id: "minimie-noodle-tomato", name: "Minimie Instant Noodle Tomato" }
    ]
  },
  {
    id: "dano",
    name: "Dano Milk",
    image: "https://placehold.co/400x300/FFFFFF/0075C2?text=Dano+Milk",
    description: "High quality milk products for your daily needs",
    variants: [
      { id: "dano-slim", name: "Dano Slim" },
      { id: "dano-cool-cow", name: "Dano Cool Cow" },
      { id: "dano-uht", name: "Dano UHT" },
      { id: "dano-vitakids", name: "Dano Vitakids" }
    ]
  },
  {
    id: "kelloggs",
    name: "Kellogg's Cereals",
    image: "https://placehold.co/400x300/FFFFFF/E31837?text=Kellogg's",
    description: "Nutritious breakfast cereals for a great start to your day",
    variants: [
      { id: "kelloggs-corn-flakes", name: "Kelloggs Corn Flakes" },
      { id: "kelloggs-cocopops", name: "Kelloggs Cocopops" },
      { id: "kelloggs-frosties", name: "Kelloggs Frosties" },
      { id: "kelloggs-rice-krispies", name: "Kelloggs Rice Krispies" },
      { id: "kelloggs-crunchy-nut", name: "Kelloggs Crunchy Nut" },
      { id: "kelloggs-crispix", name: "Kelloggs Crispix" },
      { id: "kelloggs-krave", name: "Kelloggs Krave" }
    ]
  }
];

// Product issues list
export const PRODUCT_ISSUES = [
  "Mislabelled products / allergies",
  "Unusual taste or odor",
  "Texture - too hard or soft",
  "Mold or spoilage",
  "Foreign elements"
];
