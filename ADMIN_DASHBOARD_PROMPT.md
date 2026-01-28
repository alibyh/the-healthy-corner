# The Healthy Corner - Admin Dashboard Project Prompt

## Project Overview
Build a comprehensive, production-ready admin dashboard for "The Healthy Corner" restaurant website. This admin panel will manage all content, menu items, categories, services, achievements, and site content for a healthy food restaurant website that's already in production.

## Current Production Website Context
The customer-facing website is built with:
- **Framework**: Next.js 16.1.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Internationalization**: i18next (English and Arabic, with French planned)
- **State Management**: React hooks and local storage for favorites
- **Deployment**: GitHub Pages (static export with basePath: '/the-healthy-corner')

## Database Schema - Complete Structure

### 1. **categories** table
Hierarchical menu categories with parent-child relationships (e.g., "Breakfast" → "3 in 1", "Gourmet & Healthy")

**Fields:**
- `id` (UUID, primary key)
- `name` (VARCHAR 100, required) - Category display name
- `slug` (VARCHAR 100, required, unique) - URL-friendly identifier
- `description` (TEXT, nullable) - Category description
- `parent_id` (UUID, nullable) - Self-reference for hierarchy
- `image_url` (TEXT, nullable) - Category image
- `icon` (VARCHAR 50, nullable) - Icon identifier (e.g., 'sunrise', 'bowl', 'leaf')
- `order_index` (INTEGER, default 0) - Display order
- `is_active` (BOOLEAN, default true) - Visibility toggle
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `updated_at` (TIMESTAMP WITH TIME ZONE)

**Relationships:**
- Self-referencing for parent-child hierarchy
- One-to-many with menu_items

**Existing categories:**
- Breakfast (with subcategories: 3 in 1, Gourmet & Healthy, For Kids)
- The Balanced Plate
- Healthy Toasts
- Soups
- Salads
- Desserts
- Beverages (with subcategories: Juices, Detox, Smoothies, Protein Shakes)
- Caffeine Series (with subcategories: Coffee, Tea)
- Cheat Meals
- Kids Menu

### 2. **menu_items** table
Complete menu items with full nutritional information

**Fields:**
- `id` (UUID, primary key)
- `name` (VARCHAR 150, required) - Item name
- `slug` (VARCHAR 150, required, unique) - URL identifier
- `description` (TEXT, nullable) - Item description
- `category_id` (UUID, required, foreign key → categories)

**Nutritional values:**
- `calories` (INTEGER, nullable) - Kilocalories
- `protein` (DECIMAL 5,1, nullable) - Grams
- `carbs` (DECIMAL 5,1, nullable) - Grams  
- `fats` (DECIMAL 5,1, nullable) - Grams
- `sugar` (DECIMAL 5,1, nullable) - Grams
- `fiber` (DECIMAL 5,1, nullable) - Grams
- `sodium` (INTEGER, nullable) - Milligrams

**Pricing:**
- `price` (DECIMAL 8,2, required)
- `currency` (VARCHAR 3, default 'MRU') - Mauritanian Ouguiya

**Media:**
- `image_url` (TEXT, nullable) - Full image
- `thumbnail_url` (TEXT, nullable) - Optimized thumbnail

**Filters & Flags (all BOOLEAN, default false):**
- `is_vegetarian`
- `is_vegan`
- `is_gluten_free`
- `is_kids_friendly`
- `is_cheat_meal`
- `is_high_protein` (auto-calculated: protein >= 20g)
- `is_low_sugar` (auto-calculated: sugar < 5g)

**Status flags (all BOOLEAN):**
- `is_active` (default true)
- `is_featured` (default false)
- `is_new` (default false)

**Metadata:**
- `preparation_time` (INTEGER, nullable) - Minutes
- `serving_size` (VARCHAR 50, nullable) - e.g., "350g", "500ml"
- `allergen_info` (TEXT, nullable) - Comma-separated or JSON
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `updated_at` (TIMESTAMP WITH TIME ZONE)

**Relationships:**
- Many-to-one with categories
- Many-to-many with ingredients (via menu_item_ingredients)

