-- Fix critical role escalation vulnerability
-- Drop the current broad update policy for users
DROP POLICY IF EXISTS "Admins can update users" ON public.users;

-- Create separate policies for admin user management vs user self-updates
CREATE POLICY "Admins can update all user fields" 
ON public.users 
FOR UPDATE 
USING (get_current_user_role() = 'Admin');

CREATE POLICY "Users can update their own profile (limited)" 
ON public.users 
FOR UPDATE 
USING (email = auth.email())
WITH CHECK (
  email = auth.email() 
  AND role = (SELECT role FROM public.users WHERE email = auth.email()) -- Role cannot be changed
  AND status = (SELECT status FROM public.users WHERE email = auth.email()) -- Status cannot be changed
);

-- Enhance database function security by setting search_path
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role FROM public.users WHERE email = auth.email() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_mky_user(user_email text, user_company text)
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = ''
AS $$
  SELECT user_email LIKE '%@mky.com' OR user_company = 'MKY';
$$;

-- Enhance audit function security
CREATE OR REPLACE FUNCTION public.audit_trigger_function()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_user_id UUID;
  current_user_email TEXT;
  current_user_role TEXT;
  changed_fields TEXT[] := ARRAY[]::TEXT[];
  field_name TEXT;
BEGIN
  -- Get current user info
  current_user_id := auth.uid();
  current_user_email := auth.email();
  
  -- Get user role
  SELECT role INTO current_user_role 
  FROM public.users 
  WHERE email = current_user_email 
  LIMIT 1;
  
  -- For UPDATE operations, determine changed fields
  IF TG_OP = 'UPDATE' THEN
    -- Check each field for changes
    IF OLD.user_id IS DISTINCT FROM NEW.user_id THEN
      changed_fields := array_append(changed_fields, 'user_id');
    END IF;
    IF OLD.booking_data IS DISTINCT FROM NEW.booking_data THEN
      changed_fields := array_append(changed_fields, 'booking_data');
    END IF;
    IF OLD.status IS DISTINCT FROM NEW.status THEN
      changed_fields := array_append(changed_fields, 'status');
    END IF;
    IF OLD.task_template_id IS DISTINCT FROM NEW.task_template_id THEN
      changed_fields := array_append(changed_fields, 'task_template_id');
    END IF;
  END IF;

  -- Insert audit log
  INSERT INTO public.audit_logs (
    table_name,
    record_id,
    action,
    old_values,
    new_values,
    changed_fields,
    user_id,
    user_email,
    user_role
  ) VALUES (
    TG_TABLE_NAME,
    CASE 
      WHEN TG_OP = 'DELETE' THEN OLD.id
      ELSE NEW.id
    END,
    TG_OP,
    CASE 
      WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)
      WHEN TG_OP = 'UPDATE' THEN row_to_json(OLD)
      ELSE NULL
    END,
    CASE 
      WHEN TG_OP = 'DELETE' THEN NULL
      ELSE row_to_json(NEW)
    END,
    changed_fields,
    current_user_id,
    current_user_email,
    current_user_role
  );

  -- Return appropriate record
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$;