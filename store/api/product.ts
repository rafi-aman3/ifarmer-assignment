import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
  category: { name: string };
}

export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface CreateProduct {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface UpdateProduct extends Partial<CreateProduct> {
  id: number;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.escuelajs.co/api/v1/" }),
  tagTypes: ["Products", "Categories"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit = 10, offset = 0, title = "", categoryId = "" }) => {
        let url = `products?limit=${limit}&offset=${offset}`;
        if (title) url += `&title=${title}`;
        if (categoryId) url += `&categoryId=${categoryId}`;
        return url;
      },
      providesTags: ["Products"],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    addProduct: builder.mutation<Product, CreateProduct>({
      query: (newProduct) => ({
        url: "products/",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<Product, UpdateProduct>({
      query: ({ id, ...rest }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    getCategories: builder.query<Category[], void>({
      query: () => "categories",
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} = productApi;
