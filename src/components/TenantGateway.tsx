import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';

const TenantGateway: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const { isMKY } = useTenant();

  useEffect(() => {
    // Only redirect if we have complete auth data
    if (!loading && user) {
      if (!profile) {
        // User is authenticated but no profile found
        navigate('/access-denied');
        return;
      }

      if (!isMKY) {
        // Non-MKY users go to access denied
        navigate('/access-denied');
        return;
      }

      // MKY users get redirected based on role
      if (profile.role === 'Admin') {
        navigate('/mky-admin');
      } else if (profile.role === 'Staff') {
        navigate('/mky-staff');
      } else {
        // Unknown role for MKY user
        navigate('/access-denied');
      }
    } else if (!loading && !user) {
      // Not authenticated, redirect to auth
      navigate('/auth');
    }
  }, [loading, user, profile, isMKY, navigate]);

  // Show loading while determining where to redirect
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default TenantGateway;