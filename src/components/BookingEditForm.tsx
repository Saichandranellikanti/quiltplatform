import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTaskTemplates } from '@/hooks/useTaskTemplates';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import type { Booking } from '@/hooks/useBookings';

interface BookingEditFormProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const BookingEditForm: React.FC<BookingEditFormProps> = ({
  booking,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    status: '',
    task_template_id: '',
    booking_data: {} as any
  });
  const { templates: taskTemplates } = useTaskTemplates();
  const { toast } = useToast();

  // Reset form when booking changes
  useEffect(() => {
    if (booking) {
      setFormData({
        status: booking.status,
        task_template_id: booking.task_template_id,
        booking_data: booking.booking_data || {}
      });
    }
  }, [booking]);

  const handleSave = async () => {
    if (!booking) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from('bookings')
        .update({
          status: formData.status,
          task_template_id: formData.task_template_id,
          booking_data: formData.booking_data,
          updated_at: new Date().toISOString()
        })
        .eq('id', booking.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking updated successfully"
      });

      onSuccess();
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update booking';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookingDataChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      booking_data: {
        ...prev.booking_data,
        [field]: value
      }
    }));
  };

  const statusOptions = [
    'Draft',
    'Submitted',
    'In Progress',
    'Completed',
    'Cancelled'
  ];

  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Task Template */}
          <div className="space-y-2">
            <Label htmlFor="task_template">Task Template</Label>
            <Select 
              value={formData.task_template_id} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, task_template_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                {taskTemplates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name} ({template.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Booking Data Fields */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Booking Details</Label>
            
            {/* Common booking fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shipper">Shipper</Label>
                <Input
                  id="shipper"
                  value={formData.booking_data.shipper || ''}
                  onChange={(e) => handleBookingDataChange('shipper', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="consignee">Consignee</Label>
                <Input
                  id="consignee"
                  value={formData.booking_data.consignee || ''}
                  onChange={(e) => handleBookingDataChange('consignee', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  value={formData.booking_data.origin || ''}
                  onChange={(e) => handleBookingDataChange('origin', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  value={formData.booking_data.destination || ''}
                  onChange={(e) => handleBookingDataChange('destination', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shipment_type">Shipment Type</Label>
                <Input
                  id="shipment_type"
                  value={formData.booking_data.shipment_type || ''}
                  onChange={(e) => handleBookingDataChange('shipment_type', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="container_type">Container Type</Label>
                <Input
                  id="container_type"
                  value={formData.booking_data.container_type || ''}
                  onChange={(e) => handleBookingDataChange('container_type', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  value={formData.booking_data.weight || ''}
                  onChange={(e) => handleBookingDataChange('weight', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="volume">Volume</Label>
                <Input
                  id="volume"
                  value={formData.booking_data.volume || ''}
                  onChange={(e) => handleBookingDataChange('volume', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.booking_data.description || ''}
                onChange={(e) => handleBookingDataChange('description', e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="special_instructions">Special Instructions</Label>
              <Textarea
                id="special_instructions"
                value={formData.booking_data.special_instructions || ''}
                onChange={(e) => handleBookingDataChange('special_instructions', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? <LoadingSpinner /> : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};