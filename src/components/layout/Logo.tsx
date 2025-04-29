
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
          "font-bold text-indomie-red", 
          size === "sm" && "text-xl",
          size === "md" && "text-2xl",
          size === "lg" && "text-4xl",
        )}
      >
        INDOMIE
        <span className="text-indomie-yellow">FEEDBACK</span>
      </div>
    </div>
  );
}
