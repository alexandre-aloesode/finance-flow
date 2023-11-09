import logo from "./logo.svg";
import "./App.css";
import Register from "./Components/register";
import Login from "./Components/login";
import Budget from "./Components/budget";
import { useState } from "react";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  return (
    <div>
      {isConnected == false && localStorage.getItem('token') == "" ? (
        <div>
          <p>Login</p>
          <Register />
          <br></br>
          <p>Login</p>
          <Login connect={setIsConnected} />
        </div>
      ) : (
        <div>
          <Budget connect={setIsConnected}/>
        </div>
      )}
    </div>
  );
}

export default App;
