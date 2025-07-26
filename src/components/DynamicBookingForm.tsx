import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface TaskTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
}

interface FieldDefinition {
  id: string;
  field_name: string;
  field_label: string;
  field_type: string;
  is_required: boolean;
  field_options: any;
  field_order: number;
}

interface DynamicBookingFormProps {
  onSubmit?: (bookingData: any) => void;
}

const DynamicBookingForm: React.FC<DynamicBookingFormProps> = ({ onSubmit }) => {
  const [taskTemplates, setTaskTemplates] = useState<TaskTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [fieldDefinitions, setFieldDefinitions] = useState<FieldDefinition[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchTaskTemplates();
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      fetchFieldDefinitions(selectedTemplate);
    } else {
      setFieldDefinitions([]);
      setFormData({});
    }
  }, [selectedTemplate]);

  const fetchTaskTemplates = async () => {
    setLoading(true);
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
      toast({
        title: 'Error',
        description: 'Failed to load task templates',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchFieldDefinitions = async (templateId: string) => {
    try {
      const { data, error } = await supabase
        .from('field_definitions')
        .select('*')
        .eq('task_template_id', templateId)
        .order('field_order');

      if (error) throw error;
      setFieldDefinitions(data || []);
      
      // Initialize form data with empty values
      const initialData: Record<string, any> = {};
      data?.forEach(field => {
        initialData[field.field_name] = field.field_type === 'checkbox' ? false : '';
      });
      setFormData(initialData);
    } catch (error) {
      console.error('Error fetching field definitions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load form fields',
        variant: 'destructive',
      });
    }
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const renderField = (field: FieldDefinition) => {
    const value = formData[field.field_name] || '';

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
              onChange={(e) => handleFieldChange(field.field_name, e.target.value)}
              required={field.is_required}
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
              onChange={(e) => handleFieldChange(field.field_name, e.target.value)}
              required={field.is_required}
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
                  onSelect={(date) => handleFieldChange(field.field_name, date?.toISOString().split('T')[0])}
                  initialFocus
                  className="p-3 pointer-events-auto"
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
            <Select value={value} onValueChange={(val) => handleFieldChange(field.field_name, val)}>
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
              onCheckedChange={(checked) => handleFieldChange(field.field_name, checked)}
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedTemplate) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          task_template_id: selectedTemplate,
          user_id: user.id,
          booking_data: formData,
          status: 'Submitted'
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Booking submitted successfully',
      });

      // Reset form
      setSelectedTemplate('');
      setFormData({});
      
      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error) {
      console.error('Error saving booking:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit booking',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Booking Form</CardTitle>
        <CardDescription>
          Select a shipping route and fill out the required information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Template Selection */}
          <div className="space-y-2">
            <Label>Shipping Route *</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select a shipping route" />
              </SelectTrigger>
              <SelectContent>
                {taskTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Standard Shipping Fields */}
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Standard Shipping Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client_address">Client Address *</Label>
                    <Textarea
                      id="client_address"
                      value={formData.client_address || ''}
                      onChange={(e) => handleFieldChange('client_address', e.target.value)}
                      placeholder="Enter client's full address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cargo_description">Cargo Description *</Label>
                    <Textarea
                      id="cargo_description"
                      value={formData.cargo_description || ''}
                      onChange={(e) => handleFieldChange('cargo_description', e.target.value)}
                      placeholder="Describe the cargo being shipped"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vat_id">VAT ID</Label>
                    <Input
                      id="vat_id"
                      value={formData.vat_id || ''}
                      onChange={(e) => handleFieldChange('vat_id', e.target.value)}
                      placeholder="Enter VAT ID"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exporter_tax_id">Exporter Tax ID</Label>
                    <Input
                      id="exporter_tax_id"
                      value={formData.exporter_tax_id || ''}
                      onChange={(e) => handleFieldChange('exporter_tax_id', e.target.value)}
                      placeholder="Enter exporter tax ID"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="importer_tax_id">Importer Tax ID</Label>
                    <Input
                      id="importer_tax_id"
                      value={formData.importer_tax_id || ''}
                      onChange={(e) => handleFieldChange('importer_tax_id', e.target.value)}
                      placeholder="Enter importer tax ID"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="units">Units *</Label>
                    <Input
                      id="units"
                      type="number"
                      value={formData.units || ''}
                      onChange={(e) => handleFieldChange('units', e.target.value)}
                      placeholder="Number of units"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight_kg">Weight (kg) *</Label>
                    <Input
                      id="weight_kg"
                      type="number"
                      step="0.01"
                      value={formData.weight_kg || ''}
                      onChange={(e) => handleFieldChange('weight_kg', e.target.value)}
                      placeholder="Weight in kilograms"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="port_of_loading">Port of Loading *</Label>
                    <Input
                      id="port_of_loading"
                      value={formData.port_of_loading || ''}
                      onChange={(e) => handleFieldChange('port_of_loading', e.target.value)}
                      placeholder="Enter port of loading"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="port_of_discharge">Port of Discharge *</Label>
                    <Input
                      id="port_of_discharge"
                      value={formData.port_of_discharge || ''}
                      onChange={(e) => handleFieldChange('port_of_discharge', e.target.value)}
                      placeholder="Enter port of discharge"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="marks">Marks</Label>
                    <Textarea
                      id="marks"
                      value={formData.marks || ''}
                      onChange={(e) => handleFieldChange('marks', e.target.value)}
                      placeholder="Enter cargo marks and numbers"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Fields */}
          {fieldDefinitions.length > 0 && (
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Additional Route-Specific Details</h3>
                {fieldDefinitions.map(renderField)}
              </div>
            </div>
          )}

          {/* Submit Button */}
          {selectedTemplate && (
            <Button 
              type="submit" 
              className="w-full" 
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Booking'
              )}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default DynamicBookingForm;