-- ============================================================
-- Solorah — Database schema
-- Run this in the Supabase SQL Editor after creating the project
-- ============================================================

-- 1. Profiles (extension of Supabase Auth)
-- ============================================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name VARCHAR(100),
  lang VARCHAR(5) DEFAULT 'fr',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create profile when a user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, lang)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'lang', 'fr'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- 2. Saved Readings
-- ============================================================
CREATE TABLE saved_readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  deck VARCHAR(50) NOT NULL,
  spread_type VARCHAR(50) NOT NULL,
  cards JSONB NOT NULL,

  question TEXT,
  lang VARCHAR(5) DEFAULT 'fr',

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_readings_user ON saved_readings(user_id);
CREATE INDEX idx_readings_date ON saved_readings(created_at DESC);

ALTER TABLE saved_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own readings"
  ON saved_readings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own readings"
  ON saved_readings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own readings"
  ON saved_readings FOR DELETE
  USING (auth.uid() = user_id);


-- 3. Contact Messages
-- ============================================================
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  lang VARCHAR(5) DEFAULT 'fr',
  status VARCHAR(20) DEFAULT 'unread',
  admin_reply TEXT,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_contact_date ON contact_messages(created_at DESC);
