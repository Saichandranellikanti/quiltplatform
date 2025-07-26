import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Calendar, 
  FileText, 
  Users, 
  Download, 
  Ship, 
  DollarSign,
  Filter,
  LogOut,
  Eye 
} from 'lucide-react';
import MKYLogo from '@/components/MKYLogo';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const MKYAdminDashboard: React.FC = () => {
  const { signOut, user, profile } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [taskTemplates, setTaskTemplates] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    fetchBookings();
    fetchTaskTemplates();
    
    // Set up real-time subscription for bookings
    const bookingsChannel = supabase
      .channel('bookings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings'
        },
        () => {
          fetchBookings(); // Refresh bookings when any change occurs
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(bookingsChannel);
    };
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          task_templates (name),
          users (name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
      setTotalBookings(data?.length || 0);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchTaskTemplates = async () => {
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
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const routeMatch = !selectedRoute || booking.task_template_id === selectedRoute;
    const statusMatch = !selectedStatus || booking.status.toLowerCase() === selectedStatus;
    return routeMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* MKY Header */}
      <header className="bg-mky-navy text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MKYLogo variant="text" className="text-white" />
            <Separator orientation="vertical" className="h-6 bg-white/20" />
            <Badge variant="secondary" className="bg-white/10 text-white">
              Admin
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Admin | MKY Global Forwarding</span>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-white hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-2" />
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
                  <div className="text-2xl font-bold text-mky-navy">{totalBookings}</div>
                  <p className="text-xs text-muted-foreground">
                    {totalBookings === 0 ? 'No bookings yet' : 'Total submitted'}
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
                  <div className="text-2xl font-bold text-orange-700">0</div>
                  <p className="text-xs text-muted-foreground">
                    No unpaid invoices
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
                  <div className="text-2xl font-bold text-blue-700">1</div>
                  <p className="text-xs text-muted-foreground">
                    Active staff
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Live Bookings Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-mky-navy" />
                  Live Bookings ({filteredBookings.length})
                </CardTitle>
                <CardDescription>
                  Real-time view of all staff submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredBookings.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Route</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Staff</TableHead>
                        <TableHead>Submitted</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">
                            {booking.task_templates?.name || 'Unknown Route'}
                          </TableCell>
                          <TableCell>
                            {booking.booking_data?.client_name || 'No client name'}
                          </TableCell>
                          <TableCell>
                            <Badge variant={booking.status === 'Submitted' ? 'default' : 'secondary'}>
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {booking.users?.name || booking.users?.email || 'Unknown'}
                          </TableCell>
                          <TableCell>
                            {new Date(booking.created_at).toLocaleDateString()} {' '}
                            {new Date(booking.created_at).toLocaleTimeString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Ship className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No bookings found</p>
                    <p className="text-sm">Staff submissions will appear here in real-time</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Side Panel - Live Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-mky-navy" />
                  Filter Bookings
                </CardTitle>
                <CardDescription>
                  Filter by shipping route and status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-mky-navy">Shipping Route</label>
                  <select 
                    value={selectedRoute}
                    onChange={(e) => setSelectedRoute(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-mky-navy focus:border-mky-navy"
                  >
                    <option value="">All Routes</option>
                    {taskTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-mky-navy">Booking Status</label>
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-mky-navy focus:border-mky-navy"
                  >
                    <option value="">All Status</option>
                    <option value="submitted">Submitted</option>
                    <option value="draft">Draft</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="pt-2 border-t">
                  <h4 className="text-sm font-medium text-mky-navy mb-2">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full border-mky-navy text-mky-navy hover:bg-mky-navy hover:text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-mky-navy text-mky-navy hover:bg-mky-navy hover:text-white">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MKYAdminDashboard;