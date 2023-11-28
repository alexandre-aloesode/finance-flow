import "./App.css";
import Register from "./Components/register";
import Login from "./Components/login";
import Budget from "./Components/budget";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ImageOrGraph from "./Components/image_graph";
import Components from "./Components/style/componentStyle";
// import Containers from "./Components/style/containerStyle";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const styles = Components();

useEffect(()=>{
  if(localStorage.getItem('token') != ""){
    setIsConnected(true);
  }
},[isConnected])

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ height: "40%", width: "50%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ImageOrGraph isConnected={isConnected} />
      </div>

      {isConnected == false && !localStorage.getItem("token") && (
        <div
          style={{
            height: "60%",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "5rem",
            background: isConnected ? "#fff" : "#353890",
            position: "relative",
          }}
        >
          <Button
            sx={styles.registerButton}
            variant="contained"
            size="large"
            onClick={() => {
              setRegisterForm((prev) => !prev);
              if (loginForm == true) {
                setLoginForm(false);
              }
            }}
          >
            Inscription
          </Button>

          <Button
            sx={styles.loginButton}
            variant="contained"
            size="large"
            onClick={() => {
              setLoginForm((prev) => !prev);
              if (registerForm == true) {
                setRegisterForm(false);
              }
            }}
          >
            Connexion
          </Button>
          {registerForm == true && <Register connect={setIsConnected} />}

          {loginForm == true && <Login connect={setIsConnected} />}
        </div>
      )}

      {isConnected === true && <Budget connect={setIsConnected} />}
    </div>
  );
}

export default App;
