import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, DollarSign, X, Eye } from "lucide-react";

interface Booking {
  id: number;
  court: {
    name: string;
    location: string;
    image_url: string;
  };
  date: string;
  slots: Array<{
    start_time: string;
    end_time: string;
  }>;
  status: "pending" | "confirmed" | "cancelled";
  total_amount: number;
  payment_status: "unpaid" | "paid" | "failed";
  created_at: string;
}

interface UserDashboardProps {
  user: { name: string; email: string };
  onViewCourts?: () => void;
  onCancelBooking?: (bookingId: number) => void;
  onPayment?: (bookingId: number) => void;
}

export function UserDashboard({ user, onViewCourts, onCancelBooking, onPayment }: UserDashboardProps) {
  // Mock bookings data - in real app this would come from API
  const [bookings] = useState<Booking[]>([
    {
      id: 1,
      court: {
        name: "Premium Court A",
        location: "Downtown Sports Center",
        image_url: "/src/assets/court-a.jpg"
      },
      date: "2024-07-20",
      slots: [
        { start_time: "09:00", end_time: "10:00" },
        { start_time: "10:00", end_time: "11:00" }
      ],
      status: "confirmed",
      total_amount: 60,
      payment_status: "paid",
      created_at: "2024-07-17T10:30:00"
    },
    {
      id: 2,
      court: {
        name: "Court B",
        location: "City Sports Complex",
        image_url: "/src/assets/court-b.jpg"
      },
      date: "2024-07-22",
      slots: [
        { start_time: "18:00", end_time: "19:00" }
      ],
      status: "pending",
      total_amount: 25,
      payment_status: "unpaid",
      created_at: "2024-07-17T15:45:00"
    },
    {
      id: 3,
      court: {
        name: "VIP Court",
        location: "Elite Sports Club",
        image_url: "/src/assets/court-vip.jpg"
      },
      date: "2024-07-15",
      slots: [
        { start_time: "14:00", end_time: "15:00" }
      ],
      status: "cancelled",
      total_amount: 40,
      payment_status: "failed",
      created_at: "2024-07-14T09:15:00"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="default" className="bg-success">Confirmed</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="default" className="bg-success">Paid</Badge>;
      case "unpaid":
        return <Badge variant="secondary">Unpaid</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const upcomingBookings = bookings.filter(b => 
    new Date(b.date) >= new Date() && b.status !== "cancelled"
  );
  const pastBookings = bookings.filter(b => 
    new Date(b.date) < new Date() || b.status === "cancelled"
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
        <Button variant="gradient" onClick={onViewCourts}>
          <Calendar className="mr-2 h-4 w-4" />
          Book New Court
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{upcomingBookings.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  ${bookings.filter(b => b.payment_status === "paid").reduce((sum, b) => sum + b.total_amount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pastBookings.length}</p>
                <p className="text-sm text-muted-foreground">Past Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Bookings */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
          <CardDescription>
            Your confirmed and pending court reservations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No upcoming bookings</p>
              <Button variant="gradient" onClick={onViewCourts}>
                Book Your First Court
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4 hover:shadow-card transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={booking.court.image_url} 
                        alt={booking.court.name}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold">{booking.court.name}</h4>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {booking.court.location}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.slots.map(s => `${s.start_time}-${s.end_time}`).join(", ")}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      {getStatusBadge(booking.status)}
                      {getPaymentBadge(booking.payment_status)}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">${booking.total_amount}</span>
                      <div className="flex space-x-2">
                        {booking.payment_status === "unpaid" && (
                          <Button 
                            variant="gradient" 
                            size="sm"
                            onClick={() => onPayment?.(booking.id)}
                          >
                            Pay Now
                          </Button>
                        )}
                        {booking.status === "pending" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onCancelBooking?.(booking.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
          <CardDescription>
            Your previous court reservations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pastBookings.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No booking history</p>
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4 opacity-75">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={booking.court.image_url} 
                        alt={booking.court.name}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold">{booking.court.name}</h4>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {booking.court.location}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.slots.map(s => `${s.start_time}-${s.end_time}`).join(", ")}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      {getStatusBadge(booking.status)}
                      {getPaymentBadge(booking.payment_status)}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-muted-foreground">${booking.total_amount}</span>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}