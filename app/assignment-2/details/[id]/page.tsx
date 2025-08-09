"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  useGetProductByIdQuery,
  useDeleteProductMutation,
} from "@/store/api/product";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Edit3,
  Trash2,
  AlertCircle,
  Calendar,
  Tag,
  DollarSign,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const {
    data: product,
    isLoading: productLoading,
    isError: productError,
    refetch,
  } = useGetProductByIdQuery(productId);

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDelete = async () => {
    try {
      await deleteProduct(productId).unwrap();
      router.push("/assignment-2/list");
    } catch (err) {
      console.error(err);
      // Handle error (you might want to show a toast or error message)
    }
    setShowDeleteDialog(false);
  };

  const handleEdit = () => {
    router.push(`/assignment-2/edit/${productId}`);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  const nextImage = () => {
    if (product?.images && product.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.images && product.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  // Loading state
  if (productLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="mb-6">
            <Skeleton className="h-10 w-20 mb-4" />
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <Skeleton className="aspect-video w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (productError) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 -ml-4 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-red-600">
                  Product not found
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  The product you're looking for doesn't exist or has been
                  deleted.
                </p>
                <Button onClick={() => router.push("/assignment-2/list")}>
                  Back to Products
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const productData = product as any;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
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
              <p className="text-muted-foreground mt-1">
                View product information
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleEdit}>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
                disabled={deleteLoading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      {productData.title}
                    </CardTitle>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-primary">
                          ${productData.price?.toFixed(2)}
                        </span>
                      </div>
                      {productData.category && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Tag className="h-3 w-3" />
                          {productData.category.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline">ID: #{productData.id}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image Gallery */}
                {productData.images && productData.images.length > 0 && (
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group">
                      <img
                        src={productData.images[currentImageIndex]}
                        alt={productData.title}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />

                      {/* Image navigation */}
                      {productData.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ←
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            →
                          </button>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                            {productData.images.map((_: any, index: number) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full ${
                                  index === currentImageIndex
                                    ? "bg-white"
                                    : "bg-white/50"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Thumbnail navigation */}
                    {productData.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto">
                        {productData.images.map(
                          (image: string, index: number) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                index === currentImageIndex
                                  ? "border-primary"
                                  : "border-gray-200"
                              }`}
                            >
                              <img
                                src={image}
                                alt={`${productData.title} ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                              />
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {productData.description || "No description available."}
                  </p>
                </div>

                {/* Additional Images Info */}
                {productData.images && productData.images.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Images ({productData.images.length})
                    </h3>
                    <div className="space-y-1">
                      {productData.images.map(
                        (image: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className="text-muted-foreground">
                              Image {index + 1}:
                            </span>
                            <a
                              href={image}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1"
                            >
                              View original
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Product Meta Information */}
                <div className="pt-4 border-t space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Product ID:</span>
                      <span className="font-mono">#{productData.id}</span>
                    </div>

                    {productData.category && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <Badge variant="outline" className="text-xs">
                          {productData.category.name}
                        </Badge>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Images:</span>
                      <span>{productData.images?.length || 0}</span>
                    </div>

                    {productData.creationAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Created:
                        </span>
                        <span className="text-xs">
                          {new Date(
                            productData.creationAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {productData.updatedAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Updated:
                        </span>
                        <span className="text-xs">
                          {new Date(productData.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{productData.title}"? This
                action cannot be undone and will permanently remove the product
                from your inventory.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete Product"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
