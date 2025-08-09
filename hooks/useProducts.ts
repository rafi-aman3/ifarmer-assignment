import {
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/store/api/product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadLeaderboard } from "@/store/leaderboardSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const limit = 10;

interface useProductsProps {
  page: number;
  categoryId: number | null;
  search: string | "";
}

export function useProducts({ page, categoryId, search }: useProductsProps) {
  const offset = (page - 1) * limit;

  const {
    data: products,
    isFetching,
    isError,
  } = useGetProductsQuery({ limit, offset, title: search, categoryId });

  const disableNextButton = !products || products.length < limit;

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    toast.success("Product Deleted!")
  };

  return { products, isFetching, isError, disableNextButton, handleDelete };
}
