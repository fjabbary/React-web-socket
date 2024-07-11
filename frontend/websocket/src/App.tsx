import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { io, Socket } from "socket.io-client";
import MessageInput from "./components/MessageInput";
import Chatbody from "./components/Chatbody";
import Login from "./components/Login";

const socket = io("http://127.0.0.1:5000", {
  autoConnect: false,
});

export interface UserProps {
  username: string;
  isLoggedIn: boolean;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

// export interface User {
//   username: string
//   socket: Socket
// }

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleConnect = () => {
  //   socket.connect();
  //   if (username && isLoggedIn){
  //   setIsConnected(true);
  //   }
  // }

  // const handleDisconnect = () => {
  //   socket.disconnect();
  //   setIsConnected(false);
  // }

  return (
    <Container className="main-container">
      {/* <p>
        Connection Status:{" "}
        {isConnected
        ? "Connected to Flask Server"
        : "Disconnected from Flask Server"}
      </p> */}
      {isLoggedIn ? <h1>Welcome {username}!</h1> : <h1>Welcome</h1>}

      <Login
        setIsConnected={setIsConnected}
        socket={socket}
        username={username}
        isLoggedIn={isLoggedIn}
        setUsername={setUsername}
        setIsLoggedIn={setIsLoggedIn}
      />
      {isConnected ? (
        <>
          <Chatbody socket={socket} username={username} />
          <MessageInput socket={socket} />
          {/* <Button variant='danger' onClick={handleDisconnect}>Disconnected</Button> */}
        </>
      ) : (
        // <Button onClick={handleConnect}>Connect</Button>
        <p>Please login</p>
      )}
    </Container>
  );
}

export default App;
