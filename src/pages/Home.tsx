
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/layout/Logo";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="hidden md:flex"
              onClick={() => navigate("/admin")}
            >
              Admin Dashboard
            </Button>
            <Button 
              onClick={() => navigate("/login")}
              variant="ghost"
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-br from-white to-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 animate-fade-in-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-indomie-dark mb-4">
              Your Feedback <span className="text-indomie-red">Matters</span> to Us
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Help us improve your experience with Indomie products by sharing your thoughts and suggestions.
            </p>
            <Button 
              size="lg" 
              className="bg-indomie-red hover:bg-indomie-red/90 hover-scale group"
              onClick={() => navigate("/feedback")}
            >
              Start Feedback
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="flex-1 flex justify-center animate-fade-in-right">
            <div className="relative w-full max-w-lg">
              <img 
                src="/indomie-product.png" 
                alt="Indomie Products" 
                className="w-full h-auto rounded-lg shadow-2xl hover-scale"
              />
              <div className="absolute -bottom-6 -right-6 bg-indomie-yellow text-indomie-dark p-4 rounded-lg shadow-lg rotate-3 animate-pulse-slow">
                <p className="font-bold text-lg">New Flavor Alert!</p>
                <p className="text-sm">Try our limited edition taste</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Your Feedback Is Important</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="bg-indomie-red hover:bg-indomie-red/90 hover-scale"
              onClick={() => navigate("/feedback")}
            >
              Share Your Experience Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indomie-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo className="text-white" />
              <p className="text-gray-400 mt-2">Your opinion matters to us</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Indomie Feedback. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
