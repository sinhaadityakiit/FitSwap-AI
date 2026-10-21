import { GarmentItem } from '../types/catalogue';
import { getGarmentImageUrl } from './garment-images';

// Helper to attach verified, authentic local artwork directly to each garment
function withImage(item: Omit<GarmentItem, 'imageUrl'>): GarmentItem {
  const g = item as GarmentItem;
  g.imageUrl = getGarmentImageUrl(g);
  return g;
}

// CATEGORY A: PANTIES AND UNDERWEAR (23 items)
export const UNDERWEAR_ITEMS: GarmentItem[] = [
  'Classic briefs', 'Full briefs', 'Bikini briefs', 'High-cut briefs', 'Hipster panties',
  'Boyshorts', 'High-waisted panties', 'Low-rise panties', 'Thongs', 'G-strings',
  'V-strings', 'Cheeky panties', 'Brazilian-cut panties', 'Seamless panties', 'Cotton panties',
  'Lace panties', 'Satin panties', 'Microfiber panties', 'Shaping panties', 'Control briefs',
  'Period underwear', 'Maternity panties', 'Postpartum underwear'
].map((name, i) => withImage({
  id: `und-${i + 1}`,
  name,
  categoryId: 'underwear',
  categoryName: 'Underwear & Panties',
  layerType: 'underwear',
  description: `Comfort-fit ${name.toLowerCase()} designed with ergonomic seams and soft stretch lining.`,
  compatibleFabrics: ['Cotton', 'Lace', 'Satin', 'Microfiber', 'Nylon', 'Jersey'],
  compatibleWaistRises: ['High-Waisted', 'Mid-Rise', 'Low-Rise'],
  defaultOptions: {
    color: 'Rose Pink',
    fabric: name.toLowerCase().includes('lace') ? 'Lace' : name.toLowerCase().includes('satin') ? 'Satin' : 'Cotton',
    pattern: 'Plain / Solid colour',
    waistRise: name.toLowerCase().includes('high') ? 'High-Waisted' : name.toLowerCase().includes('low') ? 'Low-Rise' : 'Mid-Rise',
    coverage: name.toLowerCase().includes('thong') || name.toLowerCase().includes('g-string') ? 'Minimal' : name.toLowerCase().includes('full') ? 'Full' : 'Moderate',
    construction: name.toLowerCase().includes('seamless') ? 'Seamless' : 'Seamed'
  },
  tags: ['intimates', 'underwear', 'lingerie', name.toLowerCase()]
}));

// CATEGORY B: BRAS (26 items)
export const BRA_ITEMS: GarmentItem[] = [
  'T-shirt bras', 'Full-coverage bras', 'Demi bras', 'Balconette bras', 'Push-up bras',
  'Plunge bras', 'Strapless bras', 'Bandeau bras', 'Bralettes', 'Sports bras',
  'Wireless bras', 'Underwire bras', 'Padded bras', 'Non-padded bras', 'Lightly lined bras',
  'Convertible bras', 'Racerback bras', 'Front-closure bras', 'Minimizer bras', 'Longline bras',
  'Maternity bras', 'Nursing bras', 'Adhesive bras', 'Multiway bras', 'Triangle bras', 'Seamless bras'
].map((name, i) => withImage({
  id: `bra-${i + 1}`,
  name,
  categoryId: 'bras',
  categoryName: 'Bras',
  layerType: 'bra',
  description: `Supportive ${name.toLowerCase()} tailored for natural lift, smooth silhouette, and premium comfort.`,
  compatibleFabrics: ['Cotton', 'Lace', 'Satin', 'Microfiber', 'Mesh', 'Jersey'],
  compatibleNecklines: ['Plunge Neck', 'Sweetheart', 'Square Neck', 'V-Neck'],
  defaultOptions: {
    color: 'Beige',
    fabric: name.toLowerCase().includes('lace') ? 'Lace' : name.toLowerCase().includes('satin') ? 'Satin' : 'Cotton',
    pattern: 'Plain / Solid colour',
    strapStyle: name.toLowerCase().includes('strapless') ? 'Strapless' : name.toLowerCase().includes('racerback') ? 'Racerback' : 'Standard',
    padding: name.toLowerCase().includes('push-up') ? 'Heavy Push-Up' : name.toLowerCase().includes('non-padded') ? 'None' : 'Lightly Lined',
    neckline: name.toLowerCase().includes('plunge') ? 'Plunge' : 'Sweetheart'
  },
  tags: ['intimates', 'bra', 'lingerie', name.toLowerCase()]
}));

// CATEGORY C: CAMISOLES, SLIPS AND BASE LAYERS (14 items)
export const BASE_LAYER_ITEMS: GarmentItem[] = [
  'Camisoles', 'Spaghetti-strap tops', 'Tank tops', 'Ribbed camisoles', 'Full slips',
  'Half slips', 'Petticoats', 'Base-layer tops', 'Bodysuits', 'Shaping bodysuits',
  'Shaping shorts', 'Control garments', 'Waist cinchers', 'Seamless base layers'
].map((name, i) => withImage({
  id: `base-${i + 1}`,
  name,
  categoryId: 'base-layers',
  categoryName: 'Camisoles, Slips & Base Layers',
  layerType: 'base',
  description: `Essential ${name.toLowerCase()} for layering and smooth contours.`,
  compatibleFabrics: ['Silk', 'Satin', 'Cotton', 'Microfiber', 'Ribbed fabric', 'Nylon'],
  defaultOptions: {
    color: 'Black',
    fabric: name.toLowerCase().includes('ribbed') ? 'Ribbed fabric' : name.toLowerCase().includes('satin') ? 'Satin' : 'Cotton',
    pattern: 'Plain / Solid colour',
    fit: 'Fitted / Bodycon'
  },
  tags: ['base layer', 'shaping', 'camisole', name.toLowerCase()]
}));

