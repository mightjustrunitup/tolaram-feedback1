
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Logo from "@/components/layout/Logo";
import { Lock, User } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login - frontend only
    setTimeout(() => {
      setLoading(false);
      // Success notification
      toast.success("Login successful!");
      // Navigate to home page after login
      navigate("/home");
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Background Image Section - visible on medium and larger screens */}
      <div 
        className="hidden md:block md:w-3/5 lg:w-2/3 bg-center bg-cover animate-fade-in" 
        style={{ backgroundImage: "url('/indomie-bg.jpg')" }}
      >
        <div className="h-full w-full bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="p-12 md:p-16 lg:p-24 max-w-2xl animate-fade-in-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 text-shadow">Welcome to the Indomie Feedback Oasis</h1>
            <p className="text-lg lg:text-xl text-white/90 text-shadow">Your opinion matters to us. Help us improve your experience!</p>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-0 bg-white">
        <Card className="w-full max-w-md shadow-xl animate-scale-in border-t-4 border-t-indomie-red">
          <CardHeader className="space-y-2">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the feedback portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-indomie-red hover:bg-indomie-red/90 transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-gray-500">
              <span>Don't have an account? </span>
              <a href="#" className="text-indomie-red hover:underline">Register here</a>
            </div>
            <Button 
              variant="outline" 
              className="w-full border-indomie-yellow text-indomie-dark hover:bg-indomie-yellow/10"
              onClick={() => navigate("/home")}
            >
              Continue as Guest
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
