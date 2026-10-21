export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number; // in ৳
  originalPrice: number; // in ৳
  unit: 'sq.ft' | 'pc'; // price per sq.ft or per piece
  pricePerM2: number; // kept as alias to price
  originalPricePerM2: number;
  boxCoverage: number; // coverage in sq.ft (or count of pcs) per box
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  badge?: string;
  material: string;
  finish: 'Matt' | 'Gloss' | 'Polished' | 'Textured';
  rooms: string[];
  dimensions: string;
  thickness: string;
  slipRating: string;
  inStock: boolean;
  stockCount: number;
  sampleAvailable: boolean;
  description: string;
  keyFeatures: string[];
}

export interface CartItem {
  id: string; // product id + variation/sample
  productId: string;
  product: Product;
  quantity: number; // in boxes (or units for samples)
  isSample: boolean;
  coverage: number; // in sq.ft or pcs
  coverageM2: number; // alias
  unitPrice: number;
}

export interface CustomerInspiration {
  id: string;
  handle: string;
  image: string;
  room: string;
  quote: string;
  productId: string;
  productName: string;
  likes: number;
}

export const CATEGORIES = [
  'All Tiles',
  'Shower Panels',
  'Acoustic Panels',
  'Wall Tiles',
  'Floor Tiles',
  'Stone Effect Tiles',
  'Marble Effect Tiles',
  'Metro Tiles',
  'Wood Effect Tiles',
  'Outdoor Tiles',
  'Pattern Tiles',
  'Natural Slate Tiles',
] as const;