// CATEGORY D: TOPS (27 items)
export const TOP_ITEMS: GarmentItem[] = [
  'Basic T-shirts', 'Oversized T-shirts', 'Fitted T-shirts', 'Crop tops', 'Tank tops',
  'Halter tops', 'Tube tops', 'Peplum tops', 'Off-shoulder tops', 'One-shoulder tops',
  'Wrap tops', 'Tunics', 'Camisole tops', 'Polo shirts', 'Knit tops',
  'Corset-style fashion tops', 'Button-down tops', 'Graphic tees', 'Ruffle tops', 'Puff-sleeve tops',
  'Tie-front tops', 'Square-neck tops', 'High-neck tops', 'Asymmetrical tops', 'Ribbed tops',
  'Sheer fashion tops', 'Embroidered tops'
].map((name, i) => withImage({
  id: `top-${i + 1}`,
  name,
  categoryId: 'tops',
  categoryName: 'Tops',
  layerType: 'top',
  description: `Chic ${name.toLowerCase()} featuring modern silhouettes and premium fabric drapery.`,
  compatibleFabrics: ['Cotton', 'Linen', 'Silk', 'Satin', 'Knit', 'Ribbed fabric', 'Chiffon'],
  compatibleNecklines: ['Crew Neck', 'V-Neck', 'Square Neck', 'Off-Shoulder', 'Sweetheart', 'Halter Neck'],
  compatibleSleeves: ['Short Sleeves', 'Sleeveless', 'Full Length Sleeves', 'Puff Sleeves'],
  defaultOptions: {
    color: 'White',
    fabric: name.toLowerCase().includes('knit') ? 'Knit' : name.toLowerCase().includes('corset') ? 'Satin' : 'Cotton',
    pattern: name.toLowerCase().includes('graphic') ? 'Abstract' : name.toLowerCase().includes('embroidered') ? 'Embroidered' : 'Plain / Solid colour',
    fit: name.toLowerCase().includes('oversized') ? 'Oversized / Loose' : name.toLowerCase().includes('crop') || name.toLowerCase().includes('fitted') ? 'Fitted / Bodycon' : 'Regular Fit'
  },
  tags: ['top', 'casual', 'streetwear', name.toLowerCase()]
}));

// CATEGORY E: SHIRTS AND BLOUSES (22 items)
export const SHIRT_ITEMS: GarmentItem[] = [
  'Formal shirts', 'Casual shirts', 'Oxford shirts', 'Button-down shirts', 'Linen shirts',
  'Denim shirts', 'Plaid shirts', 'Striped shirts', 'Silk blouses', 'Satin blouses',
  'Chiffon blouses', 'Puff-sleeve blouses', 'Bow-neck blouses', 'Wrap blouses', 'Oversized shirts',
  'Cropped shirts', 'Longline shirts', 'Ruffle blouses', 'Embroidered blouses', 'Short-sleeve shirts',
  'Long-sleeve shirts', 'Sleeveless shirts'
].map((name, i) => withImage({
  id: `shrt-${i + 1}`,
  name,
  categoryId: 'shirts-blouses',
  categoryName: 'Shirts & Blouses',
  layerType: 'top',
  description: `Sophisticated ${name.toLowerCase()} tailored for effortless transition from work to evening.`,
  compatibleFabrics: ['Cotton', 'Linen', 'Silk', 'Satin', 'Chiffon', 'Denim'],
  compatibleSleeves: ['Full Length Sleeves', 'Short Sleeves', 'Sleeveless', 'Puff Sleeves'],
  defaultOptions: {
    color: 'Sky Blue',
    fabric: name.toLowerCase().includes('silk') ? 'Silk' : name.toLowerCase().includes('satin') ? 'Satin' : name.toLowerCase().includes('chiffon') ? 'Chiffon' : name.toLowerCase().includes('linen') ? 'Linen' : 'Cotton',
    pattern: name.toLowerCase().includes('plaid') ? 'Checked / Plaid' : name.toLowerCase().includes('striped') ? 'Striped' : 'Plain / Solid colour',
    fit: name.toLowerCase().includes('oversized') ? 'Oversized / Loose' : 'Tailored / Structured'
  },
  tags: ['shirt', 'blouse', 'workwear', 'formal', name.toLowerCase()]
}));

