export interface ProductVariation {
  id: string;
  name: string;
  color?: string;
  priceModifier?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  category: string;
  subcategory?: string;
  tags: string[];
  images: string[];
  variations?: ProductVariation[];
  addOnsRecommended: string[];
  combinaCom: string[];
  relacionados: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories?: { id: string; name: string; slug: string }[];
}

export interface Occasion {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  heroTitle: string;
  heroSubtitle: string;
}

export const categories: Category[] = [
  {
    id: "flores",
    name: "Flores",
    slug: "flores",
    description: "Flores frescas para todas as ocasiões",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
    subcategories: [
      { id: "assinatura", name: "Assinatura", slug: "assinatura" },
      { id: "buque", name: "Buquê", slug: "buque" },
      { id: "combo-mes", name: "Combo do Mês", slug: "combo-mes" },
      { id: "ramalhete", name: "Ramalhete", slug: "ramalhete" },
      { id: "rosa-unica", name: "Rosa Única", slug: "rosa-unica" },
      { id: "flower-box", name: "Flower Box", slug: "flower-box" },
      { id: "flores-caneca", name: "Flores na Caneca", slug: "flores-caneca" },
    ],
  },
  {
    id: "cestas",
    name: "Cestas",
    slug: "cestas",
    description: "Cestas especiais com flores e presentes",
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800",
  },
  {
    id: "chocolates",
    name: "Chocolates",
    slug: "chocolates",
    description: "Chocolates finos para adoçar momentos",
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800",
  },
  {
    id: "coroas",
    name: "Coroas",
    slug: "coroas",
    description: "Coroas e arranjos para homenagens",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800",
  },
];

