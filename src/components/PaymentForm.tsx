import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { CreditCard, DollarSign, QrCode, Upload, Check } from "lucide-react";

interface PaymentFormProps {
  bookingDetails: {
    court: string;
    date: string;
    slots: string[];
    totalAmount: number;
  };
  onPayment?: (paymentData: {
    method: string;
    amount: number;
    proofImage?: File;
  }) => void;
  onBack?: () => void;
}

export function PaymentForm({ bookingDetails, onPayment, onBack }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofImage(file);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onPayment?.({
        method: paymentMethod,
        amount: bookingDetails.totalAmount,
        proofImage: proofImage || undefined
      });
      setIsProcessing(false);
    }, 2000);
  };

  const paymentMethods = [
    {
      id: "credit_card",
      label: "Credit Card",
      icon: CreditCard,
      description: "Pay securely with your credit card"
    },
    {
      id: "qr",
      label: "QR Code Payment",
      icon: QrCode,
      description: "Scan QR code with your mobile banking app"
    },
    {
      id: "bank_transfer",
      label: "Bank Transfer",
      icon: DollarSign,
      description: "Direct transfer to our bank account"
    },
    {
      id: "cash",
      label: "Cash Payment",
      icon: DollarSign,
      description: "Pay cash at the facility"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Back to Booking
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Complete Payment</h1>
          <p className="text-muted-foreground">Secure your court reservation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Court</p>
                <p className="font-semibold">{bookingDetails.court}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold">{bookingDetails.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Slots</p>
                <div className="space-y-1">
                  {bookingDetails.slots.map((slot, index) => (
                    <p key={index} className="font-semibold text-sm">{slot}</p>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">${bookingDetails.totalAmount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent/50 cursor-pointer">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <Label htmlFor={method.id} className="font-semibold cursor-pointer">
                              {method.label}
                            </Label>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>

              {/* Payment Details */}
              <div className="mt-6 space-y-4">
                {paymentMethod === "credit_card" && (
                  <div className="space-y-4 p-4 bg-accent/30 rounded-lg">
                    <h4 className="font-semibold">Credit Card Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "qr" && (
                  <div className="space-y-4 p-4 bg-accent/30 rounded-lg text-center">
                    <h4 className="font-semibold">QR Code Payment</h4>
                    <div className="w-48 h-48 bg-white mx-auto border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Scan this QR code with your mobile banking app to complete payment
                    </p>
                  </div>
                )}

                {paymentMethod === "bank_transfer" && (
                  <div className="space-y-4 p-4 bg-accent/30 rounded-lg">
                    <h4 className="font-semibold">Bank Transfer Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Bank Name:</span>
                        <span className="font-semibold">CourtBook Bank</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Account Number:</span>
                        <span className="font-semibold">1234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Routing Number:</span>
                        <span className="font-semibold">987654321</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reference:</span>
                        <span className="font-semibold">BOOKING-{Date.now()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="space-y-4 p-4 bg-accent/30 rounded-lg">
                    <h4 className="font-semibold">Cash Payment</h4>
                    <p className="text-sm text-muted-foreground">
                      Please pay the cash amount at the facility counter before your booking time. 
                      Present your booking confirmation to the staff.
                    </p>
                  </div>
                )}

                {/* Payment Proof Upload */}
                {(paymentMethod === "qr" || paymentMethod === "bank_transfer") && (
                  <div className="space-y-4">
                    <Label htmlFor="paymentProof">Upload Payment Proof (Optional)</Label>
                    <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
                      <input
                        id="paymentProof"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Label htmlFor="paymentProof" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {proofImage ? proofImage.name : "Click to upload receipt or screenshot"}
                        </p>
                      </Label>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Button */}
              <div className="mt-8">
                <Button 
                  variant="gradient" 
                  size="lg" 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Complete Payment (${bookingDetails.totalAmount})
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Your payment is secured with industry-standard encryption
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}