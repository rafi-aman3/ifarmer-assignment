"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  useGetProductByIdQuery,
  useDeleteProductMutation,
  Product,
} from "@/store/api/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag, Image as ImageIcon, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import ProductDetailsLoader from "@/components/assignment-2/details/ProductDetailsLoader";
import ProductDetailsError from "@/components/assignment-2/details/ProductDetailsError";
import { ProductDetailsHeader } from "@/components/assignment-2/details/ProductDetailsHeader";

export interface ProductDetails extends Product {
  creationAt: string;
  updatedAt: string;
}

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

  const [deleteProduct] = useDeleteProductMutation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDelete = async () => {
    try {
      await deleteProduct(productId).unwrap();
      router.push("/assignment-2/list");
      toast.success("Product Deleted");
    } catch (err) {
      console.error(err);
    }
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

  if (productLoading) return <ProductDetailsLoader />;

  if (productError) return <ProductDetailsError />;

  if (!product) return null;

  const productData = product as ProductDetails;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <ProductDetailsHeader product={product} handleDelete={handleDelete} />
        <div className="grid gap-6 lg:grid-cols-3">
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

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {productData.description || "No description available."}
                  </p>
                </div>

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
      </div>
    </div>
  );
}
