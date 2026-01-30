// Mock data for the artisan marketplace
// Replace with Firebase Firestore or API calls in production

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  caption: string;
  story: string;
  location: string;
  coordinates: { lat: number; lng: number };
  artisan: {
    name: string;
    avatar: string;
  };
  category: string;
  createdAt: string;
}

export interface Translation {
  [key: string]: {
    en: string;
    es: string;
  };
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Hand-Woven Alpaca Scarf",
    price: 85,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=600&fit=crop",
    caption: "Warmth woven with generations of Andean tradition ✨",
    story: "Each thread tells a story of the high Andes. My grandmother taught me this weaving technique when I was just seven years old. The patterns represent the mountains that surround our village, and the colors come from natural dyes made from local plants.",
    location: "Cusco, Peru",
    coordinates: { lat: -13.5319, lng: -71.9675 },
    artisan: {
      name: "María Elena",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face"
    },
    category: "Textiles",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Ceramic Moon Vase",
    price: 120,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop",
    caption: "Moonlight captured in clay, shaped by patient hands 🌙",
    story: "I create each piece during the full moon, following the ancient belief that the lunar energy brings life to the clay. This vase took three weeks to complete, with multiple firings to achieve the perfect glaze.",
    location: "Oaxaca, Mexico",
    coordinates: { lat: 17.0732, lng: -96.7266 },
    artisan: {
      name: "Carlos Mendoza",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    category: "Ceramics",
    createdAt: "2024-01-20"
  },
  {
    id: "3",
    name: "Olive Wood Cutting Board",
    price: 65,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?w=600&h=600&fit=crop",
    caption: "From ancient groves to your kitchen table 🫒",
    story: "This board was carved from a 200-year-old olive tree that fell naturally in my family's grove. The unique grain patterns are nature's artwork - no two boards are ever alike.",
    location: "Provence, France",
    coordinates: { lat: 43.9493, lng: 4.8055 },
    artisan: {
      name: "Jean-Pierre Dubois",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    category: "Woodwork",
    createdAt: "2024-02-01"
  },
  {
    id: "4",
    name: "Indigo Batik Wall Hanging",
    price: 150,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    caption: "Ancient indigo dreams, dipped in tradition 💙",
    story: "The indigo dye comes from plants I grow in my garden. Each dip into the vat takes the fabric deeper into that magical blue. This piece was dipped 42 times over two months.",
    location: "Yogyakarta, Indonesia",
    coordinates: { lat: -7.7956, lng: 110.3695 },
    artisan: {
      name: "Siti Rahayu",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
    },
    category: "Textiles",
    createdAt: "2024-02-10"
  },
  {
    id: "5",
    name: "Hand-Blown Glass Ornament",
    price: 45,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=600&h=600&fit=crop",
    caption: "Breath transformed into eternal beauty ✨",
    story: "Each ornament captures a single breath at 2000°F. My family has been glassblowing for five generations in this small workshop by the sea.",
    location: "Murano, Italy",
    coordinates: { lat: 45.4585, lng: 12.3530 },
    artisan: {
      name: "Giuseppe Rossi",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    category: "Glass",
    createdAt: "2024-02-15"
  },
  {
    id: "6",
    name: "Leather Journal",
    price: 55,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=600&fit=crop",
    caption: "Stories waiting to be written 📖",
    story: "The leather is vegetable-tanned using methods unchanged for 400 years. Each journal is hand-stitched and embossed with traditional Moroccan patterns.",
    location: "Fez, Morocco",
    coordinates: { lat: 34.0181, lng: -5.0078 },
    artisan: {
      name: "Hassan Benali",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
    },
    category: "Leather",
    createdAt: "2024-02-20"
  }
];

// Mock AI caption generator
// TODO: Replace with actual AI API call (OpenAI, Claude, etc.)
export const generateAICaption = async (productName: string, story: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const captions = [
    `Handcrafted with love, ${productName.toLowerCase()} tells a story of tradition ✨`,
    `Where heritage meets artistry - discover the soul behind ${productName.toLowerCase()} 🎨`,
    `Every detail whispers generations of craftsmanship 💫`,
    `From skilled hands to your home - authentic ${productName.toLowerCase()} 🏠`,
    `Tradition woven into every fiber of this beautiful ${productName.toLowerCase()} ❤️`,
  ];
  
  return captions[Math.floor(Math.random() * captions.length)];
};

// Translations for multilingual support
export const translations: Translation = {
  heroTitle: {
    en: "Discover Authentic Crafts from Local Artisans",
    es: "Descubre Artesanías Auténticas de Artesanos Locales"
  },
  heroSubtitle: {
    en: "Every piece tells a story. Connect with skilled craftspeople and bring home treasures that carry generations of tradition.",
    es: "Cada pieza cuenta una historia. Conecta con artesanos hábiles y lleva a casa tesoros que llevan generaciones de tradición."
  },
  exploreCrafts: {
    en: "Explore Crafts",
    es: "Explorar Artesanías"
  },
  sellAsArtisan: {
    en: "Sell as Artisan",
    es: "Vender como Artesano"
  },
  productFeed: {
    en: "Featured Creations",
    es: "Creaciones Destacadas"
  },
  buyNow: {
    en: "Buy Now",
    es: "Comprar Ahora"
  },
  addProduct: {
    en: "Add New Product",
    es: "Agregar Nuevo Producto"
  },
  generateCaption: {
    en: "Generate AI Caption",
    es: "Generar Subtítulo IA"
  },
  discoverLocations: {
    en: "Discover Locations",
    es: "Descubrir Ubicaciones"
  }
};
