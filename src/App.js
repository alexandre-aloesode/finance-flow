import logo from "./logo.svg";
import "./App.css";
import Register from "./Components/register";
import Login from "./Components/login";
import Budget from "./Components/budget";
import { useState } from "react";
import Button from "@mui/material/Button";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  return (
    <div>
      {isConnected == false && localStorage.getItem("token") == "" ? (
        <div>
          <Button
            onClick={() => {
              setRegisterForm((prev) => !prev);
              if (loginForm == true) {
                setLoginForm(false);
              }
            }}
          >
            Inscription
          </Button>
          {registerForm == true && <Register connect={setIsConnected}/>}
          <br></br>
          <Button
            onClick={() => {
              setLoginForm((prev) => !prev);
              if (registerForm == true) {
                setRegisterForm(false);
              }
            }}
          >
            Connexion
          </Button>
          {loginForm == true && <Login connect={setIsConnected} />}
        </div>
      ) : (
        <div>
          <Budget connect={setIsConnected} />
        </div>
      )}
    </div>
  );
}

export default App;
