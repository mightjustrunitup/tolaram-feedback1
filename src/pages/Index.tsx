
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Logo from "@/components/layout/Logo";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { FeedbackService, FeedbackSubmission, Product, ProductVariant, Issue } from "@/services/feedbackService";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

const Index = () => {
  const navigate = useNavigate();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formValid, setFormValid] = useState(false);
  
  // Changed from single issue to multiple issues with checkboxes
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    location: "",
    comments: "",
    staffFriendliness: 4,
    cleanliness: 4,
    productAvailability: 4,
    overallExperience: 4,
    isAnonymous: false
  });

  // Fetch products from Supabase
  const { 
    data: products = [],
    isLoading: isLoadingProducts,
    error: productsError 
  } = useQuery({
    queryKey: ['products'],
    queryFn: FeedbackService.getProducts
  });

  // Fetch issues from Supabase
  const { 
    data: issues = [],
    isLoading: isLoadingIssues,
    error: issuesError 
  } = useQuery({
    queryKey: ['issues'],
    queryFn: FeedbackService.getIssues
  });

  // Fetch variants when a product is selected
  const { 
    data: variants = [],
    isLoading: isLoadingVariants,
    error: variantsError
  } = useQuery({
    queryKey: ['productVariants', selectedProduct?.id],
    queryFn: () => selectedProduct?.id ? FeedbackService.getProductVariants(selectedProduct.id) : Promise.resolve([]),
    enabled: !!selectedProduct?.id,
  });
  
  // Check form validity whenever relevant fields change
  useEffect(() => {
    const isValid = selectedProduct !== null && 
                    (selectedProduct ? true : false); // Making variant optional
    setFormValid(isValid);
  }, [selectedProduct, selectedVariant]);

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

  const handleRatingChange = (name: string, value: number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSelect = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      // Reset the selected variant when product changes
      setSelectedVariant(null);
      // Reset the selected issues when product changes
      setSelectedIssue(null);
    }
  };

  const handleVariantSelect = (variantId: string) => {
    setSelectedVariant(variantId);
    // Clear variant error if it exists
    if (errors.variant) {
      setErrors(prev => ({ ...prev, variant: "" }));
    }
  };

  const handleIssueSelect = (issueId: string) => {
    setSelectedIssue(issueId);
    // Clear issue error if it exists
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

    // Set errors and return validity result
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setSubmitting(true);

    try {
      // Prepare data to send to Supabase
      const feedbackData: FeedbackSubmission = {
        customer_name: formData.isAnonymous ? undefined : formData.customerName || undefined,
        email: formData.isAnonymous ? undefined : formData.email || undefined,
        location: formData.location || undefined,
        product_id: selectedProduct?.id || "",
        product_variant_id: selectedVariant || undefined,
        selected_issue_id: selectedIssue || undefined,
        staff_friendliness: formData.staffFriendliness,
        cleanliness: formData.cleanliness,
        product_availability: formData.productAvailability,
        overall_experience: formData.overallExperience,
        comments: formData.comments || undefined,
        is_anonymous: formData.isAnonymous,
        date_of_visit: new Date().toISOString() // Convert Date to string in ISO format
      };
      
      // Submit to Supabase
      const response = await FeedbackService.submitFeedback(feedbackData);
      
      if (response.submitted) {
        // Navigate to thank you page
        navigate("/thank-you", { 
          state: { 
            customerName: formData.isAnonymous ? "Valued Customer" : formData.customerName || "Valued Customer",
            email: formData.email,
            productName: selectedProduct?.name || "our product"
          } 
        });
      } else {
        toast.error("Failed to submit feedback. Please try again.");
        setSubmitting(false);
      }
      
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      toast.error(error.message || "Failed to submit feedback. Please try again.");
      setSubmitting(false);
    }
  };

  if (isLoadingProducts || isLoadingIssues) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600">Loading feedback form...</p>
      </div>
    );
  }

  if (productsError || issuesError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 text-red-800 p-4 rounded-md mb-4 max-w-md w-full">
          <h3 className="text-lg font-semibold">Error Loading Data</h3>
          <p>We encountered a problem loading the necessary data. Please try again later.</p>
        </div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

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
                  Your opinion matters to us, and we're committed to making our products better with your input.
                </CardDescription>
              </div>
              {selectedProduct && (
                <Badge 
                  className="px-3 py-1 bg-indomie-red/20 text-indomie-red border border-indomie-red/30 flex items-center gap-2 mx-auto"
                  variant="outline"
                >
                  <div className="w-4 h-4 rounded overflow-hidden">
                    <img 
                      src={selectedProduct.image_url}
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
                {/* Customer Information - With anonymous checkbox */}
                <div className="space-y-4 p-4 bg-white/80 rounded-md backdrop-blur-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Your Information</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="isAnonymous" 
                        checked={formData.isAnonymous}
                        onCheckedChange={(checked) => {
                          setFormData(prev => ({ ...prev, isAnonymous: checked === true }));
                        }}
                      />
                      <label
                        htmlFor="isAnonymous"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I want to remain anonymous
                      </label>
                    </div>
                  </div>
                  
                  {!formData.isAnonymous && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customerName">
                          <span>Your Name (Optional)</span>
                        </Label>
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

                  <div className="space-y-2">
                    <Label>
                      <span>Location (Optional)</span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Enter your location (e.g., Ikeja)"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

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
                        <SelectItem key={product.id} value={product.id} className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded overflow-hidden bg-gray-100">
                              <img 
                                src={product.image_url}
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

                {selectedProduct && variants.length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="variant">
                      <span>Select {selectedProduct.name} Variant (Optional)</span>
                    </Label>
                    <RadioGroup 
                      value={selectedVariant || ""} 
                      onValueChange={handleVariantSelect}
                      className={cn(
                        "grid grid-cols-1 md:grid-cols-2 gap-2 p-2", 
                        errors.variant ? "border border-red-500 rounded-md" : ""
                      )}
                    >
                      {variants.map((variant) => (
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

                {/* Rating Scales */}
                <div className="space-y-6 p-4 bg-white/70 rounded-md backdrop-blur-sm border border-gray-200">
                  <h3 className="font-semibold text-lg mb-4 text-indomie-dark">Rate Your Experience</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 hover:bg-gray-50/70 rounded-md transition-colors">
                        <div className="flex flex-col">
                          <Label className="mb-2">Staff Friendliness</Label>
                          <Select
                            value={formData.staffFriendliness.toString()}
                            onValueChange={(value) => handleRatingChange("staffFriendliness", parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 - Poor</SelectItem>
                              <SelectItem value="2">2 - Fair</SelectItem>
                              <SelectItem value="3">3 - Good</SelectItem>
                              <SelectItem value="4">4 - Very Good</SelectItem>
                              <SelectItem value="5">5 - Excellent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="p-3 hover:bg-gray-50/70 rounded-md transition-colors">
                        <div className="flex flex-col">
                          <Label className="mb-2">Cleanliness</Label>
                          <Select
                            value={formData.cleanliness.toString()}
                            onValueChange={(value) => handleRatingChange("cleanliness", parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 - Poor</SelectItem>
                              <SelectItem value="2">2 - Fair</SelectItem>
                              <SelectItem value="3">3 - Good</SelectItem>
                              <SelectItem value="4">4 - Very Good</SelectItem>
                              <SelectItem value="5">5 - Excellent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="p-3 hover:bg-gray-50/70 rounded-md transition-colors">
                        <div className="flex flex-col">
                          <Label className="mb-2">Product Availability</Label>
                          <Select
                            value={formData.productAvailability.toString()}
                            onValueChange={(value) => handleRatingChange("productAvailability", parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 - Poor</SelectItem>
                              <SelectItem value="2">2 - Fair</SelectItem>
                              <SelectItem value="3">3 - Good</SelectItem>
                              <SelectItem value="4">4 - Very Good</SelectItem>
                              <SelectItem value="5">5 - Excellent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="p-3 hover:bg-gray-50/70 rounded-md transition-colors">
                        <div className="flex flex-col">
                          <Label className="mb-2">Overall Experience</Label>
                          <Select
                            value={formData.overallExperience.toString()}
                            onValueChange={(value) => handleRatingChange("overallExperience", parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 - Poor</SelectItem>
                              <SelectItem value="2">2 - Fair</SelectItem>
                              <SelectItem value="3">3 - Good</SelectItem>
                              <SelectItem value="4">4 - Very Good</SelectItem>
                              <SelectItem value="5">5 - Excellent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Issues - Now using a Dropdown */}
                <div className="space-y-3 p-4 bg-white/80 rounded-md backdrop-blur-sm border border-gray-200">
                  <Label className="text-base font-medium">Did you experience any of these issues?</Label>
                  
                  <Select 
                    value={selectedIssue || ""} 
                    onValueChange={handleIssueSelect}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select any issues you experienced (Optional)" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {issues.map((issue) => (
                        <SelectItem 
                          key={issue.id} 
                          value={issue.id}
                          className="flex items-center gap-2 focus:bg-indomie-yellow/10 hover:bg-indomie-yellow/5 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span>{issue.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Comments */}
                <div className="space-y-2">
                  <Label htmlFor="comments">Additional Comments</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    placeholder="Please share any additional details about your experience..."
                    className="min-h-[120px]"
                    value={formData.comments}
                    onChange={handleInputChange}
                    maxWords={100}
                    showWordCount={true}
                  />
                </div>
                
                <CardFooter className="flex justify-end items-center pt-4 px-0">
                  <Button 
                    className="transition-colors"
                    type="submit"
                    disabled={submitting || !formValid}
                    variant={formValid ? "default" : "disabled-red"}
                    style={{
                      backgroundColor: formValid ? "#ea384c" : undefined
                    }}
                  >
                    {submitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
