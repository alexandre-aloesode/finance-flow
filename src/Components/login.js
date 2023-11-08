import React from "react";

import { useState, useEffect } from "react";

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
        <input
          type="mail"
          className="mail"
          value={mail}
          placeholder="Entre votre email"
          onChange={(e) => {
            setMail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          className="password"
          value={password}
          placeholder="Mot de passe"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button type="submit" className="submit" onClick = {(e)=>{
          e.preventDefault();
          handleSubmit();
        }
}>
          Connexion
        </button>
      </form>
    </div>
  );
}
