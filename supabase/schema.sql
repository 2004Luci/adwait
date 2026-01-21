-- =============================================================================
-- Adwait Artha CMS Database Schema
-- =============================================================================
-- Run this SQL in your Supabase SQL Editor to create all necessary tables.
-- Make sure to run this in order as some tables have foreign key dependencies.
-- =============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- ADMIN USERS TABLE
-- =============================================================================
-- Stores CMS admin users (company employees who can manage content)

CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster email lookups during authentication
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- =============================================================================
-- POSTS TABLE (Blog/Dynamic Content)
-- =============================================================================
-- Stores blog posts and dynamic pages like /blog/ipo-research

CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    content JSONB, -- Tiptap editor JSON content
    excerpt TEXT,
    featured_image VARCHAR(1000),
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    author_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);

-- =============================================================================
-- ANNOUNCEMENTS TABLE
-- =============================================================================
-- Stores homepage announcements/alerts

CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    content TEXT,
    type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success')),
    is_active BOOLEAN DEFAULT true,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fetching active announcements
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active, start_date, end_date);

-- =============================================================================
-- BANNERS TABLE
-- =============================================================================
-- Stores homepage banners/promotional images

CREATE TABLE IF NOT EXISTS banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255),
    image_url VARCHAR(1000),
    link_url VARCHAR(1000),
    position INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fetching active banners in order
CREATE INDEX IF NOT EXISTS idx_banners_active_position ON banners(is_active, position);

-- =============================================================================
-- SITE SETTINGS TABLE
-- =============================================================================
-- Stores editable site content (replaces constants.ts for dynamic content)

CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    category VARCHAR(100) CHECK (category IN ('hero', 'services', 'about', 'contact', 'testimonials', 'expertise', 'footer', 'general')),
    description TEXT,
    updated_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster key lookups
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON site_settings(category);

-- =============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =============================================================================
-- Automatically updates the updated_at column when a row is modified

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at column
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
-- These policies control access to data based on authentication

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- PUBLIC READ POLICIES
-- =============================================================================
-- Allow public read access to published content

-- Posts: Public can read published posts
CREATE POLICY "Public can view published posts"
    ON posts FOR SELECT
    USING (status = 'published');

-- Announcements: Public can view active announcements within date range
CREATE POLICY "Public can view active announcements"
    ON announcements FOR SELECT
    USING (
        is_active = true
        AND (start_date IS NULL OR start_date <= NOW())
        AND (end_date IS NULL OR end_date >= NOW())
    );

-- Banners: Public can view active banners
CREATE POLICY "Public can view active banners"
    ON banners FOR SELECT
    USING (is_active = true);

-- Site Settings: Public can view all settings (they're not sensitive)
CREATE POLICY "Public can view site settings"
    ON site_settings FOR SELECT
    USING (true);

-- =============================================================================
-- SERVICE ROLE POLICIES
-- =============================================================================
-- Service role (used by API routes) has full access
-- These policies allow the service role key to bypass RLS for admin operations

CREATE POLICY "Service role has full access to admin_users"
    ON admin_users FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role has full access to posts"
    ON posts FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role has full access to announcements"
    ON announcements FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role has full access to banners"
    ON banners FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role has full access to site_settings"
    ON site_settings FOR ALL
    USING (true)
    WITH CHECK (true);

-- =============================================================================
-- HELPER VIEWS
-- =============================================================================

-- View for posts with author information
CREATE OR REPLACE VIEW posts_with_authors AS
SELECT 
    p.*,
    json_build_object(
        'id', a.id,
        'name', a.name,
        'email', a.email
    ) AS author
FROM posts p
LEFT JOIN admin_users a ON p.author_id = a.id;

-- =============================================================================
-- INITIAL DATA SEEDING (Optional - run separately if needed)
-- =============================================================================
-- Uncomment and run this section to create an initial admin user
-- Make sure to change the password hash before running!

/*
-- To generate a password hash, use bcrypt with 12 rounds
-- Example: The hash below is for password "changeme123" - CHANGE THIS!
INSERT INTO admin_users (email, password_hash, name, role)
VALUES (
    'admin@adwaitartha.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Nh1QQ3QoE5E.q2', -- Change this!
    'Admin User',
    'admin'
)
ON CONFLICT (email) DO NOTHING;
*/
