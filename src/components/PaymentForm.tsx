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
      label: "บัตรเครดิต",
      icon: CreditCard,
      description: "ชำระด้วยบัตรเครดิตอย่างปลอดภัย"
    },
    {
      id: "qr",
      label: "ชำระเงินผ่าน QR Code",
      icon: QrCode,
      description: "สแกน QR Code ด้วยแอปธนาคารมือถือ"
    },
    {
      id: "bank_transfer",
      label: "โอนเงินธนาคาร",
      icon: DollarSign,
      description: "โอนเงินตรงเข้าบัญชีธนาคารของเรา"
    },
    {
      id: "cash",
      label: "ชำระเงินสด",
      icon: DollarSign,
      description: "ชำระเงินสดที่สถานที่"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← กลับไปการจอง
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">ชำระเงิน</h1>
          <p className="text-muted-foreground">ยืนยันการจองสนามของคุณ</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>สรุปการจอง</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">สนาม</p>
                <p className="font-semibold">{bookingDetails.court}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">วันที่</p>
                <p className="font-semibold">{bookingDetails.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ช่วงเวลา</p>
                <div className="space-y-1">
                  {bookingDetails.slots.map((slot, index) => (
                    <p key={index} className="font-semibold text-sm">{slot}</p>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">จำนวนเงินรวม</p>
                  <p className="text-2xl font-bold text-primary">฿{bookingDetails.totalAmount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>วิธีการชำระเงิน</CardTitle>
              <CardDescription>เลือกวิธีการชำระเงินที่คุณต้องการ</CardDescription>
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
                    <h4 className="font-semibold">รายละเอียดบัตรเครดิต</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">หมายเลขบัตร</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">วันหมดอายุ</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">ชื่อผู้ถือบัตร</Label>
                        <Input id="cardName" placeholder="สมชาย ใจดี" />
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
                    <h4 className="font-semibold">ชำระเงินผ่าน QR Code</h4>
                    <div className="w-48 h-48 bg-white mx-auto border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      สแกน QR Code นี้ด้วยแอปธนาคารมือถือเพื่อชำระเงิน
                    </p>
                  </div>
                )}

                {paymentMethod === "bank_transfer" && (
                  <div className="space-y-4 p-4 bg-accent/30 rounded-lg">
                    <h4 className="font-semibold">รายละเอียดการโอนเงิน</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>ชื่อธนาคาร:</span>
                        <span className="font-semibold">ธนาคารจองสนาม</span>
                      </div>
                      <div className="flex justify-between">
                        <span>หมายเลขบัญชี:</span>
                        <span className="font-semibold">1234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span>รหัสสาขา:</span>
                        <span className="font-semibold">987654321</span>
                      </div>
                      <div className="flex justify-between">
                        <span>หมายเลขอ้างอิง:</span>
                        <span className="font-semibold">BOOKING-{Date.now()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="space-y-4 p-4 bg-accent/30 rounded-lg">
                    <h4 className="font-semibold">ชำระเงินสด</h4>
                    <p className="text-sm text-muted-foreground">
                      กรุณาชำระเงินสดที่เคาน์เตอร์สถานที่ก่อนเวลาจองของคุณ 
                      แสดงการยืนยันการจองให้กับเจ้าหน้าที่
                    </p>
                  </div>
                )}

                {/* Payment Proof Upload */}
                {(paymentMethod === "qr" || paymentMethod === "bank_transfer") && (
                  <div className="space-y-4">
                    <Label htmlFor="paymentProof">อัปโหลดหลักฐานการชำระเงิน (ไม่บังคับ)</Label>
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
                          {proofImage ? proofImage.name : "คลิกเพื่ออัปโหลดใบเสร็จหรือภาพหน้าจอ"}
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
                    <>กำลังดำเนินการ...</>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      ชำระเงิน (฿{bookingDetails.totalAmount})
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  การชำระเงินของคุณมีความปลอดภัยด้วยการเข้ารหัสมาตรฐาน
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}