import { ProductDetails } from "@/app/assignment-2/details/[id]/page";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit3 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { ProductDeleteButton } from "../list/ProductDeleteButton";
import { Product } from "@/store/api/product";

interface ProductDetailsHeaderProps {
  product: Product;
  handleDelete: (value: number) => void
}

export const ProductDetailsHeader = ({
  product,
  handleDelete
}: ProductDetailsHeaderProps) => {
  const router = useRouter();
  return (
    <div className="mb-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4 -ml-4 hover:bg-gray-100"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Product Details
          </h1>
          <p className="text-muted-foreground mt-1">View product information</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/assignment-2/edit/${product?.id}`}>
            <Button size={"sm"} variant="outline">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>

          <ProductDeleteButton
            showText={true}
            product={product}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};
