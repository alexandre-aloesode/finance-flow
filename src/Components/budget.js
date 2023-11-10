import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';


export default function Budget(params) {
  const [addTransaction, setAddTransaction] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [subCat, setSubCat] = useState("");
  const [amount, setAmount] = useState("");
  const [userBudget, setUserBudget] = useState([]);
  const [balance, setBalance] = useState(0);
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
    setBalance(response.amountIncomes - response.amountExpenses);
  }

  function handleLogOut() {
    localStorage.setItem("token", "");
    localStorage.setItem("userId", "");
    params.connect(false);
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
    getSubCats();
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

  async function getSubCats() {
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
      setAllSubCat(response.data);
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          handleLogOut();
        }}
      >
        Déconnexion
      </button>
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
        <div style={{ border: "solid 1px black" }}>
          <FormControl>
          <CloseIcon
            onClick={() => {
              setAddTransaction(false);
            }}
          />
          <FormControl>
            <InputLabel id="inputCat">Catégorie</InputLabel>
            <Select
              labelId="inputCat"
              id="inputCat"
              value={type}
              label="Catégorie"
              onChange={(e) => {
                setType(e.target.value);
              }}
              // style={{width:'200px'}}
            >
              <MenuItem>Catégories</MenuItem>
              <MenuItem value={1}>Débit</MenuItem>
              <MenuItem value={2}>Crédit</MenuItem>
            </Select>
            </FormControl>
            <TextField
              variant="outlined"
              type="text"
              label="Titre"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              type="number"
              label="Montant"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <TextField
              type="text"
              label="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <TextField
              type="text"
              label="Lieu"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            <FormControl>
            <InputLabel id="inputSubCat">Sous-catégorie</InputLabel>
            <Select
              labelId="inputSubCat"
              id="inputSubCat"
              value={subCat}
              label="Sous-catégorie"
              onChange={(e) => {
                setSubCat(e.target.value);
              }}
            >
              <MenuItem value={"all"}>Sous-catégories</MenuItem>
              {allSubCat?.map((subCat) => {     
           return (
             <MenuItem value={subCat.id}>{subCat.name}</MenuItem>   
           )
                 
              })}
            </Select>
            </FormControl>
            <Button variant="contained"
              type="submit"
              className="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Ajouter
            </Button>
            </FormControl>
        </div>
      ) : (
        <div style={{ border: "solid 1px black" }}>
          {userBudget?.map((transaction) => {
            return (
              <div
                style={{
                  display: "flex",
                  color: transaction.id_cat == 1 ? "red" : "green",
                }}
              >
                <p>{transaction.title}</p>
                <p>{transaction.subCat}</p>
                <p>{transaction.amount}€</p>
                <p>
                  Le {transaction.date} à {transaction.location}
                </p>
                <p>{transaction.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
