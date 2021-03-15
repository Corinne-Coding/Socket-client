import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";

import "./ChatRoom.css";

// Components
import GoBackButton from "../../components/GoBackButton/GoBackButton";

const ChatRoom = ({ userName, color }) => {
  const { roomId } = useParams();
  const socketRef = useRef();
  const scrollRef = useRef();

  const [messageToSend, setMessageToSend] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // Connection to WebSocket
    socketRef.current = socketIOClient(
      "https://e02ddb4ae6d3.ngrok.io" || "http://localhost:4000",
      {
        query: {
          roomId,
          userName: userName ? userName : "Unknown user",
        },
      }
    );

    // Receive users list when a new user is connected
    socketRef.current.on("usersList", (data) => {
      setAllUsers(data);
    });

    // Receive new connection information when a new user is connected (except the current user)
    socketRef.current.on("userConnection", (data) => {
      setAllMessages((allMessages) => [
        ...allMessages,
        {
          ...allMessages,
          newConnection: data.newConnection,
        },
      ]);
    });

    // Receive new disconnection information when a new user has disconnected
    socketRef.current.on("userDisconnection", (data) => {
      console.log(data);
      setAllMessages((allMessages) => [
        ...allMessages,
        {
          ...allMessages,
          newDisconnection: data.newDisconnection,
        },
      ]);
    });

    // Receive message
    socketRef.current.on("newChatMessage", (data) => {
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

  // Automatic scroll in chat section when a new message is displayed
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [allMessages]);

  // Function to send message
  const sendMessage = (event) => {
    event.preventDefault();
    socketRef.current.emit("newChatMessage", {
      message: messageToSend,
      userId: socketRef.current.id,
      userName,
    });
    setMessageToSend("");
  };

  // Function to display time
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
            <p className={"color-dark-" + color}>{roomId}</p>
          </div>

          <div className="informations-users">
            <p>
              {allUsers.length === 0
                ? "No user connected"
                : allUsers.length === 1
                ? "1 user connected"
                : allUsers.length + " users connected"}
            </p>
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
              if (item.message) {
                console.log("01");
                return (
                  <div
                    ref={scrollRef}
                    className={
                      item.userId === socketRef.current.id
                        ? "msg-bubble-owner"
                        : "msg-bubble"
                    }
                    key={index}
                  >
                    <div>
                      <div className="sender-infos">
                        <p>
                          {item.userName === userName &&
                          item.userId === socketRef.current.id
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
              } else if (item.newConnection) {
                console.log("02");
                return (
                  <p key={index} className="new-connection" ref={scrollRef}>
                    {item.newConnection}
                  </p>
                );
              } else {
                console.log("03");
                return (
                  <p key={index} className="new-connection" ref={scrollRef}>
                    {item.newDisconnection}
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
