
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import AnimatedIndomie from "@/components/layout/AnimatedIndomie";

export default function ThankYou() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the data from location state or set defaults if not available
  const customerName = location.state?.customerName || "Valued Customer";
  const productName = location.state?.productName || "our products";
  
  // Redirect to home if arrived directly at this page without going through feedback
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-sky-50 to-gray-50">
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
      </div>
      
      <Card className="max-w-md w-full shadow-lg border-t-4 border-t-green-500 animate-fade-in relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-green-100/30 blur-xl"></div>
        <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-blue-100/30 blur-xl"></div>
        
        <CardHeader className="pt-8 pb-0 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </CardHeader>
        
        <CardContent className="pt-4 pb-6 text-center space-y-4">
          <h1 className="text-2xl font-bold">Thank You!</h1>
          
          <p className="text-gray-700">
            Thank you {customerName} for your valuable feedback about {productName}. Your input helps us improve our products and services.
          </p>
          
          <div className="py-2">
            <AnimatedIndomie size="md" className="mx-auto" />
          </div>
          
          <p className="text-sm text-gray-600">
            Our team will review your feedback and take appropriate action if necessary.
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-center pb-8">
          <Button 
            onClick={() => navigate("/")} 
            className="bg-indomie-red hover:bg-indomie-red/90"
          >
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
