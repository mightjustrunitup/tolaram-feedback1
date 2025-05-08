
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export function Spinner({ size = "md", color = "text-indomie-red", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "animate-spin rounded-full border-4 border-t-transparent",
          sizeClasses[size],
          color,
          className
        )}
        role="status"
        aria-label="loading"
      />
    </div>
  );
}
