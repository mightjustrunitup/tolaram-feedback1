
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { RangeSlider } from "@/components/ui/range-slider";
import Logo from "@/components/layout/Logo";
import { toast } from "sonner";

// Mock store locations
const STORE_LOCATIONS = [
  "Lagos - Ikeja Mall",
  "Lagos - Lekki Phase 1",
  "Abuja - Wuse II",
  "Abuja - Jabi Lake Mall",
  "Port Harcourt - GRA",
  "Ibadan - Dugbe",
  "Kano - Nassarawa",
  "Enugu - New Haven"
];

export default function Feedback() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    storeLocation: "",
    staffFriendliness: [5],
    cleanliness: [5],
    productAvailability: [5],
    overallExperience: [5],
    comments: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate submission - frontend only
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Feedback submitted successfully!");
      navigate("/thank-you");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col noodle-bg-light">
      {/* Header */}
      <header className="w-full bg-white border-b py-4 px-6 shadow-md relative z-10">
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

      {/* Feedback Form */}
      <div className="flex-1 py-12 px-6 relative">
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full bg-[radial-gradient(#FFC72C_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <Card className="shadow-lg animate-fade-in border-t-4 border-t-indomie-red relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-indomie-yellow/30 blur-xl"></div>
            <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-indomie-red/30 blur-xl"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl font-bold">Share Your Feedback</CardTitle>
              <CardDescription>
                Help us improve your Indomie experience by completing this short feedback form.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="anonymous" 
                      checked={isAnonymous}
                      onCheckedChange={(checked) => setIsAnonymous(checked === true)}
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
                        <Label htmlFor="customerName">Your Name</Label>
                        <Input
                          id="customerName"
                          name="customerName"
                          placeholder="Enter your name"
                          value={formData.customerName}
                          onChange={handleInputChange}
                        />
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
                    <Label>Store Location</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("storeLocation", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select store location" />
                      </SelectTrigger>
                      <SelectContent>
                        {STORE_LOCATIONS.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Rating Scales */}
                <div className="space-y-6 p-4 bg-white/70 rounded-md backdrop-blur-sm border border-indomie-yellow/20">
                  <h3 className="font-semibold text-lg mb-4 text-indomie-dark">Rate Your Experience</h3>
                  
                  <div className="space-y-2">
                    <Label>Staff Friendliness (1-10)</Label>
                    <RangeSlider
                      min={1}
                      max={10}
                      step={1}
                      value={formData.staffFriendliness}
                      onValueChange={(value) => handleSliderChange("staffFriendliness", value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Cleanliness (1-10)</Label>
                    <RangeSlider
                      min={1}
                      max={10}
                      step={1}
                      value={formData.cleanliness}
                      onValueChange={(value) => handleSliderChange("cleanliness", value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Product Availability (1-10)</Label>
                    <RangeSlider
                      min={1}
                      max={10}
                      step={1}
                      value={formData.productAvailability}
                      onValueChange={(value) => handleSliderChange("productAvailability", value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Overall Experience (1-10)</Label>
                    <RangeSlider
                      min={1}
                      max={10}
                      step={1}
                      value={formData.overallExperience}
                      onValueChange={(value) => handleSliderChange("overallExperience", value)}
                    />
                  </div>
                </div>

                {/* Comments */}
                <div className="space-y-2">
                  <Label htmlFor="comments">Additional Comments</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    placeholder="Please share any additional feedback, issues, or suggestions..."
                    className="min-h-[120px]"
                    value={formData.comments}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Common Issues Checkbox */}
                <div className="space-y-3">
                  <Label>Did you experience any of these issues?</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Mislabelled products / allergies",
                      "Unusual taste or odor",
                      "Texture - too hard or soft",
                      "Mold or spoilage",
                      "Foreign elements"
                    ].map((issue) => (
                      <div key={issue} className="flex items-center space-x-2">
                        <Checkbox id={issue.replace(/\s/g, '')} />
                        <label
                          htmlFor={issue.replace(/\s/g, '')}
                          className="text-sm"
                        >
                          {issue}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between relative z-10">
              <Button 
                variant="outline"
                onClick={() => navigate("/home")}
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
