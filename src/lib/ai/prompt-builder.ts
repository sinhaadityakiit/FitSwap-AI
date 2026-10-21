import { OutfitSpecification } from '../../types/outfit';

export function buildOutfitPrompt(outfit: OutfitSpecification): string {
  const layerDescriptions: string[] = [];

  // Sort layers into realistic dressing order
  const orderRank: Record<string, number> = {
    underwear: 1,
    bra: 2,
    base: 3,
    bottom: 4,
    top: 5,
    dress: 6,
    'ethnic-outfit': 7,
    outerwear: 8,
    footwear: 9,
    accessory: 10,
  };

  const sortedLayers = [...outfit.layers]
    .filter((l) => l.isVisible)
    .sort((a, b) => (orderRank[a.layerType] || 5) - (orderRank[b.layerType] || 5));

  for (const layer of sortedLayers) {
    const { garment, customization } = layer;
    const parts: string[] = [];

    // Color & Fabric
    if (customization.color) {
      parts.push(customization.color.toLowerCase());
    }
    if (customization.fabric) {
      parts.push(customization.fabric.toLowerCase());
    }

    // Pattern
    if (customization.pattern && customization.pattern !== 'Plain / Solid colour') {
      parts.push(`with ${customization.pattern.toLowerCase()}`);
    }

    // Name
    parts.push(garment.name.toLowerCase());

    // Fit & Silhouette
    if (customization.fit) {
      parts.push(`(${customization.fit.toLowerCase()})`);
    }
    if (customization.neckline) {
      parts.push(`with ${customization.neckline.toLowerCase()}`);
    }
    if (customization.sleeveLength) {
      parts.push(`and ${customization.sleeveLength.toLowerCase()}`);
    }
    if (customization.waistRise) {
      parts.push(`at ${customization.waistRise.toLowerCase()}`);
    }

    // Ethnic specifics (Sarees & Lehengas)
    if (customization.drapingStyle) {
      parts.push(`draped in ${customization.drapingStyle}`);
    }
    if (customization.borderDesign) {
      parts.push(`featuring ${customization.borderDesign}`);
    }
    if (customization.palluStyle) {
      parts.push(`with ${customization.palluStyle}`);
    }
    if (customization.blouseStyle) {
      parts.push(`paired with ${customization.blouseStyle}`);
    }

    layerDescriptions.push(parts.join(' '));
  }

  let prompt = `Photo-realistic fashion modification of the provided photograph:`;

  if (layerDescriptions.length > 0) {
    prompt += `\n- Replace existing garments with this unified outfit ensemble: ${layerDescriptions.join('; ')}.`;
  }

  if (outfit.customPromptDescription && outfit.customPromptDescription.trim().length > 0) {
    prompt += `\n- Additional outfit details requested by user: "${outfit.customPromptDescription.trim()}".`;
  }

  if (outfit.globalOccasion) {
    prompt += `\n- Styling context: ${outfit.globalOccasion}.`;
  }

  prompt += `\n\nCRITICAL CONSTRAINTS FOR IMAGE-EDITING:
1. Preserve the person's exact face, facial features, eyes, nose, lips, smile, and identity without alteration.
2. Maintain identical pose, stance, body proportions, arm and leg positioning.
3. Preserve original hair texture, hairstyle, hair color, and skin tone.
4. Keep the original room background, lighting direction, ambient color temperature, and camera perspective intact.
5. Accurately cast natural fabric shadows, realistic cloth draping, seam lines, and specular highlights that match original scene lighting.
6. Absolutely no nudity, no partial undressed intermediate states, and no distortion of body contours.
7. Ultra high-resolution 8k commercial fashion editorial quality.`;

  return prompt;
}
