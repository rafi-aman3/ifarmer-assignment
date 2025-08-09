import { GameBoard } from "@/components/assignment-1/GameBoard";

export default function GamePage() {
  return (
    <main className="mt-4 md:mt-6 min-h-[92vh] md:min-h-[88vh] rounded-none md:rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <GameBoard />
    </main>
  );
}
