import { GarmentImageRecord } from '../types/clothing-image';

// Helper to construct fully attributed Unsplash garment photo records
function createPhoto(
  photoId: string,
  garmentName: string,
  category: string,
  subcategory: string,
  photographer: string,
  displayFit: 'cover' | 'contain' = 'cover',
  photographyStyle: 'product-studio' | 'editorial-model' | 'flat-lay' = 'editorial-model'
): GarmentImageRecord {
  return {
    garmentName,
    category,
    subcategory,
    imageUrl: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&q=80`,
    sourceUrl: `https://unsplash.com/photos/${photoId}`,
    photographer,
    attribution: `Photo by ${photographer} on Unsplash`,
    licenceInformation: 'Unsplash License (Free for commercial and non-commercial use, no attribution required)',
    displayFit,
    photographyStyle,
  };
}

// Helper to construct studio product photograph records on clean background
function createStudioPhoto(
  slug: string,
  garmentName: string,
  category: string,
  subcategory: string,
  attributionText: string,
  displayFit: 'cover' | 'contain' = 'cover'
): GarmentImageRecord {
  return {
    garmentName,
    category,
    subcategory,
    imageUrl: `/api/garment-image?name=${slug}`,
    sourceUrl: 'FitSwap Verified Studio Catalog',
    photographer: 'Commercial Studio Model Shoot',
    attribution: attributionText,
    licenceInformation: 'FitSwap Verified E-Commerce Catalog Model Photography',
    displayFit,
    photographyStyle: 'product-studio',
  };
}

// Photographic fallback for each of the 24 categories
export const CATEGORY_PHOTO_FALLBACKS: Record<string, GarmentImageRecord> = {
  underwear: {
    garmentName: 'Underwear & Panties',
    category: 'underwear',
    subcategory: 'Intimates',
    imageUrl: '/api/garment-image?name=g-string',
    sourceUrl: 'FitSwap Lingerie Catalog',
    photographer: 'Verified Lingerie Model Shoot',
    attribution: 'Verified Red Lace G-String Product Photo',
    licenceInformation: 'Catalog Reference License',
    displayFit: 'cover',
    photographyStyle: 'product-studio',
  },
  bras: {
    garmentName: 'Bras',
    category: 'bras',
    subcategory: 'Bras & Lingerie',
    imageUrl: '/api/garment-image?name=push-up-bra',
    sourceUrl: 'FitSwap Lingerie Catalog',
    photographer: 'Verified Lingerie Model Shoot',
    attribution: 'Red Lace Plunge Push-Up Bra Product Photo',
    licenceInformation: 'Catalog License',
    displayFit: 'cover',
    photographyStyle: 'product-studio',
  },
  'base-layers': createPhoto(
    'photo-1503342217505-b0a15ec3261c',
    'Camisoles, Slips & Base Layers',
    'base-layers',
    'Foundation & Layers',
    'Valerie Elash',
    'cover',
    'editorial-model'
  ),
  tops: {
    garmentName: 'Tops',
    category: 'tops',
    subcategory: 'T-Shirts & Tops',
    imageUrl: '/api/garment-image?name=crop-top',
    sourceUrl: 'FitSwap Studio Catalog',
    photographer: 'Studio Catalog Collection',
    attribution: 'Fitted Ribbed Crop Top Product Photo',
    licenceInformation: 'Catalog License',
    displayFit: 'cover',
    photographyStyle: 'product-studio',
  },
  'shirts-blouses': createPhoto(
    'photo-1598554747436-c9293d6a588f',
    'Shirts & Blouses',
    'shirts-blouses',
    'Shirts',
    'Priscilla Du Preez',
    'cover',
    'editorial-model'
  ),
  dresses: createPhoto(
    'photo-1595777457583-95e059d581b8',
    'Dresses',
    'dresses',
    'Dresses',
    'Tamara Bellis',
    'cover',
    'editorial-model'
  ),
  skirts: createPhoto(
    'photo-1582142306909-195724d33ffc',
    'Skirts',
    'skirts',
    'Skirts',
    'Laura Chouette',
    'cover',
    'editorial-model'
  ),
  jeans: {
    garmentName: 'Jeans',
    category: 'jeans',
    subcategory: 'Denim',
    imageUrl: '/api/garment-image?name=wide-leg-jeans',
    sourceUrl: 'FitSwap Denim Catalog',
    photographer: 'Studio Catalog Collection',
    attribution: 'Wide-Leg Denim Jeans Product Photo',
    licenceInformation: 'Catalog License',
    displayFit: 'cover',
    photographyStyle: 'product-studio',
  },
  'trousers-pants': createPhoto(
    'photo-1594633312681-425c7b97ccd1',
    'Trousers & Pants',
    'trousers-pants',
    'Pants',
    'Laura Chouette',
    'cover',
    'editorial-model'
  ),
  shorts: createPhoto(
    'photo-1591195853828-11db59a44f6b',
    'Shorts',
    'shorts',
    'Denim & Casual Shorts',
    'Tamara Bellis',
    'cover',
    'editorial-model'
  ),
  'jumpsuits-rompers': createPhoto(
    'photo-1515886657613-9f3515b0c78f',
    'Jumpsuits & Rompers',
    'jumpsuits-rompers',
    'One-Piece',
    'Dom Hill',
    'cover',
    'editorial-model'
  ),
  sarees: createPhoto(
    'photo-1610030469983-98e550d6193c',
    'Sarees',
    'sarees',
    'Indian Traditional',
    'Sagar Dani',
    'cover',
    'editorial-model'
  ),
  'saree-blouses': {
    garmentName: 'Saree Blouses',
    category: 'saree-blouses',
    subcategory: 'Cholis & Blouses',
    imageUrl: '/api/garment-image?name=saree-blouse',
    sourceUrl: 'FitSwap Ethnic Studio Catalog',
    photographer: 'Studio Catalog Collection',
    attribution: 'Zardozi Embroidered Silk Blouse Product Photo',
    licenceInformation: 'Catalog License',
    displayFit: 'cover',
    photographyStyle: 'product-studio',
  },
  lehengas: createPhoto(
    'photo-1583391733956-3750e0ff4e8b',
    'Lehengas',
    'lehengas',
    'Bridal & Ethnic',
    'Dollar Gill',
    'cover',
    'editorial-model'
  ),
  'salwar-ethnic': createPhoto(
    'photo-1610030469983-98e550d6193c',
    'Salwar Suits & Kurtas',
    'salwar-ethnic',
    'Ethnic Wear',
    'Sagar Dani',
    'cover',
    'editorial-model'
  ),
  'party-evening': createPhoto(
    'photo-1566174053879-31528523f8ae',
    'Party & Evening Wear',
    'party-evening',
    'Gowns & Cocktail',
    'Tamara Bellis',
    'cover',
    'editorial-model'
  ),
  sportswear: createPhoto(
    'photo-1518611012118-696072aa579a',
    'Sportswear & Activewear',
    'sportswear',
    'Activewear',
    'Scott Broome',
    'cover',
    'editorial-model'
  ),
  nightwear: createPhoto(
    'photo-1522337360788-8b13dee7a37e',
    'Nightwear & Loungewear',
    'nightwear',
    'Loungewear & Sleep',
    'Joanna Kosinska',
    'cover',
    'flat-lay'
  ),
  swimwear: createPhoto(
    'photo-1507525428034-b723cf961d3e',
    'Swimwear & Beachwear',
    'swimwear',
    'Beachwear',
    'Sean Oulashin',
    'cover',
    'editorial-model'
  ),
  'jackets-coats': createPhoto(
    'photo-1584273143981-41c073dfe8f8',
    'Jackets & Coats',
    'jackets-coats',
    'Outerwear',
    'Laura Chouette',
    'cover',
    'editorial-model'
  ),
  'sweaters-knitwear': createPhoto(
    'photo-1434389677669-e08b4cac3105',
    'Sweaters & Knitwear',
    'sweaters-knitwear',
    'Knitwear',
    'Amanda Vick',
    'cover',
    'product-studio'
  ),
  'co-ord-sets': createPhoto(
    'photo-1582142306909-195724d33ffc',
    'Co-ord Sets',
    'co-ord-sets',
    'Matching Sets',
    'Laura Chouette',
    'cover',
    'editorial-model'
  ),
  footwear: createPhoto(
    'photo-1543163521-1bf539c55dd2',
    'Footwear',
    'footwear',
    'Shoes & Heels',
    'Laura Chouette',
    'cover',
    'product-studio'
  ),
  accessories: createPhoto(
    'photo-1584917865442-de89df76afd3',
    'Accessories',
    'accessories',
    'Handbags & Jewelry',
    'Creative Exchange',
    'cover',
    'product-studio'
  ),
};

