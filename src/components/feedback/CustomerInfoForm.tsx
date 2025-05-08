
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomerInfoFormProps {
  customerName: string;
  location: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
}

export const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({
  customerName,
  location,
  onInputChange,
  errors
}) => {
  return (
    <div className="space-y-4 p-4 bg-white/80 rounded-md backdrop-blur-sm border border-gray-200">
      <h3 className="font-semibold text-lg mb-2">Your Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customerName">
            <span>Your Name (Optional)</span>
          </Label>
          <Input
            id="customerName"
            name="customerName"
            placeholder="Enter your name"
            value={customerName}
            onChange={onInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label>
            <span>Location (Optional)</span>
          </Label>
          <Input
            id="location"
            name="location"
            placeholder="Enter your location (e.g., Ikeja)"
            value={location}
            onChange={onInputChange}
          />
        </div>
      </div>
    </div>
  );
};
