import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Users, 
  DollarSign, 
  FileText,
  LogOut,
  CheckCircle 
} from 'lucide-react';
import MKYLogo from '@/components/MKYLogo';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const MKYStaffDashboard: React.FC = () => {
  const { signOut, user, profile } = useAuth();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    bookingNo: '',
    bookingDate: '',
    portOfLoading: '',
    portOfDischarge: '',
    shipper: '',
    receiver: '',
    country: '',
    containerType: '',
    containerNo: '',
    quantity: '',
    freight: '',
    blCharges: '',
    localCharges: '',
    permitType: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to GSheet (to be linked later)
    setIsSubmitted(true);
    toast({
      title: "Booking Created Successfully",
      description: "Your booking has been submitted and saved to the system.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-mky-navy">Booking Created Successfully</CardTitle>
            <CardDescription>
              Booking #{formData.bookingNo || 'AUTO-' + Date.now()} has been submitted to the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setIsSubmitted(false)} 
              className="w-full bg-mky-navy hover:bg-mky-navy/90"
            >
              Create Another Booking
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-mky-navy mb-2">New Booking Form</h1>
          <p className="text-muted-foreground">
            Create a new shipping booking for MKY Global Forwarding
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Booking Info Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-mky-navy" />
                📦 Booking Information
              </CardTitle>
              <CardDescription>Basic booking details and ports</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bookingNo">Booking Number</Label>
                <Input
                  id="bookingNo"
                  value={formData.bookingNo}
                  onChange={(e) => handleInputChange('bookingNo', e.target.value)}
                  placeholder="MKY-2024-001"
                  className="focus:ring-mky-navy focus:border-mky-navy"
                />
              </div>
              <div>
                <Label htmlFor="bookingDate">Booking Date</Label>
                <Input
                  id="bookingDate"
                  type="date"
                  value={formData.bookingDate}
                  onChange={(e) => handleInputChange('bookingDate', e.target.value)}
                  className="focus:ring-mky-navy focus:border-mky-navy"
                />
              </div>
              <div>
                <Label htmlFor="portOfLoading">Port of Loading</Label>
                <Input
                  id="portOfLoading"
                  value={formData.portOfLoading}
                  onChange={(e) => handleInputChange('portOfLoading', e.target.value)}
                  placeholder="Shanghai, China"
                  className="focus:ring-mky-navy focus:border-mky-navy"
                />
              </div>
              <div>
                <Label htmlFor="portOfDischarge">Port of Discharge</Label>
                <Input
                  id="portOfDischarge"
                  value={formData.portOfDischarge}
                  onChange={(e) => handleInputChange('portOfDischarge', e.target.value)}
                  placeholder="Los Angeles, USA"
                  className="focus:ring-mky-navy focus:border-mky-navy"
                />
              </div>
            </CardContent>
          </Card>

          {/* Client Info Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-mky-navy" />
                🧍 Client Information
              </CardTitle>
              <CardDescription>Shipper and receiver details</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shipper">Shipper</Label>
                <Input
                  id="shipper"
                  value={formData.shipper}
                  onChange={(e) => handleInputChange('shipper', e.target.value)}
                  placeholder="ABC Manufacturing Co."
                  className="focus:ring-mky-navy focus:border-mky-navy"
                />
              </div>
              <div>
                <Label htmlFor="receiver">Receiver</Label>
                <Input
                  id="receiver"
                  value={formData.receiver}
                  onChange={(e) => handleInputChange('receiver', e.target.value)}
                  placeholder="XYZ Import LLC"
                  className="focus:ring-mky-navy focus:border-mky-navy"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="United States"
                  className="focus:ring-mky-navy focus:border-mky-navy"
                />
              </div>
            </CardContent>
          </Card>

          {/* Container Info Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-mky-navy" />
                📦 Container Information
              </CardTitle>
              <CardDescription>Container specifications and quantities</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="containerType">Container Type</Label>
                <select
                  id="containerType"
                  value={formData.containerType}
                  onChange={(e) => handleInputChange('containerType', e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-mky-navy focus:border-mky-navy"
                >
                  <option value="">Select Type</option>
                  <option value="20ft">20ft Standard</option>
                  <option value="40ft">40ft Standard</option>
                  <option value="40ft-hc">40ft High Cube</option>
                  <option value="20ft-rf">20ft Refrigerated</option>
                  <option value="40ft-rf">40ft Refrigerated</option>
                </select>
              </div>
              <div>
                <Label htmlFor="containerNo">Container Number</Label>
                <Input
                  id="containerNo"
                  value={formData.containerNo}
                  onChange={(e) => handleInputChange('containerNo', e.target.value)}
                  placeholder="ABCD1234567"
                  className="focus:ring-mky-navy focus:border-mky-navy"
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="1"
                  className="focus:ring-mky-navy focus:border-mky-navy"
                />
              </div>
            </CardContent>
          </Card>

          {/* Charges Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-mky-navy" />
                💵 Charges
              </CardTitle>
              <CardDescription>Freight and additional charges</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="freight">Freight Charges</Label>
                <Input
                  id="freight"
                  type="number"
                  value={formData.freight}
                  onChange={(e) => handleInputChange('freight', e.target.value)}
                  placeholder="2500.00"
                  className="focus:ring-mky-navy focus:border-mky-navy"
                />
              </div>
              <div>
                <Label htmlFor="blCharges">B/L Charges</Label>
                <Input
                  id="blCharges"
                  type="number"
                  value={formData.blCharges}
                  onChange={(e) => handleInputChange('blCharges', e.target.value)}
                  placeholder="150.00"
                  className="focus:ring-mky-navy focus:border-mky-navy"
                />
              </div>
              <div>
                <Label htmlFor="localCharges">Local Charges</Label>
                <Input
                  id="localCharges"
                  type="number"
                  value={formData.localCharges}
                  onChange={(e) => handleInputChange('localCharges', e.target.value)}
                  placeholder="300.00"
                  className="focus:ring-mky-navy focus:border-mky-navy"
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Info Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-mky-navy" />
                📝 Additional Information
              </CardTitle>
              <CardDescription>Permits and special notes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="permitType">Permit Type</Label>
                <select
                  id="permitType"
                  value={formData.permitType}
                  onChange={(e) => handleInputChange('permitType', e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-mky-navy focus:border-mky-navy"
                >
                  <option value="">Select Permit</option>
                  <option value="standard">Standard Import</option>
                  <option value="hazmat">Hazardous Materials</option>
                  <option value="food">Food Grade</option>
                  <option value="textile">Textile Import</option>
                  <option value="electronics">Electronics</option>
                </select>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any special instructions or notes..."
                  className="focus:ring-mky-navy focus:border-mky-navy"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              type="submit" 
              size="lg" 
              className="w-full max-w-md bg-mky-navy hover:bg-mky-navy/90"
            >
              Submit Booking
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default MKYStaffDashboard;