import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Category } from "@/store/api/product";
import { Filter } from "lucide-react";
import React from "react";

export interface CategoryFilterSheetProps {
  categoryId: number | null;
  categoryLoading: boolean | undefined;
  categories: Category[] | undefined;
  handleCategoryFilter: (catId: number | null) => void;
}

export const CategoryFilterSheet = ({
  categoryId,
  handleCategoryFilter,
  categories,
  categoryLoading,
}: CategoryFilterSheetProps) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" className="lg:hidden">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="z-[200] w-80">
      <SheetHeader>
        <SheetTitle>Filter by Category</SheetTitle>
        <SheetDescription>
          Select a category to filter products
        </SheetDescription>
      </SheetHeader>
      <div className="mt-6 p-4 space-y-2">
        <Button
          variant={categoryId === null ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => handleCategoryFilter(null)}
        >
          All Categories
        </Button>
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={categoryId === category?.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleCategoryFilter(category?.id)}
          >
            {category?.name}
          </Button>
        ))}
      </div>
    </SheetContent>
  </Sheet>
);
