import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAddProductMutation } from "@/store/api/product";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be greater than 0"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.number().positive("Please select a category"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image URL is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;

export function useProductCreateForm(defaultValues?: Partial<ProductFormData>) {
  const router = useRouter();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: 0,
      images: [""],
      ...defaultValues,
    },
    mode: "onChange",
  });

  const formData = form.watch();

  const handleChange = (field: keyof ProductFormData, value: any) => {
    form.setValue(field, value, { shouldValidate: true });
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await addProduct(values).unwrap();
      toast.success("Product Added Successfully!");
      router.push("/assignment-2/list");
    } catch (err) {
      toast.error("Product Creation Error!");
      console.error(err);
    }
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    try {
      await addProduct(values).unwrap();
      toast.success("Product Added Successfully!");
      router.push("/assignment-2/list");
    } catch (err) {
      toast.error("Product Creation Error!");
      console.error(err);
    }
  }

  return {
    form,
    formData,
    errors: form.formState.errors,
    handleChange,
    handleSubmit,
    isLoading,
    onSubmit
  };
}
