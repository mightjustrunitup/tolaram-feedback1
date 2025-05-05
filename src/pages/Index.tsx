
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/layout/Logo";
import { useEffect, useRef, useState } from "react";
import { Package } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define product types
interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
}

// Use local placeholder images with text to ensure display
const products: Product[] = [
  {
    id: "indomie",
    name: "Indomie",
    image: "https://placehold.co/400x300/FFFFFF/E51E25?text=Indomie",
    description: "Delicious instant noodles with a variety of flavors"
  },
  {
    id: "minimie",
    name: "Minimie",
    image: "https://placehold.co/400x300/FFFFFF/FFB800?text=Minimie",
    description: "Mini-sized instant noodles perfect for snacking"
  },
  {
    id: "dano",
    name: "Dano Milk",
    image: "https://placehold.co/400x300/FFFFFF/0075C2?text=Dano+Milk",
    description: "High quality milk products for your daily needs"
  },
  {
    id: "kelloggs",
    name: "Kellogg's Cereals",
    image: "https://placehold.co/400x300/FFFFFF/E31837?text=Kellogg's",
    description: "Nutritious breakfast cereals for a great start to your day"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [showProducts, setShowProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const selectTriggerRef = useRef<HTMLButtonElement>(null);
  
  const handleProductSelect = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };
  
  const handleContinue = () => {
    if (selectedProduct) {
      // Pass the selected product ID in the navigation state
      navigate("/feedback", { state: { selectedProduct } });
    }
  };

  // Auto-show products and open dropdown when page loads
  useEffect(() => {
    // Automatically show products section
    setShowProducts(true);
    
    // Add a small delay to allow the DOM to update
    const timer = setTimeout(() => {
      // Click the select trigger to open the dropdown
      if (selectTriggerRef.current) {
        selectTriggerRef.current.click();
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 noodle-pattern">
      {/* Fixed Header */}
      <header className="w-full bg-white border-b py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <Button 
              variant="outline"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      <div className="text-center max-w-3xl px-4 pt-20">
        <h1 className="text-4xl font-bold mt-8 mb-4">Welcome to Feedback Portal</h1>
        <p className="text-xl text-gray-600 mb-8">Your opinion matters to us. Help us improve your experience!</p>
        
        <div className="flex flex-col items-center gap-8">
          {!showProducts ? (
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white relative overflow-hidden group"
              onClick={() => setShowProducts(true)}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Package />
                Select Product
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0 bg-blue-800 transition-all duration-300 group-hover:h-full -z-0"></span>
            </Button>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-6">Choose a product to provide feedback on</h2>
              
              <div className="w-full max-w-md">
                <Select onValueChange={handleProductSelect}>
                  <SelectTrigger className="w-full" ref={selectTriggerRef}>
                    <SelectValue placeholder="Select a product" />
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
                
                <div className="mt-8 flex flex-col items-center">
                  {selectedProduct && (
                    <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm w-full">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
                          <p className="text-sm text-gray-600">{selectedProduct.description}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-4 mt-4">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setShowProducts(false);
                        setSelectedProduct(null);
                      }}
                    >
                      Back
                    </Button>
                    
                    <Button 
                      disabled={!selectedProduct}
                      className="bg-indomie-red hover:bg-indomie-red/90"
                      onClick={handleContinue}
                    >
                      Continue with {selectedProduct?.name || "selected product"}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        {!showProducts && (
          <div className="mt-12">
            <Button 
              size="lg" 
              variant="outline"
              className="border-indomie-yellow hover:bg-indomie-yellow/10 relative overflow-hidden group"
              onClick={() => navigate("/home")}
            >
              <span className="relative z-10">Explore More</span>
              <span className="absolute bottom-0 left-0 w-0 h-full bg-indomie-yellow/20 transition-all duration-300 group-hover:w-full -z-0"></span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
