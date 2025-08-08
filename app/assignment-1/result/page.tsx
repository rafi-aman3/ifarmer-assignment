import { ResultScreen } from "@/components/assignment-1/ResultScreen";
import { redirect } from "next/navigation";

export default function ResultPage() {
  return (
    <main className="min-h-[92vh] md:min-h-[88vh] rounded-none md:rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <ResultScreen />
    </main>
  );
}
