import React from "react";

const ProductEmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="text-muted-foreground">
        <p className="text-lg font-medium">No products found</p>
        <p className="text-sm">Try adjusting your search or filter criteria</p>
      </div>
    </div>
  );
};

export default ProductEmptyState;
