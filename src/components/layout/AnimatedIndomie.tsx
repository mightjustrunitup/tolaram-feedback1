
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedIndomieProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  standalone?: boolean;
}

export default function AnimatedIndomie({ size = "lg", className, standalone = true }: AnimatedIndomieProps) {
  const [isHovering, setIsHovering] = useState(false);

  const sizeClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
    xl: "text-7xl"
  };

  const letters = "INDOMIE".split("");
  
  // Calculate delays for staggered animation
  const getAnimationDelay = (index: number) => `${index * 0.1}s`;
  
  useEffect(() => {
    // Add sparkle effect on initial load
    const timer = setTimeout(() => {
      setIsHovering(true);
      setTimeout(() => setIsHovering(false), 2000);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center p-6", 
        className,
        standalone && "my-8"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={cn(
        "font-bold relative overflow-hidden",
        sizeClasses[size],
        standalone && "bg-gradient-to-r from-indomie-red to-indomie-yellow p-6 rounded-lg shadow-lg"
      )}>
        <div className="flex items-center justify-center relative z-10">
          {letters.map((letter, index) => (
            <span
              key={index}
              className={cn(
                "inline-block transition-all duration-300 transform origin-center relative",
                isHovering && "animate-bounce",
              )}
              style={{ 
                animationDelay: getAnimationDelay(index),
                animationDuration: `${0.5 + Math.random() * 0.5}s`
              }}
            >
              <span className={cn(
                "inline-block transition-all duration-500",
                index % 2 === 0 ? "text-indomie-red" : "text-indomie-yellow",
                isHovering && index % 2 === 0 ? "text-indomie-yellow" : "",
                isHovering && index % 2 !== 0 ? "text-indomie-red" : ""
              )}>
                {letter}
              </span>
              
              {/* Sparkle effect on hover */}
              {isHovering && (
                <span className="absolute -top-1 -right-1 text-yellow-300 text-xs animate-pulse">✨</span>
              )}
            </span>
          ))}
        </div>
        
        {/* Animated underline effect */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-indomie-red via-indomie-yellow to-indomie-red animate-gradient-x transition-all duration-500 group-hover:w-full"
             style={{ width: isHovering ? '100%' : '0' }}></div>
        
        {/* Shine effect */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transform -skew-x-45 transition-opacity"
          style={{ 
            opacity: isHovering ? 0.3 : 0,
            animation: isHovering ? 'shine 1.5s ease-in-out' : 'none'
          }}
        ></div>
      </div>
      
      {standalone && (
        <div className="mt-4 text-sm text-gray-500 animate-pulse">
          Hover over me!
        </div>
      )}
    </div>
  );
}
