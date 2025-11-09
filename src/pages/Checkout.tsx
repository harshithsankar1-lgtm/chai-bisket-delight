import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Smartphone, Wallet, Banknote } from 'lucide-react';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const deliveryFee = deliveryType === 'delivery' ? (subtotal > 30 ? 0 : 4.99) : 0;
  const total = subtotal + tax + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Randomly succeed or fail for demo
    const success = Math.random() > 0.2; // 80% success rate

    setIsProcessing(false);

    if (success) {
      clearCart();
      navigate('/order-success', { 
        state: { 
          orderId: `ORD-${Date.now()}`,
          total: total.toFixed(2),
          estimatedTime: '30-40'
        } 
      });
    } else {
      navigate('/order-failed');
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Type */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={deliveryType} onValueChange={setDeliveryType}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                        <div className="font-medium">Home Delivery</div>
                        <div className="text-sm text-muted-foreground">
                          Delivered to your doorstep
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg mt-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div className="font-medium">Takeaway</div>
                        <div className="text-sm text-muted-foreground">
                          Pick up from restaurant
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Delivery Details */}
              {deliveryType === 'delivery' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
                    </div>
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" placeholder="123 Main St, Apt 4B" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" required />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="10001" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                      <Input id="instructions" placeholder="Ring doorbell twice" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Contact Details for Pickup */}
              {deliveryType === 'pickup' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="pickup-name">Full Name</Label>
                      <Input id="pickup-name" placeholder="John Doe" required />
                    </div>
                    <div>
                      <Label htmlFor="pickup-phone">Phone Number</Label>
                      <Input id="pickup-phone" type="tel" placeholder="+1 (555) 123-4567" required />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="h-5 w-5" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg mt-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Smartphone className="h-5 w-5" />
                      <Label htmlFor="upi" className="flex-1 cursor-pointer">
                        UPI / Digital Wallet
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg mt-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Banknote className="h-5 w-5" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        Cash on Delivery
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" type="password" placeholder="123" maxLength={3} required />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({cart.length} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>
                        {deliveryFee === 0 ? (
                          <span className="text-success font-medium">FREE</span>
                        ) : (
                          `$${deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="flex items-start space-x-2 mb-4">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      I agree to the Terms & Conditions and Privacy Policy
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