**Database Triggers:**
- Auto-updates `is_high_protein` when protein >= 20g
- Auto-updates `is_low_sugar` when sugar < 5g
- Auto-updates `updated_at` on any change

### 3. **ingredients** table
Master list of all ingredients for menu items

**Fields:**
- `id` (UUID, primary key)
- `name` (VARCHAR 100, required, unique) - Ingredient name
- `slug` (VARCHAR 100, required, unique) - URL identifier
- `is_allergen` (BOOLEAN, default false) - Allergen flag
- `allergen_type` (VARCHAR 50, nullable) - e.g., "nuts", "dairy", "gluten", "eggs"
- `created_at` (TIMESTAMP WITH TIME ZONE)

**Common ingredients:**
Chicken breast, quinoa, brown rice, avocado, spinach, kale, tomato, cucumber, olive oil, almonds, walnuts, peanut butter, Greek yogurt, mozzarella cheese, eggs, whole wheat bread, oats, banana, berries, honey, stevia, chia seeds, flax seeds, sweet potato

### 4. **menu_item_ingredients** table (Junction table)
Links menu items to their ingredients

**Fields:**
- `id` (UUID, primary key)
- `menu_item_id` (UUID, required, foreign key → menu_items)
- `ingredient_id` (UUID, required, foreign key → ingredients)
- `quantity` (VARCHAR 50, nullable) - e.g., "100g", "2 pieces"
- `created_at` (TIMESTAMP WITH TIME ZONE)

**Constraints:**
- Unique constraint on (menu_item_id, ingredient_id)

### 5. **services** table
Restaurant services offered (dine-in, takeaway, meal plans, etc.)

**Fields:**
- `id` (UUID, primary key)
- `title` (VARCHAR 100, required) - Service name
- `slug` (VARCHAR 100, required, unique)
- `description` (TEXT, nullable) - Service description
- `icon` (VARCHAR 50, nullable) - Icon identifier (e.g., 'utensils', 'shopping-bag', 'calendar')
- `image_url` (TEXT, nullable) - Service image
- `order_index` (INTEGER, default 0) - Display order
- `is_active` (BOOLEAN, default true)
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `updated_at` (TIMESTAMP WITH TIME ZONE)

**Existing services:**
1. Dine-In (icon: 'utensils')
2. Takeaway (icon: 'shopping-bag')
3. Healthy Meal Plans (icon: 'calendar')
4. Sports Nutrition (icon: 'dumbbell')
5. Kids Meals (icon: 'baby')
6. Custom Orders (icon: 'cog')

### 6. **achievements** table
Awards, certifications, partnerships, and milestones

**Fields:**
- `id` (UUID, primary key)
- `title` (VARCHAR 150, required) - Achievement title
- `description` (TEXT, nullable) - Full description
- `achievement_type` (VARCHAR 50, nullable) - Types: "award", "certification", "partnership", "invitation"
- `image_url` (TEXT, nullable) - Achievement image/badge
- `year` (INTEGER, nullable) - Year received
- `date` (DATE, nullable) - Specific date
- `order_index` (INTEGER, default 0) - Display order
- `is_active` (BOOLEAN, default true)
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `updated_at` (TIMESTAMP WITH TIME ZONE)

**Examples:**
- Best Healthy Restaurant 2025 (award, 2025)
- Health & Nutrition Certification (certification, 2024)
- Partnership with FitZone Gym (partnership, 2025)
- Food Safety Excellence Award (award, 2024)

### 7. **site_content** table
CMS for static page content (About Us, Mission, etc.)

**Fields:**
- `id` (UUID, primary key)
- `page_slug` (VARCHAR 50, required) - Page identifier (e.g., "about-us")
- `section_key` (VARCHAR 50, required) - Section identifier (e.g., "hero", "story", "mission", "values")
- `content_type` (VARCHAR 20, required) - Types: "text", "html", "json"
- `content` (TEXT, required) - Actual content
- `metadata` (JSONB, nullable) - Additional flexible data
- `is_active` (BOOLEAN, default true)
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `updated_at` (TIMESTAMP WITH TIME ZONE)

**Constraints:**
- Unique constraint on (page_slug, section_key)

**Existing content:**
- about-us / hero (text)
- about-us / story (text)
- about-us / mission (text)
- about-us / values (json array)

