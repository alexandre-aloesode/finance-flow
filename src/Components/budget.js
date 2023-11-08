import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import { useState } from "react";

export default function Budget() {
  const [addTransaction, setAddTransaction] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [subCat, setSubCat] = useState("");
  const [amount, setAmount] = useState("");

  async function handleSubmit(){
    const transactionData = new FormData();
    transactionData.append("type", type )
    transactionData.append("title", title)
    transactionData.append("description", description)
    transactionData.append("location", location)
    transactionData.append("subCat", subCat)
    transactionData.append("amount", amount)
    transactionData.append("id_user", localStorage.getItem("userId"))



    const fetchParams = {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body:transactionData
    };
   const req = await fetch('http://localhost:80/finance-flow/back/addTransaction.php',fetchParams)
   const response = await req.json()
  
   if(response.success == true){
        setTitle("")
        setDescription("")
        setLocation("")
        setAmount("")
        setAddTransaction(false)
        alert('transaction ajoutée')
   }
  }

  return (
    <div>
      <p>Budget de {localStorage.getItem("token")}</p>
      {/* <button
        onClick={() => {
          setAddTransaction(true);
          console.log("test");
        }}
      >
        add
      </button> */}
      <AddCircleOutlineIcon onClick={() => {
          setAddTransaction(true);
          console.log("test");
        }}/>

      {addTransaction == true ? (
        <div>
          <form>
            <select value={type}onChange={(e)=>{
                setType(e.target.value)
            }}>
              <option>Crédit</option>
              <option>Débit</option>
            </select>
            <input type="text" placeholder="Titre" value={title} onChange={(e)=>{
                setTitle(e.target.value)
            }}>
            </input>
            <input type="number" placeholder="Montant" value={amount} onChange={(e)=>{
                setAmount(e.target.value)
            }}>
            </input>
            <input type="text" placeholder="Description" value={description} onChange={(e)=>{
                setDescription(e.target.value)
            }}>
            </input>
            <input type="text" placeholder="Lieu" value={location} onChange={(e)=>{
                setLocation(e.target.value)
            }}>
            </input>
            <select value={subCat}onChange={(e)=>{
                setSubCat(e.target.value)
            }}>
              <option>Food</option>
              <option>Loyer</option>
            </select>
            <button type="submit" className="submit" onClick = {(e)=>{
          e.preventDefault();
          handleSubmit();
            }
            }>
          Ajouter
        </button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
