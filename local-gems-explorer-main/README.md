# Artisan Marketplace MVP

An AI-powered marketplace connecting local artisans with travelers and craft enthusiasts worldwide. This MVP focuses on storytelling and authentic craft discovery.

## 🌟 Features

- **Landing Page**: Hero section with clear value proposition and CTAs
- **Product Feed**: Filterable grid of artisan products with AI-generated captions
- **Product Detail**: Full story, pricing, and origin map for each product
- **Artisan Dashboard**: Add products with AI caption generation
- **Location Discovery**: Interactive map showing artisan locations worldwide
- **Multilingual Support**: English and Spanish (mock translations)

## 🛠️ Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context
- **Routing**: React Router DOM
- **Maps**: Google Maps Embed API
- **AI**: Mocked responses (ready for OpenAI/Claude integration)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd artisan-marketplace

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
bun run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navbar.tsx      # Navigation with language selector
│   ├── Hero.tsx        # Landing page hero section
│   ├── ProductCard.tsx # Product grid card
│   ├── MapEmbed.tsx    # Google Maps integration
│   └── Footer.tsx      # Site footer
├── context/            # React Context providers
│   ├── LanguageContext.tsx  # Multilingual support
│   └── ProductContext.tsx   # Product state management
├── data/
│   └── mockData.ts     # Sample products & AI mock functions
├── pages/              # Route pages
│   ├── Index.tsx       # Landing page
│   ├── ProductFeed.tsx # All products grid
│   ├── ProductDetail.tsx # Single product view
│   ├── ArtisanDashboard.tsx # Add product form
│   └── MapPage.tsx     # Location discovery
└── App.tsx             # Root component with routing
```

## 🔌 API Integration Points

### AI Caption Generation
Location: `src/data/mockData.ts` → `generateAICaption()`

```typescript
// TODO: Replace with actual AI API call
export const generateAICaption = async (productName: string, story: string): Promise<string> => {
  // Current: Returns mocked captions
  // Production: Call OpenAI/Claude API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Generate a short, engaging caption for an artisan product...'
        },
        {
          role: 'user',
          content: `Product: ${productName}\nStory: ${story}`
        }
      ]
    })
  });
  // ...
};
```

### Firebase Integration
Location: `src/context/ProductContext.tsx`

```typescript
// TODO: Replace local state with Firestore
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

const addProduct = async (product: Product) => {
  await addDoc(collection(db, 'products'), product);
};
```

### Google Maps
Location: `src/components/MapEmbed.tsx`

Current implementation uses Google Maps Embed API (free, limited).
For interactive pins, upgrade to Google Maps JavaScript API.

## 🌐 Deploying to GitHub Pages

1. **Update `vite.config.ts`**:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
});
```

2. **Build and deploy**:
```bash
npm run build
# The 'dist' folder contains your static site
```

3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/docs` (or use GitHub Actions)

### Using GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🔒 Environment Variables

For production, create a `.env` file:

```env
# AI API (when ready)
VITE_OPENAI_API_KEY=your-key-here

# Firebase (optional)
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id

# Google Maps (for JavaScript API)
VITE_GOOGLE_MAPS_API_KEY=your-key
```

## 📝 Future Enhancements

- [ ] Firebase Authentication
- [ ] Real AI caption generation (OpenAI/Claude)
- [ ] Image upload to Firebase Storage
- [ ] Interactive map with clustering
- [ ] Search with filters
- [ ] Artisan profiles
- [ ] Messaging system
- [ ] Payment integration (Stripe)

## 📄 License

MIT License - feel free to use this for your own projects!

---

Built with ❤️ for artisans everywhere
