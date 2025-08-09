import { Card, CardContent } from "@/components/ui/card";
import { Ban } from "lucide-react";
import React from "react";

export const ListError = () => {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center flex flex-col justify-center items-center">
            <Ban className=" size-20 text-red-600" />
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
};
