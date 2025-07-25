import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import MKYLogo from '@/components/MKYLogo';
import { useAuth } from '@/hooks/useAuth';
import DynamicBookingForm from '@/components/DynamicBookingForm';

const MKYStaffDashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* MKY Header */}
      <header className="bg-mky-navy text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MKYLogo variant="text" className="text-white" />
            <Separator orientation="vertical" className="h-6 bg-white/20" />
            <Badge variant="secondary" className="bg-white/10 text-white">
              Staff
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Staff | MKY Global Forwarding</span>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-white hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-mky-navy mb-2">MKY Staff Dashboard</h1>
          <p className="text-muted-foreground">
            Create new bookings for different shipping routes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dynamic Booking Form */}
          <div className="lg:col-span-2">
            <DynamicBookingForm />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-3">Available Routes</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>GRIMALDI Valencia</span>
                  <span className="text-muted-foreground">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ORIENT Hamburg</span>
                  <span className="text-muted-foreground">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ORIENT Antwerp</span>
                  <span className="text-muted-foreground">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>No recent bookings</p>
                <p>Submit your first booking using the form</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MKYStaffDashboard;