import React, { FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { UserProps } from "../App";

const Login = ({
  username,
  isLoggedIn,
  setUsername,
  setIsLoggedIn,
  socket,
  setIsConnected,
}: UserProps) => {
  const [showInput, setShowInput] = useState(true);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setUsername("");
      setShowInput(false);
      socket.disconnect();
      setIsConnected(false);
    } else {
      if (username !== "") {
        setIsLoggedIn(true);
        setShowInput(true);
        socket.connect();
        setIsConnected(true);
        sessionStorage.setItem("username", username);
      }
    }
  };

  return (
    <Container>
      <p>
        Connection Status:{" "}
        {isLoggedIn
          ? "Connected to Flask Server"
          : "Disconnected from Flask Server"}
      </p>
      <Form className="login-form" onSubmit={handleSubmit}>
        {!isLoggedIn ? (
          <>
            <Form.Label>Enter Username</Form.Label>
            <Form.Control
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <div className="btn-login">
              <Button
                type="submit"
                variant={isLoggedIn ? "secondary" : "primary"}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </Button>
            </div>
          </>
        ) : (
          <div>
            <Button
              type="submit"
              variant={isLoggedIn ? "secondary" : "primary"}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </Button>
          </div>
        )}
      </Form>
    </Container>
  );
};

export default Login;
