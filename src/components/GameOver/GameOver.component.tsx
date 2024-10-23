import './GameOver.css';

type GameOverProps = {
    score: number;
    onRestart: () => void;
  };
  
  const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
    return (
      <div className="game-over">
        <h1>Game Over!</h1>
        <p>Your final score: {score}</p>
        <button onClick={onRestart}>Play Again</button>
      </div>
    );
  };
  
  export default GameOver;
  