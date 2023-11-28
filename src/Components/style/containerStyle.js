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

  const indexContainer = {
    height: "60%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "5rem",
    background: isConnected ? "#fff" : "#353890",
    position: "relative",
  };

  const budgetDiv = {
    // height: "100%",
    // width: "100%",
    // display: "flex",
    // flexDirection: "column",
    // // flexWrap: "wrap",
    // alignItems: "center",
    // justifyContent: "center",
    // // gap: "5rem",
    // background: isConnected ? "#fff" : "#353890",
    // position: "relative",
  };

  return {
    indexContainer,
    budgetDiv,
  };
}
