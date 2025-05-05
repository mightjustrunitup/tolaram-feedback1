
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxWords?: number
  showWordCount?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxWords, showWordCount = false, onChange, ...props }, ref) => {
    const [wordCount, setWordCount] = React.useState(0)
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value
      const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
      
      if (maxWords && words > maxWords) {
        // Limit text to maxWords by finding the position of the last word boundary
        const wordArray = text.trim().split(/\s+/)
        const limitedWords = wordArray.slice(0, maxWords)
        const limitedText = limitedWords.join(" ")
        
        e.target.value = limitedText
      }
      
      setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length)
      
      // Call the original onChange handler if provided
      if (onChange) {
        onChange(e)
      }
    }
    
    return (
      <div className="w-full relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        {(showWordCount || maxWords) && (
          <div className="text-xs text-gray-500 mt-1 flex justify-end">
            <span className={maxWords && wordCount >= maxWords ? "text-red-500 font-medium" : ""}>
              {wordCount} {maxWords ? `/ ${maxWords}` : ""} words
            </span>
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
