import { Loader2 } from "lucide-react";

const ProductTableLoader = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="ml-2">Loading products...</span>
    </div>
  );
};

export default ProductTableLoader;
