"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Product,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/store/api/product";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus,
  Search,
  Trash2,
  Filter,
  Grid3X3,
  List,
  Loader2,
} from "lucide-react";

export default function ListPage() {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const { data: categories, isLoading: categoryLoading } =
    useGetCategoriesQuery();
  const limit = 10;
  const offset = (page - 1) * limit;

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery({ limit, offset, title: search, categoryId });

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: number) => await deleteProduct(id);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryFilter = (catId: number | null) => {
    setCategoryId(catId);
    setPage(1);
  };

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-lg font-medium text-red-600">
                Error loading products
              </p>
              <p className="text-sm text-muted-foreground">
                Please try again later
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mobile Category Filter Sheet
  const CategoryFilterSheet = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Filter by Category</SheetTitle>
          <SheetDescription>
            Select a category to filter products
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-2">
          <Button
            variant={categoryId === null ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleCategoryFilter(null)}
          >
            All Categories
          </Button>
          {categories?.map((category) => (
            <Button
              key={category.id}
              variant={categoryId === category.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleCategoryFilter(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  // Product Grid Component
  const ProductGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {products?.map((product: Product) => (
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Product</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{product.title}"? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(product.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
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

            {/* Search and Filter Controls */}
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
                <CategoryFilterSheet />
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

            {/* Content */}
            <Card>
              <CardContent className="p-4 lg:p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2">Loading products...</span>
                  </div>
                ) : products?.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-muted-foreground">
                      <p className="text-lg font-medium">No products found</p>
                      <p className="text-sm">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </div>
                ) : viewMode === "grid" ? (
                  <ProductGrid />
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">ID</TableHead>
                          <TableHead className="w-16">Image</TableHead>
                          <TableHead>Product Name</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Category
                          </TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="w-20">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products?.map((product: Product) => (
                          <TableRow
                            key={product.id}
                            className="hover:bg-muted/50"
                          >
                            <TableCell className="font-mono text-xs">
                              {product.id}
                            </TableCell>
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
                                    router.push(
                                      `/assignment-2/details/${product.id}`
                                    )
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
                                    router.push(
                                      `/assignment-2/edit/${product.id}`
                                    )
                                  }
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete Product
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "
                                        {product.title}"? This action cannot be
                                        undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pagination */}
            {products && products.length > 0 && (
              <div className="flex items-center justify-center lg:justify-end mt-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium px-3 py-1 bg-primary text-primary-foreground rounded">
                      {page}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!products || products.length < limit}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 space-y-6">
            <Card className="sticky top-22">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={categoryId === null ? "default" : "ghost"}
                  className="w-full justify-start"
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
                      className="w-full justify-start"
                      onClick={() => handleCategoryFilter(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
