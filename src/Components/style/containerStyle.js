import { useEffect, useState } from "react";

export default function Containers() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
    window.removeEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
  }, [width, height]);

  useEffect(() => {
    console.log(width, height);
  }, [width, height]);

  const header = {
    height: "50px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#353890",
    color: "#fff",
    marginTop: "1rem",
  };

  const indexContainer = {
    height: "100vh", 
    width: "100vw", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center",
    overflow: "hidden",
  };

  const appGraphsContainer = {
    height: "40%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const appCredentialsContainer = {
    height: "60%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "5rem",
    background: localStorage.getItem("token") ? "#fff" : "#353890",
    position: "relative",
  }

  const budgetDiv = {
    height: "60%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  };

  const budgetList = {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    justifyContent: "center",
    position: "relative",
  };

  const graphs = {
    // height: "100%",
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    justifyContent: "center",
    padding: "0",
    margin: "0",
    // position: "relative",
  };

  return {
    header,
    indexContainer,
    appGraphsContainer,
    appCredentialsContainer,
    budgetDiv,
    budgetList,
    graphs,
  };
}
