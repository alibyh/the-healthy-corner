-- =====================================================
-- THE HEALTHY CORNER - SAMPLE SEED DATA
-- =====================================================
-- Run this after the main schema to populate sample data

-- =====================================================
-- CATEGORIES
-- =====================================================

-- Top-level categories
INSERT INTO categories (name, slug, description, parent_id, order_index, icon) VALUES
('Breakfast', 'breakfast', 'Start your day healthy', NULL, 1, 'sunrise'),
('The Balanced Plate', 'balanced-plate', 'Complete balanced meals', NULL, 2, 'restaurant'),
('Healthy Toasts', 'healthy-toasts', 'Nutritious toast options', NULL, 3, 'bread'),
('Soups', 'soups', 'Warm and nourishing', NULL, 4, 'bowl'),
('Salads', 'salads', 'Fresh and crisp', NULL, 5, 'leaf'),
('Desserts', 'desserts', 'No added sugar desserts', NULL, 6, 'cake'),
('Beverages', 'beverages', 'Healthy drinks', NULL, 7, 'cup'),
('Caffeine Series', 'caffeine-series', 'Coffee and tea', NULL, 8, 'coffee'),
('Cheat Meals', 'cheat-meals', 'Fast food favorites', NULL, 9, 'burger'),
('Kids Menu', 'kids-menu', 'Kid-friendly options', NULL, 10, 'baby');

-- Breakfast subcategories
INSERT INTO categories (name, slug, description, parent_id, order_index) 
SELECT '3 in 1', '3-in-1', 'Complete breakfast combo', id, 1 FROM categories WHERE slug = 'breakfast';

INSERT INTO categories (name, slug, description, parent_id, order_index) 
SELECT 'Gourmet & Healthy', 'gourmet-healthy', 'Premium breakfast options', id, 2 FROM categories WHERE slug = 'breakfast';

INSERT INTO categories (name, slug, description, parent_id, order_index) 
SELECT 'For Kids', 'breakfast-kids', 'Kid-friendly breakfast', id, 3 FROM categories WHERE slug = 'breakfast';

-- Beverages subcategories
INSERT INTO categories (name, slug, description, parent_id, order_index) 
SELECT 'Juices', 'juices', 'Fresh fruit juices', id, 1 FROM categories WHERE slug = 'beverages';

INSERT INTO categories (name, slug, description, parent_id, order_index) 
SELECT 'Detox', 'detox', 'Detox drinks', id, 2 FROM categories WHERE slug = 'beverages';

INSERT INTO categories (name, slug, description, parent_id, order_index) 
SELECT 'Smoothies', 'smoothies', 'Thick and creamy', id, 3 FROM categories WHERE slug = 'beverages';

INSERT INTO categories (name, slug, description, parent_id, order_index) 
SELECT 'Protein Shakes', 'protein-shakes', 'High protein drinks', id, 4 FROM categories WHERE slug = 'beverages';

-- Caffeine subcategories
INSERT INTO categories (name, slug, description, parent_id, order_index) 
SELECT 'Coffee', 'coffee', 'Specialty coffee drinks', id, 1 FROM categories WHERE slug = 'caffeine-series';

INSERT INTO categories (name, slug, description, parent_id, order_index) 
SELECT 'Tea', 'tea', 'Premium tea selection', id, 2 FROM categories WHERE slug = 'caffeine-series';

-- =====================================================
-- INGREDIENTS (Sample)
-- =====================================================

INSERT INTO ingredients (name, slug, is_allergen, allergen_type) VALUES
('Chicken Breast', 'chicken-breast', false, NULL),
('Brown Rice', 'brown-rice', false, NULL),
('Quinoa', 'quinoa', false, NULL),
('Avocado', 'avocado', false, NULL),
('Spinach', 'spinach', false, NULL),
('Kale', 'kale', false, NULL),
('Tomato', 'tomato', false, NULL),
('Cucumber', 'cucumber', false, NULL),
('Olive Oil', 'olive-oil', false, NULL),
('Almonds', 'almonds', true, 'nuts'),
('Walnuts', 'walnuts', true, 'nuts'),
('Peanut Butter', 'peanut-butter', true, 'nuts'),
('Greek Yogurt', 'greek-yogurt', true, 'dairy'),
('Mozzarella Cheese', 'mozzarella-cheese', true, 'dairy'),
('Eggs', 'eggs', true, 'eggs'),
('Whole Wheat Bread', 'whole-wheat-bread', true, 'gluten'),
('Oats', 'oats', false, NULL),
('Banana', 'banana', false, NULL),
('Blueberries', 'blueberries', false, NULL),
('Strawberries', 'strawberries', false, NULL),
('Honey', 'honey', false, NULL),
('Stevia', 'stevia', false, NULL),
('Chia Seeds', 'chia-seeds', false, NULL),
('Flax Seeds', 'flax-seeds', false, NULL),
('Sweet Potato', 'sweet-potato', false, NULL);

