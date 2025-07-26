-- Create task templates for each shipping route using correct enum values
INSERT INTO public.task_templates (name, description, type, is_active) VALUES
('GRIMALDI Valencia', 'Shipping route from Valencia via GRIMALDI', 'GRIMALDI_SHIPPING', true),
('GRIMALDI Monfalcone', 'Shipping route from Monfalcone via GRIMALDI', 'GRIMALDI_SHIPPING', true),
('GRIMALDI Southampton', 'Shipping route from Southampton via GRIMALDI', 'GRIMALDI_SHIPPING', true),
('GRIMALDI Antwerp', 'Shipping route from Antwerp via GRIMALDI', 'GRIMALDI_SHIPPING', true),
('ORIENT Hamburg', 'Shipping route from Hamburg via ORIENT', 'ORIENT_SHIPPING', true),
('ORIENT Antwerp', 'Shipping route from Antwerp via ORIENT', 'ORIENT_SHIPPING', true),
('ORIENT Bremerhaven-Alexandria', 'Shipping route from Bremerhaven to Alexandria via ORIENT', 'ORIENT_SHIPPING', true),
('MERNA Alicante', 'Shipping route from Alicante via MERNA', 'GENERAL_SHIPPING', true),
('MERNA Marseille-Alexandria', 'Shipping route from Marseille to Alexandria via MERNA', 'GENERAL_SHIPPING', true),
('DFDS Trieste', 'Shipping route from Trieste via DFDS', 'GENERAL_SHIPPING', true),
('GLOVIS Antwerp-Kuwait', 'Shipping route from Antwerp to Kuwait via GLOVIS', 'GENERAL_SHIPPING', true);

-- Create field definitions for all templates
-- First, let's create a function to add fields to a template
CREATE OR REPLACE FUNCTION add_template_fields(template_name text, include_mky_booking_id boolean DEFAULT false, include_car_plate boolean DEFAULT false)
RETURNS void AS $$
DECLARE
    template_id uuid;
    field_order_counter integer := 0;
BEGIN
    -- Get template ID
    SELECT id INTO template_id FROM public.task_templates WHERE name = template_name;
    
    -- Add Timestamp field
    field_order_counter := field_order_counter + 1;
    INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order)
    VALUES (template_id, 'timestamp', 'Timestamp', 'date', true, field_order_counter);
    
    -- Add MKY Booking ID if needed
    IF include_mky_booking_id THEN
        field_order_counter := field_order_counter + 1;
        INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order)
        VALUES (template_id, 'mky_booking_id', 'MKY BOOKING ID', 'text', false, field_order_counter);
    END IF;
    
    -- Add Client Name
    field_order_counter := field_order_counter + 1;
    INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order)
    VALUES (template_id, 'client_name', 'CLIENT NAME', 'text', true, field_order_counter);
    
    -- Add Chassis
    field_order_counter := field_order_counter + 1;
    INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order)
    VALUES (template_id, 'chassis', 'CHASSIS', 'text', false, field_order_counter);
    
    -- Add ACID
    field_order_counter := field_order_counter + 1;
    INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order)
    VALUES (template_id, 'acid', 'ACID', 'text', false, field_order_counter);
    
    -- Add MRN
    field_order_counter := field_order_counter + 1;
    INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order)
    VALUES (template_id, 'mrn', 'MRN', 'text', false, field_order_counter);
    
    -- Add BLC Status
    field_order_counter := field_order_counter + 1;
    INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order, field_options)
    VALUES (template_id, 'blc_status', 'BLC STATUS', 'select', false, field_order_counter, '["Pending", "In Progress", "Completed", "Cancelled"]'::jsonb);
    
    -- Add Booked Status
    field_order_counter := field_order_counter + 1;
    INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order, field_options)
    VALUES (template_id, 'booked_status', 'BOOKED STATUS', 'select', false, field_order_counter, '["Pending", "Confirmed", "Cancelled"]'::jsonb);
    
    -- Add Order Status
    field_order_counter := field_order_counter + 1;
    INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order, field_options)
    VALUES (template_id, 'order_status', 'ORDER STATUS', 'select', false, field_order_counter, '["Draft", "Submitted", "Processing", "Completed", "Cancelled"]'::jsonb);
    
    -- Add Invoice Status
    field_order_counter := field_order_counter + 1;
    INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order, field_options)
    VALUES (template_id, 'invoice_status', 'INVOICE STATUS', 'select', false, field_order_counter, '["Not Created", "Draft", "Sent", "Paid", "Overdue"]'::jsonb);
    
    -- Add Release Status
    field_order_counter := field_order_counter + 1;
    INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order, field_options)
    VALUES (template_id, 'release_status', 'RELEASE STATUS', 'select', false, field_order_counter, '["Pending", "Released", "On Hold"]'::jsonb);
    
    -- Add Cost
    field_order_counter := field_order_counter + 1;
    INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order)
    VALUES (template_id, 'cost', 'COST', 'text', false, field_order_counter);
    
    -- Add Account Manager
    field_order_counter := field_order_counter + 1;
    INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order)
    VALUES (template_id, 'acc_manager', 'ACC MANAGER', 'text', false, field_order_counter);
    
    -- Add Car Plate - Trailer if needed
    IF include_car_plate THEN
        field_order_counter := field_order_counter + 1;
        INSERT INTO public.field_definitions (task_template_id, field_name, field_label, field_type, is_required, field_order)
        VALUES (template_id, 'car_plate_trailer', 'CAR PLATE - TRAILER', 'text', false, field_order_counter);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Add fields to each template
-- GRIMALDI routes
SELECT add_template_fields('GRIMALDI Valencia', false, true);
SELECT add_template_fields('GRIMALDI Monfalcone', false, false);
SELECT add_template_fields('GRIMALDI Southampton', false, false);
SELECT add_template_fields('GRIMALDI Antwerp', false, false);

-- ORIENT routes
SELECT add_template_fields('ORIENT Hamburg', false, false);
SELECT add_template_fields('ORIENT Antwerp', false, false);
SELECT add_template_fields('ORIENT Bremerhaven-Alexandria', true, false);

-- MERNA routes
SELECT add_template_fields('MERNA Alicante', false, false);
SELECT add_template_fields('MERNA Marseille-Alexandria', false, false);

-- DFDS routes
SELECT add_template_fields('DFDS Trieste', false, false);

-- GLOVIS routes
SELECT add_template_fields('GLOVIS Antwerp-Kuwait', true, false);

-- Clean up the helper function
DROP FUNCTION add_template_fields(text, boolean, boolean);