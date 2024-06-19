import { useState, useEffect } from "react";
import style from './Timer.module.scss'

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600)+" Hrs"
    const minutes = Math.floor((seconds % 3600) / 60)+" Mins ";
    const secs = seconds % 60+" sec"
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className={style.container}>
      <h4>Time Left</h4>
      <div className={style.content}>{formatTime(timeLeft)}</div>
    </div>
  );
};

export default Timer;