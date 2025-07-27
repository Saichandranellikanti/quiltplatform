import { useAuth } from './useAuth';
import { useTenant } from './useTenant';

export interface PermissionConfig {
  requiresAuth?: boolean;
  allowedRoles?: string[];
  requiresMKY?: boolean;
}

export const usePermissions = () => {
  const { user, profile } = useAuth();
  const { isMKY } = useTenant();

  const hasPermission = (config: PermissionConfig): boolean => {
    // Check authentication requirement
    if (config.requiresAuth && !user) {
      return false;
    }

    // Check MKY requirement
    if (config.requiresMKY && !isMKY) {
      return false;
    }

    // Check role requirement
    if (config.allowedRoles && profile) {
      return config.allowedRoles.includes(profile.role);
    }

    return true;
  };

  const canManageUsers = (): boolean => {
    return hasPermission({
      requiresAuth: true,
      requiresMKY: true,
      allowedRoles: ['Admin']
    });
  };

  const canViewAdminDashboard = (): boolean => {
    return hasPermission({
      requiresAuth: true,
      requiresMKY: true,
      allowedRoles: ['Admin']
    });
  };

  const canViewStaffDashboard = (): boolean => {
    return hasPermission({
      requiresAuth: true,
      requiresMKY: true,
      allowedRoles: ['Admin', 'Staff']
    });
  };

  const canEditBooking = (bookingUserId?: string): boolean => {
    if (!hasPermission({ requiresAuth: true })) {
      return false;
    }

    // Admins can edit any booking
    if (profile?.role === 'Admin') {
      return true;
    }

    // Users can only edit their own bookings
    return bookingUserId === user?.id;
  };

  const canDeleteBooking = (bookingUserId?: string): boolean => {
    // Only admins can delete bookings
    return hasPermission({
      requiresAuth: true,
      allowedRoles: ['Admin']
    });
  };

  const canViewAuditLogs = (): boolean => {
    return hasPermission({
      requiresAuth: true,
      allowedRoles: ['Admin']
    });
  };

  return {
    hasPermission,
    canManageUsers,
    canViewAdminDashboard,
    canViewStaffDashboard,
    canEditBooking,
    canDeleteBooking,
    canViewAuditLogs,
    user,
    profile,
    isMKY
  };
};