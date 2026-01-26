-- =====================================================
-- THE HEALTHY CORNER - SUPABASE DATABASE SCHEMA
-- =====================================================
-- This schema is designed for scalability and data integrity
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: categories
-- Purpose: Hierarchical menu categories (parent-child relationship)
-- =====================================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    image_url TEXT,
    icon VARCHAR(50), -- Icon name for UI
    order_index INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster querying
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);

-- =====================================================
-- TABLE: menu_items
-- Purpose: All menu items with nutritional information
-- =====================================================
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    description TEXT,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    
    -- Nutritional values
    calories INTEGER, -- kcal
    protein DECIMAL(5,1), -- grams
    carbs DECIMAL(5,1), -- grams
    fats DECIMAL(5,1), -- grams
    sugar DECIMAL(5,1), -- grams (for low sugar filter)
    fiber DECIMAL(5,1), -- grams
    sodium INTEGER, -- mg
    
    -- Pricing
    price DECIMAL(8,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'MRU', -- Mauritanian Ouguiya or your currency
    
    -- Media
    image_url TEXT,
    thumbnail_url TEXT, -- Optimized smaller image
    
    -- Filters & flags
    is_vegetarian BOOLEAN DEFAULT false,
    is_vegan BOOLEAN DEFAULT false,
    is_gluten_free BOOLEAN DEFAULT false,
    is_kids_friendly BOOLEAN DEFAULT false,
    is_cheat_meal BOOLEAN DEFAULT false,
    is_high_protein BOOLEAN DEFAULT false, -- Auto-calculated or manual
    is_low_sugar BOOLEAN DEFAULT false,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    
    -- Metadata
    preparation_time INTEGER, -- minutes
    serving_size VARCHAR(50), -- e.g., "350g", "500ml"
    allergen_info TEXT, -- Comma-separated or JSON
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_slug ON menu_items(slug);
CREATE INDEX idx_menu_items_active ON menu_items(is_active);
CREATE INDEX idx_menu_items_vegetarian ON menu_items(is_vegetarian);
CREATE INDEX idx_menu_items_price ON menu_items(price);
CREATE INDEX idx_menu_items_calories ON menu_items(calories);
CREATE INDEX idx_menu_items_protein ON menu_items(protein);

-- =====================================================
-- TABLE: ingredients
-- Purpose: Master list of all ingredients
-- =====================================================
CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    is_allergen BOOLEAN DEFAULT false,
    allergen_type VARCHAR(50), -- e.g., "nuts", "dairy", "gluten"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ingredients_slug ON ingredients(slug);
CREATE INDEX idx_ingredients_allergen ON ingredients(is_allergen);

-- =====================================================
-- TABLE: menu_item_ingredients (Junction Table)
-- Purpose: Many-to-many relationship between menu items and ingredients
-- =====================================================
CREATE TABLE menu_item_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    quantity VARCHAR(50), -- e.g., "100g", "2 pieces", optional
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(menu_item_id, ingredient_id)
);

CREATE INDEX idx_menu_item_ingredients_menu_item ON menu_item_ingredients(menu_item_id);
CREATE INDEX idx_menu_item_ingredients_ingredient ON menu_item_ingredients(ingredient_id);

-- =====================================================
-- TABLE: services
-- Purpose: Restaurant services (dine-in, takeaway, etc.)
-- =====================================================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50), -- Icon name
    image_url TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_active ON services(is_active);

-- =====================================================
-- TABLE: achievements
-- Purpose: Awards, certifications, partnerships
-- =====================================================
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    achievement_type VARCHAR(50), -- "award", "certification", "partnership", "invitation"
    image_url TEXT,
    year INTEGER,
    date DATE,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_achievements_type ON achievements(achievement_type);
CREATE INDEX idx_achievements_year ON achievements(year);
CREATE INDEX idx_achievements_active ON achievements(is_active);

-- =====================================================
-- TABLE: site_content
-- Purpose: CMS for static content (About Us, etc.)
-- =====================================================
CREATE TABLE site_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_slug VARCHAR(50) NOT NULL, -- e.g., "about-us", "mission"
    section_key VARCHAR(50) NOT NULL, -- e.g., "hero", "story", "values"
    content_type VARCHAR(20) NOT NULL, -- "text", "html", "json"
    content TEXT NOT NULL,
    metadata JSONB, -- Additional flexible data
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(page_slug, section_key)
);

CREATE INDEX idx_site_content_page ON site_content(page_slug);
CREATE INDEX idx_site_content_active ON site_content(is_active);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON achievements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-calculate high protein flag
CREATE OR REPLACE FUNCTION calculate_nutrition_flags()
RETURNS TRIGGER AS $$
BEGIN
    -- High protein: >20g protein
    NEW.is_high_protein := COALESCE(NEW.protein, 0) >= 20;
    
    -- Low sugar: <5g sugar
    NEW.is_low_sugar := COALESCE(NEW.sugar, 0) < 5;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER calculate_menu_item_flags BEFORE INSERT OR UPDATE ON menu_items
    FOR EACH ROW EXECUTE FUNCTION calculate_nutrition_flags();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Public read access" ON ingredients FOR SELECT USING (true);
CREATE POLICY "Public read access" ON menu_item_ingredients FOR SELECT USING (true);
CREATE POLICY "Public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public read access" ON site_content FOR SELECT USING (true);

-- Admin write access (requires authentication setup)
-- Note: You'll need to set up Supabase Auth and create an admin role
-- For now, these are placeholders

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View: Menu items with category information
CREATE OR REPLACE VIEW menu_items_with_category AS
SELECT 
    mi.*,
    c.name as category_name,
    c.slug as category_slug,
    c.parent_id as category_parent_id
FROM menu_items mi
LEFT JOIN categories c ON mi.category_id = c.id
WHERE mi.is_active = true;

-- View: Menu items with ingredient count
CREATE OR REPLACE VIEW menu_items_with_stats AS
SELECT 
    mi.*,
    COUNT(mii.ingredient_id) as ingredient_count
FROM menu_items mi
LEFT JOIN menu_item_ingredients mii ON mi.id = mii.menu_item_id
GROUP BY mi.id;

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE categories IS 'Hierarchical menu categories with parent-child relationships';
COMMENT ON TABLE menu_items IS 'All menu items with complete nutritional information';
COMMENT ON TABLE ingredients IS 'Master list of ingredients for menu items';
COMMENT ON TABLE menu_item_ingredients IS 'Junction table linking menu items to ingredients';
COMMENT ON TABLE services IS 'Restaurant services offered';
COMMENT ON TABLE achievements IS 'Awards, certifications, and achievements';
COMMENT ON TABLE site_content IS 'CMS for static page content';

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================
DO $$
BEGIN
    RAISE NOTICE '✅ The Healthy Corner database schema created successfully!';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Run seed data script to populate sample data';
    RAISE NOTICE '2. Set up Supabase Storage bucket for images';
    RAISE NOTICE '3. Configure authentication if needed';
END $$;
