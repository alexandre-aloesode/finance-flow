import React from "react";
import { useState, useEffect } from "react";
import logo from "/var/www/html/finance-flow/src/assets/logo.jpg";

export default function ImageOrGraph(props) {
  const [balance, setBalance] = useState(0);

  async function getBudget() {
    const balanceData = new FormData();
    balanceData.append("id_user", localStorage.getItem("userId"));

    const fetchParams = {
      method: "POST",
      body: balanceData,
    };
    const req = await fetch("http://localhost:80/finance-flow/back/getBalance.php", fetchParams);
    const response = await req.json();
    if (response.success == true) {
      setBalance(response.amountIncomes - response.amountExpenses);
    }
  }

  useEffect(() => {
    if (props.isConnected === true) {
      getBudget();
    }
  }, [props.isConnected]);

  return (
    <div>
      {props.isConnected === false && <img src={logo} style={{ width: "350px", height: "350px" }} />}
      {props.isConnected === true && <h1>Solde: {balance}</h1>}
    </div>
  );
}
