import { useGetCategoriesQuery } from "@/store/api/product";
import { useState } from "react";

export function useCategories() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const [categoryId, setCategoryId] = useState<number | null>(null);

  const { data: categories, isLoading: categoryLoading } =
    useGetCategoriesQuery();

  const handleCategoryFilter = (catId: number | null) => {
    setCategoryId(catId);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePreviousButton = () => setPage((p) => Math.max(1, p - 1));
  const handleNextButton = () => setPage((p) => p + 1);

  return {
    page,
    search,
    viewMode,
    setViewMode,
    categoryId,
    categories,
    categoryLoading,
    handleCategoryFilter,
    handleSearch,
    handlePreviousButton,
    handleNextButton,
  };
}
