
import * as React from "react"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  className?: string
  max?: number
  size?: "sm" | "md" | "lg"
  color?: string
  emptyColor?: string
  readOnly?: boolean
  label?: string
  showValue?: boolean
}

export function StarRating({
  value,
  onChange,
  className,
  max = 5,
  size = "md",
  color = "text-yellow-400",
  emptyColor = "text-gray-300",
  readOnly = false,
  label,
  showValue = false,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)
  
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }
  
  const starSize = sizeClasses[size]
  
  return (
    <div className="space-y-1">
      {label && <div className="text-sm font-medium mb-1">{label}</div>}
      <div className={cn("flex items-center gap-1", className)}>
        {Array.from({ length: max }).map((_, i) => {
          const starValue = i + 1
          const isFilled = hoverValue !== null 
            ? starValue <= hoverValue 
            : starValue <= value
          
          return (
            <Star
              key={i}
              className={cn(
                starSize,
                readOnly ? "cursor-default" : "cursor-pointer",
                "transition-colors",
                isFilled 
                  ? `fill-${color.replace('text-', '')} ${color}` 
                  : emptyColor
              )}
              onClick={() => !readOnly && onChange(starValue)}
              onMouseEnter={() => !readOnly && setHoverValue(starValue)}
              onMouseLeave={() => !readOnly && setHoverValue(null)}
              data-value={starValue}
              aria-label={`Rate ${starValue} out of ${max} stars`}
              role={readOnly ? "img" : "button"}
            />
          )
        })}
        
        {showValue && (
          <span className="ml-2 text-sm font-medium">
            {value} of {max}
          </span>
        )}
      </div>
    </div>
  )
}
