export type CategoryId =
  | 'underwear'
  | 'bras'
  | 'base-layers'
  | 'tops'
  | 'shirts-blouses'
  | 'dresses'
  | 'skirts'
  | 'jeans'
  | 'trousers-pants'
  | 'shorts'
  | 'jumpsuits-rompers'
  | 'sarees'
  | 'saree-blouses'
  | 'lehengas'
  | 'salwar-ethnic'
  | 'party-evening'
  | 'sportswear'
  | 'nightwear'
  | 'swimwear'
  | 'jackets-coats'
  | 'sweaters-knitwear'
  | 'co-ord-sets'
  | 'footwear'
  | 'accessories';

export type LayerType =
  | 'underwear'
  | 'bra'
  | 'base'
  | 'bottom'
  | 'top'
  | 'dress'
  | 'ethnic-outfit'
  | 'outerwear'
  | 'footwear'
  | 'accessory';

export interface GarmentCustomizationOptions {
  color?: string;
  customColorHex?: string;
  fabric?: string;
  pattern?: string;
  waistRise?: string;
  coverage?: string;
  construction?: string;
  strapStyle?: string;
  padding?: string;
  neckline?: string;
  sleeveLength?: string;
  garmentLength?: string;
  fit?: string;
  silhouette?: string;
  hemline?: string;
  collarStyle?: string;
  embroidery?: string;
  borderDesign?: string;
  drapingStyle?: string;
  palluStyle?: string;
  blouseStyle?: string;
  dupattaStyle?: string;
  occasion?: string;
  season?: string;
}

export interface GarmentItem {
  id: string;
  name: string;
  categoryId: CategoryId;
  categoryName: string;
  layerType: LayerType;
  description: string;
  compatibleFabrics: string[];
  compatibleNecklines?: string[];
  compatibleSleeves?: string[];
  compatibleWaistRises?: string[];
  compatibleFits?: string[];
  compatibleSilhouettes?: string[];
  defaultOptions: GarmentCustomizationOptions;
  tags: string[];
  iconKey?: string;
  imageUrl?: string;
}

export interface ClothingCategoryInfo {
  id: CategoryId;
  code: string; // 'A' through 'X'
  name: string;
  shortDescription: string;
  garmentCount: number;
  layerType: LayerType;
  iconName: string;
  imageUrl?: string;
  subcategories: string[];
}
