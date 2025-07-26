import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'booking' | 'system' | 'alert';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  // Listen for new bookings and create notifications
  useEffect(() => {
    const channel = supabase
      .channel('booking-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bookings'
        },
        (payload) => {
          const newNotification: Notification = {
            id: `booking-${payload.new.id}`,
            type: 'booking',
            title: 'New Booking Created',
            message: `A new booking has been created with status: ${payload.new.status}`,
            read: false,
            created_at: new Date().toISOString(),
          };
          
          setNotifications(prev => [newNotification, ...prev]);
          
          toast({
            title: "New Booking",
            description: "A new booking has been created",
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings'
        },
        (payload) => {
          if (payload.old.status !== payload.new.status) {
            const newNotification: Notification = {
              id: `booking-update-${payload.new.id}-${Date.now()}`,
              type: 'booking',
              title: 'Booking Status Updated',
              message: `Booking status changed from ${payload.old.status} to ${payload.new.status}`,
              read: false,
              created_at: new Date().toISOString(),
            };
            
            setNotifications(prev => [newNotification, ...prev]);
            
            toast({
              title: "Booking Updated",
              description: `Status changed to ${payload.new.status}`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'created_at'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `manual-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
  };
};