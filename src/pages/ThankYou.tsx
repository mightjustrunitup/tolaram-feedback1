
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from '@/components/layout/Logo';
import { CheckCircle } from 'lucide-react';

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const { customerName = 'Valued Customer', productName = 'our products' } = location.state || {};

  // Redirect to home if accessed directly without state
  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  // If no state is available, don't render the content
  if (!location.state) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 to-gray-50">
      {/* Fixed Header */}
      <header className="w-full bg-white border-b py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <Logo />
        </div>
      </header>

      {/* Thank You Content */}
      <div className="flex-1 py-8 px-6 relative pt-24 md:pt-28 flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
        </div>
        
        <div className="max-w-2xl w-full mx-auto relative z-10 animate-fade-in">
          <Card className="shadow-lg border-t-4 border-t-green-500 relative overflow-hidden p-6">
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-green-100/30 blur-xl"></div>
            <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-blue-100/30 blur-xl"></div>
            
            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
              <div className="bg-green-100 p-4 rounded-full animate-scale-in">
                <CheckCircle size={64} className="text-green-600" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Thank You!</h1>
              
              <p className="text-lg text-gray-600 max-w-md">
                Hello {customerName}, thank you for your valuable feedback about {productName}. Your input helps us improve our products and services.
              </p>
              
              <div className="py-2 px-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-amber-800">
                  Your feedback has been submitted successfully and our team will review it shortly.
                </p>
              </div>
              
              <CardContent className="p-0 mt-6 w-full">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/')}
                    variant="outline"
                    size="lg"
                    className="border-indomie-red text-indomie-red hover:bg-indomie-red/5"
                  >
                    Submit Another Feedback
                  </Button>
                  
                  <Button
                    onClick={() => window.open('https://tolaram.com', '_blank')}
                    size="lg"
                    className="bg-indomie-red hover:bg-indomie-red/90"
                  >
                    Visit Our Website
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
          
          <div className="text-center mt-8 text-gray-500 text-sm">
            © {new Date().getFullYear()} Tolaram Group. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
