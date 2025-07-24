import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import QuiltLogo from '@/components/QuiltLogo';
import { useAuth } from '@/hooks/useAuth';

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleBackToLogin = async () => {
    try {
      // Sign out the current user first
      await signOut();
      // Then navigate to auth page
      navigate('/auth');
    } catch (error) {
      // Fallback navigation
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <QuiltLogo variant="text" size="md" />
          </div>
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Access Denied</CardTitle>
          <CardDescription>
            You don't have permission to access this application. Please contact your administrator.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleBackToLogin} variant="outline" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessDenied;