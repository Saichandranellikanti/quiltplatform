-- Add company field to users table
ALTER TABLE public.users ADD COLUMN company TEXT;

-- Update existing admin user to be part of MKY
UPDATE public.users SET company = 'MKY' WHERE email = 'admin@mky.com';

-- Create function to check if user is MKY tenant
CREATE OR REPLACE FUNCTION public.is_mky_user(user_email TEXT, user_company TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
AS $$
  SELECT user_email LIKE '%@mky.com' OR user_company = 'MKY';
$$;