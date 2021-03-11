import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Rooms.css";

const Rooms = () => {
  const [displayScrollingMenu1, setDisplayScrollingMenu1] = useState(false);
  const [displayScrollingMenu2, setDisplayScrollingMenu2] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomToNavigate, setRoomToNavigate] = useState(null);
  const [allRooms] = useState([
    { id: "Room 1" },
    { id: "Room 2" },
    { id: "Room 3" },
  ]);

  const handleRoomNameChange = (event) => {
    setSelectedRoom(null);
    setRoomName(event.target.value);
    setRoomToNavigate(event.target.value);
  };

  return (
    <div className="rooms">
      <div className="scrolling-menu-1">
        <div>
          <p>Select a room</p>
          <i
            className={
              !displayScrollingMenu1
                ? "fas fa-chevron-circle-down"
                : "fas fa-chevron-circle-up"
            }
            onClick={() => {
              setDisplayScrollingMenu1(!displayScrollingMenu1);
              if (displayScrollingMenu2) {
                setDisplayScrollingMenu2(false);
              }
            }}
          ></i>
        </div>
        <div
          className={
            !displayScrollingMenu1 ? "menu-list hidden" : "menu-list display"
          }
        >
          {allRooms.map((item, index) => {
            return (
              <div
                className={selectedRoom === index ? "selected" : undefined}
                key={index}
                onClick={() => {
                  setSelectedRoom(index);
                  setRoomName("");
                  setRoomToNavigate(item.id);
                }}
              >
                {item.id}
              </div>
            );
          })}
        </div>
      </div>

      <div className="scrolling-menu-2">
        <div>
          <p>Create a room</p>
          <i
            className={
              !displayScrollingMenu2
                ? "fas fa-chevron-circle-down"
                : "fas fa-chevron-circle-up"
            }
            onClick={() => {
              setDisplayScrollingMenu2(!displayScrollingMenu2);
              if (displayScrollingMenu1) {
                setDisplayScrollingMenu1(false);
              }
            }}
          ></i>
        </div>
        <div
          className={
            !displayScrollingMenu2 ? "menu-list hidden" : "menu-list display"
          }
        >
          <form>
            <input
              className="rooms-input"
              type="text"
              placeholder="Enter a room name"
              value={roomName}
              maxLength={15}
              onChange={handleRoomNameChange}
            />
          </form>
        </div>
      </div>

      <Link to={`/${roomToNavigate}`} className="link">
        <div className={roomToNavigate ? "circle-btn pulse" : "circle-btn"}>
          <i className="fas fa-sign-in-alt"></i>
        </div>
      </Link>
    </div>
  );
};

export default Rooms;
