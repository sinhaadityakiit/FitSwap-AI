export interface GarmentImageRecord {
  garmentId?: string;
  garmentName: string;
  category: string;
  subcategory?: string;
  imageUrl: string;
  sourceUrl: string;
  photographer: string;
  attribution: string;
  licenceInformation: string;
  displayFit?: 'cover' | 'contain';
  photographyStyle: 'product-studio' | 'editorial-model' | 'flat-lay';
}
