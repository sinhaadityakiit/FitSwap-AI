export interface ColorOption {
  name: string;
  hex: string;
  textColor: string;
}

export const FASHION_COLORS: ColorOption[] = [
  { name: 'Black', hex: '#111111', textColor: '#ffffff' },
  { name: 'White', hex: '#FFFFFF', textColor: '#111111' },
  { name: 'Red', hex: '#DC2626', textColor: '#ffffff' },
  { name: 'Blue', hex: '#2563EB', textColor: '#ffffff' },
  { name: 'Navy Blue', hex: '#0F172A', textColor: '#ffffff' },
  { name: 'Sky Blue', hex: '#38BDF8', textColor: '#111111' },
  { name: 'Pink', hex: '#EC4899', textColor: '#ffffff' },
  { name: 'Rose Pink', hex: '#F43F5E', textColor: '#ffffff' },
  { name: 'Purple', hex: '#9333EA', textColor: '#ffffff' },
  { name: 'Lavender', hex: '#C084FC', textColor: '#111111' },
  { name: 'Green', hex: '#16A34A', textColor: '#ffffff' },
  { name: 'Olive Green', hex: '#4D7C0F', textColor: '#ffffff' },
  { name: 'Yellow', hex: '#EAB308', textColor: '#111111' },
  { name: 'Orange', hex: '#EA580C', textColor: '#ffffff' },
  { name: 'Brown', hex: '#78350F', textColor: '#ffffff' },
  { name: 'Beige', hex: '#D6C7B2', textColor: '#111111' },
  { name: 'Cream', hex: '#FDFBF7', textColor: '#111111' },
  { name: 'Grey', hex: '#6B7280', textColor: '#ffffff' },
  { name: 'Silver', hex: '#CBD5E1', textColor: '#111111' },
  { name: 'Gold', hex: '#D4AF37', textColor: '#111111' },
  { name: 'Maroon', hex: '#800000', textColor: '#ffffff' },
  { name: 'Burgundy', hex: '#800020', textColor: '#ffffff' },
  { name: 'Teal', hex: '#0D9488', textColor: '#ffffff' },
  { name: 'Turquoise', hex: '#06B6D4', textColor: '#111111' },
  { name: 'Pastel Lilac', hex: '#E9D5FF', textColor: '#111111' },
  { name: 'Multicolour', hex: 'linear-gradient(135deg, #f43f5e, #8b5cf6, #06b6d4)', textColor: '#ffffff' },
];

export const FASHION_FABRICS = [
  'Cotton',
  'Silk',
  'Satin',
  'Chiffon',
  'Georgette',
  'Linen',
  'Denim',
  'Velvet',
  'Wool',
  'Cashmere',
  'Polyester',
  'Nylon',
  'Lace',
  'Organza',
  'Tulle',
  'Crepe',
  'Knit',
  'Jersey',
  'Leather-look material',
  'Faux leather',
  'Mesh',
  'Ribbed fabric',
  'Sequined fabric',
  'Brocade',
];

export const FASHION_PATTERNS = [
  'Plain / Solid colour',
  'Floral',
  'Striped',
  'Checked / Plaid',
  'Polka dots',
  'Geometric',
  'Abstract',
  'Animal print',
  'Paisley',
  'Traditional Indian print',
  'Embroidered',
  'Sequin embellishment',
  'Lace overlay',
  'Color-blocked',
  'Tie-dye',
  'Textured weave',
  'Custom pattern',
];

export const NECKLINE_OPTIONS = [
  'Crew Neck',
  'V-Neck',
  'Sweetheart',
  'Boat Neck',
  'Square Neck',
  'Halter Neck',
  'Off-Shoulder',
  'One-Shoulder',
  'High Neck / Turtleneck',
  'Plunge Neck',
  'Cowl Neck',
  'Collar Neck',
];

export const SLEEVE_OPTIONS = [
  'Sleeveless',
  'Short Sleeves',
  'Elbow Length',
  'Three-Quarter Sleeves',
  'Full Length Sleeves',
  'Cap Sleeves',
  'Puff Sleeves',
  'Bell Sleeves',
  'Bishop Sleeves',
  'Spaghetti Straps',
];

export const WAIST_RISE_OPTIONS = [
  'High-Waisted',
  'Mid-Rise',
  'Low-Rise',
  'Ultra High-Waisted',
];

export const FIT_OPTIONS = [
  'Fitted / Bodycon',
  'Slim Fit',
  'Regular Fit',
  'Relaxed Fit',
  'Oversized / Loose',
  'Tailored / Structured',
  'Flowy / Flare',
];

export const SAREE_DRAPING_STYLES = [
  'Classic Nivi Drape (Traditional Left Shoulder)',
  'Open Pallu / Floating Pallu',
  'Pleated Pallu (Crisp Formal)',
  'Gujarati / Front Pallu',
  'Bengali Traditional Drape',
  'Maharashtrian / Nauvari Style',
  'Contemporary Belted Saree Drape',
  'Pant-Style Modern Saree Drape',
  'Mermaid / Fish-Cut Saree Drape',
];

export const SAREE_PALLU_STYLES = [
  'Heavy Zari Woven Pallu',
  'Floor-Sweeping Long Pallu',
  'Short Pleated Pallu',
  'Scalloped Border Pallu',
  'Tasseled Pallu Edge',
  'Contrasting Brocade Pallu',
];

export const LEHENGA_SILHOUETTES = [
  'Circular / Full Flared Kalidar',
  'A-Line Cut',
  'Mermaid / Fish-Tail Silhouette',
  'Tiered Flared Ghera',
  'Paneled Contemporary Fit',
  'Asymmetrical Modern Cut',
];

export const OCCASION_OPTIONS = [
  'Casual / Everyday',
  'Office / Formal Workwear',
  'Cocktail & Night Out',
  'Wedding & Bridal',
  'Festival & Traditional Celebrations',
  'Vacation & Resort',
  'Gym & Fitness',
  'Lounge & Home',
];

export const SEASON_OPTIONS = [
  'All Seasons',
  'Spring / Summer',
  'Autumn / Fall',
  'Winter',
  'Monsoon / Festive Season',
];
