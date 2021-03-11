import React from "react";
import { useHistory } from "react-router-dom";

import "./Home.css";

const Home = ({ userName, setUserName }) => {
  let history = useHistory();

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const redirect = (event) => {
    event.preventDefault();
    history.push("/rooms");
  };

  return (
    <div className="home">
      <div className="home-input-container">
        <form onSubmit={redirect}>
          <input
            className="home-input"
            type="text"
            placeholder="Enter a user name"
            value={userName}
            maxLength={12}
            onChange={handleUserNameChange}
          />

          <i className="fas fa-sign-in-alt" onClick={redirect}></i>
        </form>
      </div>
    </div>
  );
};

export default Home;
