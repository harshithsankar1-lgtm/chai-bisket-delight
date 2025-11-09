import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react';

const OrderFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center py-12 px-4">
      <Card className="max-w-lg w-full animate-scale-in">
        <CardContent className="pt-12 pb-8 text-center">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-12 w-12 text-destructive" />
          </div>

          <h1 className="text-3xl font-bold mb-2">Payment Failed</h1>
          <p className="text-lg text-muted-foreground mb-8">
            We couldn't process your payment
          </p>

          <div className="bg-secondary p-6 rounded-lg mb-8 text-left">
            <h3 className="font-semibold mb-3">Common reasons for payment failure:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Insufficient funds in your account</li>
              <li>• Incorrect card details or CVV</li>
              <li>• Card expired or blocked</li>
              <li>• Network connectivity issues</li>
            </ul>
          </div>

          <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg mb-8">
            <p className="text-sm font-medium text-accent-foreground">
              Don't worry! Your cart items are saved. You can try again with a different payment method.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              onClick={() => navigate('/checkout')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Link to="/cart" className="block">
              <Button variant="outline" className="w-full" size="lg">
                Return to Cart
              </Button>
            </Link>
            <Link to="/menu" className="block">
              <Button variant="ghost" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-2">
              Need help with your payment?
            </p>
            <Button variant="link" className="text-primary">
              <HelpCircle className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderFailed;
