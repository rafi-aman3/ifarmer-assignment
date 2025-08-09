import { Input } from "@/components/ui/input";
import { Grid3X3, List, Search } from "lucide-react";
import React from "react";
import { CategoryFilterSheet, CategoryFilterSheetProps } from "./CategorySheet";
import { Button } from "@/components/ui/button";

interface ProductFilterProps extends CategoryFilterSheetProps {
  search: string | "";
  handleSearch: (value: string) => void;
  viewMode: "table" | "grid";
  setViewMode: (value: "table" | "grid") => void;
}

const ProductFilter = ({
  search,
  handleSearch,
  categoryId,
  handleCategoryFilter,
  categories,
  viewMode,
  setViewMode,
  categoryLoading,
}: ProductFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search products by name..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex gap-2">
        <CategoryFilterSheet
          categories={categories}
          categoryId={categoryId}
          categoryLoading={categoryLoading}
          handleCategoryFilter={handleCategoryFilter}
        />
        <div className="hidden sm:flex border rounded-md">
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="rounded-r-none"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-l-none"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
