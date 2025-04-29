
import AnimatedIndomie from "@/components/layout/AnimatedIndomie";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/layout/Logo";

const Index = () => {
  const navigate = useNavigate();
  
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
        <AnimatedIndomie size="xl" />
        
        <h1 className="text-4xl font-bold mt-8 mb-4">Welcome to Indomie Feedback Portal</h1>
        <p className="text-xl text-gray-600 mb-8">Your opinion matters to us. Help us improve your experience!</p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-indomie-red hover:bg-indomie-red/90 text-white relative overflow-hidden group"
            onClick={() => navigate("/feedback")}
          >
            <span className="relative z-10">Share Your Feedback</span>
            <span className="absolute bottom-0 left-0 w-full h-0 bg-indomie-yellow transition-all duration-300 group-hover:h-full -z-0"></span>
          </Button>
          
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
      </div>
    </div>
  );
};

export default Index;
