/* ============================================================
   SIP — Product Data
   ============================================================ */

const IMG = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const CATEGORIES = [
  'T-Shirts',
  'Hoodies',
  'Sweatshirts',
  'Jackets',
  'Pants',
  'Accessories',
];

const PRODUCTS = [
  {
    id: 'ts-01',
    name: 'Essential Oversized Tee',
    category: 'T-Shirts',
    price: 45,
    popularity: 98,
    isNew: true,
    isBestSeller: true,
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Bone', hex: '#E8E3D9' },
      { name: 'Olive', hex: '#5A5E4A' },
    ],
    images: [
      IMG('photo-1521572163474-6864f9cf17ab'),
      IMG('photo-1503342217505-b0a15ec3261c'),
    ],
    description:
      'The foundation of every wardrobe. Cut from heavyweight organic cotton with a relaxed, boxy silhouette that drapes effortlessly on any body.',
    details:
      '100% organic cotton · 240gsm · Pre-shrunk · Unisex relaxed fit · Made in Portugal',
  },
  {
    id: 'ts-02',
    name: 'Heavyweight Logo Tee',
    category: 'T-Shirts',
    price: 52,
    popularity: 91,
    isNew: false,
    isBestSeller: true,
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'White', hex: '#F5F5F5' },
      { name: 'Charcoal', hex: '#4A4A4A' },
    ],
    images: [
      IMG('photo-1503342217505-b0a15ec3261c'),
      IMG('photo-1509631179647-0177331693ae'),
    ],
    description:
      'A statement in restraint. Our signature wordmark sits subtle on a dense, structured tee built to hold its shape wash after wash.',
    details:
      '100% combed cotton · 260gsm · Screen-printed logo · Ribbed collar · Unisex fit',
  },
  {
    id: 'ts-03',
    name: 'Boxy Pocket Tee',
    category: 'T-Shirts',
    price: 48,
    popularity: 76,
    isNew: true,
    isBestSeller: false,
    colors: [
      { name: 'Ecru', hex: '#DCD5C4' },
      { name: 'Black', hex: '#111111' },
      { name: 'Sage', hex: '#8A9A82' },
    ],
    images: [
      IMG('photo-1509631179647-0177331693ae'),
      IMG('photo-1521572163474-6864f9cf17ab'),
    ],
    description:
      'Clean lines meet everyday utility. A boxy cut with a single chest pocket, crafted from garment-washed cotton for a lived-in feel.',
    details:
      'Garment-washed cotton · 220gsm · Chest pocket · Double-needle hem · Unisex fit',
  },
  {
    id: 'hd-01',
    name: 'Core Fleece Hoodie',
    category: 'Hoodies',
    price: 95,
    popularity: 99,
    isNew: false,
    isBestSeller: true,
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Heather Grey', hex: '#9B9B9B' },
      { name: 'Sand', hex: '#C8BBA6' },
    ],
    images: [
      IMG('photo-1556821840-3a63f95609a7'),
      IMG('photo-1591047139829-d91aecb6caea'),
    ],
    description:
      'Your new default. Heavyweight brushed-back fleece, a double-layered hood and a generous kangaroo pocket — comfort without compromise.',
    details:
      'Cotton/poly fleece · 400gsm · Brushed interior · Double-layer hood · Unisex relaxed fit',
  },
  {
    id: 'hd-02',
    name: 'Heavyweight Zip Hoodie',
    category: 'Hoodies',
    price: 120,
    popularity: 84,
    isNew: true,
    isBestSeller: false,
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Bone', hex: '#E8E3D9' },
    ],
    images: [
      IMG('photo-1591047139829-d91aecb6caea'),
      IMG('photo-1578681994506-b8f463449011'),
    ],
    description:
      'Layer it your way. A full-zip construction in dense loopback cotton with a clean, minimal finish and premium metal hardware.',
    details:
      'Loopback cotton · 420gsm · YKK zip · Metal drawcord tips · Unisex regular fit',
  },
  {
    id: 'hd-03',
    name: 'Studio Oversized Hoodie',
    category: 'Hoodies',
    price: 110,
    popularity: 72,
    isNew: false,
    isBestSeller: false,
    colors: [
      { name: 'Charcoal', hex: '#3C3C3C' },
      { name: 'Olive', hex: '#5A5E4A' },
    ],
    images: [
      IMG('photo-1578681994506-b8f463449011'),
      IMG('photo-1556821840-3a63f95609a7'),
    ],
    description:
      'Dropped shoulders, extended sleeves and an oversized hood. Designed for an intentional, off-duty silhouette that still feels refined.',
    details:
      'French terry · 380gsm · Dropped shoulder · Ribbed cuffs · Unisex oversized fit',
  },
  {
    id: 'sw-01',
    name: 'Essential Crewneck',
    category: 'Sweatshirts',
    price: 88,
    popularity: 94,
    isNew: false,
    isBestSeller: true,
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Ecru', hex: '#DCD5C4' },
      { name: 'Navy', hex: '#1E2A3A' },
    ],
    images: [
      IMG('photo-1523398002811-999ca8dec234'),
      IMG('photo-1620799140408-edc6dcb6d633'),
    ],
    description:
      'Understated and endlessly wearable. A mid-weight crewneck with a clean neckline and a softly brushed interior for all-day comfort.',
    details:
      'Cotton blend · 360gsm · Brushed fleece interior · Ribbed collar & hem · Unisex fit',
  },
  {
    id: 'sw-02',
    name: 'Vintage Wash Crewneck',
    category: 'Sweatshirts',
    price: 98,
    popularity: 68,
    isNew: true,
    isBestSeller: false,
    colors: [
      { name: 'Faded Black', hex: '#2E2E2E' },
      { name: 'Dusty Rose', hex: '#B48C8C' },
    ],
    images: [
      IMG('photo-1620799140408-edc6dcb6d633'),
      IMG('photo-1523398002811-999ca8dec234'),
    ],
    description:
      'Washed for a perfectly worn-in character from day one. Each piece has subtle tonal variations that make it entirely your own.',
    details:
      'Garment-dyed cotton · 340gsm · Vintage wash finish · Unisex relaxed fit',
  },
  {
    id: 'sw-03',
    name: 'Paneled Sweatshirt',
    category: 'Sweatshirts',
    price: 105,
    popularity: 55,
    isNew: false,
    isBestSeller: false,
    colors: [
      { name: 'Grey', hex: '#7E7E7E' },
      { name: 'Forest', hex: '#33473B' },
    ],
    images: [
      IMG('photo-1556821840-3a63f95609a7'),
      IMG('photo-1620799140408-edc6dcb6d633'),
    ],
    description:
      'Considered construction with contrast panelling across the body and sleeves. A modern spin on a timeless staple.',
    details:
      'Cotton French terry · 350gsm · Contrast panel detailing · Unisex regular fit',
  },
  {
    id: 'jk-01',
    name: 'Utility Overshirt',
    category: 'Jackets',
    price: 160,
    popularity: 87,
    isNew: true,
    isBestSeller: false,
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Olive', hex: '#5A5E4A' },
      { name: 'Sand', hex: '#C8BBA6' },
    ],
    images: [
      IMG('photo-1544923246-77307dd654cb'),
      IMG('photo-1551028719-00167b16eac5'),
    ],
    description:
      'The layer that does it all. A structured overshirt with utility pockets and a clean collar — equal parts shirt and lightweight jacket.',
    details:
      'Cotton twill · 280gsm · Four front pockets · Corozo buttons · Unisex regular fit',
  },
  {
    id: 'jk-02',
    name: 'Minimalist Bomber',
    category: 'Jackets',
    price: 185,
    popularity: 89,
    isNew: false,
    isBestSeller: true,
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Navy', hex: '#1E2A3A' },
    ],
    images: [
      IMG('photo-1551028719-00167b16eac5'),
      IMG('photo-1544923246-77307dd654cb'),
    ],
    description:
      'A refined take on the classic bomber. Streamlined proportions, a matte shell and subtle ribbing create a sharp, modern outer layer.',
    details:
      'Recycled poly shell · Water-resistant · Ribbed cuffs & hem · Unisex regular fit',
  },
  {
    id: 'jk-03',
    name: 'Workwear Chore Jacket',
    category: 'Jackets',
    price: 170,
    popularity: 63,
    isNew: false,
    isBestSeller: false,
    colors: [
      { name: 'Indigo', hex: '#2E3B4E' },
      { name: 'Stone', hex: '#A9A294' },
    ],
    images: [
      IMG('photo-1544022613-e87ca75a784a'),
      IMG('photo-1551028719-00167b16eac5'),
    ],
    description:
      'Built from durable cotton canvas with a relaxed, workwear-inspired cut. Made to age beautifully and go with everything.',
    details:
      'Cotton canvas · 320gsm · Patch pockets · Antique brass buttons · Unisex relaxed fit',
  },
  {
    id: 'pt-01',
    name: 'Wide-Leg Trouser',
    category: 'Pants',
    price: 120,
    popularity: 92,
    isNew: false,
    isBestSeller: true,
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Charcoal', hex: '#4A4A4A' },
      { name: 'Beige', hex: '#C3B8A5' },
    ],
    images: [
      IMG('photo-1473966968600-fa801b869a1a'),
      IMG('photo-1542272604-787c3835535d'),
    ],
    description:
      'Fluid, effortless and endlessly versatile. A wide-leg trouser with a clean waistband and a beautiful drape that moves with you.',
    details:
      'Cotton twill · Relaxed wide leg · Side pockets · Unisex fit · Model is 6\'1" wearing M',
  },
  {
    id: 'pt-02',
    name: 'Relaxed Cargo Pant',
    category: 'Pants',
    price: 135,
    popularity: 79,
    isNew: true,
    isBestSeller: false,
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Olive', hex: '#5A5E4A' },
    ],
    images: [
      IMG('photo-1542272604-787c3835535d'),
      IMG('photo-1541099649105-f69ad21f3246'),
    ],
    description:
      'Modern utility, reimagined. Roomy cargo pockets, a tapered leg and a comfortable elastic waist bring function into the everyday.',
    details:
      'Cotton ripstop · Elasticated waist · Cargo pockets · Tapered leg · Unisex fit',
  },
  {
    id: 'pt-03',
    name: 'Straight Denim',
    category: 'Pants',
    price: 125,
    popularity: 70,
    isNew: false,
    isBestSeller: false,
    colors: [
      { name: 'Indigo', hex: '#2E3B4E' },
      { name: 'Black', hex: '#111111' },
    ],
    images: [
      IMG('photo-1541099649105-f69ad21f3246'),
      IMG('photo-1473966968600-fa801b869a1a'),
    ],
    description:
      'A clean, straight-leg jean in rigid premium denim. Designed to break in beautifully and become a personal staple over time.',
    details:
      '100% cotton denim · 13oz · Straight leg · Five-pocket construction · Unisex fit',
  },
  {
    id: 'ac-01',
    name: 'Signature Cap',
    category: 'Accessories',
    price: 40,
    popularity: 81,
    isNew: true,
    isBestSeller: false,
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Bone', hex: '#E8E3D9' },
    ],
    images: [
      IMG('photo-1588850561407-ed78c282e89b'),
      IMG('photo-1521369909029-2afed882baee'),
    ],
    description:
      'An unstructured six-panel cap with a curved brim and our embroidered mark. The finishing touch to any look.',
    details:
      'Washed cotton twill · Unstructured crown · Adjustable strap · Embroidered logo',
  },
  {
    id: 'ac-02',
    name: 'Canvas Tote',
    category: 'Accessories',
    price: 35,
    popularity: 58,
    isNew: false,
    isBestSeller: false,
    colors: [
      { name: 'Natural', hex: '#D8CDB8' },
      { name: 'Black', hex: '#111111' },
    ],
    images: [
      IMG('photo-1553062407-98eeb64c6a62'),
      IMG('photo-1588850561407-ed78c282e89b'),
    ],
    description:
      'Heavyweight cotton canvas with reinforced handles and an oversized silhouette. Built to carry everything, everywhere.',
    details:
      '12oz cotton canvas · Reinforced stitching · Internal slip pocket · 38 × 40 cm',
  },
  {
    id: 'ac-03',
    name: 'Knit Beanie',
    category: 'Accessories',
    price: 30,
    popularity: 52,
    isNew: false,
    isBestSeller: false,
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Grey', hex: '#7E7E7E' },
    ],
    images: [
      IMG('photo-1521369909029-2afed882baee'),
      IMG('photo-1553062407-98eeb64c6a62'),
    ],
    description:
      'A soft, ribbed knit beanie with a folded cuff. Understated warmth for cooler days and laid-back looks.',
    details:
      'Merino wool blend · Ribbed knit · Folded cuff · One size',
  },
];

