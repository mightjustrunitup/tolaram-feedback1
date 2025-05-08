
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  variants: Array<{
    id: string;
    name: string;
  }>;
}

interface ProductSelectionProps {
  products: Product[];
  selectedProduct: Product | null;
  selectedVariant: string | null;
  errors: { [key: string]: string };
  handleProductSelect: (productId: string) => void;
  handleVariantSelect: (variantId: string) => void;
}

export const ProductSelection: React.FC<ProductSelectionProps> = ({
  products,
  selectedProduct,
  selectedVariant,
  errors,
  handleProductSelect,
  handleVariantSelect,
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="product" className="flex justify-between">
          <span>Select Product</span>
          <span className="text-red-500">*</span>
        </Label>
        <Select 
          onValueChange={handleProductSelect}
          value={selectedProduct?.id}
        >
          <SelectTrigger className={errors.product ? "border-red-500" : ""}>
            <SelectValue placeholder="Choose a product to provide feedback on" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded overflow-hidden bg-gray-100">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{product.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.product && (
          <p className="text-sm text-red-500 mt-1">{errors.product}</p>
        )}
      </div>

      {selectedProduct && (
        <div className="space-y-2">
          <Label htmlFor="variant" className="flex justify-between">
            <span>Select {selectedProduct.name} Variant</span>
            <span className="text-red-500">*</span>
          </Label>
          <RadioGroup 
            value={selectedVariant || ""} 
            onValueChange={handleVariantSelect}
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-2 p-2", 
              errors.variant ? "border border-red-500 rounded-md" : ""
            )}
          >
            {selectedProduct.variants.map((variant) => (
              <div key={variant.id} className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-md">
                <RadioGroupItem value={variant.id} id={variant.id} />
                <Label htmlFor={variant.id} className="cursor-pointer flex-grow text-sm">
                  {variant.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.variant && (
            <p className="text-sm text-red-500 mt-1">{errors.variant}</p>
          )}
        </div>
      )}
    </>
  );
};