// CATEGORY F: DRESSES (35 items)
export const DRESS_ITEMS: GarmentItem[] = [
  'A-line dresses', 'Bodycon dresses', 'Fit-and-flare dresses', 'Sheath dresses', 'Shift dresses',
  'Wrap dresses', 'Shirt dresses', 'Slip dresses', 'Maxi dresses', 'Midi dresses',
  'Mini dresses', 'Sundresses', 'Cocktail dresses', 'Evening dresses', 'Formal dresses',
  'Ball gowns', 'Mermaid dresses', 'Empire-waist dresses', 'Tiered dresses', 'Smock dresses',
  'Sweater dresses', 'Denim dresses', 'Floral dresses', 'Halter-neck dresses', 'Off-shoulder dresses',
  'One-shoulder dresses', 'High-low dresses', 'Pleated dresses', 'Ruffle dresses', 'Knit dresses',
  'Velvet dresses', 'Satin dresses', 'Sequin dresses', 'Kaftan dresses', 'Maternity dresses'
].map((name, i) => withImage({
  id: `drs-${i + 1}`,
  name,
  categoryId: 'dresses',
  categoryName: 'Dresses',
  layerType: 'dress',
  description: `Elegant ${name.toLowerCase()} crafted to elevate your presence for every special moment.`,
  compatibleFabrics: ['Silk', 'Satin', 'Chiffon', 'Georgette', 'Velvet', 'Cotton', 'Linen', 'Knit', 'Sequined fabric'],
  compatibleNecklines: ['Sweetheart', 'V-Neck', 'Off-Shoulder', 'Square Neck', 'Halter Neck'],
  compatibleSilhouettes: ['A-Line Cut', 'Circular / Full Flared Kalidar', 'Mermaid / Fish-Tail Silhouette'],
  defaultOptions: {
    color: 'Rose Pink',
    fabric: name.toLowerCase().includes('velvet') ? 'Velvet' : name.toLowerCase().includes('satin') ? 'Satin' : name.toLowerCase().includes('sequin') ? 'Sequined fabric' : 'Silk',
    pattern: name.toLowerCase().includes('floral') ? 'Floral' : 'Plain / Solid colour',
    fit: name.toLowerCase().includes('bodycon') ? 'Fitted / Bodycon' : 'Flowy / Flare',
    occasion: name.toLowerCase().includes('evening') || name.toLowerCase().includes('cocktail') || name.toLowerCase().includes('ball') ? 'Cocktail & Night Out' : 'Casual / Everyday'
  },
  tags: ['dress', 'gown', 'party', 'cocktail', name.toLowerCase()]
}));

// CATEGORY G: SKIRTS (23 items)
export const SKIRT_ITEMS: GarmentItem[] = [
  'Mini skirts', 'Midi skirts', 'Maxi skirts', 'A-line skirts', 'Pencil skirts',
  'Pleated skirts', 'Circle skirts', 'Wrap skirts', 'High-waisted skirts', 'Denim skirts',
  'Leather-look skirts', 'Satin skirts', 'Tulle skirts', 'Tiered skirts', 'Slit skirts',
  'Mermaid skirts', 'Tennis skirts', 'Cargo skirts', 'Asymmetrical skirts', 'Ruffle skirts',
  'Floral skirts', 'Knit skirts', 'Skorts'
].map((name, i) => withImage({
  id: `skrt-${i + 1}`,
  name,
  categoryId: 'skirts',
  categoryName: 'Skirts',
  layerType: 'bottom',
  description: `Fashion-forward ${name.toLowerCase()} providing graceful flow and versatile styling.`,
  compatibleFabrics: ['Denim', 'Satin', 'Faux leather', 'Cotton', 'Tulle', 'Knit', 'Linen'],
  compatibleWaistRises: ['High-Waisted', 'Mid-Rise'],
  defaultOptions: {
    color: 'Black',
    fabric: name.toLowerCase().includes('denim') ? 'Denim' : name.toLowerCase().includes('leather') ? 'Faux leather' : name.toLowerCase().includes('satin') ? 'Satin' : 'Cotton',
    pattern: name.toLowerCase().includes('floral') ? 'Floral' : 'Plain / Solid colour',
    waistRise: 'High-Waisted'
  },
  tags: ['skirt', 'bottom', 'fashion', name.toLowerCase()]
}));

// CATEGORY H: JEANS (23 items)
export const JEAN_ITEMS: GarmentItem[] = [
  'Skinny jeans', 'Slim-fit jeans', 'Straight-leg jeans', 'Bootcut jeans', 'Flared jeans',
  'Wide-leg jeans', 'Mom jeans', 'Boyfriend jeans', 'Girlfriend jeans', 'Baggy jeans',
  'Relaxed-fit jeans', 'Tapered jeans', 'High-waisted jeans', 'Mid-rise jeans', 'Low-rise jeans',
  'Cropped jeans', 'Distressed jeans', 'Ripped jeans', 'Dark-wash jeans', 'Light-wash jeans',
  'Coloured jeans', 'Raw-denim jeans', 'Carpenter jeans'
].map((name, i) => withImage({
  id: `jn-${i + 1}`,
  name,
  categoryId: 'jeans',
  categoryName: 'Jeans',
  layerType: 'bottom',
  description: `Authentic denim ${name.toLowerCase()} featuring durable weave and timeless cut.`,
  compatibleFabrics: ['Denim', 'Cotton'],
  compatibleWaistRises: ['High-Waisted', 'Mid-Rise', 'Low-Rise'],
  defaultOptions: {
    color: name.toLowerCase().includes('dark') ? 'Navy Blue' : name.toLowerCase().includes('light') ? 'Sky Blue' : 'Blue',
    fabric: 'Denim',
    pattern: 'Plain / Solid colour',
    waistRise: name.toLowerCase().includes('high') ? 'High-Waisted' : name.toLowerCase().includes('low') ? 'Low-Rise' : 'Mid-Rise',
    fit: name.toLowerCase().includes('wide') ? 'Relaxed Fit' : name.toLowerCase().includes('skinny') ? 'Slim Fit' : 'Regular Fit'
  },
  tags: ['denim', 'jeans', 'casual', 'pants', name.toLowerCase()]
}));

