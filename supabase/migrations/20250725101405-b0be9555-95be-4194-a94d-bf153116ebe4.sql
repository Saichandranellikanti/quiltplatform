-- Create enum for task types
CREATE TYPE public.task_type AS ENUM ('GRIMALDI_SHIPPING', 'ORIENT_SHIPPING', 'GENERAL_SHIPPING');

-- Create enum for field types  
CREATE TYPE public.field_type AS ENUM ('text', 'number', 'date', 'select', 'checkbox', 'textarea');

-- Create task templates table
CREATE TABLE public.task_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type task_type NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create field definitions table
CREATE TABLE public.field_definitions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_template_id UUID NOT NULL REFERENCES public.task_templates(id) ON DELETE CASCADE,
  field_name TEXT NOT NULL,
  field_label TEXT NOT NULL,
  field_type field_type NOT NULL,
  is_required BOOLEAN NOT NULL DEFAULT false,
  field_options JSONB, -- For select options, validation rules, etc.
  field_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table to store actual booking data
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_template_id UUID NOT NULL REFERENCES public.task_templates(id),
  user_id UUID NOT NULL,
  booking_data JSONB NOT NULL, -- Store dynamic form data
  status TEXT NOT NULL DEFAULT 'Draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.task_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for task_templates
CREATE POLICY "MKY users can view all templates" 
ON public.task_templates 
FOR SELECT 
USING (true);

CREATE POLICY "MKY admins can manage templates" 
ON public.task_templates 
FOR ALL 
USING (get_current_user_role() = 'Admin');

-- RLS Policies for field_definitions  
CREATE POLICY "MKY users can view all field definitions" 
ON public.field_definitions 
FOR SELECT 
USING (true);

CREATE POLICY "MKY admins can manage field definitions" 
ON public.field_definitions 
FOR ALL 
USING (get_current_user_role() = 'Admin');

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (user_id::text = (SELECT auth.uid()::text));

CREATE POLICY "Users can create their own bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (user_id::text = (SELECT auth.uid()::text));

CREATE POLICY "Users can update their own bookings" 
ON public.bookings 
FOR UPDATE 
USING (user_id::text = (SELECT auth.uid()::text));

CREATE POLICY "Admins can view all bookings" 
ON public.bookings 
FOR SELECT 
USING (get_current_user_role() = 'Admin');

-- Create triggers for updated_at
CREATE TRIGGER update_task_templates_updated_at
BEFORE UPDATE ON public.task_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample task templates based on your sheet
INSERT INTO public.task_templates (name, type, description) VALUES
('GRIMALDI Valencia Route', 'GRIMALDI_SHIPPING', 'Grimaldi shipping to Valencia port'),
('ORIENT Hamburg Route', 'ORIENT_SHIPPING', 'Orient shipping to Hamburg port'),
('ORIENT Antwerp Route', 'ORIENT_SHIPPING', 'Orient shipping to Antwerp port');

-- Insert sample field definitions for GRIMALDI Valencia
INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order) 
SELECT id, 'vessel_name', 'Vessel Name', 'text', true, 1 FROM public.task_templates WHERE name = 'GRIMALDI Valencia Route';

INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order) 
SELECT id, 'departure_date', 'Departure Date', 'date', true, 2 FROM public.task_templates WHERE name = 'GRIMALDI Valencia Route';

INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order) 
SELECT id, 'arrival_date', 'Arrival Date', 'date', true, 3 FROM public.task_templates WHERE name = 'GRIMALDI Valencia Route';

INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order) 
SELECT id, 'container_type', 'Container Type', 'select', true, 4 FROM public.task_templates WHERE name = 'GRIMALDI Valencia Route';

-- Insert sample field definitions for ORIENT Hamburg  
INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order) 
SELECT id, 'booking_reference', 'Booking Reference', 'text', true, 1 FROM public.task_templates WHERE name = 'ORIENT Hamburg Route';

INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order) 
SELECT id, 'vessel_voyage', 'Vessel/Voyage', 'text', true, 2 FROM public.task_templates WHERE name = 'ORIENT Hamburg Route';

INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order) 
SELECT id, 'cargo_description', 'Cargo Description', 'textarea', true, 3 FROM public.task_templates WHERE name = 'ORIENT Hamburg Route';

INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order) 
SELECT id, 'special_requirements', 'Special Requirements', 'checkbox', false, 4 FROM public.task_templates WHERE name = 'ORIENT Hamburg Route';