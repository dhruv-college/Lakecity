# Lakecity

# Artisan Marketplace 

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

## 📄 License

MIT License - feel free to use this for your own projects!

---

Built with ❤️ for artisans everywhere
