-- Enable real-time updates for bookings table
ALTER TABLE public.bookings REPLICA IDENTITY FULL;

-- Add bookings table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;

-- Enable real-time updates for task_templates table
ALTER TABLE public.task_templates REPLICA IDENTITY FULL;

-- Add task_templates table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.task_templates;