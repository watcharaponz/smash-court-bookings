import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CourtCard } from "@/components/CourtCard";
import { LoginForm } from "@/components/LoginForm";
import { SlotBooking } from "@/components/SlotBooking";
import { UserDashboard } from "@/components/UserDashboard";
import { PaymentForm } from "@/components/PaymentForm";
import { AdminPanel } from "@/components/AdminPanel";
import { useToast } from "@/hooks/use-toast";
import courtA from "@/assets/court-a.jpg";
import courtB from "@/assets/court-b.jpg";
import courtVip from "@/assets/court-vip.jpg";

type Page = "home" | "courts" | "login" | "dashboard" | "admin" | "booking" | "payment";

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface Court {
  id: number;
  name: string;
  location: string;
  description: string;
  image_url: string;
  price_per_slot: number;
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [user, setUser] = useState<User | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);
  const { toast } = useToast();

  // Mock courts data
  const courts: Court[] = [
    {
      id: 1,
      name: "Premium Court A",
      location: "Downtown Sports Center",
      description: "Professional-grade badminton court with premium wooden flooring, excellent lighting, and climate control.",
      image_url: courtA,
      price_per_slot: 30
    },
    {
      id: 2,
      name: "Court B",
      location: "City Sports Complex",
      description: "Standard badminton court with good lighting and comfortable playing environment for casual games.",
      image_url: courtB,
      price_per_slot: 25
    },
    {
      id: 3,
      name: "VIP Court",
      location: "Elite Sports Club",
      description: "Luxury VIP court with premium amenities, private entrance, and exclusive lounge area.",
      image_url: courtVip,
      price_per_slot: 40
    }
  ];

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app this would call an API
    const mockUser: User = {
      id: 1,
      name: email === "admin@courtbook.com" ? "Admin User" : "John Doe",
      email: email,
      isAdmin: email === "admin@courtbook.com"
    };
    
    setUser(mockUser);
    setCurrentPage("home");
    toast({
      title: "Login Successful",
      description: `Welcome back, ${mockUser.name}!`,
    });
  };

  const handleRegister = (userData: any) => {
    // Mock registration - in real app this would call an API
    const newUser: User = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      isAdmin: false
    };
    
    setUser(newUser);
    setCurrentPage("home");
    toast({
      title: "Registration Successful",
      description: `Welcome to CourtBook, ${newUser.name}!`,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("home");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleViewSlots = (courtId: number) => {
    const court = courts.find(c => c.id === courtId);
    if (court) {
      if (!user) {
        toast({
          title: "Login Required",
          description: "Please login to book a court.",
          variant: "destructive"
        });
        setCurrentPage("login");
        return;
      }
      setSelectedCourt(court);
      setCurrentPage("booking");
    }
  };

  const handleBookSlots = (slotIds: number[], totalPrice: number) => {
    if (!selectedCourt || !user) return;
    
    setBookingData({
      court: selectedCourt.name,
      date: new Date().toLocaleDateString(),
      slots: [`09:00-10:00`, `10:00-11:00`], // Mock selected slots
      totalAmount: totalPrice
    });
    setCurrentPage("payment");
  };

  const handlePayment = (paymentData: any) => {
    // Mock payment processing
    toast({
      title: "Payment Successful",
      description: "Your court has been booked successfully!",
    });
    setCurrentPage("dashboard");
    setBookingData(null);
    setSelectedCourt(null);
  };

  const handleCancelBooking = (bookingId: number) => {
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    });
  };

  const handleNavigate = (page: Page) => {
    if (page === "dashboard" && !user) {
      setCurrentPage("login");
      return;
    }
    if (page === "admin" && (!user || !user.isAdmin)) {
      toast({
        title: "Access Denied",
        description: "Admin access required.",
        variant: "destructive"
      });
      return;
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return (
          <LoginForm
            onLogin={handleLogin}
            onRegister={handleRegister}
            onClose={() => setCurrentPage("home")}
          />
        );
      
      case "courts":
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">Available Courts</h1>
              <p className="text-muted-foreground">Choose from our premium badminton courts</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courts.map((court) => (
                <CourtCard
                  key={court.id}
                  court={court}
                  onViewSlots={handleViewSlots}
                />
              ))}
            </div>
          </div>
        );
      
      case "booking":
        return selectedCourt ? (
          <SlotBooking
            court={selectedCourt}
            onBookSlots={handleBookSlots}
            onBack={() => setCurrentPage("courts")}
          />
        ) : null;
      
      case "payment":
        return bookingData ? (
          <PaymentForm
            bookingDetails={bookingData}
            onPayment={handlePayment}
            onBack={() => setCurrentPage("booking")}
          />
        ) : null;
      
      case "dashboard":
        return user ? (
          <UserDashboard
            user={user}
            onViewCourts={() => setCurrentPage("courts")}
            onCancelBooking={handleCancelBooking}
            onPayment={(bookingId) => toast({ title: "Redirecting to payment..." })}
          />
        ) : null;
      
      case "admin":
        return user?.isAdmin ? (
          <AdminPanel
            onBack={() => setCurrentPage("home")}
          />
        ) : null;
      
      default:
        return (
          <>
            <Hero
              onBrowseCourts={() => setCurrentPage("courts")}
              onGetStarted={() => setCurrentPage(user ? "courts" : "login")}
            />
            <div className="container mx-auto px-4 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Featured Courts</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover our premium badminton courts with state-of-the-art facilities and flexible booking options.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courts.slice(0, 3).map((court) => (
                  <CourtCard
                    key={court.id}
                    court={court}
                    onViewSlots={handleViewSlots}
                  />
                ))}
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={() => setCurrentPage("courts")}
                  className="text-primary hover:underline font-semibold"
                >
                  View All Courts →
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user}
        onLogin={() => setCurrentPage("login")}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
      {renderPage()}
    </div>
  );
};

export default Index;
