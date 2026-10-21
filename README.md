# FitSwap AI — AI-Powered Virtual Dressing Room

> **"Your Style. Your Choice. Your Virtual Wardrobe."**

**FitSwap AI** is a modern, responsive, high-fidelity AI fashion web application that allows users to upload a photo and virtually try on hundreds of clothing styles with AI image editing. It preserves the person's face, identity, hair, pose, lighting, and background while replacing selected clothing items with authentic fabrics, drapes, and colors.

![FitSwap AI Demonstration Banner](https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

1. **Dedicated 3-Panel Virtual Dressing Room (`/try-on`)**
   - **Left Panel:** Searchable clothing catalogue with 24 categories and 490+ individually selectable garments.
   - **Center Panel (Virtual Mirror):** High-resolution photo preview, interactive draggable Before/After comparison slider, download button, undo last change, and reset to original.
   - **Right Panel (Layered Outfit Builder):** Stack multi-piece outfits (e.g. Bra + Top + Jeans + Blazer + Footwear), customize colors (26 swatches + custom hex), fabrics, patterns (18 options), necklines, sleeves, waist rise, saree drape styles, lehenga silhouettes, and free-form "Describe Your Outfit" prompts.

2. **Complete Female Clothing Catalogue (Categories A through X)**
   - **Category A:** Underwear & Panties (23 types: briefs, bikinis, thongs, seamless, shaping, etc.)
   - **Category B:** Bras (26 types: t-shirt, push-up, plunge, balconette, wireless, sports, etc.)
   - **Category C:** Camisoles, Slips & Base Layers (14 types: bodysuits, shaping wear, etc.)
   - **Category D:** Tops (27 types: crop tops, off-shoulder, halter, tunics, corset tops, etc.)
   - **Category E:** Shirts & Blouses (22 types: silk blouses, Oxford shirts, chiffon, etc.)
   - **Category F:** Dresses (35 types: A-line, bodycon, wrap, evening gowns, maxi, cocktail, etc.)
   - **Category G:** Skirts (23 types: pleated, pencil, denim, leather-look, mermaid, etc.)
   - **Category H:** Jeans (23 types: straight-leg, wide-leg, flared, mom, boyfriend, etc.)
   - **Category I:** Trousers & Pants (26 types: tailored, palazzos, cargo, cigarette, joggers, etc.)
   - **Category J:** Shorts (13 types: denim, high-waisted, cycling, tailored, etc.)
   - **Category K:** Jumpsuits & Rompers (14 types: wide-leg, utility, denim, etc.)
   - **Category L:** Sarees (25 traditional & designer sarees: Banarasi, Kanjivaram, Chanderi, Georgette, Organza with specific draping, pallu, and border controls)
   - **Category M:** Saree Blouses (17 types: boat neck, backless, brocade, velvet, etc.)
   - **Category N:** Lehengas (16 types: bridal, circular, mirror-work, velvet with flair controls)
   - **Category O:** Salwar Suits & Kurtas (25 types: Anarkali, Patiala, Sharara, Gharara, etc.)
   - **Category P:** Party & Evening Wear (16 types: sequin gowns, velvet, wedding guest, etc.)
   - **Category Q:** Sportswear & Activewear (18 types: gym leggings, sports bras, tracksuits, etc.)
   - **Category R:** Nightwear & Loungewear (18 types: satin pajamas, robes, sleep shirts, etc.)
   - **Category S:** Swimwear & Beachwear (15 types: one-piece, bikinis, cover-ups, kaftans, etc.)
   - **Category T:** Jackets & Coats (21 types: blazers, trench coats, leather-look, puffers, etc.)
   - **Category U:** Sweaters & Knitwear (14 types: turtlenecks, cable-knit, cardigans, etc.)
   - **Category V:** Co-ord Sets (12 types: blazer sets, matching lounge sets, etc.)
   - **Category W:** Footwear (21 types: sneakers, high heels, ankle boots, juttis, etc.)
   - **Category X:** Accessories (22 types: handbags, belts, jewelry, scarves, etc.)

3. **Multi-Model AI Provider Adapter Architecture**
   - Pluggable interface (`FitSwapAIProvider`) with support for:
     - **Google Gemini 2.5 Flash / Imagen 3 API** (`gemini-adapter.ts`)
     - **Fal.ai IDM-VTON / CatVTON** (`fal-adapter.ts`)
     - **Replicate IDM-VTON** (`replicate-adapter.ts`)
     - **Testing Sandbox Simulation** (`testing-adapter.ts`) with clear watermark `[TESTING MODE DEMO]` to prevent deception.

4. **Testing Mode Suite (`/test-suite`)**
   - Built-in test runner validating:
     - Upload format validation (JPEG, PNG, WebP) and 15MB size ceiling
     - Catalogue integrity across all 24 categories
     - Layered outfit state mutations
     - Structured prompt compiler with facial lock constraints
     - AI API health status
     - Before/After comparison math and touch interactions
     - Download pipeline and PNG export.

5. **My Creations Session Gallery (`/creations`)**
   - View recent outfit generations saved locally in browser storage.
   - Interactive Before/After slider modal.
   - One-click high-resolution download.
   - Deletion and privacy controls.

6. **Privacy & Ethical Safeguards (`/privacy`)**
   - Ephemeral photo processing in memory.
   - Strict prohibition of non-consensual imagery, synthetic nudity, or minor sexualization.
   - Zero training on user photographs.
   - Server-side environment key protection.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Dark Luxury Fashion Palette)
