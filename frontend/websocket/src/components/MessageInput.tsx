import React, { FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Socket } from "socket.io-client";

interface SocketProps {
  socket: Socket;
}

const MessageInput = ({ socket }: SocketProps) => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();
    socket.emit("message", {
      text: message,
      username: sessionStorage.getItem("username"),
    });
    setMessage("");
  };

  const handleEnterKey = (event: any) => {
    if (event.key === "Enter") {
      handleSendMessage(event);
    }
  };

  return (
    <Container className="message-container">
      <Form className="form" onSubmit={handleSendMessage}>
        <Form.Group className="form-container">
          <Form.Label>Type your message: </Form.Label>
          <Form.Control
            className="form-input"
            type="text"
            value={message}
            autoComplete="off"
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => handleEnterKey(event)}
          />
        </Form.Group>
        <Button type="submit">Send</Button>
      </Form>
    </Container>
  );
};

export default MessageInput;
