import { useState, useEffect } from "react";
import axios from "axios";
import style from "./Main.module.scss";
// import { Link,useNavigate } from "react-router-dom";

const Main = ({ subject, setTotalQuestions, setSelections, score }) => {
  // const navigate=useNavigate()
  const [data, setData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    const getScienceData = async () => {
      await axios
        .get("https://dreamthemonline.com/sample/getNewQuizData/600")
        .then((data) => {
          console.log(data.data);
          setData(data.data);
        });
    };
    getScienceData();
  }, []);
  useEffect(() => {
    if (data && data.sections[subject]) {
      setTotalQuestions(data.sections[subject].data.length);
    }
  }, [data, subject, setTotalQuestions]);
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      setSelections((prev) => [
        ...prev,
        {
          questionNumber: currentQuestionIndex + 1,
          selectedOption,
          correctAns,
        },
      ]);
      setSelectedOption(null);
    } else {
      // If no option is selected, pass a false state to indicate skipping
      setSelections((prev) => [
        ...prev,
        { questionNumber: currentQuestionIndex + 1, selectedOption: false },
      ]);
    }
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, data.sections[subject].data.length - 1)
    );
  };
  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  // const handleClearSelection = () => {
  //   // setCurrentQuestionIndex(0)
  //   // setSelectedOption(null)
  //   // window.location.reload();
  //   navigate('/')
  // };
  if (!data) {
    return <div> Loading</div>;
  }
  const currentQuestion = data.sections[subject].data[currentQuestionIndex];
  const correctAns = currentQuestion.correctOptions;
  console.log("correct ans ", correctAns);
  console.log("l is", currentQuestion.length);
  const totalQuestions = data.sections[subject].data.length;
  if (totalQuestions) {
    setTotalQuestions(totalQuestions);
  }
  console.log("total is ", totalQuestions);
  return (
    <div className={style.container}>
      <div className={style.box}>
        <div key={currentQuestion.questionID} className={style.main}>
          <div className={style.qNo}>Question No{currentQuestionIndex + 1}</div>
          <div className={style.question}>
            {stripHtmlTags(currentQuestion.question)}
          </div>
          <div className={style.options}>
            {currentQuestion.options.map((opt, i) => (
              <div
                key={i}
                className={`${style.option} ${
                  selectedOption === opt.option ? style.selected : ""
                }`}
                onClick={() => setSelectedOption(opt.option)}
              >
                {opt.option}:{stripHtmlTags(opt.value)}
                {/* {currentQuestion.correctOptions} */}
              </div>
            ))}
          </div>
        </div>
        <div className={style.action}>
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={style.previous}
            type="button"
          >
            Previous
          </button>
          {/* <button
            onClick={handleClearSelection}
            className={style.clear}
            type="button"
          >
            Clear selection
          </button> */}
          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              onClick={handleNextQuestion}
              className={style.next}
              type="button"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className={style.next}
              type="button"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
