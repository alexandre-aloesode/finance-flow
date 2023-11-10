import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'

export default function Login(params) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  

async function handleSubmit(){
  const loginData = new FormData();
  loginData.append("mail", mail )
  loginData.append("password", password)
  const fetchParams = {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
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
    <div>
      <form>
        <TextField
          type="mail"
          label="Mail"
          className="mail"
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
        <TextField
          type="password"
          label="Mot de passe"
          className="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button type="submit" variant="outlined" size="medium"className="submit" onClick = {(e)=>{
          e.preventDefault();
          handleSubmit();
        }
}>
          Connexion
        </Button>
      </form>
    </div>
  );
}
