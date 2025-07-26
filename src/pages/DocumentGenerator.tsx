import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText,
  Download,
  Eye,
  LogOut,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import MKYLogo from '@/components/MKYLogo';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  booking_data: any;
  status: string;
  created_at: string;
  task_templates: {
    name: string;
    type: string;
  };
}

interface DocumentTemplate {
  id: string;
  name: string;
  type: string;
}

const DocumentGenerator: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { signOut, profile } = useAuth();
  const { isMKY } = useTenant();
  const { toast } = useToast();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [documentTemplates, setDocumentTemplates] = useState<DocumentTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);

  useEffect(() => {
    if (bookingId) {
      fetchBooking();
      fetchDocumentTemplates();
    }
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          task_templates (name, type)
        `)
        .eq('id', bookingId)
        .single();

      if (error) throw error;
      setBooking(data);
    } catch (error) {
      console.error('Error fetching booking:', error);
      toast({
        title: 'Error',
        description: 'Failed to load booking',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDocumentTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('task_templates')
        .select('*')
        .in('type', ['LABELS', 'BLC', 'DELIVERY_PERMITS'])
        .eq('is_active', true);

      if (error) throw error;
      setDocumentTemplates(data || []);
    } catch (error) {
      console.error('Error fetching document templates:', error);
    }
  };

  const generateDocument = async (templateId: string, templateName: string) => {
    if (!booking) return;

    setGenerating(templateId);
    try {
      // Here you would call your document generation service
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create a simple HTML document preview
      const documentData = {
        bookingId: booking.id,
        templateName,
        clientAddress: booking.booking_data.client_address || 'N/A',
        cargoDescription: booking.booking_data.cargo_description || 'N/A',
        vatId: booking.booking_data.vat_id || 'N/A',
        exporterTaxId: booking.booking_data.exporter_tax_id || 'N/A',
        importerTaxId: booking.booking_data.importer_tax_id || 'N/A',
        units: booking.booking_data.units || 'N/A',
        weightKg: booking.booking_data.weight_kg || 'N/A',
        portOfLoading: booking.booking_data.port_of_loading || 'N/A',
        portOfDischarge: booking.booking_data.port_of_discharge || 'N/A',
        marks: booking.booking_data.marks || 'N/A',
        route: booking.task_templates.name,
        generatedAt: new Date().toLocaleString()
      };

      // Generate and download HTML document
      generateHTMLDocument(documentData, templateName);

      toast({
        title: 'Success',
        description: `${templateName} document generated successfully`,
      });
    } catch (error) {
      console.error('Error generating document:', error);
      toast({
        title: 'Error',
        description: `Failed to generate ${templateName} document`,
        variant: 'destructive',
      });
    } finally {
      setGenerating(null);
    }
  };

  const generateHTMLDocument = (data: any, templateName: string) => {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>${templateName} - ${data.bookingId}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #1e3a8a; padding-bottom: 20px; }
        .company-info { color: #1e3a8a; }
        .section { margin: 20px 0; }
        .field { margin: 10px 0; }
        .label { font-weight: bold; color: #1e3a8a; }
        .value { margin-left: 20px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media print { body { margin: 20px; } }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="company-info">MKY GLOBAL FORWARDING</h1>
        <p>Address: KRZYWDA 19A / 52 NIP 6793324716, TEL. +48578773222<br>
        30-730 KRAKOW, POLAND<br>
        Email: mkyglobalforwarding@gmail.com</p>
        <h2 style="color: #dc2626; margin-top: 20px;">${templateName.toUpperCase()}</h2>
        <p>Generated: ${data.generatedAt} | Booking: ${data.bookingId}</p>
    </div>

    <div class="section">
        <h3>Shipping Route Information</h3>
        <div class="field">
            <span class="label">Route:</span>
            <span class="value">${data.route}</span>
        </div>
    </div>

    <div class="section">
        <h3>Client Information</h3>
        <div class="field">
            <span class="label">Client Address:</span>
            <div class="value">${data.clientAddress.replace(/\\n/g, '<br>')}</div>
        </div>
        <div class="grid">
            <div class="field">
                <span class="label">VAT ID:</span>
                <span class="value">${data.vatId}</span>
            </div>
            <div class="field">
                <span class="label">Exporter Tax ID:</span>
                <span class="value">${data.exporterTaxId}</span>
            </div>
            <div class="field">
                <span class="label">Importer Tax ID:</span>
                <span class="value">${data.importerTaxId}</span>
            </div>
        </div>
    </div>

    <div class="section">
        <h3>Cargo Information</h3>
        <div class="field">
            <span class="label">Cargo Description:</span>
            <div class="value">${data.cargoDescription.replace(/\\n/g, '<br>')}</div>
        </div>
        <div class="grid">
            <div class="field">
                <span class="label">Units:</span>
                <span class="value">${data.units}</span>
            </div>
            <div class="field">
                <span class="label">Weight (kg):</span>
                <span class="value">${data.weightKg}</span>
            </div>
        </div>
        <div class="field">
            <span class="label">Marks:</span>
            <div class="value">${data.marks.replace(/\\n/g, '<br>')}</div>
        </div>
    </div>

    <div class="section">
        <h3>Port Information</h3>
        <div class="grid">
            <div class="field">
                <span class="label">Port of Loading:</span>
                <span class="value">${data.portOfLoading}</span>
            </div>
            <div class="field">
                <span class="label">Port of Discharge:</span>
                <span class="value">${data.portOfDischarge}</span>
            </div>
        </div>
    </div>
</body>
</html>`;

    // Create and download the file
    const blob = new Blob([html], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateName.replace(/\s+/g, '_')}_${data.bookingId.substring(0, 8)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getDashboardUrl = () => {
    if (!isMKY) return '/home';
    
    if (profile?.role === 'Admin') {
      return '/mky-admin';
    } else if (profile?.role === 'Staff') {
      return '/mky-staff';
    }
    return '/home';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Booking not found</p>
            <Button onClick={() => window.location.href = getDashboardUrl()} className="mt-4">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-mky-navy text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MKYLogo variant="text" className="text-white" />
            <Separator orientation="vertical" className="h-6 bg-white/20" />
            <Badge variant="secondary" className="bg-white/10 text-white">
              Generate Documents
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => window.location.href = getDashboardUrl()}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
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
          <h1 className="text-3xl font-bold text-mky-navy mb-2">Generate Documents</h1>
          <p className="text-muted-foreground">
            Generate shipping documents for booking #{booking.id.substring(0, 8)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Information */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
              <CardDescription>
                Data that will be used to generate documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <strong>Route:</strong> {booking.task_templates.name}
              </div>
              <div>
                <strong>Status:</strong> <Badge variant="outline">{booking.status}</Badge>
              </div>
              <div>
                <strong>Created:</strong> {new Date(booking.created_at).toLocaleDateString()}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-medium">Shipping Details:</h4>
                <div className="text-sm space-y-1">
                  <div><strong>Client:</strong> {booking.booking_data.client_address?.split('\\n')[0] || 'N/A'}</div>
                  <div><strong>Cargo:</strong> {booking.booking_data.cargo_description || 'N/A'}</div>
                  <div><strong>Weight:</strong> {booking.booking_data.weight_kg || 'N/A'} kg</div>
                  <div><strong>Units:</strong> {booking.booking_data.units || 'N/A'}</div>
                  <div><strong>From:</strong> {booking.booking_data.port_of_loading || 'N/A'}</div>
                  <div><strong>To:</strong> {booking.booking_data.port_of_discharge || 'N/A'}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Document Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Available Documents</CardTitle>
              <CardDescription>
                Generate documents for this booking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documentTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-mky-navy" />
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {template.type.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => generateDocument(template.id, template.name)}
                      disabled={generating === template.id}
                      className="bg-mky-navy hover:bg-mky-navy/90"
                    >
                      {generating === template.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
              
              {documentTemplates.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No document templates available</p>
                  <p className="text-sm">Create templates in Document Management first</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DocumentGenerator;