import React from "react";

import "./ScrollingMenuTop.css";

const ScrollingMenuTop = ({
  variable,
  variableBis,
  setFunction,
  setFunctionBis,
  text,
}) => {
  return (
    <div className="scrolling-menu-top">
      <p>{text}</p>
      <i
        className={
          !variable
            ? "fas fa-chevron-circle-down "
            : "fas fa-chevron-circle-up "
        }
        onClick={() => {
          setFunction(!variable);
          if (variableBis) {
            setFunctionBis(false);
          }
        }}
      ></i>
    </div>
  );
};

export default ScrollingMenuTop;
