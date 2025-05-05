
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/layout/Logo";
import { ArrowRight, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    // For a real app, you would handle auth logout here
    navigate("/"); // Navigate to the products page (Index)
  };

  return (
    <div className="min-h-screen flex flex-col noodle-pattern">
      {/* Fixed Header */}
      <header className="w-full bg-white border-b py-3 px-4 md:py-4 md:px-6 shadow-md fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          
          {/* Mobile menu button */}
          {isMobile ? (
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                <Menu size={24} />
              </Button>
              
              {/* Mobile dropdown menu */}
              {mobileMenuOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg py-2 px-4 w-48 border border-gray-100 z-30">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start mb-2"
                    onClick={() => {
                      navigate("/admin");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Admin Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start flex items-center gap-2"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut size={18} />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="hidden md:flex"
                onClick={() => navigate("/admin")}
              >
                Admin Dashboard
              </Button>
              <Button 
                onClick={handleSignOut}
                variant="ghost"
                className="flex items-center gap-2"
              >
                <LogOut size={18} />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Content with padding top to prevent overlap with fixed header */}
      <div className="pt-16 md:pt-20">
        {/* Hero Section with solid background instead of image */}
        <section className="flex-1 bg-indomie-yellow/10 relative">
          <div className="absolute inset-0 noodle-texture opacity-30"></div>
          <div className="w-full h-full relative">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-24">
              <div className="animate-fade-in-left bg-black/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-indomie-yellow/20 max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 md:mb-4 text-shadow">
                  Your Feedback <span className="text-indomie-red">Matters</span> to Us
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8">
                  Help us improve your experience with Indomie products by sharing your thoughts and suggestions.
                </p>
                <Button 
                  size={isMobile ? "default" : "lg"}
                  className="bg-indomie-red hover:bg-indomie-red/90 hover-scale group relative overflow-hidden w-full md:w-auto"
                  onClick={() => navigate("/")}
                >
                  <span className="relative z-10 flex items-center">
                    Start Feedback
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0 bg-indomie-yellow transition-all duration-300 group-hover:h-full -z-0"></span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="bg-white py-12 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 noodle-bg-light opacity-50"></div>
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Why Your Feedback Is Important</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: "Improve Products",
                  description: "Your feedback helps us enhance product quality and develop new flavors.",
                  icon: "🍜"
                },
                {
                  title: "Better Service",
                  description: "Help us provide exceptional customer service in all our locations.",
                  icon: "🌟"
                },
                {
                  title: "Community Input",
                  description: "Be part of the Indomie community and share your experience with us.",
                  icon: "👥"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-5 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in border border-indomie-yellow/20"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">{feature.icon}</div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-indomie-dark text-white py-6 md:py-8 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-[radial-gradient(#FFC72C_0.5px,transparent_0.5px)] [background-size:12px_12px] opacity-5"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Logo className="text-white" />
                <p className="text-gray-400 mt-2 text-sm md:text-base">Your opinion matters to us</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3 md:gap-8">
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">Privacy Policy</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">Terms of Service</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">Contact Us</a>
              </div>
            </div>
            
            <div className="mt-6 md:mt-8 pt-3 md:pt-4 border-t border-gray-800 text-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Products Feedback. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
