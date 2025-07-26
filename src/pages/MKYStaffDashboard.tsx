import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LogOut, Settings, File, FileText, Edit } from 'lucide-react';
import MKYLogo from '@/components/MKYLogo';
import { useAuth } from '@/hooks/useAuth';
import { useBookings } from '@/hooks/useBookings';
import { useTaskTemplates } from '@/hooks/useTaskTemplates';
import DynamicBookingForm from '@/components/DynamicBookingForm';
import { BookingEditForm } from '@/components/BookingEditForm';
import type { Booking } from '@/hooks/useBookings';

const MKYStaffDashboard: React.FC = () => {
  const { signOut } = useAuth();
  const { bookings, loading, refetch } = useBookings();
  const { templates: taskTemplates } = useTaskTemplates();
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const handleBookingSubmit = () => {
    // Refresh bookings when a new one is submitted
    refetch();
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
          <h1 className="text-3xl font-bold text-mky-navy mb-2">MKY Staff Dashboard</h1>
          <p className="text-muted-foreground">
            Create new bookings for different shipping routes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dynamic Booking Form */}
          <div className="lg:col-span-2">
            <DynamicBookingForm onSubmit={handleBookingSubmit} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-3">Available Routes</h3>
              <div className="space-y-2 text-sm">
                {taskTemplates.slice(0, 5).map((template) => (
                  <div key={template.id} className="flex items-center justify-between">
                    <span>{template.name}</span>
                    <span className="text-muted-foreground">Active</span>
                  </div>
                ))}
                {taskTemplates.length === 0 && (
                  <p className="text-muted-foreground">Loading routes...</p>
                )}
              </div>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-mky-navy text-mky-navy hover:bg-mky-navy hover:text-white"
                  onClick={() => window.location.href = '/document-management'}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Document Management
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-3">Recent Bookings</h3>
              <div className="space-y-3">
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <div key={booking.id} className="border-b pb-2 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{booking.task_templates?.name}</span>
                        <Badge variant={booking.status === 'Submitted' ? 'default' : 'secondary'} className="text-xs">
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.created_at).toLocaleDateString()} at{' '}
                        {new Date(booking.created_at).toLocaleTimeString()}
                      </p>
                      {booking.booking_data?.client_name && (
                        <p className="text-xs text-muted-foreground">
                          Client: {booking.booking_data.client_name}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">
                    <p>No recent bookings</p>
                    <p>Submit your first booking using the form</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Bookings Table */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-mky-navy" />
                My Bookings ({bookings.length})
              </CardTitle>
              <CardDescription>
                All your submitted bookings with real-time updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">
                          {booking.task_templates?.name || 'Unknown Route'}
                        </TableCell>
                        <TableCell>
                          {booking.booking_data?.client_address?.split('\n')[0] || 
                           booking.booking_data?.client_name || 'N/A'}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {booking.booking_data?.cargo_description || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={booking.status === 'Submitted' ? 'default' : 'secondary'}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(booking.created_at).toLocaleDateString()} {' '}
                          {new Date(booking.created_at).toLocaleTimeString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingBooking(booking)}
                              className="border-mky-navy text-mky-navy hover:bg-mky-navy hover:text-white"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => window.location.href = `/generate-documents/${booking.id}`}
                              className="bg-mky-navy hover:bg-mky-navy/90"
                            >
                              <File className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Bookings Yet</h3>
                  <p>Submit your first booking using the form above to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Edit Booking Dialog */}
      <BookingEditForm
        booking={editingBooking}
        isOpen={!!editingBooking}
        onClose={() => setEditingBooking(null)}
        onSuccess={() => {
          // Bookings will be updated automatically via real-time subscription
          setEditingBooking(null);
        }}
      />
    </div>
  );
};

export default MKYStaffDashboard;