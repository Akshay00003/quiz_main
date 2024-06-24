import { useState } from "react";
import style from "./Home.module.scss";
import Header from "../../components/header/Header";
import Main from "../../components/main/Main";
import SideBar from "../../components/sideBar/SideBar";

const Home = () => {

  return (
    <div className={style.main}>
      <Header />
      <div className={style.middle}>
        <Main
        />
        <SideBar />
      </div>
    </div>
  );
};

export default Home;
