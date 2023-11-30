import React from "react";
import { useState, useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import Containers from "./style/containerStyle";

export default function Header(params) {
  const divStyles = Containers();

  function handleLogOut() {
    localStorage.setItem("token", "");
    localStorage.setItem("userId", "");
    params.connect(false);
    window.location.href = "/";

  }

  return (
    <div style={divStyles.header}>
      <PersonOutlineIcon sx={{marginLeft:"5%"}}/>
      <LogoutIcon sx={{marginRight:"5%"}}
        onClick={() => {
          handleLogOut();
        }}
      />
    </div>
  );
}
