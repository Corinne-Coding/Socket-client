import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Rooms.css";

// Components
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import ScrollingMenuTop from "../../components/ScrollingMenuTop/ScrollingMenuTop";

const Rooms = ({ color }) => {
  console.log(color);
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
      <GoBackButton text="Home" page="/" />

      <div>
        <div className="scrolling-menu-1">
          <ScrollingMenuTop
            variable={displayScrollingMenu1}
            variableBis={displayScrollingMenu2}
            setFunction={setDisplayScrollingMenu1}
            setFunctionBis={setDisplayScrollingMenu2}
            text="Select a room"
          />

          <div
            className={
              !displayScrollingMenu1 ? "menu-list hidden" : "menu-list display"
            }
          >
            {allRooms.map((item, index) => {
              return (
                <p
                  className={
                    selectedRoom === index
                      ? "selected-dark-" + color
                      : "selected-dark" + color + " hover-color-dark-" + color
                  }
                  key={index}
                  onClick={() => {
                    setSelectedRoom(index);
                    setRoomName("");
                    setRoomToNavigate(item.id);
                  }}
                >
                  {item.id}
                </p>
              );
            })}
          </div>
        </div>

        <div className="scrolling-menu-2">
          <ScrollingMenuTop
            variable={displayScrollingMenu2}
            variableBis={displayScrollingMenu1}
            setFunction={setDisplayScrollingMenu2}
            setFunctionBis={setDisplayScrollingMenu1}
            text="Create a room"
          />

          <div
            className={
              !displayScrollingMenu2 ? "menu-list hidden" : "menu-list display"
            }
          >
            <form>
              <input
                className={"border-bottom-" + color}
                type="text"
                placeholder="Enter a room name"
                value={roomName}
                maxLength={15}
                onChange={handleRoomNameChange}
              />
            </form>
          </div>
        </div>

        {roomToNavigate ? (
          <Link to={`/${roomToNavigate}`} className="link">
            <div className={"circle-btn pulse pulse-" + color}>
              <i className="fas fa-sign-in-alt"></i>
            </div>
          </Link>
        ) : (
          <div className="circle-btn">
            <i className="fas fa-sign-in-alt"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
