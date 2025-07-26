import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Booking {
  id: string;
  user_id: string;
  booking_data: any;
  status: string;
  created_at: string;
  updated_at: string;
  task_template_id: string;
  task_templates?: {
    name: string;
    type: string;
  };
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('bookings')
        .select(`
          *,
          task_templates (
            name,
            type
          )
        `)
        .order('created_at', { ascending: false });

      // Staff can only see their own bookings, Admins see all
      if (profile?.role === 'Staff') {
        query = query.eq('user_id', user?.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch bookings';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData: any, taskTemplateId: string) => {
    try {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          booking_data: bookingData,
          task_template_id: taskTemplateId,
          status: 'Draft'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking created successfully"
      });

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create booking';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Booking status updated to ${status}`
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update booking';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;

    fetchBookings();

    const channel = supabase
      .channel('bookings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings'
        },
        (payload) => {
          console.log('Booking change detected:', payload);
          
          if (payload.eventType === 'INSERT') {
            // Only add if it's the user's booking or if admin
            if (profile?.role === 'Admin' || payload.new.user_id === user.id) {
              fetchBookings(); // Refetch to get complete data with joins
            }
          } else if (payload.eventType === 'UPDATE') {
            // Only update if it's the user's booking or if admin
            if (profile?.role === 'Admin' || payload.new.user_id === user.id) {
              setBookings(prev => 
                prev.map(booking => 
                  booking.id === payload.new.id 
                    ? { ...booking, ...payload.new }
                    : booking
                )
              );
            }
          } else if (payload.eventType === 'DELETE') {
            setBookings(prev => 
              prev.filter(booking => booking.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, profile]);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    updateBookingStatus,
    refetch: fetchBookings
  };
};