// CATEGORY I: TROUSERS AND PANTS (26 items)
export const TROUSER_ITEMS: GarmentItem[] = [
  'Straight-leg trousers', 'Wide-leg trousers', 'Palazzo pants', 'Cigarette pants', 'Tailored trousers',
  'Slim-fit pants', 'Bootcut pants', 'Flared pants', 'Cargo pants', 'Joggers',
  'Track pants', 'Leggings', 'Jeggings', 'Capri pants', 'Culottes',
  'Paperbag-waist pants', 'Linen trousers', 'Pleated trousers', 'High-waisted pants', 'Drawstring pants',
  'Parachute pants', 'Harem pants', 'Dhoti pants', 'Chinos', 'Sweatpants', 'Cropped trousers'
].map((name, i) => withImage({
  id: `trs-${i + 1}`,
  name,
  categoryId: 'trousers-pants',
  categoryName: 'Trousers & Pants',
  layerType: 'bottom',
  description: `Versatile ${name.toLowerCase()} combining tailored precision with all-day comfort.`,
  compatibleFabrics: ['Cotton', 'Linen', 'Wool', 'Polyester', 'Jersey', 'Faux leather'],
  defaultOptions: {
    color: 'Beige',
    fabric: name.toLowerCase().includes('linen') ? 'Linen' : 'Cotton',
    pattern: 'Plain / Solid colour',
    fit: name.toLowerCase().includes('wide') || name.toLowerCase().includes('palazzo') ? 'Relaxed Fit' : 'Tailored / Structured'
  },
  tags: ['trousers', 'pants', 'formal', 'casual', name.toLowerCase()]
}));

// CATEGORY J: SHORTS (13 items)
export const SHORT_ITEMS: GarmentItem[] = [
  'Denim shorts', 'High-waisted shorts', 'Bermuda shorts', 'Cycling shorts', 'Athletic shorts',
  'Running shorts', 'Tailored shorts', 'Linen shorts', 'Cargo shorts', 'Pleated shorts',
  'Lounge shorts', 'Boxer-style shorts', 'Skort styles'
].map((name, i) => withImage({
  id: `shrt-btm-${i + 1}`,
  name,
  categoryId: 'shorts',
  categoryName: 'Shorts',
  layerType: 'bottom',
  description: `Easy-wear ${name.toLowerCase()} perfect for warm weather, leisure, or workouts.`,
  compatibleFabrics: ['Denim', 'Cotton', 'Linen', 'Nylon', 'Jersey'],
  defaultOptions: {
    color: 'White',
    fabric: name.toLowerCase().includes('denim') ? 'Denim' : name.toLowerCase().includes('linen') ? 'Linen' : 'Cotton',
    pattern: 'Plain / Solid colour',
    waistRise: 'High-Waisted'
  },
  tags: ['shorts', 'summer', 'casual', name.toLowerCase()]
}));

// CATEGORY K: JUMPSUITS AND ROMPERS (14 items)
export const JUMPSUIT_ITEMS: GarmentItem[] = [
  'Casual jumpsuits', 'Formal jumpsuits', 'Wide-leg jumpsuits', 'Tailored jumpsuits', 'Utility jumpsuits',
  'Denim jumpsuits', 'Sleeveless jumpsuits', 'Long-sleeve jumpsuits', 'Rompers', 'Playsuits',
  'Short overalls', 'Long overalls', 'Culotte jumpsuits', 'Belted jumpsuits'
].map((name, i) => withImage({
  id: `jmp-${i + 1}`,
  name,
  categoryId: 'jumpsuits-rompers',
  categoryName: 'Jumpsuits & Rompers',
  layerType: 'dress',
  description: `One-and-done ${name.toLowerCase()} delivering sleek lines and contemporary silhouette.`,
  compatibleFabrics: ['Linen', 'Cotton', 'Denim', 'Silk', 'Crepe'],
  defaultOptions: {
    color: 'Olive Green',
    fabric: name.toLowerCase().includes('denim') ? 'Denim' : 'Cotton',
    pattern: 'Plain / Solid colour',
    fit: 'Tailored / Structured'
  },
  tags: ['jumpsuit', 'romper', 'one-piece', name.toLowerCase()]
}));