export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  'All Tiles': 'https://images.pexels.com/photos/7587482/pexels-photo-7587482.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Shower Panels': 'https://images.pexels.com/photos/6987718/pexels-photo-6987718.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Acoustic Panels': 'https://images.pexels.com/photos/8082316/pexels-photo-8082316.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Wall Tiles': 'https://images.pexels.com/photos/7587747/pexels-photo-7587747.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Floor Tiles': 'https://images.pexels.com/photos/8141966/pexels-photo-8141966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Stone Effect Tiles': 'https://images.pexels.com/photos/7214728/pexels-photo-7214728.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Marble Effect Tiles': 'https://images.pexels.com/photos/4194867/pexels-photo-4194867.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Metro Tiles': 'https://images.pexels.com/photos/15871633/pexels-photo-15871633.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Wood Effect Tiles': 'https://images.pexels.com/photos/7587734/pexels-photo-7587734.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Outdoor Tiles': 'https://images.pexels.com/photos/8143711/pexels-photo-8143711.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Pattern Tiles': 'https://images.pexels.com/photos/7545494/pexels-photo-7545494.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Natural Slate Tiles': 'https://images.pexels.com/photos/6970057/pexels-photo-6970057.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export const PRODUCTS: Product[] = [
  {
    id: 'calacatta-gold-marble',
    name: 'Calacatta Luxe White Marble Effect',
    subtitle: 'High gloss polished porcelain wall & floor tiles',
    category: 'Marble Effect Tiles',
    price: 145,
    originalPrice: 180,
    unit: 'sq.ft',
    pricePerM2: 145,
    originalPricePerM2: 180,
    boxCoverage: 16, // 16 sq.ft per box (4 pcs of 2ft x 2ft)
    rating: 4.9,
    reviewCount: 142,
    badge: '20% OFF',
    material: 'Porcelain',
    finish: 'Polished',
    rooms: ['Bathroom', 'Kitchen', 'Living Room', 'Hallway'],
    dimensions: '600 x 600 mm (2 x 2 ft)',
    thickness: '9.5 mm',
    slipRating: 'R9',
    inStock: true,
    stockCount: 380,
    sampleAvailable: true,
    description:
      'Imbued with realistic gold and smoky charcoal veins on a pure milky-white background, our Calacatta Luxe porcelain replicates the grandeur of Italian quarried marble with unmatched durability.',
    keyFeatures: [
      'Precision rectified edges for ultra-fine 1.5mm grout joints',
      'High-gloss reflective mirror polish enhances room light',
      'Safe for underfloor heating systems up to 27°C',
      'Zero maintenance — impervious to stains, acids & scratches',
    ],
    image: 'https://images.pexels.com/photos/4194867/pexels-photo-4194867.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/4194867/pexels-photo-4194867.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7587747/pexels-photo-7587747.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8141966/pexels-photo-8141966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: 'kensington-metro-sage',
    name: 'Kensington Bevelled Metro Sage Green',
    subtitle: 'Classic Victorian brick ceramic wall tiles',
    category: 'Metro Tiles',
    price: 95,
    originalPrice: 120,
    unit: 'sq.ft',
    pricePerM2: 95,
    originalPricePerM2: 120,
    boxCoverage: 12, // 12 sq.ft per box
    rating: 4.8,
    reviewCount: 98,
    badge: 'Best Seller',
    material: 'Ceramic',
    finish: 'Gloss',
    rooms: ['Kitchen', 'Bathroom'],
    dimensions: '100 x 200 mm (4 x 8 in)',
    thickness: '7 mm',
    slipRating: 'N/A (Wall Only)',
    inStock: true,
    stockCount: 520,
    sampleAvailable: true,
    description:
      'The iconic London underground subway tile reimagined in a heritage British sage green. Features deep bevelled edges that catch the ambient light and add historic character to splashbacks and shower enclosures.',
    keyFeatures: [
      'Timeless bevelled edge profile adds depth and shadow lines',
      'Vibrant glazed finish cleans effortlessly with warm soapy water',
      'Versatile layout options: herringbone, brick bond or vertical stack',
      'Perfect splashback pairing with butcher-block or quartz worktops',
    ],
    image: 'https://images.pexels.com/photos/15871633/pexels-photo-15871633.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/15871633/pexels-photo-15871633.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7587482/pexels-photo-7587482.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: 'nordic-oak-wood-plank',
    name: 'Nordic Smoked Oak Natural Wood Plank',
    subtitle: 'Ultra-realistic textured porcelain floor tiles',
    category: 'Wood Effect Tiles',
    price: 160,
    originalPrice: 200,
    unit: 'sq.ft',
    pricePerM2: 160,
    originalPricePerM2: 200,
    boxCoverage: 14, // 14 sq.ft per box
    rating: 4.95,
    reviewCount: 215,
    badge: '20% OFF',
    material: 'Porcelain',
    finish: 'Textured',
    rooms: ['Living Room', 'Kitchen', 'Hallway', 'Bathroom'],
    dimensions: '200 x 1200 mm (8 x 48 in)',
    thickness: '9.0 mm',
    slipRating: 'R10',
    inStock: true,
    stockCount: 240,
    sampleAvailable: true,
    description:
      'Enjoy all the organic warmth and intricate graining of authentic Scandinavian smoked timber with zero warping, oiling or water staining. Built for busy modern homes with pets and heavy footfall.',
    keyFeatures: [
      'Synchronised 3D tactile woodgrain texture follows natural wood knots',
      '100% waterproof porcelain — ideal for wet rooms and utility spaces',
      'Superior thermal conductivity for cozy underfloor heating',
      'Over 24 distinct face variations for an organic, non-repeating pattern',
    ],
    image: 'https://images.pexels.com/photos/7587734/pexels-photo-7587734.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/7587734/pexels-photo-7587734.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8141966/pexels-photo-8141966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: 'aquastone-shower-panel-slate',
    name: 'AquaShield Slate Grey Shower Wall Panel',
    subtitle: 'Grout-free 100% waterproof tongue & groove system',
    category: 'Shower Panels',
    price: 2450,
    originalPrice: 3050,
    unit: 'pc', // per piece
    pricePerM2: 2450,
    originalPricePerM2: 3050,
    boxCoverage: 1, // 1 piece per pack
    rating: 4.85,
    reviewCount: 84,
    badge: 'Trending',
    material: 'Solid Composite Core',
    finish: 'Matt',
    rooms: ['Bathroom'],
    dimensions: '1000 x 2400 mm (1 x 2.4 m)',
    thickness: '10 mm',
    slipRating: 'N/A (Wall)',
    inStock: true,
    stockCount: 95,
    sampleAvailable: true,
    description:
      'Say goodbye to mouldy grout lines forever. The AquaShield high-pressure composite shower panel provides a continuous, seamless waterproof seal with rapid DIY click-fit tongue and groove installation.',
    keyFeatures: [
      '100% mould and mildew resistant surface with antibacterial coating',
      'Fast installation directly over existing tiles without messy stripping',
      'Precision Hydrolock tongue-and-groove invisible joining',
      '15-year residential waterproof guarantee included',
    ],
    image: 'https://images.pexels.com/photos/6987718/pexels-photo-6987718.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/6987718/pexels-photo-6987718.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7214728/pexels-photo-7214728.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: 'slatwall-acoustic-walnut',
    name: 'AcoustiSlat Natural Walnut Acoustic Wall Panel',
    subtitle: 'Felt-backed sound absorbing architectural slatted panel',
    category: 'Acoustic Panels',
    price: 2850,
    originalPrice: 3550,
    unit: 'pc', // per piece
    pricePerM2: 2850,
    originalPricePerM2: 3550,
    boxCoverage: 1, // 1 piece per pack
    rating: 4.92,
    reviewCount: 167,
    badge: 'Popular',
    material: 'MDF + Recycled PET Acoustic Felt',
    finish: 'Matt',
    rooms: ['Living Room', 'Hallway'],
    dimensions: '600 x 2400 mm (2 x 8 ft)',
    thickness: '21 mm',
    slipRating: 'N/A (Wall)',
    inStock: true,
    stockCount: 180,
    sampleAvailable: true,
    description:
      'Transform your living room, media wall or bedroom with luxurious timber slats mounted on sound-dampening acoustic felt. Absorbs echo and reverberation for an intimate cinema-like atmosphere.',
    keyFeatures: [
      'Sound absorption Class A certified — reduces room echo by up to 60%',
      'Sustainably sourced real walnut wood veneer on black felt backing',
      'Quick screw or grab adhesive installation onto any flat wall or ceiling',
      'Easily cut around sockets, televisions and architectural corners',
    ],
    image: 'https://images.pexels.com/photos/8082316/pexels-photo-8082316.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/8082316/pexels-photo-8082316.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7587482/pexels-photo-7587482.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: 'valencia-encaustic-moroccan',
    name: 'Valencia Encaustic Geometric Pattern Tiles',
    subtitle: 'Heritage Mediterranean ceramic floor & wall tile',
    category: 'Pattern Tiles',
    price: 130,
    originalPrice: 165,
    unit: 'sq.ft',
    pricePerM2: 130,
    originalPricePerM2: 165,
    boxCoverage: 11, // 11 sq.ft per box
    rating: 4.88,
    reviewCount: 76,
    badge: '20% OFF',
    material: 'Ceramic',
    finish: 'Matt',
    rooms: ['Hallway', 'Bathroom', 'Kitchen'],
    dimensions: '200 x 200 mm (8 x 8 in)',
    thickness: '8 mm',
    slipRating: 'R10',
    inStock: true,
    stockCount: 310,
    sampleAvailable: true,
    description:
      'Inspired by historic Andalusian courtyards, our Valencia patterned tiles combine subtle charcoal, soft ivory and muted duck-egg accents to create striking statement hallway and cloakroom floors.',
    keyFeatures: [
      'Soft satin matt glaze provides slip confidence in wet bathroom zones',
      'Interlocking kaleidoscope pattern creates expansive visual charm',
      'Stain-resistant protective seal requires no periodic chemical waxing',
      'Matches seamlessly with subway wall tiles and brass tapware',
    ],
    image: 'https://images.pexels.com/photos/7545494/pexels-photo-7545494.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/7545494/pexels-photo-7545494.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/4194867/pexels-photo-4194867.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: 'cotswold-stone-effect',
    name: 'Cotswold Limestone Soft Ivory Stone Effect',
    subtitle: 'Large format tumbled-edge porcelain floor tiles',
    category: 'Stone Effect Tiles',
    price: 165,
    originalPrice: 205,
    unit: 'sq.ft',
    pricePerM2: 165,
    originalPricePerM2: 205,
    boxCoverage: 16, // 16 sq.ft per box
    rating: 4.79,
    reviewCount: 112,
    badge: '20% OFF',
    material: 'Porcelain',
    finish: 'Matt',
    rooms: ['Kitchen', 'Living Room', 'Hallway', 'Bathroom'],
    dimensions: '600 x 900 mm (2 x 3 ft)',
    thickness: '10 mm',
    slipRating: 'R10',
    inStock: true,
    stockCount: 420,
    sampleAvailable: true,
    description:
      'Emulate the rustic grandeur of traditional English country manor flags. Featuring gentle sedimentary fossils, subtle pitted textures and softly worn aged edges.',
    keyFeatures: [
      'Authentic weathered edge mimics hand-dressed heritage flagstones',
      'Dense non-porous porcelain body requires zero sealing or resealing',
      'High thermal mass distributes underfloor heat evenly and comfortably',
      'Scratch and frost-proof finish for lifelong family durability',
    ],
    image: 'https://images.pexels.com/photos/7214728/pexels-photo-7214728.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/7214728/pexels-photo-7214728.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8141966/pexels-photo-8141966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: 'brazilian-black-slate-outdoor',
    name: 'Matterhorn Charcoal Slate 20mm Outdoor Paver',
    subtitle: 'Extra thick anti-slip porcelain patio paving slabs',
    category: 'Outdoor Tiles',
    price: 210,
    originalPrice: 260,
    unit: 'sq.ft',
    pricePerM2: 210,
    originalPricePerM2: 260,
    boxCoverage: 12, // 12 sq.ft per box
    rating: 4.96,
    reviewCount: 153,
    badge: 'Heavy Duty',
    material: 'Porcelain (20mm)',
    finish: 'Textured',
    rooms: ['Outdoor'],
    dimensions: '600 x 600 mm (2 x 2 ft)',
    thickness: '20 mm',
    slipRating: 'R11 (Anti-Slip)',
    inStock: true,
    stockCount: 600,
    sampleAvailable: true,
    description:
      'Engineered specifically for outdoor patios, pathways and balconies. 20mm solid porcelain can be dry-laid onto pedestals, sand or mortar. Completely unaffected by moss, frost, BBQ grease and heavy patio furniture.',
    keyFeatures: [
      'R11 anti-slip textured grip — safe under rain, snow and near pool edges',
      'Impermeable to moisture: zero frost spalling or winter cracking',
      'Resistant to algae, mould, red wine and barbecue fat stains',
      'Withstands point vehicle loads and heavy garden structures',
    ],
    image: 'https://images.pexels.com/photos/8143711/pexels-photo-8143711.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/8143711/pexels-photo-8143711.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6970057/pexels-photo-6970057.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: 'welsh-rift-natural-slate',
    name: 'Rift Mountain Cleft Natural Slate Tiles',
    subtitle: '100% genuine quarry cleft slate with rich natural clefts',
    category: 'Natural Slate Tiles',
    price: 185,
    originalPrice: 230,
    unit: 'sq.ft',
    pricePerM2: 185,
    originalPricePerM2: 230,
    boxCoverage: 12, // 12 sq.ft per box
    rating: 4.83,
    reviewCount: 67,
    badge: 'Authentic Slate',
    material: 'Natural Slate',
    finish: 'Textured',
    rooms: ['Hallway', 'Kitchen', 'Living Room'],
    dimensions: '300 x 600 mm (1 x 2 ft)',
    thickness: '10 - 12 mm',
    slipRating: 'R11',
    inStock: true,
    stockCount: 190,
    sampleAvailable: true,
    description:
      'Directly sourced from European quarry beds, each tile offers a genuinely unique split-face surface with natural undulating layers of charcoal, graphite and subtle copper mineral flecks.',
    keyFeatures: [
      'Natural riven surface provides tactile grip and dramatic rustic depth',
      'Deep dark charcoal tones darken to jet black when sealed with colour intensifier',
      'Excellent natural heat storage for energy efficient underfloor heating',
      'Hardwearing natural stone that will last for generations',
    ],
    image: 'https://images.pexels.com/photos/6970057/pexels-photo-6970057.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/6970057/pexels-photo-6970057.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7214728/pexels-photo-7214728.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: 'ribbed-fluted-florentine-wall',
    name: 'Florentine Fluted Ribbed Ceramic Wall Tile',
    subtitle: 'Contemporary 3D tactile reeded surface in Chalk White',
    category: 'Wall Tiles',
    price: 140,
    originalPrice: 175,
    unit: 'sq.ft',
    pricePerM2: 140,
    originalPricePerM2: 175,
    boxCoverage: 12, // 12 sq.ft per box
    rating: 4.91,
    reviewCount: 88,
    badge: 'Architect Choice',
    material: 'Ceramic',
    finish: 'Matt',
    rooms: ['Bathroom', 'Kitchen'],
    dimensions: '200 x 600 mm (8 x 24 in)',
    thickness: '9 mm',
    slipRating: 'N/A (Wall)',
    inStock: true,
    stockCount: 260,
    sampleAvailable: true,
    description:
      'Capture modern Scandinavian minimalism with our 3D fluted architectural tiles. The rhythmic linear reeding plays with ambient and downward spotlighting to create stunning shadow play.',
    keyFeatures: [
      'Architectural 3D rib profile creates designer boutique hotel luxury',
      'Chalk white silk-matt finish is velvety to the touch and anti-fingerprint',
      'Installs horizontally for calming wideness or vertically for soaring ceilings',
      'Pairs elegantly with brushed brass and gunmetal bathroom fixtures',
    ],
    image: 'https://images.pexels.com/photos/7587747/pexels-photo-7587747.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/7587747/pexels-photo-7587747.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8141966/pexels-photo-8141966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: 'berlin-terrazzo-concrete',
    name: 'Berlin Urban Terrazzo Stone Effect Tiles',
    subtitle: 'Industrial concrete look with multicoloured aggregate chips',
    category: 'Floor Tiles',
    price: 155,
    originalPrice: 195,
    unit: 'sq.ft',
    pricePerM2: 155,
    originalPricePerM2: 195,
    boxCoverage: 16, // 16 sq.ft per box
    rating: 4.87,
    reviewCount: 104,
    badge: '20% OFF',
    material: 'Porcelain',
    finish: 'Matt',
    rooms: ['Kitchen', 'Bathroom', 'Hallway', 'Living Room'],
    dimensions: '600 x 600 mm (2 x 2 ft)',
    thickness: '9.5 mm',
    slipRating: 'R10',
    inStock: true,
    stockCount: 350,
    sampleAvailable: true,
    description:
      'Inspired by the vibrant Bauhaus loft aesthetics of modern Berlin. Combines an urban light grey cement backdrop with flecks of terracotta, quartz and obsidian.',
    keyFeatures: [
      'Durable matte glaze with soft micro-texture for superior foot safety',
      'Conceals daily household dust and water spots with ease',
      'Rectified square cuts allow razor-thin color-matched grout lines',
      'Suitable for residential and commercial heavy pedestrian usage',
    ],
    image: 'https://images.pexels.com/photos/8141966/pexels-photo-8141966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/8141966/pexels-photo-8141966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7587482/pexels-photo-7587482.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: 'porto-azulejo-blue-pattern',
    name: 'Porto Cobalt Blue Heritage Azulejo Tiles',
    subtitle: 'Handmade-look Portuguese glazed ceramic wall tiles',
    category: 'Pattern Tiles',
    price: 125,
    originalPrice: 155,
    unit: 'sq.ft',
    pricePerM2: 125,
    originalPricePerM2: 155,
    boxCoverage: 10, // 10 sq.ft per box
    rating: 4.94,
    reviewCount: 92,
    badge: 'New Arrival',
    material: 'Ceramic',
    finish: 'Gloss',
    rooms: ['Kitchen', 'Bathroom'],
    dimensions: '150 x 150 mm (6 x 6 in)',
    thickness: '7.5 mm',
    slipRating: 'N/A (Wall)',
    inStock: true,
    stockCount: 280,
    sampleAvailable: true,
    description:
      'Bring coastal Iberian romance into your kitchen and bathroom. Features delicate hand-painted floral flourishes in deep cobalt blue against an antique crackle-look ivory white glaze.',
    keyFeatures: [
      'Lustrous liquid-gloss glaze reflects spotlights and morning sunlight',
      'Softly undulating hand-made edge aesthetic gives vintage character',
      'High chemical resistance against kitchen grease, steam and cleaners',
      'Stunning feature splashback behind range cookers and sinks',
    ],
    image: 'https://images.pexels.com/photos/7587482/pexels-photo-7587482.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/7587482/pexels-photo-7587482.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/15871633/pexels-photo-15871633.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
];

