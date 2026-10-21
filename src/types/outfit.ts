import { GarmentItem, GarmentCustomizationOptions, LayerType } from './catalogue';

export interface SelectedGarmentLayer {
  layerId: string; // unique instance ID in current outfit
  garment: GarmentItem;
  layerType: LayerType;
  customization: GarmentCustomizationOptions;
  isVisible: boolean;
  addedAt: number;
}

export interface OutfitSpecification {
  layers: SelectedGarmentLayer[];
  customPromptDescription?: string;
  globalOccasion?: string;
  globalSeason?: string;
}

export interface OutfitValidationResult {
  isValid: boolean;
  conflicts: string[];
  warnings: string[];
  summary: string;
}