### Database Views
1. **menu_items_with_category** - Menu items joined with category info
2. **menu_items_with_stats** - Menu items with ingredient count

### Row Level Security (RLS)
- Public READ access on all tables (enabled)
- WRITE access requires authentication (to be implemented for admin)

## Admin Dashboard Requirements

### Core Features Required

#### 1. **Dashboard Overview Page**
Display:
- Total categories count (active/inactive)
- Total menu items count (active/inactive/featured/new)
- Total ingredients count
- Total services count (active/inactive)
- Total achievements count (active/inactive)
- Recent activity/changes (last 10 updates)
- Quick stats:
  - Most popular category (by item count)
  - Average calories across menu
  - Vegetarian items percentage
  - High protein items count
- Charts/graphs:
  - Menu items distribution by category (pie chart)
  - Price distribution (histogram)
  - Nutritional breakdown (average macros)
  - Items by dietary flags (bar chart)

#### 2. **Categories Management**
**Features:**
- List view with columns: Name, Slug, Parent Category, Order Index, Item Count, Active Status, Actions
- Create new category with:
  - Name (required)
  - Auto-generate slug from name (editable)
  - Description (rich text editor)
  - Parent category dropdown (optional, for subcategories)
  - Image upload (drag & drop, preview)
  - Icon selector (dropdown with icon previews)
  - Order index (number input)
  - Active toggle
- Edit existing category (same form as create)
- Delete category (with confirmation, check for dependent items)
- Bulk actions: Activate, Deactivate, Delete
- Drag-and-drop reordering for order_index
- Tree view showing parent-child hierarchy
- Search/filter by name, slug, active status
- Pagination (20 items per page)
- Sort by: name, order_index, created_at, item count

#### 3. **Menu Items Management**
**Features:**
- List view with columns: Image, Name, Category, Price, Calories, Protein, Status Flags, Active, Actions
- Advanced filters:
  - Category (multi-select)
  - Price range (slider)
  - Calorie range (slider)
  - Dietary flags (checkboxes: vegetarian, vegan, gluten-free, etc.)
  - Active/inactive
  - Featured/new
- Create new menu item with multi-step form:
  
  **Step 1: Basic Info**
  - Name (required)
  - Auto-generate slug (editable)
  - Description (rich text editor)
  - Category (dropdown with hierarchy)
  - Preparation time (number, minutes)
  - Serving size (text input)

  **Step 2: Pricing**
  - Price (number, required)
  - Currency (dropdown, default MRU)

  **Step 3: Nutrition**
  - Calories (number)
  - Protein (decimal)
  - Carbs (decimal)
  - Fats (decimal)
  - Sugar (decimal)
  - Fiber (decimal)
  - Sodium (number, mg)
  - Auto-calculate and show:
    - Total macros
    - Macro percentages
    - Is high protein? (protein >= 20g)
    - Is low sugar? (sugar < 5g)

  **Step 4: Images**
  - Main image upload (drag & drop)
  - Auto-generate thumbnail option
  - Image preview
  - Alt text

  **Step 5: Dietary Flags**
  - Checkboxes for:
    - Vegetarian
    - Vegan
    - Gluten-free
    - Kids friendly
    - Cheat meal
  - High protein (auto-calculated, display only)
  - Low sugar (auto-calculated, display only)

  **Step 6: Ingredients**
  - Multi-select ingredient picker
  - Add ingredient quantities
  - Quick add new ingredient inline
  - Show allergen warnings automatically

  **Step 7: Status & Metadata**
  - Active toggle
  - Featured toggle
  - New toggle
  - Allergen info (text area)

- Edit existing item (same form)
- Duplicate item (copy with new slug)
- Delete item (confirmation required)
- Bulk actions: Activate, Deactivate, Delete, Mark as Featured
- Quick edit mode (inline editing for price, status)
- Export to CSV/Excel
- Import from CSV (with validation)
- Search by: name, description, ingredients
- Advanced sorting: name, price, calories, protein, created date

