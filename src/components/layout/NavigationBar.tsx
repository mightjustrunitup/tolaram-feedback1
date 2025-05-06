
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavigationBarProps {
  className?: string;
}

export default function NavigationBar({ className }: NavigationBarProps) {
  const navigate = useNavigate();
  
  return (
    <nav className={cn(
      "w-full bg-white border-b shadow-md py-4 px-6",
      className
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo className="text-gray-800" />
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-gray-700 hover:text-indomie-red hover:bg-gray-100"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </div>
      </div>
    </nav>
  );
}