// CATEGORY L: SAREES (25 items)
export const SAREE_ITEMS: GarmentItem[] = [
  'Banarasi sarees', 'Kanjivaram sarees', 'Chanderi sarees', 'Paithani sarees', 'Bandhani sarees',
  'Patola sarees', 'Chikankari sarees', 'Tant sarees', 'Sambalpuri sarees', 'Jamdani sarees',
  'Organza sarees', 'Georgette sarees', 'Chiffon sarees', 'Cotton sarees', 'Silk sarees',
  'Linen sarees', 'Printed sarees', 'Embroidered sarees', 'Sequin sarees', 'Net sarees',
  'Tissue sarees', 'Crepe sarees', 'Ready-to-wear sarees', 'Ruffle sarees', 'Contemporary designer sarees'
].map((name, i) => withImage({
  id: `sar-${i + 1}`,
  name,
  categoryId: 'sarees',
  categoryName: 'Sarees',
  layerType: 'ethnic-outfit',
  description: `Exquisite Indian traditional ${name.toLowerCase()} woven with opulent motifs and graceful drapes.`,
  compatibleFabrics: ['Silk', 'Organza', 'Georgette', 'Chiffon', 'Cotton', 'Linen', 'Brocade', 'Crepe'],
  defaultOptions: {
    color: name.toLowerCase().includes('banarasi') ? 'Maroon' : name.toLowerCase().includes('kanjivaram') ? 'Gold' : 'Red',
    fabric: name.toLowerCase().includes('organza') ? 'Organza' : name.toLowerCase().includes('georgette') ? 'Georgette' : name.toLowerCase().includes('chiffon') ? 'Chiffon' : 'Silk',
    pattern: 'Traditional Indian print',
    borderDesign: 'Rich Gold Zari Border',
    embroidery: 'Intricate Zardozi & Resham',
    drapingStyle: 'Classic Nivi Drape (Traditional Left Shoulder)',
    palluStyle: 'Heavy Zari Woven Pallu',
    blouseStyle: 'Contrasting Embroidered Silk Blouse',
    occasion: 'Wedding & Bridal'
  },
  tags: ['saree', 'ethnic', 'indian traditional', 'silk saree', name.toLowerCase()]
}));

// CATEGORY M: SAREE BLOUSES (17 items)
export const SAREE_BLOUSE_ITEMS: GarmentItem[] = [
  'Short-sleeve blouses', 'Long-sleeve blouses', 'Sleeveless blouses', 'High-neck blouses', 'Boat-neck blouses',
  'Square-neck blouses', 'Halter-neck blouses', 'Sweetheart-neck blouses', 'Deep-back blouses', 'Backless fashion blouses',
  'Corset-style blouses', 'Embroidered blouses', 'Brocade blouses', 'Velvet blouses', 'Puff-sleeve blouses',
  'Cape-style blouses', 'Ready-made blouses'
].map((name, i) => withImage({
  id: `sbl-${i + 1}`,
  name,
  categoryId: 'saree-blouses',
  categoryName: 'Saree Blouses',
  layerType: 'top',
  description: `Custom-tailored ${name.toLowerCase()} engineered to pair seamlessly with designer sarees and lehengas.`,
  compatibleFabrics: ['Silk', 'Brocade', 'Velvet', 'Satin', 'Cotton'],
  compatibleNecklines: ['Sweetheart', 'Boat Neck', 'Square Neck', 'Halter Neck', 'High Neck / Turtleneck'],
  defaultOptions: {
    color: 'Gold',
    fabric: name.toLowerCase().includes('brocade') ? 'Brocade' : name.toLowerCase().includes('velvet') ? 'Velvet' : 'Silk',
    pattern: 'Embroidered',
    neckline: name.toLowerCase().includes('sweetheart') ? 'Sweetheart' : name.toLowerCase().includes('boat') ? 'Boat Neck' : 'Round Neck',
    sleeveLength: name.toLowerCase().includes('sleeveless') ? 'Sleeveless' : name.toLowerCase().includes('long') ? 'Full Length Sleeves' : 'Short Sleeves'
  },
  tags: ['blouse', 'saree blouse', 'choli', 'ethnic', name.toLowerCase()]
}));

// CATEGORY N: LEHENGAS (16 items)
export const LEHENGA_ITEMS: GarmentItem[] = [
  'Bridal lehengas', 'Party-wear lehengas', 'A-line lehengas', 'Circular lehengas', 'Mermaid lehengas',
  'Embroidered lehengas', 'Sequin lehengas', 'Mirror-work lehengas', 'Printed lehengas', 'Silk lehengas',
  'Net lehengas', 'Velvet lehengas', 'Floral lehengas', 'Contemporary lehengas', 'Crop-top lehenga sets',
  'Traditional lehenga-choli sets'
].map((name, i) => withImage({
  id: `lhg-${i + 1}`,
  name,
  categoryId: 'lehengas',
  categoryName: 'Lehengas',
  layerType: 'ethnic-outfit',
  description: `Regal Indian ${name.toLowerCase()} featuring sprawling flare (ghera), ornate zardozi embroidery, and matching dupatta.`,
  compatibleFabrics: ['Silk', 'Velvet', 'Georgette', 'Net', 'Organza', 'Brocade'],
  compatibleSilhouettes: ['Circular / Full Flared Kalidar', 'A-Line Cut', 'Mermaid / Fish-Tail Silhouette'],
  defaultOptions: {
    color: name.toLowerCase().includes('bridal') ? 'Red' : 'Rose Pink',
    fabric: name.toLowerCase().includes('velvet') ? 'Velvet' : 'Silk',
    pattern: name.toLowerCase().includes('mirror') ? 'Mirror-work' : 'Embroidered',
    silhouette: 'Circular / Full Flared Kalidar',
    blouseStyle: 'Sweetheart Embroidered Blouse',
    dupattaStyle: 'Lightweight Net Dupatta with Scalloped Border',
    borderDesign: 'Heavy Gold Zari Border',
    occasion: 'Wedding & Bridal'
  },
  tags: ['lehenga', 'bridal', 'ethnic', 'choli', name.toLowerCase()]
}));