export const INSPIRATIONS: CustomerInspiration[] = [
  {
    id: 'insp-1',
    handle: '@chelsea_home_reno',
    image: 'https://images.pexels.com/photos/6970057/pexels-photo-6970057.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    room: 'Master Bathroom',
    quote: 'Calacatta Luxe porcelain tiles on the floor and wall made our bathroom feel three times larger.',
    productId: 'calacatta-gold-marble',
    productName: 'Calacatta Luxe White Marble Effect',
    likes: 428,
  },
  {
    id: 'insp-2',
    handle: '@the_cotswold_cottage',
    image: 'https://images.pexels.com/photos/4194867/pexels-photo-4194867.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    room: 'Country Kitchen Diner',
    quote: 'Used Kensington Metro Sage behind the cooker. Genuinely beautiful shade of green and so easy to wipe down.',
    productId: 'kensington-metro-sage',
    productName: 'Kensington Bevelled Metro Sage Green',
    likes: 382,
  },
  {
    id: 'insp-3',
    handle: '@modern_edinburgh_flat',
    image: 'https://images.pexels.com/photos/8141966/pexels-photo-8141966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    room: 'Open Plan Living Room',
    quote: 'The Nordic Smoked Oak wood plank porcelain fooled everyone into thinking it was solid hardwood floor. Dogs cannot scratch it!',
    productId: 'nordic-oak-wood-plank',
    productName: 'Nordic Smoked Oak Natural Wood Plank',
    likes: 512,
  },
  {
    id: 'insp-4',
    handle: '@sussex_patio_garden',
    image: 'https://images.pexels.com/photos/7587747/pexels-photo-7587747.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    room: 'Garden Dining Patio',
    quote: '20mm Matterhorn Slate porcelain slabs installed on pedestals. Completely non-slip even when soaking wet after rain.',
    productId: 'brazilian-black-slate-outdoor',
    productName: 'Matterhorn Charcoal Slate 20mm Outdoor Paver',
    likes: 297,
  },
  {
    id: 'insp-5',
    handle: '@lofts_and_lines',
    image: 'https://images.pexels.com/photos/7545494/pexels-photo-7545494.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    room: 'Hallway Entrance',
    quote: 'Valencia pattern tiles on the entryway created an immediate wow factor the second anyone opens the front door!',
    productId: 'valencia-encaustic-moroccan',
    productName: 'Valencia Encaustic Geometric Pattern Tiles',
    likes: 641,
  },
];

