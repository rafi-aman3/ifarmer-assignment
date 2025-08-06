import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

const GameRuleAlert = () => {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <strong>Game Rules:</strong> Best of 5 rounds. First to win 3 rounds
        wins the match!
      </AlertDescription>
    </Alert>
  );
};

export default GameRuleAlert;
