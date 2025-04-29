
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "@/components/layout/Logo";
import { CheckCircle2, Home } from "lucide-react";
import { toast } from "sonner";

export default function ThankYou() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = () => {
    if (!email && subscribeToNewsletter) {
      toast.error("Please enter your email address");
      return;
    }
    
    setSubmitted(true);
    toast.success("Thank you for your interest in our updates!");
  };

  return (
    <div className="min-h-screen flex flex-col noodle-bg-light">
      {/* Header */}
      <header className="w-full bg-white border-b py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <Button 
            variant="ghost" 
            onClick={() => navigate("/home")}
          >
            Back to Home
          </Button>
        </div>
      </header>

      {/* Thank You Content */}
      <div className="flex-1 py-12 px-6 flex items-center justify-center">
        <Card className="max-w-md w-full shadow-lg animate-scale-in border-t-4 border-t-indomie-yellow relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-indomie-yellow/20 blur-xl"></div>
          <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-indomie-red/20 blur-xl"></div>
          
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center relative z-10">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Thank You!</CardTitle>
            <CardDescription>
              Your feedback has been submitted successfully. We truly appreciate your time and input.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            <div className="text-center">
              <p className="mb-3 font-medium">How would you rate your experience with our feedback process?</p>
              <StarRating 
                value={rating} 
                onChange={setRating} 
                className="justify-center"
              />
            </div>
            
            {rating > 0 && (
              <div className="p-3 bg-green-50 rounded-md text-center animate-fade-in">
                <p className="text-green-700">Thanks for your rating!</p>
              </div>
            )}
            
            <div className="space-y-3 pt-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="newsletter" 
                  checked={subscribeToNewsletter}
                  onCheckedChange={(checked) => setSubscribeToNewsletter(checked === true)}
                  disabled={submitted}
                />
                <label
                  htmlFor="newsletter"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I'd like to receive updates about new products and promotions
                </label>
              </div>
              
              {subscribeToNewsletter && !submitted && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button 
                    onClick={handleSubscribe}
                    className="w-full bg-indomie-yellow text-indomie-dark hover:bg-indomie-yellow/90"
                  >
                    Subscribe
                  </Button>
                </div>
              )}
              
              {submitted && (
                <div className="p-3 bg-blue-50 rounded-md text-center animate-fade-in">
                  <p className="text-blue-700">You've been added to our mailing list!</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button 
              className="w-full flex items-center justify-center gap-2 bg-indomie-red hover:bg-indomie-red/90 text-white relative overflow-hidden group"
              onClick={() => navigate("/home")}
            >
              <span className="relative z-10 flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0 bg-indomie-yellow transition-all duration-300 group-hover:h-full -z-0"></span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