#### 4. **Ingredients Management**
**Features:**
- List view: Name, Slug, Is Allergen, Allergen Type, Used In (count), Actions
- Create ingredient:
  - Name (required)
  - Auto-generate slug
  - Is allergen toggle
  - Allergen type (dropdown: nuts, dairy, gluten, eggs, shellfish, soy, other)
- Edit ingredient
- Delete ingredient (check if used in menu items first, show warning)
- Bulk operations
- Show which menu items use each ingredient
- Search and filter
- Mark as allergen/non-allergen in bulk

#### 5. **Services Management**
**Features:**
- Grid/list view of services
- Create service:
  - Title (required)
  - Auto-generate slug
  - Description (rich text)
  - Icon selector (visual picker with preview)
  - Image upload
  - Order index
  - Active toggle
- Edit service
- Delete service (confirmation)
- Drag-and-drop reordering
- Preview how it looks on customer site

#### 6. **Achievements Management**
**Features:**
- List view with timeline visualization
- Create achievement:
  - Title (required)
  - Description (rich text)
  - Achievement type (dropdown: award, certification, partnership, invitation)
  - Year (number)
  - Specific date (date picker, optional)
  - Image upload (for badges/certificates)
  - Order index
  - Active toggle
- Edit achievement
- Delete achievement
- Filter by type, year
- Sort by year (newest first)
- Timeline view showing achievements chronologically

#### 7. **Site Content Management (CMS)**
**Features:**
- Page-based editor
- List of pages: About Us, Mission, Values, etc.
- For each page, manage sections (hero, story, mission, values, etc.)
- Content types:
  - **Text**: Rich text editor with formatting
  - **HTML**: Code editor with syntax highlighting
  - **JSON**: JSON editor with validation (for arrays like values)
- Create new content section:
  - Page slug (dropdown or text)
  - Section key
  - Content type (radio buttons)
  - Content editor (changes based on type)
  - Metadata (JSON editor)
  - Active toggle
- Edit section
- Delete section
- Preview content
- Version history (if possible)

#### 8. **Media Library/Manager**
**Features:**
- Central media library for all uploaded images
- Grid view with thumbnails
- Upload multiple images at once
- Image details: filename, size, dimensions, upload date, used in (items/categories)
- Image optimization on upload
- Generate thumbnails automatically
- Delete images (with warning if used)
- Search images by filename
- Filter by: used/unused, upload date, type
- Copy image URL
- Replace image feature

#### 9. **Settings Page**
**Features:**
- Restaurant information:
  - Restaurant name
  - Contact phone
  - WhatsApp number
  - Email
  - Address
  - Google Maps link
  - Business hours
- Social media links:
  - Facebook
  - Instagram
  - Snapchat
  - WhatsApp
- Currency settings
- Default values (default calorie range, price range)
- Supabase connection status

#### 10. **User Management (Admin)**
**Features:**
- Admin user accounts
- Roles: Super Admin, Admin, Editor (view-only)
- Create admin user
- Edit admin permissions
- Deactivate admin
- Activity log per admin
- Password reset

## Technical Requirements

