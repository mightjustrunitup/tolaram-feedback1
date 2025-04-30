
import * as React from "react"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  className?: string
  max?: number
}

export function StarRating({
  value,
  onChange,
  className,
  max = 5,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)
  
  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1
        const isFilled = hoverValue !== null ? starValue <= hoverValue : starValue <= value
        
        return (
          <Star
            key={i}
            className={cn(
              "w-6 h-6 cursor-pointer transition-colors",
              isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            )}
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(null)}
          />
        )
      })}
    </div>
  )
}
