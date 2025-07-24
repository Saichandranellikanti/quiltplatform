import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  FileText, 
  Users, 
  Download, 
  DollarSign,
  Filter
} from 'lucide-react';

const SimpleMKYAdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* MKY Header */}
      <header className="bg-mky-navy text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-bold text-white">
              <span className="text-white">MKY</span>
              <span className="text-white/70 ml-1">Global Forwarding</span>
            </div>
            <Badge variant="secondary" className="bg-white/10 text-white">
              Admin
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Admin | MKY Global Forwarding</span>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-mky-navy mb-2">MKY Control Panel</h1>
          <p className="text-muted-foreground">
            Comprehensive admin dashboard for MKY Global Forwarding operations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-mky-navy/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-mky-navy">
                    Total Bookings This Month
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-mky-navy" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-mky-navy">247</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-700">
                    Unpaid Invoices
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-orange-700" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-700">18</div>
                  <p className="text-xs text-muted-foreground">
                    $45,200 total value
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">
                    Auto Document Generator
                  </CardTitle>
                  <FileText className="h-4 w-4 text-green-700" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-700">Active</div>
                  <p className="text-xs text-muted-foreground">
                    Autocrat system running
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-700">
                    Active Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-blue-700" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-700">12</div>
                  <p className="text-xs text-muted-foreground">
                    Staff members
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-mky-navy" />
                    View/Edit Users Table
                  </CardTitle>
                  <CardDescription>
                    Manage user accounts, roles, and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-mky-navy hover:bg-mky-navy/90">
                    Access User Management
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-mky-navy" />
                    Download Reports
                  </CardTitle>
                  <CardDescription>
                    Export data to Google Sheets and generate reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-mky-navy text-mky-navy hover:bg-mky-navy hover:text-white">
                    Export to GSheet
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-mky-navy" />
                  Filter Bookings
                </CardTitle>
                <CardDescription>
                  Filter by port and status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-mky-navy">Port of Discharge</label>
                  <select className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-mky-navy focus:border-mky-navy">
                    <option value="">All Ports</option>
                    <option value="CNSHA">Shanghai, China</option>
                    <option value="USLAX">Los Angeles, USA</option>
                    <option value="DEHAM">Hamburg, Germany</option>
                    <option value="SGSIN">Singapore</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-mky-navy">Booking Status</label>
                  <select className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-mky-navy focus:border-mky-navy">
                    <option value="">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                <Button className="w-full bg-mky-navy hover:bg-mky-navy/90">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SimpleMKYAdminDashboard;