import React from "react";
import PlayerSetupFormContainer from "./PlayerSetupFormContainer";

const PlayerSetup = () => {
  return (
    <main className=" min-h-[92vh] md:min-h-[85vh] rounded-none md:rounded-2xl bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            Tic-Tac-Toe
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Best of 5 rounds • 2 points for win • 1 point for loss • 0 points
            for draw
          </p>
        </div>
        <PlayerSetupFormContainer />
      </div>
    </main>
  );
};

export default PlayerSetup;
