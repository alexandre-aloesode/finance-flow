import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'
import Components from "./style/componentStyle";

export default function Login(params) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const styles = Components();

async function handleSubmit(){
  const loginData = new FormData();
  loginData.append("mail", mail )
  loginData.append("password", password)
  const fetchParams = {
    method: 'POST',
    body:loginData
  };
 const req = await fetch('http://localhost:80/finance-flow/back/login.php',fetchParams)
 const response = await req.json()

 if(response.success == true){
   localStorage.setItem('token', mail)
   localStorage.setItem('userId', response.userId)
   params.connect(true);
 }
}
  // useEffect(()=>{
  //   if(params.isConneted == true){
  //     window.location.href= "/budget.js"
  //   }
  // },[isConneted])

  return (
      <form style={styles.form}>
        <TextField sx={styles.textField} variant="filled"
          type="mail"
          label="Mail"
          className="mail"
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
        <TextField sx={styles.textField} variant="filled"
          type="password"
          label="Mot de passe"
          className="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button sx={styles.formButton} type="submit" variant="outlined" size="medium"className="submit" onClick = {(e)=>{
          e.preventDefault();
          handleSubmit();
        }
}>
          Se connecter
        </Button>
      </form>
  );
}
