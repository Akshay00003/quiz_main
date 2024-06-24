import style from "./Header.module.scss";
import { useDispatch } from "react-redux";
import { selectSubject, setSubjectName } from "../../features/Quiz";
import { useSelector } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();
  const subject = useSelector((state) => state.quiz.subject);
  const handleSubjectClick = (subjectIndex, subjectName) => {
    dispatch(selectSubject(subjectIndex));
    dispatch(setSubjectName(subjectName));
  };
  return (
    <div className={style.container}>
      <div className={style.items}>
        <button
          onClick={() => handleSubjectClick(0, "SCIENCE")}
          type="button"
          style={{ backgroundColor: subject === 0 ? "#627ee3" : null }}
        >
          SCIENCE
        </button>
        <button
          onClick={() => handleSubjectClick(1, "MATHEMATICS")}
          type="button"
          style={{ backgroundColor: subject === 1 ? "#627ee3" : null }}
        >
          MATHEMATICS
        </button>
        <button
          onClick={() => handleSubjectClick(2, "SOCIAL SCIENCE")}
          type="button"
          style={{ backgroundColor: subject === 2 ? "#627ee3" : null }}
        >
          SOCIAL SCIENCE
        </button>
        <button
          onClick={() => handleSubjectClick(3, "MENTAL ABILITY")}
          type="button"
          style={{ backgroundColor: subject === 3 ? "#627ee3" : null }}
        >
          MENTAL ABILITY
        </button>
      </div>
    </div>
  );
};

export default Header;
