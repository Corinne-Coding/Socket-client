import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";

import "./ChatRoom.css";

// Components
import GoBackButton from "../../components/GoBackButton/GoBackButton";

const ChatRoom = ({ userName, color }) => {
  // console.log("Username in Chatroom =>", userName);
  const { roomId } = useParams();
  const socketRef = useRef();

  const [messageToSend, setMessageToSend] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // Connection to WebSocket
    socketRef.current = socketIOClient(
      "https://e9ec6458e634.ngrok.io" || "http://localhost:4000",
      {
        query: {
          roomId,
          userName: userName ? userName : "Unknown user",
        },
      }
    );

    // Receive users list
    socketRef.current.on("usersList", (data) => {
      setAllUsers(data);
    });

    // Receive new connection information
    socketRef.current.on("userConnection", (data) => {
      // console.log(data);
      setAllMessages((allMessages) => [
        ...allMessages,
        {
          ...allMessages,
          newConnection: data.newConnection,
        },
      ]);
    });

    // Receive message
    socketRef.current.on("newChatMessage", (data) => {
      // console.log(data);
      setAllMessages((allMessages) => [
        ...allMessages,
        {
          ...allMessages,
          message: data.message,
          userId: data.userId,
          userName: data.userName,
          date: data.date,
        },
      ]);
    });

    // Disconnection from WebSocket
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, userName]);

  // Send message
  const sendMessage = (event) => {
    event.preventDefault();
    socketRef.current.emit("newChatMessage", {
      message: messageToSend,
      userId: socketRef.current.id,
      userName,
    });
    setMessageToSend("");
  };

  // Display date
  // const displayDate = (date) => {
  //   return date.split("T", 1);
  // };

  // Display time
  const displayTime = (date) => {
    const tab = date.split("T");
    return tab[1].split(".", 1);
  };

  return (
    <div className="chat-room">
      <div>
        <GoBackButton text="Rooms" page="/rooms" />

        <div className="informations">
          <div className="informations-room">
            <p>
              <span>{userName ? userName : "Unknown"}</span>
              <em>, you are in room</em>
            </p>
            <p>{roomId}</p>
          </div>

          <div className="informations-users">
            <p>Users connected</p>
            <div className="scrolling-list">
              {allUsers.map((item, index) => {
                return (
                  <div className={"single-user bgc-light-" + color} key={index}>
                    <p>{item.userName}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="chat-col">
        <div className="messages">
          {allMessages.length > 0 &&
            allMessages.map((item, index) => {
              console.log(item);
              if (item.message) {
                return (
                  <div
                    className={
                      item.userId === socketRef.current.id
                        ? "message-bubble-owner"
                        : "message-bubble"
                    }
                    key={index}
                  >
                    <div>
                      <div className="sender-infos">
                        <p>
                          {item.userName === userName
                            ? "You"
                            : item.userName
                            ? item.userName
                            : "Unknown"}
                        </p>
                        <p>{displayTime(item.date)}</p>
                      </div>

                      <div className={"msg bgc-" + color}>
                        <p>{item.message}</p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <p key={index} className="new-connection">
                    {item.newConnection}
                  </p>
                );
              }
            })}
        </div>
        <form onSubmit={sendMessage}>
          <input
            onChange={(event) => {
              setMessageToSend(event.target.value);
            }}
            value={messageToSend}
          />
          <div
            onClick={sendMessage}
            className={"btn bgc-dark-" + color + " hover-bgc-" + color}
          >
            <i className="fas fa-angle-right"></i>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
