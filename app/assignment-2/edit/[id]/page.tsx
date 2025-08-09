"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useGetCategoriesQuery,
  Category,
} from "@/store/api/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Loader2, AlertCircle, Save, Plus, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductFormData {
  title: string;
  price: number;
  description: string;
  images: string[];
  categorySlug: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const {
    data: product,
    isLoading: productLoading,
    isError: productError,
  } = useGetProductByIdQuery(productId);
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    price: 0,
    description: "",
    categorySlug: "",
    images: [""],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Initialize form with product data
  useEffect(() => {
    if (product && !productLoading) {
      const productData = product as any;
      setFormData((prevData) => {
        // Only update if we haven't initialized yet or if the product ID changed
        if (!prevData.title || prevData.title === "") {
          return {
            title: productData.title || "",
            price: productData.price || 0,
            description: productData.description || "",
            categorySlug: productData.category?.slug || "",
            images:
              productData.images && productData.images.length > 0
                ? productData.images
                : [""],
          };
        }
        return prevData;
      });
    }
  }, [product, productLoading]);

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      categorySlug: value,
    }));

    // Clear error when user makes a selection
    if (errors.categorySlug) {
      setErrors((prev) => ({ ...prev, categorySlug: "" }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.categorySlug.trim())
      newErrors.categorySlug = "Please select a category";

    // Validate images - at least one non-empty image URL required
    const validImages = formData.images.filter((img) => img.trim());
    if (validImages.length === 0)
      newErrors.images = "At least one image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    handleChange("images", newImages);
  };

  const addImageField = () => {
    const newImages = [...formData.images, ""];
    handleChange("images", newImages);
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      handleChange("images", newImages);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const selectedCategory = categories?.find(
        (cat: any) => cat.slug === formData.categorySlug
      );

      // Filter out empty image URLs before submitting
      const submitData = {
        ...formData,
        images: formData.images.filter((img) => img.trim()),
        category: selectedCategory,
        categorySlug: undefined,
      };

      await updateProduct({ id: productId, ...submitData }).unwrap();
      router.push("/assignment-2/list");
    } catch (err) {
      console.error(err);
    }
  };

  // Loading state
  if (productLoading) {
    return (
      <div className="min-h-screen ">
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
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-20" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="aspect-square w-full mb-4" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-8 w-20" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  else if (productError) {
    return (
      <div className="min-h-screen ">
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
  } else
    return (
      <div className="min-h-screen ">
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
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Edit Product
              </h1>
              <p className="text-muted-foreground mt-1">
                Update product information
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                  <CardDescription>
                    Update the details for this product
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Product Title *</Label>
                      <Input
                        id="title"
                        type="text"
                        placeholder="Enter product title"
                        value={formData.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange("title", e.target.value)
                        }
                        className={errors.title ? "border-red-500" : ""}
                      />
                      {errors.title && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          {errors.title}
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <Label htmlFor="price">Price *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          value={formData.price || ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange("price", Number(e.target.value))
                          }
                          className={`pl-8 ${
                            errors.price ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.price && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          {errors.price}
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    {/* <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.categorySlug}
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger
                          className={
                            errors.categorySlug ? "border-red-500" : ""
                          }
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoriesLoading ? (
                            <div className="flex items-center justify-center py-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="ml-2">
                                Loading categories...
                              </span>
                            </div>
                          ) : (
                            categories?.map((cat: any) => (
                              <SelectItem key={cat.id} value={cat.slug}>
                                {cat.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {errors.categorySlug && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          {errors.categorySlug}
                        </div>
                      )}
                    </div> */}

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter product description"
                        rows={4}
                        value={formData.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          handleChange("description", e.target.value)
                        }
                        className={errors.description ? "border-red-500" : ""}
                      />
                      {errors.description && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          {errors.description}
                        </div>
                      )}
                    </div>

                    {/* Product Images - Multiple */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Product Images *</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addImageField}
                          className="text-xs"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Image
                        </Button>
                      </div>

                      {formData.images.map((image, index) => (
                        <div key={index} className="flex gap-2">
                          <div className="flex-1">
                            <Input
                              type="url"
                              placeholder="https://example.com/image.jpg"
                              value={image}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => handleImageChange(index, e.target.value)}
                              className={errors.images ? "border-red-500" : ""}
                            />
                          </div>
                          {formData.images.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeImageField(index)}
                              className="px-2"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}

                      {errors.images && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          {errors.images}
                        </div>
                      )}
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        className="flex-1 sm:flex-initial"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={updateLoading}
                        className="flex-1 sm:flex-initial"
                      >
                        {updateLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {updateLoading ? (
                          "Updating..."
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Update Product
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Preview Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    See how your updated product will appear
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Images Preview */}
                  <div className="space-y-2">
                    {formData.images.filter((img) => img.trim()).length > 0 ? (
                      <div className="grid gap-2">
                        {/* Main image */}
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={
                              formData.images.find((img) => img.trim()) || ""
                            }
                            alt="Product preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        </div>

                        {/* Additional images preview */}
                        {formData.images.filter((img) => img.trim()).length >
                          1 && (
                          <div className="grid grid-cols-3 gap-1">
                            {formData.images
                              .filter((img) => img.trim())
                              .slice(1, 4)
                              .map((img, index) => (
                                <div
                                  key={index}
                                  className="aspect-square bg-gray-100 rounded overflow-hidden"
                                >
                                  <img
                                    src={img}
                                    alt={`Preview ${index + 2}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = "/placeholder.svg";
                                    }}
                                  />
                                </div>
                              ))}
                            {formData.images.filter((img) => img.trim())
                              .length > 4 && (
                              <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-xs text-muted-foreground">
                                +
                                {formData.images.filter((img) => img.trim())
                                  .length - 4}{" "}
                                more
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-muted-foreground">
                        No images
                      </div>
                    )}
                  </div>

                  {/* Product Details Preview */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {formData.title || "Product title"}
                    </h3>
                    <p className="text-2xl font-bold text-primary">
                      ${formData.price?.toFixed(2) || "0.00"}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {formData.description ||
                        "Product description will appear here"}
                    </p>
                    {formData.categorySlug && categories && (
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        {
                          categories.find(
                            (cat: any) => cat.slug === formData.categorySlug
                          )?.name
                        }
                      </div>
                    )}

                    {/* Image count indicator */}
                    {formData.images.filter((img) => img.trim()).length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {formData.images.filter((img) => img.trim()).length}{" "}
                        image(s)
                      </p>
                    )}
                  </div>

                  {/* Original vs Updated Indicator */}
                  {product && (
                    <div className="pt-4 border-t">
                      <p className="text-xs text-muted-foreground mb-2">
                        Product ID: #{(product as any).id}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        <p>
                          Created:{" "}
                          {new Date(
                            (product as any).creationAt || Date.now()
                          ).toLocaleDateString()}
                        </p>
                        <p>
                          Last Updated:{" "}
                          {new Date(
                            (product as any).updatedAt || Date.now()
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
}
