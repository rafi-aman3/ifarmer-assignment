import { setPlayers } from "@/store/gameSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { formSchema } from "@/utils/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { useEffect } from "react";

export function usePlayerSetup() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { player1, player2 } = useAppSelector((state) => state.game);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      player1: player1 || "",
      player2: player2 || "",
    },
    mode: "onChange",
  });

  const watchedValues = form.watch();

  useEffect(() => {
    dispatch(
      setPlayers({
        player1: watchedValues.player1 || "",
        player2: watchedValues.player2 || "",
      })
    );
  }, [watchedValues.player1, watchedValues.player2, dispatch]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(setPlayers(values));
    router.push("/assignment-1/game");
  };

  return { form, onSubmit };
}
