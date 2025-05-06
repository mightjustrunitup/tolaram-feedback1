import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, AlertCircle } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";

// Example locations - updated with new examples
const LOCATIONS = [
  "Ikeja",
  "Badagry",
  "Lekki",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Kano",
  "Enugu"
];

// Issues list
const PRODUCT_ISSUES = [
  "Mislabelled products / allergies",
  "Unusual taste or odor",
  "Texture - too hard or soft",
  "Mold or spoilage",
  "Foreign elements",
  "Other"
];

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
}

// Default product to use when no product is selected
const DEFAULT_PRODUCT: Product = {
  id: "general",
  name: "Our Products",
  image: "https://placehold.co/400x300/FFFFFF/E51E25?text=Tolaram",
  description: "Please provide your general feedback about our products and services"
};

export default function Feedback() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = (location.state?.selectedProduct as Product | null) || DEFAULT_PRODUCT;
  
  const [date, setDate] = useState<Date>(new Date());
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string>("");
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    location: "",
    staffFriendliness: 4,
    cleanliness: 4,
    productAvailability: 4,
    overallExperience: 4,
    comments: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleRatingChange = (name: string, value: number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Validate name if not anonymous
    if (!isAnonymous && !formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }
    
    // Location is now optional, so we remove the validation check
    
    // Set errors and return validity result
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setSubmitting(true);
    
    // Simulate submission - frontend only
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Feedback submitted successfully!");
      
      // Navigate to thank you page with relevant data
      navigate("/thank-you", { 
        state: { 
          customerName: isAnonymous ? "Valued Customer" : formData.customerName,
          email: formData.email,
          productName: selectedProduct?.name || "our products"
        } 
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col noodle-bg-light">
      {/* Fixed Header */}
      <header className="w-full bg-white border-b py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </header>

      {/* Feedback Form - add padding-top for the fixed header */}
      <div className="flex-1 py-12 px-6 relative pt-20">
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full bg-[radial-gradient(#FFC72C_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <Card className="shadow-lg animate-fade-in border-t-4 border-t-indomie-red relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-indomie-yellow/30 blur-xl"></div>
            <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-indomie-red/30 blur-xl"></div>
            
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl font-bold">Share Your Feedback</CardTitle>
                <Badge 
                  className="px-3 py-1 bg-indomie-red/20 text-indomie-red border border-indomie-red/30 flex items-center gap-2"
                  variant="outline"
                >
                  <div className="w-4 h-4 rounded-hidden overflow-hidden">
                    <img 
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  Feedback for {selectedProduct.name}
                </Badge>
              </div>
              <CardDescription>
                Help us improve your {selectedProduct.name} experience by completing this short feedback form.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Information - Changed border from amber to grey */}
                <div className="p-4 border border-gray-200 bg-amber-50/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 border">
                      <img 
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
                      <p className="text-sm text-gray-600">{selectedProduct.description}</p>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="anonymous" 
                      checked={isAnonymous}
                      onCheckedChange={(checked) => {
                        setIsAnonymous(checked === true);
                        // Clear name error if switching to anonymous
                        if (checked && errors.customerName) {
                          setErrors(prev => ({ ...prev, customerName: "" }));
                        }
                      }}
                    />
                    <label
                      htmlFor="anonymous"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I want to remain anonymous
                    </label>
                  </div>
                  
                  {!isAnonymous && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customerName" className="flex justify-between">
                          <span>Your Name</span>
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="customerName"
                          name="customerName"
                          placeholder="Enter your name"
                          value={formData.customerName}
                          onChange={handleInputChange}
                          className={errors.customerName ? "border-red-500" : ""}
                        />
                        {errors.customerName && (
                          <p className="text-sm text-red-500 mt-1">{errors.customerName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Visit Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date of Visit</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(date) => date && setDate(date)}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>
                      <span>Location (Optional)</span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Enter your location (e.g., Ikeja, Badagry)"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Rating Scales - Now using Star Ratings instead of Sliders - Changed border from yellow to grey */}
                <div className="space-y-6 p-4 bg-white/70 rounded-md backdrop-blur-sm border border-gray-200">
                  <h3 className="font-semibold text-lg mb-4 text-indomie-dark">Rate Your Experience</h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 hover:bg-gray-50/70 rounded-md transition-colors">
                      <StarRating
                        label={`Staff Friendliness`}
                        value={formData.staffFriendliness}
                        onChange={(value) => handleRatingChange("staffFriendliness", value)}
                        max={5}
                        color="text-indomie-yellow"
                        size="lg"
                        showValue
                      />
                    </div>
                    
                    <div className="p-3 hover:bg-gray-50/70 rounded-md transition-colors">
                      <StarRating
                        label={`Cleanliness`}
                        value={formData.cleanliness}
                        onChange={(value) => handleRatingChange("cleanliness", value)}
                        max={5}
                        color="text-indomie-yellow"
                        size="lg"
                        showValue
                      />
                    </div>
                    
                    <div className="p-3 hover:bg-gray-50/70 rounded-md transition-colors">
                      <StarRating
                        label={`Product Availability`}
                        value={formData.productAvailability}
                        onChange={(value) => handleRatingChange("productAvailability", value)}
                        max={5}
                        color="text-indomie-yellow"
                        size="lg"
                        showValue
                      />
                    </div>
                    
                    <div className="p-3 hover:bg-gray-50/70 rounded-md transition-colors">
                      <StarRating
                        label={`Overall Experience`}
                        value={formData.overallExperience}
                        onChange={(value) => handleRatingChange("overallExperience", value)}
                        max={5}
                        color="text-indomie-yellow"
                        size="lg"
                        showValue
                      />
                    </div>
                  </div>
                </div>

                {/* Common Issues - Now using a Dropdown - Changed border from yellow to grey */}
                <div className="space-y-3 p-4 bg-white/80 rounded-md backdrop-blur-sm border border-gray-200">
                  <Label className="text-base font-medium">Did you experience any of these issues?</Label>
                  
                  <Select 
                    value={selectedIssue} 
                    onValueChange={setSelectedIssue}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select any issues you experienced..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectGroup>
                        <SelectLabel className="font-semibold text-indomie-red">Common Product Issues</SelectLabel>
                        {PRODUCT_ISSUES.map((issue) => (
                          <SelectItem 
                            key={issue} 
                            value={issue}
                            className="flex items-center gap-2 focus:bg-indomie-yellow/10 hover:bg-indomie-yellow/5 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-amber-500" />
                              <span>{issue}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  {selectedIssue && (
                    <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
                      <p className="text-sm text-amber-800 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Thank you for reporting: <span className="font-medium">{selectedIssue}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Comments - now with 100 word limit */}
                <div className="space-y-2">
                  <Label htmlFor="comments">Additional Comments</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    placeholder={`Please share any additional feedback, issues, or suggestions...`}
                    className="min-h-[120px]"
                    value={formData.comments}
                    onChange={handleInputChange}
                    maxWords={100}
                    showWordCount={true}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between items-center relative z-10 mt-4">
              <Button 
                variant="outline"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button 
                className="bg-indomie-red hover:bg-indomie-red/90 relative overflow-hidden group"
                onClick={handleSubmit}
                disabled={submitting}
              >
                <span className="relative z-10">
                  {submitting ? "Submitting..." : "Submit Feedback"}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0 bg-indomie-yellow transition-all duration-300 group-hover:h-full -z-0"></span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
