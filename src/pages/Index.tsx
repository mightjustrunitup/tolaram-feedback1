
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AnimatedIndomie from "@/components/layout/AnimatedIndomie";

// Mock product data
const PRODUCTS = [
  {
    id: "1",
    name: "Indomie Mi Goreng",
    image: "/lovable-uploads/d00b8aa9-0602-4cb4-913d-eaced5d824c3.png",
    description: "Original Indonesian fried noodles with authentic spices",
    category: "original"
  },
  {
    id: "2",
    name: "Indomie Chicken Flavor",
    image: "/placeholder.svg",
    description: "Savory chicken flavored instant noodles",
    category: "chicken"
  },
  {
    id: "3",
    name: "Indomie Special Chicken",
    image: "/placeholder.svg",
    description: "Premium chicken flavor with extra spices and seasonings",
    category: "chicken"
  },
  {
    id: "4",
    name: "Indomie Vegetable Flavor",
    image: "/placeholder.svg",
    description: "Delicious vegetable flavored noodles",
    category: "vegetable"
  },
  {
    id: "5",
    name: "Indomie Beef Flavor",
    image: "/placeholder.svg",
    description: "Rich beef flavored instant noodles",
    category: "beef"
  },
  {
    id: "6",
    name: "Indomie Shrimp Flavor",
    image: "/placeholder.svg",
    description: "Tangy shrimp flavored noodles",
    category: "seafood"
  },
  {
    id: "7",
    name: "Indomie Hot & Spicy",
    image: "/placeholder.svg",
    description: "Extra spicy noodles for those who love heat",
    category: "spicy"
  },
  {
    id: "8",
    name: "Indomie Satay Flavor",
    image: "/placeholder.svg",
    description: "Noodles with traditional satay flavor",
    category: "special"
  }
];

// Categories for filtering
const CATEGORIES = [
  { id: "all", name: "All Products" },
  { id: "original", name: "Original" },
  { id: "chicken", name: "Chicken" },
  { id: "beef", name: "Beef" },
  { id: "vegetable", name: "Vegetable" },
  { id: "seafood", name: "Seafood" },
  { id: "spicy", name: "Spicy" },
  { id: "special", name: "Special Editions" }
];

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter products based on search query and selected category
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle product selection
  const handleProductSelect = (product: any) => {
    toast.success(`Thank you for your interest in ${product.name}!`);
    navigate("/thank-you", { state: { selectedProduct: product } });
  };

  return (
    <div className="min-h-screen flex flex-col noodle-bg-light">
      <div className="py-6 px-6 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-indomie-dark">Product Feedback</h1>
              <p className="text-gray-600">Select a product to provide feedback</p>
            </div>
            
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Categories */}
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex gap-2 py-2">
              {CATEGORIES.map((category) => (
                <Badge 
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-1 ${
                    selectedCategory === category.id 
                      ? 'bg-indomie-red hover:bg-indomie-red/90' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </ScrollArea>
          
          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <CardDescription>{product.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      className="w-full bg-indomie-yellow text-indomie-dark hover:bg-indomie-yellow/90"
                      onClick={() => handleProductSelect(product)}
                    >
                      Give Feedback
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                <AnimatedIndomie className="w-20 h-20 mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-800">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
          
          {/* Empty state if no products at all */}
          {PRODUCTS.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <AnimatedIndomie className="w-24 h-24 mb-6 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-800">No products available</h3>
              <p className="text-gray-600 mb-6">Products will appear here once they are added to the system.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
