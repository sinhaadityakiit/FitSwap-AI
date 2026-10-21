export interface DemoModel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  recommendedStyles: string[];
}

export const DEMO_MODELS: DemoModel[] = [
  {
    id: 'demo-default',
    name: 'Default Fitting Model (Neutral Base Layer)',
    description: 'Clean studio background wearing neutral base tank top and shorts. Ready for layering garments one by one.',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    recommendedStyles: ['Panties', 'Bras', 'Shorts', 'Shirts', 'Bikinis', 'Dresses']
  },
  {
    id: 'demo-1',
    name: 'Model: Aanya (Studio Portrait)',
    description: 'Neutral studio lighting, standing pose, ideal for traditional and Western outfits.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    recommendedStyles: ['Banarasi sarees', 'Bridal lehengas', 'Tailored blazers', 'Cocktail dresses']
  },
  {
    id: 'demo-2',
    name: 'Model: Elena (Urban Streetwear)',
    description: 'Natural daylight, casual standing pose, ideal for casual wear, jeans, and activewear.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    recommendedStyles: ['Wide-leg jeans', 'Basic T-shirts', 'Denim jackets', 'Sneakers']
  },
  {
    id: 'demo-3',
    name: 'Model: Priya (Full Length Pose)',
    description: 'Clean background, full body orientation, suitable for long gowns, maxis, and sarees.',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    recommendedStyles: ['Evening gowns', 'Anarkali suits', 'Maxi skirts', 'High heels']
  }
];

export const DEMO_BEFORE_AFTER = {
  original: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  tryOnOutfit: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
  caption: 'Demonstration: Original black top replaced with lavender floral cocktail dress'
};
