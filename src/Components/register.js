import React from 'react';
import { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'

export default function Register(){

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname]=useState("");
  const [mail, setMail]=useState("");
  const [password, setPassword]=useState("");
  const [repeatPassword, setRepeatPpassword] = useState("");
   useEffect(() =>{
     console.log("test",repeatPassword)
   },[repeatPassword])

async function handleSubmit(){
  const registerForm = new FormData();
  registerForm.append("lastname",lastname)
  registerForm.append("firstname",firstname)
  registerForm.append("mail",mail)
  registerForm.append("password",password)
  const fetchParams = {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
    body:registerForm
  };
 const req = await fetch('http://localhost:80/finance-flow/back/register.php',fetchParams)
 const tarace = await req.json()
 console.log("testtarae",tarace)
}
return(
    <div>
      <form>
        <TextField type ="text"  label="Nom" value= {lastname}  variant="outlined" className="lastname"  onChange={(e)=>{
          setLastname(e.target.value);
          }}/>
        <TextField type="text" label="Prénom"value={firstname} className="firstname"  onChange={(e)=>{
          setFirstname(e.target.value);
          }}/>
        <TextField type="mail" label="Mail"value={mail}className="mail"onChange={(e)=>{
          setMail(e.target.value);
          }}/>
        <TextField type="password" label="Mot de passe"value={password} className="password" onChange={(e)=>{
          setPassword(e.target.value);
          }}/>
        <TextField type="password" label="Confirmation du mot de passe"value={repeatPassword} className="repeat-password"onChange={(e)=>{
          setRepeatPpassword(e.target.value);
          }}/>
        <Button type="submit" variant="contained" className="submit" onClick={(e)=>{
          e.preventDefault();
          handleSubmit()}} >Inscription</Button>
      </form>
    </div>

)

}