export const SHOWROOMS = [
  {
    id: 'dhaka-flagship',
    name: 'Dhaka Central Showroom',
    address: 'Plot 42, Road 11, Banani',
    city: 'Dhaka',
    postcode: '1213',
    phone: '+880 1711 000001',
    hours: 'Sat - Thu: 9:00am - 8:00pm | Fri: 3:00pm - 8:00pm',
  },
  {
    id: 'chittagong-hub',
    name: 'Chittagong Design Hub',
    address: 'GEC Circle, CDA Avenue',
    city: 'Chittagong',
    postcode: '4000',
    phone: '+880 1711 000002',
    hours: 'Sat - Thu: 9:30am - 7:30pm | Fri: Closed',
  },
  {
    id: 'sylhet-showroom',
    name: 'Sylhet Trade & Retail Gallery',
    address: 'Subid Bazar Point',
    city: 'Sylhet',
    postcode: '3100',
    phone: '+880 1711 000003',
    hours: 'Sat - Thu: 10:00am - 8:00pm | Fri: 4:00pm - 8:00pm',
  },
  {
    id: 'uttara-gallery',
    name: 'Uttara Studio Experience',
    address: 'Sector 3, Jasimuddin Avenue',
    city: 'Dhaka',
    postcode: '1230',
    phone: '+880 1711 000004',
    hours: 'Sat - Thu: 9:00am - 8:00pm | Fri: 3:00pm - 8:00pm',
  },
];

export const PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  AUTUMN20: { discountPercent: 20, description: '20% off entire order (Big Autumn Sale)' },
  WELCOME10: { discountPercent: 10, description: '10% off your first purchase' },
  TRADE15: { discountPercent: 15, description: '15% trade discount applied' },
};
