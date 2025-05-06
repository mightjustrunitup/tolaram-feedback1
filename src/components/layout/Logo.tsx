
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ size = "md", className }: LogoProps) {
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
        {/* Removed the "Feedback" text */}
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-blue-400 to-primary animate-gradient-x"></div>
      </div>
    </div>
  );
}
