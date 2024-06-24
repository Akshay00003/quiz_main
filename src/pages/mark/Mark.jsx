import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import style from "./Mark.module.scss";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Mark = () => {
    // const {mark}=useParams()
    const mark=useSelector(state=>state.quiz.mark)
  const [windowDimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);
  return (
    <div className={style.container}>
      <ReactConfetti
        width={windowDimension.width}
        height={windowDimension.height}
        tweenDuration={1000}
      />
      <p className={style.para}>
        {" "}
        Your are scored <span> { mark }</span>  Marks
      </p>
      <Link to={'/'}>
      <button className={style.btn}>Back to Home</button>
      </Link>
   
    </div>
  );
};

export default Mark;
