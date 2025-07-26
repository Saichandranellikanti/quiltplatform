-- Add new document types to task_type enum
ALTER TYPE task_type ADD VALUE 'LABELS';
ALTER TYPE task_type ADD VALUE 'BLC';
ALTER TYPE task_type ADD VALUE 'DELIVERY_PERMITS';