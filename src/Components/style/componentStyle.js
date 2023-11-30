import { useEffect, useState } from "react";

export default function Components() {

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

  const loginButton = {
    position: "absolute",
    top: "2%",
    // right: width > 420 ? "20%" : width > 430 ? "40%" : "10%",
    right: width < 465 ? "10%" : width < 1500 ? "20%" : "40%",
  };

  const registerButton = {
    position: "absolute",
    top: "2%",
    // left: width > 420 ? "20%" : width > 430 ? "40%" : "10%",
    left: width < 465 ? "10%" : width < 1500 ? "20%" :  "40%",
  };

  const textField = {
    backgroundColor: "#fff",
    color: "#353890",
    width: width < 465 ? "80%" : width < 1500 ? "60%" : "40%",
    // height: height < 800 ? "3rem" : "3.4rem",
    borderRadius: "5px",
  };

  const select = {
    backgroundColor: "#fff",
    color: "#353890",
    width: width < 465 ? "80%" : width < 1500 ? "60%" : "40%",
    // height: height < 800 ? "3rem" : "3.4rem",
    borderRadius: "5px",
  };

  const form = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: height < 855 ? "0.5rem" : "1.5rem",
    alignItems: "center",
    position: "absolute",
    top: "15%",
  };

  const formControl = {
    width: width < 465 ? "80%" : width < 1500 ? "60%" : "40%",
    borderRadius: "5px",
    backgroundColor: "#fff",
    color: "#353890",
    gap: height < 855 ? "0.5rem" : "1.5rem",
    position: "relative",
  };

  const formButton = {
    width: width < 465 ? "80%" : width < 1500 ? "60%" : "40%",
    height: "3rem",
    borderRadius: "5px",
    backgroundColor: "#353890",
    color: "#fff",
  };

  const closeIcon = {
    position: "absolute",
    top: height < 855 ? "4%" : "3%",
    right: width < 465 ? "-4%" : "0%",
    color: "#353890",
    cursor: "pointer",
  };

  const addIcon = {
    position: "absolute",
    top: "2%",
    right: "2%",
    color: "#353890",
    cursor: "pointer",
  };
  

  return {
    loginButton,
    registerButton,
    textField,
    select,
    form,
    formControl,
    formButton,
    closeIcon,
    addIcon,
  };
}
