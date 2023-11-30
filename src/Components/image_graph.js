import React from "react";
import { useState, useEffect } from "react";
import logo from "/var/www/html/finance-flow/src/assets/logo.jpg";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { act } from "react-dom/test-utils";
import FinanceServices from "../services/getServices";
import Containers from "./style/containerStyle";

export default function ImageOrGraph(props) {
  const [balance, setBalance] = useState(0);
  const [actualDay, setActualDay] = useState(new Date().getDate());
  const [actualMonth, setActualMonth] = useState(new Date().getMonth() + 1);
  const [actualYear, setActualYear] = useState(new Date().getFullYear());
  const [allMonthsData, setAllMonthsData] = useState([]);
  const [monthRange, setMonthRange] = useState([]);
  const [monthNames, setMonthNames] = useState([]);
  const [incomePerMonth, setIncomePerMonth] = useState([]);
  const [expensePerMonth, setExpensePerMonth] = useState([]);
  const [balancePerMonth, setBalancePerMonth] = useState([]);
  const request = FinanceServices();
  const divStyles = Containers();

  const chartData = {
    labels: monthNames,
    datasets: [
      {
        label: "Balance des derniers mois",
        data: balancePerMonth,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
      },
      
    ],
  };

  async function getPeriodTransactions() {
    const promises = monthRange?.map((month) => {
      return new Promise((resolve) => {
        const data = {
          id_user: localStorage.getItem("userId"),
          start_date: `${actualYear}-${month}-01`,
          end_date: `${actualYear}-${month}-31`,
        };
        request.handle("getBalance", data).then((response) => {
          if (response.success == true) {
            resolve({
              monthName: new Date(actualYear, month, 1).toLocaleString("default", { month: "long" }),
              monthInt: month,
              incomes: response.amountIncomes,
              expenses: response.amountExpenses,
            });
          } else {
            resolve(false);
          }
        });
      });
    });
    Promise.all(promises).then((values) => {
      setAllMonthsData(values.toReversed());
    });
  }

  function handleData() {
    if (allMonthsData?.length == 5) {
      let totalBalance = 0;
      let expensePerMonth = [];
      let incomePerMonth = [];
      let balancePerMonth = [];
      let monthNames = [];

      for (let month of allMonthsData) {
        let tempBalance = eval(month.incomes - month.expenses);
        totalBalance += tempBalance;
        expensePerMonth.push(month.expenses);
        incomePerMonth.push(month.incomes);
        balancePerMonth.push(tempBalance);
        monthNames.push(month.monthName);
      }
      setBalance(totalBalance);
      setExpensePerMonth(expensePerMonth);
      setIncomePerMonth(incomePerMonth);
      setBalancePerMonth(balancePerMonth);
      setMonthNames(monthNames);
    }
  }

  useEffect(() => {
    setMonthRange([actualMonth, actualMonth - 1, actualMonth - 2, actualMonth - 3, actualMonth - 4]);
  }, [actualDay, actualMonth, actualYear]);

  useEffect(() => {
    getPeriodTransactions();
  }, [monthRange]);

  useEffect(() => {
    handleData();
  }, [allMonthsData]);

  return (
    <div style={divStyles.graphs}>
      {props.isConnected === false && <img src={logo} style={{ width: "350px", height: "350px" }} />}
      {props.isConnected === true && <h2 style={{ marginTop: "1rem" }}>Solde: {balance}€</h2>}
      <Bar data={chartData} style={{height:"100%", width:"100%"}} />
    </div>
  );
}
