import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus,
  FileText, 
  Ship, 
  Truck,
  LogOut,
  Save,
  ArrowLeft,
  Trash2
} from 'lucide-react';
import MKYLogo from '@/components/MKYLogo';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DocumentTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  is_active: boolean;
}

interface FieldDefinition {
  id: string;
  field_name: string;
  field_label: string;
  field_type: string;
  is_required: boolean;
  field_order: number;
  field_options?: any;
}

const DocumentFieldsConfig: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const { signOut } = useAuth();
  const { toast } = useToast();
  const [template, setTemplate] = useState<DocumentTemplate | null>(null);
  const [fields, setFields] = useState<FieldDefinition[]>([]);
  const [newField, setNewField] = useState({
    field_name: '',
    field_label: '',
    field_type: 'text',
    is_required: false
  });
  const [isAddingField, setIsAddingField] = useState(false);

  const fieldTypes = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'select', label: 'Dropdown' },
    // Auto-populated fields from booking data
    { value: 'auto_booking_code', label: 'Auto: Booking Code' },
    { value: 'auto_client_name', label: 'Auto: Client Name' },
    { value: 'auto_route', label: 'Auto: Shipping Route' },
    { value: 'auto_vessel_details', label: 'Auto: Vessel Details' },
    { value: 'auto_cargo_info', label: 'Auto: Cargo Information' },
    // Predefined shipping fields
    { value: 'client_address', label: 'Client Address' },
    { value: 'vat_id', label: 'VAT ID' },
    { value: 'exporter_tax_id', label: 'Exporter Tax ID' },
    { value: 'importer_tax_id', label: 'Importer Tax ID' },
    { value: 'cargo_description', label: 'Cargo Description' },
    { value: 'units', label: 'Units' },
    { value: 'weight_kg', label: 'Weight (kg)' },
    { value: 'port_of_loading', label: 'Port of Loading' },
    { value: 'port_of_discharge', label: 'Port of Discharge' },
    { value: 'marks', label: 'Marks' }
  ];

  const documentTypes = {
    'LABELS': { label: 'Labels', icon: FileText, color: 'bg-blue-100 text-blue-700' },
    'BLC': { label: 'BLC (Bill of Lading Copy)', icon: Ship, color: 'bg-green-100 text-green-700' },
    'DELIVERY_PERMITS': { label: 'Delivery Permits', icon: Truck, color: 'bg-orange-100 text-orange-700' }
  };

  useEffect(() => {
    if (templateId) {
      fetchTemplate();
      fetchFields();
    }
  }, [templateId]);

  const fetchTemplate = async () => {
    try {
      const { data, error } = await supabase
        .from('task_templates')
        .select('*')
        .eq('id', templateId)
        .single();

      if (error) throw error;
      setTemplate(data);
    } catch (error) {
      console.error('Error fetching template:', error);
      toast({
        title: 'Error',
        description: 'Failed to load template',
        variant: 'destructive',
      });
    }
  };

  const fetchFields = async () => {
    try {
      const { data, error } = await supabase
        .from('field_definitions')
        .select('*')
        .eq('task_template_id', templateId)
        .order('field_order', { ascending: true });

      if (error) throw error;
      setFields(data || []);
    } catch (error) {
      console.error('Error fetching fields:', error);
      toast({
        title: 'Error',
        description: 'Failed to load fields',
        variant: 'destructive',
      });
    }
  };

  const handleAddField = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newField.field_name.trim() || !newField.field_label.trim()) return;

    try {
      const { error } = await supabase
        .from('field_definitions')
        .insert({
          task_template_id: templateId,
          field_name: newField.field_name,
          field_label: newField.field_label,
          field_type: newField.field_type as any,
          is_required: newField.is_required,
          field_order: fields.length
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Field added successfully',
      });

      setNewField({ field_name: '', field_label: '', field_type: 'text', is_required: false });
      setIsAddingField(false);
      fetchFields();
    } catch (error) {
      console.error('Error adding field:', error);
      toast({
        title: 'Error',
        description: 'Failed to add field',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteField = async (fieldId: string) => {
    try {
      const { error } = await supabase
        .from('field_definitions')
        .delete()
        .eq('id', fieldId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Field deleted successfully',
      });

      fetchFields();
    } catch (error) {
      console.error('Error deleting field:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete field',
        variant: 'destructive',
      });
    }
  };

  if (!template) {
    return <div>Loading...</div>;
  }

  const typeDetails = documentTypes[template.type as keyof typeof documentTypes];
  const Icon = typeDetails?.icon || FileText;

  return (
    <div className="min-h-screen bg-background">
      {/* MKY Header */}
      <header className="bg-mky-navy text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MKYLogo variant="text" className="text-white" />
            <Separator orientation="vertical" className="h-6 bg-white/20" />
            <Badge variant="secondary" className="bg-white/10 text-white">
              Configure Fields: {template.name}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => window.location.href = '/document-management'}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Templates
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-white hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded ${typeDetails?.color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-mky-navy">{template.name}</h1>
              <p className="text-muted-foreground">
                Configure fields for {typeDetails?.label} document generation
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Field */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-mky-navy" />
                  Add Field
                </CardTitle>
                <CardDescription>
                  Add a new field to this document template
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isAddingField ? (
                  <Button 
                    onClick={() => setIsAddingField(true)}
                    className="w-full bg-mky-navy hover:bg-mky-navy/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Field
                  </Button>
                ) : (
                  <form onSubmit={handleAddField} className="space-y-4">
                    <div>
                      <Label htmlFor="field_name">Field Name *</Label>
                      <Input
                        id="field_name"
                        value={newField.field_name}
                        onChange={(e) => setNewField(prev => ({ ...prev, field_name: e.target.value }))}
                        placeholder="e.g., vessel_name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="field_label">Field Label *</Label>
                      <Input
                        id="field_label"
                        value={newField.field_label}
                        onChange={(e) => setNewField(prev => ({ ...prev, field_label: e.target.value }))}
                        placeholder="e.g., Vessel Name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="field_type">Field Type</Label>
                      <Select 
                        value={newField.field_type}
                        onValueChange={(value) => setNewField(prev => ({ ...prev, field_type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="is_required"
                        checked={newField.is_required}
                        onChange={(e) => setNewField(prev => ({ ...prev, is_required: e.target.checked }))}
                      />
                      <Label htmlFor="is_required">Required field</Label>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1 bg-mky-navy hover:bg-mky-navy/90">
                        <Save className="h-4 w-4 mr-2" />
                        Add Field
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setIsAddingField(false);
                          setNewField({ field_name: '', field_label: '', field_type: 'text', is_required: false });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Existing Fields */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Document Fields ({fields.length})</CardTitle>
                <CardDescription>
                  Fields that will be included in the generated document
                </CardDescription>
              </CardHeader>
              <CardContent>
                {fields.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Field Name</TableHead>
                        <TableHead>Label</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Required</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fields.map((field) => (
                        <TableRow key={field.id}>
                          <TableCell className="font-mono text-sm">{field.field_name}</TableCell>
                          <TableCell className="font-medium">{field.field_label}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {fieldTypes.find(t => t.value === field.field_type)?.label || field.field_type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={field.is_required ? 'destructive' : 'secondary'}>
                              {field.is_required ? 'Required' : 'Optional'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteField(field.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No fields configured yet</p>
                    <p className="text-sm">Add fields to define what data will be included in the document</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentFieldsConfig;
