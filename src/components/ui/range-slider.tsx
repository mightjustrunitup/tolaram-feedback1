
import React from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number[];
  value?: number[];
  onValueChange?: (value: number[]) => void;
  className?: string;
  showLabels?: boolean;
  labelPrefix?: string;
  labelSuffix?: string;
}

export function RangeSlider({
  min = 1,
  max = 10,
  step = 1,
  defaultValue,
  value,
  onValueChange,
  className,
  showLabels = true,
  labelPrefix = "",
  labelSuffix = "",
}: RangeSliderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Slider
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={onValueChange}
        className="py-4"
      />
      
      {showLabels && (
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">
            {labelPrefix} {min} {labelSuffix}
          </span>
          <span className="text-sm text-muted-foreground">
            {labelPrefix} {max} {labelSuffix}
          </span>
        </div>
      )}
      
      {value && value.length > 0 && (
        <div className="text-center font-medium">
          Current: {labelPrefix} {value[0]} {labelSuffix}
        </div>
      )}
    </div>
  );
}
