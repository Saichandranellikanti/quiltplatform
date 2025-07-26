import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useTenant } from './useTenant';

export const useNavigation = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { isMKY } = useTenant();

  const goToDashboard = () => {
    if (!user || !profile) {
      navigate('/auth');
      return;
    }

    if (!isMKY) {
      navigate('/access-denied');
      return;
    }

    if (profile.role === 'Admin') {
      navigate('/mky-admin');
    } else if (profile.role === 'Staff') {
      navigate('/mky-staff');
    } else {
      navigate('/access-denied');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!profile || !isMKY) return '/';
    
    return profile.role === 'Admin' ? '/mky-admin' : '/mky-staff';
  };

  const getNavigationItems = () => {
    if (!user || !profile) {
      return [
        { href: '/', label: 'Home' },
        { href: '/features', label: 'Features' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/about', label: 'About' },
      ];
    }

    if (profile.role === 'Admin') {
      return [
        { href: '/mky-admin', label: 'Admin Dashboard' },
        { href: '/document-management', label: 'Documents' },
      ];
    } else if (profile.role === 'Staff') {
      return [
        { href: '/mky-staff', label: 'Staff Dashboard' },
        { href: '/document-management', label: 'Documents' },
      ];
    }

    return [];
  };

  return {
    goToDashboard,
    handleSignOut,
    getDashboardPath,
    getNavigationItems,
    user,
    profile,
    isMKY
  };
};