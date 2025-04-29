
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  count?: number;
  className?: string;
  readOnly?: boolean;
}

export function StarRating({
  value,
  onChange,
  count = 5,
  className,
  readOnly = false,
}: StarRatingProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  // Determine which stars should be filled
  const displayValue = hoveredValue !== null ? hoveredValue : value;

  return (
    <div className={cn("flex gap-1", className)}>
      {Array.from({ length: count }).map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            className={cn(
              "transition-all duration-200 cursor-pointer",
              {
                "text-indomie-yellow fill-indomie-yellow": starValue <= displayValue,
                "text-gray-300": starValue > displayValue,
                "hover:scale-110": !readOnly,
                "cursor-default": readOnly,
              }
            )}
            size={24}
            onClick={() => !readOnly && onChange(starValue)}
            onMouseEnter={() => !readOnly && setHoveredValue(starValue)}
            onMouseLeave={() => !readOnly && setHoveredValue(null)}
          />
        );
      })}
    </div>
  );
}