- **Icons:** Optimized SVG Icon System
- **State Management:** React Hooks & Browser Session Storage
- **AI Integrations:** Google Gemini API, Fal.ai, Replicate

---

## 🚀 Getting Started

### 1. Set Workspace
Open this directory in your terminal or IDE:
```bash
cd C:\Users\KIIT\.gemini\antigravity\scratch\fitswap-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` to configure your preferred AI provider:
```env
NEXT_PUBLIC_TESTING_MODE=true
FITSWAP_AI_PROVIDER=testing

# Optional: Add your real API key for live neural image generation:
GEMINI_API_KEY=your_gemini_api_key_here
FAL_KEY=your_fal_key_here
REPLICATE_API_TOKEN=your_replicate_token_here
```

> **Note:** If no API key is provided, the app runs in **Testing Mode**, simulating generation with full UI responsiveness, comparison sliders, and download functionality without failing or throwing unhandled errors!

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run Automated Tests
```bash
npm test
```
Or open [http://localhost:3000/test-suite](http://localhost:3000/test-suite) for the interactive visual test runner.

---

## 📁 Project Architecture

```
fitswap-ai/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Luxury landing page (matches mockup design)
│   │   ├── layout.tsx             # Root layout with Navbar, Footer & Testing Banner
│   │   ├── globals.css            # Tailwind directives, glowing neons, slider styles
│   │   ├── try-on/page.tsx        # 3-Panel Virtual Dressing Room workspace
│   │   ├── explore/page.tsx       # 24-category full catalogue explorer
│   │   ├── creations/page.tsx     # My Creations gallery with compare slider & download
│   │   ├── how-it-works/page.tsx  # Photography advice & AI inpainting explanation
│   │   ├── privacy/page.tsx       # Ephemeral processing & ethical AI policies
│   │   ├── test-suite/page.tsx    # Live interactive test runner
│   │   └── api/
│   │       ├── try-on/route.ts    # AI Virtual try-on API endpoint
│   │       ├── validate-image/route.ts # File format & dimension validation
│   │       └── health/route.ts    # Health & provider readiness diagnostic
│   ├── components/
│   │   ├── common/                # ColorPicker, FabricSelector, PatternSelector, Icons
│   │   ├── home/                  # HeroSection, CategoryCarousel, HowItWorksPreview, ClothingTypeGrid, TrustSection
│   │   ├── layout/                # Navbar, Footer, TestingModeBanner
│   │   └── try-on/                # LeftPanelCatalogue, CenterPanelPreview, RightPanelCustomizer, BeforeAfterSlider, ImageUploader, OutfitLayersList
│   ├── data/
│   │   ├── catalogue.ts           # 490+ garments across categories A-X
│   │   ├── categories.ts          # Category metadata, icons & descriptions
│   │   ├── customization-options.ts # 26 colors, 24 fabrics, 18 patterns, fits, draping styles
│   │   └── demo-models.ts         # Demonstration models for instant zero-friction testing
│   ├── lib/
│   │   ├── ai/                    # Provider adapters (Gemini, Fal, Replicate, Testing) & prompt builder
│   │   ├── storage/               # Browser storage helpers for creations
│   │   └── validation/            # Image format, size, and dimension validators
│   └── types/                     # TypeScript declarations for catalogue, outfit, try-on
├── scripts/
│   └── run-tests.js               # CLI automated test suite
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 🔒 Security & Privacy Notice
FitSwap AI is strictly designed for consensual personal styling and virtual fashion previewing. Automated safeguards ensure that uploaded photos are not used for generative foundation model training, intermediate undressed states are never created, and requests violating content policies are blocked.

---

## © License
FitSwap AI is released for evaluation and testing. All trademarks and fashion demonstration imagery remain the property of their respective owners.
