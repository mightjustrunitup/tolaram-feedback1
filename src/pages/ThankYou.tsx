
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";
import { toast } from "sonner";

export default function ThankYou() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rating, setRating] = useState(5); // Default to 5 stars
  const [hasRated, setHasRated] = useState(false);
  
  // Get the data from location state or set defaults if not available
  const customerName = location.state?.customerName || "Valued Customer";
  const productName = location.state?.productName || "our products";
  
  // Handler for when user submits their rating
  const handleRatingSubmit = () => {
    toast.success(`Thank you for your ${rating}-star rating!`);
    setHasRated(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-50 to-gray-50">
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
      </div>
      
      <Card className="max-w-md w-full shadow-lg border-t-4 border-t-indomie-red animate-fade-in relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-red-100/30 blur-xl"></div>
        <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-blue-100/30 blur-xl"></div>
        
        <CardHeader className="pt-8 pb-0 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-indomie-red" />
          </div>
        </CardHeader>
        
        <CardContent className="pt-4 pb-6 text-center space-y-4">
          <h1 className="text-2xl font-bold">Thank You!</h1>
          
          <p className="text-gray-700">
            Thank you {customerName} for your valuable feedback about {productName}. Your input helps us improve our products and services.
          </p>
          
          <div className="py-6 space-y-4">
            <h2 className="text-lg font-semibold">How was your experience using our feedback system?</h2>
            
            <div className="flex justify-center">
              <StarRating
                value={rating}
                onChange={!hasRated ? setRating : undefined}
                max={5}
                size="lg"
                color="text-yellow-400"
                showValue={true}
                readOnly={hasRated}
              />
            </div>
            
            {!hasRated && (
              <Button 
                onClick={handleRatingSubmit}
                className="bg-indomie-red hover:bg-indomie-red/90 mt-2"
              >
                Submit Rating
              </Button>
            )}
            
            {hasRated && (
              <p className="text-indomie-red font-medium animate-fade-in">
                Thank you for rating our feedback system!
              </p>
            )}
          </div>
        </CardContent>
        
        {/* Removed the CardFooter section with the Back to Home button */}
      </Card>
    </div>
  );
}
