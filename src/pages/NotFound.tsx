
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full bg-white border-b py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md animate-fade-in">
          <div className="text-9xl font-bold text-indomie-red mb-4">404</div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Button 
            size="lg"
            className="bg-indomie-red hover:bg-indomie-red/90 inline-flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <Home className="h-5 w-5" />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
