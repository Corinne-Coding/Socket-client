import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./Home.css";

const Home = ({ userName, setUserName, color, setColor }) => {
  let history = useHistory();

  const [colorPallet] = useState([
    "pink",
    "green",
    "red",
    "blue",
    "yellow",
    "purple",
  ]);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const redirect = (event) => {
    event.preventDefault();
    if (userName) {
      setUserName(userName.trim());
      history.push("/rooms");
    }
  };

  const pickColor = (color) => {
    setColor(color);
  };

  return (
    <div className="home">
      <div className={"input-container border-bottom-" + color}>
        <form onSubmit={redirect}>
          <input
            className="input"
            type="text"
            placeholder="Enter a user name"
            value={userName}
            maxLength={13}
            onChange={handleUserNameChange}
          />

          <i className="fas fa-sign-in-alt" onClick={redirect}></i>
        </form>
      </div>

      <div className="colors">
        <p>
          Don't like <span className={`color-${color}`}>{color}</span> ? Choose
          another color
        </p>
        <div className="color-circles">
          {colorPallet.map((item) => {
            if (item !== color) {
              return (
                <div
                  key={item}
                  className={"bgc-" + item}
                  onClick={() => pickColor(item)}
                ></div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
