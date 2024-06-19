import React from "react";
import { Parallax } from "react-parallax";
import space from "../../assets/space.jpg";
import nasa from "../../assets/nasa.jpg";
import style from "./First.module.scss";
import { Link } from "react-router-dom";

const First = () => {
  return (
    <div>
      <Parallax strength={600} bgImage={space}>
        <div className={style.content}>
          <div className={style.text}>
            <p className={style.first}>
              Learn 10x <span>Faster</span>
            </p>
            <p className={style.second}>
              Unlock Your potential with personalized Quizzes
            </p>
            <div className={style.box}>
              <p className={style.third}>scroll down</p>
            </div>
          </div>
        </div>
      </Parallax>
      <Parallax strength={-600} bgImage={nasa}>
      <Link to={'/quiz'}>
      <div className={style.content}>
          <div className={style.btn}>Get Start</div>
        </div>
      </Link>
        
      </Parallax>
      {/* <div className={style.content}></div>  */}
    </div>
  );
};

export default First;
