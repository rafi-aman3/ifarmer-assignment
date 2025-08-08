import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { Target } from "lucide-react";

interface RoundDrawSMProps {
  handleNextRound: () => void;
}

export const RoundDrawSM = ({ handleNextRound }: RoundDrawSMProps) => {
  const { gameStatus } = useAppSelector((state) => state.game);

  if (gameStatus !== "draw") return;
  return (
    <div className=" md:hidden flex flex-col bg-card p-4 items-center space-y-4">
      <Target className="w-12 h-12 text-orange-500 mx-auto" />
      <p className="text-lg font-bold text-orange-600">🤝 Draw!</p>
      <Button onClick={handleNextRound} variant="outline" className="w-full">
        Next Round
      </Button>
    </div>
  );
};

export const RoundDrawLG = ({ handleNextRound }: RoundDrawSMProps) => {
  const { gameStatus } = useAppSelector((state) => state.game);

  if (gameStatus !== "draw") return;
  return (
    <div className="space-y-4">
      <Target className="w-12 h-12 text-orange-500 mx-auto" />
      <p className="text-lg font-bold text-orange-600">🤝 Draw!</p>
      <Button onClick={handleNextRound} variant="outline" className="w-full">
        Next Round
      </Button>
    </div>
  );
};
