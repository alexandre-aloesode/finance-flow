import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Components from "./style/componentStyle";

export default function Register(params) {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [existingMail, setExistingMail] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const styles = Components();


  async function handleSubmit() {
    if (existingMail == true) return;
    if (passwordMatch == false) return;
    if (password != repeatPassword) return;
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

  async function checkExistingMail() {
    if (mail == "") {
      return;
    }
    const mailData = new FormData();
    mailData.append("mail", mail);
    const fetchParams = {
      method: "POST",
      body: mailData,
    };
    const req = await fetch("http://localhost:80/finance-flow/back/checkExistingMail.php", fetchParams);
    const response = await req.json();
    if (response.success == true) {
      setExistingMail(true);
    } else {
      setExistingMail(false);
    }
  }

  async function checkPasswordMatch() {
    if (password == "" || repeatPassword == "") return;
    if (password != repeatPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }

  useEffect(() => {
    checkExistingMail();
  }, [mail]);

  useEffect(() => {
    checkPasswordMatch();
  }, [repeatPassword]);

  return (
      <form style={styles.form}>
        <TextField
          variant="filled"
          sx={styles.textField}
          type="text"
          label="Nom"
          value={lastname}
          className="lastname"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        />
        <TextField
          variant="filled"
          sx={styles.textField}
          type="text"
          label="Prénom"
          value={firstname}
          className="firstname"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <TextField
          variant="filled"
          sx={styles.textField}
          type="mail"
          label={existingMail == true ? "Mail déjà utilisé" : "Mail"}
          value={mail}
          className="mail"
          onChange={(e) => {
            setMail(e.target.value);
          }}
          color={existingMail == true ? "warning" : "success"}
        />
        <TextField
          variant="filled"
          sx={styles.textField}
          type="password"
          label="Mot de passe"
          value={password}
          className="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          variant="filled"
          sx={styles.textField}
          type="password"
          label={passwordMatch == false ? "Les Mots de passe ne correspondent pas" : "Confirmer le mot de passe"}
          color={passwordMatch == false ? "warning" : "success"}
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
          S'inscrire
        </Button>
      </form>
  );
}
