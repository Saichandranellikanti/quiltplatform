import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUsers } from '@/hooks/useUsers';

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

interface FormData {
  email: string;
  name: string;
  role: 'Admin' | 'Staff' | 'Finance' | 'CRMUser';
  status: 'Active' | 'Inactive';
  company?: string;
}

export const UserEditForm: React.FC<UserEditFormProps> = ({ user, onClose }) => {
  const { createUser, updateUser } = useUsers();
  const isEditing = !!user;

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: user ? {
      email: user.email,
      name: user.name,
      role: user.role as FormData['role'],
      status: user.status as FormData['status'],
      company: user.company || '',
    } : {
      email: '',
      name: '',
      role: 'Staff',
      status: 'Active',
      company: '',
    }
  });

  const watchedRole = watch('role');
  const watchedStatus = watch('status');

  const onSubmit = async (data: FormData) => {
    const userData = {
      ...data,
      company: data.company || undefined,
    };

    if (isEditing) {
      await updateUser(user.id, userData);
    } else {
      await createUser(userData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
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
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select value={watchedRole} onValueChange={(value) => setValue('role', value as any)}>
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={watchedStatus} onValueChange={(value) => setValue('status', value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company (Optional)</Label>
        <Input
          id="company"
          {...register('company')}
          placeholder="e.g., MKY"
        />
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