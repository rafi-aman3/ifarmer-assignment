import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/store/api/product";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { ProductDeleteButton } from "./ProductDeleteButton";

export interface ProductGridProps {
  products: Product[];
  handleDelete: (id: number) => void;
}

export const ProductGrid = ({ products, handleDelete }: ProductGridProps) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {products?.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden py-0  hover:shadow-lg transition-shadow"
        >
          <div className="aspect-square bg-gray-100 overflow-hidden">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardContent className="px-4 pb-4">
            <div className="space-y-3">
              <div>
                <h3
                  className="font-semibold h-12 line-clamp-2 cursor-pointer hover:text-primary"
                  onClick={() =>
                    router.push(`/assignment-2/details/${product.id}`)
                  }
                >
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{product?.category?.name}</Badge>
                <p className="font-semibold text-lg">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() =>
                    router.push(`/assignment-2/edit/${product.id}`)
                  }
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <ProductDeleteButton
                  product={product}
                  handleDelete={handleDelete}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
