-- Drop existing policies that cause recursion
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;

-- Create a security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.users WHERE email = auth.email() LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create new policies without recursion
CREATE POLICY "Users can view their own profile" ON public.users
FOR SELECT USING (email = auth.email());

CREATE POLICY "Admins can view all users" ON public.users
FOR SELECT USING (public.get_current_user_role() = 'Admin');