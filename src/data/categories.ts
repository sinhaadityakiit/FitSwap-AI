import { ClothingCategoryInfo } from '../types/catalogue';
import { CATEGORY_PHOTO_FALLBACKS } from './clothing-image-registry';

export const CLOTHING_CATEGORIES: ClothingCategoryInfo[] = [
  {
    id: 'underwear',
    code: 'A',
    name: 'Underwear & Panties',
    shortDescription: 'Briefs, thongs, seamless, shaping, and specialty intimates',
    garmentCount: 23,
    layerType: 'underwear',
    iconName: 'Sparkles',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['underwear'].imageUrl,
    subcategories: ['Briefs & Bikinis', 'Thongs & G-Strings', 'Cheeky & Brazilian', 'Seamless & Comfort', 'Shaping & Specialty']
  },
  {
    id: 'bras',
    code: 'B',
    name: 'Bras',
    shortDescription: 'T-shirt, balconette, plunge, sports, strapless, and comfort bras',
    garmentCount: 26,
    layerType: 'bra',
    iconName: 'Heart',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['bras'].imageUrl,
    subcategories: ['Everyday & T-Shirt', 'Plunge & Push-Up', 'Balconette & Demi', 'Sports & Wireless', 'Strapless & Convertible', 'Maternity & Specialty']
  },
  {
    id: 'base-layers',
    code: 'C',
    name: 'Camisoles, Slips & Base Layers',
    shortDescription: 'Bodysuits, camisoles, shaping wear, slips, and foundational garments',
    garmentCount: 14,
    layerType: 'base',
    iconName: 'Layers',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['base-layers'].imageUrl,
    subcategories: ['Camisoles & Tanks', 'Slips & Petticoats', 'Bodysuits & Shapewear']
  },
  {
    id: 'tops',
    code: 'D',
    name: 'Tops',
    shortDescription: 'T-shirts, crop tops, halter, off-shoulder, knit, and corset tops',
    garmentCount: 27,
    layerType: 'top',
    iconName: 'Shirt',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['tops'].imageUrl,
    subcategories: ['T-Shirts & Tanks', 'Crop & Corset Tops', 'Off-Shoulder & Halter', 'Tunics & Dressy Tops']
  },
  {
    id: 'shirts-blouses',
    code: 'E',
    name: 'Shirts & Blouses',
    shortDescription: 'Formal shirts, satin, chiffon, puff-sleeve, and casual linen shirts',
    garmentCount: 22,
    layerType: 'top',
    iconName: 'FileText',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['shirts-blouses'].imageUrl,
    subcategories: ['Button-Down & Formal', 'Silk & Satin Blouses', 'Chiffon & Ruffle', 'Casual & Denim']
  },
  {
    id: 'dresses',
    code: 'F',
    name: 'Dresses',
    shortDescription: 'A-line, bodycon, wrap, evening gowns, maxi, midi, and cocktail dresses',
    garmentCount: 35,
    layerType: 'dress',
    iconName: 'Gem',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['dresses'].imageUrl,
    subcategories: ['Mini & Casual', 'Midi & Wrap', 'Maxi & Evening Gowns', 'Cocktail & Party', 'Knit & Velvet']
  },
  {
    id: 'skirts',
    code: 'G',
    name: 'Skirts',
    shortDescription: 'Mini, midi, maxi, pleated, pencil, denim, leather, and wrap skirts',
    garmentCount: 23,
    layerType: 'bottom',
    iconName: 'Scissors',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['skirts'].imageUrl,
    subcategories: ['Mini & Tennis', 'Midi & Pleated', 'Maxi & Tiered', 'Pencil & Formal']
  },
  {
    id: 'jeans',
    code: 'H',
    name: 'Jeans',
    shortDescription: 'Skinny, straight-leg, wide-leg, flared, mom, boyfriend, and baggy jeans',
    garmentCount: 23,
    layerType: 'bottom',
    iconName: 'Compass',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['jeans'].imageUrl,
    subcategories: ['Slim & Skinny', 'Straight & Wide-Leg', 'Flared & Bootcut', 'Relaxed & Baggy', 'Distressed & Coloured']
  },
  {
    id: 'trousers-pants',
    code: 'I',
    name: 'Trousers & Pants',
    shortDescription: 'Tailored trousers, palazzos, cargo pants, joggers, chinos, and leggings',
    garmentCount: 26,
    layerType: 'bottom',
    iconName: 'Sliders',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['trousers-pants'].imageUrl,
    subcategories: ['Tailored & Formal', 'Wide-Leg & Palazzo', 'Casual & Cargo', 'Athletic & Leggings']
  },
  {
    id: 'shorts',
    code: 'J',
    name: 'Shorts',
    shortDescription: 'Denim shorts, bermuda, high-waisted, athletic, linen, and tailored shorts',
    garmentCount: 13,
    layerType: 'bottom',
    iconName: 'Crop',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['shorts'].imageUrl,
    subcategories: ['Denim & Casual', 'Tailored & Linen', 'Athletic & Cycling']
  },
  {
    id: 'jumpsuits-rompers',
    code: 'K',
    name: 'Jumpsuits & Rompers',
    shortDescription: 'Wide-leg jumpsuits, formal tailored jumpsuits, rompers, and overalls',
    garmentCount: 14,
    layerType: 'dress',
    iconName: 'Maximize2',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['jumpsuits-rompers'].imageUrl,
    subcategories: ['Casual & Wide-Leg', 'Formal & Tailored', 'Rompers & Playsuits', 'Overalls & Denim']
  },
  {
    id: 'sarees',
    code: 'L',
    name: 'Sarees',
    shortDescription: 'Banarasi, Kanjivaram, Chanderi, Georgette, Organza, and designer sarees',
    garmentCount: 25,
    layerType: 'ethnic-outfit',
    iconName: 'Feather',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['sarees'].imageUrl,
    subcategories: ['Traditional Silk Heritage', 'Chiffon & Georgette', 'Cotton & Handloom', 'Contemporary & Party']
  },
  {
    id: 'saree-blouses',
    code: 'M',
    name: 'Saree Blouses',
    shortDescription: 'Sleeveless, boat-neck, backless, brocade, embroidered, and designer blouses',
    garmentCount: 17,
    layerType: 'top',
    iconName: 'Bookmark',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['saree-blouses'].imageUrl,
    subcategories: ['Classic & Sleeved', 'Deep-Back & Backless', 'Embroidered & Brocade', 'Contemporary & Cape']
  },
  {
    id: 'lehengas',
    code: 'N',
    name: 'Lehengas',
    shortDescription: 'Bridal lehengas, party-wear, circular, mirror-work, and silk lehenga sets',
    garmentCount: 16,
    layerType: 'ethnic-outfit',
    iconName: 'Crown',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['lehengas'].imageUrl,
    subcategories: ['Bridal & Royal', 'Party-Wear & Sequin', 'A-Line & Circular', 'Contemporary & Crop-Top']
  },
  {
    id: 'salwar-ethnic',
    code: 'O',
    name: 'Salwar Suits & Kurtas',
    shortDescription: 'Anarkalis, straight suits, Patiala, Shararas, Ghararas, and kurtis',
    garmentCount: 25,
    layerType: 'ethnic-outfit',
    iconName: 'Tag',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['salwar-ethnic'].imageUrl,
    subcategories: ['Anarkali & Flared', 'Straight Suits & Kurtas', 'Sharara & Gharara Sets', 'Indo-Western & Co-ords']
  },
  {
    id: 'party-evening',
    code: 'P',
    name: 'Party & Evening Wear',
    shortDescription: 'Cocktail dresses, sequin gowns, velvet, wedding-guest, and gala ensembles',
    garmentCount: 16,
    layerType: 'dress',
    iconName: 'Star',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['party-evening'].imageUrl,
    subcategories: ['Cocktail & Gowns', 'Sequin & Velvet', 'Wedding Guest & Festive']
  },
  {
    id: 'sportswear',
    code: 'Q',
    name: 'Sportswear & Activewear',
    shortDescription: 'Athletic crop tops, gym leggings, track pants, sports jackets, and co-ords',
    garmentCount: 18,
    layerType: 'top',
    iconName: 'Activity',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['sportswear'].imageUrl,
    subcategories: ['Gym Tops & Bras', 'Leggings & Shorts', 'Tracksuits & Outerwear']
  },
  {
    id: 'nightwear',
    code: 'R',
    name: 'Nightwear & Loungewear',
    shortDescription: 'Satin pajamas, nightsuits, robes, lounge sets, and sleep shirts',
    garmentCount: 18,
    layerType: 'dress',
    iconName: 'Moon',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['nightwear'].imageUrl,
    subcategories: ['Pajama Sets', 'Nightgowns & Robes', 'Lounge Sets & Shorts']
  },
  {
    id: 'swimwear',
    code: 'S',
    name: 'Swimwear & Beachwear',
    shortDescription: 'One-piece swimsuits, bikinis, tankinis, cover-ups, sarongs, and kaftans',
    garmentCount: 15,
    layerType: 'dress',
    iconName: 'Sun',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['swimwear'].imageUrl,
    subcategories: ['One-Piece & Monokinis', 'Bikinis & Two-Piece', 'Cover-Ups & Beachwear']
  },
  {
    id: 'jackets-coats',
    code: 'T',
    name: 'Jackets & Coats',
    shortDescription: 'Blazers, trench coats, leather-look, denim jackets, parkas, and puffers',
    garmentCount: 21,
    layerType: 'outerwear',
    iconName: 'Shield',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['jackets-coats'].imageUrl,
    subcategories: ['Blazers & Tailored', 'Leather & Denim', 'Trench & Wool Coats', 'Puffers & Parkas']
  },
  {
    id: 'sweaters-knitwear',
    code: 'U',
    name: 'Sweaters & Knitwear',
    shortDescription: 'Crew necks, turtlenecks, cable-knit, cardigans, and knit dresses',
    garmentCount: 14,
    layerType: 'top',
    iconName: 'Cloud',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['sweaters-knitwear'].imageUrl,
    subcategories: ['Pullovers & Turtlenecks', 'Cardigans & Vests', 'Knit Sets & Dresses']
  },
  {
    id: 'co-ord-sets',
    code: 'V',
    name: 'Co-ord Sets',
    shortDescription: 'Blazer sets, top-and-skirt, trouser sets, knit sets, and casual matching pairs',
    garmentCount: 12,
    layerType: 'dress',
    iconName: 'Grid',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['co-ord-sets'].imageUrl,
    subcategories: ['Casual & Lounge Co-ords', 'Blazer & Formal Sets', 'Party & Top-Skirt Sets']
  },
  {
    id: 'footwear',
    code: 'W',
    name: 'Footwear',
    shortDescription: 'Sneakers, high heels, stilettos, ankle boots, loafers, juttis, and sandals',
    garmentCount: 21,
    layerType: 'footwear',
    iconName: 'CheckCircle',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['footwear'].imageUrl,
    subcategories: ['Heels & Pumps', 'Boots & Booties', 'Flats & Loafers', 'Sneakers & Athletic', 'Traditional Juttis']
  },
  {
    id: 'accessories',
    code: 'X',
    name: 'Accessories',
    shortDescription: 'Handbags, clutches, belts, sunglasses, scarves, jewelry, and dupattas',
    garmentCount: 22,
    layerType: 'accessory',
    iconName: 'Award',
    imageUrl: CATEGORY_PHOTO_FALLBACKS['accessories'].imageUrl,
    subcategories: ['Bags & Clutches', 'Jewelry & Watches', 'Belts, Scarves & Eyewear']
  }
];
