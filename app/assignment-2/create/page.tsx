"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useAddProductMutation,
  useGetCategoriesQuery,
} from "@/store/api/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Loader2, AlertCircle, Plus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormData {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export default function CreateProductPage() {
  const router = useRouter();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    price: 0,
    description: "",
    categoryId: 0,
    images: [""],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.categoryId) newErrors.categoryId = "Please select a category";

    // Validate images - at least one non-empty image URL required
    const validImages = formData.images.filter((img) => img.trim());
    if (validImages.length === 0)
      newErrors.images = "At least one image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
      // Filter out empty image URLs before submitting
      const submitData = {
        ...formData,
        images: formData.images.filter((img) => img.trim()),
      };
      await addProduct(submitData).unwrap();
      router.push("/assignment-2/list");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[86vh]">
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
              Create New Product
            </h1>
            <p className="text-muted-foreground mt-1">
              Add a new product to your catalog
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
                  Enter the basic details about your product
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
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={
                        formData.categoryId > 0
                          ? formData.categoryId.toString()
                          : ""
                      }
                      onValueChange={(value: string) =>
                        handleChange("categoryId", Number(value))
                      }
                    >
                      <SelectTrigger
                        className={errors.categoryId ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesLoading ? (
                          <div className="flex items-center justify-center py-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="ml-2">Loading categories...</span>
                          </div>
                        ) : (
                          categories?.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                              {cat.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    {errors.categoryId && (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        {errors.categoryId}
                      </div>
                    )}
                  </div>

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

                  {/* Product Images */}
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
                      disabled={isLoading}
                      className="flex-1 sm:flex-initial"
                    >
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isLoading ? "Creating..." : "Create Product"}
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
                  See how your product will appear
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
                          src={formData.images.find((img) => img.trim()) || ""}
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
                          {formData.images.filter((img) => img.trim()).length >
                            4 && (
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
                  {formData.categoryId > 0 && categories && (
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      {
                        categories.find((cat) => cat.id === formData.categoryId)
                          ?.name
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
