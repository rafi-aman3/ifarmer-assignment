"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { ListError } from "@/components/assignment-2/list/ListError";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { ProductGrid } from "@/components/assignment-2/list/ProductGrid";
import ProductFilter from "@/components/assignment-2/list/ProductFilter";
import ProductTableLoader from "@/components/assignment-2/list/ProductTableLoader";
import ProductEmptyState from "@/components/assignment-2/list/ProductEmptyState";
import ProductsTable from "@/components/assignment-2/list/ProductsTable";
import PaginationButtons from "@/components/assignment-2/list/PaginationButtons";
import CategoryList from "@/components/assignment-2/list/CategoryList";

export default function ListPage() {
  const router = useRouter();

  const {
    page,
    categoryId,
    categories,
    categoryLoading,
    search,
    handleSearch,
    viewMode,
    setViewMode,
    handleCategoryFilter,
    handlePreviousButton,
    handleNextButton,
  } = useCategories();

  const { products, isFetching, isError, disableNextButton, handleDelete } =
    useProducts({
      page,
      categoryId,
      search,
    });

  if (isError) return <ListError />;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto pt-20 md:pt-4 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Products
                </h1>
                <p className="text-muted-foreground">
                  Manage your product catalog
                </p>
              </div>
              <Button
                onClick={() => router.push("/assignment-2/create")}
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Product
              </Button>
            </div>

            <ProductFilter
              categories={categories}
              categoryId={categoryId}
              viewMode={viewMode}
              categoryLoading={categoryLoading}
              setViewMode={setViewMode}
              handleCategoryFilter={handleCategoryFilter}
              handleSearch={handleSearch}
              search={search}
            />

            <Card>
              <CardContent className="p-4 lg:p-6">
                {isFetching ? (
                  <ProductTableLoader />
                ) : products?.length === 0 ? (
                  <ProductEmptyState />
                ) : viewMode === "grid" ? (
                  <ProductGrid
                    products={products}
                    handleDelete={handleDelete}
                  />
                ) : (
                  <ProductsTable
                    products={products}
                    handleDelete={handleDelete}
                  />
                )}
              </CardContent>
            </Card>

            {products && products.length > 0 && (
              <PaginationButtons
                handlePreviousButton={handlePreviousButton}
                handleNextButton={handleNextButton}
                disableNextButton={disableNextButton}
                page={page}
              />
            )}
          </div>

          <CategoryList
            categories={categories}
            categoryId={categoryId}
            handleCategoryFilter={handleCategoryFilter}
            categoryLoading={categoryLoading}
          />
        </div>
      </div>
    </div>
  );
}
