import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus,
  FileText, 
  Ship, 
  Truck,
  LogOut,
  Edit,
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
  created_at: string;
}

const DocumentManagement: React.FC = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    type: 'LABELS',
    description: ''
  });

  const documentTypes = [
    { value: 'LABELS', label: 'Labels', icon: FileText, color: 'bg-blue-100 text-blue-700' },
    { value: 'BLC', label: 'BLC (Bill of Lading Copy)', icon: Ship, color: 'bg-green-100 text-green-700' },
    { value: 'DELIVERY_PERMITS', label: 'Delivery Permits', icon: Truck, color: 'bg-orange-100 text-orange-700' }
  ];

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('task_templates')
        .select('*')
        .in('type', ['LABELS', 'BLC', 'DELIVERY_PERMITS'] as any)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: 'Error',
        description: 'Failed to load document templates',
        variant: 'destructive',
      });
    }
  };

  const handleCreateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplate.name.trim()) return;

    try {
      const { error } = await supabase
        .from('task_templates')
        .insert({
          name: newTemplate.name,
          type: newTemplate.type as any,
          description: newTemplate.description,
          is_active: true
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Document template created successfully',
      });

      setNewTemplate({ name: '', type: 'LABELS', description: '' });
      setIsCreating(false);
      fetchTemplates();
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: 'Error',
        description: 'Failed to create document template',
        variant: 'destructive',
      });
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('task_templates')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      fetchTemplates();
      toast({
        title: 'Success',
        description: `Template ${!currentStatus ? 'activated' : 'deactivated'}`,
      });
    } catch (error) {
      console.error('Error updating template:', error);
      toast({
        title: 'Error',
        description: 'Failed to update template',
        variant: 'destructive',
      });
    }
  };

  const getTypeDetails = (type: string) => {
    return documentTypes.find(dt => dt.value === type) || documentTypes[0];
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
              Document Management
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => window.location.href = '/mky-admin'}
              className="text-white hover:bg-white/10"
            >
              Back to Admin
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
          <h1 className="text-3xl font-bold text-mky-navy mb-2">Document Template Management</h1>
          <p className="text-muted-foreground">
            Create and manage Labels, BLC, and Delivery Permits templates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create New Template */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-mky-navy" />
                  Create New Template
                </CardTitle>
                <CardDescription>
                  Add a new document template
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isCreating ? (
                  <div className="space-y-4">
                    {documentTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <Card key={type.value} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div 
                              className="flex items-center gap-3"
                              onClick={() => {
                                setNewTemplate(prev => ({ ...prev, type: type.value }));
                                setIsCreating(true);
                              }}
                            >
                              <div className={`p-2 rounded ${type.color}`}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <h4 className="font-medium">{type.label}</h4>
                                <p className="text-xs text-muted-foreground">
                                  Create {type.label.toLowerCase()} template
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <form onSubmit={handleCreateTemplate} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Template Name *</Label>
                      <Input
                        id="name"
                        value={newTemplate.name}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter template name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="type">Document Type</Label>
                      <select 
                        id="type"
                        value={newTemplate.type}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-mky-navy focus:border-mky-navy"
                      >
                        {documentTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newTemplate.description}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter template description"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1 bg-mky-navy hover:bg-mky-navy/90">
                        Create Template
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setIsCreating(false);
                          setNewTemplate({ name: '', type: 'LABELS', description: '' });
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

          {/* Existing Templates */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Existing Document Templates ({templates.length})</CardTitle>
                <CardDescription>
                  Manage your document templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {templates.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {templates.map((template) => {
                        const typeDetails = getTypeDetails(template.type);
                        const Icon = typeDetails.icon;
                        return (
                          <TableRow key={template.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className={`p-1 rounded ${typeDetails.color}`}>
                                  <Icon className="h-3 w-3" />
                                </div>
                                <span className="text-sm">{typeDetails.label}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{template.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {template.description || 'No description'}
                            </TableCell>
                            <TableCell>
                              <Badge variant={template.is_active ? 'default' : 'secondary'}>
                                {template.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleToggleActive(template.id, template.is_active)}
                                >
                                  {template.is_active ? 'Deactivate' : 'Activate'}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No document templates created yet</p>
                    <p className="text-sm">Create your first Labels, BLC, or Delivery Permits template</p>
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

export default DocumentManagement;
