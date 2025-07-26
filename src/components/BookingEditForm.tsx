import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useTaskTemplates } from '@/hooks/useTaskTemplates';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import type { Booking } from '@/hooks/useBookings';

interface FieldDefinition {
  id: string;
  field_name: string;
  field_label: string;
  field_type: string;
  is_required: boolean;
  field_options: any;
  field_order: number;
}

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
  const [fetchingFields, setFetchingFields] = useState(false);
  const [fieldDefinitions, setFieldDefinitions] = useState<FieldDefinition[]>([]);
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
      
      // Fetch field definitions for this template
      fetchFieldDefinitions(booking.task_template_id);
    }
  }, [booking]);

  const fetchFieldDefinitions = async (templateId: string) => {
    try {
      setFetchingFields(true);
      const { data, error } = await supabase
        .from('field_definitions')
        .select('*')
        .eq('task_template_id', templateId)
        .order('field_order');

      if (error) throw error;
      setFieldDefinitions(data || []);
    } catch (err) {
      console.error('Error fetching field definitions:', err);
    } finally {
      setFetchingFields(false);
    }
  };

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

  const renderField = (field: FieldDefinition) => {
    const value = formData.booking_data[field.field_name] || '';

    switch (field.field_type) {
      case 'text':
      case 'number':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.field_name}>
              {field.field_label}
              {field.is_required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={field.field_name}
              type={field.field_type}
              value={value}
              onChange={(e) => handleBookingDataChange(field.field_name, e.target.value)}
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.field_name}>
              {field.field_label}
              {field.is_required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Textarea
              id={field.field_name}
              value={value}
              onChange={(e) => handleBookingDataChange(field.field_name, e.target.value)}
            />
          </div>
        );

      case 'date':
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.field_label}
              {field.is_required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {value ? format(new Date(value), "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  onSelect={(date) => handleBookingDataChange(field.field_name, date?.toISOString().split('T')[0])}
                  initialFocus
                  className="p-3"
                />
              </PopoverContent>
            </Popover>
          </div>
        );

      case 'select':
        const options = Array.isArray(field.field_options) ? field.field_options : ['No options available'];
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.field_label}
              {field.is_required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Select value={value} onValueChange={(val) => handleBookingDataChange(field.field_name, val)}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${field.field_label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <Checkbox
              id={field.field_name}
              checked={value}
              onCheckedChange={(checked) => handleBookingDataChange(field.field_name, checked)}
            />
            <Label htmlFor={field.field_name}>
              {field.field_label}
            </Label>
          </div>
        );

      default:
        return null;
    }
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
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, task_template_id: value }));
                fetchFieldDefinitions(value);
              }}
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

          {/* Standard Shipping Fields */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Standard Shipping Information</Label>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client_address">Client Address *</Label>
                <Textarea
                  id="client_address"
                  value={formData.booking_data.client_address || ''}
                  onChange={(e) => handleBookingDataChange('client_address', e.target.value)}
                  placeholder="Enter client's full address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cargo_description">Cargo Description *</Label>
                <Textarea
                  id="cargo_description"
                  value={formData.booking_data.cargo_description || ''}
                  onChange={(e) => handleBookingDataChange('cargo_description', e.target.value)}
                  placeholder="Describe the cargo being shipped"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vat_id">VAT ID</Label>
                <Input
                  id="vat_id"
                  value={formData.booking_data.vat_id || ''}
                  onChange={(e) => handleBookingDataChange('vat_id', e.target.value)}
                  placeholder="Enter VAT ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exporter_tax_id">Exporter Tax ID</Label>
                <Input
                  id="exporter_tax_id"
                  value={formData.booking_data.exporter_tax_id || ''}
                  onChange={(e) => handleBookingDataChange('exporter_tax_id', e.target.value)}
                  placeholder="Enter exporter tax ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="importer_tax_id">Importer Tax ID</Label>
                <Input
                  id="importer_tax_id"
                  value={formData.booking_data.importer_tax_id || ''}
                  onChange={(e) => handleBookingDataChange('importer_tax_id', e.target.value)}
                  placeholder="Enter importer tax ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="units">Units *</Label>
                <Input
                  id="units"
                  type="number"
                  value={formData.booking_data.units || ''}
                  onChange={(e) => handleBookingDataChange('units', e.target.value)}
                  placeholder="Number of units"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight_kg">Weight (kg) *</Label>
                <Input
                  id="weight_kg"
                  type="number"
                  step="0.01"
                  value={formData.booking_data.weight_kg || ''}
                  onChange={(e) => handleBookingDataChange('weight_kg', e.target.value)}
                  placeholder="Weight in kilograms"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="port_of_loading">Port of Loading *</Label>
                <Input
                  id="port_of_loading"
                  value={formData.booking_data.port_of_loading || ''}
                  onChange={(e) => handleBookingDataChange('port_of_loading', e.target.value)}
                  placeholder="Enter port of loading"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="port_of_discharge">Port of Discharge *</Label>
                <Input
                  id="port_of_discharge"
                  value={formData.booking_data.port_of_discharge || ''}
                  onChange={(e) => handleBookingDataChange('port_of_discharge', e.target.value)}
                  placeholder="Enter port of discharge"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="marks">Marks</Label>
              <Textarea
                id="marks"
                value={formData.booking_data.marks || ''}
                onChange={(e) => handleBookingDataChange('marks', e.target.value)}
                placeholder="Enter cargo marks and numbers"
              />
            </div>
          </div>

          {/* Dynamic Fields */}
          {fetchingFields ? (
            <div className="flex items-center justify-center py-4">
              <LoadingSpinner />
              <span className="ml-2">Loading additional fields...</span>
            </div>
          ) : fieldDefinitions.length > 0 && (
            <div className="space-y-4">
              <Label className="text-base font-semibold">Additional Route-Specific Details</Label>
              {fieldDefinitions.map(renderField)}
            </div>
          )}

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