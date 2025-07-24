import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';

interface TenantRedirectProps {
  children: React.ReactNode;
}

const TenantRedirect: React.FC<TenantRedirectProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const { isMKY } = useTenant();

  useEffect(() => {
    if (!loading && user && profile) {
      if (!isMKY) {
        // Redirect non-MKY users to access denied
        navigate('/access-denied');
        return;
      }

      // Redirect MKY users based on their role
      if (profile.role === 'Admin') {
        navigate('/mky-admin');
      } else if (profile.role === 'Staff') {
        navigate('/mky-staff');
      } else {
        // Unknown role for MKY user
        navigate('/access-denied');
      }
    }
  }, [loading, user, profile, isMKY, navigate]);

  // Show loading or the children while redirecting
  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default TenantRedirect;