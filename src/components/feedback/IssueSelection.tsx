
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface IssueSelectionProps {
  issues: string[];
  selectedIssues: string[];
  comments: string;
  handleIssueToggle: (issue: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errors: { [key: string]: string };
}

export const IssueSelection: React.FC<IssueSelectionProps> = ({
  issues,
  selectedIssues,
  comments,
  handleIssueToggle,
  onInputChange,
  errors,
}) => {
  return (
    <>
      <div className="space-y-3 p-4 bg-white/80 rounded-md backdrop-blur-sm border border-gray-200">
        <Label className="text-base font-medium flex justify-between">
          <span>Which issues did you experience with this product?</span>
          <span className="text-red-500">*</span>
        </Label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {issues.map((issue) => (
            <div key={issue} className="flex items-center space-x-2">
              <Checkbox 
                id={issue.replace(/\s/g, '-')} 
                checked={selectedIssues.includes(issue)}
                onCheckedChange={() => handleIssueToggle(issue)}
                className="border-indomie-red"
              />
              <label
                htmlFor={issue.replace(/\s/g, '-')}
                className="text-sm md:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {issue}
              </label>
            </div>
          ))}
        </div>
        {errors.issue && (
          <p className="text-sm text-red-500 mt-1">{errors.issue}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="comments">Additional Comments</Label>
        <Textarea
          id="comments"
          name="comments"
          placeholder="Please share any additional details about the issues you experienced..."
          className="min-h-[120px]"
          value={comments}
          onChange={onInputChange}
        />
      </div>
    </>
  );
};
