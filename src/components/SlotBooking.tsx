import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Clock, DollarSign, MapPin, CheckCircle } from "lucide-react";

interface Court {
  id: number;
  name: string;
  location: string;
  price_per_slot: number;
  image_url: string;
}

interface Slot {
  id: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

interface SlotBookingProps {
  court: Court;
  onBookSlots?: (slotIds: number[], totalPrice: number) => void;
  onBack?: () => void;
}

export function SlotBooking({ court, onBookSlots, onBack }: SlotBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);

  // Mock slots data - in real app this would come from API
  const slots: Slot[] = [
    { id: 1, start_time: "06:00", end_time: "07:00", is_available: true },
    { id: 2, start_time: "07:00", end_time: "08:00", is_available: true },
    { id: 3, start_time: "08:00", end_time: "09:00", is_available: false },
    { id: 4, start_time: "09:00", end_time: "10:00", is_available: true },
    { id: 5, start_time: "10:00", end_time: "11:00", is_available: true },
    { id: 6, start_time: "11:00", end_time: "12:00", is_available: true },
    { id: 7, start_time: "12:00", end_time: "13:00", is_available: false },
    { id: 8, start_time: "13:00", end_time: "14:00", is_available: true },
    { id: 9, start_time: "14:00", end_time: "15:00", is_available: true },
    { id: 10, start_time: "15:00", end_time: "16:00", is_available: true },
    { id: 11, start_time: "16:00", end_time: "17:00", is_available: true },
    { id: 12, start_time: "17:00", end_time: "18:00", is_available: true },
    { id: 13, start_time: "18:00", end_time: "19:00", is_available: false },
    { id: 14, start_time: "19:00", end_time: "20:00", is_available: true },
    { id: 15, start_time: "20:00", end_time: "21:00", is_available: true },
    { id: 16, start_time: "21:00", end_time: "22:00", is_available: true },
  ];

  const toggleSlot = (slotId: number) => {
    setSelectedSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  const totalPrice = selectedSlots.length * court.price_per_slot;

  const handleBooking = () => {
    if (selectedSlots.length > 0) {
      onBookSlots?.(selectedSlots, totalPrice);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← กลับไปที่สนาม
          </Button>
          <h1 className="text-3xl font-bold text-foreground">จอง {court.name}</h1>
          <div className="flex items-center text-muted-foreground mt-2">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{court.location}</span>
          </div>
        </div>
        <div className="hidden md:block">
          <img 
            src={court.image_url} 
            alt={court.name}
            className="w-32 h-24 object-cover rounded-lg shadow-card"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Date Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>เลือกวันที่</CardTitle>
            <CardDescription>เลือกวันที่ที่คุณต้องการจอง</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Available Slots */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>ช่วงเวลาที่ว่าง</CardTitle>
            <CardDescription>
              {selectedDate?.toLocaleDateString('th-TH')} • เลือกหลายช่วงเวลาสำหรับการจองของคุณ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {slots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={selectedSlots.includes(slot.id) ? "gradient" : "outline"}
                  size="sm"
                  onClick={() => toggleSlot(slot.id)}
                  disabled={!slot.is_available}
                  className={`h-auto py-3 flex flex-col items-center space-y-1 ${
                    !slot.is_available 
                      ? "opacity-50 cursor-not-allowed" 
                      : selectedSlots.includes(slot.id)
                      ? "ring-2 ring-primary ring-offset-2"
                      : ""
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium">
                    {slot.start_time}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {slot.end_time}
                  </span>
                  {selectedSlots.includes(slot.id) && (
                    <CheckCircle className="h-3 w-3 text-primary-foreground" />
                  )}
                </Button>
              ))}
            </div>

            {/* Booking Summary */}
            {selectedSlots.length > 0 && (
              <Card className="mt-6 bg-accent/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">สรุปการจอง</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>สนาม:</span>
                      <span className="font-medium">{court.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>วันที่:</span>
                      <span className="font-medium">{selectedDate?.toLocaleDateString('th-TH')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ช่วงเวลา:</span>
                      <span className="font-medium">{selectedSlots.length} ช่วง</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ราคาต่อช่วง:</span>
                      <span className="font-medium">฿{court.price_per_slot}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>รวม:</span>
                        <span className="text-primary">฿{totalPrice}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="gradient" 
                    size="lg" 
                    onClick={handleBooking}
                    className="w-full"
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    ยืนยันการจอง (฿{totalPrice})
                  </Button>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}