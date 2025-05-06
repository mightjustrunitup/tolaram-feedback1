import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

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

// Store locations - we'll keep this in case it's used elsewhere in the code
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

// Product issues list - updated based on user requirements
const PRODUCT_ISSUES = [
  "Mislabelled products / allergies",
  "Unusual taste or odor",
  "Texture - too hard or soft",
  "Mold or spoilage",
  "Foreign elements"
];

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Changed from single issue to multiple issues with checkboxes
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    customerName: "",
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
      // Reset the selected issues when product changes
      setSelectedIssues([]);
    }
  };

  const handleVariantSelect = (variantId: string) => {
    setSelectedVariant(variantId);
    // Reset the selected issues when variant changes
    setSelectedIssues([]);
    // Clear variant error if it exists
    if (errors.variant) {
      setErrors(prev => ({ ...prev, variant: "" }));
    }
  };

  // New function to handle checkbox changes for issues
  const handleIssueToggle = (issue: string) => {
    setSelectedIssues(current => {
      // If already selected, remove it
      if (current.includes(issue)) {
        return current.filter(i => i !== issue);
      } 
      // Otherwise add it
      return [...current, issue];
    });
    
    // Clear issue error if any issue is selected
    if (errors.issue) {
      setErrors(prev => ({ ...prev, issue: "" }));
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

    // Validate at least one issue is selected
    if (selectedProduct && selectedVariant && selectedIssues.length === 0) {
      newErrors.issue = "Please select at least one issue with the product";
    }
    
    // Store location is always required
    if (!formData.storeLocation) {
      newErrors.storeLocation = "Please enter a store location";
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
    
    // Get selected variant name
    const variantName = selectedProduct?.variants.find(v => v.id === selectedVariant)?.name || "";
    
    // Directly navigate to the Thank-You page with relevant data
    navigate("/thank-you", { 
      state: { 
        customerName: formData.customerName || "Valued Customer", // Use "Valued Customer" if name is empty
        productName: selectedProduct?.name || "our product",
        issues: selectedIssues
      } 
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 to-gray-50">
      {/* Fixed Header */}
      <header className="w-full bg-white border-b py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <Logo />
        </div>
      </header>

      {/* Feedback Form */}
      <div className="flex-1 py-8 px-6 relative pt-24 md:pt-28">
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <Card className="shadow-lg animate-fade-in border-t-4 border-t-indomie-red relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-blue-100/30 blur-xl"></div>
            <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-green-100/30 blur-xl"></div>
            
            <CardHeader className="relative z-10">
              <div className="flex flex-col items-center text-center mb-4">
                <CardTitle className="text-2xl font-bold">Welcome to Tolaram Feedback Portal</CardTitle>
                <CardDescription className="mt-2 max-w-md">
                  Help us improve our products by completing this short feedback form. Your opinion matters to us, and we're committed to making our products better with your input.
                </CardDescription>
              </div>
              {selectedProduct && (
                <Badge 
                  className="px-3 py-1 bg-indomie-red/20 text-indomie-red border border-indomie-red/30 flex items-center gap-2 mx-auto"
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
            </CardHeader>
            
            <CardContent className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information - MOVED TO TOP */}
                <div className="space-y-4 p-4 bg-white/80 rounded-md backdrop-blur-sm border border-indomie-yellow/20">
                  <h3 className="font-semibold text-lg mb-2">Your Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="customerName">
                      <span>Your Name (Optional)</span>
                    </Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      placeholder="Enter your name (optional)"
                      value={formData.customerName}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Store Location - Changed from Select to Input */}
                  <div className="space-y-2">
                    <Label className="flex justify-between">
                      <span>Store Location</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="storeLocation"
                      name="storeLocation"
                      placeholder="Enter store location (city, mall, etc.)"
                      value={formData.storeLocation}
                      onChange={handleInputChange}
                      className={errors.storeLocation ? "border-red-500" : ""}
                    />
                    {errors.storeLocation && (
                      <p className="text-sm text-red-500 mt-1">{errors.storeLocation}</p>
                    )}
                  </div>
                </div>

                {/* Product Selection - Now after user information */}
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
                        <SelectItem key={product.id} value={product.id} className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-100">
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
                
                {/* Product Variant Selection - UPDATED to display in a two-column grid */}
                {selectedProduct && (
                  <div className="space-y-2">
                    <Label htmlFor="variant" className="flex justify-between">
                      <span>Select {selectedProduct.name} Variant</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup 
                      value={selectedVariant || ""} 
                      onValueChange={handleVariantSelect}
                      className={cn(
                        "grid grid-cols-1 md:grid-cols-2 gap-2 p-2", // Changed to 2 columns for md screens and up
                        errors.variant ? "border border-red-500 rounded-md" : ""
                      )}
                    >
                      {selectedProduct.variants.map((variant) => (
                        <div key={variant.id} className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-md">
                          <RadioGroupItem value={variant.id} id={variant.id} />
                          <Label htmlFor={variant.id} className="cursor-pointer flex-grow text-sm">
                            {variant.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.variant && (
                      <p className="text-sm text-red-500 mt-1">{errors.variant}</p>
                    )}
                  </div>
                )}
                
                {/* Issue Selection - Changed to Checkboxes with yellow styling removed */}
                {selectedProduct && selectedVariant && (
                  <div className="space-y-2">
                    <Label htmlFor="issue" className="flex justify-between">
                      <span>What issues did you experience?</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className={cn(
                      "grid grid-cols-1 md:grid-cols-2 gap-2 p-2",
                      errors.issue ? "border border-red-500 rounded-md" : ""
                    )}>
                      {PRODUCT_ISSUES.map((issue) => (
                        <div key={issue} className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-md">
                          <Checkbox 
                            id={issue}
                            checked={selectedIssues.includes(issue)}
                            onCheckedChange={() => handleIssueToggle(issue)}
                          />
                          <Label htmlFor={issue} className="cursor-pointer">
                            {issue}
                          </Label>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-md">
                        <Checkbox 
                          id="other"
                          checked={selectedIssues.includes("Other")}
                          onCheckedChange={() => handleIssueToggle("Other")}
                        />
                        <Label htmlFor="other" className="cursor-pointer">
                          Other
                        </Label>
                      </div>
                    </div>
                    {errors.issue && (
                      <p className="text-sm text-red-500 mt-1">{errors.issue}</p>
                    )}
                  </div>
                )}

                {/* Comments - Only shown if at least one issue is selected */}
                {selectedIssues.length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="comments">Describe the issue(s) in more detail (Optional)</Label>
                    <Textarea
                      id="comments"
                      name="comments"
                      placeholder="Please provide more details about the issue(s)..."
                      value={formData.comments}
                      onChange={handleInputChange}
                      className="min-h-[120px]"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    className="bg-indomie-red hover:bg-indomie-red/90 relative overflow-hidden group"
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
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Index;
