
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
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indomie-red via-indomie-yellow to-indomie-red animate-gradient-x"></div>
      </div>
    </div>
  );
}