### Tech Stack
**Must use:**
- **Framework**: Next.js 16+ (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 (same version as main site)
- **Database**: Supabase (use existing database connection)
- **Authentication**: Supabase Auth for admin login
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Rich Text Editor**: Tiptap or Lexical
- **Icons**: Lucide React
- **Charts**: Recharts or Chart.js
- **File Upload**: Supabase Storage
- **Toast Notifications**: Sonner or React Hot Toast
- **Tables**: TanStack Table (React Table v8) with sorting, filtering, pagination
- **Drag & Drop**: dnd-kit

### Project Structure
```
healthy-corner-admin/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx              # Overview
│   │   │   ├── categories/
│   │   │   │   ├── page.tsx              # List
│   │   │   │   ├── create/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx
│   │   │   ├── menu-items/
│   │   │   │   ├── page.tsx              # List
│   │   │   │   ├── create/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx
│   │   │   ├── ingredients/
│   │   │   │   ├── page.tsx
│   │   │   │   └── create/
│   │   │   ├── services/
│   │   │   │   ├── page.tsx
│   │   │   │   └── create/
│   │   │   ├── achievements/
│   │   │   │   ├── page.tsx
│   │   │   │   └── create/
│   │   │   ├── content/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [page]/
│   │   │   │       └── page.tsx
│   │   │   ├── media/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx            # Sidebar + header
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   └── PageHeader.tsx
│   │   ├── forms/
│   │   │   ├── CategoryForm.tsx
│   │   │   ├── MenuItemForm.tsx
│   │   │   ├── IngredientForm.tsx
│   │   │   ├── ServiceForm.tsx
│   │   │   ├── AchievementForm.tsx
│   │   │   └── ContentForm.tsx
│   │   ├── tables/
│   │   │   ├── CategoriesTable.tsx
│   │   │   ├── MenuItemsTable.tsx
│   │   │   ├── IngredientsTable.tsx
│   │   │   └── DataTable.tsx          # Generic table component
│   │   ├── dashboard/
│   │   │   ├── StatsCard.tsx
│   │   │   ├── RecentActivity.tsx
│   │   │   └── Charts.tsx
│   │   ├── media/
│   │   │   ├── MediaGrid.tsx
│   │   │   ├── ImageUploader.tsx
│   │   │   └── ImagePreview.tsx
│   │   ├── ui/                        # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   └── ... (all shadcn components)
│   │   └── common/
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── ConfirmDialog.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── admin.ts            # Admin-specific queries
│   │   ├── validations/            # Zod schemas
│   │   │   ├── category.ts
│   │   │   ├── menu-item.ts
│   │   │   ├── ingredient.ts
│   │   │   └── ...
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── api/                    # Server actions
│   │       ├── categories.ts
│   │       ├── menu-items.ts
│   │       └── ...
│   │
│   ├── hooks/
│   │   ├── useCategories.ts
│   │   ├── useMenuItems.ts
│   │   ├── useIngredients.ts
│   │   ├── useToast.ts
│   │   └── useUpload.ts
│   │
│   └── types/
│       ├── database.ts             # Same as main site
│       ├── forms.ts
│       └── api.ts
│
├── public/
├── .env.local
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

### Authentication Flow
1. Login page at `/login`
2. Protected routes using middleware
3. Supabase Auth with email/password
4. Role-based access control (RBAC)
5. Session management
6. Logout functionality
7. Password reset flow

### UI/UX Requirements

#### Design System
**Use the same colors from the main site:**
- Primary: `#4F6D44` (Sage/Olive) - `hsl(104 29% 35%)`
- Secondary: `#FDFBF7` (Cream) - `hsl(38 44% 96%)`
- Accent: `#D17A22` (Terracotta) - `hsl(30 71% 47%)`
- Background: White
- Surface: `#FAFAFA` (Soft gray)
- Text colors: Dark gray hierarchy

**Typography:**
- Same fonts: Style Script (brand), Outfit (headings), Inter (body)

#### Layout
- **Sidebar navigation** (collapsible on mobile):
  - Dashboard (icon: dashboard)
  - Categories (icon: folder)
  - Menu Items (icon: utensils)
  - Ingredients (icon: package)
  - Services (icon: briefcase)
  - Achievements (icon: award)
  - Site Content (icon: file-text)
  - Media Library (icon: image)
  - Settings (icon: settings)
  - Logout (icon: log-out)
- **Top bar**:
  - Breadcrumbs
  - Quick search (global)
  - Notifications bell
  - User profile dropdown
- **Main content area**:
  - Page header with title and actions
  - Content area
  - Responsive design (desktop-first for admin)

#### Component Guidelines
- Use shadcn/ui components for consistency
- All forms must have validation (Zod schemas)
- Loading states for all async operations
- Error states with helpful messages
- Success toasts for actions
- Confirmation dialogs for destructive actions
- Keyboard shortcuts for common actions
- Responsive tables (horizontal scroll on mobile)
- Dark mode support (optional but nice to have)

### Form Validation Rules

#### Categories
- Name: 2-100 characters, required
- Slug: lowercase, hyphens only, unique
- Description: max 500 characters
- Icon: must match predefined icon list
- Order index: positive integer

#### Menu Items
- Name: 2-150 characters, required
- Slug: unique, auto-generated
- Description: max 1000 characters
- Price: positive number, max 2 decimals, required
- Calories: 0-2000
- Protein: 0-200g, 1 decimal
- Carbs: 0-200g, 1 decimal
- Fats: 0-100g, 1 decimal
- Sugar: 0-100g, 1 decimal
- Fiber: 0-50g, 1 decimal
- Sodium: 0-5000mg
- Serving size: max 50 characters
- Allergen info: max 500 characters

#### Ingredients
- Name: 2-100 characters, required, unique
- Slug: unique, auto-generated
- Allergen type: required if is_allergen is true

### Image Upload Requirements
- **Supabase Storage** bucket: `menu-images`
- Accepted formats: JPEG, PNG, WebP
- Max file size: 5MB
- Auto-optimization:
  - Resize to max 1200px width (maintain aspect ratio)
  - Generate thumbnail: 400px width
  - Compress to 85% quality
- File naming: `{timestamp}-{slug}.{ext}`
- Store in folders: `categories/`, `menu-items/`, `services/`, `achievements/`

### API/Server Actions
Create server actions for all operations:
- `createCategory`, `updateCategory`, `deleteCategory`, `reorderCategories`
- `createMenuItem`, `updateMenuItem`, `deleteMenuItem`, `duplicateMenuItem`, `bulkUpdateMenuItems`
- `createIngredient`, `updateIngredient`, `deleteIngredient`
- `createService`, `updateService`, `deleteService`, `reorderServices`
- `createAchievement`, `updateAchievement`, `deleteAchievement`
- `updateSiteContent`, `createSiteContent`, `deleteSiteContent`
- `uploadImage`, `deleteImage`, `optimizeImage`

### Data Relationships to Handle

1. **Categories → Menu Items**
   - When deleting category, show count of items that will be affected
   - Option to reassign items to another category OR cascade delete

2. **Menu Items ↔ Ingredients**
   - Many-to-many relationship via junction table
   - When deleting ingredient, show which menu items use it
   - Option to remove from all items before deleting

3. **Parent-Child Categories**
   - Tree view/hierarchy display
   - Cannot delete parent if children exist (or cascade)
   - Cannot set category as its own parent
   - Prevent circular references

### Required Features Per Page

#### Dashboard Page
- Welcome message with admin name
- Key metrics in cards (total categories, items, etc.)
- Activity feed (recent changes)
- Quick actions (Add Menu Item, Add Category)
- Charts showing data distribution

#### All List Pages
- Search bar
- Filters (specific to entity)
- Bulk action toolbar
- Create button (top-right)
- Table with sortable columns
- Pagination (page size selector: 10, 20, 50, 100)
- Export button
- Column visibility toggle

#### All Create/Edit Pages
- Multi-step form for complex entities (menu items)
- Auto-save draft functionality
- Cancel button (with unsaved changes warning)
- Save button
- Save & Add Another button
- Preview button (shows how it looks on customer site)
- Delete button (on edit page only)
- Form validation with error messages
- Required field indicators

### Security & Permissions

#### Row Level Security (RLS) Policies
For admin operations, update RLS policies:
```sql
-- Admin write policies (requires auth.uid())
CREATE POLICY "Admin can insert" ON categories FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can update" ON categories FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete" ON categories FOR DELETE 
  USING (auth.role() = 'authenticated');
```
Apply similar policies to all tables.

#### Authentication
- Email/password login
- Session timeout: 24 hours
- Remember me option
- Secure password requirements (min 8 chars, uppercase, number, special char)
- Failed login attempt tracking
- Account lockout after 5 failed attempts

### Error Handling
- Global error boundary
- Specific error messages for:
  - Network errors
  - Database errors (unique constraint, foreign key, etc.)
  - Validation errors
  - Permission errors
  - Image upload errors
- Retry mechanisms for failed operations
- Rollback on failed transactions

### Performance Considerations
- Pagination for large datasets
- Lazy loading for images
- Optimistic updates for better UX
- Debounced search inputs
- Cached queries where appropriate
- Skeleton loaders for all async content
- Virtual scrolling for very large lists

### Data Validation & Constraints

#### Slug Generation
- Auto-generate from name: lowercase, spaces to hyphens, remove special chars
- Ensure uniqueness (append number if exists)
- Allow manual editing
- Validate format: /^[a-z0-9-]+$/

#### Unique Constraints
- Category slugs must be unique
- Menu item slugs must be unique
- Ingredient names must be unique
- Service slugs must be unique
- Site content (page_slug + section_key) must be unique

#### Foreign Key Handling
- Show friendly error when deleting category with items
- Prevent orphaned records
- Cascade deletes where appropriate
- Nullify references where needed

### Nice-to-Have Features
1. **Activity Log**: Track all changes (who, what, when)
2. **Undo/Redo**: For recent changes
3. **Keyboard Shortcuts**: Quick navigation and actions
4. **Multi-language Support**: Admin panel in English/Arabic
5. **Export/Import**: Backup and restore data
6. **Bulk Upload**: CSV import for menu items
7. **Image Editor**: Basic crop/resize in-app
8. **Preview Mode**: See changes before publishing
9. **Draft System**: Save items as draft before publishing
10. **Analytics**: Track most viewed items, popular categories
11. **Mobile App**: Progressive Web App (PWA) support
12. **Offline Mode**: Queue changes when offline
13. **Collaboration**: Multiple admins, see who's editing what
14. **Notifications**: Email on important events
15. **API Documentation**: For future integrations

### Environment Variables Needed
```
# Supabase (SAME as main website)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # For admin operations

# Admin Auth
NEXTAUTH_SECRET=random_secret_string
NEXTAUTH_URL=http://localhost:3000

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Initial Setup Steps
1. Create new Next.js project with TypeScript
2. Install all required dependencies
3. Set up Supabase client (connect to existing database)
4. Configure Tailwind CSS with same theme
5. Install and configure shadcn/ui
6. Set up authentication with Supabase Auth
7. Create protected route middleware
8. Build sidebar layout
9. Implement login page
10. Start with dashboard overview page

### Testing Requirements
- Form validation testing
- CRUD operations testing
- File upload testing
- Authentication flow testing
- Error handling testing
- Responsive design testing

### Deployment Considerations
- Environment variables setup
- Build optimization
- Error logging (Sentry or similar)
- Analytics (optional)
- Admin subdomain or path (/admin)

## Important Notes

1. **Same Database**: This admin panel connects to the SAME Supabase database as the customer-facing website
2. **Real-time Updates**: Changes made in admin should reflect immediately on the customer site
3. **Image Paths**: Use Supabase Storage public URLs
4. **Slug Consistency**: Slugs in admin must match what's used in customer site URLs
5. **Nutrition Auto-Calculation**: Respect the database triggers for is_high_protein and is_low_sugar
6. **Hierarchical Categories**: Handle parent-child relationships carefully
7. **Icon Mapping**: Icons in categories must match the icon mapping used in customer site
8. **Currency**: Default is MRU (Mauritanian Ouguiya)
9. **Timestamps**: All timestamps are UTC
10. **Soft Deletes**: Use is_active toggle, avoid hard deletes where possible

## Success Criteria
The admin dashboard is complete when:
- ✅ All CRUD operations work for all 7 tables
- ✅ Authentication prevents unauthorized access
- ✅ Images can be uploaded to Supabase Storage
- ✅ Forms have complete validation
- ✅ Tables support search, filter, sort, pagination
- ✅ Bulk operations work correctly
- ✅ Error handling is comprehensive
- ✅ UI is responsive and polished
- ✅ Changes reflect immediately on customer site
- ✅ Data integrity is maintained (foreign keys, constraints)
- ✅ Loading and error states are handled
- ✅ Admin can manage all content without touching database

## Design Inspiration
- Look at: Strapi, WordPress Admin, Shopify Admin, Webflow
- Clean, modern, minimalist design
- Focus on productivity and ease of use
- Clear visual hierarchy
- Consistent spacing and colors
- Professional and polished

## Priority Order
1. Authentication and login
2. Dashboard overview
3. Menu Items management (most important)
4. Categories management
5. Ingredients management
6. Services management
7. Achievements management
8. Site Content CMS
9. Media library
10. Settings
11. User management

Build this step by step, ensuring each section is fully functional before moving to the next. Use TypeScript strictly, validate all inputs, handle all errors gracefully, and create a production-ready admin panel that can manage a growing restaurant business.
