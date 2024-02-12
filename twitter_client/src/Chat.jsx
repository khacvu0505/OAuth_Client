import React, { useEffect } from "react";
import socket from "./socket";
import axios from "axios";

export default function Chat() {
  const [value, setValue] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const userList = [
    {
      name: "User 1",
      value: "user65bcb618f65ac613668fee62",
    },
    {
      name: "User 2",
      value: "user65c054caea98ef5f386dbdf6",
    },
  ];
  const [receiver, setReceiver] = React.useState("");

  const getProfile = (username) => {
    axios
      .get(`users/${username}`, {
        baseURL: "http://localhost:4000",
      })
      .then((res) => {
        setReceiver(res.data.result._id);
        alert("Now you can chat with " + res.data.result.username);
      });
  };
  const profile = JSON.parse(localStorage.getItem("profile")) || {};

  useEffect(() => {
    socket.on("receive private message", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          content: data.content,
          isSender: false,
        },
      ]);
    });

    socket.on("connect_error", (err) => {
      console.log("connect_error message ", err.message);
      console.log("connect_error name ", err.data);
    });

    socket.on("disconnect", (reason) => {
      console.log("reason", reason);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setValue("");
    socket.emit("private message", {
      content: value,
      to: receiver,
      from: profile?._id,
    });
    setMessages((prev) => [
      ...prev,
      {
        content: value,
        isSender: true,
      },
    ]);
  };

  return (
    <div>
      <h1>Chat</h1>
      {userList.map((item) => (
        <div key={item.value}>
          <button onClick={() => getProfile(item.value)}>{item.name}</button>
        </div>
      ))}
      <div>
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <p
                className={message.isSender ? "message-right" : "message-left"}
              >
                {message.content}
              </p>
            </div>
          );
        })}
      </div>
      <form>
        <input
          value={value}
          type="text"
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" onClick={handleSubmitForm}>
          Send
        </button>
      </form>
    </div>
  );
}
