import React from "react";
import stylesheet from "./LoadingMain.module.css";

const LoadingMain = () => {
  return (
    <div className={`${stylesheet.background} h-screen w-screen`}>
      <div className={stylesheet.space}>
        <div className={stylesheet.f_circle}></div>
        <div className={stylesheet.s_circle}></div>
        <div className={stylesheet.t_circle}></div>
        <div className={stylesheet.circle}></div>
      </div>
    </div>
  );
};

export default LoadingMain;
