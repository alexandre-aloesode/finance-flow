import React from "react";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form>
        <input
          type="mail"
          className="mail"
          placeholder="Entre votre email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          className="password"
          placeholder="Mot de passe"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button type="submit" className="submit">
          Connexion
        </button>
      </form>
    </div>
  );
}
