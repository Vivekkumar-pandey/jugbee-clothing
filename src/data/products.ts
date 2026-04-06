export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  rating: number;
  reviews: number;
  trending: boolean;
  lowStock: boolean;
  newArrival: boolean;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Shadow Oversized Tee",
    price: 1299,
    originalPrice: 1999,
    category: "Tees",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Charcoal", hex: "#333333" },
      { name: "White", hex: "#f5f5f5" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 142,
    trending: true,
    lowStock: false,
    newArrival: false,
    description: "Premium heavyweight cotton oversized tee with drop shoulders. 240 GSM fabric for that perfect structured drape.",
  },
  {
    id: 2,
    name: "Ghost White Tee",
    price: 1199,
    originalPrice: 1799,
    category: "Tees",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop",
    colors: [
      { name: "White", hex: "#f5f5f5" },
      { name: "Cream", hex: "#f5f0e1" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 89,
    trending: false,
    lowStock: false,
    newArrival: true,
    description: "Minimalist white oversized tee. Clean lines, premium feel, designed for everyday style.",
  },
  {
    id: 3,
    name: "Tactical Co-ord Set",
    price: 2999,
    originalPrice: 4499,
    category: "Co-ords",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=800&fit=crop",
    colors: [
      { name: "Olive", hex: "#556b2f" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 203,
    trending: true,
    lowStock: true,
    newArrival: false,
    description: "Matching jogger + zip-up jacket set. Technical fabric with 4-way stretch for unrestricted movement.",
  },
  {
    id: 4,
    name: "Fury Performance Tank",
    price: 899,
    originalPrice: 1499,
    category: "Tanks",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop",
    colors: [
      { name: "Crimson", hex: "#dc143c" },
      { name: "Black", hex: "#111111" },
      { name: "Navy", hex: "#1a1a3e" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviews: 178,
    trending: false,
    lowStock: false,
    newArrival: false,
    description: "Lightweight mesh-panel tank top engineered for intense training. Moisture-wicking DryFit tech.",
  },
  {
    id: 5,
    name: "Armor Elite Hoodie",
    price: 2499,
    originalPrice: 3999,
    category: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop",
    colors: [
      { name: "Charcoal", hex: "#2d2d2d" },
      { name: "Black", hex: "#111111" },
      { name: "Grey", hex: "#808080" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 312,
    trending: true,
    lowStock: false,
    newArrival: false,
    description: "Heavyweight fleece hoodie with kangaroo pocket and ribbed cuffs. The ultimate cold-weather layer.",
  },
  {
    id: 6,
    name: "Stealth Mesh Shorts",
    price: 999,
    originalPrice: 1599,
    category: "Shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=800&fit=crop",
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Navy", hex: "#1a1a3e" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviews: 95,
    trending: false,
    lowStock: false,
    newArrival: true,
    description: "Ultra-light mesh training shorts with zippered pockets and inner lining for full support.",
  },
  {
    id: 7,
    name: "Venom Compression Top",
    price: 1799,
    originalPrice: 2499,
    category: "Compression",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&h=800&fit=crop",
    colors: [
      { name: "Navy", hex: "#1a1a3e" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 156,
    trending: false,
    lowStock: true,
    newArrival: false,
    description: "Second-skin compression fit with flatlock seams. Designed to reduce muscle fatigue during training.",
  },
  {
    id: 8,
    name: "Phantom Joggers",
    price: 1999,
    originalPrice: 2999,
    category: "Joggers",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop",
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Grey", hex: "#555555" },
      { name: "Olive", hex: "#556b2f" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 267,
    trending: true,
    lowStock: false,
    newArrival: false,
    description: "Slim-fit tapered joggers with elasticated waistband and deep pockets. Premium French terry fabric.",
  },
];

export const categories = ["All", "Tees", "Hoodies", "Shorts", "Joggers", "Co-ords", "Tanks", "Compression"];
