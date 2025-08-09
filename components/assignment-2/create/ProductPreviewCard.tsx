import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export interface Category {
  id: number;
  name: string;
}

export interface ProductFormData {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}
interface ProductPreviewCardProps {
  formData: ProductFormData;
  categories?: Category[];
}

const ProductPreviewCard = ({
  formData,
  categories,
}: ProductPreviewCardProps) => {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription>See how your product will appear</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {formData.images.filter((img) => img.trim()).length > 0 ? (
            <div className="grid gap-2">
              {/* Main image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={formData.images.find((img) => img.trim()) || ""}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>

              {/* Additional images preview */}
              {formData.images.filter((img) => img.trim()).length > 1 && (
                <div className="grid grid-cols-3 gap-1">
                  {formData.images
                    .filter((img) => img.trim())
                    .slice(1, 4)
                    .map((img, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-gray-100 rounded overflow-hidden"
                      >
                        <img
                          src={img}
                          alt={`Preview ${index + 2}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    ))}
                  {formData.images.filter((img) => img.trim()).length > 4 && (
                    <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-xs text-muted-foreground">
                      +{formData.images.filter((img) => img.trim()).length - 4}{" "}
                      more
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-muted-foreground">
              No images
            </div>
          )}
        </div>

        {/* Product Details Preview */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2">
            {formData.title || "Product title"}
          </h3>
          <p className="text-2xl font-bold text-primary">
            ${formData.price?.toFixed(2) || "0.00"}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {formData.description || "Product description will appear here"}
          </p>
          {formData.categoryId > 0 && categories && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              {categories.find((cat) => cat.id === formData.categoryId)?.name}
            </div>
          )}

          {/* Image count indicator */}
          {formData.images.filter((img) => img.trim()).length > 0 && (
            <p className="text-xs text-muted-foreground">
              {formData.images.filter((img) => img.trim()).length} image(s)
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPreviewCard;
