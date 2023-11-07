import React from 'react';

export default function Register(){

  const fetchParams = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch('http://localhost:80/finance-flow/back/register.php').then(response=>{console.log(response)})
// fetch('/var/www/html/finance-flow/back/register.php', fetchParams).then(response=>{console.log(response)})
// fetch('../back/register.php', fetchParams).then(response=>{console.log(response)})

return(
    <div>
      <form>
        <input type ="text" className="lastname" placeholder="Entrez votre Nom"></input>
        <input type="text" className="firstname" placeholder="Entrez votre Prénom"></input>
        <input type="mail" className="mail" placeholder="Entre votre email"></input>
        <input type="password" className="password" placeholder="Mot de passe"></input>
        <input type="password" className="repeat-password" placeholder="Confirmer votre mot de passe"></input>
        <button type="submit" className="submit" >Inscription</button>
      </form>
    </div>

)

}