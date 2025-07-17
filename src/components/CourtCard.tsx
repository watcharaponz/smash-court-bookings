import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Clock } from "lucide-react";

interface Court {
  id: number;
  name: string;
  location: string;
  description: string;
  image_url: string;
  price_per_slot: number;
}

interface CourtCardProps {
  court: Court;
  onViewSlots?: (courtId: number) => void;
}

export function CourtCard({ court, onViewSlots }: CourtCardProps) {
  return (
    <div className="bg-card rounded-xl shadow-card hover:shadow-floating transition-all duration-300 hover:scale-[1.02] overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={court.image_url} 
          alt={court.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium">
          ว่าง
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
          {court.name}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{court.location}</span>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {court.description}
        </p>

        {/* Price and Duration */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-primary font-semibold">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="text-lg">{court.price_per_slot}</span>
            <span className="text-sm text-muted-foreground ml-1">/ ช่วง</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>ช่วงละ 1 ชั่วโมง</span>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          variant="gradient" 
          size="sm" 
          onClick={() => onViewSlots?.(court.id)}
          className="w-full"
        >
          ดูช่วงเวลาที่ว่าง
        </Button>
      </div>
    </div>
  );
}