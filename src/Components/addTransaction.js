import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Containers from "./style/containerStyle";
import Components from "./style/componentStyle";
import FinanceServices from "../services/getServices";

export default function AddTransaction(props) {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [subCat, setSubCat] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [allSubCat, setAllSubCat] = useState([]);
  const divStyles = Containers();
  const styles = Components();
  const request = FinanceServices();

  async function handleSubmit() {
    const data = {
      type: type,
      title: title,
      date: date,
      description: description,
      location: location,
      subCat: subCat,
      amount: amount,
      id_user: localStorage.getItem("userId"),
    };

    await request.handle("addTransaction", data).then((response) => {
      if (response.success == true) {
        setTitle("");
        setDate("");
        setDescription("");
        setLocation("");
        setAmount("");
        props.addTransaction(false);
      }
    });
  }

  useEffect(() => {
    getSubCats();
  }, [type]);

  async function getSubCats() {
    const transactionData = new FormData();
    transactionData.append("type", type);

    const fetchParams = {
      method: "POST",
      body: transactionData,
    };
    const req = await fetch("http://localhost:80/finance-flow/back/getSubCat.php", fetchParams);
    const response = await req.json();

    if (response.success == true) {
      setAllSubCat(response.data);
    }
  }

  return (
      <FormControl sx={styles.formControl}>
          <h2>Ajouter une transaction</h2>
        <CloseIcon sx={styles.closeIcon}
          onClick={() => {
            props.addTransaction(false);
          }}
        />
        <FormControl>
          <InputLabel id="inputCat">Catégorie</InputLabel>
          <Select
            sx={styles.select}
            labelId="inputCat"
            id="inputCat"
            value={type}
            label="Catégorie"
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <MenuItem>Catégories</MenuItem>
            <MenuItem value={1}>Débit</MenuItem>
            <MenuItem value={2}>Crédit</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={styles.textField}
          variant="outlined"
          type="text"
          label="Titre"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          sx={styles.textField}
          variant="outlined"
          type="date"
          label="Date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <TextField
          sx={styles.textField}
          type="number"
          label="Montant"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <TextField
          sx={styles.textField}
          type="text"
          label="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <TextField
          sx={styles.textField}
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
            sx={styles.select}
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
              return <MenuItem value={subCat.id}>{subCat.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Button sx={styles.formButton}
          variant="contained"
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
  );
}
