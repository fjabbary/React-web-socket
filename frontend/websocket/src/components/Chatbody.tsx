import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { UserProps } from "../App";

interface SocketProps {
  socket: Socket;
  username: string;
}

const Chatbody = ({ socket, username }: SocketProps) => {
  const [messages, setMessages] = useState<
    { text: string; username: string }[]
  >([]);

  console.log(username);

  useEffect(() => {
    socket.on("message", (emitted) => {
      console.log(emitted);
      setMessages([...messages, emitted]);
    });
  }, [messages, socket]);

  return (
    <Container className="chat-body">
      <div className="chat-bubble">
        {messages.map((message, idx) => (
          <div key={idx}>
            <div
              className={
                message.username !== sessionStorage.getItem("username")
                  ? "float-end"
                  : ""
              }
            >
              {message.username} says:
            </div>{" "}
            <br />
            <div
              className={
                message.username !== sessionStorage.getItem("username")
                  ? "bg-warning d-inline-block float-end p-2 rounded"
                  : "bg-info d-inline-block p-2 rounded"
              }
            >
              <Card.Text>{message.text}</Card.Text>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Chatbody;
