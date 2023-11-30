import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import FilterListIcon from '@mui/icons-material/FilterList';
import Containers from "./style/containerStyle";

export default function Header(props) {
  const divStyles = Containers();

  function handleLogOut() {
    localStorage.setItem("token", "");
    localStorage.setItem("userId", "");
    props.connect(false);
    window.location.href = "/";
  }

  return (
    <div style={divStyles.header}>
      <PersonOutlineIcon sx={{marginLeft:"5%"}}/>
      <FilterListIcon onClick={() => {
          props.openFilters(true);
        }}/>
      <LogoutIcon sx={{marginRight:"5%"}}
        onClick={() => {
          handleLogOut();
        }}
      />
    </div>
  );
}
