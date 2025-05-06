
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define product types
interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  variants: Array<{
    id: string;
    name: string;
  }>;
}

// Use local placeholder images with text to ensure display
const products: Product[] = [
  {
    id: "indomie",
    name: "Indomie",
    image: "https://placehold.co/400x300/FFFFFF/E51E25?text=Indomie",
    description: "Delicious instant noodles with a variety of flavors",
    variants: [
      { id: "indomie-chicken", name: "Indomie Tables Chicken" },
      { id: "indomie-jollof", name: "Indomie Jollof Flavor" },
      { id: "indomie-onion-chicken", name: "Indomie Onion Chicken Flavour" },
      { id: "indomie-crayfish", name: "Indomie Crayfish Flavour" },
      { id: "indomie-chicken-pepper-soup", name: "Indomie Chicken Pepper Soup" },
      { id: "indomie-oriental", name: "Indomie Oriental Fried Noodle" },
      { id: "indomie-relish-beef", name: "Indomie Relish Beef" },
      { id: "indomie-relish-seafood", name: "Indomie Relish Sea Food Delight" }
    ]
  },
  {
    id: "minimie",
    name: "Minimie",
    image: "https://placehold.co/400x300/FFFFFF/FFB800?text=Minimie",
    description: "Mini-sized instant noodles perfect for snacking",
    variants: [
      { id: "minimie-chinchin", name: "Minimie Chinchin" },
      { id: "minimie-chinchin-spicy", name: "Minimie Chinchin (Hot and Spicy)" },
      { id: "minimie-noodle-chicken", name: "Minimie Instant Noodle Chicken Flavour" },
      { id: "minimie-noodle-vegetable", name: "Minimie Instant Noodle Vegetable" },
      { id: "minimie-noodle-tomato", name: "Minimie Instant Noodle Tomato" }
    ]
  },
  {
    id: "dano",
    name: "Dano Milk",
    image: "https://placehold.co/400x300/FFFFFF/0075C2?text=Dano+Milk",
    description: "High quality milk products for your daily needs",
    variants: [
      { id: "dano-slim", name: "Dano Slim" },
      { id: "dano-cool-cow", name: "Dano Cool Cow" },
      { id: "dano-uht", name: "Dano UHT" },
      { id: "dano-vitakids", name: "Dano Vitakids" }
    ]
  },
  {
    id: "kelloggs",
    name: "Kellogg's Cereals",
    image: "https://placehold.co/400x300/FFFFFF/E31837?text=Kellogg's",
    description: "Nutritious breakfast cereals for a great start to your day",
    variants: [
      { id: "kelloggs-corn-flakes", name: "Kelloggs Corn Flakes" },
      { id: "kelloggs-cocopops", name: "Kelloggs Cocopops" },
      { id: "kelloggs-frosties", name: "Kelloggs Frosties" },
      { id: "kelloggs-rice-krispies", name: "Kelloggs Rice Krispies" },
      { id: "kelloggs-crunchy-nut", name: "Kelloggs Crunchy Nut" },
      { id: "kelloggs-crispix", name: "Kelloggs Crispix" },
      { id: "kelloggs-krave", name: "Kelloggs Krave" }
    ]
  }
];

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

