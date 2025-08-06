import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Users } from "lucide-react";
import { PlayerSetupForm } from "./PlayerSetupForm";

const PlayerSetupFormContainer = () => {
  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-primary  rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-background" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            Player Setup
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Enter player names to start your match
          </CardDescription>
        </CardHeader>
        <PlayerSetupForm />
      </Card>
    </div>
  );
};

export default PlayerSetupFormContainer;