-- =====================================================
-- MENU ITEMS (Sample)
-- =====================================================

-- Get category IDs for reference
DO $$
DECLARE
    breakfast_id UUID;
    balanced_plate_id UUID;
    salads_id UUID;
    smoothies_id UUID;
    coffee_id UUID;
    item_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO breakfast_id FROM categories WHERE slug = '3-in-1';
    SELECT id INTO balanced_plate_id FROM categories WHERE slug = 'balanced-plate';
    SELECT id INTO salads_id FROM categories WHERE slug = 'salads';
    SELECT id INTO smoothies_id FROM categories WHERE slug = 'smoothies';
    SELECT id INTO coffee_id FROM categories WHERE slug = 'coffee';

    -- Breakfast Items
    INSERT INTO menu_items (
        name, slug, description, category_id,
        calories, protein, carbs, fats, sugar,
        price, is_vegetarian, is_high_protein
    ) VALUES
    (
        'Power Breakfast Bowl',
        'power-breakfast-bowl',
        'Quinoa, scrambled eggs, avocado, and spinach with a side of whole wheat toast',
        breakfast_id,
        485, 28.5, 42.0, 18.5, 3.2,
        85.00, true, true
    ) RETURNING id INTO item_id;

    -- Add ingredients
    INSERT INTO menu_item_ingredients (menu_item_id, ingredient_id, quantity)
    SELECT item_id, id, '100g' FROM ingredients WHERE slug IN ('quinoa', 'eggs', 'avocado', 'spinach', 'whole-wheat-bread');

    -- More breakfast items
    INSERT INTO menu_items (
        name, slug, description, category_id,
        calories, protein, carbs, fats, sugar,
        price, is_vegetarian, is_high_protein
    ) VALUES
    (
        'Greek Yogurt Parfait',
        'greek-yogurt-parfait',
        'Layers of Greek yogurt, fresh berries, honey, and granola',
        breakfast_id,
        320, 18.0, 45.0, 8.5, 12.0,
        65.00, true, false
    );

    -- Balanced Plate Items
    INSERT INTO menu_items (
        name, slug, description, category_id,
        calories, protein, carbs, fats, sugar,
        price, is_vegetarian, is_high_protein
    ) VALUES
    (
        'Grilled Chicken & Quinoa Bowl',
        'grilled-chicken-quinoa-bowl',
        'Perfectly grilled chicken breast with quinoa, roasted vegetables, and tahini dressing',
        balanced_plate_id,
        520, 45.0, 48.0, 14.5, 4.0,
        120.00, false, true
    ),
    (
        'Mediterranean Salmon Plate',
        'mediterranean-salmon-plate',
        'Grilled salmon with brown rice, grilled vegetables, and lemon herb sauce',
        balanced_plate_id,
        580, 42.0, 44.0, 22.0, 3.5,
        145.00, false, true
    );

    -- Salads
    INSERT INTO menu_items (
        name, slug, description, category_id,
        calories, protein, carbs, fats, sugar,
        price, is_vegetarian, is_vegan, is_high_protein
    ) VALUES
    (
        'Super Greens Salad',
        'super-greens-salad',
        'Kale, spinach, avocado, cucumber, cherry tomatoes with olive oil and lemon',
        salads_id,
        285, 6.5, 18.0, 21.0, 4.0,
        75.00, true, true, false
    ),
    (
        'Quinoa Power Salad',
        'quinoa-power-salad',
        'Quinoa, chickpeas, mixed greens, feta cheese, and balsamic vinaigrette',
        salads_id,
        395, 16.0, 42.0, 16.5, 5.5,
        85.00, true, false, false
    );

    -- Smoothies
    INSERT INTO menu_items (
        name, slug, description, category_id,
        calories, protein, carbs, fats, sugar,
        price, is_vegetarian, is_vegan, is_high_protein
    ) VALUES
    (
        'Berry Blast Smoothie',
        'berry-blast-smoothie',
        'Blueberries, strawberries, banana, almond milk, and chia seeds',
        smoothies_id,
        245, 6.0, 48.0, 5.5, 28.0,
        55.00, true, true, false
    ),
    (
        'Green Power Smoothie',
        'green-power-smoothie',
        'Spinach, kale, banana, pineapple, coconut water, and spirulina',
        smoothies_id,
        180, 4.5, 38.0, 2.0, 22.0,
        60.00, true, true, false
    );

    -- Coffee
    INSERT INTO menu_items (
        name, slug, description, category_id,
        calories, protein, carbs, fats, sugar,
        price, is_vegetarian, is_high_protein
    ) VALUES
    (
        'Americano',
        'americano',
        'Classic double shot espresso with hot water',
        coffee_id,
        10, 0.5, 2.0, 0.0, 0.0,
        30.00, true, false
    ),
    (
        'Oat Milk Latte',
        'oat-milk-latte',
        'Smooth espresso with steamed oat milk',
        coffee_id,
        150, 4.0, 18.0, 6.0, 8.0,
        45.00, true, false
    );

    RAISE NOTICE '✅ Sample menu items created successfully!';
