
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CardTitle, CardDescription } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  image: string;
  description?: string;
}

interface FeedbackHeaderProps {
  selectedProduct: Product | null;
}

export const FeedbackHeader: React.FC<FeedbackHeaderProps> = ({ selectedProduct }) => {
  return (
    <>
      <div className="flex flex-col items-center text-center mb-4">
        <CardTitle className="text-2xl font-bold">Welcome to Tolaram Feedback Portal</CardTitle>
        <CardDescription className="mt-2 max-w-md">
          Your opinion matters to us, and we're committed to making our products better with your input.
        </CardDescription>
      </div>
      {selectedProduct && (
        <Badge 
          className="px-3 py-1 bg-indomie-red/20 text-indomie-red border border-indomie-red/30 flex items-center gap-2 mx-auto"
          variant="outline"
        >
          <div className="w-4 h-4 rounded overflow-hidden">
            <img 
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          Feedback for {selectedProduct.name}
        </Badge>
      )}
    </>
  );
};
