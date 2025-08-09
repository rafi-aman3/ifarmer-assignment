"use client";

import { useRouter } from "next/navigation";
import { useGetCategoriesQuery } from "@/store/api/product";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { ProductCreateForm } from "@/components/assignment-2/create/ProductCreateForm";
import { useProductCreateForm } from "@/hooks/useProductCreate";
import ProductPreviewCard from "@/components/assignment-2/create/ProductPreviewCard";

export default function CreateProductPage() {
  const router = useRouter();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const { form, formData, onSubmit,isLoading } = useProductCreateForm();

  return (
    <div className="min-h-[86vh]">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
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
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>
                  Enter the basic details about your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ProductCreateForm
                  categories={categories}
                  form={form}
                  handleSubmit={form.handleSubmit(onSubmit)}
                  categoriesLoading={categoriesLoading}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <ProductPreviewCard categories={categories} formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}