// CATEGORY O: SALWAR SUITS, KURTAS AND ETHNIC WEAR (25 items)
export const SALWAR_ITEMS: GarmentItem[] = [
  'Anarkali suits', 'Straight-cut suits', 'Punjabi suits', 'Patiala suits', 'Palazzo suits',
  'Sharara suits', 'Gharara suits', 'Churidar suits', 'Straight kurtas', 'A-line kurtas',
  'Angrakha kurtas', 'Long kurtas', 'Short kurtis', 'Kurta-and-trouser sets', 'Kurta-and-jeans combinations',
  'Embroidered suits', 'Printed cotton suits', 'Floor-length ethnic suits', 'Jacket-style ethnic suits', 'Dhoti-pant sets',
  'Ethnic co-ord sets', 'Traditional skirt sets', 'Indo-Western outfits', 'Dupattas', 'Shawls', 'Ethnic jackets'
].map((name, i) => withImage({
  id: `slw-${i + 1}`,
  name,
  categoryId: 'salwar-ethnic',
  categoryName: 'Salwar Suits & Kurtas',
  layerType: 'ethnic-outfit',
  description: `Graceful Indian ethnic ${name.toLowerCase()} featuring intricate neckline work and matching bottoms.`,
  compatibleFabrics: ['Cotton', 'Silk', 'Georgette', 'Chiffon', 'Chanderi', 'Velvet'],
  defaultOptions: {
    color: 'Teal',
    fabric: 'Georgette',
    pattern: 'Embroidered',
    fit: name.toLowerCase().includes('anarkali') ? 'Flowy / Flare' : 'Regular Fit',
    occasion: 'Festival & Traditional Celebrations'
  },
  tags: ['salwar', 'kurta', 'anarkali', 'ethnic', 'sharara', name.toLowerCase()]
}));

// CATEGORY P: PARTY AND EVENING WEAR (16 items)
export const PARTY_ITEMS: GarmentItem[] = [
  'Cocktail dresses', 'Evening gowns', 'Sequin dresses', 'Satin dresses', 'Velvet dresses',
  'Formal jumpsuits', 'Party co-ord sets', 'Statement tops', 'Dressy skirts', 'Wedding-guest outfits',
  'Prom-style dresses', 'Reception dresses', 'Festive outfits', 'Party lehengas', 'Party sarees', 'Designer ethnic suits'
].map((name, i) => withImage({
  id: `prt-${i + 1}`,
  name,
  categoryId: 'party-evening',
  categoryName: 'Party & Evening Wear',
  layerType: 'dress',
  description: `Glamorous ${name.toLowerCase()} tailored to turn heads at soirees and galas.`,
  compatibleFabrics: ['Sequined fabric', 'Satin', 'Velvet', 'Silk', 'Tulle'],
  defaultOptions: {
    color: 'Burgundy',
    fabric: 'Sequined fabric',
    pattern: 'Sequin embellishment',
    fit: 'Fitted / Bodycon',
    occasion: 'Cocktail & Night Out'
  },
  tags: ['party', 'evening', 'gala', 'sequin', name.toLowerCase()]
}));

// CATEGORY Q: SPORTSWEAR AND ACTIVEWEAR (18 items)
export const SPORT_ITEMS: GarmentItem[] = [
  'Sports bras', 'Athletic crop tops', 'Gym T-shirts', 'Tank tops', 'Running tops',
  'Leggings', 'Yoga pants', 'Cycling shorts', 'Running shorts', 'Track pants',
  'Joggers', 'Tracksuits', 'Tennis skirts', 'Athletic dresses', 'Sports jackets',
  'Sweatshirts', 'Performance tops', 'Athletic co-ord sets'
].map((name, i) => withImage({
  id: `spt-${i + 1}`,
  name,
  categoryId: 'sportswear',
  categoryName: 'Sportswear & Activewear',
  layerType: 'top',
  description: `High-performance moisture-wicking ${name.toLowerCase()} engineered for maximum mobility.`,
  compatibleFabrics: ['Nylon', 'Polyester', 'Jersey', 'Microfiber'],
  defaultOptions: {
    color: 'Black',
    fabric: 'Nylon',
    pattern: 'Plain / Solid colour',
    fit: 'Slim Fit',
    occasion: 'Gym & Fitness'
  },
  tags: ['activewear', 'sport', 'gym', 'fitness', name.toLowerCase()]
}));

