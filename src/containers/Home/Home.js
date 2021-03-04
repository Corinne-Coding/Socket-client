import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = ({ userName, setUserName }) => {
  const [roomName, setRoomName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [displayedValue, setDisplayedValue] = useState("");
  const [allRooms] = useState([
    { id: "Room 1" },
    { id: "Room 2" },
    { id: "Room 3" },
  ]);

  const handleRoomNameChange = (event) => {
    setSelectedRoom(null);
    setRoomName(event.target.value);
    setDisplayedValue(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div>
      <h1>Page Home</h1>

      <p>Choose a user name :</p>
      <input
        type="text"
        placeholder="User name"
        value={userName}
        onChange={handleUserNameChange}
      />

      <p>Choose a room :</p>
      {allRooms.map((item, index) => {
        return (
          <div
            className={selectedRoom === index ? "selected" : "not-selected"}
            key={index}
            onClick={() => {
              setDisplayedValue("");
              setRoomName(item.id);
              setSelectedRoom(index);
            }}
          >
            {item.id}
          </div>
        );
      })}

      <p>or enter a new room name :</p>
      <input
        type="text"
        placeholder="Room name"
        onChange={handleRoomNameChange}
        value={displayedValue}
      />

      <br />

      {userName && (selectedRoom === 0 || selectedRoom || roomName) ? (
        <Link to={`/${roomName}`}>
          <div>
            <p>Join room</p>
          </div>
        </Link>
      ) : (
        <div>
          <p>Join room</p>
        </div>
      )}

      <hr />

      <p>USER NAME = {userName}</p>
      <p>ROOM NAME = {roomName}</p>
    </div>
  );
};

export default Home;
