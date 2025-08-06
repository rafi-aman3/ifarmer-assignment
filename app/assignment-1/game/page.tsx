import { GameBoard } from "@/components/assignment-1/GameBoard";

export default function GamePage() {
  return (
    <main className="min-h-[92vh] md:min-h-[85vh] rounded-none md:rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <GameBoard />
    </main>
  );
}
