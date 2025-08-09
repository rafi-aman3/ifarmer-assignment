import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ProductDetailsError = () => {
  const router = useRouter();
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
};

export default ProductDetailsError;
