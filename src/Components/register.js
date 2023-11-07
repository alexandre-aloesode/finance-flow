import React from 'react';
import { useState, useEffect } from 'react';

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
        <input type ="text" value= {lastname} className="lastname" placeholder="Entrez votre Nom" onChange={(e)=>{
          setLastname(e.target.value);
          }}></input>
        <input type="text" value={firstname} className="firstname" placeholder="Entrez votre Prénom" onChange={(e)=>{
          setFirstname(e.target.value);
          }}></input>
        <input type="mail" value={mail}className="mail" placeholder="Entre votre email"onChange={(e)=>{
          setMail(e.target.value);
          }}></input>
        <input type="password" value={password} className="password" placeholder="Mot de passe"onChange={(e)=>{
          setPassword(e.target.value);
          }}></input>
        <input type="password" value={repeatPassword} className="repeat-password" placeholder="Confirmer votre mot de passe"onChange={(e)=>{
          setRepeatPpassword(e.target.value);
          }}></input>
        <button type="submit"  className="submit" onClick={(e)=>{
          e.preventDefault();
          handleSubmit()}} >Inscription</button>
      </form>
    </div>

)

}