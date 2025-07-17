import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import heroBadminton from "@/assets/hero-badminton.jpg";

interface HeroProps {
  onBrowseCourts?: () => void;
  onGetStarted?: () => void;
}

export function Hero({ onBrowseCourts, onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBadminton} 
          alt="Professional badminton court" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Book Your Perfect
            <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Badminton Court
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
            Premium courts, flexible scheduling, instant confirmation
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onBrowseCourts}
              className="text-lg px-8 py-4"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Browse Courts
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onGetStarted}
              className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Get Started
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <Clock className="h-8 w-8 mb-3 text-primary-glow" />
              <h3 className="font-semibold mb-2">Flexible Hours</h3>
              <p className="text-sm text-white/80">Book courts from 6 AM to 11 PM daily</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <MapPin className="h-8 w-8 mb-3 text-primary-glow" />
              <h3 className="font-semibold mb-2">Prime Locations</h3>
              <p className="text-sm text-white/80">Courts in the heart of the city</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <Calendar className="h-8 w-8 mb-3 text-primary-glow" />
              <h3 className="font-semibold mb-2">Easy Booking</h3>
              <p className="text-sm text-white/80">Quick reservation in just a few clicks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}