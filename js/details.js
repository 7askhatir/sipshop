/* ============================================================
   SIP — Extended product details, specs & size guides
   Loaded after data.js so every product gets rich information.
   ============================================================ */

const STANDARD_CARE = [
  'Machine wash cold with like colours',
  'Do not bleach or use harsh detergents',
  'Reshape and hang to dry',
  'Iron on low heat — avoid prints and trims',
];

const APPAREL_SIZE_CHART = {
  columns: ALL_SIZES,
  rows: [
    { label: 'Chest', values: ['86–91', '91–97', '97–102', '102–107', '107–112', '112–117'] },
    { label: 'Waist', values: ['71–76', '76–81', '81–86', '86–91', '91–97', '97–102'] },
    { label: 'Hip', values: ['86–91', '91–97', '97–102', '102–107', '107–112', '112–117'] },
    { label: 'Body length', values: ['68', '70', '72', '74', '76', '78'] },
    { label: 'Sleeve', values: ['61', '62', '63', '64', '65', '66'] },
  ],
  unit: 'cm',
  note: 'Garment measurements, laid flat. Unisex sizing — size down for a closer fit or up for an oversized silhouette.',
};

const PRODUCT_SPECS = {
  'ts-01': {
    sku: 'SIP-TS01',
    fabric: '100% organic cotton · 240gsm',
    fit: 'Relaxed, oversized',
    origin: 'Made in Portugal',
    model: 'Model is 185cm / 6′1″ and wears size M',
    features: ['Dropped shoulder seam', 'Ribbed crew neck', 'Pre-shrunk for lasting shape', 'Twin-needle hem'],
    care: STANDARD_CARE,
  },
  'ts-02': {
    sku: 'SIP-TS02',
    fabric: '100% combed cotton · 260gsm',
    fit: 'Regular, structured',
    origin: 'Made in Portugal',
    model: 'Model is 180cm / 5′11″ and wears size M',
    features: ['Dense, shape-holding jersey', 'Screen-printed signature wordmark', 'Ribbed collar with taped neck', 'Reinforced shoulder seams'],
    care: [...STANDARD_CARE.slice(0, 2), 'Wash inside out to protect the print', STANDARD_CARE[3]],
  },
  'ts-03': {
    sku: 'SIP-TS03',
    fabric: '100% garment-washed cotton · 220gsm',
    fit: 'Boxy, cropped length',
    origin: 'Made in Portugal',
    model: 'Model is 178cm / 5′10″ and wears size S',
    features: ['Chest patch pocket', 'Garment-washed for a soft hand feel', 'Bound neckline', 'Slightly cropped body'],
    care: STANDARD_CARE,
  },
  'hd-01': {
    sku: 'SIP-HD01',
    fabric: '80% cotton / 20% recycled polyester · 400gsm',
    fit: 'Relaxed, true to size',
    origin: 'Made in Portugal',
    model: 'Model is 185cm / 6′1″ and wears size M',
    features: ['Double-layered hood', 'Brushed-back fleece', 'Kangaroo pocket', 'Ribbed cuffs and hem'],
    care: STANDARD_CARE,
  },
  'hd-02': {
    sku: 'SIP-HD02',
    fabric: '100% loopback cotton · 420gsm',
    fit: 'Regular, layer-friendly',
    origin: 'Made in Portugal',
    model: 'Model is 183cm / 6′0″ and wears size M',
    features: ['Full-length YKK zip', 'Metal drawcord tips', 'Two welt pockets', 'Clean, unbranded finish'],
    care: STANDARD_CARE,
  },
  'hd-03': {
    sku: 'SIP-HD03',
    fabric: 'Cotton French terry · 380gsm',
    fit: 'Oversized, dropped shoulder',
    origin: 'Made in Portugal',
    model: 'Model is 188cm / 6′2″ and wears size L',
    features: ['Extended sleeves', 'Oversized hood', 'Dropped shoulder seam', 'Ribbed cuffs and hem'],
    care: STANDARD_CARE,
  },
  'sw-01': {
    sku: 'SIP-SW01',
    fabric: 'Cotton blend fleece · 360gsm',
    fit: 'Regular, classic',
    origin: 'Made in Portugal',
    model: 'Model is 180cm / 5′11″ and wears size M',
    features: ['Clean ribbed neckline', 'Brushed interior', 'Set-in sleeves', 'Ribbed waistband'],
    care: STANDARD_CARE,
  },
  'sw-02': {
    sku: 'SIP-SW02',
    fabric: 'Garment-dyed cotton · 340gsm',
    fit: 'Relaxed, lived-in',
    origin: 'Made in Portugal',
    model: 'Model is 175cm / 5′9″ and wears size S',
    features: ['Garment-dyed vintage finish', 'Unique tonal variation per piece', 'Soft, broken-in feel from day one', 'Ribbed trims'],
    care: [...STANDARD_CARE.slice(0, 1), 'Wash separately — colour may transfer initially', STANDARD_CARE[2], STANDARD_CARE[3]],
  },
  'sw-03': {
    sku: 'SIP-SW03',
    fabric: 'Cotton French terry · 350gsm',
    fit: 'Regular, boxy',
    origin: 'Made in Portugal',
    model: 'Model is 182cm / 6′0″ and wears size M',
    features: ['Contrast panelled body and sleeves', 'Raw-edge detailing', 'Ribbed crew neck', 'Side seam taps'],
    care: STANDARD_CARE,
  },
  'jk-01': {
    sku: 'SIP-JK01',
    fabric: 'Cotton twill · 280gsm',
    fit: 'Regular, shirt-like',
    origin: 'Made in Portugal',
    model: 'Model is 185cm / 6′1″ and wears size M',
    features: ['Four utility pockets', 'Corozo nut buttons', 'Adjustable cuffs', 'Can be worn layered or alone'],
    care: ['Machine wash cold with like colours', 'Do not bleach', 'Hang to dry', 'Warm iron if needed'],
  },
  'jk-02': {
    sku: 'SIP-JK02',
    fabric: 'Recycled polyester shell · water-resistant finish',
    fit: 'Regular, streamlined',
    origin: 'Made in Vietnam',
    model: 'Model is 183cm / 6′0″ and wears size M',
    features: ['Water-resistant matte shell', 'Ribbed cuffs and hem', 'Two zip hand pockets', 'Recycled lining'],
    care: ['Machine wash cold on delicate cycle', 'Do not bleach', 'Hang to dry away from direct heat', 'Do not iron shell'],
  },
  'jk-03': {
    sku: 'SIP-JK03',
    fabric: 'Cotton canvas · 320gsm',
    fit: 'Relaxed, workwear',
    origin: 'Made in Portugal',
    model: 'Model is 188cm / 6′2″ and wears size L',
    features: ['Durable cotton canvas', 'Four patch pockets', 'Antique brass buttons', 'Designed to age beautifully'],
    care: ['Machine wash cold with like colours', 'Do not bleach', 'Hang to dry', 'Warm iron if needed'],
  },
  'pt-01': {
    sku: 'SIP-PT01',
    fabric: 'Cotton twill · 280gsm',
    fit: 'High rise, wide leg',
    origin: 'Made in Portugal',
    model: 'Model is 185cm / 6′1″ and wears size M (32″ waist)',
    features: ['Fluid wide-leg drape', 'Clean flat front', 'Side and back welt pockets', 'Belt loops'],
    care: ['Machine wash cold with like colours', 'Do not bleach', 'Hang to dry', 'Warm iron if needed'],
    sizeChart: {
      columns: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      rows: [
        { label: 'Waist', values: ['71', '76', '81', '86', '91', '97'] },
        { label: 'Hip', values: ['89', '94', '99', '104', '109', '114'] },
        { label: 'Inseam', values: ['76', '77', '78', '79', '80', '81'] },
        { label: 'Leg opening', values: ['24', '25', '26', '27', '28', '29'] },
      ],
      unit: 'cm',
      note: 'Measured flat. Inseam shown in centimetres. Sizes correspond to waist: XS 28″, S 30″, M 32″, L 34″, XL 36″, XXL 38″.',
    },
  },
  'pt-02': {
    sku: 'SIP-PT02',
    fabric: 'Cotton ripstop · 240gsm',
    fit: 'Relaxed, tapered leg',
    origin: 'Made in Vietnam',
    model: 'Model is 183cm / 6′0″ and wears size M (32″ waist)',
    features: ['Elasticated drawcord waist', 'Oversized cargo pockets', 'Tapered leg', 'Reinforced seams'],
    care: ['Machine wash cold with like colours', 'Do not bleach', 'Hang to dry', 'Warm iron avoiding trims'],
    sizeChart: {
      columns: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      rows: [
        { label: 'Waist (relaxed)', values: ['71', '76', '81', '86', '91', '97'] },
        { label: 'Hip', values: ['92', '97', '102', '107', '112', '117'] },
        { label: 'Inseam', values: ['75', '76', '77', '78', '79', '80'] },
        { label: 'Leg opening', values: ['17', '18', '19', '20', '21', '22'] },
      ],
      unit: 'cm',
      note: 'Elasticated waistband stretches up to 8cm. Sizes correspond to waist: XS 28″ through XXL 38″.',
    },
  },
  'pt-03': {
    sku: 'SIP-PT03',
    fabric: '13oz rigid cotton denim',
    fit: 'Mid rise, straight leg',
    origin: 'Made in Italy',
    model: 'Model is 185cm / 6′1″ and wears size M (32″ waist)',
    features: ['Premium rigid denim', 'Five-pocket construction', 'Branded metal hardware', 'Breaks in with wear'],
    care: ['Wash inside out in cold water', 'Do not bleach', 'Hang to dry', 'Expect natural fading over time'],
    sizeChart: {
      columns: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      rows: [
        { label: 'Waist', values: ['71', '76', '81', '86', '91', '97'] },
        { label: 'Hip', values: ['88', '93', '98', '103', '108', '113'] },
        { label: 'Inseam', values: ['79', '80', '81', '82', '83', '84'] },
        { label: 'Leg opening', values: ['19', '20', '21', '22', '23', '24'] },
      ],
      unit: 'cm',
      note: 'Rigid denim will relax approximately 1–2cm with wear. Sizes correspond to waist: XS 28″ through XXL 38″.',
    },
  },
  'ac-01': {
    sku: 'SIP-AC01',
    fabric: 'Washed cotton twill',
    fit: 'Unstructured, adjustable',
    origin: 'Made in China',
    model: 'One size — adjustable strap',
    features: ['Six-panel unstructured crown', 'Curved brim', 'Embroidered SIP mark', 'Adjustable metal buckle'],
    care: ['Spot clean with a damp cloth', 'Do not machine wash', 'Air dry away from direct sunlight', 'Do not iron embroidery'],
    sizeChart: {
      columns: ['ONE SIZE'],
      rows: [
        { label: 'Circumference', values: ['56–60 cm'] },
        { label: 'Brim length', values: ['7 cm'] },
        { label: 'Crown height', values: ['9 cm'] },
      ],
      unit: 'cm',
      note: 'Adjustable strap fits most head sizes. Circumference shown in centimetres.',
    },
  },
  'ac-02': {
    sku: 'SIP-AC02',
    fabric: '12oz heavyweight cotton canvas',
    fit: 'Oversized, open tote',
    origin: 'Made in India',
    model: 'One size — 38 × 40 cm',
    features: ['Reinforced handles', 'Internal slip pocket', 'Heavyweight natural canvas', 'Holds up to 12kg'],
    care: ['Spot clean with cold water', 'Air dry completely', 'Do not bleach', 'Iron on high if needed'],
    sizeChart: {
      columns: ['ONE SIZE'],
      rows: [
        { label: 'Width', values: ['38 cm'] },
        { label: 'Height', values: ['40 cm'] },
        { label: 'Handle drop', values: ['26 cm'] },
      ],
      unit: 'cm',
      note: 'Approximate dimensions. Natural canvas may soften and shrink slightly after first wash.',
    },
  },
  'ac-03': {
    sku: 'SIP-AC03',
    fabric: 'Merino wool blend',
    fit: 'Regular, stretchy',
    origin: 'Made in Italy',
    model: 'One size — fits most',
    features: ['Fine ribbed knit', 'Folded cuff', 'Soft, non-itch finish', 'Naturally temperature regulating'],
    care: ['Hand wash cold', 'Do not bleach', 'Dry flat to retain shape', 'Store folded, not hung'],
    sizeChart: {
      columns: ['ONE SIZE'],
      rows: [
        { label: 'Circumference', values: ['52–58 cm'] },
        { label: 'Height (unfolded)', values: ['24 cm'] },
      ],
      unit: 'cm',
      note: 'Stretchy ribbed knit comfortably fits most head sizes.',
    },
  },
};

/* Live stock levels per product */
const PRODUCT_STOCK = {
  'ts-01': 14, 'ts-02': 8, 'ts-03': 22,
  'hd-01': 5, 'hd-02': 17, 'hd-03': 9,
  'sw-01': 12, 'sw-02': 3, 'sw-03': 19,
  'jk-01': 6, 'jk-02': 11, 'jk-03': 4,
  'pt-01': 15, 'pt-02': 7, 'pt-03': 21,
  'ac-01': 10, 'ac-02': 26, 'ac-03': 13,
};

/* Merge specs into the product objects */
PRODUCTS.forEach((p) => {
  Object.assign(p, PRODUCT_SPECS[p.id] || {});
  if (!p.sizeChart) p.sizeChart = APPAREL_SIZE_CHART;
  p.stock = PRODUCT_STOCK[p.id] ?? 12;
});
