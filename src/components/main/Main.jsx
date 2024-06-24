import { useEffect, useState } from "react";
import style from "./Main.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  findQuestionLength,
  checkAnswer,
 
  clearSession,
} from "../../features/Quiz";
import axios from "axios";


const Main = () => {
  const subject = useSelector((state) => state.quiz.subject);
 
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    const getAllData = async () => {
      await axios
        .get("https://dreamthemonline.com/sample/getNewQuizData/600")
        .then((result) => {
          console.log(result.data);
          setData(result.data);
        });
    };
    getAllData();
  }, []);
  console.log("h", subject);
  useEffect(() => {
    if (data) {
      const questionLength = data.sections[subject]?.data.length || 0;
      console.log("q length", questionLength);
      dispatch(findQuestionLength(questionLength));
    }
  }, [data, subject, dispatch]);
  useEffect(() => {
    setCurrentQuestionIndex(0);
    dispatch(clearSession());
    // selectedOption(null)
  }, [subject, dispatch]);
  if (!data) {
    return <div className={style.loading}> Loading...!</div>;
  }
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const handleAnswerClick = (opt) => {
    const correctOption =
      data.sections[subject].data[currentQuestionIndex].correctOptions[0];
    setSelectedOption(opt.option);
    dispatch(
      checkAnswer({
        questionNumber: currentQuestionIndex,
        selectedOption: opt.option,
        correctOption: correctOption,
      })
    );
  };
  const handleNextClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption(null);
  };
  const handlePreviousQuestion=()=>{
    setCurrentQuestionIndex(currentQuestionIndex-1)
  }
  const handleClearSession = () => {
    setCurrentQuestionIndex(0);
    dispatch(clearSession());
    setSelectedOption(null);
  };
  const currentQuestion =
    data.sections[subject].data[currentQuestionIndex].question;
  const options = data.sections[subject].data[currentQuestionIndex].options;
  // const correctOption =
  //   data.sections[subject].data[currentQuestionIndex].correctOptions[0];
  const sub = data.sections[subject].title;

  console.log("c is ", sub);
  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.main}>
          <div className={style.qNo}>Question No{currentQuestionIndex + 1}</div>

          <div className={style.question}>{stripHtmlTags(currentQuestion)}</div>

          <div className={style.options}>
            {options.map((opt, index) => (
              <div
                onClick={() => handleAnswerClick(opt)}
                key={index}
                className={`${style.option} ${
                  selectedOption === opt.option ? style.selected : ""
                }`}
              >
                {opt.option} : {stripHtmlTags(opt.value)}
              </div>
            ))}
          </div>
        </div>
        <div className={style.action}>
          {currentQuestionIndex > 0 && (
            <button onClick={()=>handlePreviousQuestion()} className={style.previous} type="button">
              Previous
            </button>
          )}

          <button
            onClick={() => handleClearSession()}
            className={style.previous}
          >
            clear session
          </button>
          {currentQuestionIndex <= 8 &&  (
            <button
              onClick={() => handleNextClick()}
              className={style.next}
              type="button"
            >
              Next
            </button>
          ) }
        </div>
      </div>
    </div>
  );
};

export default Main;
