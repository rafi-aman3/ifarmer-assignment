import { z } from "zod";

export const formSchema = z
  .object({
    player1: z
      .string()
      .min(2, "At least 2 characters")
      .max(15, "Max 15 characters"),
    player2: z
      .string()
      .min(2, "At least 2 characters")
      .max(15, "Max 15 characters"),
  })
  .refine(
    (data) =>
      data.player1.trim().toLowerCase() !== data.player2.trim().toLowerCase(),
    {
      message: "Player names cannot be the same",
      path: ["player2"], // show error under Player 2 input
    }
  );
