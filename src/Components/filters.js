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
export default function Filters(props) {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [subCat, setSubCat] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allSubCat, setAllSubCat] = useState([]);
  const divStyles = Containers();
  const styles = Components();
  const request = FinanceServices();

  async function getSubCats() {
    const data = {
      type: type,
    };

    await request.handle("getSubCat", data).then((response) => {
      if (response.success == true) {
        setAllSubCat(response.data);
      }
    });
  }

  const handleFilters = () => {
    const data = {
      type: type,
      title: title,
      location: location,
      subCat: subCat,
      amount: amount,
      startDate: startDate,
      endDate: endDate,
      id_user: localStorage.getItem("userId"),
    };
    props.filters(data);
    props.openFilters(false);
  };

  useEffect(() => {
    getSubCats();
  }, [type]);

  return (
    <FormControl sx={styles.formControl}>
      <h2>Filtres</h2>
      <CloseIcon
        sx={styles.closeIcon}
        onClick={() => {
          props.openFilters(false);
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
        label="Date de début"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
      />
      <TextField
        sx={styles.textField}
        variant="outlined"
        type="date"
        label="Date de fin"
        value={endDate}
        onChange={(e) => {
          setEndDate(e.target.value);
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
      <Button
        sx={styles.formButton}
        variant="contained"
        type="submit"
        className="submit"
        onClick={(e) => {
          e.preventDefault();
          handleFilters();
        }}
      >
        Valider
      </Button>
    </FormControl>
  );
}
