import React from 'react';

export default function Register(){

fetch('http://localhost:3000/back/register.php').then(response=>{console.log(response)})

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