// CATEGORY R: NIGHTWEAR AND LOUNGEWEAR (18 items)
export const NIGHTWEAR_ITEMS: GarmentItem[] = [
  'Pajama sets', 'Night suits', 'Nightdresses', 'Sleep shirts', 'Nightgowns',
  'Lounge sets', 'Lounge shorts', 'Lounge trousers', 'Robes', 'Dressing gowns',
  'Satin pajamas', 'Cotton pajamas', 'Sleep camisoles', 'Sleep shorts', 'House dresses',
  'Lounge jumpsuits', 'Oversized sleep T-shirts', 'Lounge co-ord sets'
].map((name, i) => withImage({
  id: `ngt-${i + 1}`,
  name,
  categoryId: 'nightwear',
  categoryName: 'Nightwear & Loungewear',
  layerType: 'dress',
  description: `Ultra-soft ${name.toLowerCase()} made for blissful relaxation and restful nights.`,
  compatibleFabrics: ['Satin', 'Cotton', 'Silk', 'Jersey', 'Linen'],
  defaultOptions: {
    color: 'Lavender',
    fabric: name.toLowerCase().includes('satin') ? 'Satin' : 'Cotton',
    pattern: 'Plain / Solid colour',
    fit: 'Relaxed Fit'
  },
  tags: ['nightwear', 'loungewear', 'pajamas', 'sleep', name.toLowerCase()]
}));

// CATEGORY S: SWIMWEAR AND BEACHWEAR (15 items)
export const SWIM_ITEMS: GarmentItem[] = [
  'One-piece swimsuits', 'Two-piece swimsuits', 'Bikinis', 'Tankinis', 'High-waisted swim bottoms',
  'Swim shorts', 'Rash guards', 'Swim dresses', 'Beach cover-ups', 'Sarongs',
  'Kaftans', 'Beach dresses', 'Resort-wear sets', 'Swim skirts', 'Long-sleeve swimwear'
].map((name, i) => withImage({
  id: `swm-${i + 1}`,
  name,
  categoryId: 'swimwear',
  categoryName: 'Swimwear & Beachwear',
  layerType: 'dress',
  description: `Sun-ready ${name.toLowerCase()} with quick-dry stretch fabrics and UV protection.`,
  compatibleFabrics: ['Nylon', 'Microfiber', 'Mesh', 'Chiffon', 'Linen'],
  defaultOptions: {
    color: 'Turquoise',
    fabric: 'Nylon',
    pattern: 'Plain / Solid colour',
    occasion: 'Vacation & Resort'
  },
  tags: ['swimwear', 'beach', 'bikini', 'resort', name.toLowerCase()]
}));

// CATEGORY T: JACKETS AND COATS (21 items)
export const JACKET_ITEMS: GarmentItem[] = [
  'Denim jackets', 'Leather-look jackets', 'Bomber jackets', 'Blazers', 'Blazer dresses',
  'Trench coats', 'Wool coats', 'Puffer jackets', 'Parkas', 'Cropped jackets',
  'Oversized jackets', 'Windbreakers', 'Longline coats', 'Waistcoats', 'Shrugs',
  'Boleros', 'Capes', 'Ponchos', 'Utility jackets', 'Quilted jackets', 'Raincoats'
].map((name, i) => withImage({
  id: `jkt-${i + 1}`,
  name,
  categoryId: 'jackets-coats',
  categoryName: 'Jackets & Coats',
  layerType: 'outerwear',
  description: `Statement outerwear ${name.toLowerCase()} offering protection, structure, and runway-ready appeal.`,
  compatibleFabrics: ['Faux leather', 'Wool', 'Denim', 'Cotton', 'Polyester'],
  defaultOptions: {
    color: name.toLowerCase().includes('denim') ? 'Blue' : name.toLowerCase().includes('trench') ? 'Beige' : 'Black',
    fabric: name.toLowerCase().includes('denim') ? 'Denim' : name.toLowerCase().includes('leather') ? 'Faux leather' : name.toLowerCase().includes('wool') ? 'Wool' : 'Cotton',
    pattern: 'Plain / Solid colour',
    fit: 'Tailored / Structured'
  },
  tags: ['outerwear', 'jacket', 'coat', 'blazer', name.toLowerCase()]
}));

// CATEGORY U: SWEATERS AND KNITWEAR (14 items)
export const SWEATER_ITEMS: GarmentItem[] = [
  'Crew-neck sweaters', 'V-neck sweaters', 'Turtleneck sweaters', 'Cardigans', 'Oversized sweaters',
  'Cropped sweaters', 'Knit dresses', 'Sweater vests', 'Knit tops', 'Cable-knit sweaters',
  'Lightweight pullovers', 'Chunky-knit sweaters', 'Knit co-ord sets', 'Longline cardigans'
].map((name, i) => withImage({
  id: `swt-${i + 1}`,
  name,
  categoryId: 'sweaters-knitwear',
  categoryName: 'Sweaters & Knitwear',
  layerType: 'top',
  description: `Cozy ${name.toLowerCase()} spun with plush yarns for snug warmth and textured depth.`,
  compatibleFabrics: ['Wool', 'Cashmere', 'Knit', 'Cotton'],
  defaultOptions: {
    color: 'Cream',
    fabric: 'Wool',
    pattern: name.toLowerCase().includes('cable') ? 'Textured weave' : 'Plain / Solid colour',
    fit: name.toLowerCase().includes('oversized') ? 'Oversized / Loose' : 'Regular Fit'
  },
  tags: ['knitwear', 'sweater', 'winter', 'warm', name.toLowerCase()]
}));

