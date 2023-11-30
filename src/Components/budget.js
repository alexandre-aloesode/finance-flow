import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Containers from "./style/containerStyle";
import Components from "./style/componentStyle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FinanceServices from "../services/getServices";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Budget(props) {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [subCat, setSubCat] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [userBudget, setUserBudget] = useState([]);
  const [allSubCat, setAllSubCat] = useState([]);
  const divStyles = Containers();
  const styles = Components();
  const request = FinanceServices();
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    console.log(props.filters);
  }, [props.filters]);
  async function getBudget() {
    const data = {
      id_user: localStorage.getItem("userId"),
      limit: limit,
    };

    await request.handle("getTransaction", data).then((response) => {
      if (response.success == true) setUserBudget(response.data);
    });
  }

  useEffect(() => {
      getBudget();
  }, [limit]);

  return (
      <div style={divStyles.budgetList}>
        <h2 style={{position:"absolute", top:"0"}}> Dernières transactions </h2>
        <AddCircleIcon sx={styles.addIcon}
          onClick={() => {
            props.addTransaction(true);
          }}
        />
        <List sx={{height:"65%", overflowY:"scroll", position:"absolute", top:"11%"}}>
          {userBudget?.map((transaction) => {
            return (
              <ListItem>
                <ListItemIcon>{transaction.id_cat == 1 ? <MoneyOffIcon sx={{ color: "red" }} /> : <AttachMoneyIcon sx={{ color: "green" }} />}</ListItemIcon>
                <ListItemText
                  primary={`${transaction.amount}€ - ${transaction.title}`}
                  secondary={`Le ${transaction.date} - ${transaction.location}`}
                  sx={{ color: transaction.id_cat == 1 ? "red" : "green" }}
                />
              </ListItem>
            );
          })}
        </List>
        <Button variant="outlined" sx={{position:"absolute", bottom:"10%"}} size="small" onClick={() => {
          setLimit(limit + 5);
        }}>
          Voir plus
        </Button>
      </div>
  );
}
