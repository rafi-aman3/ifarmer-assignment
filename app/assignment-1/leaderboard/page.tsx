import { LeaderboardScreen } from "@/components/assignment-1/LeaderboardScreen";
import { redirect } from "next/navigation";

export default function LeaderboardPage() {
  return (
    <main className="min-h-[92vh] md:min-h-[88vh] rounded-none md:rounded-2xl bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <LeaderboardScreen/>
    </main>
  );
}
