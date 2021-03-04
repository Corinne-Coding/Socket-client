import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";

import "./ChatRoom.css";

const ChatRoom = ({ userName }) => {
  // console.log("USERNAME =>", userName);
  const { roomId } = useParams();
  const socketRef = useRef();

  const [messageToSend, setMessageToSend] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // Connection to WebSocket
    socketRef.current = socketIOClient("http://localhost:4000", {
      query: {
        roomId,
      },
    });
    console.log("Connection done");

    socketRef.current.messages = [];
    socketRef.current.userName = userName ? userName : "Unknown user";
    socketRef.current.users = [];

    socketRef.current.emit("newUser", {
      userId: socketRef.current.id,
      userName: socketRef.current.userName,
    });

    // coucu

    socketRef.current.on("newUser", (data) => {
      socketRef.current.users.push({
        userName: data.userName,
      });
      setAllUsers((allUsers) => [
        ...allUsers,
        {
          ...allUsers,
          userName: data.userName,
        },
      ]);
    });

    // Receive message
    socketRef.current.on("newChatMessage", (data) => {
      console.log("02");
      // console.log(data);
      socketRef.current.messages.push({
        message: data.body,
        owner: data.userId,
        userName: data.userName,
      });
      setAllMessages((allMessages) => [
        ...allMessages,
        {
          ...allMessages,
          message: data.body,
          owner: data.userId,
          userName: data.userName,
        },
      ]);
    });

    return () => {
      console.log("Disconnection done");
      socketRef.current.disconnect();
    };
  }, [roomId, userName]);

  // Send message
  const sendMessage = () => {
    console.log("01");
    socketRef.current.emit("newChatMessage", {
      body: messageToSend,
      userId: socketRef.current.id,
      userName: socketRef.current.userName,
    });
    setMessageToSend("");
  };

  return (
    <div>
      <h1>Page ChatRoom</h1>
      <h2>
        Welcome on the room <em>{roomId}</em>
      </h2>

      {allMessages.length > 0 &&
        allMessages.map((item, index) => {
          console.log(item);
          return (
            <p key={index}>
              {item.message} from {item.userName} + {item.owner}
            </p>
          );
        })}

      <label>Message à envoyer :</label>
      <input
        onChange={(event) => {
          setMessageToSend(event.target.value);
        }}
        value={messageToSend}
      />
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        Envoyer le message
      </button>

      <p>Users list : </p>
      {allUsers.map((item, index) => {
        return <p key={index}>{item.userName}</p>;
      })}
    </div>
  );
};

export default ChatRoom;
