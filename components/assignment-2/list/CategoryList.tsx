import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { CategoryFilterSheetProps } from "./CategorySheet";
import { Loader2 } from "lucide-react";

const CategoryList = ({
  categoryId,
  handleCategoryFilter,
  categoryLoading,
  categories
}: CategoryFilterSheetProps) => {
  return (
    <div className="hidden lg:block w-64 space-y-6">
      <Card className="sticky top-22">
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={categoryId === null ? "default" : "ghost"}
            className="w-full justify-start break-all"
            onClick={() => handleCategoryFilter(null)}
          >
            All Categories
          </Button>
          {categoryLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            categories?.map((category) => (
              <Button
                key={category.id}
                variant={categoryId === category.id ? "default" : "ghost"}
                className="w-full justify-start truncate wrap-break-word"
                onClick={() => handleCategoryFilter(category.id)}
              >
                {category.name}
              </Button>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryList;
