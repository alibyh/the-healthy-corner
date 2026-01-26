# The Healthy Corner - Project Structure

## 📁 Folder Architecture

```
healthy-corner/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Home page (Menu hub)
│   │   ├── globals.css              # Global styles + Tailwind
│   │   ├── categories/
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Dynamic category pages
│   │   ├── menu/
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Menu item details
│   │   ├── about/
│   │   │   └── page.tsx             # About Us page
│   │   ├── services/
│   │   │   └── page.tsx             # Our Services page
│   │   ├── achievements/
│   │   │   └── page.tsx             # Achievements page
│   │   └── contact/
│   │       └── page.tsx             # Contact / Order page
│   │
│   ├── components/                   # React components
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── Navigation.tsx
│   │   ├── menu/
│   │   │   ├── CategoryCard.tsx     # Menu category card
│   │   │   ├── MenuItemCard.tsx     # Reusable menu item card
│   │   │   ├── MenuItemDetail.tsx   # Item details modal/view
│   │   │   ├── MenuFilter.tsx       # Filter component
│   │   │   ├── MenuSearch.tsx       # Search component
│   │   │   └── NutritionBadge.tsx   # Nutrition display
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Slider.tsx
│   │   │   └── Skeleton.tsx         # Loading skeletons
│   │   └── common/
│   │       ├── Hero.tsx
│   │       ├── ServiceCard.tsx
│   │       └── AchievementCard.tsx
│   │
│   ├── lib/                          # Utilities & configurations
│   │   ├── supabase/
│   │   │   ├── client.ts            # Supabase browser client
│   │   │   ├── server.ts            # Supabase server client
│   │   │   └── types.ts             # Generated types
│   │   ├── utils.ts                  # Helper functions
│   │   └── constants.ts              # App constants
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useMenuItems.ts
│   │   ├── useCategories.ts
│   │   ├── useFavorites.ts
│   │   └── useSearch.ts
│   │
│   ├── types/                        # TypeScript types
│   │   ├── menu.ts
│   │   ├── database.ts
│   │   └── ui.ts
│   │
│   └── styles/                       # Additional styles
│       └── animations.css
│
├── public/                           # Static assets
│   ├── icons/
│   ├── images/
│   └── fonts/
│
├── supabase/                         # Supabase configuration
│   ├── migrations/                   # SQL migrations
│   │   └── 001_initial_schema.sql
│   └── seed/                         # Seed data
│       └── sample_data.sql
│
├── .env.local                        # Environment variables
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎯 Core Components Overview

### Layout Components
- **Header**: Desktop navigation with categories dropdown
- **MobileNav**: Bottom navigation for mobile (Menu, Search, Favorites, Info)
- **Footer**: Contact info, social links

### Menu Components
- **CategoryCard**: Clickable card for menu categories (image + label)
- **MenuItemCard**: Reusable card showing item preview with nutrition
- **MenuItemDetail**: Full item view with all details
- **MenuFilter**: Dynamic filters (calories, protein, vegetarian, etc.)
- **MenuSearch**: Global search functionality
- **NutritionBadge**: Consistent nutrition info display

### UI Components
- **Button**: Reusable button with variants
- **Card**: Base card component
- **Modal**: Reusable modal
- **Skeleton**: Loading states

## 🔑 Key Design Principles

1. **Component Reusability**: Single MenuItemCard used everywhere
2. **Data-Driven**: No hardcoded menu items
3. **Mobile-First**: Responsive design starting from mobile
4. **Performance**: Lazy loading, skeleton states, optimized images
5. **Type Safety**: Full TypeScript coverage
6. **Scalability**: Can handle menu doubling in size

## 🎨 Design System

### Colors (Tailwind Config)
- Primary: Olive green (#6B7F3A)
- Secondary: Warm beige (#E8DCC4)
- Accent: Soft yellow (#F5E6B8)
- Background: Off-white (#FAFAF8)
- Text: Dark gray (#2C2C2C)

### Typography
- Headings: Inter (Google Fonts)
- Body: Inter
- Nutrition labels: Monospace for numbers

### Spacing
- Consistent 4px grid system
- Card padding: 1rem (mobile), 1.5rem (desktop)
- Section gaps: 2rem (mobile), 4rem (desktop)

## 📊 Data Flow

1. **Server Components** (default): Fetch data from Supabase
2. **Client Components**: Interactivity (filters, favorites, modals)
3. **Caching**: Next.js automatic caching + custom hooks
4. **Real-time**: Future capability with Supabase subscriptions

## 🔐 Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Mobile Navigation Structure

Bottom navigation icons:
1. **Home** (Menu icon): Categories grid
2. **Search** (Magnifying glass): Global search
3. **Favorites** (Heart): Saved items (local storage)
4. **Info** (i icon): About/Services/Contact

## 🚀 Development Phases

### Phase 1: Foundation ✓
- Project setup
- Folder structure
- Database schema

### Phase 2: Core Menu System
- Category system
- Menu item cards
- Details view

### Phase 3: Filters & Search
- Dynamic filters
- Search functionality
- Favorites

### Phase 4: Static Pages
- About Us
- Services
- Achievements
- Contact

### Phase 5: Polish
- Performance optimization
- Loading states
- Error handling
- Mobile refinement