END $$;

-- =====================================================
-- SERVICES
-- =====================================================

INSERT INTO services (title, slug, description, icon, order_index) VALUES
('Dine-In', 'dine-in', 'Enjoy your meal in our comfortable, health-focused environment', 'utensils', 1),
('Takeaway', 'takeaway', 'Quick and convenient takeaway service for meals on the go', 'shopping-bag', 2),
('Healthy Meal Plans', 'meal-plans', 'Customized weekly meal plans tailored to your nutritional goals', 'calendar', 3),
('Sports Nutrition', 'sports-nutrition', 'Specialized meals designed for athletes and active individuals', 'dumbbell', 4),
('Kids Meals', 'kids-meals', 'Nutritious and delicious meals that kids actually love', 'baby', 5),
('Custom Orders', 'custom-orders', 'Special dietary requirements? We can customize meals for you', 'cog', 6);

-- =====================================================
-- ACHIEVEMENTS
-- =====================================================

INSERT INTO achievements (title, description, achievement_type, year, order_index) VALUES
('Best Healthy Restaurant 2025', 'Awarded Best Healthy Restaurant by Mauritania Food Awards', 'award', 2025, 1),
('Health & Nutrition Certification', 'Certified by National Institute of Nutrition', 'certification', 2024, 2),
('Partnership with FitZone Gym', 'Official nutrition partner for leading fitness centers', 'partnership', 2025, 3),
('Food Safety Excellence Award', 'Recognized for outstanding food safety standards', 'award', 2024, 4);

-- =====================================================
-- SITE CONTENT
-- =====================================================

INSERT INTO site_content (page_slug, section_key, content_type, content) VALUES
('about-us', 'hero', 'text', 'The Healthy Corner - Where Nutrition Meets Taste'),
('about-us', 'story', 'text', 'Founded in 2023, The Healthy Corner was born from a simple belief: healthy food doesn''t have to be boring. We combine nutritional science with culinary expertise to create meals that fuel your body and delight your taste buds.'),
('about-us', 'mission', 'text', 'Our mission is to make healthy eating accessible, enjoyable, and transparent. Every dish comes with complete nutritional information, so you always know what you''re putting in your body.'),
('about-us', 'values', 'json', '["Transparency in nutrition", "Quality ingredients", "Sustainable practices", "Customer health first", "Innovation in healthy cuisine"]')
ON CONFLICT (page_slug, section_key) DO UPDATE SET content = EXCLUDED.content;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================
DO $$
BEGIN
    RAISE NOTICE '✅ Seed data inserted successfully!';
    RAISE NOTICE 'Database is ready for development';
END $$;
