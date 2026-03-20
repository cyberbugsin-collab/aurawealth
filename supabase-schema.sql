-- Supabase Schema for AuraWealth Database
-- Copy and run this entirely inside your Supabase SQL Editor

-- 1. Create Users Table
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  joined_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Summary Table
CREATE TABLE public.summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  total_net_worth NUMERIC NOT NULL DEFAULT 0,
  total_invested NUMERIC NOT NULL DEFAULT 0,
  total_gain_loss NUMERIC NOT NULL DEFAULT 0,
  percentage_gain NUMERIC NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Portfolio Holdings Table
CREATE TABLE public.portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  type TEXT NOT NULL, -- e.g. Stock, Mutual Fund, AIF
  invested NUMERIC NOT NULL DEFAULT 0,
  current_value NUMERIC NOT NULL DEFAULT 0,
  returns NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Net Worth History Table (For Charts)
CREATE TABLE public.net_worth_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  value NUMERIC NOT NULL,
  sort_order INTEGER NOT NULL -- e.g., 1 for Jan, 12 for Dec
);

-- 5. Create Requests Table (For User Change Requests)
CREATE TABLE public.requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  asset_id UUID,
  asset_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert dummy User 1
INSERT INTO public.users (id, email, name, phone) 
VALUES ('11111111-1111-1111-1111-111111111111', 'user@demo.com', 'Rajesh Sharma', '+91 98765 12345');

-- Insert dummy Summary for User 1
INSERT INTO public.summary (user_id, total_net_worth, total_invested, total_gain_loss, percentage_gain)
VALUES ('11111111-1111-1111-1111-111111111111', 36882500, 28750000, 8132500, 28.29);

-- Insert Dummy Portfolio for User 1
INSERT INTO public.portfolio (user_id, name, symbol, type, invested, current_value, returns) VALUES
('11111111-1111-1111-1111-111111111111', 'Reliance Industries', 'RELIANCE', 'Stock', 2500000, 3625000, 45.0),
('11111111-1111-1111-1111-111111111111', 'HDFC Flexi Cap Fund', 'HDFC-FC', 'Mutual Fund', 5000000, 6750000, 35.0),
('11111111-1111-1111-1111-111111111111', 'IIFL AIF', 'IIFL-AIF', 'AIF', 5000000, 6250000, 25.0);

-- Insert Dummy Net Worth History for User 1
INSERT INTO public.net_worth_history (user_id, month, value, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'Jan', 27900000, 1),
('11111111-1111-1111-1111-111111111111', 'Feb', 28600000, 2),
('11111111-1111-1111-1111-111111111111', 'Mar', 28450000, 3);

-- Create simple Row Level Security (RLS) policies 
-- In production, you would restrict these to `auth.uid() = user_id`, but for a start we enable basic access.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read" ON public.portfolio FOR SELECT USING (true);
