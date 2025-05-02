
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

interface RangeSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  className?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  RangeSliderProps
>(({ className, showValue = false, formatValue = (v) => String(v), ...props }, ref) => {
  // Get the first value from the array or default to minimum
  const displayValue = props.value?.[0] ?? props.defaultValue?.[0] ?? props.min ?? 0;
  
  return (
    <div className="relative w-full">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {props.value?.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
      
      {showValue && (
        <div 
          className="absolute -top-7 text-sm font-medium" 
          style={{ 
            left: `calc(${((displayValue - (props.min ?? 0)) / ((props.max ?? 100) - (props.min ?? 0))) * 100}% - 10px)`,
            transform: 'translateX(-50%)'
          }}
        >
          {formatValue(displayValue)}
        </div>
      )}
    </div>
  );
})
RangeSlider.displayName = SliderPrimitive.Root.displayName

export { RangeSlider }
