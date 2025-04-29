
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/layout/Logo";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col noodle-bg-light">
      <header className="w-full bg-white border-b py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md animate-fade-in relative bg-white/70 backdrop-blur-sm p-12 rounded-xl shadow-xl border border-indomie-yellow/30">
          <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-indomie-yellow/20 blur-xl"></div>
          <div className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full bg-indomie-red/20 blur-xl"></div>
          
          <div className="relative text-9xl font-bold text-indomie-red mb-4 opacity-90">404</div>
          <div className="absolute top-16 left-1/2 -translate-x-1/2 opacity-20 rotate-12">
            <img src="/indomie-product.png" alt="Indomie" className="w-32 h-auto" />
          </div>
          <h1 className="text-3xl font-bold mb-4 relative z-10">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8 relative z-10">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Button 
            size="lg"
            className="bg-indomie-red hover:bg-indomie-red/90 inline-flex items-center gap-2 relative overflow-hidden group"
            onClick={() => navigate("/")}
          >
            <span className="relative z-10 flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Return to Home
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0 bg-indomie-yellow transition-all duration-300 group-hover:h-full -z-0"></span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
