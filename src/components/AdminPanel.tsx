import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users, Calendar, DollarSign, Plus, Edit, Trash2, Eye } from "lucide-react";

interface AdminPanelProps {
  onBack?: () => void;
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("courts");

  // Mock data
  const courts = [
    { id: 1, name: "Premium Court A", location: "Downtown Sports Center", price: 30, active: true },
    { id: 2, name: "Court B", location: "City Sports Complex", price: 25, active: true },
    { id: 3, name: "VIP Court", location: "Elite Sports Club", price: 40, active: false }
  ];

  const bookings = [
    {
      id: 1,
      court: "Premium Court A",
      user: "John Doe",
      date: "2024-07-20",
      slots: ["09:00-10:00", "10:00-11:00"],
      status: "confirmed",
      amount: 60,
      payment_status: "paid"
    },
    {
      id: 2,
      court: "Court B",
      user: "Jane Smith",
      date: "2024-07-22",
      slots: ["18:00-19:00"],
      status: "pending",
      amount: 25,
      payment_status: "unpaid"
    }
  ];

  const stats = {
    totalBookings: 156,
    totalRevenue: 4250,
    activeUsers: 89,
    availableCourts: 3
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage courts, bookings, and system settings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Administrator</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalBookings}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
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
                <p className="text-2xl font-bold text-foreground">${stats.totalRevenue}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.activeUsers}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.availableCourts}</p>
                <p className="text-sm text-muted-foreground">Available Courts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courts">Courts Management</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        {/* Courts Management */}
        <TabsContent value="courts" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Court Management</CardTitle>
                <CardDescription>Add, edit, or remove badminton courts</CardDescription>
              </div>
              <Button variant="gradient">
                <Plus className="mr-2 h-4 w-4" />
                Add New Court
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courts.map((court) => (
                  <div key={court.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold">{court.name}</h4>
                          <Badge variant={court.active ? "default" : "secondary"}>
                            {court.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{court.location}</p>
                        <p className="text-sm font-medium text-primary mt-1">${court.price}/slot</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add Court Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Court</CardTitle>
              <CardDescription>Create a new badminton court</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="courtName">Court Name</Label>
                    <Input id="courtName" placeholder="e.g., Premium Court A" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courtLocation">Location</Label>
                    <Input id="courtLocation" placeholder="e.g., Downtown Sports Center" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courtPrice">Price per Slot ($)</Label>
                    <Input id="courtPrice" type="number" placeholder="30" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="courtDescription">Description</Label>
                    <Textarea 
                      id="courtDescription" 
                      placeholder="Describe the court features, amenities, etc."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courtImage">Court Image URL</Label>
                    <Input id="courtImage" placeholder="https://example.com/court-image.jpg" />
                  </div>
                </div>
              </div>
              <Button variant="gradient" className="mt-6">
                <Plus className="mr-2 h-4 w-4" />
                Create Court
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings Management */}
        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Manage and monitor court reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <h4 className="font-semibold">{booking.court}</h4>
                        <p className="text-sm text-muted-foreground">{booking.user}</p>
                      </div>
                      <div>
                        <p className="font-medium">{booking.date}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.slots.join(", ")}
                        </p>
                      </div>
                      <div>
                        <Badge 
                          variant={booking.status === "confirmed" ? "default" : "secondary"}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-semibold">${booking.amount}</p>
                        <Badge 
                          variant={booking.payment_status === "paid" ? "default" : "secondary"}
                          className={booking.payment_status === "paid" ? "bg-success" : ""}
                        >
                          {booking.payment_status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">User management features coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}