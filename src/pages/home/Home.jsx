import { useState } from "react";
import style from "./Home.module.scss";
import Header from "../../components/header/Header";
import Main from "../../components/main/Main";
import SideBar from "../../components/sideBar/SideBar";

const Home = () => {
  const [subject, setSubject] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selections, setSelections] = useState([]);
  const [score, setScore] = useState(0);
  console.log("selection array", selections);
  return (
    <div className={style.main}>
      <Header subject={subject} setSubject={setSubject} />
      <div className={style.middle}>
        <Main
        score={score}
          setSelections={setSelections}
          setTotalQuestions={setTotalQuestions}
          subject={subject}
        />
        <SideBar score={score} setScore={setScore} selections={selections} totalQuestions={totalQuestions} />
      </div>
    </div>
  );
};

export default Home;