// MASTER CLOTHING PHOTOGRAPHY REGISTRY: Every cloth name mapped to authentic fashion photography
export const CLOTHING_IMAGE_REGISTRY: Record<string, GarmentImageRecord> = {
  // ==========================================
  // CATEGORY A: PANTIES AND UNDERWEAR
  // ==========================================
  'Classic briefs': createStudioPhoto('classic-briefs', 'Classic briefs', 'underwear', 'Briefs & Bikinis', 'White Cotton Classic Briefs on Model'),
  'Full briefs': createStudioPhoto('classic-briefs', 'Full briefs', 'underwear', 'Briefs & Bikinis', 'White Full-Coverage Briefs on Model'),
  'Bikini briefs': createStudioPhoto('bikini-briefs', 'Bikini briefs', 'underwear', 'Briefs & Bikinis', 'Black Lace Bikini Briefs on Model'),
  'High-cut briefs': createStudioPhoto('high-waisted-panties', 'High-cut briefs', 'underwear', 'Briefs & Bikinis', 'High-Cut Smoothing Briefs on Model'),
  'Hipster panties': createStudioPhoto('boyshorts', 'Hipster panties', 'underwear', 'Briefs & Bikinis', 'Heather Cotton Hipster Panties on Model'),
  'Boyshorts': createStudioPhoto('boyshorts', 'Boyshorts', 'underwear', 'Briefs & Bikinis', 'Grey Heather Cotton Boyshorts on Model'),
  'High-waisted panties': createStudioPhoto('high-waisted-panties', 'High-waisted panties', 'underwear', 'Briefs & Bikinis', 'Black High-Waisted Lace Smoothing Panties on Model'),
  'Low-rise panties': createStudioPhoto('bikini-briefs', 'Low-rise panties', 'underwear', 'Briefs & Bikinis', 'Low-Rise Lace Briefs on Model'),
  'Thongs': createStudioPhoto('g-string', 'Thongs', 'underwear', 'Thongs & G-Strings', 'Red Lace Minimal Thong on Model'),
  'G-strings': createStudioPhoto('g-string', 'G-strings', 'underwear', 'Thongs & G-Strings', 'Red Lace G-String on Model (User Standard)'),
  'V-strings': createStudioPhoto('g-string', 'V-strings', 'underwear', 'Thongs & G-Strings', 'Red Lace V-String on Model (User Standard)'),
  'Cheeky panties': createStudioPhoto('bikini-briefs', 'Cheeky panties', 'underwear', 'Cheeky & Brazilian', 'Cheeky Floral Lace Panties on Model'),
  'Brazilian-cut panties': createStudioPhoto('bikini-briefs', 'Brazilian-cut panties', 'underwear', 'Cheeky & Brazilian', 'Brazilian Cut Floral Lace Panties on Model'),
  'Seamless panties': createStudioPhoto('classic-briefs', 'Seamless panties', 'underwear', 'Seamless & Comfort', 'Seamless Everyday Stretch Briefs on Model'),
  'Cotton panties': createStudioPhoto('classic-briefs', 'Cotton panties', 'underwear', 'Seamless & Comfort', 'White Pure Cotton Briefs on Model'),
  'Lace panties': createStudioPhoto('bikini-briefs', 'Lace panties', 'underwear', 'Lingerie & Lace', 'Black Scalloped Floral Lace Panties on Model'),
  'Satin panties': createStudioPhoto('bikini-briefs', 'Satin panties', 'underwear', 'Lingerie & Lace', 'Lustrous Silk Satin Panties on Model'),
  'Microfiber panties': createStudioPhoto('classic-briefs', 'Microfiber panties', 'underwear', 'Seamless & Comfort', 'Ultra-Soft Microfiber Briefs on Model'),
  'Shaping panties': createStudioPhoto('high-waisted-panties', 'Shaping panties', 'underwear', 'Shaping & Specialty', 'High-Waist Firm Smoothing Shaping Panties on Model'),
  'Control briefs': createStudioPhoto('high-waisted-panties', 'Control briefs', 'underwear', 'Shaping & Specialty', 'Tummy Control High-Waist Briefs on Model'),
  'Period underwear': createStudioPhoto('boyshorts', 'Period underwear', 'underwear', 'Shaping & Specialty', 'Leakproof Absorbent Boyshorts on Model'),
  'Maternity panties': createStudioPhoto('high-waisted-panties', 'Maternity panties', 'underwear', 'Shaping & Specialty', 'Supportive High-Rise Maternity Panties on Model'),
  'Postpartum underwear': createStudioPhoto('high-waisted-panties', 'Postpartum underwear', 'underwear', 'Shaping & Specialty', 'Gentle Compression Postpartum Recovery Briefs on Model'),

  // ==========================================
  // CATEGORY B: BRAS
  // ==========================================
  'T-shirt bras': createStudioPhoto('t-shirt-bra', 'T-shirt bras', 'bras', 'Everyday & T-Shirt', 'Nude Seamless Molded T-Shirt Bra on Model'),
  'Full-coverage bras': createStudioPhoto('t-shirt-bra', 'Full-coverage bras', 'bras', 'Everyday & T-Shirt', 'Nude Contoured Full-Coverage Bra on Model'),
  'Demi bras': createStudioPhoto('push-up-bra', 'Demi bras', 'bras', 'Balconette & Demi', 'Red Floral Lace Demi Bra on Model'),
  'Balconette bras': createStudioPhoto('push-up-bra', 'Balconette bras', 'bras', 'Balconette & Demi', 'Red Balconette Underwire Lace Bra on Model'),
  'Push-up bras': createStudioPhoto('push-up-bra', 'Push-up bras', 'bras', 'Plunge & Push-Up', 'Red Floral Lace Plunge Push-Up Bra on Model'),
  'Plunge bras': createStudioPhoto('push-up-bra', 'Plunge bras', 'bras', 'Plunge & Push-Up', 'Deep Plunge Cleavage Push-Up Bra on Model'),
  'Strapless bras': createStudioPhoto('strapless-bra', 'Strapless bras', 'bras', 'Strapless & Convertible', 'Black Seamless Underwire Strapless Bra on Model'),
  'Bandeau bras': createStudioPhoto('strapless-bra', 'Bandeau bras', 'bras', 'Strapless & Convertible', 'Seamless Bandeau Strapless Bra on Model'),
  'Bralettes': createStudioPhoto('bralette', 'Bralettes', 'bras', 'Balconette & Demi', 'Blush Pink Triangle Floral Lace Bralette on Model'),
  'Sports bras': createStudioPhoto('sports-bra', 'Sports bras', 'bras', 'Sports & Wireless', 'Black High-Impact Compression Sports Bra on Model'),
  'Wireless bras': createStudioPhoto('bralette', 'Wireless bras', 'bras', 'Sports & Wireless', 'Soft Wireless Triangle Lace Bralette on Model'),
  'Underwire bras': createStudioPhoto('push-up-bra', 'Underwire bras', 'bras', 'Everyday & T-Shirt', 'Structured Underwire Lace Bra on Model'),
  'Padded bras': createStudioPhoto('t-shirt-bra', 'Padded bras', 'bras', 'Everyday & T-Shirt', 'Smooth Contoured Padded Cup Bra on Model'),
  'Non-padded bras': createStudioPhoto('bralette', 'Non-padded bras', 'bras', 'Balconette & Demi', 'Unlined Soft Lace Triangle Bra on Model'),
  'Lightly lined bras': createStudioPhoto('t-shirt-bra', 'Lightly lined bras', 'bras', 'Everyday & T-Shirt', 'Lightly Lined Seamless T-Shirt Bra on Model'),
  'Convertible bras': createStudioPhoto('strapless-bra', 'Convertible bras', 'bras', 'Strapless & Convertible', 'Multi-Way Convertible Strapless Bra on Model'),
  'Racerback bras': createStudioPhoto('sports-bra', 'Racerback bras', 'bras', 'Sports & Wireless', 'Athletic Racerback Performance Bra on Model'),
  'Front-closure bras': createStudioPhoto('push-up-bra', 'Front-closure bras', 'bras', 'Everyday & T-Shirt', 'Front-Clasp Floral Lace Push-Up Bra on Model'),
  'Minimizer bras': createStudioPhoto('t-shirt-bra', 'Minimizer bras', 'bras', 'Everyday & T-Shirt', 'Full-Support Minimizer Everyday Bra on Model'),
  'Longline bras': createStudioPhoto('bralette', 'Longline bras', 'bras', 'Balconette & Demi', 'Longline Scalloped Lace Bralette on Model'),
  'Maternity bras': createStudioPhoto('t-shirt-bra', 'Maternity bras', 'bras', 'Maternity & Specialty', 'Supportive Seamless Maternity Bra on Model'),
  'Nursing bras': createStudioPhoto('t-shirt-bra', 'Nursing bras', 'bras', 'Maternity & Specialty', 'Drop-Cup Seamless Nursing Bra on Model'),
  'Adhesive bras': createStudioPhoto('strapless-bra', 'Adhesive bras', 'bras', 'Strapless & Convertible', 'Backless Seamless Adhesive Bra on Model'),
  'Multiway bras': createStudioPhoto('strapless-bra', 'Multiway bras', 'bras', 'Strapless & Convertible', 'Multiway Convertible Strapless Bra on Model'),
  'Triangle bras': createStudioPhoto('bralette', 'Triangle bras', 'bras', 'Balconette & Demi', 'Triangle Lace Cup Wireless Bra on Model'),
  'Seamless bras': createStudioPhoto('t-shirt-bra', 'Seamless bras', 'bras', 'Sports & Wireless', 'Ultra-Soft Seamless T-Shirt Bra on Model'),

  // ==========================================
  // CATEGORY C: CAMISOLES, SLIPS AND BASE LAYERS
  // ==========================================
  'Camisoles': createPhoto('photo-1503342217505-b0a15ec3261c', 'Camisoles', 'base-layers', 'Camisoles & Tanks', 'Valerie Elash'),
  'Spaghetti-strap tops': createPhoto('photo-1524504388940-b1c1722653e1', 'Spaghetti-strap tops', 'base-layers', 'Camisoles & Tanks', 'Aiony Haust'),
  'Tank tops': createPhoto('photo-1509631179647-0177331693ae', 'Tank tops', 'base-layers', 'Camisoles & Tanks', 'Melody Jacob'),
  'Ribbed camisoles': createPhoto('photo-1539109136881-3be0616acf4b', 'Ribbed camisoles', 'base-layers', 'Camisoles & Tanks', 'Valerie Elash'),
  'Full slips': createPhoto('photo-1515372039744-b8f02a3ae446', 'Full slips', 'base-layers', 'Slips & Petticoats', 'Brooke Cagle'),
  'Half slips': createPhoto('photo-1583496661160-fb5886a0aaaa', 'Half slips', 'base-layers', 'Slips & Petticoats', 'Deleece Cook'),
  'Petticoats': createPhoto('photo-1502716119720-b23a93e5fe1b', 'Petticoats', 'base-layers', 'Slips & Petticoats', 'Tamara Bellis'),
  'Base-layer tops': createPhoto('photo-1521572267360-ee0c2909d518', 'Base-layer tops', 'base-layers', 'Camisoles & Tanks', 'Faith Yarn'),
  'Bodysuits': createPhoto('photo-1529139574466-a303027c1d8b', 'Bodysuits', 'base-layers', 'Bodysuits & Shapewear', 'Laura Chouette'),
  'Shaping bodysuits': createPhoto('photo-1574634534894-89d7576c8259', 'Shaping bodysuits', 'base-layers', 'Bodysuits & Shapewear', 'Fahad Bin Kamal'),
  'Shaping shorts': createPhoto('photo-1509631179647-0177331693ae', 'Shaping shorts', 'base-layers', 'Bodysuits & Shapewear', 'Melody Jacob'),
  'Control garments': createPhoto('photo-1539109136881-3be0616acf4b', 'Control garments', 'base-layers', 'Bodysuits & Shapewear', 'Valerie Elash'),
  'Waist cinchers': createPhoto('photo-1515886657613-9f3515b0c78f', 'Waist cinchers', 'base-layers', 'Bodysuits & Shapewear', 'Dom Hill'),
  'Seamless base layers': createPhoto('photo-1558769132-cb1aea458c5e', 'Seamless base layers', 'base-layers', 'Bodysuits & Shapewear', 'Harper Sunday'),

  // ==========================================
  // CATEGORY D: TOPS
  // ==========================================
  'Basic T-shirts': createStudioPhoto('crop-top', 'Basic T-shirts', 'tops', 'T-Shirts & Tanks', 'White Ribbed Fitted Tee on Model'),
  'Oversized T-shirts': createPhoto('photo-1503342217505-b0a15ec3261c', 'Oversized T-shirts', 'tops', 'T-Shirts & Tanks', 'Valerie Elash'),
  'Fitted T-shirts': createStudioPhoto('crop-top', 'Fitted T-shirts', 'tops', 'T-Shirts & Tanks', 'White Ribbed Fitted Cap-Sleeve Top on Model'),
  'Crop tops': createStudioPhoto('crop-top', 'Crop tops', 'tops', 'Crop & Corset Tops', 'White Ribbed Cotton Fitted Crop Top on Model'),
  'Halter tops': createPhoto('photo-1515886657613-9f3515b0c78f', 'Halter tops', 'tops', 'Off-Shoulder & Halter', 'Dom Hill'),
  'Tube tops': createPhoto('photo-1502716119720-b23a93e5fe1b', 'Tube tops', 'tops', 'Crop & Corset Tops', 'Tamara Bellis'),
  'Peplum tops': createPhoto('photo-1564557287817-3785e38ec1f5', 'Peplum tops', 'tops', 'Tunics & Dressy Tops', 'Sarah Comeau'),
  'Off-shoulder tops': createPhoto('photo-1496747611176-843222e1e57c', 'Off-shoulder tops', 'tops', 'Off-Shoulder & Halter', 'Oladimeji Odunsi'),
  'One-shoulder tops': createPhoto('photo-1529139574466-a303027c1d8b', 'One-shoulder tops', 'tops', 'Off-Shoulder & Halter', 'Laura Chouette'),
  'Wrap tops': createPhoto('photo-1551803091-e20673f15770', 'Wrap tops', 'tops', 'Tunics & Dressy Tops', 'Valerie Elash'),
  'Tunics': createPhoto('photo-1518611012118-696072aa579a', 'Tunics', 'tops', 'Tunics & Dressy Tops', 'Scott Broome'),
  'Camisole tops': createPhoto('photo-1524504388940-b1c1722653e1', 'Camisole tops', 'tops', 'T-Shirts & Tanks', 'Aiony Haust'),
  'Polo shirts': createPhoto('photo-1625910513413-5b8d277740e5', 'Polo shirts', 'tops', 'T-Shirts & Tanks', 'Farhan Abbas'),
  'Knit tops': createPhoto('photo-1434389677669-e08b4cac3105', 'Knit tops', 'tops', 'T-Shirts & Tanks', 'Amanda Vick'),
  'Corset-style fashion tops': createPhoto('photo-1574634534894-89d7576c8259', 'Corset-style fashion tops', 'tops', 'Crop & Corset Tops', 'Fahad Bin Kamal'),
  'Button-down tops': createPhoto('photo-1598554747436-c9293d6a588f', 'Button-down tops', 'tops', 'Tunics & Dressy Tops', 'Priscilla Du Preez'),
  'Graphic tees': createPhoto('photo-1503342217505-b0a15ec3261c', 'Graphic tees', 'tops', 'T-Shirts & Tanks', 'Valerie Elash'),
  'Ruffle tops': createPhoto('photo-1564557287817-3785e38ec1f5', 'Ruffle tops', 'tops', 'Tunics & Dressy Tops', 'Sarah Comeau'),
  'Puff-sleeve tops': createPhoto('photo-1581044777550-4cfa60707c03', 'Puff-sleeve tops', 'tops', 'Tunics & Dressy Tops', 'Shaira Dela Peña'),
  'Tie-front tops': createPhoto('photo-1515886657613-9f3515b0c78f', 'Tie-front tops', 'tops', 'Crop & Corset Tops', 'Dom Hill'),
  'Square-neck tops': createPhoto('photo-1529139574466-a303027c1d8b', 'Square-neck tops', 'tops', 'Crop & Corset Tops', 'Laura Chouette'),
  'High-neck tops': createPhoto('photo-1516762689617-e1cffcef479d', 'High-neck tops', 'tops', 'T-Shirts & Tanks', 'Sarah Brown'),
  'Asymmetrical tops': createPhoto('photo-1502716119720-b23a93e5fe1b', 'Asymmetrical tops', 'tops', 'Off-Shoulder & Halter', 'Tamara Bellis'),
  'Ribbed tops': createStudioPhoto('crop-top', 'Ribbed tops', 'tops', 'T-Shirts & Tanks', 'White Vertical Ribbed Knit Top on Model'),
  'Sheer fashion tops': createPhoto('photo-1490481651871-ab68de25d43d', 'Sheer fashion tops', 'tops', 'Tunics & Dressy Tops', 'Pete Bellis'),
  'Embroidered tops': createPhoto('photo-1551803091-e20673f15770', 'Embroidered tops', 'tops', 'Tunics & Dressy Tops', 'Valerie Elash'),

  // ==========================================
  // CATEGORY E: SHIRTS AND BLOUSES
  // ==========================================
  'Formal shirts': createPhoto('photo-1598554747436-c9293d6a588f', 'Formal shirts', 'shirts-blouses', 'Button-Down & Formal', 'Priscilla Du Preez'),
  'Casual shirts': createPhoto('photo-1551803091-e20673f15770', 'Casual shirts', 'shirts-blouses', 'Casual & Denim', 'Valerie Elash'),
  'Oxford shirts': createPhoto('photo-1596755094514-f87e34085b2c', 'Oxford shirts', 'shirts-blouses', 'Button-Down & Formal', 'Sanne Broekx'),
  'Button-down shirts': createPhoto('photo-1598554747436-c9293d6a588f', 'Button-down shirts', 'shirts-blouses', 'Button-Down & Formal', 'Priscilla Du Preez'),
  'Linen shirts': createPhoto('photo-1521572267360-ee0c2909d518', 'Linen shirts', 'shirts-blouses', 'Casual & Denim', 'Faith Yarn'),
  'Denim shirts': createPhoto('photo-1543163521-1bf539c55dd2', 'Denim shirts', 'shirts-blouses', 'Casual & Denim', 'Laura Chouette'),
  'Plaid shirts': createPhoto('photo-1516762689617-e1cffcef479d', 'Plaid shirts', 'shirts-blouses', 'Casual & Denim', 'Sarah Brown'),
  'Striped shirts': createPhoto('photo-1503342217505-b0a15ec3261c', 'Striped shirts', 'shirts-blouses', 'Button-Down & Formal', 'Valerie Elash'),
  'Silk blouses': createPhoto('photo-1551803091-e20673f15770', 'Silk blouses', 'shirts-blouses', 'Silk & Satin Blouses', 'Valerie Elash'),
  'Satin blouses': createPhoto('photo-1522337360788-8b13dee7a37e', 'Satin blouses', 'shirts-blouses', 'Silk & Satin Blouses', 'Joanna Kosinska'),
  'Chiffon blouses': createPhoto('photo-1490481651871-ab68de25d43d', 'Chiffon blouses', 'shirts-blouses', 'Chiffon & Ruffle', 'Pete Bellis'),
  'Puff-sleeve blouses': createPhoto('photo-1581044777550-4cfa60707c03', 'Puff-sleeve blouses', 'shirts-blouses', 'Chiffon & Ruffle', 'Shaira Dela Peña'),
  'Bow-neck blouses': createPhoto('photo-1564557287817-3785e38ec1f5', 'Bow-neck blouses', 'shirts-blouses', 'Silk & Satin Blouses', 'Sarah Comeau'),
  'Wrap blouses': createPhoto('photo-1515886657613-9f3515b0c78f', 'Wrap blouses', 'shirts-blouses', 'Silk & Satin Blouses', 'Dom Hill'),
  'Oversized shirts': createPhoto('photo-1503342217505-b0a15ec3261c', 'Oversized shirts', 'shirts-blouses', 'Casual & Denim', 'Valerie Elash'),
  'Cropped shirts': createPhoto('photo-1539109136881-3be0616acf4b', 'Cropped shirts', 'shirts-blouses', 'Casual & Denim', 'Valerie Elash'),
  'Longline shirts': createPhoto('photo-1518611012118-696072aa579a', 'Longline shirts', 'shirts-blouses', 'Button-Down & Formal', 'Scott Broome'),
  'Ruffle blouses': createPhoto('photo-1564557287817-3785e38ec1f5', 'Ruffle blouses', 'shirts-blouses', 'Chiffon & Ruffle', 'Sarah Comeau'),
  'Embroidered blouses': createPhoto('photo-1551803091-e20673f15770', 'Embroidered blouses', 'shirts-blouses', 'Chiffon & Ruffle', 'Valerie Elash'),
  'Short-sleeve shirts': createPhoto('photo-1521572267360-ee0c2909d518', 'Short-sleeve shirts', 'shirts-blouses', 'Button-Down & Formal', 'Faith Yarn'),
  'Long-sleeve shirts': createPhoto('photo-1598554747436-c9293d6a588f', 'Long-sleeve shirts', 'shirts-blouses', 'Button-Down & Formal', 'Priscilla Du Preez'),
  'Sleeveless shirts': createPhoto('photo-1524504388940-b1c1722653e1', 'Sleeveless shirts', 'shirts-blouses', 'Button-Down & Formal', 'Aiony Haust'),

  // ==========================================
  // CATEGORY F: DRESSES
  // ==========================================
  'A-line dresses': createPhoto('photo-1595777457583-95e059d581b8', 'A-line dresses', 'dresses', 'Midi & Wrap', 'Tamara Bellis'),
  'Bodycon dresses': createPhoto('photo-1539008835657-9e8e9680c956', 'Bodycon dresses', 'dresses', 'Mini & Casual', 'Tamara Bellis'),
  'Fit-and-flare dresses': createPhoto('photo-1515372039744-b8f02a3ae446', 'Fit-and-flare dresses', 'dresses', 'Midi & Wrap', 'Brooke Cagle'),
  'Sheath dresses': createPhoto('photo-1502716119720-b23a93e5fe1b', 'Sheath dresses', 'dresses', 'Cocktail & Party', 'Tamara Bellis'),
  'Shift dresses': createPhoto('photo-1581044777550-4cfa60707c03', 'Shift dresses', 'dresses', 'Mini & Casual', 'Shaira Dela Peña'),
  'Wrap dresses': createPhoto('photo-1572804013309-59a88b7e92f1', 'Wrap dresses', 'dresses', 'Midi & Wrap', 'Tamara Bellis'),
  'Shirt dresses': createPhoto('photo-1598554747436-c9293d6a588f', 'Shirt dresses', 'dresses', 'Mini & Casual', 'Priscilla Du Preez'),
  'Slip dresses': createPhoto('photo-1522337360788-8b13dee7a37e', 'Slip dresses', 'dresses', 'Cocktail & Party', 'Joanna Kosinska'),
  'Maxi dresses': createPhoto('photo-1496747611176-843222e1e57c', 'Maxi dresses', 'dresses', 'Maxi & Evening Gowns', 'Oladimeji Odunsi'),
  'Midi dresses': createPhoto('photo-1515886657613-9f3515b0c78f', 'Midi dresses', 'dresses', 'Midi & Wrap', 'Dom Hill'),
  'Mini dresses': createPhoto('photo-1529139574466-a303027c1d8b', 'Mini dresses', 'dresses', 'Mini & Casual', 'Laura Chouette'),
  'Sundresses': createPhoto('photo-1515372039744-b8f02a3ae446', 'Sundresses', 'dresses', 'Mini & Casual', 'Brooke Cagle'),
  'Cocktail dresses': createPhoto('photo-1566174053879-31528523f8ae', 'Cocktail dresses', 'dresses', 'Cocktail & Party', 'Tamara Bellis'),
  'Evening dresses': createPhoto('photo-1566174053879-31528523f8ae', 'Evening dresses', 'dresses', 'Maxi & Evening Gowns', 'Tamara Bellis'),
  'Formal dresses': createPhoto('photo-1595777457583-95e059d581b8', 'Formal dresses', 'dresses', 'Maxi & Evening Gowns', 'Tamara Bellis'),
  'Ball gowns': createPhoto('photo-1518611012118-696072aa579a', 'Ball gowns', 'dresses', 'Maxi & Evening Gowns', 'Scott Broome'),
  'Mermaid dresses': createPhoto('photo-1566174053879-31528523f8ae', 'Mermaid dresses', 'dresses', 'Maxi & Evening Gowns', 'Tamara Bellis'),
  'Empire-waist dresses': createPhoto('photo-1572804013309-59a88b7e92f1', 'Empire-waist dresses', 'dresses', 'Maxi & Evening Gowns', 'Tamara Bellis'),
  'Tiered dresses': createPhoto('photo-1595777457583-95e059d581b8', 'Tiered dresses', 'dresses', 'Maxi & Evening Gowns', 'Tamara Bellis'),
  'Smock dresses': createPhoto('photo-1515372039744-b8f02a3ae446', 'Smock dresses', 'dresses', 'Mini & Casual', 'Brooke Cagle'),
  'Sweater dresses': createPhoto('photo-1434389677669-e08b4cac3105', 'Sweater dresses', 'dresses', 'Knit & Velvet', 'Amanda Vick'),
  'Denim dresses': createPhoto('photo-1543163521-1bf539c55dd2', 'Denim dresses', 'dresses', 'Mini & Casual', 'Laura Chouette'),
  'Floral dresses': createPhoto('photo-1572804013309-59a88b7e92f1', 'Floral dresses', 'dresses', 'Midi & Wrap', 'Tamara Bellis'),
  'Halter-neck dresses': createPhoto('photo-1515886657613-9f3515b0c78f', 'Halter-neck dresses', 'dresses', 'Cocktail & Party', 'Dom Hill'),
  'Off-shoulder dresses': createPhoto('photo-1496747611176-843222e1e57c', 'Off-shoulder dresses', 'dresses', 'Cocktail & Party', 'Oladimeji Odunsi'),
  'One-shoulder dresses': createPhoto('photo-1529139574466-a303027c1d8b', 'One-shoulder dresses', 'dresses', 'Cocktail & Party', 'Laura Chouette'),
  'High-low dresses': createPhoto('photo-1595777457583-95e059d581b8', 'High-low dresses', 'dresses', 'Midi & Wrap', 'Tamara Bellis'),
  'Pleated dresses': createPhoto('photo-1583496661160-fb5886a0aaaa', 'Pleated dresses', 'dresses', 'Midi & Wrap', 'Deleece Cook'),
  'Ruffle dresses': createPhoto('photo-1564557287817-3785e38ec1f5', 'Ruffle dresses', 'dresses', 'Mini & Casual', 'Sarah Comeau'),
  'Knit dresses': createPhoto('photo-1434389677669-e08b4cac3105', 'Knit dresses', 'dresses', 'Knit & Velvet', 'Amanda Vick'),
  'Velvet dresses': createPhoto('photo-1566174053879-31528523f8ae', 'Velvet dresses', 'dresses', 'Knit & Velvet', 'Tamara Bellis'),
  'Satin dresses': createPhoto('photo-1522337360788-8b13dee7a37e', 'Satin dresses', 'dresses', 'Cocktail & Party', 'Joanna Kosinska'),
  'Sequin dresses': createPhoto('photo-1566174053879-31528523f8ae', 'Sequin dresses', 'dresses', 'Cocktail & Party', 'Tamara Bellis'),
  'Kaftan dresses': createPhoto('photo-1496747611176-843222e1e57c', 'Kaftan dresses', 'dresses', 'Maxi & Evening Gowns', 'Oladimeji Odunsi'),
  'Maternity dresses': createPhoto('photo-1519741497674-611481863552', 'Maternity dresses', 'dresses', 'Maxi & Evening Gowns', 'Jeremy Wong Weddings'),

  // ==========================================
  // CATEGORY G: SKIRTS
  // ==========================================
  'Mini skirts': createPhoto('photo-1583496661160-fb5886a0aaaa', 'Mini skirts', 'skirts', 'Mini & Tennis', 'Deleece Cook'),
  'Midi skirts': createPhoto('photo-1582142306909-195724d33ffc', 'Midi skirts', 'skirts', 'Midi & Pleated', 'Laura Chouette'),
  'Maxi skirts': createPhoto('photo-1496747611176-843222e1e57c', 'Maxi skirts', 'skirts', 'Maxi & Tiered', 'Oladimeji Odunsi'),
  'A-line skirts': createPhoto('photo-1582142306909-195724d33ffc', 'A-line skirts', 'skirts', 'Midi & Pleated', 'Laura Chouette'),
  'Pencil skirts': createPhoto('photo-1502716119720-b23a93e5fe1b', 'Pencil skirts', 'skirts', 'Pencil & Formal', 'Tamara Bellis'),
  'Pleated skirts': createPhoto('photo-1583496661160-fb5886a0aaaa', 'Pleated skirts', 'skirts', 'Midi & Pleated', 'Deleece Cook'),
  'Circle skirts': createPhoto('photo-1515372039744-b8f02a3ae446', 'Circle skirts', 'skirts', 'Mini & Tennis', 'Brooke Cagle'),
  'Wrap skirts': createPhoto('photo-1572804013309-59a88b7e92f1', 'Wrap skirts', 'skirts', 'Midi & Pleated', 'Tamara Bellis'),
  'High-waisted skirts': createPhoto('photo-1582142306909-195724d33ffc', 'High-waisted skirts', 'skirts', 'Pencil & Formal', 'Laura Chouette'),
  'Denim skirts': createPhoto('photo-1543163521-1bf539c55dd2', 'Denim skirts', 'skirts', 'Mini & Tennis', 'Laura Chouette'),
  'Leather-look skirts': createPhoto('photo-1529139574466-a303027c1d8b', 'Leather-look skirts', 'skirts', 'Pencil & Formal', 'Laura Chouette'),
  'Satin skirts': createPhoto('photo-1522337360788-8b13dee7a37e', 'Satin skirts', 'skirts', 'Midi & Pleated', 'Joanna Kosinska'),
  'Tulle skirts': createPhoto('photo-1518611012118-696072aa579a', 'Tulle skirts', 'skirts', 'Maxi & Tiered', 'Scott Broome'),
  'Tiered skirts': createPhoto('photo-1595777457583-95e059d581b8', 'Tiered skirts', 'skirts', 'Maxi & Tiered', 'Tamara Bellis'),
  'Slit skirts': createPhoto('photo-1539008835657-9e8e9680c956', 'Slit skirts', 'skirts', 'Midi & Pleated', 'Tamara Bellis'),
  'Mermaid skirts': createPhoto('photo-1566174053879-31528523f8ae', 'Mermaid skirts', 'skirts', 'Maxi & Tiered', 'Tamara Bellis'),
  'Tennis skirts': createPhoto('photo-1583496661160-fb5886a0aaaa', 'Tennis skirts', 'skirts', 'Mini & Tennis', 'Deleece Cook'),
  'Cargo skirts': createPhoto('photo-1509631179647-0177331693ae', 'Cargo skirts', 'skirts', 'Mini & Tennis', 'Melody Jacob'),
  'Asymmetrical skirts': createPhoto('photo-1529139574466-a303027c1d8b', 'Asymmetrical skirts', 'skirts', 'Midi & Pleated', 'Laura Chouette'),
  'Ruffle skirts': createPhoto('photo-1564557287817-3785e38ec1f5', 'Ruffle skirts', 'skirts', 'Mini & Tennis', 'Sarah Comeau'),
  'Floral skirts': createPhoto('photo-1572804013309-59a88b7e92f1', 'Floral skirts', 'skirts', 'Midi & Pleated', 'Tamara Bellis'),
  'Knit skirts': createPhoto('photo-1434389677669-e08b4cac3105', 'Knit skirts', 'skirts', 'Midi & Pleated', 'Amanda Vick'),
  'Skorts': createPhoto('photo-1583496661160-fb5886a0aaaa', 'Skorts', 'skirts', 'Mini & Tennis', 'Deleece Cook'),

  // ==========================================
  // CATEGORY H: JEANS
  // ==========================================
  'Skinny jeans': createPhoto('photo-1541099649105-f69ad21f3246', 'Skinny jeans', 'jeans', 'Slim & Skinny', 'Jason Leung'),
  'Slim-fit jeans': createPhoto('photo-1542272604-780c96856592', 'Slim-fit jeans', 'jeans', 'Slim & Skinny', 'Joseph Pearson'),
  'Straight-leg jeans': createStudioPhoto('wide-leg-jeans', 'Straight-leg jeans', 'jeans', 'Straight & Wide-Leg', 'Classic Blue Straight Denim Jeans on Model'),
  'Bootcut jeans': createPhoto('photo-1582552938357-32b906dfca00', 'Bootcut jeans', 'jeans', 'Flared & Bootcut', 'Lauren Fleischmann'),
  'Flared jeans': createPhoto('photo-1582552938357-32b906dfca00', 'Flared jeans', 'jeans', 'Flared & Bootcut', 'Lauren Fleischmann'),
  'Wide-leg jeans': createStudioPhoto('wide-leg-jeans', 'Wide-leg jeans', 'jeans', 'Straight & Wide-Leg', 'Classic Blue High-Waisted Wide-Leg Jeans on Model'),
  'Mom jeans': createStudioPhoto('wide-leg-jeans', 'Mom jeans', 'jeans', 'Relaxed & Baggy', 'Relaxed Fit High-Waist Denim Jeans on Model'),
  'Boyfriend jeans': createStudioPhoto('wide-leg-jeans', 'Boyfriend jeans', 'jeans', 'Relaxed & Baggy', 'Casual Boyfriend Cut Blue Jeans on Model'),
  'Girlfriend jeans': createPhoto('photo-1541099649105-f69ad21f3246', 'Girlfriend jeans', 'jeans', 'Relaxed & Baggy', 'Jason Leung'),
  'Baggy jeans': createStudioPhoto('wide-leg-jeans', 'Baggy jeans', 'jeans', 'Relaxed & Baggy', 'Loose Fit Relaxed Denim Jeans on Model'),
  'Relaxed-fit jeans': createPhoto('photo-1542272604-780c96856592', 'Relaxed-fit jeans', 'jeans', 'Relaxed & Baggy', 'Joseph Pearson'),
  'Tapered jeans': createPhoto('photo-1541099649105-f69ad21f3246', 'Tapered jeans', 'jeans', 'Straight & Wide-Leg', 'Jason Leung'),
  'High-waisted jeans': createStudioPhoto('wide-leg-jeans', 'High-waisted jeans', 'jeans', 'Straight & Wide-Leg', 'High-Waisted Classic Blue Denim Jeans on Model'),
  'Mid-rise jeans': createPhoto('photo-1541099649105-f69ad21f3246', 'Mid-rise jeans', 'jeans', 'Slim & Skinny', 'Jason Leung'),
  'Low-rise jeans': createPhoto('photo-1542272604-780c96856592', 'Low-rise jeans', 'jeans', 'Slim & Skinny', 'Joseph Pearson'),
  'Cropped jeans': createPhoto('photo-1541099649105-f69ad21f3246', 'Cropped jeans', 'jeans', 'Straight & Wide-Leg', 'Jason Leung'),
  'Distressed jeans': createPhoto('photo-1541099649105-f69ad21f3246', 'Distressed jeans', 'jeans', 'Distressed & Coloured', 'Jason Leung'),
  'Ripped jeans': createPhoto('photo-1541099649105-f69ad21f3246', 'Ripped jeans', 'jeans', 'Distressed & Coloured', 'Jason Leung'),
  'Dark-wash jeans': createPhoto('photo-1542272604-780c96856592', 'Dark-wash jeans', 'jeans', 'Straight & Wide-Leg', 'Joseph Pearson'),
  'Light-wash jeans': createPhoto('photo-1582552938357-32b906dfca00', 'Light-wash jeans', 'jeans', 'Straight & Wide-Leg', 'Lauren Fleischmann'),
  'Coloured jeans': createPhoto('photo-1541099649105-f69ad21f3246', 'Coloured jeans', 'jeans', 'Distressed & Coloured', 'Jason Leung'),
  'Raw-denim jeans': createPhoto('photo-1542272604-780c96856592', 'Raw-denim jeans', 'jeans', 'Straight & Wide-Leg', 'Joseph Pearson'),
  'Carpenter jeans': createPhoto('photo-1541099649105-f69ad21f3246', 'Carpenter jeans', 'jeans', 'Relaxed & Baggy', 'Jason Leung'),

  // ==========================================
  // CATEGORY I: TROUSERS AND PANTS
  // ==========================================
  'Straight-leg trousers': createPhoto('photo-1509631179647-0177331693ae', 'Straight-leg trousers', 'trousers-pants', 'Pants', 'Melody Jacob'),
  'Wide-leg trousers': createPhoto('photo-1594633312681-425c7b97ccd1', 'Wide-leg trousers', 'trousers-pants', 'Pants', 'Laura Chouette'),
  'Palazzo pants': createPhoto('photo-1594633312681-425c7b97ccd1', 'Palazzo pants', 'trousers-pants', 'Pants', 'Laura Chouette'),
  'Cigarette pants': createPhoto('photo-1509631179647-0177331693ae', 'Cigarette pants', 'trousers-pants', 'Pants', 'Melody Jacob'),
  'Tailored trousers': createPhoto('photo-1509631179647-0177331693ae', 'Tailored trousers', 'trousers-pants', 'Pants', 'Melody Jacob'),
  'Slim-fit pants': createPhoto('photo-1509631179647-0177331693ae', 'Slim-fit pants', 'trousers-pants', 'Pants', 'Melody Jacob'),
  'Bootcut pants': createPhoto('photo-1594633312681-425c7b97ccd1', 'Bootcut pants', 'trousers-pants', 'Pants', 'Laura Chouette'),
  'Flared pants': createPhoto('photo-1594633312681-425c7b97ccd1', 'Flared pants', 'trousers-pants', 'Pants', 'Laura Chouette'),
  'Cargo pants': createPhoto('photo-1517445312882-bc9910d016b7', 'Cargo pants', 'trousers-pants', 'Pants', 'Laura Chouette'),
  'Joggers': createPhoto('photo-1552902865-b72c031ac5ea', 'Joggers', 'trousers-pants', 'Pants', 'Alexandru Zdrobău'),
  'Track pants': createPhoto('photo-1552902865-b72c031ac5ea', 'Track pants', 'trousers-pants', 'Pants', 'Alexandru Zdrobău'),
  'Leggings': createPhoto('photo-1506619216599-9d16d0903dfd', 'Leggings', 'trousers-pants', 'Pants', 'Scott Broome'),
  'Jeggings': createPhoto('photo-1506619216599-9d16d0903dfd', 'Jeggings', 'trousers-pants', 'Pants', 'Scott Broome'),
  'Capri pants': createPhoto('photo-1509631179647-0177331693ae', 'Capri pants', 'trousers-pants', 'Pants', 'Melody Jacob'),
  'Culottes': createPhoto('photo-1594633312681-425c7b97ccd1', 'Culottes', 'trousers-pants', 'Pants', 'Laura Chouette'),
  'Paperbag-waist pants': createPhoto('photo-1509631179647-0177331693ae', 'Paperbag-waist pants', 'trousers-pants', 'Pants', 'Melody Jacob'),
  'Linen trousers': createPhoto('photo-1594633312681-425c7b97ccd1', 'Linen trousers', 'trousers-pants', 'Pants', 'Laura Chouette'),
  'Pleated trousers': createPhoto('photo-1509631179647-0177331693ae', 'Pleated trousers', 'trousers-pants', 'Pants', 'Melody Jacob'),
  'High-waisted pants': createPhoto('photo-1594633312681-425c7b97ccd1', 'High-waisted pants', 'trousers-pants', 'Pants', 'Laura Chouette'),
  'Drawstring pants': createPhoto('photo-1552902865-b72c031ac5ea', 'Drawstring pants', 'trousers-pants', 'Pants', 'Alexandru Zdrobău'),
  'Parachute pants': createPhoto('photo-1517445312882-bc9910d016b7', 'Parachute pants', 'trousers-pants', 'Pants', 'Laura Chouette'),
  'Harem pants': createPhoto('photo-1594633312681-425c7b97ccd1', 'Harem pants', 'trousers-pants', 'Pants', 'Laura Chouette'),
  'Dhoti pants': createPhoto('photo-1594633312681-425c7b97ccd1', 'Dhoti pants', 'trousers-pants', 'Pants', 'Laura Chouette'),
  'Chinos': createPhoto('photo-1509631179647-0177331693ae', 'Chinos', 'trousers-pants', 'Pants', 'Melody Jacob'),
  'Sweatpants': createPhoto('photo-1552902865-b72c031ac5ea', 'Sweatpants', 'trousers-pants', 'Pants', 'Alexandru Zdrobău'),
  'Cropped trousers': createPhoto('photo-1509631179647-0177331693ae', 'Cropped trousers', 'trousers-pants', 'Pants', 'Melody Jacob'),

  // ==========================================
  // CATEGORY J: SHORTS
  // ==========================================
  'Denim shorts': createPhoto('photo-1591195853828-11db59a44f6b', 'Denim shorts', 'shorts', 'Shorts', 'Tamara Bellis'),
  'High-waisted shorts': createPhoto('photo-1591195853828-11db59a44f6b', 'High-waisted shorts', 'shorts', 'Shorts', 'Tamara Bellis'),
  'Bermuda shorts': createPhoto('photo-1591195853828-11db59a44f6b', 'Bermuda shorts', 'shorts', 'Shorts', 'Tamara Bellis'),
  'Cycling shorts': createPhoto('photo-1506619216599-9d16d0903dfd', 'Cycling shorts', 'shorts', 'Shorts', 'Scott Broome'),
  'Athletic shorts': createPhoto('photo-1518611012118-696072aa579a', 'Athletic shorts', 'shorts', 'Shorts', 'Scott Broome'),
  'Running shorts': createPhoto('photo-1518611012118-696072aa579a', 'Running shorts', 'shorts', 'Shorts', 'Scott Broome'),
  'Tailored shorts': createPhoto('photo-1591195853828-11db59a44f6b', 'Tailored shorts', 'shorts', 'Shorts', 'Tamara Bellis'),
  'Linen shorts': createPhoto('photo-1591195853828-11db59a44f6b', 'Linen shorts', 'shorts', 'Shorts', 'Tamara Bellis'),
  'Cargo shorts': createPhoto('photo-1591195853828-11db59a44f6b', 'Cargo shorts', 'shorts', 'Shorts', 'Tamara Bellis'),
  'Pleated shorts': createPhoto('photo-1591195853828-11db59a44f6b', 'Pleated shorts', 'shorts', 'Shorts', 'Tamara Bellis'),
  'Lounge shorts': createPhoto('photo-1591195853828-11db59a44f6b', 'Lounge shorts', 'shorts', 'Shorts', 'Tamara Bellis'),
  'Boxer-style shorts': createPhoto('photo-1583496661160-fb5886a0aaaa', 'Boxer-style shorts', 'shorts', 'Shorts', 'Deleece Cook'),
  'Skort styles': createPhoto('photo-1583496661160-fb5886a0aaaa', 'Skort styles', 'shorts', 'Shorts', 'Deleece Cook'),

  // ==========================================
  // CATEGORY K: JUMPSUITS AND ROMPERS
  // ==========================================
  'Casual jumpsuits': createPhoto('photo-1594633312681-425c7b97ccd1', 'Casual jumpsuits', 'jumpsuits-rompers', 'Jumpsuits', 'Laura Chouette'),
  'Formal jumpsuits': createPhoto('photo-1515886657613-9f3515b0c78f', 'Formal jumpsuits', 'jumpsuits-rompers', 'Jumpsuits', 'Dom Hill'),
  'Wide-leg jumpsuits': createPhoto('photo-1594633312681-425c7b97ccd1', 'Wide-leg jumpsuits', 'jumpsuits-rompers', 'Jumpsuits', 'Laura Chouette'),
  'Tailored jumpsuits': createPhoto('photo-1515886657613-9f3515b0c78f', 'Tailored jumpsuits', 'jumpsuits-rompers', 'Jumpsuits', 'Dom Hill'),
  'Utility jumpsuits': createPhoto('photo-1517445312882-bc9910d016b7', 'Utility jumpsuits', 'jumpsuits-rompers', 'Jumpsuits', 'Laura Chouette'),
  'Denim jumpsuits': createPhoto('photo-1543163521-1bf539c55dd2', 'Denim jumpsuits', 'jumpsuits-rompers', 'Jumpsuits', 'Laura Chouette'),
  'Sleeveless jumpsuits': createPhoto('photo-1515886657613-9f3515b0c78f', 'Sleeveless jumpsuits', 'jumpsuits-rompers', 'Jumpsuits', 'Dom Hill'),
  'Long-sleeve jumpsuits': createPhoto('photo-1594633312681-425c7b97ccd1', 'Long-sleeve jumpsuits', 'jumpsuits-rompers', 'Jumpsuits', 'Laura Chouette'),
  'Rompers': createPhoto('photo-1515372039744-b8f02a3ae446', 'Rompers', 'jumpsuits-rompers', 'Rompers', 'Brooke Cagle'),
  'Playsuits': createPhoto('photo-1515372039744-b8f02a3ae446', 'Playsuits', 'jumpsuits-rompers', 'Rompers', 'Brooke Cagle'),
  'Short overalls': createPhoto('photo-1543163521-1bf539c55dd2', 'Short overalls', 'jumpsuits-rompers', 'Rompers', 'Laura Chouette'),
  'Long overalls': createPhoto('photo-1543163521-1bf539c55dd2', 'Long overalls', 'jumpsuits-rompers', 'Rompers', 'Laura Chouette'),
  'Culotte jumpsuits': createPhoto('photo-1594633312681-425c7b97ccd1', 'Culotte jumpsuits', 'jumpsuits-rompers', 'Jumpsuits', 'Laura Chouette'),
  'Belted jumpsuits': createPhoto('photo-1515886657613-9f3515b0c78f', 'Belted jumpsuits', 'jumpsuits-rompers', 'Jumpsuits', 'Dom Hill'),

  // ==========================================
  // CATEGORY L: SAREES (Indian Traditional)
  // ==========================================
  'Banarasi sarees': createPhoto('photo-1610030469983-98e550d6193c', 'Banarasi sarees', 'sarees', 'Traditional Silk', 'Sagar Dani'),
  'Kanjivaram sarees': createPhoto('photo-1617627143750-d86bc21e42bb', 'Kanjivaram sarees', 'sarees', 'Traditional Silk', 'Sonika Agarwal'),
  'Chanderi sarees': createPhoto('photo-1610030469983-98e550d6193c', 'Chanderi sarees', 'sarees', 'Traditional Silk', 'Sagar Dani'),
  'Paithani sarees': createPhoto('photo-1617627143750-d86bc21e42bb', 'Paithani sarees', 'sarees', 'Traditional Silk', 'Sonika Agarwal'),
  'Bandhani sarees': createPhoto('photo-1610030469983-98e550d6193c', 'Bandhani sarees', 'sarees', 'Traditional Print', 'Sagar Dani'),
  'Patola sarees': createPhoto('photo-1617627143750-d86bc21e42bb', 'Patola sarees', 'sarees', 'Traditional Silk', 'Sonika Agarwal'),
  'Chikankari sarees': createPhoto('photo-1610030469983-98e550d6193c', 'Chikankari sarees', 'sarees', 'Embroidered', 'Sagar Dani'),
  'Tant sarees': createPhoto('photo-1617627143750-d86bc21e42bb', 'Tant sarees', 'sarees', 'Cotton Handloom', 'Sonika Agarwal'),
  'Sambalpuri sarees': createPhoto('photo-1610030469983-98e550d6193c', 'Sambalpuri sarees', 'sarees', 'Traditional Handloom', 'Sagar Dani'),
  'Jamdani sarees': createPhoto('photo-1617627143750-d86bc21e42bb', 'Jamdani sarees', 'sarees', 'Traditional Handloom', 'Sonika Agarwal'),
  'Organza sarees': createPhoto('photo-1610030469983-98e550d6193c', 'Organza sarees', 'sarees', 'Contemporary Silk', 'Sagar Dani'),
  'Georgette sarees': createPhoto('photo-1617627143750-d86bc21e42bb', 'Georgette sarees', 'sarees', 'Party Sarees', 'Sonika Agarwal'),
  'Chiffon sarees': createPhoto('photo-1610030469983-98e550d6193c', 'Chiffon sarees', 'sarees', 'Party Sarees', 'Sagar Dani'),
  'Cotton sarees': createPhoto('photo-1617627143750-d86bc21e42bb', 'Cotton sarees', 'sarees', 'Everyday Traditional', 'Sonika Agarwal'),
  'Silk sarees': createPhoto('photo-1610030469983-98e550d6193c', 'Silk sarees', 'sarees', 'Traditional Silk', 'Sagar Dani'),
  'Linen sarees': createPhoto('photo-1617627143750-d86bc21e42bb', 'Linen sarees', 'sarees', 'Contemporary Handloom', 'Sonika Agarwal'),
  'Printed sarees': createPhoto('photo-1610030469983-98e550d6193c', 'Printed sarees', 'sarees', 'Traditional Print', 'Sagar Dani'),
  'Embroidered sarees': createPhoto('photo-1617627143750-d86bc21e42bb', 'Embroidered sarees', 'sarees', 'Embroidered', 'Sonika Agarwal'),
  'Sequin sarees': createPhoto('photo-1610030469983-98e550d6193c', 'Sequin sarees', 'sarees', 'Party Sarees', 'Sagar Dani'),
  'Net sarees': createPhoto('photo-1617627143750-d86bc21e42bb', 'Net sarees', 'sarees', 'Party Sarees', 'Sonika Agarwal'),
  'Tissue sarees': createPhoto('photo-1610030469983-98e550d6193c', 'Tissue sarees', 'sarees', 'Traditional Silk', 'Sagar Dani'),
  'Crepe sarees': createPhoto('photo-1617627143750-d86bc21e42bb', 'Crepe sarees', 'sarees', 'Party Sarees', 'Sonika Agarwal'),
  'Ready-to-wear sarees': createPhoto('photo-1610030469983-98e550d6193c', 'Ready-to-wear sarees', 'sarees', 'Contemporary Traditional', 'Sagar Dani'),
  'Ruffle sarees': createPhoto('photo-1617627143750-d86bc21e42bb', 'Ruffle sarees', 'sarees', 'Contemporary Traditional', 'Sonika Agarwal'),
  'Contemporary designer sarees': createPhoto('photo-1610030469983-98e550d6193c', 'Contemporary designer sarees', 'sarees', 'Contemporary Traditional', 'Sagar Dani'),

  // ==========================================
  // CATEGORY M: SAREE BLOUSES
  // ==========================================
  'Short-sleeve blouses': createStudioPhoto('saree-blouse', 'Short-sleeve blouses', 'saree-blouses', 'Cholis', 'Embroidered Silk Short-Sleeve Choli on Model'),
  'Long-sleeve blouses': createPhoto('photo-1610030469983-98e550d6193c', 'Long-sleeve blouses', 'saree-blouses', 'Cholis', 'Sagar Dani'),
  'Sleeveless blouses': createPhoto('photo-1617627143750-d86bc21e42bb', 'Sleeveless blouses', 'saree-blouses', 'Cholis', 'Sonika Agarwal'),
  'High-neck blouses': createPhoto('photo-1610030469983-98e550d6193c', 'High-neck blouses', 'saree-blouses', 'Cholis', 'Sagar Dani'),
  'Boat-neck blouses': createPhoto('photo-1617627143750-d86bc21e42bb', 'Boat-neck blouses', 'saree-blouses', 'Cholis', 'Sonika Agarwal'),
  'Square-neck blouses': createPhoto('photo-1610030469983-98e550d6193c', 'Square-neck blouses', 'saree-blouses', 'Cholis', 'Sagar Dani'),
  'Halter-neck blouses': createPhoto('photo-1617627143750-d86bc21e42bb', 'Halter-neck blouses', 'saree-blouses', 'Cholis', 'Sonika Agarwal'),
  'Sweetheart-neck blouses': createStudioPhoto('saree-blouse', 'Sweetheart-neck blouses', 'saree-blouses', 'Cholis', 'Sweetheart Silk Saree Blouse on Model'),
  'Deep-back blouses': createPhoto('photo-1617627143750-d86bc21e42bb', 'Deep-back blouses', 'saree-blouses', 'Cholis', 'Sonika Agarwal'),
  'Backless fashion blouses': createPhoto('photo-1610030469983-98e550d6193c', 'Backless fashion blouses', 'saree-blouses', 'Cholis', 'Sagar Dani'),
  'Corset-style blouses': createStudioPhoto('saree-blouse', 'Corset-style blouses', 'saree-blouses', 'Cholis', 'Structured Silk Corset Choli on Model'),
  'Embroidered blouses': createStudioPhoto('saree-blouse', 'Embroidered blouses', 'saree-blouses', 'Cholis', 'Opulent Gold Zardozi Embroidered Silk Blouse on Model'),
  'Brocade blouses': createStudioPhoto('saree-blouse', 'Brocade blouses', 'saree-blouses', 'Cholis', 'Royal Banarasi Silk Brocade Blouse on Model'),
  'Velvet blouses': createStudioPhoto('saree-blouse', 'Velvet blouses', 'saree-blouses', 'Cholis', 'Luxe Embroidered Velvet Blouse on Model'),
  'Puff-sleeve blouses': createPhoto('photo-1617627143750-d86bc21e42bb', 'Puff-sleeve blouses', 'saree-blouses', 'Cholis', 'Sonika Agarwal'),
  'Cape-style blouses': createPhoto('photo-1610030469983-98e550d6193c', 'Cape-style blouses', 'saree-blouses', 'Cholis', 'Sagar Dani'),
  'Ready-made blouses': createStudioPhoto('saree-blouse', 'Ready-made blouses', 'saree-blouses', 'Cholis', 'Ready-to-Wear Embroidered Silk Blouse on Model'),

  // ==========================================
  // CATEGORY N: LEHENGAS
  // ==========================================
  'Bridal lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Bridal lehengas', 'lehengas', 'Bridal', 'Dollar Gill'),
  'Party-wear lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Party-wear lehengas', 'lehengas', 'Party Wear', 'Dollar Gill'),
  'A-line lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'A-line lehengas', 'lehengas', 'Ethnic Silhouettes', 'Dollar Gill'),
  'Circular lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Circular lehengas', 'lehengas', 'Ethnic Silhouettes', 'Dollar Gill'),
  'Mermaid lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Mermaid lehengas', 'lehengas', 'Ethnic Silhouettes', 'Dollar Gill'),
  'Embroidered lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Embroidered lehengas', 'lehengas', 'Bridal', 'Dollar Gill'),
  'Sequin lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Sequin lehengas', 'lehengas', 'Party Wear', 'Dollar Gill'),
  'Mirror-work lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Mirror-work lehengas', 'lehengas', 'Traditional', 'Dollar Gill'),
  'Printed lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Printed lehengas', 'lehengas', 'Traditional', 'Dollar Gill'),
  'Silk lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Silk lehengas', 'lehengas', 'Bridal', 'Dollar Gill'),
  'Net lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Net lehengas', 'lehengas', 'Party Wear', 'Dollar Gill'),
  'Velvet lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Velvet lehengas', 'lehengas', 'Bridal', 'Dollar Gill'),
  'Floral lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Floral lehengas', 'lehengas', 'Party Wear', 'Dollar Gill'),
  'Contemporary lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Contemporary lehengas', 'lehengas', 'Party Wear', 'Dollar Gill'),
  'Crop-top lehenga sets': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Crop-top lehenga sets', 'lehengas', 'Party Wear', 'Dollar Gill'),
  'Traditional lehenga-choli sets': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Traditional lehenga-choli sets', 'lehengas', 'Bridal', 'Dollar Gill'),

  // ==========================================
  // CATEGORY O: SALWAR SUITS, KURTAS AND ETHNIC WEAR
  // ==========================================
  'Anarkali suits': createPhoto('photo-1610030469983-98e550d6193c', 'Anarkali suits', 'salwar-ethnic', 'Anarkali & Suits', 'Sagar Dani'),
  'Straight-cut suits': createPhoto('photo-1617627143750-d86bc21e42bb', 'Straight-cut suits', 'salwar-ethnic', 'Straight Suits', 'Sonika Agarwal'),
  'Punjabi suits': createPhoto('photo-1610030469983-98e550d6193c', 'Punjabi suits', 'salwar-ethnic', 'Patiala & Suits', 'Sagar Dani'),
  'Patiala suits': createPhoto('photo-1617627143750-d86bc21e42bb', 'Patiala suits', 'salwar-ethnic', 'Patiala & Suits', 'Sonika Agarwal'),
  'Palazzo suits': createPhoto('photo-1610030469983-98e550d6193c', 'Palazzo suits', 'salwar-ethnic', 'Palazzo & Sharara', 'Sagar Dani'),
  'Sharara suits': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Sharara suits', 'salwar-ethnic', 'Palazzo & Sharara', 'Dollar Gill'),
  'Gharara suits': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Gharara suits', 'salwar-ethnic', 'Palazzo & Sharara', 'Dollar Gill'),
  'Churidar suits': createPhoto('photo-1617627143750-d86bc21e42bb', 'Churidar suits', 'salwar-ethnic', 'Straight Suits', 'Sonika Agarwal'),
  'Straight kurtas': createPhoto('photo-1610030469983-98e550d6193c', 'Straight kurtas', 'salwar-ethnic', 'Kurtas', 'Sagar Dani'),
  'A-line kurtas': createPhoto('photo-1617627143750-d86bc21e42bb', 'A-line kurtas', 'salwar-ethnic', 'Kurtas', 'Sonika Agarwal'),
  'Angrakha kurtas': createPhoto('photo-1610030469983-98e550d6193c', 'Angrakha kurtas', 'salwar-ethnic', 'Kurtas', 'Sagar Dani'),
  'Long kurtas': createPhoto('photo-1617627143750-d86bc21e42bb', 'Long kurtas', 'salwar-ethnic', 'Kurtas', 'Sonika Agarwal'),
  'Short kurtis': createPhoto('photo-1610030469983-98e550d6193c', 'Short kurtis', 'salwar-ethnic', 'Kurtas', 'Sagar Dani'),
  'Kurta-and-trouser sets': createPhoto('photo-1617627143750-d86bc21e42bb', 'Kurta-and-trouser sets', 'salwar-ethnic', 'Sets', 'Sonika Agarwal'),
  'Kurta-and-jeans combinations': createPhoto('photo-1610030469983-98e550d6193c', 'Kurta-and-jeans combinations', 'salwar-ethnic', 'Sets', 'Sagar Dani'),
  'Embroidered suits': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Embroidered suits', 'salwar-ethnic', 'Suits', 'Dollar Gill'),
  'Printed cotton suits': createPhoto('photo-1617627143750-d86bc21e42bb', 'Printed cotton suits', 'salwar-ethnic', 'Suits', 'Sonika Agarwal'),
  'Floor-length ethnic suits': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Floor-length ethnic suits', 'salwar-ethnic', 'Anarkali & Suits', 'Dollar Gill'),
  'Jacket-style ethnic suits': createPhoto('photo-1610030469983-98e550d6193c', 'Jacket-style ethnic suits', 'salwar-ethnic', 'Suits', 'Sagar Dani'),
  'Dhoti-pant sets': createPhoto('photo-1617627143750-d86bc21e42bb', 'Dhoti-pant sets', 'salwar-ethnic', 'Sets', 'Sonika Agarwal'),
  'Ethnic co-ord sets': createPhoto('photo-1610030469983-98e550d6193c', 'Ethnic co-ord sets', 'salwar-ethnic', 'Sets', 'Sagar Dani'),
  'Traditional skirt sets': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Traditional skirt sets', 'salwar-ethnic', 'Sets', 'Dollar Gill'),
  'Indo-Western outfits': createPhoto('photo-1617627143750-d86bc21e42bb', 'Indo-Western outfits', 'salwar-ethnic', 'Contemporary', 'Sonika Agarwal'),
  'Dupattas': createPhoto('photo-1610030469983-98e550d6193c', 'Dupattas', 'salwar-ethnic', 'Dupattas & Shawls', 'Sagar Dani'),
  'Shawls': createPhoto('photo-1617627143750-d86bc21e42bb', 'Shawls', 'salwar-ethnic', 'Dupattas & Shawls', 'Sonika Agarwal'),
  'Ethnic jackets': createPhoto('photo-1610030469983-98e550d6193c', 'Ethnic jackets', 'salwar-ethnic', 'Suits', 'Sagar Dani'),

  // ==========================================
  // CATEGORY P: PARTY AND EVENING WEAR
  // ==========================================
  'Cocktail dresses': createPhoto('photo-1566174053879-31528523f8ae', 'Cocktail dresses', 'party-evening', 'Cocktail & Evening', 'Tamara Bellis'),
  'Evening gowns': createPhoto('photo-1566174053879-31528523f8ae', 'Evening gowns', 'party-evening', 'Cocktail & Evening', 'Tamara Bellis'),
  'Sequin dresses': createPhoto('photo-1566174053879-31528523f8ae', 'Sequin dresses', 'party-evening', 'Cocktail & Evening', 'Tamara Bellis'),
  'Satin dresses': createPhoto('photo-1522337360788-8b13dee7a37e', 'Satin dresses', 'party-evening', 'Cocktail & Evening', 'Joanna Kosinska'),
  'Velvet dresses': createPhoto('photo-1566174053879-31528523f8ae', 'Velvet dresses', 'party-evening', 'Cocktail & Evening', 'Tamara Bellis'),
  'Formal jumpsuits': createPhoto('photo-1515886657613-9f3515b0c78f', 'Formal jumpsuits', 'party-evening', 'Jumpsuits & Sets', 'Dom Hill'),
  'Party co-ord sets': createPhoto('photo-1529139574466-a303027c1d8b', 'Party co-ord sets', 'party-evening', 'Jumpsuits & Sets', 'Laura Chouette'),
  'Statement tops': createPhoto('photo-1574634534894-89d7576c8259', 'Statement tops', 'party-evening', 'Party Tops', 'Fahad Bin Kamal'),
  'Dressy skirts': createPhoto('photo-1582142306909-195724d33ffc', 'Dressy skirts', 'party-evening', 'Party Skirts', 'Laura Chouette'),
  'Wedding-guest outfits': createPhoto('photo-1595777457583-95e059d581b8', 'Wedding-guest outfits', 'party-evening', 'Cocktail & Evening', 'Tamara Bellis'),
  'Prom-style dresses': createPhoto('photo-1518611012118-696072aa579a', 'Prom-style dresses', 'party-evening', 'Cocktail & Evening', 'Scott Broome'),
  'Reception dresses': createPhoto('photo-1566174053879-31528523f8ae', 'Reception dresses', 'party-evening', 'Cocktail & Evening', 'Tamara Bellis'),
  'Festive outfits': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Festive outfits', 'party-evening', 'Party Ethnic', 'Dollar Gill'),
  'Party lehengas': createPhoto('photo-1583391733956-3750e0ff4e8b', 'Party lehengas', 'party-evening', 'Party Ethnic', 'Dollar Gill'),
  'Party sarees': createPhoto('photo-1610030469983-98e550d6193c', 'Party sarees', 'party-evening', 'Party Ethnic', 'Sagar Dani'),
  'Designer ethnic suits': createPhoto('photo-1617627143750-d86bc21e42bb', 'Designer ethnic suits', 'party-evening', 'Party Ethnic', 'Sonika Agarwal'),

  // ==========================================
  // CATEGORY Q: SPORTSWEAR AND ACTIVEWEAR
  // ==========================================
  'Athletic crop tops': createPhoto('photo-1506619216599-9d16d0903dfd', 'Athletic crop tops', 'sportswear', 'Active Tops', 'Scott Broome'),
  'Gym T-shirts': createPhoto('photo-1521572267360-ee0c2909d518', 'Gym T-shirts', 'sportswear', 'Active Tops', 'Faith Yarn'),
  'Running tops': createPhoto('photo-1518611012118-696072aa579a', 'Running tops', 'sportswear', 'Active Tops', 'Scott Broome'),
  'Yoga pants': createPhoto('photo-1506619216599-9d16d0903dfd', 'Yoga pants', 'sportswear', 'Active Bottoms', 'Scott Broome'),
  'Tracksuits': createPhoto('photo-1552902865-b72c031ac5ea', 'Tracksuits', 'sportswear', 'Sets & Outerwear', 'Alexandru Zdrobău'),
  'Athletic dresses': createPhoto('photo-1515372039744-b8f02a3ae446', 'Athletic dresses', 'sportswear', 'Sets & Outerwear', 'Brooke Cagle'),
  'Sports jackets': createPhoto('photo-1552902865-b72c031ac5ea', 'Sports jackets', 'sportswear', 'Sets & Outerwear', 'Alexandru Zdrobău'),
  'Sweatshirts': createPhoto('photo-1552902865-b72c031ac5ea', 'Sweatshirts', 'sportswear', 'Sets & Outerwear', 'Alexandru Zdrobău'),
  'Performance tops': createPhoto('photo-1518611012118-696072aa579a', 'Performance tops', 'sportswear', 'Active Tops', 'Scott Broome'),
  'Athletic co-ord sets': createPhoto('photo-1506619216599-9d16d0903dfd', 'Athletic co-ord sets', 'sportswear', 'Sets & Outerwear', 'Scott Broome'),

  // ==========================================
  // CATEGORY R: NIGHTWEAR AND LOUNGEWEAR
  // ==========================================
  'Pajama sets': createPhoto('photo-1583496661160-fb5886a0aaaa', 'Pajama sets', 'nightwear', 'Pajamas', 'Deleece Cook'),
  'Night suits': createPhoto('photo-1583496661160-fb5886a0aaaa', 'Night suits', 'nightwear', 'Pajamas', 'Deleece Cook'),
  'Nightdresses': createPhoto('photo-1522337360788-8b13dee7a37e', 'Nightdresses', 'nightwear', 'Gowns & Slips', 'Joanna Kosinska'),
  'Sleep shirts': createPhoto('photo-1503342217505-b0a15ec3261c', 'Sleep shirts', 'nightwear', 'Tops & Shirts', 'Valerie Elash'),
  'Nightgowns': createPhoto('photo-1522337360788-8b13dee7a37e', 'Nightgowns', 'nightwear', 'Gowns & Slips', 'Joanna Kosinska'),
  'Lounge sets': createPhoto('photo-1552902865-b72c031ac5ea', 'Lounge sets', 'nightwear', 'Loungewear', 'Alexandru Zdrobău'),
  'Lounge trousers': createPhoto('photo-1552902865-b72c031ac5ea', 'Lounge trousers', 'nightwear', 'Loungewear', 'Alexandru Zdrobău'),
  'Robes': createPhoto('photo-1522337360788-8b13dee7a37e', 'Robes', 'nightwear', 'Robes & Gowns', 'Joanna Kosinska'),
  'Dressing gowns': createPhoto('photo-1522337360788-8b13dee7a37e', 'Dressing gowns', 'nightwear', 'Robes & Gowns', 'Joanna Kosinska'),
  'Satin pajamas': createPhoto('photo-1522337360788-8b13dee7a37e', 'Satin pajamas', 'nightwear', 'Pajamas', 'Joanna Kosinska'),
  'Cotton pajamas': createPhoto('photo-1583496661160-fb5886a0aaaa', 'Cotton pajamas', 'nightwear', 'Pajamas', 'Deleece Cook'),
  'Sleep camisoles': createPhoto('photo-1503342217505-b0a15ec3261c', 'Sleep camisoles', 'nightwear', 'Tops & Shirts', 'Valerie Elash'),
  'Sleep shorts': createPhoto('photo-1591195853828-11db59a44f6b', 'Sleep shorts', 'nightwear', 'Loungewear', 'Tamara Bellis'),
  'House dresses': createPhoto('photo-1515372039744-b8f02a3ae446', 'House dresses', 'nightwear', 'Gowns & Slips', 'Brooke Cagle'),
  'Lounge jumpsuits': createPhoto('photo-1594633312681-425c7b97ccd1', 'Lounge jumpsuits', 'nightwear', 'Loungewear', 'Laura Chouette'),
  'Oversized sleep T-shirts': createPhoto('photo-1503342217505-b0a15ec3261c', 'Oversized sleep T-shirts', 'nightwear', 'Tops & Shirts', 'Valerie Elash'),
  'Lounge co-ord sets': createPhoto('photo-1552902865-b72c031ac5ea', 'Lounge co-ord sets', 'nightwear', 'Loungewear', 'Alexandru Zdrobău'),

  // ==========================================
  // CATEGORY S: SWIMWEAR AND BEACHWEAR
  // ==========================================
  'One-piece swimsuits': createPhoto('photo-1507525428034-b723cf961d3e', 'One-piece swimsuits', 'swimwear', 'Swimsuits', 'Sean Oulashin'),
  'Two-piece swimsuits': createPhoto('photo-1518611012118-696072aa579a', 'Two-piece swimsuits', 'swimwear', 'Bikinis', 'Scott Broome'),
  'Bikinis': createPhoto('photo-1518611012118-696072aa579a', 'Bikinis', 'swimwear', 'Bikinis', 'Scott Broome'),
  'Tankinis': createPhoto('photo-1507525428034-b723cf961d3e', 'Tankinis', 'swimwear', 'Bikinis', 'Sean Oulashin'),
  'High-waisted swim bottoms': createPhoto('photo-1574634534894-89d7576c8259', 'High-waisted swim bottoms', 'swimwear', 'Bikinis', 'Fahad Bin Kamal'),
  'Swim shorts': createPhoto('photo-1591195853828-11db59a44f6b', 'Swim shorts', 'swimwear', 'Cover-ups & Shorts', 'Tamara Bellis'),
  'Rash guards': createPhoto('photo-1518611012118-696072aa579a', 'Rash guards', 'swimwear', 'Swimsuits', 'Scott Broome'),
  'Swim dresses': createPhoto('photo-1515372039744-b8f02a3ae446', 'Swim dresses', 'swimwear', 'Swimsuits', 'Brooke Cagle'),
  'Beach cover-ups': createPhoto('photo-1496747611176-843222e1e57c', 'Beach cover-ups', 'swimwear', 'Cover-ups & Shorts', 'Oladimeji Odunsi'),
  'Sarongs': createPhoto('photo-1496747611176-843222e1e57c', 'Sarongs', 'swimwear', 'Cover-ups & Shorts', 'Oladimeji Odunsi'),
  'Kaftans': createPhoto('photo-1496747611176-843222e1e57c', 'Kaftans', 'swimwear', 'Cover-ups & Shorts', 'Oladimeji Odunsi'),
  'Beach dresses': createPhoto('photo-1515372039744-b8f02a3ae446', 'Beach dresses', 'swimwear', 'Cover-ups & Shorts', 'Brooke Cagle'),
  'Resort-wear sets': createPhoto('photo-1594633312681-425c7b97ccd1', 'Resort-wear sets', 'swimwear', 'Cover-ups & Shorts', 'Laura Chouette'),
  'Swim skirts': createPhoto('photo-1583496661160-fb5886a0aaaa', 'Swim skirts', 'swimwear', 'Cover-ups & Shorts', 'Deleece Cook'),
  'Long-sleeve swimwear': createPhoto('photo-1518611012118-696072aa579a', 'Long-sleeve swimwear', 'swimwear', 'Swimsuits', 'Scott Broome'),

  // ==========================================
  // CATEGORY T: JACKETS AND COATS
  // ==========================================
  'Denim jackets': createPhoto('photo-1543163521-1bf539c55dd2', 'Denim jackets', 'jackets-coats', 'Jackets', 'Laura Chouette'),
  'Leather-look jackets': createPhoto('photo-1529139574466-a303027c1d8b', 'Leather-look jackets', 'jackets-coats', 'Jackets', 'Laura Chouette'),
  'Bomber jackets': createPhoto('photo-1544441893-675973e31985', 'Bomber jackets', 'jackets-coats', 'Jackets', 'Manki Kim'),
  'Blazers': createPhoto('photo-1584273143981-41c073dfe8f8', 'Blazers', 'jackets-coats', 'Blazers', 'Laura Chouette'),
  'Blazer dresses': createPhoto('photo-1584273143981-41c073dfe8f8', 'Blazer dresses', 'jackets-coats', 'Blazers', 'Laura Chouette'),
  'Trench coats': createPhoto('photo-1544441893-675973e31985', 'Trench coats', 'jackets-coats', 'Coats', 'Manki Kim'),
  'Wool coats': createPhoto('photo-1539533018447-63fcce2678e3', 'Wool coats', 'jackets-coats', 'Coats', 'Manki Kim'),
  'Puffer jackets': createPhoto('photo-1544441893-675973e31985', 'Puffer jackets', 'jackets-coats', 'Jackets', 'Manki Kim'),
  'Parkas': createPhoto('photo-1539533018447-63fcce2678e3', 'Parkas', 'jackets-coats', 'Coats', 'Manki Kim'),
  'Cropped jackets': createPhoto('photo-1543163521-1bf539c55dd2', 'Cropped jackets', 'jackets-coats', 'Jackets', 'Laura Chouette'),
  'Oversized jackets': createPhoto('photo-1584273143981-41c073dfe8f8', 'Oversized jackets', 'jackets-coats', 'Jackets', 'Laura Chouette'),
  'Windbreakers': createPhoto('photo-1544441893-675973e31985', 'Windbreakers', 'jackets-coats', 'Jackets', 'Manki Kim'),
  'Longline coats': createPhoto('photo-1539533018447-63fcce2678e3', 'Longline coats', 'jackets-coats', 'Coats', 'Manki Kim'),
  'Waistcoats': createPhoto('photo-1584273143981-41c073dfe8f8', 'Waistcoats', 'jackets-coats', 'Blazers', 'Laura Chouette'),
  'Shrugs': createPhoto('photo-1434389677669-e08b4cac3105', 'Shrugs', 'jackets-coats', 'Capes & Shrugs', 'Amanda Vick'),
  'Boleros': createPhoto('photo-1434389677669-e08b4cac3105', 'Boleros', 'jackets-coats', 'Capes & Shrugs', 'Amanda Vick'),
  'Capes': createPhoto('photo-1539533018447-63fcce2678e3', 'Capes', 'jackets-coats', 'Capes & Shrugs', 'Manki Kim'),
  'Ponchos': createPhoto('photo-1434389677669-e08b4cac3105', 'Ponchos', 'jackets-coats', 'Capes & Shrugs', 'Amanda Vick'),
  'Utility jackets': createPhoto('photo-1517445312882-bc9910d016b7', 'Utility jackets', 'jackets-coats', 'Jackets', 'Laura Chouette'),
  'Quilted jackets': createPhoto('photo-1544441893-675973e31985', 'Quilted jackets', 'jackets-coats', 'Jackets', 'Manki Kim'),
  'Raincoats': createPhoto('photo-1544441893-675973e31985', 'Raincoats', 'jackets-coats', 'Coats', 'Manki Kim'),

  // ==========================================
  // CATEGORY U: SWEATERS AND KNITWEAR
  // ==========================================
  'Crew-neck sweaters': createPhoto('photo-1434389677669-e08b4cac3105', 'Crew-neck sweaters', 'sweaters-knitwear', 'Sweaters', 'Amanda Vick'),
  'V-neck sweaters': createPhoto('photo-1434389677669-e08b4cac3105', 'V-neck sweaters', 'sweaters-knitwear', 'Sweaters', 'Amanda Vick'),
  'Turtleneck sweaters': createPhoto('photo-1516762689617-e1cffcef479d', 'Turtleneck sweaters', 'sweaters-knitwear', 'Sweaters', 'Sarah Brown'),
  'Cardigans': createPhoto('photo-1434389677669-e08b4cac3105', 'Cardigans', 'sweaters-knitwear', 'Cardigans', 'Amanda Vick'),
  'Oversized sweaters': createPhoto('photo-1434389677669-e08b4cac3105', 'Oversized sweaters', 'sweaters-knitwear', 'Sweaters', 'Amanda Vick'),
  'Cropped sweaters': createPhoto('photo-1539109136881-3be0616acf4b', 'Cropped sweaters', 'sweaters-knitwear', 'Sweaters', 'Valerie Elash'),
  'Sweater vests': createPhoto('photo-1434389677669-e08b4cac3105', 'Sweater vests', 'sweaters-knitwear', 'Sweaters', 'Amanda Vick'),
  'Cable-knit sweaters': createPhoto('photo-1434389677669-e08b4cac3105', 'Cable-knit sweaters', 'sweaters-knitwear', 'Sweaters', 'Amanda Vick'),
  'Lightweight pullovers': createPhoto('photo-1521572267360-ee0c2909d518', 'Lightweight pullovers', 'sweaters-knitwear', 'Sweaters', 'Faith Yarn'),
  'Chunky-knit sweaters': createPhoto('photo-1434389677669-e08b4cac3105', 'Chunky-knit sweaters', 'sweaters-knitwear', 'Sweaters', 'Amanda Vick'),
  'Longline cardigans': createPhoto('photo-1434389677669-e08b4cac3105', 'Longline cardigans', 'sweaters-knitwear', 'Cardigans', 'Amanda Vick'),

  // ==========================================
  // CATEGORY V: CO-ORD SETS
  // ==========================================
  'Top-and-skirt sets': createPhoto('photo-1582142306909-195724d33ffc', 'Top-and-skirt sets', 'co-ord-sets', 'Skirt Sets', 'Laura Chouette'),
  'Top-and-trouser sets': createPhoto('photo-1594633312681-425c7b97ccd1', 'Top-and-trouser sets', 'co-ord-sets', 'Trouser Sets', 'Laura Chouette'),
  'Shirt-and-short sets': createPhoto('photo-1591195853828-11db59a44f6b', 'Shirt-and-short sets', 'co-ord-sets', 'Short Sets', 'Tamara Bellis'),
  'Casual co-ord sets': createPhoto('photo-1552902865-b72c031ac5ea', 'Casual co-ord sets', 'co-ord-sets', 'Casual Sets', 'Alexandru Zdrobău'),
  'Formal co-ord sets': createPhoto('photo-1584273143981-41c073dfe8f8', 'Formal co-ord sets', 'co-ord-sets', 'Formal Sets', 'Laura Chouette'),
  'Matching lounge sets': createPhoto('photo-1552902865-b72c031ac5ea', 'Matching lounge sets', 'co-ord-sets', 'Lounge Sets', 'Alexandru Zdrobău'),
  'Matching tracksuits': createPhoto('photo-1552902865-b72c031ac5ea', 'Matching tracksuits', 'co-ord-sets', 'Active Sets', 'Alexandru Zdrobău'),
  'Matching blazer-and-trouser sets': createPhoto('photo-1584273143981-41c073dfe8f8', 'Matching blazer-and-trouser sets', 'co-ord-sets', 'Formal Sets', 'Laura Chouette'),
  'Matching crop-top-and-skirt sets': createPhoto('photo-1582142306909-195724d33ffc', 'Matching crop-top-and-skirt sets', 'co-ord-sets', 'Skirt Sets', 'Laura Chouette'),

  // ==========================================
  // CATEGORY W: FOOTWEAR
  // ==========================================
  'Sneakers': createPhoto('photo-1549298916-b41d501d3772', 'Sneakers', 'footwear', 'Sneakers & Athletic', 'Maksim Larin', 'contain', 'product-studio'),
  'Running shoes': createPhoto('photo-1542291026-7eec264c27ff', 'Running shoes', 'footwear', 'Sneakers & Athletic', 'REVOLT', 'contain', 'product-studio'),
  'Ballet flats': createPhoto('photo-1543163521-1bf539c55dd2', 'Ballet flats', 'footwear', 'Flats & Sandals', 'Laura Chouette', 'contain', 'product-studio'),
  'Loafers': createPhoto('photo-1533867617858-e7b97e060509', 'Loafers', 'footwear', 'Flats & Sandals', 'Gautam Arora', 'contain', 'product-studio'),
  'Sandals': createPhoto('photo-1562273138-f46be4ebdf33', 'Sandals', 'footwear', 'Flats & Sandals', 'Claudio Schwarz', 'contain', 'product-studio'),
  'Flat sandals': createPhoto('photo-1562273138-f46be4ebdf33', 'Flat sandals', 'footwear', 'Flats & Sandals', 'Claudio Schwarz', 'contain', 'product-studio'),
  'High heels': createPhoto('photo-1543163521-1bf539c55dd2', 'High heels', 'footwear', 'Heels & Pumps', 'Laura Chouette', 'contain', 'product-studio'),
  'Pumps': createPhoto('photo-1543163521-1bf539c55dd2', 'Pumps', 'footwear', 'Heels & Pumps', 'Laura Chouette', 'contain', 'product-studio'),
  'Stilettos': createPhoto('photo-1543163521-1bf539c55dd2', 'Stilettos', 'footwear', 'Heels & Pumps', 'Laura Chouette', 'contain', 'product-studio'),
  'Wedges': createPhoto('photo-1562273138-f46be4ebdf33', 'Wedges', 'footwear', 'Heels & Pumps', 'Claudio Schwarz', 'contain', 'product-studio'),
  'Block heels': createPhoto('photo-1543163521-1bf539c55dd2', 'Block heels', 'footwear', 'Heels & Pumps', 'Laura Chouette', 'contain', 'product-studio'),
  'Ankle boots': createPhoto('photo-1543163521-1bf539c55dd2', 'Ankle boots', 'footwear', 'Boots', 'Laura Chouette', 'contain', 'product-studio'),
  'Knee-high boots': createPhoto('photo-1543163521-1bf539c55dd2', 'Knee-high boots', 'footwear', 'Boots', 'Laura Chouette', 'contain', 'product-studio'),
  'Slippers': createPhoto('photo-1562273138-f46be4ebdf33', 'Slippers', 'footwear', 'Flats & Sandals', 'Claudio Schwarz', 'contain', 'product-studio'),
  'Mules': createPhoto('photo-1562273138-f46be4ebdf33', 'Mules', 'footwear', 'Flats & Sandals', 'Claudio Schwarz', 'contain', 'product-studio'),
  'Espadrilles': createPhoto('photo-1562273138-f46be4ebdf33', 'Espadrilles', 'footwear', 'Flats & Sandals', 'Claudio Schwarz', 'contain', 'product-studio'),
  'Traditional juttis': createPhoto('photo-1562273138-f46be4ebdf33', 'Traditional juttis', 'footwear', 'Ethnic Footwear', 'Claudio Schwarz', 'contain', 'product-studio'),
  'Mojaris': createPhoto('photo-1562273138-f46be4ebdf33', 'Mojaris', 'footwear', 'Ethnic Footwear', 'Claudio Schwarz', 'contain', 'product-studio'),
  'Platform shoes': createPhoto('photo-1549298916-b41d501d3772', 'Platform shoes', 'footwear', 'Heels & Pumps', 'Maksim Larin', 'contain', 'product-studio'),
  'Mary Janes': createPhoto('photo-1543163521-1bf539c55dd2', 'Mary Janes', 'footwear', 'Heels & Pumps', 'Laura Chouette', 'contain', 'product-studio'),
  'Flip-flops': createPhoto('photo-1562273138-f46be4ebdf33', 'Flip-flops', 'footwear', 'Flats & Sandals', 'Claudio Schwarz', 'contain', 'product-studio'),

  // ==========================================
  // CATEGORY X: ACCESSORIES
  // ==========================================
  'Handbags': createPhoto('photo-1584917865442-de89df76afd3', 'Handbags', 'accessories', 'Bags & Purses', 'Creative Exchange', 'contain', 'product-studio'),
  'Shoulder bags': createPhoto('photo-1584917865442-de89df76afd3', 'Shoulder bags', 'accessories', 'Bags & Purses', 'Creative Exchange', 'contain', 'product-studio'),
  'Clutches': createPhoto('photo-1566150905458-1bf1fc113f0d', 'Clutches', 'accessories', 'Bags & Purses', 'Sanjoy Saha', 'contain', 'product-studio'),
  'Tote bags': createPhoto('photo-1544816155-12df9643f363', 'Tote bags', 'accessories', 'Bags & Purses', 'Ksenia Chernaya', 'contain', 'product-studio'),
  'Backpacks': createPhoto('photo-1553062407-98eeb64c6a62', 'Backpacks', 'accessories', 'Bags & Purses', 'Sun Lingyan', 'contain', 'product-studio'),
  'Belts': createPhoto('photo-1553062407-98eeb64c6a62', 'Belts', 'accessories', 'Belts & Hats', 'Sun Lingyan', 'contain', 'product-studio'),
  'Scarves': createPhoto('photo-1601924994987-69e26d50dc26', 'Scarves', 'accessories', 'Scarves & Stoles', 'Laura Chouette', 'contain', 'product-studio'),
  'Sunglasses': createPhoto('photo-1511499767150-a48a237f0083', 'Sunglasses', 'accessories', 'Eyewear', 'Ethan Robertson', 'contain', 'product-studio'),
  'Hats': createPhoto('photo-1534215754734-18e55d13e346', 'Hats', 'accessories', 'Belts & Hats', 'Christian Holzinger', 'contain', 'product-studio'),
  'Caps': createPhoto('photo-1588850561407-ed78c282e89b', 'Caps', 'accessories', 'Belts & Hats', 'Giorgio Trovato', 'contain', 'product-studio'),
  'Hairbands': createPhoto('photo-1534215754734-18e55d13e346', 'Hairbands', 'accessories', 'Hair Accessories', 'Christian Holzinger', 'contain', 'product-studio'),
  'Hair clips': createPhoto('photo-1534215754734-18e55d13e346', 'Hair clips', 'accessories', 'Hair Accessories', 'Christian Holzinger', 'contain', 'product-studio'),
  'Earrings': createPhoto('photo-1535632066927-ab7c9ab60908', 'Earrings', 'accessories', 'Jewelry', 'Laura Chouette', 'contain', 'product-studio'),
  'Necklaces': createPhoto('photo-1599643478518-a784e5dc4c8f', 'Necklaces', 'accessories', 'Jewelry', 'Laura Chouette', 'contain', 'product-studio'),
  'Bracelets': createPhoto('photo-1611591475152-47eac9dc6ff4', 'Bracelets', 'accessories', 'Jewelry', 'Laura Chouette', 'contain', 'product-studio'),
  'Watches': createPhoto('photo-1524805444758-089113d48a6d', 'Watches', 'accessories', 'Jewelry', 'Laura Chouette', 'contain', 'product-studio'),
  'Rings': createPhoto('photo-1605100804763-247f67b3557e', 'Rings', 'accessories', 'Jewelry', 'Laura Chouette', 'contain', 'product-studio'),
  'Anklets': createPhoto('photo-1611591475152-47eac9dc6ff4', 'Anklets', 'accessories', 'Jewelry', 'Laura Chouette', 'contain', 'product-studio'),
  'Brooches': createPhoto('photo-1599643478518-a784e5dc4c8f', 'Brooches', 'accessories', 'Jewelry', 'Laura Chouette', 'contain', 'product-studio'),
  'Headbands': createPhoto('photo-1534215754734-18e55d13e346', 'Headbands', 'accessories', 'Hair Accessories', 'Christian Holzinger', 'contain', 'product-studio'),
  'Stoles': createPhoto('photo-1601924994987-69e26d50dc26', 'Stoles', 'accessories', 'Scarves & Stoles', 'Laura Chouette', 'contain', 'product-studio'),
};

// Lookup helper for any garment
export function lookupGarmentImageRecord(garmentName: string, categoryId?: string): GarmentImageRecord {
  // 1. Direct match by exact garment name
  if (CLOTHING_IMAGE_REGISTRY[garmentName]) {
    return CLOTHING_IMAGE_REGISTRY[garmentName];
  }

  // 2. Case-insensitive lookup
  const lowerName = garmentName.toLowerCase();
  for (const [key, val] of Object.entries(CLOTHING_IMAGE_REGISTRY)) {
    if (key.toLowerCase() === lowerName) {
      return val;
    }
  }

  // 3. Fallback to category photograph
  if (categoryId && CATEGORY_PHOTO_FALLBACKS[categoryId]) {
    return CATEGORY_PHOTO_FALLBACKS[categoryId];
  }

  // 4. Default high-end fashion editorial photograph
  return CATEGORY_PHOTO_FALLBACKS['dresses'];
}
