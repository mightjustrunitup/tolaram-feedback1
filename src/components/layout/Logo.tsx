
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ size = "md", className }: LogoProps) {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean);
    
    // Reset any existing animations
    letters.forEach((letter) => {
      if (letter) {
        letter.style.animation = "none";
        letter.offsetHeight; // Trigger reflow
      }
    });

    // Apply staggered animations with delay
    letters.forEach((letter, index) => {
      if (letter) {
        // Apply different animations to create interesting effects
        letter.style.animation = `
          ${index % 2 === 0 ? 'bounce' : 'pulse'} 
          ${1 + index * 0.1}s 
          ${index * 0.08}s 
          ease-in-out 
          infinite alternate
        `;
        letter.style.display = 'inline-block';
        letter.style.transformOrigin = 'bottom center';
      }
    });
  }, [size]);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div 
        className={cn(
          "font-bold relative", 
          size === "sm" && "text-xl",
          size === "md" && "text-2xl",
          size === "lg" && "text-4xl",
        )}
      >
        <div className="text-indomie-red flex items-center">
          <div className="flex">
            {Array.from("CUSTOMER").map((letter, index) => (
              <span
                key={index}
                ref={el => {
                  if (lettersRef.current) lettersRef.current[index] = el;
                }}
                className="inline-block hover:scale-110 transition-transform duration-200 hover:text-indomie-yellow"
                style={{ animationPlayState: "running" }}
              >
                {letter}
              </span>
            ))}
          </div>
          <span className="mx-2">&nbsp;</span>
          <div className="flex">
            {Array.from("FEEDBACK").map((letter, index) => (
              <span
                key={index + 8} // offset to avoid duplicate keys
                ref={el => {
                  if (lettersRef.current) lettersRef.current[index + 8] = el; // offset for reference array
                }}
                className="inline-block hover:scale-110 transition-transform duration-200 hover:text-indomie-yellow"
                style={{ animationPlayState: "running" }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indomie-red via-indomie-yellow to-indomie-red animate-gradient-x"></div>
      </div>
    </div>
  );
}
