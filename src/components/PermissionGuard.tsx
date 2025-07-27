import React from 'react';
import { usePermissions, type PermissionConfig } from '@/hooks/usePermissions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/hooks/useNavigation';

interface PermissionGuardProps {
  children: React.ReactNode;
  permissions: PermissionConfig;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({ 
  children, 
  permissions, 
  fallback 
}) => {
  const { hasPermission } = usePermissions();
  const { goToDashboard } = useNavigation();

  const hasAccess = hasPermission(permissions);

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Alert variant="destructive">
            <AlertDescription className="text-center">
              You don't have permission to access this page.
            </AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <Button onClick={goToDashboard} variant="outline">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};