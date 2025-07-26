-- Add RLS policies for admin user management
CREATE POLICY "Admins can insert users" 
ON public.users 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = 'Admin');

CREATE POLICY "Admins can update users" 
ON public.users 
FOR UPDATE 
TO authenticated
USING (get_current_user_role() = 'Admin');

CREATE POLICY "Admins can delete users" 
ON public.users 
FOR DELETE 
TO authenticated
USING (get_current_user_role() = 'Admin');