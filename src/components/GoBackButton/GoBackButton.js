import React from "react";
import { useHistory } from "react-router-dom";

import "./GoBackButton.css";

const GoBackButton = ({ text, page }) => {
  let history = useHistory();
  return (
    <div className="go-back">
      <div
        className="btn"
        onClick={() => {
          history.push(page);
        }}
      >
        <i className="fas fa-angle-left"></i>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default GoBackButton;
