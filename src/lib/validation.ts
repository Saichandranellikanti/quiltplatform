import { z } from 'zod';

// Security: Input sanitization helper
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .trim()
    .slice(0, 1000); // Limit length
};

// User validation schemas
export const userCreateSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .transform(sanitizeInput),
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .transform(sanitizeInput),
  role: z.enum(['Admin', 'Staff', 'Finance', 'CRMUser'], {
    errorMap: () => ({ message: 'Please select a valid role' })
  }),
  status: z.enum(['Active', 'Inactive'], {
    errorMap: () => ({ message: 'Please select a valid status' })
  }),
  company: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .transform(val => val ? sanitizeInput(val) : undefined)
});

export const userUpdateSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .transform(sanitizeInput),
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .transform(sanitizeInput),
  company: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .transform(val => val ? sanitizeInput(val) : undefined)
});

// Admin-only user update schema (includes role/status)
export const adminUserUpdateSchema = userCreateSchema.partial().extend({
  id: z.string().uuid('Invalid user ID')
});

// Authentication schemas
export const signInSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .toLowerCase()
    .transform(sanitizeInput),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
});

export const signUpSchema = signInSchema.extend({
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Booking validation schemas
export const bookingDataSchema = z.object({
  // Add specific validation based on your booking fields
  // This is a flexible schema that validates common booking fields
}).passthrough(); // Allow additional fields

export const bookingSchema = z.object({
  task_template_id: z.string().uuid('Invalid template ID'),
  booking_data: bookingDataSchema,
  status: z.enum(['Draft', 'Submitted', 'In Progress', 'Completed', 'Cancelled'])
    .optional()
    .default('Draft')
});

// Export types
export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type AdminUserUpdateInput = z.infer<typeof adminUserUpdateSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;