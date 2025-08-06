import { setPlayers } from "@/store/gameSlice";
import { useAppDispatch } from "@/store/hooks";
import { formSchema } from "@/utils/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

export function usePlayerSetup() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      player1: "",
      player2: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(setPlayers(values));
    router.push("/assignment-1/game");
  };
  return { form, onSubmit };
}
