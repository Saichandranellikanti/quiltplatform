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
  const { user, profile, signOut } = useAuth();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/use-cases', label: 'Use Cases' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/for-teams', label: 'For Teams' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' }
  ];

  const staffNavItems = [
    { href: '/mky-staff', label: 'Dashboard' },
    { href: '/document-management', label: 'Document Management' }
  ];

  const adminNavItems = [
    { href: '/mky-admin', label: 'Admin Dashboard' },
    { href: '/document-management', label: 'Document Management' }
  ];

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/auth';
  };

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      {profile?.status === 'Inactive' && (
        <Alert variant="destructive" className="rounded-none border-x-0 border-t-0">
          <AlertDescription>
            Your account is inactive. Please contact admin.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <QuiltLogo variant="text" size="sm" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActivePath(item.href) 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button asChild variant="default">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                    isActivePath(item.href) 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <div className="border-t border-border pt-4">
                  <div className="flex items-center px-3 py-2">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleSignOut} className="w-full justify-start">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="border-t border-border pt-4">
                  <Button asChild variant="default" className="w-full">
                    <Link to="/auth">Sign In</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;