import { useEffect, useState } from "react";
import style from "./SideBar.module.scss";
import Timer from "../counter/Timer";
import { Link } from "react-router-dom";

const SideBar = ({ totalQuestions, selections,score,setScore }) => {
  // const [score, setScore] = useState(0);
  const getStatus = (index) => {
    const selection = selections.find(
      (sel) => sel.questionNumber === index + 1 && sel.selectedOption
    );
    if (selection) {
      return "answered";
    }
    return "unattended";
  };
  const answeredCount = selections.filter(
    (sel) => sel.selectedOption !== false
  ).length;
  const unansweredCount = totalQuestions - answeredCount;

  useEffect(() => {
    const calculateScore = () => {
      let totalScore = 0;

      selections.forEach((sel) => {
        if (sel.selectedOption !== false) {
          const isCorrect = sel.selectedOption === sel.correctAns[0]; // Assuming correctAns is an array
          totalScore += isCorrect ? 4 : -1; // Adjust score logic based on your requirements
        }
      });

      setScore(totalScore);
    };

    calculateScore();
  }, [selections,setScore]);

  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.time}>
          <div className={style.round}>
            <Timer />
          </div>
        </div>
        <div className={style.view}>
          <p>
            You are viewing <span></span> section
          </p>
        </div>
        <div className={style.action}>
          <p>Legends</p>
          <div className={style.marks}>
            <div className={style.item}>
              <div className={style.squire}>{unansweredCount}</div>
              <h4>Un-attended</h4>
            </div>
            <div className={style.item}>
              <div style={{ backgroundColor: "red" }} className={style.squire}>
                {unansweredCount}
              </div>
              <h4>Un-Answered </h4>
            </div>
            <div className={style.item}>
              <div
                style={{ backgroundColor: "lightGreen" }}
                className={style.squire}
              >
                {answeredCount}
              </div>
              <h4>Answered </h4>
            </div>
          </div>
        </div>
        <div className={style.answer}>
          {[...Array(totalQuestions)].map((_, index) => (
            <div
              key={index}
              style={{
                backgroundColor: getStatus(index) === "answered" ? "red" : null,
              }}
              className={style.answerBox}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <Link to={`/${score}`}>
        <div className={style.finish}>
          <button>Finish</button>
          {/* <p>{score}</p> */}
          {/* <Evaluator selections={selections} /> */}
        </div>
        </Link>
       
      </div>
    </div>
  );
};

export default SideBar;