export const occasions: Occasion[] = [
  {
    id: "aniversario",
    name: "Aniversário",
    slug: "aniversario",
    description: "Flores especiais para celebrar mais um ano de vida",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
    heroTitle: "Flores para Aniversário",
    heroSubtitle: "Celebre com flores que expressam carinho e alegria",
  },
  {
    id: "romantico",
    name: "Romântico",
    slug: "romantico",
    description: "Demonstre seu amor com flores apaixonantes",
    image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800",
    heroTitle: "Flores Românticas",
    heroSubtitle: "Surpreenda quem você ama com gestos inesquecíveis",
  },
  {
    id: "parabens",
    name: "Parabéns",
    slug: "parabens",
    description: "Felicite conquistas e momentos especiais",
    image: "https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=800",
    heroTitle: "Flores para Parabenizar",
    heroSubtitle: "Reconheça conquistas com flores que inspiram",
  },
  {
    id: "maternidade",
    name: "Maternidade",
    slug: "maternidade",
    description: "Celebre a chegada de um novo ser",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800",
    heroTitle: "Flores para Maternidade",
    heroSubtitle: "Dê as boas-vindas aos novos membros da família",
  },
  {
    id: "condolencias",
    name: "Condolências",
    slug: "condolencias",
    description: "Expresse solidariedade em momentos difíceis",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800",
    heroTitle: "Flores de Condolências",
    heroSubtitle: "Transmita conforto e respeito",
  },
  {
    id: "agradecimento",
    name: "Agradecimento",
    slug: "agradecimento",
    description: "Agradeça com flores que falam por você",
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800",
    heroTitle: "Flores de Agradecimento",
    heroSubtitle: "Demonstre gratidão de forma especial",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Buquê Encanto de Rosas Vermelhas",
    slug: "buque-encanto-rosas-vermelhas",
    price: 189.90,
    originalPrice: 219.90,
    description: "Um buquê clássico e elegante com 24 rosas vermelhas frescas, cuidadosamente selecionadas e arranjadas. Perfeito para expressar amor e paixão. Acompanha papel de seda premium e laço de cetim.",
    shortDescription: "24 rosas vermelhas com embalagem premium",
    category: "flores",
    subcategory: "buque",
    tags: ["romântico", "aniversário", "amor", "rosas"],
    images: [
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800",
      "https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?w=800",
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800",
    ],
    variations: [
      { id: "vermelho", name: "Vermelho Clássico", color: "#DC2626" },
      { id: "rosa", name: "Rosa Suave", color: "#F472B6" },
      { id: "branco", name: "Branco Puro", color: "#FFFFFF" },
    ],
    addOnsRecommended: ["7", "8", "9"],
    combinaCom: ["2", "3", "5"],
    relacionados: ["2", "4", "6"],
    inStock: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 127,
  },
  {
    id: "2",
    name: "Combo Girassol & Amor",
    slug: "combo-girassol-amor",
    price: 159.90,
    description: "Combo especial do mês com girassóis radiantes, flores do campo e complementos que trazem alegria. Ideal para iluminar o dia de alguém especial.",
    shortDescription: "Girassóis com flores do campo",
    category: "flores",
    subcategory: "combo-mes",
    tags: ["aniversário", "parabéns", "alegria", "girassol"],
    images: [
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800",
      "https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=800",
    ],
    addOnsRecommended: ["7", "10"],
    combinaCom: ["1", "3"],
    relacionados: ["3", "4", "5"],
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "Flower Box Elegance",
    slug: "flower-box-elegance",
    price: 249.90,
    description: "Caixa sofisticada com rosas preservadas e flores frescas em arranjo artístico. Um presente que impressiona e dura mais tempo.",
    shortDescription: "Caixa elegante com rosas mistas",
    category: "flores",
    subcategory: "flower-box",
    tags: ["romântico", "luxo", "presente", "especial"],
    images: [
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800",
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800",
    ],
    variations: [
      { id: "rosa-vermelho", name: "Rosa & Vermelho", color: "#DC2626" },
      { id: "branco-rosa", name: "Branco & Rosa", color: "#FFC0CB" },
      { id: "mix-colorido", name: "Mix Colorido", color: "#9333EA" },
    ],
    addOnsRecommended: ["8", "9"],
    combinaCom: ["1", "5"],
    relacionados: ["1", "5", "6"],
    inStock: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 64,
  },
  {
    id: "4",
    name: "Ramalhete Primavera",
    slug: "ramalhete-primavera",
    price: 89.90,
    description: "Ramalhete delicado com flores da estação em tons suaves. Perfeito para demonstrar carinho de forma simples e elegante.",
    shortDescription: "Flores da estação em tons suaves",
    category: "flores",
    subcategory: "ramalhete",
    tags: ["aniversário", "agradecimento", "simples"],
    images: [
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
    ],
    addOnsRecommended: ["7"],
    combinaCom: ["2", "6"],
    relacionados: ["2", "5", "6"],
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: "5",
    name: "Rosa Única Premium",
    slug: "rosa-unica-premium",
    price: 49.90,
    description: "Uma única rosa vermelha de haste longa, embalada com elegância. O símbolo clássico do amor em sua forma mais pura.",
    shortDescription: "Rosa vermelha de haste longa",
    category: "flores",
    subcategory: "rosa-unica",
    tags: ["romântico", "amor", "simples", "clássico"],
    images: [
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800",
    ],
    variations: [
      { id: "vermelho", name: "Vermelho", color: "#DC2626" },
      { id: "rosa", name: "Rosa", color: "#F472B6" },
      { id: "branco", name: "Branco", color: "#FFFFFF" },
      { id: "amarelo", name: "Amarelo", color: "#FACC15" },
    ],
    addOnsRecommended: ["8", "9"],
    combinaCom: ["1", "3"],
    relacionados: ["1", "4", "6"],
    inStock: true,
    rating: 4.8,
    reviewCount: 203,
  },
  {
    id: "6",
    name: "Flores na Caneca Love",
    slug: "flores-caneca-love",
    price: 79.90,
    description: "Arranjo delicado de mini rosas em caneca personalizada. Um presente útil e encantador que pode ser reutilizado.",
    shortDescription: "Mini rosas em caneca decorativa",
    category: "flores",
    subcategory: "flores-caneca",
    tags: ["presente", "aniversário", "útil"],
    images: [
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800",
    ],
    addOnsRecommended: ["7", "8"],
    combinaCom: ["4", "5"],
    relacionados: ["4", "5", "2"],
    inStock: true,
    rating: 4.6,
    reviewCount: 78,
  },
  {
    id: "7",
    name: "Caixa Ferrero Rocher",
    slug: "caixa-ferrero-rocher",
    price: 59.90,
    description: "Caixa com 12 bombons Ferrero Rocher. O complemento perfeito para seu presente de flores.",
    shortDescription: "12 bombons Ferrero Rocher",
    category: "chocolates",
    tags: ["complemento", "chocolate", "presente"],
    images: [
      "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800",
    ],
    addOnsRecommended: [],
    combinaCom: ["1", "3", "5"],
    relacionados: ["8", "9", "10"],
    inStock: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "8",
    name: "Nutella 350g",
    slug: "nutella-350g",
    price: 34.90,
    description: "Pote de Nutella 350g. Adoce ainda mais seu presente especial.",
    shortDescription: "Creme de avelã Nutella",
    category: "chocolates",
    tags: ["complemento", "doce", "presente"],
    images: [
      "https://images.unsplash.com/photo-1604298458750-020b9f43c4ed?w=800",
    ],
    addOnsRecommended: [],
    combinaCom: ["1", "2", "3"],
    relacionados: ["7", "9", "10"],
    inStock: true,
    rating: 4.8,
    reviewCount: 189,
  },
  {
    id: "9",
    name: "Caixa de Chocolates Finos",
    slug: "caixa-chocolates-finos",
    price: 89.90,
    description: "Seleção de chocolates finos artesanais em caixa decorativa. 20 unidades sortidas.",
    shortDescription: "20 chocolates artesanais sortidos",
    category: "chocolates",
    tags: ["complemento", "chocolate", "luxo"],
    images: [
      "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800",
    ],
    addOnsRecommended: [],
    combinaCom: ["1", "3"],
    relacionados: ["7", "8", "10"],
    inStock: true,
    rating: 4.9,
    reviewCount: 145,
  },
  {
    id: "10",
    name: "Cesta Café da Manhã",
    slug: "cesta-cafe-manha",
    price: 199.90,
    originalPrice: 229.90,
    description: "Cesta completa com pães, frios, sucos, frutas, doces e flores. Ideal para surpreender no café da manhã.",
    shortDescription: "Café da manhã completo com flores",
    category: "cestas",
    tags: ["presente", "especial", "café"],
    images: [
      "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800",
    ],
    addOnsRecommended: ["7", "8"],
    combinaCom: ["1", "2"],
    relacionados: ["11", "12"],
    inStock: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 98,
  },
  {
    id: "11",
    name: "Cesta Romântica",
    slug: "cesta-romantica",
    price: 249.90,
    description: "Cesta especial com espumante, chocolates, flores e velas aromáticas. Perfeita para momentos a dois.",
    shortDescription: "Espumante, chocolates e flores",
    category: "cestas",
    tags: ["romântico", "especial", "luxo"],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    ],
    addOnsRecommended: [],
    combinaCom: ["1", "5"],
    relacionados: ["10", "12", "3"],
    inStock: true,
    rating: 4.8,
    reviewCount: 67,
  },
  {
    id: "12",
    name: "Coroa de Flores Respeito",
    slug: "coroa-flores-respeito",
    price: 299.90,
    description: "Coroa de flores naturais em tons de branco e verde. Expressa respeito e solidariedade em momentos de despedida.",
    shortDescription: "Coroa em tons de branco e verde",
    category: "coroas",
    tags: ["condolências", "respeito", "homenagem"],
    images: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800",
    ],
    addOnsRecommended: [],
    combinaCom: [],
    relacionados: ["13", "14"],
    inStock: true,
    rating: 5.0,
    reviewCount: 34,
  },
  {
    id: "13",
    name: "Coroa Saudade Eterna",
    slug: "coroa-saudade-eterna",
    price: 349.90,
    description: "Coroa grande com rosas, lírios e folhagens nobres. Uma homenagem digna para momentos de despedida.",
    shortDescription: "Coroa grande com rosas e lírios",
    category: "coroas",
    tags: ["condolências", "respeito", "homenagem"],
    images: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800",
    ],
    addOnsRecommended: [],
    combinaCom: [],
    relacionados: ["12", "14"],
    inStock: true,
    rating: 5.0,
    reviewCount: 28,
  },
  {
    id: "14",
    name: "Arranjo Paz",
    slug: "arranjo-paz",
    price: 179.90,
    description: "Arranjo discreto e elegante para velórios e homenagens. Flores brancas simbolizando paz.",
    shortDescription: "Arranjo de flores brancas",
    category: "coroas",
    tags: ["condolências", "paz", "homenagem"],
    images: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800",
    ],
    addOnsRecommended: [],
    combinaCom: [],
    relacionados: ["12", "13"],
    inStock: true,
    rating: 4.9,
    reviewCount: 45,
  },
];

