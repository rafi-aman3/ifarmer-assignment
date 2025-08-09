"use client";

import { Card, CardContent } from "@/components/ui/card";
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
import Header from "@/components/assignment-2/list/Header";

export default function ListPage() {
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
            <Header />
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
