import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/store/api/product";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { ProductGridProps } from "./ProductGrid";
import { ProductDeleteButton } from "./ProductDeleteButton";

const ProductsTable = ({ products, handleDelete }: ProductGridProps) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">ID</TableHead>
            <TableHead className="w-16">Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead className="hidden sm:table-cell">Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="w-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product: Product) => (
            <TableRow key={product.id} className="hover:bg-muted/50">
              <TableCell className="font-mono text-xs">{product.id}</TableCell>
              <TableCell>
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.title}
                  className="w-12 h-12 rounded-md object-cover"
                />
              </TableCell>
              <TableCell>
                <div className="max-w-xs">
                  <p
                    onClick={() =>
                      router.push(`/assignment-2/details/${product.id}`)
                    }
                    className="font-medium cursor-pointer hover:text-primary line-clamp-1"
                  >
                    {product.title}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                    {product.description}
                  </p>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant="secondary" className="text-xs">
                  {product?.category?.name}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      router.push(`/assignment-2/edit/${product.id}`)
                    }
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <ProductDeleteButton
                    product={product}
                    handleDelete={handleDelete}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
