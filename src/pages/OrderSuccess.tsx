import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Download, Share2, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, total, estimatedTime } = location.state || {
    orderId: 'ORD-123456',
    total: '0.00',
    estimatedTime: '30-40',
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center py-12 px-4">
      <Card className="max-w-lg w-full animate-scale-in">
        <CardContent className="pt-12 pb-8 text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle2 className="h-12 w-12 text-success" />
          </div>

          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your order
          </p>

          <div className="bg-secondary p-6 rounded-lg mb-8">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="font-semibold">{orderId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                <p className="font-semibold">${total}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                <p className="font-semibold text-accent">{estimatedTime} minutes</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link to="/menu" className="block">
              <Button className="w-full" size="lg">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Invoice
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              We've sent a confirmation email with your order details
            </p>
            <p className="text-sm text-muted-foreground">
              Questions? Contact us at{' '}
              <a href="tel:5551234567" className="text-primary hover:underline">
                (555) 123-4567
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
