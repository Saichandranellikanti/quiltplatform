import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut } from 'lucide-react';
import MKYLogo from '@/components/MKYLogo';
import { useAuth } from '@/hooks/useAuth';
import DynamicBookingForm from '@/components/DynamicBookingForm';
import { supabase } from '@/integrations/supabase/client';

const MKYStaffDashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [taskTemplates, setTaskTemplates] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchBookings();
      fetchTaskTemplates();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          task_templates (name)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchTaskTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('task_templates')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setTaskTemplates(data || []);
    } catch (error) {
      console.error('Error fetching task templates:', error);
    }
  };

  const handleBookingSubmit = () => {
    // Refresh bookings when a new one is submitted
    fetchBookings();
  };

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
            <DynamicBookingForm onSubmit={handleBookingSubmit} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-3">Available Routes</h3>
              <div className="space-y-2 text-sm">
                {taskTemplates.slice(0, 5).map((template) => (
                  <div key={template.id} className="flex items-center justify-between">
                    <span>{template.name}</span>
                    <span className="text-muted-foreground">Active</span>
                  </div>
                ))}
                {taskTemplates.length === 0 && (
                  <p className="text-muted-foreground">Loading routes...</p>
                )}
              </div>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-3">Recent Bookings</h3>
              <div className="space-y-3">
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <div key={booking.id} className="border-b pb-2 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{booking.task_templates?.name}</span>
                        <Badge variant={booking.status === 'Submitted' ? 'default' : 'secondary'} className="text-xs">
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.created_at).toLocaleDateString()} at{' '}
                        {new Date(booking.created_at).toLocaleTimeString()}
                      </p>
                      {booking.booking_data?.client_name && (
                        <p className="text-xs text-muted-foreground">
                          Client: {booking.booking_data.client_name}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">
                    <p>No recent bookings</p>
                    <p>Submit your first booking using the form</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MKYStaffDashboard;