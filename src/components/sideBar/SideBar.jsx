import style from "./SideBar.module.scss";
import Timer from "../counter/Timer";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setMark } from "../../features/Quiz";

const SideBar = () => {
  // const [score, setScore] = useState(0);
  const dispatch=useDispatch()
  const subjectName=useSelector(state=>state.quiz.subJectName)
  const questionLength = useSelector((state) => state.quiz.questionLength);
  const answer = useSelector((state) => state.quiz.answers);
  const mark=useSelector(state=>state.quiz.mark)
  console.log("s is", answer);
  const answerStatus = (index) => {
    const answered = answer.find(
      (ans) => ans.questionNumber === index && ans.selectedOption
    );
    if (answered) {
      return "answered";
    }
    return "unattended";
  };
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
            You are viewing <span>{subjectName}</span> section
          </p>
        </div>
        <div className={style.action}>
          <p>Legends</p>
          <div className={style.marks}>
            <div className={style.item}>
              <div className={style.squire}></div>
              <h4>Un-attended {questionLength - answer.length}</h4>
            </div>
            <div className={style.item}>
              <div
                style={{ backgroundColor: "red" }}
                className={style.squire}
              ></div>
              <h4>Un-Answered {questionLength - answer.length}</h4>
            </div>
            <div className={style.item}>
              <div
                style={{ backgroundColor: "lightGreen" }}
                className={style.squire}
              ></div>
              <h4>Answered {answer.length}</h4>
            </div>
          </div>
        </div>
        <div className={style.answer}>
          {Array.from({ length: questionLength }).map((_, index) => (
            <div
              style={{
                backgroundColor:
                  answerStatus(index) === "answered" ? "lightGreen" : null,
              }}
              key={index}
              className={style.answerBox}
            >{index+1}</div>
          ))}
        </div>
        <Link to={`/${mark}`}>
          <div className={style.finish}>
            <button onClick={()=>dispatch(setMark())}>Finish</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