export const subscriptionPlans = [
  {
    id: "orquidea-semanal",
    name: "Orquídea Semanal",
    slug: "orquidea-semanal",
    price: 149.90,
    frequency: "semanal",
    description: "Receba uma orquídea fresca toda semana",
    benefits: [
      "4 entregas por mês",
      "Orquídeas premium selecionadas",
      "Mimo surpresa em meses de 5 semanas",
      "Vaso decorativo no primeiro pedido",
      "Pagamento via PIX ou cartão",
    ],
    image: "https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?w=800",
  },
  {
    id: "flores-quinzenal",
    name: "Flores Quinzenal",
    slug: "flores-quinzenal",
    price: 99.90,
    frequency: "quinzenal",
    description: "Arranjos variados a cada 15 dias",
    benefits: [
      "2 entregas por mês",
      "Arranjos exclusivos sazonais",
      "Cartão personalizado",
      "Desconto de 10% em produtos avulsos",
      "Pagamento via PIX ou cartão",
    ],
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
  },
  {
    id: "combo-mensal",
    name: "Combo Mensal Surpresa",
    slug: "combo-mensal",
    price: 189.90,
    frequency: "mensal",
    description: "Combo surpresa todo mês com flores e mimos",
    benefits: [
      "1 entrega por mês",
      "Flores + presente surpresa",
      "Vaso colecionável",
      "Desconto de 15% em produtos avulsos",
      "Frete grátis",
      "Pagamento via PIX ou cartão",
    ],
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800",
    popular: true,
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Maria Silva",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 5,
    text: "Entrega super rápida! Pedi às 14h e às 16h já estava com minha mãe. Flores lindíssimas e frescas.",
    date: "2024-12-10",
  },
  {
    id: "2",
    name: "João Santos",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
    text: "Surpreendi minha esposa no aniversário. Ela amou! O buquê estava perfeito e o atendimento foi excelente.",
    date: "2024-12-08",
  },
  {
    id: "3",
    name: "Ana Costa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 5,
    text: "Já compro há 2 anos. Qualidade sempre impecável. O Clube VB é maravilhoso, recebo flores toda semana!",
    date: "2024-12-05",
  },
  {
    id: "4",
    name: "Pedro Oliveira",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    rating: 5,
    text: "Precisei de uma coroa urgente e eles atenderam com muito respeito e profissionalismo. Recomendo.",
    date: "2024-12-01",
  },
  {
    id: "5",
    name: "Carla Mendes",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    rating: 4,
    text: "Flores sempre frescas e bonitas. Só achei o preço um pouco alto, mas a qualidade compensa.",
    date: "2024-11-28",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getProductsByTag(tag: string): Product[] {
  return products.filter(p => p.tags.includes(tag));
}

export function getRelatedProducts(productId: string): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  return product.relacionados.map(id => getProductById(id)).filter(Boolean) as Product[];
}

export function getCombinesWith(productId: string): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  return product.combinaCom.map(id => getProductById(id)).filter(Boolean) as Product[];
}

export function getRecommendedAddOns(productId: string): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  return product.addOnsRecommended.map(id => getProductById(id)).filter(Boolean) as Product[];
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.isBestSeller);
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
