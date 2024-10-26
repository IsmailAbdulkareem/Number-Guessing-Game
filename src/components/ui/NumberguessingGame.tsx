"use client"; // Enables client-side rendering for this component

import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Type definition for the NumberGuessingComponent's state
interface NumberGuessingState {
  gameStarted: boolean;
  gameOver: boolean;
  paused: boolean;
  targetNumber: number;
  userGuess: number | string;
  attempts: number;
  difficulty: string;
  feedbackColor: string;
  startTime: number | null;
}

// Defining the NumberGuessingComponent function component
function NumberguessingGame(): JSX.Element {
  // State variables to manage the game state
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<number | string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [feedbackColor, setFeedbackColor] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);

  // Generate a new target number based on difficulty
  const getNumberRange = (): number => {
    switch (difficulty) {
      case "easy":
        return Math.floor(Math.random() * 5) + 1; // 1 to 5
      case "hard":
        return Math.floor(Math.random() * 20) + 1; // 1 to 20
      default:
        return Math.floor(Math.random() * 10) + 1; // 1 to 10
    }
  };

  // useEffect to generate a new target number when the game starts or resumes
  useEffect(() => {
    if (gameStarted && !paused) {
      setTargetNumber(getNumberRange());
      setStartTime(Date.now()); // Start the timer
    }
  }, [gameStarted, paused]); // Dependencies: gameStarted and paused

  // Function to handle the start of the game
  const handleStartGame = (): void => {
    setGameStarted(true);
    setGameOver(false);
    setAttempts(0);
    setPaused(false);
    setFeedbackColor(""); // Reset feedback color
  };

  // Function to handle pausing the game
  const handlePauseGame = (): void => {
    setPaused(true);
  };

  // Function to handle resuming the game
  const handleResumeGame = (): void => {
    setPaused(false);
  };

  // Function to handle the user's guess
  const handleGuess = (): void => {
    if (typeof userGuess === "number") {
      if (userGuess === targetNumber) {
        setGameOver(true);
        const timeTaken = Date.now() - (startTime as number);
        alert(`Congratulations! You guessed it in ${Math.floor(timeTaken / 1000)} seconds!`);
      } else {
        setAttempts((prev) => prev + 1);
        const hint = userGuess < targetNumber ? "higher" : "lower";
        if (attempts >= 3) {
          alert(`Hint: Try a ${hint} number!`);
        }
        setFeedbackColor("red");
      }
    }
  };

  // Function to handle restarting the game
  const handleTryAgain = (): void => {
    setGameStarted(false);
    setGameOver(false);
    setUserGuess("");
    setAttempts(0);
    setFeedbackColor(""); // Reset feedback color
  };

  // Function to handle input change for user's guess
  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserGuess(parseInt(e.target.value));
    setFeedbackColor(""); // Reset feedback color when input changes
  };

  // JSX to render the game UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-800 to-purple-800">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-2 text-blue-600 drop-shadow-md">Number Guessing Game</h1>
        <p className="text-center text-gray-700 mb-4">Try to guess the number!</p>

        {/* Difficulty Selector */}
        <div className="flex justify-center mb-4">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 bg-gray-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="easy">Easy (1-5)</option>
            <option value="medium">Medium (1-10)</option>
            <option value="hard">Hard (1-20)</option>
          </select>
        </div>

        {!gameStarted && (
          <div className="flex justify-center mb-4">
            <Button
              onClick={handleStartGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
            >
              Start Game
            </Button>
          </div>
        )}

        {gameStarted && !gameOver && (
          <div>
            <div className="flex justify-center mb-4">
              {paused ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={handlePauseGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
                >
                  Pause
                </Button>
              )}
            </div>

            <div className="flex justify-center mb-4">
              <Input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className={`bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs ${feedbackColor}`}
                placeholder="Enter your guess"
              />
              <Button
                onClick={handleGuess}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded ml-4 shadow-md transition duration-300"
              >
                Guess
              </Button>
            </div>
            <div className="text-center text-black">
              <p>Attempts: {attempts}</p>
            </div>
          </div>
        )}

        {gameOver && (
          <div>
            <div className="text-center mb-4 text-black">
              <h2 className="text-2xl font-bold">Game Over!</h2>
              <p>You guessed the number in {attempts} attempts.</p>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleTryAgain}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NumberguessingGame;

