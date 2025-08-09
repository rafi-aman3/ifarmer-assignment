import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

const ProductTableLoader = () => {
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
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index} className="hover:bg-muted/50">
              <TableCell className="font-mono text-xs">
                <Skeleton className="h-4 w-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-12 h-12 rounded-md" />
              </TableCell>
              <TableCell>
                <div className="max-w-xs">
                  <div className="cursor-pointer hover:text-primary line-clamp-1">
                    <Skeleton className="h-4 w-32 mb-1" />
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-1 mt-1">
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
                  <Skeleton className="h-3 w-16 rounded-full bg-muted-foreground/20" />
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="animate-pulse bg-muted pointer-events-none"
                  >
                    <Edit className="h-4 w-4 opacity-50" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="animate-pulse bg-muted pointer-events-none"
                  >
                    <Trash2 className="h-4 w-4 opacity-50" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTableLoader;
