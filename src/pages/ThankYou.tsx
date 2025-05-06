
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { Check, Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ThankYou() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [siteFeedbackRating, setSiteFeedbackRating] = useState(0);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  
  // Get the user's email from location state if available
  const userEmail = location.state?.email || "";
  const userName = location.state?.customerName || "Valued Customer";
  const productName = location.state?.productName || "our product";
  
  // Set email from state if available
  useEffect(() => {
    if (userEmail) {
      setEmailAddress(userEmail);
    }
  }, [userEmail]);

  const handleSiteFeedbackSubmit = () => {
    if (siteFeedbackRating === 0) {
      toast.error("Please select a rating before submitting");
      return;
    }
    
    toast.success("Thank you for rating our feedback system!");
    // In a real app, you would send this rating to your backend
  };
  
  const handleSendConfirmationEmail = () => {
    if (!emailAddress.trim() || !/\S+@\S+\.\S+/.test(emailAddress)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate sending an email
    setTimeout(() => {
      setIsSubmitting(false);
      setIsEmailSent(true);
      toast.success("Confirmation email sent!");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 to-gray-50">
      {/* Fixed Header */}
      <header className="w-full bg-white border-b py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Feedback</h1>
        </div>
      </header>

      {/* Thank You Content */}
      <div className="flex-1 py-12 px-6 relative pt-24 md:pt-28">
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
        </div>
        
        <div className="max-w-2xl mx-auto relative z-10">
          <Card className="shadow-md animate-fade-in border-t-4 border-t-indomie-red relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-blue-100/30 blur-xl"></div>
            <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-green-100/30 blur-xl"></div>
            
            <div className="absolute top-0 right-0 bg-green-100 p-2 rounded-bl-lg">
              <div className="flex items-center gap-1 text-green-700">
                <Check className="h-5 w-5" />
                <span className="text-sm font-medium">Feedback Received</span>
              </div>
            </div>
            
            <CardHeader className="relative z-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 rounded-full p-4 inline-flex">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <CardTitle className="text-2xl font-bold">Thank You, {userName}!</CardTitle>
              <CardDescription className="text-base mt-2">
                Your feedback about {productName} has been successfully submitted and is very valuable to us.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10 space-y-6">
              {/* Site Feedback Section */}
              <div className="p-5 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-center">How was your feedback experience?</h3>
                <div className="flex flex-col items-center gap-4">
                  <StarRating
                    value={siteFeedbackRating}
                    onChange={setSiteFeedbackRating}
                    max={5}
                    color="text-indomie-yellow"
                    size="lg"
                    label="Rate our feedback system"
                    showValue
                  />
                  
                  <Button
                    onClick={handleSiteFeedbackSubmit}
                    className="relative overflow-hidden group bg-indomie-red hover:bg-indomie-red/90"
                  >
                    <span className="relative z-10">Submit Rating</span>
                    <span className="absolute bottom-0 left-0 w-full h-0 bg-indomie-yellow transition-all duration-300 group-hover:h-full -z-0"></span>
                  </Button>
                </div>
              </div>
              
              {/* Email Confirmation Section - Only show if no email was provided */}
              {!userEmail && !isEmailSent && (
                <div className="p-5 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm">
                  {showEmailForm ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-2">Get a confirmation email</h3>
                      <div className="flex gap-2 w-full">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          onClick={handleSendConfirmationEmail}
                          disabled={isSubmitting}
                          className="bg-indomie-red hover:bg-indomie-red/90 relative overflow-hidden group"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {isSubmitting ? "Sending..." : "Send"}
                            <Send className="h-4 w-4" />
                          </span>
                          <span className="absolute bottom-0 left-0 w-full h-0 bg-indomie-yellow transition-all duration-300 group-hover:h-full -z-0"></span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">Want a confirmation email?</h3>
                      <Button
                        variant="outline"
                        className="border-indomie-red/30 hover:bg-indomie-red/10"
                        onClick={() => setShowEmailForm(true)}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Get Email Confirmation
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Email Sent Confirmation */}
              {(isEmailSent || userEmail) && (
                <div className="p-5 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Confirmation Email Sent</h3>
                      <p className="text-sm text-gray-600">
                        A confirmation email has been sent to {emailAddress || userEmail}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-center relative z-10 mt-2">
              <div className="space-x-4">
                <Button 
                  variant="outline"
                  className="border-gray-200 hover:bg-gray-50"
                  onClick={() => navigate("/")}
                >
                  Back to Products
                </Button>
                <Button 
                  className="bg-indomie-red hover:bg-indomie-red/90 relative overflow-hidden group"
                  onClick={() => navigate("/")}
                >
                  <span className="relative z-10">Home</span>
                  <span className="absolute bottom-0 left-0 w-full h-0 bg-indomie-yellow transition-all duration-300 group-hover:h-full -z-0"></span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
