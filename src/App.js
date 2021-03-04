import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";
import Home from "./containers/Home/Home";
import ChatRoom from "./containers/ChatRoom/ChatRoom";

function App() {
  const [userName, setUserName] = useState("");
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home userName={userName} setUserName={setUserName} />
        </Route>

        <Route exact path="/:roomId">
          <ChatRoom userName={userName} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
