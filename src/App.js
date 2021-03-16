import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Home from "./containers/Home/Home";
import Rooms from "./containers/Rooms/Rooms";
import ChatRoom from "./containers/ChatRoom/ChatRoom";

function App() {
  const [userName, setUserName] = useState("");
  const [color, setColor] = useState("pink");

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home
            userName={userName}
            setUserName={setUserName}
            color={color}
            setColor={setColor}
          />
        </Route>

        <Route exact path="/rooms">
          <Rooms userName={userName} color={color} />
        </Route>

        <Route exact path="/:roomId">
          <ChatRoom userName={userName} color={color} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