// Issues list
const PRODUCT_ISSUES = [
  "Mislabelled products / allergies",
  "Unusual taste or odor",
  "Texture - too hard or soft",
  "Mold or spoilage",
  "Foreign elements",
  "Other"
];

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const [date, setDate] = useState<Date>(new Date());
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    storeLocation: "",
    comments: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleProductSelect = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      // Reset the selected variant when product changes
      setSelectedVariant(null);
    }
  };

  const handleVariantSelect = (variantId: string) => {
    setSelectedVariant(variantId);
    // Clear variant error if it exists
    if (errors.variant) {
      setErrors(prev => ({ ...prev, variant: "" }));
    }
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Validate product selection
    if (!selectedProduct) {
      newErrors.product = "Please select a product";
    }

    // Validate variant selection
    if (selectedProduct && !selectedVariant) {
      newErrors.variant = "Please select a product variant";
    }
    
    // Validate name if not anonymous
    if (!isAnonymous && !formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }
    
    // Store location is always required
    if (!formData.storeLocation) {
      newErrors.storeLocation = "Please select a store location";
    }
    
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
      // Reset form after successful submission
      setSelectedProduct(null);
      setSelectedVariant(null);
      setFormData({
        customerName: "",
        email: "",
        storeLocation: "",
        comments: ""
      });
      setIsAnonymous(false);
      setSelectedIssue("");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col noodle-bg-light">
      {/* Fixed Header */}
      <header className="w-full bg-white border-b py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <Logo />
        </div>
      </header>

      {/* Feedback Form */}
      <div className="flex-1 py-8 px-6 relative pt-20">
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full bg-[radial-gradient(#FFC72C_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <Card className="shadow-lg animate-fade-in border-t-4 border-t-indomie-red relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-indomie-yellow/30 blur-xl"></div>
            <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-indomie-red/30 blur-xl"></div>
            
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl font-bold">Welcome to Tolaram Feedback Portal</CardTitle>
                {selectedProduct && (
                  <Badge 
                    className="px-3 py-1 bg-indomie-red/20 text-indomie-red border border-indomie-red/30 flex items-center gap-2"
                    variant="outline"
                  >
                    <div className="w-4 h-4 rounded overflow-hidden">
                      <img 
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    Feedback for {selectedProduct.name}
                  </Badge>
                )}
              </div>
              <CardDescription>
                Help us improve our products by completing this short feedback form.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Selection */}
                <div className="space-y-2">
                  <Label htmlFor="product" className="flex justify-between">
                    <span>Select Product</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    onValueChange={handleProductSelect}
                    value={selectedProduct?.id}
                  >
                    <SelectTrigger className={errors.product ? "border-red-500" : ""}>
                      <SelectValue placeholder="Choose a product to provide feedback on" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded overflow-hidden">
                              <img 
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span>{product.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.product && (
                    <p className="text-sm text-red-500 mt-1">{errors.product}</p>
                  )}
                </div>

                {/* Product Variants Selection - Radio Buttons */}
                {selectedProduct && (
                  <div className="space-y-3">
                    <Label className="flex justify-between">
                      <span>Select {selectedProduct.name} Variant</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className={cn("border rounded-md p-4", errors.variant ? "border-red-500" : "border-gray-200")}>
                      <RadioGroup
                        value={selectedVariant || ""}
                        onValueChange={handleVariantSelect}
                        className="grid grid-cols-1 gap-3"
                      >
                        {selectedProduct.variants.map((variant) => (
                          <div key={variant.id} className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-md">
                            <RadioGroupItem value={variant.id} id={variant.id} />
                            <Label htmlFor={variant.id} className="cursor-pointer flex-1">
                              {variant.name}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    {errors.variant && (
                      <p className="text-sm text-red-500 mt-1">{errors.variant}</p>
                    )}
                  </div>
                )}

                {/* Selected Product Information (if selected) */}
                {selectedProduct && selectedVariant && (
                  <div className="p-4 border border-dashed border-indomie-yellow/50 bg-amber-50/50 rounded-lg">
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
                        <div className="text-sm text-gray-600">
                          <p>{selectedProduct.description}</p>
                          <p className="mt-1 font-medium">
                            Selected: {selectedProduct.variants.find(v => v.id === selectedVariant)?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                    <Label className="flex justify-between">
                      <span>Store Location</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("storeLocation", value)}
                      value={formData.storeLocation}
                    >
                      <SelectTrigger className={errors.storeLocation ? "border-red-500" : ""}>
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
                    {errors.storeLocation && (
                      <p className="text-sm text-red-500 mt-1">{errors.storeLocation}</p>
                    )}
                  </div>
                </div>

                {/* Common Issues - Now using Radio Buttons */}
                {selectedProduct && selectedVariant && (
                  <div className="space-y-3 p-4 bg-white/80 rounded-md backdrop-blur-sm border border-indomie-yellow/20">
                    <Label className="text-base font-medium">Did you experience any of these issues with {selectedProduct?.name}?</Label>
                    
                    <RadioGroup 
                      value={selectedIssue} 
                      onValueChange={setSelectedIssue}
                      className="grid grid-cols-1 gap-3 mt-3"
                    >
                      {PRODUCT_ISSUES.map((issue) => (
                        <div key={issue} className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-md">
                          <RadioGroupItem value={issue} id={`issue-${issue}`} />
                          <Label htmlFor={`issue-${issue}`} className="cursor-pointer flex items-center gap-2 flex-1">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                            <span>{issue}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    {selectedIssue && (
                      <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
                        <p className="text-sm text-amber-800 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Thank you for reporting: <span className="font-medium">{selectedIssue}</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Comments */}
                <div className="space-y-2">
                  <Label htmlFor="comments">Additional Comments {selectedProduct ? `about ${selectedProduct.name}` : ''}</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    placeholder={`Please share any additional feedback, issues, or suggestions...`}
                    className="min-h-[120px]"
                    value={formData.comments}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button 
                    className="bg-indomie-red hover:bg-indomie-red/90 relative overflow-hidden group"
                    type="submit"
                    disabled={submitting}
                  >
                    <span className="relative z-10">
                      {submitting ? "Submitting..." : "Submit Feedback"}
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0 bg-indomie-yellow transition-all duration-300 group-hover:h-full -z-0"></span>
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center text-center text-sm text-gray-500 relative z-10">
              <p>Thank you for helping us improve our products and services.</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
