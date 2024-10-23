import { useEffect, useState } from "react";
import ColorRush from "../ColorRush/ColorRush.component";

type TimerProps = {
    timeLeft: number;
  };
  
  const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
    const [fiveSecondsLeft, setFiveSecondsLeft] = useState<boolean>(false);

    useEffect(() => {
        if(timeLeft <= 5) {
            setFiveSecondsLeft(true);
        } else {
            setFiveSecondsLeft(false);
        }
    },[timeLeft])
  
    return <p>Time left: <span style={{color: fiveSecondsLeft ? 'red' : 'white'}}>{timeLeft}</span>s</p>;
  };
  
  export default Timer;
  