import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Register(params) {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  async function handleSubmit() {
    const registerForm = new FormData();
    registerForm.append("lastname", lastname);
    registerForm.append("firstname", firstname);
    registerForm.append("mail", mail);
    registerForm.append("password", password);
    const fetchParams = {
      method: "POST",
      body: registerForm,
    };
    const req = await fetch("http://localhost:80/finance-flow/back/register.php", fetchParams);
    const response = await req.json();
    if (response.success == true) {
      setFirstname("");
      setLastname("");
      setMail("");
      setPassword("");
      setRepeatPassword("");
      localStorage.setItem("token", response.data.mail);
      localStorage.setItem("userId", response.data.id);
      params.connect(true);
    }
  }

  //   useEffect(() => {
  //   console.log("test", repeatPassword);
  // }, [repeatPassword]);

  return (
    <div
      // style={{
      //   WebkitTransition: "width 2s, height 2s, background-color 2s",
      //   WebkitTransform: "rotate(0deg)",
      //   transition: "width 2s, height 2s, background-color 2s",
      // }}
    >
      <form>
        <TextField
          type="text"
          label="Nom"
          value={lastname}
          variant="outlined"
          className="lastname"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        />
        <TextField
          type="text"
          label="Prénom"
          value={firstname}
          className="firstname"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <TextField
          type="mail"
          label="Mail"
          value={mail}
          className="mail"
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
        <TextField
          type="password"
          label="Mot de passe"
          value={password}
          className="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          type="password"
          label="Confirmation du mot de passe"
          value={repeatPassword}
          className="repeat-password"
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
        />
        <Button
          type="submit"
          variant="contained"
          className="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Inscription
        </Button>
      </form>
    </div>
  );
}
