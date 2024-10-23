import React, { useState, useEffect } from "react";
import ScoreDisplay from "../ScoreDisplay/ScoreDisplay.component";
import Timer from "../Timer/Timer.component";
import GameOver from "../GameOver/GameOver.component";
import generateNewWord from "../../utils/generateNewWord";
import "./ColorRush.css";

// Directly specify text color based on the button color
const getTextColor = (backgroundColor: string) => {
  const lightColors = ["yellow", "lightgray", "lightblue", "lightgreen"];
  return lightColors.includes(backgroundColor) ? "#000" : "#fff";
};

type WordOption = {
  text: string;
  color: string;
};

const ColorRush: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<WordOption | null>(null);
  const [options, setOptions] = useState<WordOption[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasGameStarted, setHasGameStarted] = useState<boolean>(false);

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setIsGameOver(false);
    setHasGameStarted(true);
    setNewWord();
  };

  const setNewWord = () => {
    const { word, colorOptions } = generateNewWord();
    setCurrentWord(word);

    const mismatchedOptions = colorOptions.map((option) => {
      let backgroundColor = option.color;
      const availableColors = colorOptions.filter(
        (c) => c.color !== backgroundColor
      );
      const randomColor =
        availableColors[Math.floor(Math.random() * availableColors.length)]
          .color;

      return { text: option.text, color: randomColor }; // Mismatch text and background color
    });

    setOptions(mismatchedOptions);
  };

  const handleAnswer = (selectedColor: string) => {
    if (currentWord && selectedColor === currentWord.text.toLowerCase()) {
      setScore(score + 1);
      setTimeLeft(timeLeft + 2);
      setNewWord();
    } else {
      setIsGameOver(true); // Trigger game over on incorrect answer
    }
  };

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true); // Game over when time runs out
    }
  }, [timeLeft, isGameOver]);

  useEffect(() => {
    document.title = "ColorRush";
  }, []); 


  return (
    <div className="color-rush">
      {!hasGameStarted ? (
        <div className="start-screen">
          <h1>Welcome to ColorRush!</h1>
          <div className="game-goal">
            <p>
              Your goal is to select the correct color based on the text
              displayed. Match the text, not the color of the button!
            </p>
          </div>
          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
        </div>
      ) : isGameOver ? (
        <GameOver score={score} onRestart={startGame} />
      ) : (
        <div className="game">
          <ScoreDisplay score={score} />
          {currentWord && (
            <h2 style={{ color: currentWord.color }}>{currentWord.text}</h2>
          )}
          <div className="color-options">
            {options
              // Only shuffle if the score is greater than or equal to 10
              .sort(() => {
                if (score >= 10) {
                  // Shuffle faster after every 5 rounds
                  const speedFactor = Math.floor(score / 5) - 1; // Speed up after every 5 rounds after round 10
                  return Math.random() - 0.5 - speedFactor * 0.1; // Increase the shuffle effect
                }
                return 0; // No shuffle before round 10
              })
              .map((option) => (
                <button
                  key={option.text}
                  style={{
                    backgroundColor: option.color,
                    color: getTextColor(option.color),
                    border: "2px solid #000",
                  }}
                  onClick={() => handleAnswer(option.text.toLowerCase())}
                >
                  {option.text}
                </button>
              ))}
          </div>
          <Timer timeLeft={timeLeft} />
        </div>
      )}
      <footer className="signature">
        <p>Made by Gjermund Kvardal © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default ColorRush;
