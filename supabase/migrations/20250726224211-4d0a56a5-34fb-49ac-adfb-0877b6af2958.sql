-- Create audit_logs table to track all changes
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
  old_values JSONB,
  new_values JSONB,
  changed_fields TEXT[],
  user_id UUID NOT NULL,
  user_email TEXT,
  user_role TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for audit_logs (only admins can view audit logs)
CREATE POLICY "Admins can view all audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (get_current_user_role() = 'Admin');

-- Create policy to allow system to insert audit logs
CREATE POLICY "System can insert audit logs" 
ON public.audit_logs 
FOR INSERT 
WITH CHECK (true);

-- Add UPDATE policy for bookings (admins can update all, staff can update their own)
CREATE POLICY "Admins can update all bookings" 
ON public.bookings 
FOR UPDATE 
USING (get_current_user_role() = 'Admin');

-- Update existing staff policy to be more permissive (they already have one, this replaces it)
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
CREATE POLICY "Staff can update their own bookings" 
ON public.bookings 
FOR UPDATE 
USING ((user_id)::text = (SELECT (auth.uid())::text AS uid));

-- Create audit trigger function
CREATE OR REPLACE FUNCTION public.audit_trigger_function()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on bookings table
CREATE TRIGGER bookings_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();