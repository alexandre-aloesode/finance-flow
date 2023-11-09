import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import { useState, useEffect } from "react";

export default function Budget(params) {
  const [addTransaction, setAddTransaction] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [subCat, setSubCat] = useState("");
  const [amount, setAmount] = useState("");
  const [userBudget, setUserBudget] = useState([]);
  const [balance, setBalance] = useState(0)
  const [allSubCat, setAllSubCat] = useState([]);

  async function getBudget() {
    const budgetData = new FormData();
    budgetData.append("id_user", localStorage.getItem("userId"));

    const fetchParams = {
      method: "POST",
      body: budgetData,
    };
    const req = await fetch(
      "http://localhost:80/finance-flow/back/getTransaction.php",
      fetchParams
    );
    const response = await req.json();
    setUserBudget(response.data);
    setBalance(response.amountIncomes - response.amountExpenses)
  }

  function handleLogOut() {
    localStorage.setItem("token", "")
    localStorage.setItem("userId", "")
    params.connect(false)
  }

  async function handleSubmit() {
    const transactionData = new FormData();
    transactionData.append("type", type);
    transactionData.append("title", title);
    transactionData.append("description", description);
    transactionData.append("location", location);
    transactionData.append("subCat", subCat);
    transactionData.append("amount", amount);
    transactionData.append("id_user", localStorage.getItem("userId"));

    const fetchParams = {
      method: "POST",
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body: transactionData,
    };
    const req = await fetch(
      "http://localhost:80/finance-flow/back/addTransaction.php",
      fetchParams
    );
    const response = await req.json();

    if (response.success == true) {
      setTitle("");
      setDescription("");
      setLocation("");
      setAmount("");
      setAddTransaction(false);
      getBudget();
    }
  }

  if (userBudget.length == 0) getBudget();

  useEffect(() => {
    // if(addTransaction == false){
    //   getBudget();
    // }
    // console.log("userBudget", subCat);
    getSubCats()
  }, [type]);

// function calculateBalance(){

//   let temporaryBudget = 0
//   userBudget?.map((transaction) => {
//     if(transaction.id_cat == 1){
//       temporaryBudget =   parseInt(temporaryBudget) - parseInt(transaction.amount)
//     }else{
//       temporaryBudget = parseInt(temporaryBudget) + parseInt(transaction.amount)
//     }
//   })
//   setBalance(temporaryBudget)
// }

async function getSubCats(){
  const transactionData = new FormData();
  transactionData.append("type", type);
 
  const fetchParams = {
    method: "POST",
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
    body: transactionData,
  };
  const req = await fetch(
    "http://localhost:80/finance-flow/back/getSubCat.php",
    fetchParams
  );
  const response = await req.json();

  if (response.success == true) {
    setAllSubCat(response.data)
  }
}

  return (
    <div>
     

      <button onClick = {() => {handleLogOut()}}>Déconnexion</button>
      <p>Budget de {localStorage.getItem("token")}</p>
      {/* <button
        onClick={() => {
          setAddTransaction(true);
          console.log("test");
        }}
      >
        add
      </button> */}
      <AddCircleOutlineIcon
        onClick={() => {
          setAddTransaction(true);
        }}
      />

      <div>
        <p>Solde:{balance}</p>
      </div>

      {addTransaction == true ? (
        <div style={{border:"solid 1px black"}}>
          <CloseIcon onClick={() => {
          setAddTransaction(false);
        }}/>
          <form>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                // getSubCats()
                console.log("test",e.target.value );
              }}
            >
              <option>Catégories</option>
              <option value={2}>Crédit</option>
              <option value={1}>Débit</option>
            </select>
            <input
              type="text"
              placeholder="Titre"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <input
              type="number"
              placeholder="Montant"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="Lieu"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            ></input>
            <select
              value={subCat}
              onChange={(e) => {
                setSubCat(e.target.value);
              }}
            >
                 {allSubCat?.map((subCat) => {
            return (
              <>
                <option>Sous-catégories</option>
                <option value= {subCat.id}>{subCat.name}</option>
              </>
            );
          })}
            </select>
            <button
              type="submit"
              className="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Ajouter
            </button>
          </form>
        </div>
      ) : (
        <div style={{border:"solid 1px black"}}>  
          {userBudget?.map((transaction) => {
            return (
              <div style={{display:"flex", color: transaction.id_cat == 1 ? "red" : "green"}}>
                <p>{transaction.title}</p>
                <p>{transaction.subCat}</p>
                <p>{transaction.amount}€</p>
                <p>Le {transaction.date} à {transaction.location}</p>
                <p>{transaction.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
