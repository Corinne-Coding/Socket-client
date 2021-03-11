import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { useParams, useHistory } from "react-router-dom";

import "./ChatRoom.css";

const ChatRoom = ({ userName }) => {
  // console.log("Username in Chatroom =>", userName);
  const { roomId } = useParams();
  let history = useHistory();
  const socketRef = useRef();

  const [messageToSend, setMessageToSend] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [newConnection, setNewConnection] = useState(null);

  useEffect(() => {
    // Connection to WebSocket
    socketRef.current = socketIOClient(
      "https://b62991b2d2e1.ngrok.io" || "http://localhost:4000",
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
      // A FAIRE
      console.log(data);
      setNewConnection(data.message);
    });

    // Receive message
    socketRef.current.on("newChatMessage", (data) => {
      console.log(data);
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
    <div className="chatRoom">
      <div className="users-col">
        <div className="go-back">
          <div
            className="btn"
            onClick={() => {
              history.push("/rooms");
            }}
          >
            <i className="fas fa-angle-left"></i>
          </div>
          <p>Rooms</p>
        </div>

        <div className="users-list">
          <div className="users-list-text-1">
            <p>
              <span>{userName ? userName : "Unknown"}</span>
              <em>, you are in room</em>
            </p>
            <p>{roomId}</p>
          </div>

          <div className="users-list-text-2">
            <p>Users connected</p>
            <div className="scrolling-list">
              {allUsers.map((item, index) => {
                return (
                  <div className="single-user" key={index}>
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
                      {/* <p>{displayDate(item.date)}</p> */}
                      <p>{displayTime(item.date)}</p>
                    </div>

                    <div className="msg">
                      <p> {item.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <form className="send-message" onSubmit={sendMessage}>
          <input
            onChange={(event) => {
              setMessageToSend(event.target.value);
            }}
            value={messageToSend}
          />
          <div onClick={sendMessage} className="btn">
            <i className="fas fa-angle-right"></i>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