// CATEGORY V: CO-ORD SETS (12 items)
export const COORD_ITEMS: GarmentItem[] = [
  'Top-and-skirt sets', 'Top-and-trouser sets', 'Shirt-and-short sets', 'Knit co-ord sets', 'Casual co-ord sets',
  'Formal co-ord sets', 'Party co-ord sets', 'Ethnic co-ord sets', 'Matching lounge sets', 'Matching tracksuits',
  'Matching blazer-and-trouser sets', 'Matching crop-top-and-skirt sets'
].map((name, i) => withImage({
  id: `crd-${i + 1}`,
  name,
  categoryId: 'co-ord-sets',
  categoryName: 'Co-ord Sets',
  layerType: 'dress',
  description: `Effortlessly coordinated ${name.toLowerCase()} offering curated harmony from top to bottom.`,
  compatibleFabrics: ['Linen', 'Cotton', 'Satin', 'Knit', 'Polyester'],
  defaultOptions: {
    color: 'Lavender',
    fabric: 'Linen',
    pattern: 'Plain / Solid colour',
    fit: 'Tailored / Structured'
  },
  tags: ['co-ord', 'matching set', 'two-piece', name.toLowerCase()]
}));

// CATEGORY W: FOOTWEAR (21 items)
export const FOOTWEAR_ITEMS: GarmentItem[] = [
  'Sneakers', 'Running shoes', 'Ballet flats', 'Loafers', 'Sandals',
  'Flat sandals', 'High heels', 'Pumps', 'Stilettos', 'Wedges',
  'Block heels', 'Ankle boots', 'Knee-high boots', 'Slippers', 'Mules',
  'Espadrilles', 'Traditional juttis', 'Mojaris', 'Platform shoes', 'Mary Janes', 'Flip-flops'
].map((name, i) => withImage({
  id: `ftw-${i + 1}`,
  name,
  categoryId: 'footwear',
  categoryName: 'Footwear',
  layerType: 'footwear',
  description: `Artfully designed ${name.toLowerCase()} delivering ergonomic support and standout finish.`,
  compatibleFabrics: ['Leather-look material', 'Faux leather', 'Suede', 'Canvas', 'Velvet'],
  defaultOptions: {
    color: 'Black',
    fabric: 'Leather-look material',
    pattern: 'Plain / Solid colour'
  },
  tags: ['shoes', 'footwear', 'heels', 'boots', name.toLowerCase()]
}));

// CATEGORY X: ACCESSORIES (22 items)
export const ACCESSORY_ITEMS: GarmentItem[] = [
  'Handbags', 'Shoulder bags', 'Clutches', 'Tote bags', 'Backpacks',
  'Belts', 'Scarves', 'Sunglasses', 'Hats', 'Caps',
  'Hairbands', 'Hair clips', 'Earrings', 'Necklaces', 'Bracelets',
  'Watches', 'Rings', 'Anklets', 'Brooches', 'Headbands', 'Dupattas', 'Stoles'
].map((name, i) => withImage({
  id: `acc-${i + 1}`,
  name,
  categoryId: 'accessories',
  categoryName: 'Accessories',
  layerType: 'accessory',
  description: `Finishing fashion ${name.toLowerCase()} that complements and anchors your aesthetic.`,
  compatibleFabrics: ['Leather-look material', 'Silk', 'Metal', 'Cotton'],
  defaultOptions: {
    color: 'Gold',
    fabric: 'Leather-look material',
    pattern: 'Plain / Solid colour'
  },
  tags: ['accessories', 'bag', 'jewelry', name.toLowerCase()]
}));

// MASTER UNIFIED CATALOGUE
export const CLOTHING_CATALOGUE: GarmentItem[] = [
  ...UNDERWEAR_ITEMS,
  ...BRA_ITEMS,
  ...BASE_LAYER_ITEMS,
  ...TOP_ITEMS,
  ...SHIRT_ITEMS,
  ...DRESS_ITEMS,
  ...SKIRT_ITEMS,
  ...JEAN_ITEMS,
  ...TROUSER_ITEMS,
  ...SHORT_ITEMS,
  ...JUMPSUIT_ITEMS,
  ...SAREE_ITEMS,
  ...SAREE_BLOUSE_ITEMS,
  ...LEHENGA_ITEMS,
  ...SALWAR_ITEMS,
  ...PARTY_ITEMS,
  ...SPORT_ITEMS,
  ...NIGHTWEAR_ITEMS,
  ...SWIM_ITEMS,
  ...JACKET_ITEMS,
  ...SWEATER_ITEMS,
  ...COORD_ITEMS,
  ...FOOTWEAR_ITEMS,
  ...ACCESSORY_ITEMS,
];

export function getGarmentById(id: string): GarmentItem | undefined {
  return CLOTHING_CATALOGUE.find((item) => item.id === id);
}

export function getGarmentsByCategory(categoryId: string): GarmentItem[] {
  return CLOTHING_CATALOGUE.filter((item) => item.categoryId === categoryId);
}

export function searchGarments(query: string): GarmentItem[] {
  if (!query.trim()) return CLOTHING_CATALOGUE;
  const q = query.toLowerCase().trim();
  return CLOTHING_CATALOGUE.filter((item) =>
    item.name.toLowerCase().includes(q) ||
    item.categoryName.toLowerCase().includes(q) ||
    item.tags.some((t) => t.toLowerCase().includes(q))
  );
}
