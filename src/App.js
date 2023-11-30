import "./App.css";
import Register from "./Components/register";
import Login from "./Components/login";
import Budget from "./Components/budget";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ImageOrGraph from "./Components/image_graph";
import AddTransaction from "./Components/addTransaction";
import Filters from "./Components/filters";
import Components from "./Components/style/componentStyle";
import Containers from "./Components/style/containerStyle";
import Header from "./Components/nav";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const [addTransaction, setAddTransaction] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const styles = Components();
  const divStyles = Containers();

  useEffect(() => {
    if (localStorage.getItem("token") !== "") {
      setIsConnected(true);
    }
  }, [isConnected]);

  return (
    <div style={divStyles.indexContainer}>
      {isConnected === false && !localStorage.getItem("token") && (
        <div style={divStyles.appCredentialsContainer}>
          <Button
            sx={styles.registerButton}
            variant="contained"
            size="large"
            onClick={() => {
              setRegisterForm((prev) => !prev);
              if (loginForm === true) {
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
              if (registerForm === true) {
                setRegisterForm(false);
              }
            }}
          >
            Connexion
          </Button>

          {registerForm === true && <Register connect={setIsConnected} />}
          {loginForm === true && <Login connect={setIsConnected} />}
        </div>
      )}
      {addTransaction === false && openFilters === false && (
        <div style={divStyles.appGraphsContainer}>
          <ImageOrGraph isConnected={isConnected} />
        </div>
      )}
      {isConnected === true && addTransaction === false && openFilters === false && <Budget addTransaction={setAddTransaction} filters={filters}/>}
      {isConnected === true && addTransaction === false && openFilters === true && <Filters openFilters={setOpenFilters} filters={setFilters}/>}
      {isConnected === true && addTransaction === true && <AddTransaction addTransaction={setAddTransaction} />}
      {isConnected === true && <Header connect={setIsConnected} openFilters={setOpenFilters} />}
    </div>
  );
}

export default App;