/* Campaign / editorial imagery */
const CAMPAIGN = [
  { src: IMG('photo-1539109136881-3be0616acf4b', 1200), alt: 'Campaign — unisex editorial' },
  { src: IMG('photo-1515886657613-9f3515b0c78f', 900), alt: 'Campaign — monochrome style' },
  { src: IMG('photo-1529139574466-a303027c1d8b', 900), alt: 'Campaign — streetwear portrait' },
  { src: IMG('photo-1434389677669-e08b4cac3105', 900), alt: 'Campaign — duo in neutral tones' },
  { src: IMG('photo-1490481651871-ab68de25d43d', 900), alt: 'Campaign — everyday essentials' },
  { src: IMG('photo-1445205170230-053b83016050', 900), alt: 'Campaign — styled look' },
];

const HERO_IMAGE = IMG('photo-1539109136881-3be0616acf4b', 2000);
const FEATURED_IMAGE = IMG('photo-1483985988355-763728e1935b', 1600);
const PHILOSOPHY_IMAGE = IMG('photo-1441986300917-64674bd600d8', 1300);

/* Extra lifestyle image per category — gives every product a 3-photo gallery */
const EXTRA_GALLERY_IMAGES = {
  'T-Shirts': IMG('photo-1503341455253-b2e723bb3dbb', 900),
  'Hoodies': IMG('photo-1564859228273-274232fdb516', 900),
  'Sweatshirts': IMG('photo-1618354691373-d851c5c3a990', 900),
  'Jackets': IMG('photo-1511192336575-5a79af67a629', 900),
  'Pants': IMG('photo-1598033129183-c4f50c736f10', 900),
  'Accessories': IMG('photo-1489987707025-afc232f7ea0f', 900),
};

/* Assign available sizes and galleries per product */
PRODUCTS.forEach((p) => {
  /* Apparel offers the full unisex size range; accessories are genuinely one size */
  p.sizes = p.category === 'Accessories' ? ['ONE SIZE'] : ALL_SIZES.slice();

  p.gallery = [p.images[0], EXTRA_GALLERY_IMAGES[p.category], p.images[1]].filter(Boolean);
});
