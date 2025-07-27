import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUsers } from '@/hooks/useUsers';
import { usePermissions } from '@/hooks/usePermissions';
import { userCreateSchema, adminUserUpdateSchema, userUpdateSchema, type UserCreateInput, type AdminUserUpdateInput, type UserUpdateInput } from '@/lib/validation';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  company?: string;
}

interface UserEditFormProps {
  user?: User;
  onClose: () => void;
}

export const UserEditForm: React.FC<UserEditFormProps> = ({ user, onClose }) => {
  const { createUser, updateUser } = useUsers();
  const { canManageUsers } = usePermissions();
  
  // Security: Determine which schema to use based on permissions
  const isAdmin = canManageUsers();
  const isEditing = !!user;
  
  // Use appropriate validation schema and type based on user permissions
  const getSchema = () => {
    if (isEditing) {
      return isAdmin ? adminUserUpdateSchema : userUpdateSchema;
    }
    return userCreateSchema;
  };

  // Define form data type based on admin status and editing mode
  type FormData = typeof isAdmin extends true
    ? typeof isEditing extends true
      ? AdminUserUpdateInput
      : UserCreateInput
    : UserUpdateInput;

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(getSchema()),
    defaultValues: user ? {
      email: user.email,
      name: user.name,
      ...(isAdmin ? { role: user.role as any, status: user.status as any } : {}),
      company: user.company || '',
    } : {
      email: '',
      name: '',
      ...(isAdmin ? { role: 'Staff' as any, status: 'Active' as any } : {}),
      company: '',
    },
  });

  const watchedRole = watch('role' as any);
  const watchedStatus = watch('status' as any);

  const onSubmit = async (data: any) => {
    try {
      // Security: Additional validation for admin operations
      if (isEditing && !isAdmin && ('role' in data || 'status' in data)) {
        throw new Error('Unauthorized: Cannot modify role or status');
      }

      const userData = {
        ...data,
        company: data.company || undefined,
      };

      if (isEditing && user) {
        await updateUser(user.id, userData);
      } else {
        await createUser(userData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          disabled={isEditing}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Security: Only admins can modify role and status */}
      {isAdmin && (
        <>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={watchedRole} onValueChange={(value) => setValue('role' as any, value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="CRMUser">CRM User</SelectItem>
              </SelectContent>
            </Select>
            {(errors as any).role && (
              <p className="text-sm text-destructive">{(errors as any).role.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={watchedStatus} onValueChange={(value) => setValue('status' as any, value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {(errors as any).status && (
              <p className="text-sm text-destructive">{(errors as any).status.message}</p>
            )}
          </div>
        </>
      )}

      {/* Show current role/status for non-admins when editing */}
      {!isAdmin && isEditing && user && (
        <>
          <div className="space-y-2">
            <Label>Current Role</Label>
            <Input value={user.role} disabled className="bg-muted" />
            <p className="text-xs text-muted-foreground">Contact an admin to change your role</p>
          </div>
          <div className="space-y-2">
            <Label>Current Status</Label>
            <Input value={user.status} disabled className="bg-muted" />
            <p className="text-xs text-muted-foreground">Contact an admin to change your status</p>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="company">Company (Optional)</Label>
        <Input
          id="company"
          {...register('company')}
          placeholder="e.g., MKY"
        />
        {errors.company && (
          <p className="text-sm text-destructive">{errors.company.message}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};