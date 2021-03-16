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
    <div
      className="scrolling-menu-top"
      onClick={() => {
        setFunction(!variable);
        if (variableBis) {
          setFunctionBis(false);
        }
      }}
    >
      <p>{text}</p>
      <i
        className={
          !variable
            ? "fas fa-chevron-circle-down "
            : "fas fa-chevron-circle-up "
        }
      ></i>
    </div>
  );
};

export default ScrollingMenuTop;
