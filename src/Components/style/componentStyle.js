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
    borderRadius: "5px",
  };

  const form = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    alignItems: "center",
    position: "absolute",
    top: "15%",
  };

  return {
    loginButton,
    registerButton,
    textField,
    form,
  };
}
