import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import QuiltLogo from './QuiltLogo';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription } from './ui/alert';
const Header: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    user,
    profile,
    signOut
  } = useAuth();
  const navItems = [{
    href: '/',
    label: 'Home'
  }, {
    href: '/features',
    label: 'Features'
  }, {
    href: '/use-cases',
    label: 'Use Cases'
  }, {
    href: '/how-it-works',
    label: 'How It Works'
  }, {
    href: '/for-teams',
    label: 'For Teams'
  }, {
    href: '/pricing',
    label: 'Pricing'
  }, {
    href: '/about',
    label: 'About'
  }];
  const staffNavItems = [{
    href: '/mky-staff',
    label: 'Dashboard'
  }, {
    href: '/document-management',
    label: 'Document Management'
  }];
  const adminNavItems = [{
    href: '/mky-admin',
    label: 'Admin Dashboard'
  }, {
    href: '/document-management',
    label: 'Document Management'
  }];
  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/auth';
  };
  return <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      {profile?.status === 'Inactive' && <Alert variant="destructive" className="rounded-none border-x-0 border-t-0">
          <AlertDescription>
            Your account is inactive. Please contact admin.
          </AlertDescription>
        </Alert>}
      
    </header>;
};
export default Header;