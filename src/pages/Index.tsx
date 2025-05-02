
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/layout/Logo";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Package } from "lucide-react";

// Define product types
interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: "indomie",
    name: "Indomie",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Indomie_Goreng_Mie.jpg/1200px-Indomie_Goreng_Mie.jpg",
    description: "Delicious instant noodles with a variety of flavors"
  },
  {
    id: "minimie",
    name: "Minimie",
    image: "https://mindsetsanctuary.com/wp-content/uploads/2024/03/Minimie-Logo-vector-image.jpg",
    description: "Mini-sized instant noodles perfect for snacking"
  },
  {
    id: "dano",
    name: "Dano Milk",
    image: "https://i0.wp.com/www.ecowise.ng/wp-content/uploads/2023/07/Dano.jpg",
    description: "High quality milk products for your daily needs"
  },
  {
    id: "kelloggs",
    name: "Kellogg's Cereals",
    image: "https://1000logos.net/wp-content/uploads/2017/03/Kelloggs-Logo.png",
    description: "Nutritious breakfast cereals for a great start to your day"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [showProducts, setShowProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  useEffect(() => {
    // Force reload of images
    setImagesLoaded(true);
  }, []);
  
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    // You could also navigate to a product-specific feedback page
    // navigate(`/feedback/${product.id}`);
  };
  
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
              <h2 className="text-2xl font-semibold">Choose a product to provide feedback on</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {products.map((product) => (
                  <Card 
                    key={product.id} 
                    className={`overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                      selectedProduct?.id === product.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => handleProductSelect(product)}
                  >
                    <div className="h-40 overflow-hidden bg-gray-100">
                      <img 
                        src={`${product.image}?v=${Date.now()}`} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "https://placehold.co/300x200?text=" + product.name;
                        }}
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-600">{product.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex gap-4">
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
                  onClick={() => navigate("/feedback")}
                >
                  Continue with {selectedProduct?.name || "selected product"}
                </Button>
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
